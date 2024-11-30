const initScroll = () => {
  const button = document.querySelector('.button-to-top');

  if (!button) return;

  const render = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    scrollY > 300 && window.innerWidth <= 768 ? button.classList.remove('hidden') : button.classList.add('hidden');
  };

  const scrollTo = (e) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  button.addEventListener('click', scrollTo);
  window.addEventListener('scroll', render);
  window.addEventListener("resize", render);
  render();
};

initScroll();