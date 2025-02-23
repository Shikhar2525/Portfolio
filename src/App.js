import React, { Suspense, lazy } from 'react';
import { CssBaseline, ThemeProvider, Box, CircularProgress } from '@mui/material';
import { theme } from './theme';
import './styles/sections.css';
import { keyframes } from '@mui/system';

// Lazy load components
const AboutMe = lazy(() => import('./components/AboutMe'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const SkillsChart = lazy(() => import('./components/SkillsChart'));
const ClientsSection = lazy(() => import('./components/ClientsSection'));
const SocialLinks = lazy(() => import('./components/SocialLinks'));
const GitHubSection = lazy(() => import('./components/GitHubSection'));
const Achievements = lazy(() => import('./components/Achievements'));
const FloatingNav = lazy(() => import('./components/FloatingNav'));
const VisitorNotification = lazy(() => import('./components/VisitorNotification'));

// Loading fallback
const LoadingFallback = () => (
  <Box 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      height: '100vh'
    }}
  >
    <CircularProgress />
  </Box>
);

// Add this in the head of your index.html:
// <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

const sections = [
  { id: 'about' },
  { id: 'experience' },
  { id: 'skills' },
  { id: 'achievements' },
  { id: 'github' },
  { id: 'clients' },
];

const borderGlow = keyframes`
  0%, 100% { border-color: rgba(108, 99, 255, 0.3); }
  50% { border-color: rgba(255, 64, 129, 0.3); }
`;

const cornerPulse = keyframes`
  0% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 0.7; }
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      {/* Modern Gradient Border */}
      <Box
        sx={{
          position: 'fixed',
          inset: '20px',
          pointerEvents: 'none',
          zIndex: 1,  // Changed from 9999 to 1 to go behind content
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            borderRadius: '20px',
            padding: '2px',
            background: 'linear-gradient(45deg, #6C63FF, #FF4081, #6C63FF)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            animation: `${borderGlow} 3s infinite`,
            opacity: 0.8,
          },
        }}
      />

      {/* Content Container */}
      <Box
        sx={{
          position: 'fixed',
          inset: '20px',
          overflow: 'auto',
          borderRadius: '20px',
          maxWidth: '100vw', // Add this
          boxSizing: 'border-box', // Add this
          '&::-webkit-scrollbar': {
            width: '8px',
            background: 'transparent',
          },
          '&::-webkit-scrollbar-track': {
            background: 'rgba(0,0,0,0.05)',
            borderRadius: '4px',
            margin: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(108, 99, 255, 0.3)',
            borderRadius: '4px',
            '&:hover': {
              background: 'rgba(108, 99, 255, 0.5)',
            },
          },
        }}
      >
        <Box
          component="main"
          sx={{
            position: 'relative',
            minHeight: '100%',
            maxWidth: '100%', // Add this
            overflowX: 'hidden', // Add this
            '& > *': {
              maxWidth: '100%',
              boxSizing: 'border-box',
              overflowX: 'hidden', // Add this
            },
          }}
        >
          <Suspense fallback={<LoadingFallback />}>
            <VisitorNotification />
            <FloatingNav />
            <SocialLinks />
            {sections.map(section => (
              <Box
                key={section.id}
                id={section.id}
                sx={{
                  minHeight: { xs: 'auto', md: '100vh' },
                  position: 'relative',
                  scrollMarginTop: '0px',
                  display: 'flex',
                  flexDirection: 'column',
                  '& > *': {
                    flex: 1,
                  },
                }}
              >
                {section.id === 'about' && <AboutMe />}
                {section.id === 'experience' && <WorkExperience />}
                {section.id === 'skills' && <SkillsChart />}
                {section.id === 'achievements' && <Achievements />}
                {section.id === 'github' && <GitHubSection />}
                {section.id === 'clients' && <ClientsSection />}
              </Box>
            ))}
          </Suspense>
        </Box>
      </Box>

      {/* Corner Accents - moved to front */}
      {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner, i) => (
        <Box
          key={corner}
          sx={{
            position: 'fixed',
            ...(corner === 'top-left' && { top: 10, left: 10 }),
            ...(corner === 'top-right' && { top: 10, right: 10 }),
            ...(corner === 'bottom-left' && { bottom: 10, left: 10 }),
            ...(corner === 'bottom-right' && { bottom: 10, right: 10 }),
            width: '50px', // Reduced from 80px
            height: '50px', // Reduced from 80px
            pointerEvents: 'none',
            zIndex: 9999,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              background: 'linear-gradient(135deg, #6C63FF80, #FF408180)',
              borderRadius: '2px',
              animation: `${cornerPulse} ${2 + i * 0.2}s infinite ease-in-out`,
            },
            '&::before': {
              width: '40px',
              height: '3px',
              ...(corner.includes('top') ? { top: 8 } : { bottom: 8 }),
              ...(corner.includes('left') ? { left: 8 } : { right: 8 }),
            },
            '&::after': {
              width: '3px',
              height: '40px',
              ...(corner.includes('top') ? { top: 8 } : { bottom: 8 }),
              ...(corner.includes('left') ? { left: 8 } : { right: 8 }),
            },
          }}
        />
      ))}

      {/* Decorative Lines - moved to front */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 2, // Ensure lines appear above border but below content
          overflow: 'hidden', // Add this
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            width: '200px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(108, 99, 255, 0.2), transparent)',
            transform: 'translateX(-50%)',
          },
          '&::before': {
            top: 20,
          },
          '&::after': {
            bottom: 20,
          },
        }}
      />
    </ThemeProvider>
  );
}

export default App;
