const app = document.querySelector(".app");
const sections = document.querySelectorAll("section");
const indicator = document.querySelector("#indicator");
const indicatorLines = indicator.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const main = document.querySelector(".main");

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
			if (slideIndex < 0 || slideIndex > 11) {
				return;
			}

			const sectionHeight = document.documentElement.clientHeight;

			counter.innerText = slideIndex + 1;

			main.style.transform = `translateY(${-(sectionHeight * slideIndex)}px)`;

			sections.forEach((section) => section.classList.remove("active"));
			indicatorLines.forEach((line) => line.classList.remove("active"));
			indicator.classList.remove("black");

			sections[slideIndex].classList.add("active");
			indicatorLines[slideIndex].classList.add("active");

			if (BLACK_SECTION_INDEXES.includes(slideIndex))
				indicator.classList.add("black");

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

	const isScrollDown = scrollAmountY > 25;
	const isScrollUp = scrollAmountY < -25;

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

	if (isStart) {
		timeoutId = setTimeout(function () {
			isStart = false;
		}, 25);
	}
}

function onDragStart(e) {
	clientY1 = e.touches ? e.touches[0].clientY : e.clientY;
}

function onDragEnd(e) {
	const clientY2 = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
	diff = clientY1 - clientY2;

	if (diff < -100) {
		watchedSlide.activeSlide--;
	}
	if (diff > 100) {
		watchedSlide.activeSlide++;
	}
}

document.addEventListener("wheel", onWheel);
document.addEventListener("touchstart", onDragStart);
document.addEventListener("touchend", onDragEnd);

document.addEventListener("mousedown", onDragStart);
document.addEventListener("mouseup", onDragEnd);
