import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Collapse,
  Grid,
  Chip,
  Link,
  Divider,
} from '@mui/material';
import { keyframes } from '@mui/system';
import WorkIcon from '@mui/icons-material/Work';

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

const backgroundAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    transform: scale(1) translateZ(0);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1) translateZ(0);
    opacity: 0.3;
  }
`;

const backgroundShimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

const formatDate = (dateStr) => {
  if (dateStr === 'Present') return new Date();
  const [year, month] = dateStr.split('-');
  return new Date(year, month - 1);
};

const formatDisplayDate = (dateStr) => {
  if (dateStr === 'Present') return 'Present';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const getTimePosition = (dateStr) => {
  const date = formatDate(dateStr);
  const start = new Date(2020, 0); // Jan 2020
  const end = new Date(2024, 0);   // Jan 2024
  const total = end.getTime() - start.getTime();
  const position = date.getTime() - start.getTime();
  return Math.max(0, Math.min(100, (position / total) * 100));
};

const TimelineScale = ({ experiences }) => (
  <Box 
    sx={{ 
      position: 'relative',
      height: 60, // Increased height to accommodate months
      mb: 6,
      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
      display: { xs: 'none', md: 'block' },
    }}
  >
    {/* Year and month markers */}
    {Array.from({ length: 49 }).map((_, index) => {
      const date = new Date(2020, 0 + index);
      const isYear = date.getMonth() === 0;
      
      return (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${(index / 48) * 100}%`,
            bottom: isYear ? -10 : -5,
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box 
            sx={{ 
              width: 1,
              height: isYear ? 8 : 4,
              background: isYear ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              mb: 1
            }} 
          />
          {isYear && (
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              {date.getFullYear()}
            </Typography>
          )}
          {!isYear && index % 3 === 0 && ( // Show every 3rd month
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.65rem',
                opacity: 0.8,
              }}
            >
              {date.toLocaleDateString('en-US', { month: 'short' })}
            </Typography>
          )}
        </Box>
      );
    })}

    {/* Experience duration indicators */}
    {experiences.map((exp, index) => {
      const startPos = getTimePosition(exp.startDate);
      const endPos = getTimePosition(exp.endDate);
      const width = endPos - startPos;

      return (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            left: `${startPos}%`,
            top: '50%',
            width: `${width}%`,
            height: 6,
            backgroundColor: exp.company === 'Epam Systems' ? '#6C63FF40' : '#FF408140',
            borderRadius: 3,
            transform: 'translateY(-50%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              left: 0,
              top: '50%',
              width: 10,
              height: 10,
              backgroundColor: exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              right: 0,
              top: '50%',
              width: 10,
              height: 10,
              backgroundColor: exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081',
              borderRadius: '50%',
              transform: 'translate(50%, -50%)',
            },
            '&:hover': {
              backgroundColor: exp.company === 'Epam Systems' ? '#6C63FF60' : '#FF408160',
            }
          }}
        />
      );
    })}
  </Box>
);

const calculateTotalExperience = (experiences) => {
  const now = new Date();
  const firstStartDate = experiences.reduce((earliest, exp) => {
    const startDate = formatDate(exp.startDate);
    return startDate < earliest ? startDate : earliest;
  }, now);

  const years = ((now - firstStartDate) / (1000 * 60 * 60 * 24 * 365.25));
  return Math.floor(years);
};

