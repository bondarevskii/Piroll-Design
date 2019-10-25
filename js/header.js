const menu__button = document.querySelector('.menu__button');
const header = document.querySelector('.header');
const menu__items = document.querySelector('.menu__items');

menu__button.addEventListener('click', () => {
	header.classList.toggle("header_invisible");
	header.classList.toggle("header_visible");
	menu__items.classList.toggle("menu__items_invisible");
	menu__items.classList.toggle("menu__items_visible");
})
