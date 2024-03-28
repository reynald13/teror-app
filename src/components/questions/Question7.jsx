import React, { useState } from 'react';
import buttonProperties from '../tools/buttonProperties';
import './Questions.css';
import { useTheme } from '@material-ui/core/styles';
import { useMediaQuery } from '@mui/material';
import { Button, Snackbar } from '@material-ui/core';
import imagePertanyaan7 from '../../images/quizPageImages/PertanyaanImg7.jpg'

const Question7 = ({ onNext }) => {
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
        case 'following':
          selectedPoints += 1;
          break;
        case 'doi':
          selectedPoints += 1;
          break;
        case 'pasangan':
          selectedPoints += 1;
          break;
        case 'barang':
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
      <img src={imagePertanyaan7} alt="Gambar" style={{ width: '70%', maxWidth: '400px', display: 'block', margin: '0 auto 20px' }} />
      {/* <h2 style={{ textAlign: 'center', fontWeight: 'bold', fontSize:'20px' }}>Apasih KKN (Kegiatan-Kegiatan Nyeleneh) yang  sering kamu lakuin?</h2> */}
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px' }}>Kamu mulai mendengar suara ketukan pintu berkali-kali.
        Pintu terbuka, dibalik cahaya yang terang, kamu melihat sosok dirimu yang lain.
        Ternyata, sosok itu sedang melakukan uji nyali yang pernah kamu lakukan.
        Kegiatan uji nyali apakah itu?
      </p>
      <p style={{ textAlign: 'center', fontSize: isMobile ? '16px' : '18px', fontWeight: 'Bold' }}>Boleh pilih beberapa yang kamu banget.</p>
      <form onSubmit={handleSubmit}>
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('following') ? '#D32027' : 'white', padding: '10px', color: answers.includes('following') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="following" checked={answers.includes('following')} onChange={handleAnswerChange} className="checkbox-input" />
          Bikin fake account buat kepoin masa lalu doi
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('pasangan') ? '#D32027' : 'white', padding: '10px', color: answers.includes('pasangan') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="pasangan" checked={answers.includes('pasangan')} onChange={handleAnswerChange} className="checkbox-input" />
          Ngecek hp pasangan
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('doi') ? '#D32027' : 'white', padding: '10px', color: answers.includes('doi') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="doi" checked={answers.includes('doi')} onChange={handleAnswerChange} className="checkbox-input" />
          Begadang sampai lupa waktu
        </label><br />
        <label style={{ textAlign: 'center', display: 'block', marginBottom: '-10px', backgroundColor: answers.includes('barang') ? '#D32027' : 'white', padding: '10px', color: answers.includes('barang') ? 'white' : 'black', borderRadius: '25px', paddingRight: '15px' }}>
          <input type="checkbox" name="answer" value="barang" checked={answers.includes('barang')} onChange={handleAnswerChange} className="checkbox-input" />
          Check out barang gak penting-penting amat
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

export default Question7;