const WorkExperience = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const experiences = [
    {
      company: 'Epam Systems',
      location: 'Pune',
      position: 'Software Engineer A2',
      startDate: '2021-06',
      endDate: 'Present',
      projects: [
        {
          name: 'Supplier Portal - Walgreens Boot Alliance',
          domain: 'HealthCare',
          tech: ['React', 'TypeScript', 'HTML', 'SCSS', 'GraphQL', 'react-test library'],
          responsibilities: [
            'Collaborated with cross-functional teams to design and develop a web-based platform using ReactTypeScript.',
            'Built reusable and scalable components and implemented responsive design.',
            'Conducted code reviews and implemented best practices.',
            'Implemented unit and integration testing using Jest and React-Testing-Library.',
            'Worked closely with business analysts for data privacy and security.',
            'Gained experience with agile software development methodologies.'
          ]
        },
        {
          name: 'Leucipa WebApp - Baker Hughes',
          domain: 'Oil and Gas',
          tech: ['React', 'TypeScript', 'HTML', 'SCSS', 'Opensearch', 'vitest', 'chartjs'],
          responsibilities: [
            'Led the development of a comprehensive web-based platform for oil refineries.',
            'Engineered reusable and scalable components implementing responsive design principles.',
            'Oversaw code reviews and implementation of best practices.',
            'Implemented rigorous unit and integration testing.',
            'Collaborated with business analysts for data privacy and security protocols.',
            'Actively participated in agile software development methodologies.'
          ]
        }
      ]
    },
    {
      company: 'Nagarro Software',
      position: 'Trainee/Intern',
      location: 'Gurugram',
      startDate: '2021-03',
      endDate: '2021-06',
      responsibilities: [
        'Developed and maintained software code using best practices.',
        'Troubleshot and resolved issues in existing code.',
        'Gained experience with Agile and Scrum methodologies.'
      ]
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2 // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={sectionRef}
      id="experience"
      sx={{
        py: { xs: 4, md: 12 }, // Reduced padding on mobile
        position: 'relative',
        overflow: 'visible',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%)',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: isVisible ? 0.8 : 0,
          transition: 'opacity 0.5s ease-out',
          background: `
            linear-gradient(45deg, rgba(108, 99, 255, 0.08) 0%, transparent 73%)
          `,
          backgroundSize: '200% 200%',
          animation: isVisible ? `${backgroundAnimation} 15s linear infinite` : 'none',
          transform: 'translateZ(0)',
          willChange: 'background-position',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 20%, rgba(108, 99, 255, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 80% 80%, rgba(255, 64, 129, 0.1) 0%, transparent 25%)
          `,
          opacity: isVisible ? 0.7 : 0,
          transition: 'opacity 0.5s ease-out',
          transform: 'translateZ(0)',
        }
      }}
    >
      {/* Grid Pattern - Static */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(rgba(108, 99, 255, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108, 99, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}
      />

      {/* Reduced number of floating elements */}
      {[...Array(4)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: '30px', md: '40px' },
            height: { xs: '30px', md: '40px' },
            borderRadius: '50%',
            background: i % 2 
              ? `rgba(108, 99, 255, ${0.08 + (i * 0.02)})`
              : `rgba(255, 64, 129, ${0.08 + (i * 0.02)})`,
            filter: 'blur(8px)',
            top: `${20 + (i * 20)}%`,
            left: `${15 + (i * 20)}%`,
            transform: isVisible ? 'translateY(0) translateZ(0)' : 'translateY(20px) translateZ(0)',
            opacity: isVisible ? 0.6 : 0,
            transition: 'all 0.5s ease-out',
            animation: isVisible ? `${pulseAnimation} ${10 + i * 2}s ease-in-out infinite` : 'none',
            willChange: 'transform, opacity',
          }}
        />
      ))}

      <Container 
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
          px: { xs: 2, sm: 3, md: 4 },
          transform: 'translateZ(0)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <Typography 
            variant="h3" 
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              color: '#2A2B2E',
              letterSpacing: '-0.5px',
              position: 'relative',
            }}
          >
            Work Experience
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              mt: 1,
              mb: 2,
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 500,
            }}
          >
            {calculateTotalExperience(experiences)}+ Years of Professional Experience
          </Typography>
          <Box
            sx={{
              width: 60,
              height: 4,
              background: 'linear-gradient(90deg, #6C63FF, #FF4081)',
              borderRadius: 2,
              mx: 'auto',
            }}
          />
        </Box>

        <TimelineScale experiences={experiences} />

        <Box 
          sx={{ 
            position: 'relative', 
            mt: { xs: 2, md: 4 },
            height: 'auto',
            minHeight: '500px', // Give enough space for cards
            '& > *': {
              position: { xs: 'static', md: 'absolute' }, // Make static position for mobile
            }
          }}
        >
          {experiences.map((exp, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                mb: 3,
                width: '100%',
                left: { xs: 0, md: `${getTimePosition(exp.startDate)}%` }, // Remove left positioning on mobile
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: -40,
                  left: 0, // Adjusted from 50%
                  height: { xs: 0, md: 40 },
                  borderLeft: '2px dashed rgba(0, 0, 0, 0.1)',
                  transform: 'none', // Remove translateX
                  display: { xs: 'none', md: 'block' },
                },
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: -42,
                  left: 0, // Adjusted from 50%
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081',
                  transform: 'none', // Remove translateX
                  transition: 'all 0.3s ease',
                  boxShadow: hoveredIndex === index ? `0 0 0 4px ${exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081'}20` : 'none',
                  display: { xs: 'none', md: 'block' },
                }
              }}
            >
              <Paper
                elevation={0}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => isMobile && setHoveredIndex(hoveredIndex === index ? null : index)}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.95)',
                  position: 'relative',
                  overflow: 'visible',
                  ml: { xs: 0, md: 0 },
                  width: { xs: 'auto', md: '400px' }, // Auto width on mobile
                  transform: 'none', // Remove transform
                  cursor: 'pointer',
                  zIndex: hoveredIndex === index ? 10 : 1,
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: hoveredIndex === index 
                    ? '0 8px 30px rgba(0,0,0,0.12)'
                    : '0 2px 8px rgba(0,0,0,0.05)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {/* Compact View */}
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: 2,
                  opacity: hoveredIndex === index ? 0.4 : 1,
                  transition: 'opacity 0.3s ease',
                }}>
                  <Box sx={{ 
                    color: exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081',
                    mt: 0.5,
                  }}>
                    <WorkIcon sx={{ fontSize: 32 }} />
                  </Box>
                  <Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#2A2B2E',
                        mb: 0.5,
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: '0.875rem',
                      }}
                    >
                      {exp.position} | {formatDisplayDate(exp.startDate)} - {formatDisplayDate(exp.endDate)}
                    </Typography>
                  </Box>
                </Box>

                {/* Expanded View */}
                <Collapse 
                  in={hoveredIndex === index}
                  timeout={300}
                  sx={{
                    position: { xs: 'relative', md: 'absolute' },
                    top: 0,
                    left: 0,
                    right: { xs: 0, md: -100 },
                    background: '#FFFFFF',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    borderRadius: 2,
                    zIndex: 20,
                    mt: { xs: 2, md: 0 },
                    maxHeight: { xs: 'none', md: '500px' }, // Set max height for desktop
                    overflowY: { xs: 'visible', md: 'auto' }, // Enable scroll on desktop
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
                    // Firefox scrollbar styles
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(108, 99, 255, 0.3) rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ 
                    p: 3,
                    // Add some bottom padding to account for scrollbar
                    pb: { md: 4 },
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600,
                        color: '#2A2B2E',
                        mb: 1,
                      }}
                    >
                      {exp.company}
                    </Typography>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: exp.company === 'Epam Systems' ? '#6C63FF' : '#FF4081',
                        fontWeight: 500,
                        mb: 0.5,
                      }}
                    >
                      {exp.location && ` - ${exp.location}`}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        mb: 2,
                        fontSize: '0.875rem',
                      }}
                    >
                      {exp.startDate} - {exp.endDate}
                    </Typography>

                    {exp.projects && exp.projects.map((project, pIndex) => (
                      <Box key={pIndex} sx={{ mt: 3 }}>
                        <Typography variant="h6" gutterBottom>
                          {project.name}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Domain: {project.domain}
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                          {project.tech.map((tech, tIndex) => (
                            <Chip
                              key={tIndex}
                              label={tech}
                              size="small"
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                        <ul style={{ paddingLeft: 20 }}>
                          {project.responsibilities.map((resp, rIndex) => (
                            <li key={rIndex}>
                              <Typography variant="body2">{resp}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    ))}

                    {exp.responsibilities && (
                      <ul style={{ paddingLeft: 20 }}>
                        {exp.responsibilities.map((resp, rIndex) => (
                          <li key={rIndex}>
                            <Typography variant="body2">{resp}</Typography>
                          </li>
                        ))}
                      </ul>
                    )}
                  </Box>
                </Collapse>
              </Paper>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WorkExperience;