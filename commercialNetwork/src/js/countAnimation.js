import { watchedSlide } from "./scrollBar"

const network = document.querySelector(".network")
const numbers = network.querySelectorAll(".number__loader")

const promoters = document.querySelector(".promoters")
const promotersNumber = promoters.querySelectorAll(".promoters-number")

const map = document.querySelector(".map")
const mapNumbers = map.querySelectorAll(".map-numbers")

const infoSlides = [
  { slideIndex: 2, elements: numbers },
  { slideIndex: 3, elements: promotersNumber },
  { slideIndex: 6, elements: mapNumbers },
]

function countAnimation({ slideIndex, elements }) {
  
  elements.forEach((number, index) => {
    let i = 1
    const num = number.dataset.num
    const time = 4
    const animationNum = Number(num.split("").splice(0, 3).join(""))
    const staticNum = num.split("").splice(3, num.length)
    const step = (1000 * time + index * 200) / animationNum

    const timer = setInterval(function () {
      if (i <= animationNum && watchedSlide.activeSlide === slideIndex) {
        number.textContent = i + "0".repeat(staticNum.length)
      } else {
        clearInterval(timer)
      }
      i++
    }, step)
  })
}

function resetAnimation(elements) {
  elements.forEach((number) => {
    const timer = setTimeout(() => {
      number.textContent = 0
      clearTimeout(timer)
    }, 200)
  })
}

export { infoSlides, countAnimation, resetAnimation }
