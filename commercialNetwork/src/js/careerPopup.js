const career = document.querySelector(".career")
const popup = document.querySelector(".career__popup")
const buttons = career.querySelectorAll(".main__block")
const closeBtn = popup.querySelector(".close__wrapper")
const form = popup.querySelector(".form")
const select = form.querySelector("select")

const arrCities = ["Брянск", "Томск", "Москва", "Питер", "Пукавичи"]

arrCities.forEach((city) => {
  fillCity(city)
})
function fillCity(name) {
  const elemCity = document.createElement("option")
  elemCity.value = name
  elemCity.textContent = name
  select.appendChild(elemCity)
}

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
  if (+input.value < 1) {
    input.value = ""
  }
  if (+input.value > 12) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")

  return true
}

function isValidYears(input) {
  if (+input.value < 1) {
    input.value = ""
  }
  if (+input.value > 2023 || +input.value < 1950) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  if (+input.value > 2005) {
    input.parentNode.parentNode.dataset.el = "Мы принимаем на работу только совершеннолетних сотрудников"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")

  return true
}

function isValidDays(input) {
  if (+input.value < 1) {
    input.value = ""
  }
  if (+input.value > 31) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.classList.add("invalid")
    input.parentNode.parentNode.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")

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

inputTel.addEventListener("input", (e) => {
  const value = inputTel.value.replace(/\D+/g, "")
  console.log(value)
  const numberLength = 11

  let result = "+"

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 0:
        result += "7 ("
        console.log(result, i)
        continue
      case 4:
        result += ") "
        break
      case 7:
        result += "-"
        break
      case 9:
        result += "-"
        break
      default:
        break
    }
    result += value[i]
  }
  inputTel.value = result
})

inputTel.addEventListener("focus", function () {
  if (!this.value) {
    this.value = "+7"
  }
})

popup.addEventListener("scroll", (e) => {
  e.preventDefault()
})

const inputFile = form.querySelector("#input__file")
inputFile.addEventListener("change", function () {
  if (this.files[0].size > 100000) {
    onInput()
    this.value = ""
  }
})

const confirm = form.querySelector("#confirm")
console.log(confirm.checked)
confirm.addEventListener("change", function () {
  console.log(confirm.checked)
})
