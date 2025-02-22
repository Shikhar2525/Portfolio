import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2A2B2E',
      light: '#4A4B55',
    },
    secondary: {
      main: '#6C63FF',
      light: '#8B85FF',
    },
    accent: {
      purple: '#9C27B0',
      blue: '#2196F3',
      pink: '#FF4081',
      teal: '#00BCD4',
      orange: '#FF5722',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8FAFF',
      light: '#F0F3FF',
      accent: 'rgba(108, 99, 255, 0.04)',
    },
    text: {
      primary: '#2A2B2E',
      secondary: '#4A4B55',
      accent: '#6C63FF',
    },
    divider: 'rgba(0, 0, 0, 0.06)',
    gradients: {
      primary: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
      secondary: 'linear-gradient(to top, #dfe9f3 0%, white 100%)',
      accent: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      surface: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 100%)',
      card: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
      skill: 'linear-gradient(90deg, #6C63FF 0%, #FF4081 100%)',
      text: 'linear-gradient(90deg, #2A2B2E 0%, #6C63FF 100%)',
      hover: 'linear-gradient(to top, #accbee 0%, #e7f0fd 100%)',
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif",
    h1: {
      fontSize: '3.5rem',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
      fontWeight: 700,
      background: 'linear-gradient(90deg, #2A2B2E 0%, #6C63FF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '3rem',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
      fontWeight: 700,
      background: 'linear-gradient(90deg, #6C63FF 0%, #FF4081 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h4: {
      fontSize: '2rem',
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
      fontWeight: 600,
      marginBottom: '1rem',
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          margin: 0,
          padding: 0,
          overscrollBehavior: 'none',
          scrollBehavior: 'smooth',
          '-webkit-font-smoothing': 'antialiased',
          '-moz-osx-font-smoothing': 'grayscale',
        },
        '*': {
          boxSizing: 'border-box',
          '&::before, &::after': {
            boxSizing: 'border-box',
          },
        },
        '@media screen and (prefers-reduced-motion: reduce)': {
          '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 500,
          padding: '12px 28px',
          transition: 'all 0.3s ease-in-out',
          background: 'linear-gradient(45deg, #6C63FF 0%, #FF4081 100%)',
          color: 'white',
          '&:hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 8px 25px rgba(108, 99, 255, 0.4)',
            background: 'linear-gradient(45deg, #5952FF 0%, #FF2D71 100%)',
          }
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24,
          transition: 'all 0.3s ease-in-out',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #FAFAFA 100%)',
          border: '1px solid rgba(108, 99, 255, 0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(108, 99, 255, 0.15)',
            borderColor: 'rgba(108, 99, 255, 0.2)',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 100%)',
          },
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          willChange: 'transform',
          transform: 'translateZ(0)',
          padding: '0 24px',
          '@media (max-width:600px)': {
            padding: '0 16px',
          },
        },
      },
    },
  },
});