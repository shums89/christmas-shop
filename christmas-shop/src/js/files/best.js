import { getCard } from "./card.js";
import { getData } from "./functions.js";

const initBest = () => {
  const best = document.querySelector('.best__list');

  if (!best) return;

  const getItem = (item) => {
    const li = document.createElement('li');
    li.classList.add('best__item');

    return getCard(li, item);
  };

  const render = () => {
    getData(`./files/gifts.json`)
      .then(gifts => {
        const list = [];

        const arr = gifts
          .sort(() => Math.random() - 0.5)
          .slice(-4)

        for (const index in arr) {
          list.push(getItem(arr[index]));
        }

        best.innerHTML = ''
        best.append(...list);
      });
  };

  render();
};

initBest();