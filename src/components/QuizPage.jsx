// QuizPage.js

// This component renders the quiz page.
// It handles navigation between quiz questions, tracks progress, and displays results.
// Props: None

import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepConnector from '@material-ui/core/StepConnector';
import StepIcon from '@material-ui/core/StepIcon';
import LinearProgress from '@material-ui/core/LinearProgress'; // Tambahkan impor untuk LinearProgress
import Button from '@material-ui/core/Button';
import Question1 from './questions/Question1';
import Question2 from './questions/Question2';
import Question3 from './questions/Question3';
import Question4 from './questions/Question4';
import Question5 from './questions/Question5';
import Question6 from './questions/Question6';
import Question7 from './questions/Question7';
import Question8 from './questions/Question8';
import axios from 'axios';
import Typography from '@mui/material/Typography';
//import progressImage from '../images/loadingProgress.png'
import progressImage from '../images/appImages/frashmag-logo-putih.png';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: theme.spacing(2),
    position: 'relative',
  },
  stepper: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: '100px',
  },
  questionContainer: {
    marginTop: theme.spacing(20), //before 25
    padding: '0 30%',
    [theme.breakpoints.down('sm')]: {
      padding: '0' // Mengatur padding menjadi 0 saat lebar layar <= sm (600px)
    }
  },
  centerProgressBar: {
    width: '800%',
    height: '50px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  centerProgressImg: {
    width: '500%',
    height: 'auto',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  centerProgressText: {
    width: '800%',
    height: 'auto',
    position: 'absolute',
    top: '45%',
    left: '150%',
    transform: 'translate(-50%, -50%)',
  },
  backButton: {
    position: 'absolute',
    bottom: '10px',
    left: '10px',
  },
}));

