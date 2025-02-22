import React from 'react';
import { Box, Container, Typography, Link, Tooltip } from '@mui/material';
import { keyframes } from '@mui/system';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import StarsIcon from '@mui/icons-material/Stars';
import CodeIcon from '@mui/icons-material/Code';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

const shine = keyframes`
  0% { background-position: -100px; }
  40%, 100% { background-position: 200px; }
`;

const achievements = [
  {
    title: 'Published NPM Package',
    subtitle: 'api-hitman',
    description: 'Successfully developed and published a React package to the NPM registry, now being used by the developer community',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    color: '#6C63FF',
    link: 'https://www.npmjs.com/package/api-hitman',
    highlight: 'Open Source Contribution'
  },
  {
    title: 'Sprint Hero',
    subtitle: '2022-2023',
    description: 'Multiple-time recipient of the Sprint Hero recognition for exceptional performance',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />,
    color: '#FF4081',
    highlight: 'Multiple Awards'
  },
  {
    title: 'Delivery Excellence',
    subtitle: 'Project Success',
    description: 'Awarded for maintaining high standards in project delivery and quality',
    icon: <WorkspacePremiumIcon sx={{ fontSize: 40 }} />,
    color: '#FFD700',
    highlight: 'Quality Champion'
  },
  {
    title: 'SplitUp Project',
    subtitle: 'Bill Splitting Made Easy',
    description: 'A web application designed for splitting bills among friends and managing shared expenses effortlessly.',
    icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
    color: '#4CAF50',
    link: 'https://splitup-633cc.web.app/',
    highlight: 'Expense Management'
  }
];

const AchievementCard = ({ achievement, index }) => (
  <Box
    sx={{
      position: 'relative',
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 4,
      p: 4,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease',
      overflow: 'hidden',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 15px 40px rgba(0,0,0,0.15)',
        '& .achievement-icon': {
          animation: `${float} 2s ease-in-out infinite`
        }
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)`,
        transform: 'skewX(-15deg)',
        animation: `${shine} 4s infinite`,
        animationDelay: `${index * 0.5}s`
      }
    }}
  >
    <Box
      className="achievement-icon"
      sx={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: `${achievement.color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3,
        color: achievement.color,
      }}
    >
      {achievement.icon}
    </Box>

    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#2A2B2E' }}>
      {achievement.title}
    </Typography>
    
    <Typography variant="subtitle1" sx={{ color: achievement.color, fontWeight: 500, mb: 1 }}>
      {achievement.subtitle}
    </Typography>

    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
      {achievement.description}
    </Typography>

    {achievement.link && (
      <Link
        href={achievement.link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 0.5,
          color: achievement.color,
          textDecoration: 'none',
          fontSize: '0.875rem',
          fontWeight: 500,
          mt: 2,
          '&:hover': {
            textDecoration: 'underline',
          }
        }}
      >
        View Package
        <Box 
          component="span" 
          sx={{ 
            fontSize: '1.2rem',
            lineHeight: 1,
            transform: 'translateY(1px)'
          }}
        >
          →
        </Box>
      </Link>
    )}

    <Tooltip title={achievement.highlight} placement="top" arrow>
      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: `${achievement.color}15`,
          color: achievement.color,
          px: 2,
          py: 0.5,
          borderRadius: 10,
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {achievement.highlight}
      </Box>
    </Tooltip>
  </Box>
);

const Achievements = () => {
  return (
    <Box
      id="achievements"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          align="center"
          sx={{
            fontWeight: 700,
            mb: { xs: 6, md: 8 },
            background: 'linear-gradient(90deg, #6C63FF, #FF4081)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Achievements
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
          }}
        >
          {achievements.map((achievement, index) => (
            <AchievementCard 
              key={index} 
              achievement={achievement} 
              index={index} 
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Achievements; 