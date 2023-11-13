import { watchedSlide } from "./scrollBar"

const network = document.querySelector(".network")
const numbers = network.querySelectorAll(".number__loader")

const promoters = document.querySelector(".promoters")
const promotersNumber = promoters.querySelectorAll(".promoters-number")

const map = document.querySelector(".map")
const mapNumbers = map.querySelectorAll(".map-numbers")

const animatedInfo = [
  { id: 2, elemets: numbers },
  { id: 3, elemets: promotersNumber },
  { id: 6, elemets: mapNumbers },
]

function animationNetwork(id) {
  const numbers = animatedInfo.find((slide) => {
    if (slide.id === id) {
      return slide
    }
  })

  console.log(numbers)

  numbers.elemets.forEach((number, index) => {
    let i = 1
    const num = number.dataset.num
    const time = 4
    const animationNum = Number(num.split("").splice(0, 3).join(""))
    const staticNum = num.split("").splice(3, num.length)
    const step = (1000 * time + index * 200) / animationNum

    const timer = setInterval(function () {
      if (i <= animationNum && watchedSlide.activeSlide === id) {
        number.textContent = i + "0".repeat(staticNum.length)
      } else {
        clearInterval(timer)
      }
      i++
    }, step)
  })
}

function closeSection(id) {
  const numbers = animatedInfo.find((slide) => {
    if (slide.id === id) {
      return slide
    }
  })

  numbers.elemets.forEach((number) => {
    setTimeout(() => (number.textContent = 0), 200)
  })
}

export { animationNetwork, closeSection }
