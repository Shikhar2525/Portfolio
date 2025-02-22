import React, { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { keyframes } from '@mui/system';
import { scrollToSection } from '../utils/scrollAnimation';

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.4) }
  70% { box-shadow: 0 0 0 15px rgba(108, 99, 255, 0) }
  100% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0) }
`;

const highlightSection = keyframes`
  from {
    background-color: rgba(108, 99, 255, 0.1);
    transform: scale(1.01);
  }
  to {
    background-color: transparent;
    transform: scale(1);
  }
`;

const FloatingNav = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'github', label: 'GitHub' },
    { id: 'clients', label: 'Clients' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const viewportCenter = scrollPosition + (windowHeight / 2);
      
      // Find current section based on viewport center
      sections.forEach((section, index) => {
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;
          if (viewportCenter >= elementTop && viewportCenter <= elementBottom) {
            setCurrentSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (index) => {
    const section = sections[index];
    scrollToSection(section.id);
    setCurrentSection(index);
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        right: { xs: 15, md: 30 },
        top: '50vh',
        transform: 'translateY(-50%)',
        zIndex: 99999,
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 1.5,
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '8px',
        borderRadius: '20px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        height: 'auto',
        maxHeight: '90vh',
        overflowY: 'auto',
        '.highlight-section': {
          animation: `${highlightSection} 1s ease-out`,
        },
      }}
    >
      <IconButton
        onClick={() => handleSectionClick(Math.max(currentSection - 1, 0))}
        sx={{
          backgroundColor: '#6c63ff',
          width: '32px',
          height: '32px',
          '&:hover': { backgroundColor: '#5b52cc' },
          '& svg': { 
            color: 'white',
            fontSize: '20px',
          },
        }}
      >
        <KeyboardArrowUpIcon />
      </IconButton>

      {sections.map((section, index) => (
        <Tooltip
          key={section.id}
          title={section.label}
          placement="left"
          arrow
        >
          <Box
            onClick={() => handleSectionClick(index)}
            sx={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: currentSection === index ? '#6c63ff' : 'white',
              border: '2px solid #6c63ff',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.2)',
                backgroundColor: '#6c63ff',
              },
              position: 'relative',
              '&::after': currentSection === index ? {
                content: '""',
                position: 'absolute',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                border: '1px solid #6c63ff',
                top: '-4px',
                left: '-4px',
                animation: `${pulse} 2s infinite`,
              } : {},
            }}
          />
        </Tooltip>
      ))}

      <IconButton
        onClick={() => handleSectionClick(Math.min(currentSection + 1, sections.length - 1))}
        sx={{
          backgroundColor: '#6c63ff',
          width: '32px',
          height: '32px',
          '&:hover': { backgroundColor: '#5b52cc' },
          '& svg': { 
            color: 'white',
            fontSize: '20px',
          },
        }}
      >
        <KeyboardArrowDownIcon />
      </IconButton>
    </Box>
  );
};

export default FloatingNav;
