import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shine = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const clients = [
  {
    name: 'Epam Systems',
    logo: 'https://www.epam.com/content/dam/epam/homepage/epam_logo_light.svg',
    description: 'Developed secure financial dashboard and transaction systems',
    duration: '2022 - Present'
  },
  {
    name: 'Expedia',
    logo: 'https://www.expedia.co.in/_dms/header/logo.svg?locale=en_GB&siteid=27&2&6f9ec7db',
    description: 'Contributed to design system implementation and UI components',
    duration: '2021 - 2022'
  },
  {
    name: 'Baker Hughes',
    logo: 'https://www.bakerhughes.com/themes/custom/bh/dist/images/logo.png',
    description: 'Built interactive marketing campaigns and web applications',
    duration: '2020 - 2021'
  },
  {
    name: 'Nagarro',
    logo: 'https://www.acquia.com/sites/default/files/partner-logos/nagarro-logo-black_0.png',
    description: 'Built interactive marketing campaigns and web applications',
    duration: '2020 - 2021'
  },

];

const ClientCard = ({ client, index }) => {
  const theme = useTheme();
  const [imageError, setImageError] = React.useState(false);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        animation: `${fadeIn} 0.5s ease-out ${index * 0.1}s`,
        animationFillMode: 'both',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'background.paper',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 20px 40px rgba(108, 99, 255, 0.15)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FF 100%)',
          '& .client-logo': {
            filter: 'grayscale(0%)',
            opacity: 1,
            transform: 'scale(1.1) rotate(5deg)',
          }
        }
      }}
    >
      <Box 
        className="client-logo"
        sx={{ 
          width: 120,
          height: 120,
          mb: 2,
          transition: 'transform 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          filter: 'grayscale(100%)',
          opacity: 0.7,
          '&:hover': {
            filter: 'grayscale(0%)',
            opacity: 1
          }
        }}
      >
        {!imageError ? (
          <img 
            src={client.logo} 
            alt={client.name}
            onError={() => setImageError(true)}
            style={{ 
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        ) : (
          <Typography variant="h5" color="primary.light">
            {client.name[0]}
          </Typography>
        )}
      </Box>

      <Typography 
        variant="h6" 
        gutterBottom
        sx={{ 
          fontWeight: 600,
          color: theme.palette.primary.main
        }}
      >
        {client.name}
      </Typography>

      <Box
        className="client-overlay"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(255,255,255,0.95)',
          p: 3,
          transform: 'translateY(100%)',
          opacity: 0,
          transition: 'all 0.3s ease',
          borderTop: `1px solid ${theme.palette.divider}`
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ mb: 1 }}
          color="primary.light"
        >
          {client.description}
        </Typography>
        <Typography 
          variant="caption"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 600,
            display: 'block',
            mt: 1
          }}
        >
          {client.duration}
        </Typography>
      </Box>
    </Paper>
  );
};

const ClientsSection = () => {
  const theme = useTheme();

  return (
    <Box 
      sx={{ 
        py: 12,
        position: 'relative',
        background: theme.palette.gradients.accent,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-50%',
          width: '200%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent 0%, rgba(91, 120, 246, 0.05) 50%, transparent 100%)',
          animation: `${shine} 8s linear infinite`,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '25px',
          height: '25px',
          background: 'rgba(45, 212, 191, 0.15)',
          borderRadius: '50%',
          animation: `${float} 9s ease-in-out infinite`,
        }}
      />
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2
              }
            }}
          >
            Clients & Companies
          </Typography>
          <Typography 
            variant="body1" 
            color="primary.light"
            sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}
          >
            Proud to have collaborated with these amazing organizations
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {clients.map((client, index) => (
            <Grid item xs={12} sm={6} md={4} key={client.name}>
              <ClientCard client={client} index={index} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ClientsSection; 