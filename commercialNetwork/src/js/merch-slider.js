let position = 0;
const slidesToShow = 2;
const slidesToScroll = 1;

const container = document.querySelector(".slider-container");
const track = document.querySelector(".slider-track");
// const item = document.querySelector(".merch-item");
const btnNext = document.querySelector("#btn-next");
const btnPrev = document.querySelector("#btn-prev");
const items = document.querySelectorAll(".slider-item");
const itemsCount = items.length;
const itemWitdh = container.clientWidth / slidesToShow;
const movePosition = slidesToScroll * itemWitdh;

const zdvig = container.clientWidth * 0.48;

items.forEach((item) => {
  item.style.minWidth = `${48}%`;
});

btnNext.addEventListener("click", () => {
  const itemsLeft =
    itemsCount - (Math.abs(position) + slidesToShow * itemWitdh) / itemWitdh;

  position -=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWitdh;

  setPosition();
  checkBtns();
});

btnPrev.addEventListener("click", () => {
  const itemsLeft = Math.abs(position) / itemWitdh;

  position +=
    itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWitdh;

  setPosition();
  checkBtns();
});

const setPosition = () => {
  track.style.transform = `translateX(${position}px)`;
};

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWitdh;
};

checkBtns();
