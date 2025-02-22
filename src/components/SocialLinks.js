import React from 'react';
import { Box, IconButton, Tooltip, Container } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: <LinkedInIcon />,
      url: 'https://www.linkedin.com/in/shikhar-mandloi-8657b6182/',
      color: '#0077B5',
    },
    {
      name: 'GitHub',
      icon: <GitHubIcon />,
      url: 'https://github.com/Shikhar2525',
      color: '#333',
    },
    {
      name: 'Instagram',
      icon: <InstagramIcon />,
      url: 'https://www.instagram.com/shikhar_2525/',
      color: '#E4405F',
    },
  ];

  // Add this to detect mobile viewport
  const isMobile = window.innerWidth <= 600;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: { xs: 20, sm: 20 }, // Keep it at top for both
        right: { xs: 20, sm: 90 },
        transform: 'none', // Remove transform that was causing issues
        zIndex: 99999,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Vertical on mobile, horizontal on desktop
        gap: { xs: 2, sm: 1 },
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: { xs: '12px 8px', sm: '8px 12px' },
        borderRadius: '30px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        alignItems: 'center', // Center icons
      }}
    >
      {socialLinks.map((social) => (
        <Tooltip 
          key={social.name} 
          title={social.name}
          placement="left" // Always show tooltip on left
          arrow
        >
          <IconButton
            component="a"
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            sx={{
              width: { xs: 35, sm: 40 },
              height: { xs: 35, sm: 40 },
              transition: 'all 0.3s ease',
              color: 'text.secondary',
              '&:hover': {
                color: social.color,
                animation: `${pulse} 0.3s ease-in-out`,
                background: `${social.color}10`,
              },
            }}
          >
            {social.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default SocialLinks;