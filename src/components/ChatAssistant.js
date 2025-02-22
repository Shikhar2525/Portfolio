import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  IconButton,
  TextField,
  Typography,
  Fab,
  Collapse,
  Avatar,
  CircularProgress,
  Button,
  Menu,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      content: "Hi! I'm Shikhar's AI assistant. Ask me anything about his skills, experience, or projects!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [messageHistory, setMessageHistory] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, { type: 'user', content: input }]);
    setMessageHistory(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: input,
          history: messageHistory 
        }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: "I apologize, but I'm having trouble connecting to my brain right now. Please try again later." 
      }]);
    }
    
    setIsTyping(false);
  };

  // Simulate AI response - Replace this with actual API call
  const simulateAIResponse = async (question) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Add basic responses about your background
    const responses = {
      skills: "Shikhar is skilled in React.js, JavaScript, HTML/CSS, and modern frontend technologies. He specializes in creating responsive and user-friendly web applications.",
      experience: "Shikhar has experience in frontend development, focusing on React.js and modern UI frameworks. He's passionate about creating seamless user experiences.",
      projects: "Shikhar has worked on various projects including this portfolio website. Each project demonstrates his ability to create engaging user interfaces.",
      contact: "You can reach Shikhar at shikhar.mandloi@email.com",
      default: "I'd be happy to tell you more about Shikhar's skills, experience, or projects. What would you like to know?"
    };

    const q = question.toLowerCase();
    if (q.includes('skill') || q.includes('tech')) return responses.skills;
    if (q.includes('experience') || q.includes('work')) return responses.experience;
    if (q.includes('project')) return responses.projects;
    if (q.includes('contact') || q.includes('email')) return responses.contact;
    return responses.default;
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="chat"
        onClick={() => setIsOpen(!isOpen)}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          transform: isOpen ? 'scale(0)' : 'scale(1)',
          transition: 'transform 0.3s',
        }}
      >
        <SmartToyIcon />
      </Fab>

      <Paper
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 330,
          maxWidth: '90vw',
          height: 500,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transform: isOpen ? 'scale(1)' : 'scale(0)',
          transition: 'transform 0.3s',
          transformOrigin: 'bottom right',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
        }}
      >
        <Box
          sx={{
            p: 2,
            background: 'linear-gradient(90deg, #6C63FF 0%, #FF4081 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">AI Assistant</Typography>
          <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Messages */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
                gap: 1,
              }}
            >
              {message.type === 'bot' && (
                <Avatar
                  sx={{
                    bgcolor: 'secondary.main',
                    width: 32,
                    height: 32,
                  }}
                >
                  <SmartToyIcon sx={{ fontSize: 20 }} />
                </Avatar>
              )}
              <Paper
                elevation={1}
                sx={{
                  p: 1.5,
                  maxWidth: '75%',
                  background: message.type === 'user' ? '#6C63FF' : '#ffffff',
                  borderRadius: message.type === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: message.type === 'user' ? '#ffffff' : '#2A2B2E',
                    whiteSpace: 'pre-wrap',
                    fontWeight: 500,
                    lineHeight: 1.6,
                    userSelect: 'text',
                  }}
                >
                  {message.content}
                </Typography>
              </Paper>
            </Box>
          ))}
          {isTyping && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Avatar
                sx={{
                  bgcolor: 'secondary.main',
                  width: 32,
                  height: 32,
                }}
              >
                <SmartToyIcon sx={{ fontSize: 20 }} />
              </Avatar>
              <CircularProgress size={20} />
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSend} color="secondary">
                  <SendIcon />
                </IconButton>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </Paper>
    </>
  );
};

export default ChatAssistant; 