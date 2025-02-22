import React, { Suspense, lazy } from 'react';
import { CssBaseline, ThemeProvider, Box, CircularProgress } from '@mui/material';
import { theme } from './theme';

// Lazy load components
const AboutMe = lazy(() => import('./components/AboutMe'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const SkillsChart = lazy(() => import('./components/SkillsChart'));
const ClientsSection = lazy(() => import('./components/ClientsSection'));
const SocialLinks = lazy(() => import('./components/SocialLinks'));
const GitHubSection = lazy(() => import('./components/GitHubSection'));
const Achievements = lazy(() => import('./components/Achievements'));

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          overflow: 'hidden',
          position: 'relative',
          contain: 'paint layout style', // Improve performance
          isolation: 'isolate', // Create stacking context
          '& > *': {
            position: 'relative',
            zIndex: 1,
            // Optimize all direct children
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            WebkitFontSmoothing: 'antialiased',
            perspective: 1000,
            transform: 'translateZ(0)',
          },
          // Optimize scrolling
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgba(0,0,0,0.2)',
            borderRadius: '4px',
          },
          // Disable animations on mobile devices
          '@media (prefers-reduced-motion: reduce)': {
            '& *': {
              animation: 'none !important',
              transition: 'none !important',
            },
          },
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SocialLinks />
          <AboutMe />
          <WorkExperience />
          <SkillsChart />
          <Achievements />
          <GitHubSection />
          <ClientsSection />
        </Suspense>
      </Box>
    </ThemeProvider>
  );
}

export default App;
