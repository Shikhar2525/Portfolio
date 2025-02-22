import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';

const flameWave = keyframes`
  0% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.1) rotate(5deg); }
  50% { transform: scale(1) rotate(0deg); }
  75% { transform: scale(1.1) rotate(-5deg); }
  100% { transform: scale(1) rotate(0deg); }
`;

const flameGlow = keyframes`
  0% { opacity: 0.5; }
  50% { opacity: 0.8; }
  100% { opacity: 0.5; }
`;

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add position to trail
      setTrail(prevTrail => {
        const newTrail = [...prevTrail, { x: e.clientX, y: e.clientY, id: Date.now() }];
        if (newTrail.length > 5) newTrail.shift(); // Keep only last 5 positions
        return newTrail;
      });

      // Check if hovering over clickable element
      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      );
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      {/* Fire trail */}
      {trail.map((point, index) => (
        <Box
          key={point.id}
          sx={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: 20,
            height: 20,
            pointerEvents: 'none',
            zIndex: 9997,
            opacity: (index + 1) / trail.length * 0.3,
            transform: `translate(${point.x - 10}px, ${point.y - 10}px)`,
            '&::before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'radial-gradient(circle, #FF4081 0%, #FF851B 50%, transparent 100%)',
              borderRadius: '50%',
              animation: `${flameGlow} 0.5s infinite`,
            }
          }}
        />
      ))}

      {/* Main flame cursor */}
      <Box
        sx={{
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 9999,
          width: isPointer ? 40 : 30,
          height: isPointer ? 40 : 30,
          transform: `translate(${position.x - (isPointer ? 20 : 15)}px, ${position.y - (isPointer ? 20 : 15)}px)`,
          transition: 'width 0.3s, height 0.3s',
        }}
      >
        {/* Core flame */}
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, #FFF 10%, #FF4081 40%, #FF851B 100%)',
            borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
            filter: 'blur(2px)',
            animation: `${flameWave} 1s infinite ease-in-out`,
            transform: `scale(${isClicking ? 0.8 : 1})`,
            transition: 'transform 0.2s',
          }}
        />
        
        {/* Outer glow */}
        <Box
          sx={{
            position: 'absolute',
            width: '150%',
            height: '150%',
            left: '-25%',
            top: '-25%',
            background: 'radial-gradient(circle, rgba(255,64,129,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: `${flameGlow} 2s infinite`,
          }}
        />
      </Box>
    </>
  );
};

export default CustomCursor; 