import React from 'react';
import { Box, Typography, Avatar, Container, Grid, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CVButton from './CVButton';
import profileImage from '../images/profile.jpeg'; // Add this import

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const shine = keyframes`
  0% { background-position: -200px; }
  100% { background-position: 200px; }
`;

const AboutMe = () => {
  const theme = useTheme();

  return (
    <Box 
      id="about" 
      sx={{ 
        minHeight: { xs: 'auto', md: '100vh' },
        py: { xs: 6, md: 12 },
        position: 'relative',
        background: 'linear-gradient(135deg, #f5f7ff 0%, #f0e9ff 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(108, 99, 255, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          backgroundImage: 'linear-gradient(180deg, transparent 0%, rgba(255, 182, 255, 0.1) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        }
      }}
    >
      {/* Animated background shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(108, 99, 255, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: `${float} 8s infinite ease-in-out`,
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(255, 64, 129, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          animation: `${float} 8s infinite ease-in-out reverse`,
          animationDelay: '-4s',
          zIndex: 0,
        }}
      />
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
          <Grid 
            item 
            xs={12} 
            md={4} 
            sx={{ 
              mb: { xs: 4, md: 0 },
              animation: `${fadeInUp} 1s ease-out`,
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: { xs: 240, sm: 320 },
                height: { xs: 240, sm: 320 },
                mx: 'auto',
                zIndex: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: -12,
                  background: 'linear-gradient(135deg, #6C63FF 0%, #FF4081 100%)',
                  borderRadius: '50%',
                  opacity: 0.15,
                  filter: 'blur(10px)',
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  inset: -2,
                  background: 'linear-gradient(135deg, #6C63FF 0%, #FF4081 100%)',
                  borderRadius: '50%',
                  animation: `${shine} 6s infinite linear`,
                },
              }}
            >
              <Box
                component="img"
                src={profileImage}
                alt="Shikhar Mandloi"
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                  border: '4px solid white',
                  position: 'relative',
                  zIndex: 1,
                  transition: 'all 0.5s ease',
                  filter: 'grayscale(100%)',
                  '&:hover': {
                    filter: 'grayscale(0%)',
                    transform: 'scale(1.02)',
                  }
                }}
              />
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={8}
            sx={{
              position: 'relative',
              zIndex: 2,
              animation: `${fadeInUp} 1s ease-out 0.3s`,
              animationFillMode: 'backwards',
            }}
          >
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: 'linear-gradient(45deg, #2A2B2E, #6C63FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Shikhar Mandloi
            </Typography>
            <Typography 
              variant="h4" 
              gutterBottom
              color="primary"
              sx={{ 
                fontWeight: 600,
                mb: 3,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Frontend Developer
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="primary.light"
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              A passionate Frontend Developer with expertise in creating beautiful, responsive, and user-friendly web applications. 
              Specialized in React.js and modern frontend technologies, I transform creative designs into seamless interactive experiences.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', md: 'flex-start' }, mb: 4 }}>
              <Box 
                component="a"
                href="mailto:shikhar.mandloi@email.com"
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  textDecoration: 'none',
                  color: 'secondary.main',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    color: 'secondary.dark',
                  }
                }}
              >
                <EmailIcon sx={{ fontSize: 20 }} />
                <Typography variant="body1">
                  shikhar.mandloi@gmail.com
                </Typography>
              </Box>
              <Box 
                component="a"
                href="tel:+91XXXXXXXXXX" // Replace with your actual phone number
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  textDecoration: 'none',
                  color: 'secondary.main',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(5px)',
                    color: 'secondary.dark',
                  }
                }}
              >
                <PhoneIcon sx={{ fontSize: 20 }} />
                <Typography variant="body1">
                  +91 8989589171{/* Replace with your actual phone number */}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4, display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <CVButton />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutMe;