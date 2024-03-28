import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#FFF',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.8rem', // Adjust font size for mobile
    },
  },
  header: {
    position: 'absolute',
    top: 0,
    marginTop: '15px',
    '& h4': {
      fontSize: '1.2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem', // Adjust font size for mobile
      },
    },
  },
}));

const Layout = ({ backgroundImage, children }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <div className={classes.root} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <header className={classes.header}>
      {pathname !== "/" && <h4>FRESHMAG</h4>}
      </header>
      {children}
    </div>
  );
};

export default Layout;
