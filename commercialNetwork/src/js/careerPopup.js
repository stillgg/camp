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
  if (!eval(`isValid${input.id}(input)`)) {
    input.parentNode.classList.add("invalid")
    console.log(inputEmail.parentNode.dataset.el)
  } else {
    input.parentNode.classList.remove("invalid")
  }
}

function isValidEmail(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  input.parentNode.dataset.el = "Неверно введен email"
  return EMAIL_REGEXP.test(input.value)
}

function isValidName(input) {
  const regex = /^[A-Za-z ']+$/
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }
  if (input.value.length < 6) {
    input.parentNode.dataset.el = "Длина ФИО должна быть больше 5 символов"
    return false
  }
  return true
}

function isValidNationality(input) {
  const regex = /^[A-Za-z]+$/
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }
  if (input.value.length < 4) {
    input.parentNode.dataset.el = "Длина Гражданства должна быть больше 3 символов"
    return false
  }
  return true
}

function isValidJob(input) {
  const regex = /^[A-Za-z ]+$/
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }
  if (input.value.length < 5) {
    input.parentNode.dataset.el = "Длина Должности должна быть больше 4 символов"
    return false
  }
  return true
}

inputEmail.addEventListener("blur", function () {
  onInput(this)
})
inputName.addEventListener("blur", function () {
  onInput(this)
})
inputNationality.addEventListener("blur", function () {
  onInput(this)
})
inputJob.addEventListener("blur", function () {
  onInput(this)
})

popup.addEventListener("scroll", (e) => {
  e.preventDefault()
})
