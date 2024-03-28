import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Grid, Modal, useMediaQuery, useTheme, Button } from '@mui/material';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import LoginImg from '../images/formPageImages/login-image.png';
import useForm from '../hooks/useForm';
import axios from 'axios';
import buttonProperties from './tools/buttonProperties';
import BackgroudImg from '../images/appImages/background-terror.jpg';
import optionsKota from '../components/utils/data-kota.json';

const getFreshModel = () => ({
    name: '',
    telfon: '',
    kota: null,
    umur: null
});

const validateForm = (formData) => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = 'Nama harus diisi';
    }

    if (!formData.telfon.trim()) {
        errors.telfon = 'Nomor handphone harus diisi';
    } else if (!/^\d+$/.test(formData.telfon)) {
        errors.telfon = 'No. Telfon hanya boleh berisi angka';
    } else if (formData.telfon.length < 10 || formData.telfon.length > 12) {
        errors.telfon = 'Nomor handphone harus terdiri dari 12 angka';
    }

    if (!formData.kota) {
        errors.kota = 'Domisili harus dipilih';
    }

    if (!formData.umur) {
        errors.umur = 'Umur harus dipilih';
    }

    return errors;
};

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 25,
        marginLeft: '1',
        height: '40px',
    },
    textField: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 25,
        height: '40px',
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '500%',
        padding: '10px',
        maxWidth: '400px',
        margin: 'auto',
    },
    image: {
        width: '80%',
        height: 'auto',
    },
    label: {
        marginBottom: '5px', // Reduced label-input gap
    },
}));

