import { menuClose } from "./functions.js";

const links = document.querySelectorAll('.menu__link');

links.forEach(link => link.addEventListener('click', e => {
  console.log(e.target);

  if (e.target.closest('.html-gifts') && e.target.closest('.menu__link_gifts')) {
    e.preventDefault();
  }

  menuClose();
}));

const closeMenuOverlay = ({ target = e.target }) => {
  if (document.documentElement.classList.contains('menu-open') && !target.closest('.menu__list')) {
    menuClose();
  }
};

document.addEventListener('click', closeMenuOverlay);