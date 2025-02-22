import React from 'react';
import { Box, Typography, Avatar, Container, Grid, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CVButton from './CVButton';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
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

const AboutMe = () => {
  const theme = useTheme();

  return (
    <Box 
      id="about" 
      sx={{ 
        minHeight: { xs: 'auto', md: '100vh' },
        py: { xs: 6, md: 12 },
        position: 'relative',
        background: 'linear-gradient(135deg, #E3FDF5 0%, #FFE6FA 100%)',
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
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'rgba(91, 120, 246, 0.2)',
          animation: `${float} 6s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '30px',
          height: '30px',
          borderRadius: '8px',
          background: 'rgba(139, 92, 246, 0.15)',
          animation: `${float} 8s ease-in-out infinite`,
          animationDelay: '-2s',
          pointerEvents: 'none',
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
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
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
                width: { xs: 200, sm: 280 },
                height: { xs: 200, sm: 280 },
                mx: 'auto',
                zIndex: 2,
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -8,
                  left: -8,
                  right: -8,
                  bottom: -8,
                  background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2) 0%, rgba(255, 64, 129, 0.2) 100%)',
                  borderRadius: '50%',
                  filter: 'blur(15px)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  zIndex: -1,
                },
              }}
            >
              <img src="/profile.jpeg" alt="Shikhar Mandloi" style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
                border: '4px solid white',
                boxShadow: '0 0 25px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease-in-out',
                filter: 'grayscale(100%) contrast(1.1)',
                position: 'relative',
                zIndex: 2,
                '&:hover': {
                  transform: 'scale(1.02)',
                  filter: 'grayscale(0%) contrast(1.1)',
                  boxShadow: '0 0 30px rgba(108, 99, 255, 0.3)',
                }
              }} />
            </Box>
          </Grid>
          <Grid 
            item 
            xs={12} 
            md={8}
            sx={{
              position: 'relative',
              zIndex: 2,
            }}
          >
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                background: 'linear-gradient(90deg, #2A2B2E 0%, #6C63FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Shikhar Mandloi
            </Typography>
            <Typography 
              variant="h4" 
              gutterBottom
              color="primary"
              sx={{ fontWeight: 600 }}
            >
              Frontend Developer
            </Typography>
            <Typography 
              variant="body1" 
              paragraph 
              color="primary.light"
              sx={{ mb: 4 }}
            >
              A passionate Frontend Developer specializing in creating beautiful, responsive, and user-friendly web applications. 
              With expertise in React.js and modern frontend technologies, I transform designs into seamless interactive experiences.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
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
            <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
              <CVButton />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutMe;