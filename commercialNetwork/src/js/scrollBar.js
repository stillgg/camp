const app = document.querySelector(".app");
const sections = document.querySelectorAll("section");
const indicator = document.querySelector("#indicator");
const indicatorLines = indicator.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const main = document.querySelector(".main");
const header = document.querySelector(".header");

const BLACK_SECTION_INDEXES = [2, 6, 7, 8, 10, 11];

let isStart = false;
let timer = null;
let timeoutId;
let clientY1;

const watchedSlide = new Proxy(
	{
		activeSlide: 0,
	},
	onSlideChange()
);

function onSlideChange() {
	return {
		set(target, property, slideIndex) {
			console.log(property);
			console.log(target);
			console.log(slideIndex);
			if (slideIndex < 0 || slideIndex > 11) {
				console.log(true);
				return;
			}

			const sectionHeight = document.documentElement.clientHeight;

			counter.innerText = slideIndex + 1;

			main.style.transform = `translateY(${-(sectionHeight * slideIndex)}px)`;

			sections.forEach((section) => section.classList.remove("active"));
			indicatorLines.forEach((line) => line.classList.remove("active"));
			indicator.classList.remove("black");
			header.classList.remove("black");

			sections[slideIndex].classList.add("active");
			indicatorLines[slideIndex].classList.add("active");

			if (BLACK_SECTION_INDEXES.includes(slideIndex)) {
				indicator.classList.add("black");
				header.classList.add("black");
			}

			return Reflect.set(target, property, slideIndex);
		},
	};
}

indicatorLines.forEach((line, index) =>
	line.addEventListener("click", (e) => {
		e.stopPropagation();
		watchedSlide.activeSlide = index;
	})
);

function delay() {
	timer = setTimeout(() => {
		clearTimeout(timer);
		timer = null;
	}, 500);
}

function onWheel(e) {
	clearTimeout(timeoutId);

	const scrollAmountY = e.deltaY;

	const isScrollDown = scrollAmountY > 50;
	const isScrollUp = scrollAmountY < -50;

	if (isStart === false && timer === null) {
		if (isScrollDown) {
			isStart = true;
			watchedSlide.activeSlide++;

			delay();
		}

		if (isScrollUp) {
			isStart = true;
			watchedSlide.activeSlide--;

			delay();
		}
	}

	timeoutId = setTimeout(function () {
		isStart = false;
	}, 25);
}

function onDragStart(e) {
	clientY1 = e.touches ? e.touches[0].clientY : e.clientY;
}

function onDragEnd(e) {
	const clientY2 = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
	const diff = clientY1 - clientY2;

	if (diff < -100) {
		watchedSlide.activeSlide--;
	}
	if (diff > 100) {
		watchedSlide.activeSlide++;
	}
}

main.addEventListener("wheel", onWheel);
main.addEventListener("touchstart", onDragStart);
main.addEventListener("touchend", onDragEnd);

main.addEventListener("mousedown", onDragStart);
main.addEventListener("mouseup", onDragEnd);

// BurgerMenu //

const hamburgerBodys = document.querySelector("#menu__body");
const hamburgerBtn = document.querySelector("#wrapper__icon");
const hamburgerBody = document.querySelector("#menu__body");
const body = document.querySelector("body");

let isOpenBurger = false;
let headerWasBlack = false;

hamburgerBtn.addEventListener("click", () => {
	isOpenBurger === true ? closeBurger() : openBurger();
	console.log(headerWasBlack);
});

function openBurger() {
	hamburgerBtn.classList.add("active");
	hamburgerBody.classList.add("active");
	body.classList.add("lock");
	isOpenBurger = true;

	if (header.classList.contains("black")) {
		header.classList.remove("black");
		headerWasBlack = true;
	} else {
		headerWasBlack = false;
	}
}

function closeBurger() {
	hamburgerBtn.classList.remove("active");
	hamburgerBody.classList.remove("active");
	body.classList.remove("lock");
	isOpenBurger = false;

	if (headerWasBlack) {
		header.classList.add("black");
	} else {
		headerWasBlack = false;
	}
}

hamburgerBodys.querySelectorAll(".nav__link").forEach((link) => {
	link.addEventListener("click", () => {
		closeBurger();
		headerWasBlack = false;
		watchedSlide.activeSlide = +link.dataset.sectionid;
		console.log(headerWasBlack);
	});
});
