import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Link,
  Chip,
  CircularProgress,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import CodeIcon from '@mui/icons-material/Code';
import PublicIcon from '@mui/icons-material/Public';
import BugReportIcon from '@mui/icons-material/BugReport';
import WebIcon from '@mui/icons-material/Web';
import DescriptionIcon from '@mui/icons-material/Description';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { keyframes } from '@mui/system';

const getRepoColor = (language) => {
  const colorMap = {
    JavaScript: '#f1e05a',
    TypeScript: '#2b7489',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    React: '#61dafb',
    Vue: '#41b883',
    PHP: '#4F5D95',
    Ruby: '#701516',
    default: '#6C63FF'
  };
  return colorMap[language] || colorMap.default;
};

// Add this animation
const starPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }
`;

const GitHubSection = () => {
  const [repos, setRepos] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = 'shikhar2525'; // Replace with your actual GitHub username

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUserInfo(userData);

        // Fetch repositories
        const repoResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`
        );
        if (!repoResponse.ok) throw new Error('Failed to fetch repos');
        const repoData = await repoResponse.json();
        
        // Filter out forked repositories and sort by stars
        const ownRepos = repoData
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        
        setRepos(ownRepos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  const isSpecialProject = (repoName) => {
    return repoName.toLowerCase() === 'splitup';
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="error">Failed to load GitHub repositories</Typography>
      </Box>
    );
  }

  return (
    <Box
      id="github"
      sx={{
        py: { xs: 6, md: 12 },
        background: 'linear-gradient(135deg, #f8faff 0%, #f0f4ff 100%)',
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        {/* User Info Section */}
        {userInfo && (
          <Box 
            sx={{ 
              textAlign: 'center', 
              mb: 8,
              position: 'relative',
            }}
          >
            <Avatar
              src={userInfo.avatar_url}
              alt={username}
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 3,
                border: '4px solid white',
                boxShadow: '0 0 20px rgba(108, 99, 255, 0.2)',
              }}
            />
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
              {userInfo.name || username}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {userInfo.bio}
            </Typography>
            
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4, 
              mb: 4,
              flexWrap: 'wrap'
            }}>
              <Tooltip title="Public Repositories">
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {userInfo.public_repos}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Repositories
                  </Typography>
                </Box>
              </Tooltip>
              
              <Tooltip title="Followers">
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {userInfo.followers}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Followers
                  </Typography>
                </Box>
              </Tooltip>

              <Tooltip title="Following">
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary.main">
                    {userInfo.following}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Following
                  </Typography>
                </Box>
              </Tooltip>
            </Box>

            <Link
              href={userInfo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.secondary',
                textDecoration: 'none',
                '&:hover': {
                  color: 'primary.main',
                }
              }}
            >
              <GitHubIcon />
              <Typography>View Profile</Typography>
            </Link>
          </Box>
        )}

        <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
          Featured Projects
        </Typography>

        {/* Replace Carousel with Grid */}
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {repos.map((repo) => (
            <Grid item xs={12} sm={6} md={4} key={repo.id}>
              <Paper
                elevation={0}
                sx={{
                  position: 'relative', // Add this
                  p: { xs: 2, md: 3 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(108, 99, 255, 0.1)',
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(108, 99, 255, 0.1)',
                    borderColor: 'rgba(108, 99, 255, 0.2)',
                  }
                }}
              >
                {/* Add Featured Star for SplitUp */}
                {isSpecialProject(repo.name) && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: 8,
                      zIndex: 2,
                    }}
                  >
                    <Tooltip title="Featured Project" arrow>
                      <WorkspacePremiumIcon 
                        sx={{
                          fontSize: '42px',
                          color: '#FFD700',
                          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                          animation: `${starPulse} 2s infinite ease-in-out`,
                        }}
                      />
                    </Tooltip>
                  </Box>
                )}

                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start',
                  gap: 2,
                  mb: 2 
                }}>
                  <IconButton
                    sx={{
                      backgroundColor: 'background.light',
                      width: 40,
                      height: 40,
                      '&:hover': { backgroundColor: 'background.light' },
                    }}
                  >
                    <WebIcon sx={{ 
                      color: getRepoColor(repo.language)
                    }} />
                  </IconButton>
                  <Box sx={{ flex: 1 }}>
                    <Link
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        display: 'block',
                        mb: 1,
                        '&:hover': {
                          color: 'secondary.main',
                        }
                      }}
                    >
                      {repo.name}
                    </Link>

                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 2,
                      mb: 1,
                      color: 'text.secondary',
                      fontSize: '0.75rem',
                    }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        {new Date(repo.created_at).toLocaleDateString()}
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <UpdateIcon sx={{ fontSize: 14 }} />
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <DescriptionIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        {repo.description || 'No description available'}
                      </Typography>
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      gap: 1,
                      mb: 2,
                      flexWrap: 'wrap'
                    }}>
                      {repo.language && (
                        <Chip
                          icon={<CodeIcon sx={{ fontSize: 16 }} />}
                          label={repo.language}
                          size="small"
                          sx={{ 
                            backgroundColor: 'background.light',
                            '& .MuiChip-icon': { color: 'primary.main' }
                          }}
                        />
                      )}
                      {repo.homepage && (
                        <Chip
                          icon={<PublicIcon sx={{ fontSize: 16 }} />}
                          label="Live Demo"
                          component="a"
                          href={repo.homepage}
                          target="_blank"
                          clickable
                          size="small"
                          sx={{ 
                            backgroundColor: 'secondary.light',
                            color: 'white',
                          }}
                        />
                      )}
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      gap: 2,
                      color: 'text.secondary',
                      fontSize: '0.875rem',
                      borderTop: '1px solid',
                      borderColor: 'divider',
                      pt: 2,
                    }}>
                      <Tooltip title="Stars">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <StarIcon sx={{ fontSize: 16 }} />
                          {repo.stargazers_count}
                        </Box>
                      </Tooltip>
                      <Tooltip title="Forks">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <ForkRightIcon sx={{ fontSize: 16 }} />
                          {repo.forks_count}
                        </Box>
                      </Tooltip>
                      <Tooltip title="Open Issues">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <BugReportIcon sx={{ fontSize: 16 }} />
                          {repo.open_issues_count}
                        </Box>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GitHubSection;