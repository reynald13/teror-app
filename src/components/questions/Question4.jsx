import React, { useState, useEffect } from 'react';
import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan4 from '../../images/quizPageImages/PertanyaanImg4.jpg';

const Question4 = ({ onNext }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState('');
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State untuk mengontrol kapan Snackbar ditampilkan

  // useEffect(() => {
  //   if (isAnswerSelected) {
  //     onNext(points);
  //   }
  // }, [isAnswerSelected, onNext, points]);

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    setAnswer(selectedAnswer);
    setIsAnswerSelected(true);

    let selectedPoints = 0;
    switch (selectedAnswer) {
      case 'nggak':
        selectedPoints = 1;
        break;
      case 'kentut':
        selectedPoints = 2;
        break;
      case 'cairan':
        selectedPoints = 3;
        break;
      default:
        selectedPoints = 1;
    }
    setPoints(selectedPoints);
    console.log('poin yang dipilih: ', selectedPoints);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isAnswerSelected) {
      setSnackbarOpen(true); // Set state Snackbar menjadi true
      return;
    }

    onNext(points);
    console.log('Nilai points:', points);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Menutup Snackbar ketika diklik
  };

  return (
    <div style={{ padding: '20px' }}>
      <img src={imagePertanyaan4} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{textAlign: 'center'}}>Seberapa serem teror yang kamu alami?</h2> */}
      {/* <h3 style={{ textAlign: 'center', fontWeight: 'bold' }}>Selain sendawa, suka ngerasa apalagi nih?</h3> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Hawa mencekam semakin terasa. Sekarang, giliran lambungmu yang mulai diteror.
        Kamu berteriak meminta tolong.
        Tapi, tak ada yang datang.
      </p>
      <p style={{ textAlign: 'center', fontWeight: 'Bold', fontSize: isMobile ? '16px' : '18px' }}>Teror apalagi yang kamu rasakan?</p>
      <form onSubmit={handleSubmit}>
        {/* <form> */}
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'nggak' ? '#D32027' : 'white', padding: '10px', color: answer === 'nggak' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="nggak" checked={answer === 'nggak'} onChange={handleAnswerChange} className="radio-input" />
          Perut terasa kembung
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'kentut' ? '#D32027' : 'white', padding: '10px', color: answer === 'kentut' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="kentut" checked={answer === 'kentut'} onChange={handleAnswerChange} className="radio-input" />
          Susah buang angin
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer === 'cairan' ? '#D32027' : 'white', padding: '10px', color: answer === 'cairan' ? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input type="radio" name="answer" value="cairan" checked={answer === 'cairan'} onChange={handleAnswerChange} className="radio-input" />
          Kalo sendawa, kaya ada ‘cairan’ yang naik ke tenggorokan
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answer !== '' && answer !== 'nggak' && answer !== 'kentut' && answer !== 'cairan' ? '#D32027' : 'white', padding: '10px',
        color: answer !== '' && answer !== 'nggak' && answer !== 'kentut' && answer !== 'cairan'? 'white' : 'black', borderRadius: '25px', paddingRight: '20px' }}>
          <input
            type="text"
            name="answer"
            onChange={handleAnswerChange}
            placeholder="Ngerasain teror lainnya (Isi di sini)"
            style={{
              width: '100%',
              border: 'none', // Menghilangkan garis border
              outline: 'none', // Menghilangkan outline saat diklik
              fontSize: isMobile ? '14px' : '18px',
              textAlign: 'center',
              background: 'transparent'
            }}
          />
        </label><br />
        <Button type="submit" style={{ ...buttonProperties, color: 'white', display: 'block', margin: '0 auto', marginTop: '50px' }}>Berikutnya</Button>
      </form>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snackbarOpen} // Menerima properti untuk menampilkan Snackbar
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Mohon pilih jawaban terlebih dahulu."
      />
    </div>
  );
};

export default Question4;