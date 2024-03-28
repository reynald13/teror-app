import React, { useState } from 'react';
import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan5 from '../../images/quizPageImages/PertanyaanImg5.jpg';

const Question5 = ({ onNext }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [points, setPoints] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isAnswerSelected, setIsAnswerSelected] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State untuk mengontrol kapan Snackbar ditampilkan

  const handleAnswerChange = (event) => {
    const selectedAnswer = event.target.value;
    const isChecked = event.target.checked;
    setIsAnswerSelected(true);

    let updatedAnswers = [...answers];

    if (isChecked && !updatedAnswers.includes(selectedAnswer)) {
      updatedAnswers.push(selectedAnswer);
    } else if (!isChecked && updatedAnswers.includes(selectedAnswer)) {
      updatedAnswers = updatedAnswers.filter(answer => answer !== selectedAnswer);
    }

    setAnswers(updatedAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Calculate points based on selected answers
    let selectedPoints = 0;
    answers.forEach(answer => {
      switch (answer) {
        case 'kopi':
          selectedPoints += 1;
          break;
        case 'pedes':
          selectedPoints += 1;
          break;
        case 'berminyak':
          selectedPoints += 1;
          break;
        case 'alkohol':
          selectedPoints += 1;
          break;
        case 'gurih':
          selectedPoints += 1;
          break;
        default:
          selectedPoints += 0;
      }
    });
    setPoints(selectedPoints);

    if (selectedPoints === 0) {
      setSnackbarOpen(true); // Set state Snackbar menjadi true
      return;
    }

    onNext(selectedPoints);
    console.log('Nilai points:', selectedPoints);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Menutup Snackbar ketika diklik
  };

  return (
    <div style={{ padding: '20px' }}>
      <img src={imagePertanyaan5} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Mana sesajen pilihan kamu?</h2> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px'}}>Sssttt….Apakah kamu mendengar sesuatu? Suara langkah kaki terdengar semakin mendekat.
        Seseorang menyodorkan sesajen untuk ritual selanjutnya.
        Sesajen mana yang kamu pilih?
      </p>
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px', fontWeight: 'Bold' }}>Boleh pilih beberapa yang kamu banget.</p>
      <form onSubmit={handleSubmit}>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('kopi') ? '#D32027' : 'white', padding: '10px', color: answers.includes('kopi') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="kopi" checked={answers.includes('kopi')} onChange={handleAnswerChange} className="checkbox-input" />
          Kopi
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('pedes') ? '#D32027' : 'white', padding: '10px', color: answers.includes('pedes') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="pedes" checked={answers.includes('pedes')} onChange={handleAnswerChange} className="checkbox-input" />
          Yang pedes-pedes
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('berminyak') ? '#D32027' : 'white', padding: '10px', color: answers.includes('berminyak') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="berminyak" checked={answers.includes('berminyak')} onChange={handleAnswerChange} className="checkbox-input" />
          Yang berminyak
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('gurih') ? '#D32027' : 'white', padding: '10px', color: answers.includes('gurih') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="gurih" checked={answers.includes('gurih')} onChange={handleAnswerChange} className="checkbox-input" />
          Yang gurih
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('alkohol') ? '#D32027' : 'white', padding: '10px', color: answers.includes('alkohol') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="alkohol" checked={answers.includes('alkohol')} onChange={handleAnswerChange} className="checkbox-input" />
          Alkohol (kamu jahat, tapi enak..)
        </label><br />
        <Button type="submit" style={{ ...buttonProperties, color: 'white', display: 'block', margin: '0 auto' }}>Berikutnya</Button>
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

export default Question5;
