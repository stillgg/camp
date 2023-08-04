const career = document.querySelector(".career")
const header = document.querySelector(".header")
const popup = career.querySelector(".career__popup")
const buttons = career.querySelectorAll(".main__block")
const closeBtn = career.querySelector(".close__wrapper")
const form = career.querySelector(".form")

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("active")
    header.classList.add("hidden")
  })
})

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active")
  header.classList.remove("hidden")
})

const inputCity = form.querySelector("#city-select")
const inputJob = form.querySelector("#job")
const inputTel = form.querySelector("#tel")
const inputEmail = form.querySelector("#email")
const inputName = form.querySelector("#full_name")
const inputNational = form.querySelector("#nationality")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(inputCity.value)
  console.log(inputJob.value)
})
popup.addEventListener("wheel", (event) => {
  event.stopPropagation()
})
popup.addEventListener("touchstart", (event) => {
  event.stopPropagation()
})

popup.addEventListener("touchend", (event) => {
  event.stopPropagation()
})

popup.addEventListener("mousedown", (event) => {
  event.stopPropagation()
})

popup.addEventListener("mouseup", (event) => {
  event.stopPropagation()
})
