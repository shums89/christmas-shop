import { getData, bodyLock, bodyUnlock, getColorCategory } from "./functions.js";

const modal = document.querySelector('.modal');

const renderModal = (name, imageUrls) => {
  getData(`./files/gifts.json`).then(gifts => {
    const gift = gifts.filter(item => item.name === name)[0];

    if (gift) {
      modal.querySelector('.modal__title').textContent = gift.name;
      modal.querySelector('.modal__description').textContent = gift.description;
      modal.querySelector('.modal__category').textContent = gift.category;
      modal.querySelector('.modal__category').dataset.tagColor = getColorCategory(gift.category);

      for (const [name, value] of Object.entries(gift.superpowers)) {
        modal.querySelector(`.superpower_${name} span`).textContent = parseInt(value);
        modal.querySelector(`.superpower_${name} span`).dataset.superpowerValue = parseInt(value);
      }

      modal.querySelector('.modal__image-ibg img').src = imageUrls.src;
      modal.querySelector('.modal__image-ibg img').alt = gifts.name;
      modal.querySelectorAll('.modal__image-ibg source').forEach(source => {
        source.srcset = imageUrls.srcset;
      });

      modal.classList.remove('hidden');
    }
  });
};

const closeModal = (e) => {
  if (modal.classList.contains('hidden')) return;

  if (!e.target.closest('.modal__wrapper') || e.target.closest('.modal__btn')) {
    modal.classList.add('hidden')
    bodyUnlock();
  }
};

export const openModal = (e) => {
  const card = e.target.closest('.card');

  if (!card || !modal) return;

  e.preventDefault();

  const name = card.closest('article[data-name]').dataset.name;
  const imageUrls = {
    srcset: card.querySelector('.card__image-ibg source') ? card.querySelector('.card__image-ibg source').srcset : '',
    src: card.querySelector('.card__image-ibg img').src
  };

  renderModal(name, imageUrls);
  bodyLock();
};

document.addEventListener('click', closeModal);
document.addEventListener('click', openModal);