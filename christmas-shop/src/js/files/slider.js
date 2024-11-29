const initSlider = () => {
  const slider = document.querySelector('.slider-slider');

  if (!slider) return;

  const sliderWrapper = slider.querySelector('.slider-slider__wrapper');
  const sliderList = sliderWrapper.querySelector('.slider-slider__swiper');
  const btnPrev = slider.querySelector('.slider-slider__nav-button_prev');
  const btnNext = slider.querySelector('.slider-slider__nav-button_next');

  const SLIDER_WIDTH = 1990;

  let currentSlide = 0;
  let countClick = 3;
  let offset = 0;

  const changeSlide = (navButton = '') => {
    switch (navButton) {
      case 'prev':
        currentSlide--;
        break;
      case 'next':
        currentSlide++;
    }

    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === countClick;

    sliderList.style.transition = "transform 1s ease";
    sliderList.style.transform = `translateX(${-offset * currentSlide}px)`;
  };

  const reset = () => {
    if (window.innerWidth < 768) {
      countClick = 6;
    } else {
      countClick = 3;
    }

    offset = (SLIDER_WIDTH + parseFloat(getComputedStyle(sliderList).left) * 2 - window.innerWidth) / countClick

    currentSlide = 0;
    btnPrev.disabled = currentSlide === 0;
    btnNext.disabled = currentSlide === countClick;

    sliderList.style.transition = "transform 0s ease";
    sliderList.style.transform = `translateX(0px)`;
  };

  btnPrev.addEventListener('click', () => changeSlide('prev'));
  btnNext.addEventListener('click', () => changeSlide('next'));
  window.addEventListener("resize", reset);
  reset();
};

initSlider();