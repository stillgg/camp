const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");

const track = document.querySelector(".slider-track");
const items = document.querySelectorAll(".slider-item");
const getGap = getComputedStyle(track);

let indexActiveSlide = 0;

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left");

btnNext.addEventListener("click", () => {
  const clientWidth = window.innerWidth;
  const shiftValue = shiftCalculate();
  removeIndex = clientWidth >= 993 ? 2 : 1;

  if (Math.abs(indexActiveSlide) < items.length - removeIndex) {
    indexActiveSlide--;
    track.style.transform = shift(indexActiveSlide, shiftValue);

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
  const shiftValue = shiftCalculate();

  if (indexActiveSlide !== 0) {
    indexActiveSlide++;
    track.style.transform = shift(indexActiveSlide, shiftValue);

    if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left");

    if (indexActiveSlide !== -2 || indexActiveSlide !== -3) {
      btnNext.classList.remove("hiddenBtn-right");
    }
  }
});

function shift(index, shift) {
  return `translateX(${index * shift}px)`;
}

function shiftCalculate() {
  const itemWidth = items[0].offsetWidth;
  return (shiftValue = parseInt(getGap.gap) + itemWidth);
}

let startPos = 0;
let isDrag = false;
let currentTranslate = 0;
let prevTranslate = 0;

track.addEventListener("touchstart", dragStart);
track.addEventListener("touchmove", drag);
track.addEventListener("touchend", dragEnd);

function dragStart(event) {
  event.preventDefault();

  if (event.type === "touchstart") {
    startPos = event.touches[0].clientX;
    isDrag = true;
  }
}

function drag(event) {
  if (!isDrag) return;

  if (event.type === "touchmove") {
    const currentPosition = event.touches[0].clientX;

    currentTranslate = prevTranslate + (currentPosition - startPos) * 1.5;
    shiftValue = shiftCalculate();

    if (
      currentTranslate > 0 ||
      currentTranslate < -((items.length - 1) * shiftValue)
    ) {
      currentTranslate = prevTranslate;
      return;
    }
    track.style.transform = `translateX(${currentTranslate}px)`;
  }
}

function dragEnd() {
  isDrag = false;
  prevTranslate = currentTranslate;
}

// let position = 0;
// const slidesToShow = 2;
// const slidesToScroll = 1;

// const container = document.querySelector(".slider-container");
// const track = document.querySelector(".slider-track");
// // const item = document.querySelector(".merch-item");

// const items = document.querySelectorAll(".slider-item");
// const itemsCount = items.length;
// const itemWitdh = container.clientWidth / slidesToShow;
// const movePosition = slidesToScroll * itemWitdh;

// const zdvig = container.clientWidth * 0.48;

// items.forEach((item) => {
//   // item.style.minWidth = `${48}%`;
// });

// btnNext.addEventListener("click", () => {
//   const itemsLeft =
//     itemsCount - (Math.abs(position) + slidesToShow * itemWitdh) / itemWitdh;

//   position -=
//     itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWitdh;

//   setPosition();
//   checkBtns();
// });

// btnPrev.addEventListener("click", () => {
//   const itemsLeft = Math.abs(position) / itemWitdh;

//   position +=
//     itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWitdh;

//   setPosition();
//   checkBtns();
// });

// const setPosition = () => {
//   track.style.transform = `translateX(${position}px)`;
// };

// const checkBtns = () => {
//   btnPrev.disabled = position === 0;
//   btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWitdh;
// };

// checkBtns();
