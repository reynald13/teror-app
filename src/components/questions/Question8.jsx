import React, { useState } from 'react';
import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan8 from '../../images/quizPageImages/PertanyaanImg8.jpg'

const Question8 = ({ onNext }) => {
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
        case 'hamil':
          selectedPoints += 1;
          break;
        case 'pikiran':
          selectedPoints += 1;
          break;
        case 'obesitas':
          selectedPoints += 1;
          break;
        case 'pencernaan':
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
      <img src={imagePertanyaan8} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize:'20px'}}>Apa kondisi dibawah ini yang sedang kamu atau pernah kamu alami?</h2> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Setelah tertatih karena teror, kamu melihat sebuah lorong terang menuju jalan keluar.
        Kamu perlahan berjalan ke sana, namun, ada hal yang membuat langkahmu melambat.
      </p>
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px', fontWeight: 'Bold' }}>Kondisi apa yang kamu alami?</p>
      {/* <p style={{ textAlign: 'center', fontWeight: '500' }}>Kalo nggak ada atau nggak relate<i> skip</i>, aja!</p> */}
      <form onSubmit={handleSubmit}>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('hamil') ? '#D32027' : 'white', padding: '10px', color: answers.includes('hamil') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="hamil" checked={answers.includes('hamil')} onChange={handleAnswerChange} className="checkbox-input" />
          Lagi hamil
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('pikiran') ? '#D32027' : 'white', padding: '10px', color: answers.includes('pikiran') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="pikiran" checked={answers.includes('pikiran')} onChange={handleAnswerChange} className="checkbox-input" />
          Lagi banyak tekanan
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('obesitas') ? '#D32027' : 'white', padding: '10px', color: answers.includes('obesitas') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="obesitas" checked={answers.includes('obesitas')} onChange={handleAnswerChange} className="checkbox-input" />
          Obesitas
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('pencernaan') ? '#D32027' : 'white', padding: '10px', color: answers.includes('pencernaan') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="pencernaan" checked={answers.includes('pencernaan')} onChange={handleAnswerChange} className="checkbox-input" />
          Punya gangguan pencernaan
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

export default Question8;