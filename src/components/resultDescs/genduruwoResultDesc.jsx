import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const GenduruwoResultDesc = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ textAlign: 'justify', fontSize: isMobile ? '14px' : 'inherit' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Pantang Pulang Sebelum Tumbang</p>
            <p><span style={{ fontWeight: 'bold' }}>Hasil Terawangan: </span> <br />Dari semua golongan, nggak ada yang lebih ambisius dari kamu. Kamu tuh optimistik banget, plus termasuk tipikal yang cukup perfeksionis. Circle kamu juga luas banget, mulai dari temen sampe klien. Tapi.. Kamu juga termasuk orang yang susah dipahami. Katanya laper, tapi yang dicari kopi. Katanya ngantuk, tapi yang dicari malah Netflix. Belum lagi kalau stress, yang kamu cari adalah kepulan asap, dan satu sloki cuman untuk tipsy. Saking ambisiusnya, kadang kamu suka lupa balik ke realita.</p>
            <p><span style={{ fontWeight: 'bold' }}>Jenis Penghuni Lambung: <br /></span>Genderuwo Tantrum di lambung kamu udah siap buat nyerang kapan aja, dan dimana aja. Biasanya kalo udah diserang, nyeri ulu hati dan susah sendawa bakal selalu kamu rasain. HATI-HATI LOH!</p>
            <p><span style={{ fontWeight: 'bold' }}>Wejangan: </span><br />Boleh kok hidup dengan ambisi, asal nggak lupa sama realita dan stop selalu maksain diri. Daripada terkapar berhari-hari bersama infus karena di amuk Genderuwo Tantrum, coba mulai ubah kebiasaan dan segera konsultasikan lebih lanjut ke professional ya!</p>
        </div>
    );
};

export default GenduruwoResultDesc;
