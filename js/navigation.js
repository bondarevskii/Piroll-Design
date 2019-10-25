const previous_button = document.querySelector(".navigation__previous-button");
const next_button = document.querySelector(".navigation__next-button");

const amountForm = document.querySelectorAll(".form").length;

const forms = document.querySelectorAll(".form");

let numberform = 0;

function CheckAmountProjectForDeleteButton() {
	if (numberform == 0) {
		previous_button.style.display = "none";
	} else {
		previous_button.style.display = "block";
	}
	if (numberform == amountForm-1) {
		next_button.style.display = "none";
	} else {
		next_button.style.display = "block";
	}
}

CheckAmountProjectForDeleteButton();

previous_button.addEventListener("click", () => {
	forms[numberform].classList.remove("form_visible");
	forms[numberform].classList.add("form_invisible");
	forms[numberform-1].classList.remove("form_invisible");
	forms[numberform-1].classList.add("form_visible");
	numberform--;
	CheckAmountProjectForDeleteButton();
})

next_button.addEventListener("click", () => {
	forms[numberform].classList.remove("form_visible");
	forms[numberform].classList.add("form_invisible");
	forms[numberform+1].classList.remove("form_invisible");
	forms[numberform+1].classList.add("form_visible");
	numberform++;
	CheckAmountProjectForDeleteButton();
})