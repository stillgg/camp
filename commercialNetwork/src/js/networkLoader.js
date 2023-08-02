import { watchedSlide } from "./scrollBar"
const network = document.querySelector(".network")
const numbers = network.querySelectorAll(".number__loader")

function animationNetwork() {
  numbers.forEach((number, index) => {
    let timer
    let i = 1
    const num = number.dataset.num
    const time = 4
    const animationNum = Number(num.split("").splice(0, 3).join(""))
    const ostatok = num.split("").splice(3, num.length)
    const step = (1000 * time + index * 200) / animationNum
    if (timer !== undefined) {
      console.log("обнуление")
      console.log(timer)
      clearInterval(timer)
    }
    console.log(timer)
    timer = setInterval(function () {
      if (i <= animationNum && watchedSlide.activeSlide === 2) {
        number.innerHTML = i + "0".repeat(ostatok.length)
      } else {
        clearInterval(timer)
      }
      i++
    }, step)
  })
}

function closeSection() {
  numbers.forEach((number) => {
    setTimeout(() => (number.innerHTML = 0), 200)
  })
}

export { animationNetwork, closeSection }
