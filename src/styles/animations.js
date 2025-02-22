import { keyframes } from '@mui/system';

export const sectionHighlight = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.1);
  }
  20% {
    transform: scale(1.01);
    box-shadow: 0 0 20px 10px rgba(108, 99, 255, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(108, 99, 255, 0);
  }
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
