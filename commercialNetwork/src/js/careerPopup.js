import { onInput } from "./validate"
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
const inputSelect = form.querySelector("Select")

inputEmail.addEventListener("blur", (e) => onInput(e.target))
inputName.addEventListener("blur", (e) => onInput(e.target))
inputNationality.addEventListener("blur", (e) => onInput(e.target))
inputJob.addEventListener("blur", (e) => onInput(e.target))
inputDays.addEventListener("blur", (e) => onInput(e.target))
inputMonths.addEventListener("blur", (e) => onInput(e.target))
inputYears.addEventListener("blur", (e) => onInput(e.target))
inputSelect.addEventListener("blur", (e) => onInput(e.target))
inputTel.value = "+7"

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
