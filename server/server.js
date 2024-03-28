const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = 80;
const cors = require('cors');

const config = require('./dabatase/db.js'); // Memperbaiki nama file konfigurasi database
const participantRouter = require('./routes/participants.js'); // Mengubah nama file routes

// Menggunakan async/await untuk menangani koneksi database
mongoose.connect(config.DB)
    .then(() => console.log('Database is connected'))
    .catch(err => console.error('Can not connect to the database', err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', participantRouter);

app.listen(PORT, () => console.log('Server is running on Port:', PORT));
