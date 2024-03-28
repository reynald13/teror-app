import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, useMediaQuery, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import BackgroudImg from '../images/appImages/background-terror.jpg';
import buttonProperties from './tools/buttonProperties';
import FreshmagLogo from '../images/appImages/frashmag-logo-putih.png';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
    },
    imageContainer: {
        maxWidth: '80%',
        width: '100%',
        marginBottom: '20px',
        overflow: 'hidden', // Memastikan gambar tidak keluar dari kontainer
    },
    image: {
        width: '110%',// Mengisi kontainer secara penuh
        height: 'auto', // Memastikan gambar tetap proporsional
        objectFit: 'cover',
        borderRadius: '10px',
        marginLeft: '-5%',
        [theme.breakpoints.up('md')]: {
            width: '60%', // Ketika di layar tablet, lebar gambar menjadi 60%
        },
        [theme.breakpoints.up('lg')]: {
            width: '35%', // Ketika di layar besar (laptop), lebar gambar menjadi 40%
            marginLeft: '0%',
            marginTop: '20px',
            marginBottom: '-35px'
        },
    },
    buttonStack: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px', // Menambahkan ruang di atas tombol
    },
    mulaiButton: {
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        marginBottom: '10px',
    },
    ritualButton: {
        margin: '0 auto',
        fontSize: '12px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        color: 'white',
        borderColor: 'white',
    },
    freshmagLogo: {
        width: '10%', // Sesuaikan dengan lebar yang diinginkan
        position: 'absolute',
        top: 20,
        marginTop: '15px',
        [theme.breakpoints.down('sm')]: {
            width: '30%', // Lebar 100% untuk layar ponsel
        },
    },
}));

const CoverPage = ({ imageUrl, stopMusic, startMusic }) => {
    useEffect(() => {
        stopMusic();
    }, [stopMusic]);

    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [isRitualOpen, setIsRitualOpen] = React.useState(false);

    const openRitualPopup = () => {
        setIsRitualOpen(true);
    };

    const closeRitualPopup = () => {
        setIsRitualOpen(false);
    };

    return (
        <div className={classes.root}>
            <img src={FreshmagLogo} alt="Freshmag Logo" className={classes.freshmagLogo} />
            <div className={classes.imageContainer}>
                <img src={imageUrl} alt="Cover" className={classes.image} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                className={classes.buttonStack}>
                {/* <Link to="/form-page"> */}
                <Button
                    onClick={openRitualPopup}
                    variant='contained'
                    color='error'
                    sx={{
                        borderRadius: '30px',
                        width: '150px',
                        height: '40px',
                        bgcolor: '#D32027',
                    }}
                    className={classes.mulaiButton}
                >
                    Mulai
                </Button>
                {/* </Link> */}
                {/* <Button
                    variant='outlined'
                    onClick={openRitualPopup}
                    sx={{
                        borderRadius: '30px',
                        width: '100%',
                        height: '30px',
                        color: 'white',
                        borderColor: 'white',
                        marginTop: '30px',
                        '&:hover': {
                            borderColor: 'white',
                        },
                    }}
                    className={classes.ritualButton}>
                    PANDUAN RITUAL
                </Button> */}
                <Modal open={isRitualOpen}
                    onClose={() => setIsRitualOpen(false)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 20
                    }}>
                    <div style={{
                        padding: 50,
                        margin: isMobile ? 0 : 350,
                        borderRadius: '20px',
                        backgroundImage: `url(${BackgroudImg})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white',
                        position: 'relative',
                    }}>
                        <h2 style={{ margin: '3px 0', color: '#D32027', fontFamily: 'Spot, Poppins', fontWeight: 'bold', textAlign: 'center' }}>PANDUAN RITUAL</h2>
                        <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>1. Pilih jawaban dari 8 pertanyaan yang kamu rasain saat ini</p>
                        <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>2. Kalo udah selesai terisi, kamu bakal dapat hasil Teror Card tentang jenis teror penunggu lambung kamu</p>
                        <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>3. Jangan lupa, setelah muncul Teror Card, klik tombol simpan dan bagikan Teror Cardmu lewat Instagram story dengan mention @freshmag.id dengan hashtag
                            <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> #TerorLambung </span>
                            dan
                            <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> #KenaliTerormu</span></p>
                        <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>4. Bakal ada hadiah menarik dari Freshmag, info lebih lanjut follow IG @freshmag.id</p>
                        <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>5. Periode kuis berlaku hingga 30 April 2024</p>
                        <p style={{ margin: '20px 0', fontSize: isMobile ? 12 : 16, textAlign: 'center' }}>
                            <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}>Selamat menjalankan ritualmu!</span></p>
                        <Link to="/form-page">
                            <Button variant="contained" color="primary" onClick={startMusic}
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
                        </Link>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default CoverPage;
