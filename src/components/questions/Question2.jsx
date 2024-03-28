import React, { useState, useEffect } from 'react';
//import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
//import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan2 from '../../images/quizPageImages/PertanyaanImg2.jpg';

const Question2 = ({ onNext, onPrevious }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  //const [snackbarOpen, setSnackbarOpen] = useState(false); // State untuk mengontrol kapan Snackbar ditampilkan

  useEffect(() => {
    if (isAnswerSelected) {
      onNext(points);
    }
  }, [isAnswerSelected, onNext, points]);

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
    setIsAnswerSelected(true);

    let selectedPoints = 0;
    switch (selectedAnswer) {
      case 'kenyang':
        selectedPoints = 1;
        break;
      case 'kembung':
        selectedPoints = 2;
        break;
      case 'sesek':
        selectedPoints = 3;
        break;
      default:
        selectedPoints = 0;
    }
    setPoints(selectedPoints);
    console.log('poin yang dipilih: ', selectedPoints);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   if (!isAnswerSelected) {
  //     setSnackbarOpen(true); // Set state Snackbar menjadi true
  //     return;
  //   }

  //   onNext(points);
  //   console.log('Nilai points:', points); 
  // };

  // const handleSnackbarClose = () => {
  //   setSnackbarOpen(false); // Menutup Snackbar ketika diklik
  // };

  return (
    <div style={{ padding: '20px' }}>
      <img src={imagePertanyaan2} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{textAlign: 'center'}}>Seberapa serem teror yang kamu alami?</h2> */}
      {/* <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Kalo abis makan, biasanya kamu..</h3> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Suara-suara aneh semakin berdenging di telingamu.
        Waktu menunjukan pukul 12 malam, tiba-tiba terdengar suara meja diseret.
        Ternyata diatas meja ada makanan.
        Suara aneh bergerak mendekatimu meminta untuk makan.
        Itu ritual yang harus kamu lakukan Selesai makan, 
      </p>
      <p style={{ textAlign: 'center', fontWeight: 'Bold', fontSize: isMobile ? '16px' : '18px' }}>tiba-tiba kamu..</p>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'kenyang' ? '#D32027' : 'white', padding: '10px', color: answer === 'kenyang' ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="radio" name="answer" value="kenyang" checked={answer === 'kenyang'} onChange={handleAnswerChange} className="radio-input" />
          Merasa lega
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'kembung' ? '#D32027' : 'white', padding: '10px', color: answer === 'kembung' ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="radio" name="answer" value="kembung" checked={answer === 'kembung'} onChange={handleAnswerChange} className="radio-input" />
          Begah, terasa kembung, dan mau muntah
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'sesek' ? '#D32027' : 'white', padding: '10px', color: answer === 'sesek' ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="radio" name="answer" value="sesek" checked={answer === 'sesek'} onChange={handleAnswerChange} className="radio-input" />
          Begah banget, sampe sesek, dan susah napas
        </label><br />
        {/* <Button type="submit" style={{...buttonProperties, color: 'white', display: 'block', margin: '0 auto', marginTop: '50px'}}>Berikutnya</Button> */}
      </form>
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen} // Menerima properti untuk menampilkan Snackbar
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Mohon pilih jawaban terlebih dahulu."
      /> */}
    </div>
  );
};

export default Question2;
