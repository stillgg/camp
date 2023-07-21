const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const section = document.querySelector(".merch");

const track = document.querySelector(".slider-track");
const items = document.querySelectorAll(".slider-item");
const getGap = getComputedStyle(track);

const zdvig = shiftCalculate();

const limitWidth = window.innerWidth;
const limitHeight = window.innerHeight;

console.log("limitWidht", limitWidth);
console.log("limitHeight", limitHeight);

let indexActiveSlide = 0;

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left");

btnNext.addEventListener("click", () => {
  const clientWidth = window.innerWidth;

  removeIndex = clientWidth >= 993 ? 2 : 1;

  if (Math.abs(indexActiveSlide) <= items.length - removeIndex) {
    indexActiveSlide--;
    track.style.transform = shift(indexActiveSlide, zdvig);

    if (
      (clientWidth >= 993 && indexActiveSlide === -2) ||
      (clientWidth < 993 && indexActiveSlide === -3)
    ) {
      btnNext.classList.add("hiddenBtn-right");
    }
  }

  if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left");
});

btnPrev.addEventListener("click", () => {
  if (indexActiveSlide !== 0) {
    indexActiveSlide++;
    track.style.transform = shift(indexActiveSlide, zdvig);

    if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left");

    if (indexActiveSlide !== -2 || indexActiveSlide !== -3) {
      btnNext.classList.remove("hiddenBtn-right");
    }
  }
});

function shift(index, shift) {
  return `translate3d(${index * shift}px, 0px, 0px)`;
}

function shiftCalculate() {
  const itemWidth = items[0].offsetWidth;
  return (shiftValue = parseInt(getGap.gap) + itemWidth);
}

let positionStart = 0;
let currentPosition = 0;

let isDrag = false;

function onDragStart(event) {
  event.preventDefault();

  isDrag = true;
  track.style.transitionDelay = "0s";

  positionStart =
    event.type === "touchstart" ? event.touches[0].clientX : event.clientX;

  positionStart += currentPosition;
}

function onDragOver(event) {
  if (!isDrag) return;

  const move =
    event.type === "touchmove" ? event.touches[0].clientX : event.clientX;

  const moveHeight =
    event.type === "touchmove" ? event.touches[0].clientY : event.clientY;
  console.log(moveHeight);

  if (
    move > limitWidth ||
    move <= 0 ||
    moveHeight > limitHeight ||
    moveHeight <= 0
  ) {
    track.style.transform = `translate3d(${
      indexActiveSlide * zdvig
    }px, 0px, 0px)`;
    isDrag = false;
    track.style.transitionDuration = "600ms";
    return;
  }

  track.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`;

  track.style.transitionDuration = "0ms";
}

function onDragEnd(event) {
  if (!isDrag) return;

  let positionEnd =
    event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX;

  const clientWidth = window.innerWidth;
  const removeIndex = clientWidth >= 993 ? 2 : 1;

  positionEnd += currentPosition;

  if (
    positionStart > positionEnd &&
    Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
    -indexActiveSlide !== items.length - removeIndex
  ) {
    if (positionStart - positionEnd - 2 * zdvig > 0) {
      indexActiveSlide -= 2;
    } else indexActiveSlide--;
  }

  if (
    positionStart < positionEnd &&
    positionEnd - positionStart > zdvig * 0.2 &&
    indexActiveSlide !== 0
  ) {
    if (Math.abs(positionStart - positionEnd - 2 * zdvig) > 0) {
      indexActiveSlide += 2;
      console.log("ya tut");
    } else indexActiveSlide++;
  }

  if (indexActiveSlide === 0) {
    btnPrev.classList.add("hiddenBtn-left");
  } else btnPrev.classList.remove("hiddenBtn-left");

  if (Math.abs(indexActiveSlide) === items.length - removeIndex) {
    btnNext.classList.add("hiddenBtn-right");
  } else btnNext.classList.remove("hiddenBtn-right");

  track.style.transform = shift(indexActiveSlide, zdvig);
  currentPosition = -(indexActiveSlide * zdvig);
  isDrag = false;

  track.style.transitionDuration = "400ms";

  console.log(indexActiveSlide);
}

track.addEventListener("mousedown", onDragStart);
section.addEventListener("mousemove", onDragOver);
section.addEventListener("mouseup", onDragEnd);

track.addEventListener("touchstart", onDragStart);
section.addEventListener("touchmove", onDragOver);
section.addEventListener("touchend", onDragEnd);
