import React, { useState, useEffect } from 'react';
//import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
//import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan1 from '../../images/quizPageImages/PertanyaanImg1.jpg';


const Question1 = ({ onNext }) => {
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
      case 'engga':
        selectedPoints = 1;
        break;
      case 'sewajarnya':
        selectedPoints = 2;
        break;
      case 'keterusan':
        selectedPoints = 3;
        break;
      default:
        selectedPoints = 0;
    }
    setPoints(selectedPoints);
    console.log('poin yang dipilih: ', selectedPoints);
  };

  // const handleSnackbarClose = () => {
  //   setSnackbarOpen(false); // Menutup Snackbar ketika diklik
  // };

  return (
    <div style={{ padding: '20px' }}>
      <img src={imagePertanyaan1} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Seberapa serem teror yang kamu alami?</h2> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Suasana semakin mencekam.
        Perlahan mulai terasa sesuatu yang berusaha keluar dari tubuhmu.
        Teror datang. Sendawa.
      </p>
      <p style={{ textAlign: 'center', fontWeight: 'Bold', fontSize: isMobile ? '16px' : '18px' }}>Kamu merasa...</p>
      <form>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'engga' ? '#D32027' : 'white', padding: '10px', color: answer === 'engga' ? 'white' : 'black', borderRadius: '35px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="engga" checked={answer === 'engga'} onChange={handleAnswerChange} className="radio-input" />
          Familiar? Malah susah buat sendawa 🙁
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'sewajarnya' ? '#D32027' : 'white', padding: '10px', color: answer === 'sewajarnya' ? 'white' : 'black', borderRadius: '35px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="sewajarnya" checked={answer === 'sewajarnya'} onChange={handleAnswerChange} className="radio-input" />
          Tercekat, angin ketahan gak mau keluar
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'keterusan' ? '#D32027' : 'white', padding: '10px', color: answer === 'keterusan' ? 'white' : 'black', borderRadius: '35px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="keterusan" checked={answer === 'keterusan'} onChange={handleAnswerChange} className="radio-input" />
          Kembung dan terteror terus-terusan
        </label><br />
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

export default Question1;
