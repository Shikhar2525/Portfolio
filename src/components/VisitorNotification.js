import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Zoom,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';
import { keyframes } from '@mui/system';

// Replace these with your actual EmailJS credentials from your EmailJS dashboard
const EMAILJS_SERVICE_ID = 'service_oy26n57';  // Service ID from EmailJS
const EMAILJS_TEMPLATE_ID = 'template_7dr1jue'; // Template ID from EmailJS
const EMAILJS_PUBLIC_KEY = 'P2dCTW3FDScUnjx15';     // Public Key from EmailJS

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const VisitorNotification = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: name,
          message: message || "No message provided",
          visit_time: new Date().toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }),
          reply_to: 'noreply@portfolio.com', // Add this line
          to_name: 'Shikhar', // Add this line
        },
        EMAILJS_PUBLIC_KEY // Add public key here too
      );

      if (response.status === 200) {
        setSnackbar({
          open: true,
          message: 'Thanks for letting me know! I appreciate your visit! 😊',
          severity: 'success'
        });
        setOpen(false);
        setName('');
        setMessage('');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSnackbar({
        open: true,
        message: 'Oops! Something went wrong. Please try again.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Tooltip 
        title="Say Hi! 👋" 
        placement="left"
        TransitionComponent={Zoom}
      >
        <Box
          sx={{
            position: 'fixed',
            bottom: 30,
            right: 30,
            zIndex: 1000,
            animation: `${float} 3s ease-in-out infinite`,
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            startIcon={<WavingHandIcon />}
            sx={{
              background: 'linear-gradient(45deg, #6C63FF 30%, #FF4081 90%)',
              color: 'white',
              boxShadow: '0 3px 15px rgba(108, 99, 255, 0.3)',
              px: 3,
              py: 1.5,
              borderRadius: 30,
              textTransform: 'none',
              fontSize: { xs: '0.875rem', sm: '1rem' },
              fontWeight: 500,
              '&:hover': {
                background: 'linear-gradient(45deg, #5B52FF 30%, #FF2D71 90%)',
                transform: 'scale(1.05)',
                boxShadow: '0 5px 20px rgba(108, 99, 255, 0.4)',
              },
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              display: { xs: 'none', sm: 'inline-flex' }, // Hide text on mobile
            }}
          >
            Say Hi !
          </Button>
          
          {/* Mobile version - icon only */}
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              width: 56,
              height: 56,
              background: 'linear-gradient(45deg, #6C63FF 30%, #FF4081 90%)',
              color: 'white',
              boxShadow: '0 3px 15px rgba(108, 99, 255, 0.3)',
              display: { xs: 'flex', sm: 'none' }, // Show only on mobile
              '&:hover': {
                background: 'linear-gradient(45deg, #5B52FF 30%, #FF2D71 90%)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <WavingHandIcon />
          </IconButton>
        </Box>
      </Tooltip>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #6C63FF, #FF4081)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700,
        }}>
          👋 Say Hello!
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            label="Your Name"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Leave a message (optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button 
            onClick={() => setOpen(false)} 
            color="inherit"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!name || isLoading}
            sx={{
              background: 'linear-gradient(45deg, #6C63FF 30%, #FF4081 90%)',
              color: 'white',
              minWidth: 100,
              '&:hover': {
                background: 'linear-gradient(45deg, #5B52FF 30%, #FF2D71 90%)',
              },
            }}
          >
            {isLoading ? (
              <CircularProgress 
                size={24} 
                sx={{ 
                  color: 'white',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            ) : 'Send'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default VisitorNotification;
