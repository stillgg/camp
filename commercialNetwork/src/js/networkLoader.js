import { watchedSlide } from "./scrollBar"
const network = document.querySelector(".network")
const numbers = network.querySelectorAll(".number__loader")

function animationNetwork() {
  numbers.forEach((number, index) => {
    let i = 1
    const num = number.dataset.num
    const time = 4
    const animationNum = Number(num.split("").splice(0, 3).join(""))
    const staticNum = num.split("").splice(3, num.length)
    const step = (1000 * time + index * 200) / animationNum

    const timer = setInterval(function () {
      if (i <= animationNum && watchedSlide.activeSlide === 2) {
        number.textContent = i + "0".repeat(staticNum.length)
      } else {
        clearInterval(timer)
      }
      i++
    }, step)
  })
}

function closeSection() {
  numbers.forEach((number) => {
    setTimeout(() => (number.textContent = 0), 200)
  })
}

export { animationNetwork, closeSection }
