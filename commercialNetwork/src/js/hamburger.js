import { watchedSlide } from "./scrollBar"

const hamburgerBodys = document.querySelector("#menu__body")
const hamburgerBtn = document.querySelector("#wrapper__icon")
const hamburgerBody = document.querySelector("#menu__body")
const header = document.querySelector(".header")
const body = document.querySelector("body")

let isOpenBurger = false
let isHeaderBlack = false

hamburgerBtn.addEventListener("click", () => {
  isOpenBurger === true ? closeBurger() : openBurger()
})

function openBurger() {
  hamburgerBtn.classList.add("active")
  hamburgerBody.classList.add("active")
  body.classList.add("lock")
  isOpenBurger = true

  if (header.classList.contains("black")) {
    header.classList.remove("black")
    isHeaderBlack = true
  } else {
    isHeaderBlack = false
  }
}

function closeBurger() {
  hamburgerBtn.classList.remove("active")
  hamburgerBody.classList.remove("active")
  body.classList.remove("lock")
  isOpenBurger = false

  if (isHeaderBlack) {
    header.classList.add("black")
  }
}

hamburgerBodys.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", () => {
    closeBurger()
    isHeaderBlack = false
    watchedSlide.activeSlide = +link.dataset.sectionid
  })
})
