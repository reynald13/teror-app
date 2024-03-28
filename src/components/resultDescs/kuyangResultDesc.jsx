import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const KuyangResultDesc = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ textAlign: 'justify', fontSize: isMobile ? '14px' : 'inherit' }}>
            <p style={{ fontWeight: 'bold', fontSize: '20px' }}>Nggak Sibuk Nggak Sukses</p>
            <p><span style={{ fontWeight: 'bold' }}>Hasil Terawangan: </span> <br />Kamu itu pinter banget. Kalender kamu jarang banget ada tanggal merahnya. Temen kamu banyak, tapi klien lebih banyak. Keseharian kamu selalu disibukkan dengan beragam hal. Mulai dari yang bermanfaat, sampe hal-hal yang kadang bikin orang geleng kepala. Sibuk kerja, sibuk ngejar cita-cita, sibuk galau, sibuk ngitung tagihan, sampe sibuk stres karena mikirin masa depan. Orang kaya kamu, biasanya punya gaya hidup yang kadang makan, kadang nggak. Tapi selalu ngasih ruang buat ngopi. Katanya sih biar dapet energi non-stop buat ngejar kehidupan.</p>
            <p><span style={{ fontWeight: 'bold' }}>Jenis Penghuni Lambung: </span> <br />Ada Kuyang Goyang di lambung kamu, yang kerjanya banting tulang untuk ngasih teror sampe kamu mual-mual. Harus mulai waspada nih!</p>
            <p><span style={{ fontWeight: 'bold' }}>Wejangan: </span> <br />Demi meraih cita-cita dan masa depan gemilang, si Kuyang nggak boleh kamu cuekin! Nanti yang ada, semua malah terbengkalai karena mual seharian. Ada baiknya kalau mulai terasa mual, langsung konsultasikan ke professional ya.</p>
        </div>
    );
};

export default KuyangResultDesc;
