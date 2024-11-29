import { getColorCategory } from "./functions.js";

export const getCard = (element, data) => {
  element.innerHTML = `
        <article class="card">
          <a class="card__link" href="#">
            <div class="card__image-ibg">
              <picture>
                <source srcset="img/${data.category.replaceAll(' ', '-').toLowerCase()}.webp" type="image/webp">
                <img src="img/${data.category.replaceAll(' ', '-').toLowerCase()}.png" alt="Gift image">
              </picture>
            </div>
            <div class="card__content">
              <p class="card__category" data-tag-color="${getColorCategory(data.category)}">${data.category}</p>
              <h3 class="card__title">${data.name}</h3>
            </div>
          </a>
        </article>
    `

  return element;
};