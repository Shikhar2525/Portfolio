import React from 'react';
import { Box, Typography, Container, Grid, Paper, useTheme, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { keyframes } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage';
import BrushIcon from '@mui/icons-material/Brush';

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const scaleIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const shine = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(100%);
  }
`;

const pulseGlow = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.4) }
  70% { box-shadow: 0 0 0 10px rgba(108, 99, 255, 0) }
  100% { box-shadow: 0 0 0 0 rgba(108, 99, 255, 0) }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const revealSkills = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const skillCategories = [
  {
    title: 'Frontend Development',
    icon: <WebIcon sx={{ fontSize: 40 }} />,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'JavaScript (ES6+)', level: 92 },
      { name: 'HTML5/CSS3', level: 95 },
      { name: 'Material-UI', level: 88 }
    ]
  },
  {
    title: 'UI Frameworks & Libraries',
    icon: <BrushIcon sx={{ fontSize: 40 }} />,
    skills: [
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Bootstrap', level: 90 },
      { name: 'SASS/SCSS', level: 85 },
      { name: 'Styled Components', level: 88 }
    ]
  },
  {
    title: 'Development Tools',
    icon: <CodeIcon sx={{ fontSize: 40 }} />,
    skills: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'Webpack', level: 82 },
      { name: 'Chrome DevTools', level: 90 },
      { name: 'VS Code', level: 92 }
    ]
  },
  {
    title: 'UI/UX & Performance',
    icon: <StorageIcon sx={{ fontSize: 40 }} />,
    skills: [
      { name: 'Responsive Design', level: 95 },
      { name: 'Web Performance', level: 85 },
      { name: 'Figma', level: 80 },
      { name: 'Cross-browser Testing', level: 88 }
    ]
  }
];

const SkillBar = ({ name, level, index }) => {
  const theme = useTheme();
  
  return (
    <Box 
      sx={{ 
        mb: 2,
        animation: `${revealSkills} 0.3s ease-out forwards`,
        animationDelay: `${index * 0.1}s`,
        '&:hover': {
          '& .skill-progress': {
            transform: 'scale(1.02)',
            filter: 'brightness(1.1)',
          },
          '& .skill-label': {
            color: 'secondary.main',
            transform: 'translateX(5px)',
          },
          '& .skill-percentage': {
            animation: `${pulseGlow} 1.5s infinite`,
            background: theme.palette.gradients.skill,
            color: 'white',
          }
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mb: 1,
        alignItems: 'center'
      }}>
        <Typography 
          className="skill-label"
          variant="body2" 
          fontWeight="500"
          sx={{ 
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {name}
        </Typography>
        <Typography 
          className="skill-percentage"
          variant="body2" 
          sx={{ 
            backgroundColor: 'background.accent',
            color: 'secondary.main',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          {level}%
        </Typography>
      </Box>
      <Box
        className="skill-progress"
        sx={{
          height: 8,
          backgroundColor: 'background.light',
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%)',
            backgroundSize: '200% 100%',
            animation: `${shimmer} 3s infinite linear paused`,
          },
          '&:hover::before': {
            animationPlayState: 'running',
          }
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            height: '100%',
            width: `${level}%`,
            background: theme.palette.gradients.skill,
            borderRadius: 4,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
              animation: `${shine} 2s linear infinite`,
            }
          }}
        />
      </Box>
    </Box>
  );
};

const SkillCategory = ({ category, index, expanded, onChange }) => {
  const theme = useTheme();

  return (
    <Accordion
      expanded={expanded === category.title}
      onChange={onChange(category.title)}
      sx={{
        background: 'linear-gradient(to right, #fff 0%, #f8f9fa 100%)',
        mb: 2,
        borderRadius: '16px !important',
        '&:before': { display: 'none' },
        boxShadow: 'none',
        border: '1px solid',
        borderColor: expanded === category.title ? 'secondary.main' : 'divider',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 2,
        '&:hover': {
          borderColor: 'secondary.main',
          transform: 'translateX(8px)',
          boxShadow: expanded === category.title ? 
            '0 8px 30px rgba(108, 99, 255, 0.2)' : 
            '0 4px 20px rgba(108, 99, 255, 0.1)',
        },
        '&.Mui-expanded': {
          boxShadow: '0 8px 30px rgba(108, 99, 255, 0.2)',
          background: 'linear-gradient(45deg, #fff 0%, #f0f7ff 100%)',
        }
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon 
            sx={{ 
              color: expanded === category.title ? 'secondary.main' : 'primary.main',
              fontSize: 28,
              transition: 'all 0.3s ease',
            }} 
          />
        }
        sx={{
          minHeight: 80,
          '& .MuiAccordionSummary-content': {
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }
        }}
      >
        <Box
          sx={{
            color: expanded === category.title ? 'secondary.main' : 'primary.main',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            transform: expanded === category.title ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {category.icon}
        </Box>
        <Typography 
          variant="h6"
          sx={{ 
            fontSize: '1.25rem',
            fontWeight: 600,
            color: expanded === category.title ? 'secondary.main' : 'primary.main',
          }}
        >
          {category.title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ pt: 0, pb: 3 }}>
        {category.skills.map((skill, idx) => (
          <Box 
            key={skill.name}
            sx={{
              mb: 3,
              animation: `${slideIn} 0.5s ease-out forwards`,
              animationDelay: `${idx * 0.1}s`,
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography 
                variant="body2" 
                fontWeight="500"
                sx={{
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'secondary.main',
                    transform: 'translateX(5px)',
                  }
                }}
              >
                {skill.name}
              </Typography>
              <Typography 
                variant="body2"
                sx={{ 
                  color: 'secondary.main',
                  backgroundColor: 'background.accent',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {skill.level}%
              </Typography>
            </Box>
            <Box sx={{ 
              height: 6, 
              bgcolor: 'background.light', 
              borderRadius: 3, 
              overflow: 'hidden',
              position: 'relative',
            }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${skill.level}%`,
                  background: theme.palette.gradients.skill,
                  borderRadius: 3,
                  animation: `${slideIn} 1s ease-out forwards`,
                }}
              />
            </Box>
          </Box>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

