// import { watchedSlide } from "./scrollBar";
const hamburgerBtn = document.querySelector("#wrapper__icon");
const hamburgerBody = document.querySelector("#menu__body");
const body = document.querySelector("body");
const header = document.querySelector(".header");
const indicator = document.querySelector("#indicator");

let isOpenBurger = false;
hamburgerBtn.addEventListener("click", () => {
  isOpenBurger === true ? closeBurger() : openBurger();
});

function openBurger() {
  hamburgerBtn.classList.add("active");
  hamburgerBody.classList.add("active");
  body.classList.add("lock");

  isOpenBurger = true;
}

function closeBurger() {
  hamburgerBtn.classList.remove("active");
  hamburgerBody.classList.remove("active");
  body.classList.remove("lock");

  isOpenBurger = false;
}

export { closeBurger };
