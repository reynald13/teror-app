import React from 'react';
import { Container, Typography, Button, Grid, useMediaQuery, useTheme, IconButton } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import HantuImage from '../images/personalizedImages/hantu.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
    },
    content: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        maxWidth: '40%',
        height: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '80%', // Lebar 100% untuk layar ponsel
        },
    },
}));

const PersonalizedPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const location = useLocation();
    const { participantName } = location.state;

    const handleSubmit = async (e) => {
        navigate('/quiz-page', { state: { participantName } });
    };

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Container>
                    <Grid container direction="column" alignItems="center" spacing={0} marginTop={20}>
                        <Grid item>
                            <Typography variant={isMobile ? "subtitle1" : "h5"} fontWeight="bold">Hai, {participantName}.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={isMobile ? "subtitle1" : "h5"} style={{ maxWidth: '700px' }}>Bayangkan kamu berada dalam sebuah ruangan. Ruangan itu gelap, sempit, dan sunyi sekali. Di dalamnya hanya ada kamu.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={isMobile ? "subtitle1" : "h5"} style={{ maxWidth: '700px' }}>Perlahan terdengar suara-suara aneh yang tidak pernah kamu kenali sebelumnya. Mencoba menyergap dan menampakkan wajahnya.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant={isMobile ? "subtitle1" : "h5"} style={{ margin: '20px' }} fontWeight="bold">Siapkah kamu untuk menghadapi mereka?</Typography>
                        </Grid>
                        <Grid item>
                            <IconButton
                                //onClick={openRitualPopup}
                                variant='contained'
                                sx={{
                                    borderRadius: '30px',
                                    width: '130px',
                                    height: 'auto',
                                    bgcolor: '#D32027',
                                    '&:hover': {
                                        bgcolor: '#D32027',
                                    },
                                    color: 'white', // Mengubah warna teks menjadi putih
                                    fontSize: '16px', // Mengatur ukuran font
                                }}
                                onClick={handleSubmit}
                            >Lanjutkan<ChevronRightIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div>
                <img src={HantuImage} className={classes.image} alt="Hantu" />
            </div>
        </div>
    );
};

export default PersonalizedPage;
