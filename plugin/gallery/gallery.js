const initGallery = (selectorOfGallery, options = {}) => {

	const formElements = {};

	let gallery__items = document.querySelectorAll(selectorOfGallery);

	let numberEl = 0;

	let isAnimating = false;

	function updateButtons () {
		if (numberEl == 0) {
			formElements.buttonPrevious.style.display = "none";
		} else {
			formElements.buttonPrevious.style.display = "block";
		}
		if (numberEl == gallery__items.length - 1) {
			formElements.buttonNext.style.display = "none";
		} else {
			formElements.buttonNext.style.display = "block";
		}
	}

	function createForm () {
		const viewForm = document.createElement("div");
		viewForm.classList.add("viewForm_invisible");
		formElements.viewForm = viewForm;

		const bg = document.createElement("div");
		bg.classList.add("viewForm__bg");
		formElements.bg = bg;

		const img = document.createElement("img");
		img.classList.add("viewForm__img");
		img.classList.add("viewForm__img_center");
		formElements.img = img;

		const buttonExit = document.createElement("div");
		buttonExit.classList.add("pe-7s-close"); // Here you can change the close-symbol
		buttonExit.classList.add("viewForm__buttonExit");
		formElements.buttonExit = buttonExit;

		const buttonPrevious = document.createElement("div");
		buttonPrevious.classList.add("pe-7s-angle-left"); // Here you can change the previous-symbol
		buttonPrevious.classList.add("viewForm__buttonPrevious");
		formElements.buttonPrevious = buttonPrevious;

		const buttonNext = document.createElement("div");
		buttonNext.classList.add("pe-7s-angle-right"); // Here you can change the next-symbol
		buttonNext.classList.add("viewForm__buttonNext");
		formElements.buttonNext = buttonNext;

		document.body.prepend(viewForm);
		viewForm.prepend(bg);
		viewForm.prepend(buttonPrevious);
		viewForm.prepend(buttonNext);
		viewForm.prepend(buttonExit);
		viewForm.prepend(img);

		buttonExit.addEventListener('click', () => {
			viewForm.classList.add("viewForm_invisible");
			viewForm.classList.remove("viewForm_visible");
		})

		const delay = ms => new Promise(res => setTimeout(res, ms));

		const moveToLeft = (image) => {
		    image.classList.remove("viewForm__img_center");
		    image.classList.remove("viewForm__img_right");
		    image.classList.add("viewForm__img_left");
		}
		const moveToRight = (image) => {
		    image.classList.remove("viewForm__img_center");
		    image.classList.remove("viewForm__img_left");
		    image.classList.add("viewForm__img_right");
		}

		const moveToCenter = (image) => {
			image.classList.remove("viewForm__img_right");
		    image.classList.remove("viewForm__img_left");
		    image.classList.add("viewForm__img_center");
		}

		buttonPrevious.addEventListener('click', async () => {
			if (!isAnimating) {
				if (options.animations) {
					moveToRight(formElements.img);
					const imgNew = document.createElement("img");
					imgNew.classList.add("viewForm__img");
					imgNew.src = gallery__items[numberEl - 1].children[0].src;
					numberEl--;
					updateButtons();
					moveToLeft(imgNew);
					viewForm.prepend(imgNew);
					await delay(0);
					moveToCenter(imgNew);
					isAnimating = true;
					await delay(600);
					isAnimating = false;
					formElements.img.remove();
					formElements.img = imgNew;
				} else {
					formElements.img.src = gallery__items[numberEl - 1].children[0].src;
					numberEl--;
					updateButtons();
				}
			}
		})

		buttonNext.addEventListener('click', async () => {
			if (!isAnimating) {
				if (options.animations) {
					moveToLeft(formElements.img);
					const imgNew = document.createElement("img");
					imgNew.classList.add("viewForm__img");
					imgNew.src = gallery__items[numberEl + 1].children[0].src;
					numberEl++;
					updateButtons();
					moveToRight(imgNew);
					viewForm.prepend(imgNew);
					await delay(0);
					moveToCenter(imgNew);
					isAnimating = true;
					await delay(600);
					isAnimating = false;
					formElements.img.remove();
					formElements.img = imgNew;
				} else {
					formElements.img.src = gallery__items[numberEl + 1].children[0].src;
					numberEl++;
					updateButtons();
				}
			}
		})
	}

	createForm();

	for (let i = 0; i < gallery__items.length; i++)
		gallery__items[i].addEventListener("click", () => {
			formElements.img.src = gallery__items[i].children[0].src;
			numberEl = i;
			updateButtons();
			formElements.viewForm.classList.remove("viewForm_invisible");
			formElements.viewForm.classList.add("viewForm_visible");
	});
}