import React, { Suspense, lazy } from 'react';
import { CssBaseline, ThemeProvider, Box, CircularProgress } from '@mui/material';
import { theme } from './theme';
import './styles/sections.css';

// Lazy load components
const AboutMe = lazy(() => import('./components/AboutMe'));
const WorkExperience = lazy(() => import('./components/WorkExperience'));
const SkillsChart = lazy(() => import('./components/SkillsChart'));
const ClientsSection = lazy(() => import('./components/ClientsSection'));
const SocialLinks = lazy(() => import('./components/SocialLinks'));
const GitHubSection = lazy(() => import('./components/GitHubSection'));
const Achievements = lazy(() => import('./components/Achievements'));
const FloatingNav = lazy(() => import('./components/FloatingNav'));

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        component="main"
        sx={{
          overflowX: 'hidden', // Keep this
          width: '100%',
          position: 'relative',
          '& > *': {
            maxWidth: '100%',
            boxSizing: 'border-box',
          },
          // Remove maxWidth: '100vw' and add these to prevent scroll
          margin: 0,
          padding: 0,
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for webkit browsers
          },
          msOverflowStyle: 'none', // Hide scrollbar for IE/Edge
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
        }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <FloatingNav />
          <SocialLinks />
          {sections.map(section => (
            <Box
              key={section.id}
              id={section.id}
              sx={{
                minHeight: { xs: 'auto', md: '100vh' }, // Allow sections to shrink on mobile
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
    </ThemeProvider>
  );
}

export default App;
