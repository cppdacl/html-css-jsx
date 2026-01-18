const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 100;

  const bgOpacity = Math.min(1, scrollY / maxScroll);
  const shadowOpacity = Math.min(0.25, (scrollY / maxScroll) * 0.25);

  navbar.style.background = `rgba(12, 11, 20, ${bgOpacity})`;

  navbar.style.boxShadow = `0 4px 20px rgba(0, 0, 0, ${shadowOpacity})`;
});