import { header, indicator, watchedSlide } from "./scrollBar";
const hamburgerBtn = document.querySelector("#wrapper__icon");
const hamburgerBody = document.querySelector("#menu__body");
const body = document.querySelector("body");

let openBurger = false;

hamburgerBtn.addEventListener("click", () => {
	hamburgerBtn.classList.toggle("active");
	hamburgerBody.classList.toggle("active");
	body.classList.toggle("lock");

	if (!openBurger) {
		openBurger = true;
		header.classList.remove("black");
		return;
	}
	if (openBurger && indicator.classList.contains("black")) {
		header.classList.add("black");
	}
	openBurger = false;
});

hamburgerBody.querySelectorAll(".nav__link").forEach((link) => {
	link.addEventListener("click", () => {
		hamburgerBtn.classList.remove("active");
		hamburgerBody.classList.remove("active");
		body.classList.remove("lock");

		openBurger = false;
		if (indicator.classList.contains("black")) {
			header.classList.add("black");
		}
	});
});
