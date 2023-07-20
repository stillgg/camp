const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const section = document.querySelector(".merch");

const track = document.querySelector(".slider-track");
const items = document.querySelectorAll(".slider-item");
const getGap = getComputedStyle(track);

const zdvig = shiftCalculate();

let indexActiveSlide = 0;

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left");

btnNext.addEventListener("click", () => {
  const clientWidth = window.innerWidth;

  removeIndex = clientWidth >= 993 ? 2 : 1;

  if (Math.abs(indexActiveSlide) < items.length - removeIndex) {
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
  // console.log("index - ", index, "shift - ", shift);
  return `translateX(${index * shift}px)`;
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

  positionStart =
    event.type === "touchstart" ? event.touches[0].clientX : event.clientX;

  positionStart += currentPosition;
}

function onDragOver(event) {
  if (!isDrag) return;

  const move =
    event.type === "touchmove" ? event.touches[0].clientX : event.clientX;
  console.log(move);
  track.style.transform = `translateX(${move - positionStart}px)`;
}

function onDragEnd(event) {
  isDrag = false;

  let positionEnd =
    event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX;

  positionEnd += currentPosition;

  console.log(positionEnd);

  if (
    positionStart > positionEnd &&
    Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
    -indexActiveSlide !== items.length - 1
  ) {
    indexActiveSlide--;
  }

  if (
    positionStart < positionEnd &&
    positionEnd - positionStart > zdvig * 0.2 &&
    indexActiveSlide !== 0
  ) {
    indexActiveSlide++;
  }

  track.style.transform = shift(indexActiveSlide, zdvig);
  currentPosition = -(indexActiveSlide * zdvig);
}

track.addEventListener("mousedown", onDragStart);
section.addEventListener("mousemove", onDragOver);
section.addEventListener("mouseup", onDragEnd);

track.addEventListener("touchstart", onDragStart);
section.addEventListener("touchmove", onDragOver);
section.addEventListener("touchend", onDragEnd);
