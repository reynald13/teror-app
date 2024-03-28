// Import dependencies
import React, { useState, useEffect, memo, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Howl } from 'howler';
import { ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

// Import custom components
import Layout from './components/Layout';
import CoverPage from './components/CoverPage';

// Import background and theme images
import backgroundImg from './images/appImages/background-terror.jpg';
import coverImage from './images/appImages/cover-image.png';
import theme from './theme';

const LazyFormPage = React.lazy(() => import('./components/FormPage'));
const LazyPersonalizedPage = React.lazy(() => import('./components/PersonalizedPage'));
const LazyQuizPage = React.lazy(() => import('./components/QuizPage'));
const LazyResultPage = React.lazy(() => import('./components/ResultPage'));

const MemoizedCoverPage = memo(CoverPage);

// Main App component
const App = () => {
  // State and variables initialization
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [music, setMusic] = useState<Howl | null>(null); // Music state with Howl type
  const location = useLocation();

  // Effect hook to load music and handle cleanup
  useEffect(() => {
    let mounted = true;

    // Function to load music asynchronously
    const loadMusic = async () => {
      try {
        // Import music file dynamically
        const musicFile = await import('./sounds/Backsound.mp3');
        // Create a new Howl instance with loaded music
        const newMusic = new Howl({
          src: [musicFile.default],
          loop: true,
          volume: 0.5,
        });
        // Set the music state only if the component is still mounted
        if (mounted) {
          setMusic(newMusic);
        }
      } catch (error) {
        console.error('Error loading music:', error);
      }
    };

    // Call the function to load music
    loadMusic();

    // Cleanup function to unload music when component is unmounted
    return () => {
      mounted = false;
      if (music) {
        music.unload();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to start playing music
  const startMusic = () => {
    setIsMusicPlaying(true);
    music?.play(); // Use optional chaining to avoid errors if music is null
  };

  // Function to stop playing music
  const stopMusic = () => {
    setIsMusicPlaying(false);
    music?.stop(); // Use optional chaining to avoid errors if music is null
  };

  // Function to toggle music play/pause
  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying);
    if (music) {
      isMusicPlaying ? music.stop() : music.play();
    }
  };

  // Function to check if the current page is either cover or result page
  const isCoverOrResultPage = () => {
    return location.pathname === '/' || location.pathname === '/result-page';
  };

  const renderMusicControlButton = () => {
    if (!isCoverOrResultPage()) {
      return (
        <div style={{ position: 'fixed', bottom: 30, right: 30 }}>
          <IconButton onClick={toggleMusic} color="primary" style={{ border: '1px solid white', color: 'white' }}>
            {isMusicPlaying ? <VolumeUpIcon /> : <VolumeOffIcon />}
          </IconButton>
        </div>
      );
    }
    return null; // Jangan render button jika di cover atau result page
  };

  // Render the main app UI
  return (
    <ThemeProvider theme={theme}>
      <Layout backgroundImage={backgroundImg}>
        <Routes>
          <Route path="/" element={<MemoizedCoverPage imageUrl={coverImage} stopMusic={stopMusic} startMusic={startMusic} />} />
          <Route
            path="/form-page"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyFormPage />
              </Suspense>
            }
          />
          <Route
            path="/personalized-page"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyPersonalizedPage />
              </Suspense>
            }
          />
          <Route
            path="/quiz-page"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyQuizPage />
              </Suspense>
            }
          />
          <Route
            path="/result-page"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyResultPage stopMusic={stopMusic} />
              </Suspense>
            }
          />
        </Routes>
        {/* Render music control button if not on cover or result page */}
        {renderMusicControlButton()}
      </Layout>
    </ThemeProvider>
  );
};

// Export the main App component
export default App;
