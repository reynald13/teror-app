import React, { useState, useEffect } from 'react';
//import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
//import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan3 from '../../images/quizPageImages/PertanyaanImg3.jpg';

const Question3 = ({ onNext }) => {
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
      case 'nggak':
        selectedPoints = 1;
        break;
      case 'pernah':
        selectedPoints = 2;
        break;
      case 'setiap':
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
      <img src={imagePertanyaan3} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{textAlign: 'center'}}>Seberapa serem teror yang kamu alami?</h2> */}
      {/* <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Pernah ngalamin dada panas tiba-tiba ga sih?</h3> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px'}}>Seketika rasa panas mulai terasa di ujung kakimu, menjalar cepat sampai terasa rasa terbakar di dadamu.
      </p>
      <p style={{ textAlign: 'center', fontWeight: 'Bold', fontSize: isMobile ? '16px' : '18px' }}>Apakah teror ini sering kamu rasakan?</p>
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'nggak' ? '#D32027' : 'white', padding: '10px', color: answer === 'nggak' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="nggak" checked={answer === 'nggak'} onChange={handleAnswerChange} className="radio-input" />
          Nggak sama sekali
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'pernah' ? '#D32027' : 'white', padding: '10px', color: answer === 'pernah' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="pernah" checked={answer === 'pernah'} onChange={handleAnswerChange} className="radio-input" />
          Pernah beberapa kali, sampe susah nafas!
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'setiap' ? '#D32027' : 'white', padding: '10px', color: answer === 'setiap' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="setiap" checked={answer === 'setiap'} onChange={handleAnswerChange} className="radio-input" />
          Sering banget, apalagi selesai makan 🙁
        </label><br />
        {/* <Button type="submit" style={{ ...buttonProperties, color: 'white', display: 'block', margin: '0 auto', marginTop: '50px' }}>Berikutnya</Button> */}
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

export default Question3;