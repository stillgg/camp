const network = document.querySelector(".network")
const numbers = network.querySelectorAll(".number__loader")

function animationNetwork() {
  numbers.forEach((number, index) => {
    let i = 1
    const num = number.dataset.num
    const time = 4
    const animationNum = Number(num.split("").splice(0, 3).join(""))
    const ostatok = num.split("").splice(3, num.length)
    const step = (1000 * time + index * 200) / animationNum
    console.log(num)
    console.log(animationNum)
    console.log(ostatok)

    const timer = setInterval(function () {
      if (i <= animationNum) {
        number.innerHTML = i + "0".repeat(ostatok.length)
      } else {
        clearInterval(timer)
      }
      i++
    }, step)
  })
}

export { animationNetwork }
