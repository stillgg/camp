import { onInput, confirm } from "./validate"
const career = document.querySelector(".career")
const popup = document.querySelector(".career__popup")
const buttons = career.querySelectorAll(".main__block")
const closeBtn = popup.querySelector(".close__wrapper")
const form = popup.querySelector(".form")
const btnSubmit = document.querySelector(".form__btn")

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active")
})

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    popup.classList.add("active")
  })
})

const arrayInputs = form.querySelectorAll("input")
// const inputEmail = form.querySelector("#Email")
const inputTel = form.querySelector("#Tel")
// const inputName = form.querySelector("#Name")
// const inputNationality = form.querySelector("#Nationality")
// const inputJob = form.querySelector("#Job")
const inputDays = form.querySelector("#Days")
const inputMonths = form.querySelector("#Months")
const inputYears = form.querySelector("#Years")
const inputFile = form.querySelector("#File")
const inputConfirm = form.querySelector("#Confirm")
const inputSelect = form.querySelector("Select")

// arrayInputs.push(inputSelect)
arrayInputs.forEach((input) => {
  if (input.id !== "File" || input.id !== "submit") {
    input.addEventListener("blur", (e) => onInput(e.target))
  }
})

// inputEmail.addEventListener("blur", (e) => onInput(e.target))
// inputName.addEventListener("blur", (e) => onInput(e.target))
// inputNationality.addEventListener("blur", (e) => onInput(e.target))
// inputJob.addEventListener("blur", (e) => onInput(e.target))
// inputDays.addEventListener("blur", (e) => onInput(e.target))
// inputMonths.addEventListener("blur", (e) => onInput(e.target))
// inputYears.addEventListener("blur", (e) => onInput(e.target))
inputSelect.addEventListener("blur", (e) => onInput(e.target))
// inputTel.value = "+7"

function inputTelHandler(e) {
  const value = e.value.replace(/\D+/g, "")
  const MaxLength = 11

  let result = "+7"

  if (value.length === 0) {
    e.value = result
    return
  }

  for (let i = 0; i < value.length && i < MaxLength; i++) {
    switch (i) {
      case 0:
        result += " ("
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
  e.value = result
}

inputTel.addEventListener("input", (e) => {
  inputTelHandler(e.target)
})

inputTelHandler(inputTel)

// inputTel.addEventListener("blur", function () {
//   if (this.value.length !== 18) {
//     this.parentNode.dataset.el = "Неверный номер телефона"
//     this.parentNode.classList.add("invalid")
//   } else {
//     this.parentNode.classList.remove("invalid")
//   }
// })

inputFile.addEventListener("change", (e) => isValidFile(e.target))
const label = inputFile.parentNode

function isValidFile(input) {
  if (!input.files[0]) {
    label.classList.add("invalid")
    label.dataset.el = "Прикрепите резюме"
    return
  }
  if (input.files[0].size > 100000) {
    label.classList.add("invalid")
    label.dataset.el = "Резюме должно быть меньше 1мб"
    input.value = ""
    return
  } else {
    label?.classList.remove("invalid")
    label?.classList.add("accept")
    label.dataset.el = input.files[0].name.length > 20 ? input.files[0].name.slice(0, 20) + "..." : input.files[0].name
    return
  }
}

inputConfirm.addEventListener("change", function () {
  if (this.checked) {
    this.parentNode.classList.remove("invalid")
  } else {
    this.parentNode.classList.add("invalid")
  }
})

inputDays.addEventListener("input", (e) => {
  if (e.target.value.length === 2) {
    inputMonths.focus()
  }
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2)
  }
})

inputMonths.addEventListener("input", (e) => {
  if (e.target.value.length === 2) {
    inputYears.focus()
  }
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2)
  }
})

inputYears.addEventListener("input", (e) => {
  if (e.target.value.length === 4) {
    inputTel.focus()
  }
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 2)
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(arrayInputs)

  arrayInputs.forEach((input) => {
    if (input.id !== "File") {
      onInput(input)
    }
  })

  isValidFile(inputFile)
  onInput(inputSelect)

  for (let i = 0; i < arrayInputs.length; i++) {
    if (arrayInputs[i].parentNode?.classList.contains("invalid")) {
      btnSubmit.disabled = true
      btnSubmit.classList.add("disabled")
      return
    }
  }

  arrayInputs.forEach((input) => {
    input.value = ""
  })
  inputSelect.value = ""
  inputFile.value = ""
  inputConfirm.checked = false
})

// || confirm
// || arrayInputs[i].value === ""
// Название файла на кнопке, при фалс подсветить кнопку красным
// Красный цвет на кнофирм
// Серая кнопка при сабмите фалс
