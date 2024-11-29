const initTimer = () => {
  const timer = document.querySelector('.cta__table');

  if (!timer) return;

  const daysCell = timer.querySelector('td#days');
  const hoursCell = timer.querySelector('td#hours');
  const minutesCell = timer.querySelector('td#minutes');
  const secondsCell = timer.querySelector('td#seconds');

  const currentYear = new Date().getFullYear() + 1;
  document.querySelector('.slider__title span').textContent = currentYear;

  const newYear = new Date(`jan,01,${currentYear},00:00:00`);

  let interval;

  const updateClock = () => {
    const date = new Date().getTime();
    const timeRemaining = (newYear - date) / 1000;

    const days = parseInt(timeRemaining / (24 * 60 * 60));
    const restSecondsWithoutDays = timeRemaining - days * 24 * 60 * 60;
    const hours = parseInt(restSecondsWithoutDays / 60 / 60);
    const minutes = parseInt((restSecondsWithoutDays / 60) % 60);
    const seconds = parseInt(restSecondsWithoutDays % 60);

    daysCell.textContent = days;
    hoursCell.textContent = hours;
    minutesCell.textContent = minutes;
    secondsCell.textContent = seconds;


    if (timeRemaining <= 0) {
      clearInterval(interval);

      daysCell.textContent = 0;
      hoursCell.textContent = 0;
      minutesCell.textContent = 0;
      secondsCell.textContent = 0;
    }
  };

  updateClock();

  interval = setInterval(updateClock, 500);
};

initTimer();


