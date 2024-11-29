import { getCard } from "./card.js";
import { getData } from "./functions.js";

const initGifts = () => {
  const giftsTabs = document.querySelector('.gifts-tabs');

  if (!giftsTabs) return;

  const content = giftsTabs.querySelector('.gifts-tabs__content');
  const radios = giftsTabs.querySelectorAll('.gifts-tabs__header input[type="radio"]');

  let gifts = [];

  const getItem = (item) => {
    const li = document.createElement('li');
    li.classList.add('gifts-tabs__content-item');

    return getCard(li, item);
  };

  const render = (filter = 'all') => {
    let filtered = [];
    const list = [];

    filter = filter.toLowerCase();

    filtered =
      filter == 'all'
        ? gifts
        : gifts.filter(item => item.category.toLowerCase() == filter);

    for (const index in filtered) {
      list.push(getItem(filtered[index]));
    }

    content.innerHTML = ''
    content.append(...list);
  };

  const load = () => {
    getData(`./files/gifts.json`)
      .then(data => {
        gifts = data.sort(() => Math.random() - 0.5)

        render();

        for (let radio of radios) {
          radio.addEventListener('change', e => {
            render(e.target.value);
          });
        }
      });
  };

  load();
};

initGifts();