const SkillsChart = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box 
      id="skills" 
      sx={{ 
        py: 12,
        position: 'relative',
        background: 'linear-gradient(120deg, #fdfbfb 0%, #f5f7fa 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'linear-gradient(180deg, rgba(108, 99, 255, 0.03) 0%, rgba(255, 64, 129, 0.03) 100%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundImage: 'radial-gradient(circle at 50% 100%, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '8%',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(45deg, rgba(108, 99, 255, 0.1) 0%, rgba(255, 64, 129, 0.1) 100%)',
          borderRadius: '12px',
          transform: 'rotate(45deg)',
          animation: `${float} 7s ease-in-out infinite`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '10%',
          width: '30px',
          height: '30px',
          background: 'linear-gradient(-45deg, rgba(255, 64, 129, 0.1) 0%, rgba(108, 99, 255, 0.1) 100%)',
          borderRadius: '50%',
          animation: `${float} 9s ease-in-out infinite`,
          animationDelay: '-2s',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      <Container 
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              position: 'relative',
              display: 'inline-block',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 60,
                height: 4,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: 2
              }
            }}
          >
            Professional Skills
          </Typography>
          <Typography 
            variant="body1" 
            color="primary.light"
            sx={{ mt: 2, maxWidth: 600, mx: 'auto' }}
          >
            A showcase of my technical expertise and professional capabilities
          </Typography>
        </Box>

        <Box
          sx={{
            maxWidth: { xs: '100%', md: 800 },
            mx: 'auto',
            px: { xs: 2, md: 0 },
          }}
        >
          {skillCategories.map((category, index) => (
            <Accordion
              key={category.title}
              expanded={expanded === category.title}
              onChange={handleChange(category.title)}
              sx={{
                mb: 2,
                '& .MuiAccordionSummary-content': {
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  gap: { xs: 1, sm: 2 },
                },
                background: 'linear-gradient(to right, #fff 0%, #f8f9fa 100%)',
                borderRadius: '16px !important',
                '&:before': { display: 'none' },
                boxShadow: 'none',
                border: '1px solid',
                borderColor: expanded === category.title ? 'secondary.main' : 'divider',
                transition: 'all 0.3s ease',
                position: 'relative',
                zIndex: 2,
                '&:hover': {
                  borderColor: 'secondary.main',
                  transform: 'translateX(8px)',
                  boxShadow: expanded === category.title ? 
                    '0 8px 30px rgba(108, 99, 255, 0.2)' : 
                    '0 4px 20px rgba(108, 99, 255, 0.1)',
                },
                '&.Mui-expanded': {
                  boxShadow: '0 8px 30px rgba(108, 99, 255, 0.2)',
                  background: 'linear-gradient(45deg, #fff 0%, #f0f7ff 100%)',
                }
              }}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon 
                    sx={{ 
                      color: expanded === category.title ? 'secondary.main' : 'primary.main',
                      fontSize: 28,
                      transition: 'all 0.3s ease',
                    }} 
                  />
                }
                sx={{
                  minHeight: 80,
                  '& .MuiAccordionSummary-content': {
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }
                }}
              >
                <Box
                  sx={{
                    color: expanded === category.title ? 'secondary.main' : 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    transform: expanded === category.title ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {category.icon}
                </Box>
                <Typography 
                  variant="h6"
                  sx={{ 
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    color: expanded === category.title ? 'secondary.main' : 'primary.main',
                  }}
                >
                  {category.title}
                </Typography>
              </AccordionSummary>

              <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                {category.skills.map((skill, idx) => (
                  <Box 
                    key={skill.name}
                    sx={{
                      mb: 3,
                      animation: `${slideIn} 0.5s ease-out forwards`,
                      animationDelay: `${idx * 0.1}s`,
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography 
                        variant="body2" 
                        fontWeight="500"
                        sx={{
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            color: 'secondary.main',
                            transform: 'translateX(5px)',
                          }
                        }}
                      >
                        {skill.name}
                      </Typography>
                      <Typography 
                        variant="body2"
                        sx={{ 
                          color: 'secondary.main',
                          backgroundColor: 'background.accent',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {skill.level}%
                      </Typography>
                    </Box>
                    <Box sx={{ 
                      height: 6, 
                      bgcolor: 'background.light', 
                      borderRadius: 3, 
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          width: `${skill.level}%`,
                          background: theme.palette.gradients.skill,
                          borderRadius: 3,
                          animation: `${slideIn} 1s ease-out forwards`,
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default SkillsChart;