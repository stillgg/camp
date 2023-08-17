const career = document.querySelector(".career")
const popup = document.querySelector(".career__popup")
const buttons = career.querySelectorAll(".main__block")
const closeBtn = popup.querySelector(".close__wrapper")
const form = popup.querySelector(".form")
const inputSelect = form.querySelector("Select")

const arrCities = [
  "Альметьевск",
  "Ангарск",
  "Астрахань",
  "Ачинск",
  "Балаково",
  "Барнаул",
  "Белорецк",
  "Бердск",
  "Бийск",
  "Братск",
  "Владивосток",
  "Волгоград",
  "Волжский",
  "Екатеринбург",
  "Ижевск",
  "Иркутск",
  "Казань",
  "Каменск-Уральский",
  "Кемерово",
  "Красноярск",
  "Ленинск-Кузнецкий",
  "Магнитогорск",
  "Набережные Челны",
  "Находка",
  "Нерюнгри",
  "Нижневартовск",
  "Нижнекамск",
  "Нижний Тагил",
  "Новокузнецк",
  "Новосибирск",
  "Норильск",
  "Омск",
  "Первоуральск",
  "Прокопьевск",
  "Ростов-на-Дону",
  "Саратов",
  "Стерлитамак",
  "Сургут",
  "Томск",
  "Тюмень",
  "Улан-Удэ",
  "Ульяновск",
  "Уфа",
  "Ханты-Мансийск",
  "Челябинск",
  "Энгельс",
  "Южно-Сахалинск",
  "Юрга",
  "Якутск",
  "Моего города нет в этом списке",
]

arrCities.forEach((city) => {
  fillCity(city)
})

function fillCity(name) {
  const elemCity = document.createElement("option")
  elemCity.value = name
  elemCity.textContent = name
  inputSelect.appendChild(elemCity)
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("active")
  })
})

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active")
})

const arrayInputs = form.querySelectorAll("input")
const inputEmail = form.querySelector("#Email")
const inputTel = form.querySelector("#Tel")
const inputName = form.querySelector("#Name")
const inputNationality = form.querySelector("#Nationality")
const inputJob = form.querySelector("#Job")
const inputDays = form.querySelector("#Days")
const inputMonths = form.querySelector("#Months")
const inputYears = form.querySelector("#Years")
const inputFile = form.querySelector("#File")
const inputConfirm = form.querySelector("#Confirm")

const onInput = (input) => {
  if (!eval(`isValid${input.id}(input)`)) {
    input.parentNode.classList.add("invalid")
  } else {
    input.parentNode.classList.remove("invalid")
  }
}
function isValidSelect(input) {
  if (input.value === "") {
    input.parentNode.dataset.el = "Выберите город"
    input.classList.add("invalid")
  } else {
    input.classList.remove("invalid")
  }
}
console.log(inputSelect.value)

function isValidMonths(input) {
  if (+input.value < 1) {
    input.value = ""
    input.classList.add("invalid")
    return
  }
  if (+input.value > 12 || +input.value < 1) {
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
    input.classList.add("invalid")
    return
  }
  if (+input.value > 31 || +input.value < 1) {
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
  if (input.value.length > 50) {
    input.parentNode.dataset.el = "Длина ФИО должна быть меньше 50 символов"
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
  if (input.value.length > 20) {
    input.parentNode.dataset.el = "Длина Гражданства должна быть меньше 20 символов"
    return false
  }
  return true
}

function isValidJob(input) {
  const regex = /^[A-Za-z ]+$/
  if (input.value.length < 5) {
    input.parentNode.dataset.el = "Длина Должности должна быть больше 4 символов"
    return false
  }
  if (input.value.length > 50) {
    input.parentNode.dataset.el = "Длина Должности должна быть больше 50 символов"
    return false
  }
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }
  if (input.value.length > 50) {
    input.parentNode.dataset.el = "Длина Должности должна быть меньше 50 символов"
    return false
  }
  return true
}

inputEmail.addEventListener("blur", (e) => onInput(e.target))
inputName.addEventListener("blur", (e) => onInput(e.target))
inputNationality.addEventListener("blur", (e) => onInput(e.target))
inputJob.addEventListener("blur", (e) => onInput(e.target))
inputDays.addEventListener("blur", (e) => onInput(e.target))
inputMonths.addEventListener("blur", (e) => onInput(e.target))
inputYears.addEventListener("blur", (e) => onInput(e.target))
inputSelect.addEventListener("blur", (e) => onInput(e.target))

inputTel.addEventListener("input", (e) => {
  const value = inputTel.value.replace(/\D+/g, "")
  const MaxLength = 11

  let result = "+"

  for (let i = 0; i < value.length && i < MaxLength; i++) {
    switch (i) {
      case 0:
        result += "7 ("
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

inputTel.addEventListener("blur", function () {
  if (this.value.length !== 18) {
    this.parentNode.dataset.el = "Неверный номер телефона"
    this.parentNode.classList.add("invalid")
  } else {
    this.parentNode.classList.remove("invalid")
  }
})

inputFile.addEventListener("change", function () {
  if (this.files[0].size > 100000) {
    onInput()
    this.value = ""
  }
})

inputConfirm.addEventListener("change", function () {
  console.log(confirm.checked)
})

let submit = false

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (
    inputConfirm.value &&
    inputDays.value &&
    inputEmail.value &&
    inputFile.value &&
    inputJob.value &&
    inputMonths.value &&
    inputName.value &&
    inputNationality.value &&
    inputSelect.value &&
    inputTel.value &&
    inputYears.value
  ) {
    submit = true
  } else {
    alert("Заполните все поля")
  }
  if (submit) {
    inputConfirm.value = ""
    inputDays.value = ""
    inputEmail.value = ""
    inputFile.value = ""
    inputJob.value = ""
    inputMonths.value = ""
    inputName.value = ""
    inputNationality.value = ""
    inputSelect.value = ""
    inputTel.value = ""
    inputYears.value = ""
  }
})
