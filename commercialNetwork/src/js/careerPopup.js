const career = document.querySelector(".career")
const popup = document.querySelector(".career__popup")
const buttons = career.querySelectorAll(".main__block")
const closeBtn = popup.querySelector(".close__wrapper")
const form = popup.querySelector(".form")

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("active")
  })
})

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active")
})

const inputEmail = form.querySelector("#Email")
const inputTel = form.querySelector("#Tel")
const inputName = form.querySelector("#Name")
const inputNationality = form.querySelector("#Nationality")
const inputJob = form.querySelector("#Job")

popup.addEventListener("scroll", (e) => {
  e.preventDefault()
})

const onInput = (input) => {
  if (!eval(`isValid${input.id}(input.value)`)) {
    input.classList.add("invalid")
  } else {
    input.classList.remove("invalid")
  }
}

function isValidEmail(value) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  return EMAIL_REGEXP.test(value)
}

function isValidName(value) {
  const regex = /^[A-Za-z ']+$/
  return value.match(regex) && value.length > 5
}

function isValidNationality(value) {
  const regex = /^[A-Za-z]+$/
  return value.match(regex) && value.length > 3
}

function isValidJob(value) {
  const regex = /^[A-Za-z ]+$/
  return value.match(regex) && value.length > 3
}

inputEmail.addEventListener("input", function () {
  onInput(this)
})
inputName.addEventListener("input", function () {
  onInput(this)
})
inputNationality.addEventListener("input", function () {
  onInput(this)
})
inputJob.addEventListener("input", function () {
  onInput(this)
})

// popup.addEventListener("wheel", (event) => {
//   event.stopPropagation()
// })
// popup.addEventListener("touchstart", (event) => {
//   event.stopPropagation()
// })

// popup.addEventListener("touchend", (event) => {
//   event.stopPropagation()
// })

// popup.addEventListener("mousedown", (event) => {
//   event.stopPropagation()
// })

// popup.addEventListener("mouseup", (event) => {
//   event.stopPropagation()
// })

popup.addEventListener("scroll", (e) => {
  e.preventDefault()
  console.log(popup)
})
