const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");

const track = document.querySelector(".slider-track");
const item = document.querySelector(".slider-item");
const items = document.querySelectorAll(".slider-item");
const getGap = getComputedStyle(track);

let indexActiveSlide = 0;

btnNext.addEventListener("click", () => {
  const clientWidth = window.innerWidth;
  const shiftValue = shiftCalculate();
  removeIndex = clientWidth >= 993 ? 2 : 1;
  console.log(removeIndex);
  if (Math.abs(indexActiveSlide) < items.length - removeIndex) {
    indexActiveSlide--;
    track.style.transform = shift(indexActiveSlide, shiftValue);
  }
});

btnPrev.addEventListener("click", () => {
  const shiftValue = shiftCalculate();
  if (indexActiveSlide !== 0) {
    indexActiveSlide++;
    track.style.transform = shift(indexActiveSlide, shiftValue);
  }
});

function shift(index, shift) {
  return `translateX(${index * shift}px)`;
}

function shiftCalculate() {
  const itemWidth = item.offsetWidth;

  return (shiftValue = parseInt(getGap.gap) + itemWidth);
}

// if (indexActiveSlide === items.length - 1) btnNext.disabled = true;
// console.log("next - ");
// // track.style.transform = `translateX(${}px)`;

// if (indexActiveSlide === 0) btnPrev.disabled = true;
// else {
//   btnPrev.disabled = false;
// }

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
