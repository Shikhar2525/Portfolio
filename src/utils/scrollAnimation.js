export const scrollToSection = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};