const FormPage = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const classes = useStyles();
    const navigate = useNavigate();

    const { formData, handleChange } = useForm(getFreshModel);
    const [errors, setErrors] = useState({});

    const [isFocusedName, setIsFocusedName] = React.useState(false);
    const [isFocusedPhone, setIsFocusedPhone] = React.useState(false);
    const [isFocusedCity, setIsFocusedCity] = React.useState(false);
    const [isFocusedAge, setIsFocusedAge] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm(formData);
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            try {
                const payload = {
                    name: formData.name,
                    phone: formData.telfon,
                    city: formData.kota.label,
                    age: formData.umur.label
                };

                const response = await axios.post('https://teror-webapp-server.onrender.com/api/participants', payload);

                if (response.status === 200) {
                    console.log('Data berhasil disimpan:', response.data);
                    // navigate('/quiz-page', { state: { participantName: formData.name } });
                    navigate('/personalized-page', { state: { participantName: formData.name } });
                } else {
                    console.error('Gagal menyimpan data');
                }
            } catch (error) {
                console.error('Gagal menyimpan data:', error);
            }
        }
    };

    // const optionsUmur = [];
    // for (let i = 18; i <= 50; i++) {
    //     optionsUmur.push({ label: i.toString() });
    // }

    const optionsUmur = [
        { label: '18-24' },
        { label: '25-34' },
        { label: '35-44' },
        { label: '45-54' },
        { label: '55-64' },
        { label: '65++' }
    ];

    const [isRitualOpen, setIsRitualOpen] = React.useState(false);

    const openRitualPopup = () => {
        setIsRitualOpen(true);
    };

    const closeRitualPopup = () => {
        setIsRitualOpen(false);
    };

    return (
        <form className={classes.formContainer} onSubmit={handleSubmit} style={{ padding: '20px' }}>
            <img src={LoginImg} alt="Ilustrasi login" className={classes.image} />
            <Typography
                style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}
                variant="h3"
                gutterBottom
            >
                Apakah kamu selamat dari teror?
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Kita kenalan dulu yuk!
            </Typography>

            {/* Grid container untuk Nama dan No. Telfon */}
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => setIsFocusedName(true)}
                        onBlur={() => {
                            if (!formData.name) {
                                setIsFocusedName(false);
                            }
                        }}
                        label="Nama"
                        variant="standard"
                        error={!!errors.name}
                        helperText={errors.name ? errors.name : ''}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                marginLeft: '20px',
                                width: '100%',
                                height: '10px',
                                marginBottom: '10px',
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                marginLeft: '20px',
                                marginTop: '-10px',
                                color: isFocusedName ? 'transparent' : 'black'
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.textField}
                        name="telfon"
                        value={formData.telfon}
                        onChange={handleChange}
                        onFocus={() => setIsFocusedPhone(true)}
                        onBlur={() => {
                            if (!formData.name) {
                                setIsFocusedPhone(false);
                            }
                        }}
                        label="Nomor Handphone?"
                        variant="standard"
                        error={!!errors.telfon}
                        helperText={errors.telfon}
                        InputProps={{
                            disableUnderline: true,
                            style: {
                                marginLeft: '20px',
                                width: '100%',
                                height: '10px',
                                marginBottom: '10px',
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                marginLeft: '20px',
                                marginTop: '-10px',
                                color: isFocusedPhone ? 'transparent' : 'black'
                            }
                        }}
                    />
                </Grid>
            </Grid>

            {/* Grid container untuk Kota dan Umur */}
            <Grid container spacing={2} style={{ marginRight: '30px' }}>
                <Grid item xs={7}>
                    <Autocomplete
                        className={classes.formControl}
                        name="kota"
                        value={formData.kota}
                        onChange={(event, newValue) => handleChange({
                            target: {
                                name: 'kota',
                                value: newValue
                            }
                        })}
                        onFocus={() => setIsFocusedCity(true)}
                        onBlur={() => {
                            if (!formData.name) {
                                setIsFocusedCity(false);
                            }
                        }}
                        options={optionsKota}
                        autoHighlight
                        renderInput={(params) => (
                            <React.Fragment>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <TextField
                                        {...params}
                                        label="Domisili"
                                        variant="standard"
                                        error={!!errors.kota}
                                        helperText={errors.kota}
                                        InputProps={{
                                            ...params.InputProps, disableUnderline: true,
                                            style: {
                                                marginLeft: '20px',
                                                marginTop: '-1px', width: '80%',
                                                height: '40px'
                                            }
                                        }}
                                        InputLabelProps={{
                                            style: {
                                                marginLeft: '20px',
                                                marginTop: '-10px',
                                                color: isFocusedCity ? 'transparent' : 'black'
                                            }
                                        }}
                                    />
                                    {/* <Divider orientation="vertical" flexItem style={{ backgroundColor: 'yellow', height: 'auto' }} /> */}
                                </div>
                            </React.Fragment>
                        )}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Autocomplete
                        className={classes.formControl}
                        name="umur"
                        value={formData.umur}
                        onChange={(event, newValue) => handleChange({ target: { name: 'umur', value: newValue } })}
                        onFocus={() => setIsFocusedAge(true)}
                        onBlur={() => {
                            if (!formData.name) {
                                setIsFocusedAge(false);
                            }
                        }}
                        options={optionsUmur}
                        autoHighlight
                        renderInput={(params) => <TextField {...params} label="Umur"
                            variant="standard"
                            error={!!errors.umur}
                            helperText={errors.umur}
                            InputProps={{
                                ...params.InputProps, disableUnderline: true,
                                style: {
                                    marginLeft: '20px',
                                    marginTop: '-1px', width: '80%',
                                    height: '40px'
                                }
                            }}
                            InputLabelProps={{
                                style: {
                                    marginLeft: '20px',
                                    marginTop: '-10px',
                                    color: isFocusedAge ? 'transparent' : 'black',
                                }
                            }}
                        />}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{
                    ...buttonProperties, display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px'
                }}>
                Masuk
            </Button>
            <Button
                variant='outlined'
                onClick={openRitualPopup}
                sx={{
                    borderRadius: '30px',
                    width: 'auto',
                    height: 'auto',
                    color: 'white',
                    borderColor: 'white',
                    marginTop: '25px',
                    marginRight: '7px',
                    '&:hover': {
                        borderColor: 'white', // Set the same color as default
                    },
                    '@media (min-width: 768px)': { // Media query for screens wider than 768px (typically for laptops/desktops)
                        width: '40%', // Set width to 40% for laptops/desktops
                    },
                }}
                className={classes.ritualButton}
            >
                PANDUAN RITUAL
            </Button>

            <Modal open={isRitualOpen}
                onClose={() => setIsRitualOpen(false)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20
                }}>
                <div style={{
                    padding: 50,
                    margin: isMobile ? 0 : 350,
                    borderRadius: '20px',
                    backgroundImage: `url(${BackgroudImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                    position: 'relative',
                }}>
                    <h2 style={{ margin: '3px 0', color: '#D32027', fontFamily: 'Spot, Poppins', fontWeight: 'bold', textAlign: 'center' }}>PANDUAN RITUAL</h2>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>1. Pilih jawaban dari 8 pertanyaan yang kamu rasain saat ini</p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>2. Kalo udah selesai terisi, kamu bakal dapat hasil Teror Card tentang jenis teror penunggu lambung kamu</p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>3. Jangan lupa, setelah muncul Teror Card, klik tombol simpan dan bagikan Teror Cardmu lewat Instagram story dengan mention @freshmag.id dengan hashtag
                        <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> #TerorLambung</span>
                        dan
                        <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}> #KenaliTerormu</span></p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>4. Bakal ada hadiah menarik dari Freshmag, info lebih lanjut follow IG @freshmag.id</p>
                    <p style={{ margin: '0px 0', fontSize: isMobile ? 12 : 16 }}>5. Periode kuis berlaku hingga 30 April 2024</p>
                    <p style={{ margin: '20px 0', fontSize: isMobile ? 12 : 16, textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold', fontSize: isMobile ? 12 : 16 }}>Selamat menjalankan ritualmu!</span></p>
                    <Button variant="contained" color="primary" onClick={closeRitualPopup}
                        style={{
                            ...buttonProperties,
                            margin: 'auto', // Membuat tombol berada di tengah secara horizontal
                            position: 'absolute', // Membuat tombol menjadi absolut
                            bottom: '-40px', // Menyesuaikan posisi tombol agar berada di luar modal
                            left: '50%', // Menengahkan tombol secara horizontal
                            transform: 'translate(-50%, -50%)' // Menyesuaikan posisi tombol agar tepat di tengah 
                        }}>
                        Mengerti
                    </Button>
                </div>
            </Modal>
        </form>
    );
};

export default FormPage;