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

const inputDays = form.querySelector("#Days")
const inputMonths = form.querySelector("#Months")
const inputYears = form.querySelector("#Years")

const onInput = (input) => {
  console.log(input)
  if (!eval(`isValid${input.id}(input)`)) {
    input.parentNode.classList.add("invalid")
  } else {
    input.parentNode.classList.remove("invalid")
  }
}

function isValidMonths(input) {
  if (+input.value > 12) {
    input.parentNode.dataset.el = "Некорректно введена дата"
    return false
  }
  return true
}

function isValidYears(input) {
  if (+input.value > 2023 || +input.value < 1950) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    return false
  }
  if (+input.value > 2005) {
    input.parentNode.parentNode.dataset.el = "Мы принимаем на работу только совершеннолетних сотрудников"
    return false
  }
  return true
}

function isValidDays(input) {
  if (+input.value > 31) {
    console.log(input.parentNode.parentNode)
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    return false
  }
  if (input.value < 1) {
    input.value = ""
  }
  return true
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
inputDays.addEventListener("blur", function () {
  onInput(this)
})
inputMonths.addEventListener("blur", function () {
  onInput(this)
})
inputYears.addEventListener("blur", function () {
  onInput(this)
})

popup.addEventListener("scroll", (e) => {
  e.preventDefault()
})
