import { getData, getColorCategory } from "./functions.js";

export const getCard = (element, index) => {
  getData(`./files/gifts.json`).then(gifts => {
    element.innerHTML = `
        <article class="card" data-id=${index}>
          <a class="card__link" href="#">
            <div class="card__image-ibg">
              <picture>
                <source srcset="img/${gifts[index].category.replaceAll(' ', '-').toLowerCase()}.webp" type="image/webp">
                <img src="img/${gifts[index].category.replaceAll(' ', '-').toLowerCase()}.png" alt="Gift image">
              </picture>
            </div>
            <div class="card__content">
              <p class="card__category" data-tag-color="${getColorCategory(gifts[index].category)}">${gifts[index].category}</p>
              <h3 class="card__title">${gifts[index].name}</h3>
            </div>
          </a>
        </article>
    `

    return element;
  });
};