import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const JenglotResultDesc = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ textAlign: 'justify', fontSize: isMobile ? '14px' : 'inherit' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Paling Suka Ena-Ena</p>
            <p><span style={{ fontWeight: 'bold' }}>Hasil Terawangan: </span> <br />Kamu adalah tipe orang yang selalu nyikat yang enak-enak, dan selalu mementingkan enjoyment di setiap momen yang kamu lalui. Apa yang kamu makan, apa yang kamu minum, adalah yang kamu mau. You want it, you get it. Ketika kamu stress, kamu udah tau healing apa yang cocok buat dilakuin. Kamu juga tipikal yang cenderung “bodo amat,” alias cuek banget. Tapi di sisi lain, kamu juga masih siaga untuk selalu jaga diri.</p>
            <p><span style={{ fontWeight: 'bold' }}>Jenis Penghuni Lambung: </span> <br />Jenglot Pecicilan! Ibarat kata, teror yang kamu terima dari si Jenglot itu cenderung masih bisa di kontrol, karena kamu masih bisa ngatur dan jaga diri. Jadi.. Sejauh ini, lambung masih aman, bestie!</p>
            <p><span style={{ fontWeight: 'bold' }}>Wejangan: </span> <br />Walaupun aman, jangan pernah lengah ya! Tetap jaga terus si Jenglot, biar selalu aman dan nggak bikin susah sendawa dan susah kentut!</p>
        </div>
    );
};

export default JenglotResultDesc;