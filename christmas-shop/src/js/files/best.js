import { getCard } from "./card.js";
import { getData } from "./functions.js";

const initBest = () => {
  const best = document.querySelector('.best__list');

  if (!best) return;

  const getItem = (index) => {
    const item = document.createElement('li');
    item.classList.add('best__item');
    item.append(getCard(item, index));

    return item;
  };

  const render = () => {
    getData(`./files/gifts.json`).then(gifts => {
      const list = [];

      const arr = gifts
        .reduce((acc, item, i) => [...acc, i], [])
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