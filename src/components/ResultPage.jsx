import React, { useEffect } from 'react';
import { Grid, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Button, Modal, useMediaQuery, Snackbar } from '@mui/material';
import { saveAs } from 'file-saver';
import { Howl } from 'howler';
import jenglotResultDesc from '../components/resultDescs/jenglotResultDesc';
import kuyangResultDesc from '../components/resultDescs/kuyangResultDesc';
import genduruwoResultDesc from '../components/resultDescs/genduruwoResultDesc';
import resultBackImage from '../images/resultPageImages/result-blur.png';
import jenglotImage from '../images/resultPageImages/JenglotImage.jpg';
import kuyangImage from '../images/resultPageImages/KuyangImage.jpg';
import genderuwoImage from '../images/resultPageImages/GenduruwoImage.jpg';
import buttonProperties from './tools/buttonProperties';
import resultMusicUrl from '../sounds/resultSound.wav';
import BackgroudImg from '../images/appImages/background-terror.jpg';

// Modal component to display enlarged image
const ImageModal = ({ isOpen, onClose, image }) => {
    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <img src={image} alt="Zoomed" style={{ maxWidth: '90%', maxHeight: '90%' }} />
        </Modal>
    );
};

// Main ResultPage component
const ResultPage = ({ stopMusic }) => {
    // Effect hook to stop music and play result sound
    useEffect(() => {
        stopMusic(); // Stop the music
        console.log("Music is playing:", stopMusic) // Log whether music is stopped

        // Initialize result sound
        const resultMusic = new Howl({
            src: [resultMusicUrl],
            loop: false,
            volume: 0.5,
        });

        // Fungsi untuk memulai pemutaran musik setelah delay
        const playResultMusic = () => {
            resultMusic.play();
        };

        // Play result music
        playResultMusic();

        // Cleanup function to stop music when component unmounts
        return () => {
            resultMusic.stop();
        };
    }, [stopMusic]); // Dependency array to ensure useEffect runs only when stopMusic changes

    // Get participant name from location state
    const location = useLocation();
    const { participantName, totalPoints } = location.state;

    let resultImage;
    if (totalPoints >= 4 && totalPoints <= 12) {
        resultImage = jenglotImage;
    } else if (totalPoints >= 13 && totalPoints <= 17) {
        resultImage = kuyangImage;
    } else {
        resultImage = genderuwoImage;
    }

    let ResultDesc;
    if (totalPoints >= 4 && totalPoints <= 12) {
        ResultDesc = jenglotResultDesc;
    } else if (totalPoints >= 13 && totalPoints <= 17) {
        ResultDesc = kuyangResultDesc;
    } else {
        ResultDesc = genduruwoResultDesc;
    }

    // Theme and media query hooks
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // State variables for modal, popup, download, and snackbar
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    //const [isPopupOpen, setIsPopupOpen] = React.useState(false);
    const [isDownloadOpen, setIsDownloadOpen] = React.useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = React.useState(false);

    // Function to handle click on result image
    const handleClick = () => {
        setIsModalOpen(true);
    };

    // Function to open popup
    // const openPopup = () => {
    //   setIsPopupOpen(true);
    // };

    // Function to open download popup
    const openDownloadPopup = () => {
        setIsDownloadOpen(true);
    };

    // Function to share to Instagram story
    // const shareToInstagramStory = () => {
    //   // Logika untuk berbagi ke Instagram Story
    //   // Misalnya, arahkan pengguna ke halaman Instagram Story
    //   window.location.href = 'https://www.instagram.com/stories';
    // };

    // Function to download image
    const downloadImage = () => {
        // Mendapatkan URL gambar
        const imageUrl = resultImage; // Ganti dengan variabel atau konstanta yang menyimpan URL gambar

        // Mendapatkan nama file dari URL gambar
        const fileName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);

        // Melakukan request untuk mengunduh gambar
        fetch(imageUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.blob();
            })
            .then(blob => {
                setIsSnackbarOpen(true);
                // Menyimpan blob sebagai file dengan menggunakan file-saver
                saveAs(blob, fileName);// Save image file
                setIsSnackbarOpen(true);
                setIsDownloadOpen(false); // Close download popup
            })
            .catch(error => {
                console.error('Gagal mengunduh gambar:', error); // Log error if download fails
                //setIsSnackbarOpen(true); // Show snackbar to indicate download failure
            });
    };

    // Function to close snackbar
    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <div style={{ position: 'relative', marginTop: isMobile ? '100px' : '50px' }}>
                    <img src={resultBackImage} alt="Background" style={{ marginTop: isMobile ? 0 : '100px', maxWidth: '100%', height: 'auto' }} />
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'grid', placeItems: 'center' }}>
                        <img
                            src={resultImage}
                            alt="Result"
                            style={{
                                maxWidth: '90%',
                                height: 'auto',
                                cursor: 'pointer',
                                marginTop: '100px',
                                ...(isMobile && { maxWidth: '90%', marginTop: 0 }),
                            }}
                            onClick={handleClick}
                        />
                    </div>
                </div>
                <ImageModal image={resultImage} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </Grid>

            <Grid item xs={12} md={6} zIndex={2}>
                <div style={{ flex: 1, textAlign: 'left', marginLeft: isMobile ? '0' : '-35%', padding: isMobile ? '40px' : '100px' }}>
                    <div>
                        {isMobile && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '40px' }}>
                                <Button variant="contained"
                                    color="primary"
                                    onClick={openDownloadPopup}
                                    style={{
                                        backgroundColor: '#D32027',
                                        borderRadius: '30px',
                                        width: '50%',
                                        height: '30px',
                                        fontSize: '12px',
                                        marginBottom: '20px'
                                    }}>
                                    Share Hasil
                                </Button>
                                <Button variant="outlined"
                                    color="primary"
                                    onClick={handleClick}
                                    style={{
                                        color: 'white',
                                        borderColor: 'white',
                                        borderRadius: '30px',
                                        width: '50%',
                                        height: '30px',
                                        fontSize: '12px',
                                    }}>
                                    Perbesar Gambar
                                </Button>
                            </div>
                        )}
                        <h1 style={{ textAlign: isMobile ? 'center' : '' }}>HASIL TERORMU</h1>
                        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Hai {participantName}, </p>
                        <p style={{ textAlign: 'justify', fontSize: isMobile ? '14px' : 'inherit' }}>
                            Berdasarkan hasil ritual kamu, kamu itu masuk golongan...</p>
                        <ResultDesc />
                        {!isMobile && (
                            <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column' }}>
                                <Button variant="contained"
                                    color="primary"
                                    onClick={openDownloadPopup}
                                    style={{
                                        backgroundColor: '#D32027',
                                        borderRadius: '30px',
                                        width: '25%',
                                        height: '40px',
                                        marginBottom: '20px'
                                    }} >
                                    Share Hasil
                                </Button>
                                <Button
                                    type="submit"
                                    variant="outlined"
                                    color="primary"
                                    onClick={handleClick}
                                    style={{
                                        borderRadius: '30px',
                                        color: 'white',
                                        borderColor: 'white',
                                        width: '25%',
                                        height: '40px',
                                        marginRight: '10px',
                                    }}>
                                    Perbesar Gambar
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Grid>
            {/* <Modal open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
        <div style={{
          backgroundColor: 'black',
          padding: '20px',
          borderRadius: '10px',
          backgroundImage: `url('igShareAsset.png')`, // Ganti path gambar dengan path yang benar
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          position: 'relative',
        }}>
          <h2 style={{ color: '#D32027', fontFamily: 'Spot', textAlign: 'center' }}>JANGAN LUPA</h2>
          <p style={{ margin: '1px 0' }}>1. Follow akun resmi Freshmag.</p>
          <p style={{ margin: '1px 0' }}>2.
            <span style={{ fontWeight: 'bold' }}>
              Share terror card
            </span>
            kamu ke Instagram story dengan hastag
            <span style={{ fontWeight: 'bold' }}>
              #TerorLambung dan mention akun resmi Freshmag.
            </span>
          </p>
          <p style={{ margin: '1px 0' }}>3. Pemenang akan kami pilih secara acak dari story kamu dan dapatkan hadiah menarik kami.</p>
          <p style={{ margin: '5px 0', marginBottom: 20, textAlign: 'center', fontWeight: 'bold' }}>Semoga beruntung</p>
          <Button variant="contained" color="primary" onClick={shareToInstagramStory}
            style={{
              ...buttonProperties,
              margin: 'auto', // Membuat tombol berada di tengah secara horizontal
              position: 'absolute', // Membuat tombol menjadi absolut
              bottom: '-40px', // Menyesuaikan posisi tombol agar berada di luar modal
              left: '50%', // Menengahkan tombol secara horizontal
              transform: 'translate(-50%, -50%)' // Menyesuaikan posisi tombol agar tepat di tengah 
            }}>
            Bagikan
          </Button>
        </div>
      </Modal> */}

            <Modal open={isDownloadOpen}
                onClose={() => setIsDownloadOpen(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <div style={{
                    padding: isMobile ? 20 : 100,
                    margin: isMobile ? 0 : 350,
                    borderRadius: '10px',
                    backgroundImage: `url(${BackgroudImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    position: 'relative',
                }}>
                    <h2 style={{ margin: '3px 0', color: '#D32027', fontFamily: 'Spot, Poppins', fontWeight: 'bold', textAlign: 'center' }}>
                        IKUTAN GIVEAWAY #TERORLAMBUNG YUK!
                    </h2>
                    <p style={{ margin: '20px 0', fontSize: isMobile ? 12 : 16, textAlign: 'center' }}>
                        Selamat, kamu sedikit lagi bisa nyelesein rangkaian ritual Teror Penunggu Lambung lho!
                    </p>
                    <p style={{ margin: '20px 0', fontSize: isMobile ? 12 : 16, textAlign: 'center' }}>
                        Buat menutup prosesnya, yuk tutup ritualmu dengan ikutan Giveaway #TerorLambung karena ada merchandise eksklusif dari Freshmag.
                        Caranya:  </p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>
                        1. Follow akun instagram official @freshmag.id.
                    </p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>
                        2. Upload Teror Card yang sudah kamu save ke Instagram Story dengan hashtag #TerorLambung dan #KenaliTerormu dan mention IG @freshmag.id
                        {/* <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> Share Terror Card </span> */}
                    </p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>3. Di akhir periode akan dipilih 30 pemenang yang beruntung untuk mendapatkan merchandise eksklusif dari Freshmag
                    </p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>4. Periode giveaway akan ditutup hingga 30 April 2024
                    </p>
                    <p style={{ margin: '20px 0', fontSize: isMobile ? 12 : 16, textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> Semoga Beruntung! </span>
                    </p>
                    <Button variant="contained" color="primary" onClick={downloadImage}
                        style={{
                            ...buttonProperties,
                            margin: 'auto', // Membuat tombol berada di tengah secara horizontal
                            position: 'absolute', // Membuat tombol menjadi absolut
                            bottom: '-40px', // Menyesuaikan posisi tombol agar berada di luar modal
                            left: '50%', // Menengahkan tombol secara horizontal
                            transform: 'translate(-50%, -50%)' // Menyesuaikan posisi tombol agar tepat di tengah 
                        }}>
                        Mengerti
                    </Button>
                </div>
            </Modal>
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000} // Durasi tampilan notifikasi dalam milidetik (3 detik)
                onClose={handleCloseSnackbar}
                message="Gambar telah disimpan di perangkat Anda."
                anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
            />
        </Grid>
    );
};

export default ResultPage;
