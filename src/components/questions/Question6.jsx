import React, { useState } from 'react';
import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan6 from '../../images/quizPageImages/PertanyaanImg6.jpg';

const Question6 = ({ onNext }) => {
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
        case 'rebahan':
          selectedPoints += 1;
          break;
        case 'abnormal':
          selectedPoints += 1;
          break;
        case 'berasap':
          selectedPoints += 1;
          break;
        case 'overthinking':
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
    // <div style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}></div>
    <div style={{ padding: '20px' }}>
      <img src={imagePertanyaan6} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>Hobi kamu apasih?</h2> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Teror tidak akan datang begitu saja.
        Jangan-jangan kamu yang mengundang mereka.
        Buktikan dengan ritual yang sering kamu lakukan!
      </p>
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px', fontWeight: 'Bold' }}>Boleh pilih beberapa yang kamu banget.</p>
      <form onSubmit={handleSubmit}>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('rebahan') ? '#D32027' : 'white', padding: '10px', color: answers.includes('rebahan') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="rebahan" checked={answers.includes('rebahan')} onChange={handleAnswerChange} className="checkbox-input" />
          Abis makan rebahan
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('abnormal') ? '#D32027' : 'white', padding: '10px', color: answers.includes('abnormal') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="abnormal" checked={answers.includes('abnormal')} onChange={handleAnswerChange} className="checkbox-input" />
          Tidur abnormal (kurang dari 8 jam sehari)
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('berasap') ? '#D32027' : 'white', padding: '10px', color: answers.includes('berasap') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="berasap" checked={answers.includes('berasap')} onChange={handleAnswerChange} className="checkbox-input" />
          Rokok, pod, vape, kemenyan, semua yang berasap deh!
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('overthinking') ? '#D32027' : 'white', padding: '10px', color: answers.includes('overthinking') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="overthinking" checked={answers.includes('overthinking')} onChange={handleAnswerChange} className="checkbox-input" />
          Overthinking dan stres
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

export default Question6;