const QuizPage = () => {
  // Theme and media query hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const classes = useStyles();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [totalPoints, setTotalPoints] = useState(0);
  const [progress, setProgress] = useState(0);
  const [previousAnswer, setPreviousAnswer] = useState(null); // Tambahkan state untuk menyimpan jawaban sebelumnya
  const [pointsPerQuestion, setPointsPerQuestion] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const { state } = useLocation();
  const participantName = state ? state.participantName : '';

  // Handle the completion of a quiz question
  const handleQuestionCompletion = async (points, answer) => {
    // Increment currentStep and update totalPoints
    setCurrentStep((prevStep) => prevStep + 1);
    setTotalPoints((prevPoints) => prevPoints + points);
    const updatedTotalPoints = totalPoints + points;

    // Check if all questions are completed
    if (currentStep === 7) {

      // Calculate points for the last question based on the difference between updatedTotalPoints and the sum of pointsPerQuestion
      const pointsForLastQuestion = updatedTotalPoints - pointsPerQuestion.reduce((acc, val) => acc + val, 0);
      const updatedPointsPerQuestion = [...pointsPerQuestion];
      updatedPointsPerQuestion[currentStep] = pointsForLastQuestion;

      // If all questions are completed, update state and send scores to the server
      setIsCompleted(true);
      setShowProgressBar(true);

      try {
        // Send scores to the server
        const response = await axios.post('https://teror-webapp-server.onrender.com/api/scores', {
          name: participantName,
          points: updatedTotalPoints,
          // Pass points per question to the server
          pointsPerQuestion: updatedPointsPerQuestion,
        });

        // Log success or failure of score submission
        if (response.status === 200) {
          console.log('Poin berhasil disimpan ke database');
        } else {
          console.error('Gagal menyimpan poin');
        }
      } catch (error) {
        // Log error if score submission fails
        console.error('Gagal menyimpan poin:', error.message);
      }

      // Navigate to the result page after a delay
      setTimeout(() => {
        navigate('/result-page', { state: { participantName: participantName, totalPoints: updatedTotalPoints } });
      }, 3000);
    } else {
      setPreviousAnswer(answer);
      setPointsPerQuestion((prevPoints) => {
        const newPoints = [...prevPoints];
        newPoints[currentStep] = points;
        console.log("current step", currentStep); // Add this line for debugging
        console.log("New points per question array:", newPoints); // Add this line for debugging

        // Update scores on the server for every question completion
        try {
          axios.post('https://teror-webapp-server.onrender.com/api/scores', {
            name: participantName,
            points: updatedTotalPoints,
            pointsPerQuestion: newPoints,
          }).then((response) => {
            if (response.status === 200) {
              console.log('Poin berhasil disimpan ke database');
            } else {
              console.error('Gagal menyimpan poin');
            }
          });
        } catch (error) {
          console.error('Gagal menyimpan poin:', error.message);
        }

        return newPoints;
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTotalPoints((prevTotal) => prevTotal - pointsPerQuestion[currentStep - 1]);
    }
  };

  const steps = ['', '', '', '', '', '', '', ''];

  const questionComponents = [
    <Question1 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question2 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question3 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question4 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question5 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question6 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question7 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />,
    <Question8 onNext={handleQuestionCompletion} onPrevious={handlePrevious} />
  ];

  // Use custom ImageStepIcon component to render step icons with different colors
  const ImageStepIcon = ({ active, completed }) => {
    // Determine image source based on step status
    const imageSrc = active ? 'progressRed.png' : completed ? 'progressRed.png' : 'progressWhite.png';
    return (
      // Render the image with appropriate width and height
      <img src={imageSrc} alt="" style={{ width: isMobile ? '10px' : '20px', height: 'auto' }} />
    );
  };

  const styles = {
    colorPrimary: {
      backgroundColor: 'white', // Override progress bar color
    },
    barColorPrimary: {
      backgroundColor: 'red', // Override buffer bar color (if applicable)
    },
  };

  const StyledLinearProgress = withStyles(styles)(LinearProgress);

  const QontoConnector = withStyles({
    alternativeLabel: {
      top: isMobile ? 8 : 9,
      left: isMobile ? 'calc(-50% + 6px)' : 'calc(-50% + 16px)',
      right: isMobile ? 'calc(50% + 6px)' : 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#D51A1A',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#D51A1A',
      },
    },
    line: {
      borderColor: '#fff',
      borderTopWidth: 2,
      borderRadius: 1,
      width: isMobile ? 'calc(100% + 10px)' : 'calc(100% + 32px)',
      marginLeft: isMobile ? '-2px' : '-7px',
    },
  })(StepConnector);


  useEffect(() => {
    let interval;
    if (isCompleted && showProgressBar) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress === 100) {
            clearInterval(interval);
          }

          let diff;

          // Slow down the progress when it's almost complete (90% or more)
          if (prevProgress >= 90) {
            diff = Math.random() * 5; // Slower increment
          } else {
            diff = Math.random() * 50; // Faster increment
          }

          return Math.min(prevProgress + diff, 100);
        });
      }, 500); // Update progress value every 500 milliseconds
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCompleted, showProgressBar]);

  const shouldRenderStepper = !isCompleted;

  return (
    <div className={classes.root}>
      {shouldRenderStepper && (
        <Stepper activeStep={currentStep} className={classes.stepper} alternativeLabel connector={<QontoConnector />}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepIcon
                icon={<ImageStepIcon active={index === currentStep} completed={index < currentStep} />}
              />
            </Step>
          ))}
        </Stepper>
      )}
      <div className={classes.questionContainer}>
        {questionComponents[currentStep]}
        {currentStep > 0 && !isCompleted && (
          <Button variant="outlined"
            color="primary"
            className={classes.backButton} onClick={handlePrevious}
            style={{
              borderRadius: '30px',
              color: 'white',
              borderColor: 'white',
              width: 'auto',
              height: 'auto',
              fontSize: '10px',
              marginLeft: '30px'
            }}>Sebelumnya
          </Button>
        )}
      </div>
      {isCompleted && showProgressBar && (
        <div>
          <Typography
            className={classes.centerProgressText}>
            Menunggu proses ritual
          </Typography>
          <StyledLinearProgress
            variant="determinate"
            value={progress}
            className={classes.centerProgressBar} />
          <img src={progressImage} className={classes.centerProgressImg} alt='LoadingProgress' />
        </div>
      )}
    </div>
  );
};

export default QuizPage;
