import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Tooltip,
  Fade
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ArticleIcon from '@mui/icons-material/Article';

const CVButton = ({ variant = "contained", size = "medium" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = () => {
    const cvUrl = '/Shikhar_Mandloi_CV.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Shikhar_Mandloi_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  const handleView = () => {
    const viewerUrl = '/Shikhar_Mandloi_CV.pdf';
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
    handleClose();
  };

  return (
    <Box>
      <Button
        variant={variant}
        onClick={handleClick}
        size={size}
        sx={{
          background: 'linear-gradient(45deg, #6C63FF 30%, #FF4081 90%)',
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: '30px',
          textTransform: 'none',
          fontSize: '0.95rem',
          fontWeight: 500,
          letterSpacing: '0.5px',
          boxShadow: '0 4px 15px rgba(108, 99, 255, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 20px rgba(108, 99, 255, 0.3)',
            background: 'linear-gradient(45deg, #5B52FF 30%, #FF2D71 90%)',
          },
          '&:active': {
            transform: 'translateY(0)',
            boxShadow: '0 2px 10px rgba(108, 99, 255, 0.2)',
          },
          transition: 'all 0.2s ease',
        }}
        startIcon={
          <ArticleIcon sx={{ 
            fontSize: '1.2rem',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }} />
        }
      >
        Resume
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            mt: 1,
            minWidth: 180,
            borderRadius: '15px',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(108, 99, 255, 0.1)',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            animation: 'fadeIn 0.2s ease',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(-10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          },
        }}
      >
        <MenuItem 
          onClick={handleDownload}
          sx={{
            py: 1.2,
            px: 2,
            gap: 1.5,
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#2A2B2E',
            '&:hover': {
              background: 'rgba(108, 99, 255, 0.08)',
              color: '#6C63FF',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <DownloadIcon sx={{ fontSize: '1.1rem' }} />
          Download PDF
        </MenuItem>
        <MenuItem 
          onClick={handleView}
          sx={{
            py: 1.2,
            px: 2,
            gap: 1.5,
            fontSize: '0.9rem',
            fontWeight: 500,
            color: '#2A2B2E',
            '&:hover': {
              background: 'rgba(108, 99, 255, 0.08)',
              color: '#6C63FF',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <VisibilityIcon sx={{ fontSize: '1.1rem' }} />
          View Online
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CVButton; 