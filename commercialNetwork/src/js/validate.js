// const form = document.querySelector("#unique-form")

// const inputConfirm = form.querySelector("#confirm")
// const inputSelect = form.querySelector("select")
// const inputTel = form.querySelector("#tel")
// const inputMonths = form.querySelector("#months")
// const inputYears = form.querySelector("#years")
// const inputDays = form.querySelector("#days")
// const inputEmail = form.querySelector("#email")
// const inputName = form.querySelector("#name")
// const inputNationality = form.querySelector("#nationality")
// const inputJob = form.querySelector("#job")
// const inputFile = form.querySelector("#file")

class Validation {
  constructor(schema) {
    this.schema = schema
  }

  isError(name) {
    const validator = this.schema[name]
    if (!validator) {
      console.error("Ошибка: Валидатор для поля " + name + " не определен.")
      return true // Возвращаем true, чтобы обозначить ошибку
    }
    return !validator(inputName) // Вызываем валидатор и инвертируем результат
  }

  isValid() {}

  validate() {
    const names = Object.keys(this.schema)
    const errors = names.filter((name) => this.isError(name))
    return errors
  }
}

function jobValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  return regex.test(input.value) && input.value.length >= 5 && input.value.length <= 50
}

function nationalityValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  return regex.test(input.value) && input.value.length >= 4 && input.value.length <= 20
}

function nameValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  return regex.test(input.value) && input.value.length >= 6 && input.value.length <= 50
}

function emailValidator(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  return EMAIL_REGEXP.test(input.value)
}

function daysValidator(input) {
  const value = +input.value
  return value >= 1 && value <= 31
}

function yearsValidator(input) {
  const value = +input.value
  return value >= 1950 && value <= 2005
}

function monthValidator(input) {
  const value = +input.value
  return value >= 1 && value <= 12
}

function telValidator(input) {
  return input.value.length === 18
}

function selectValidator(input) {
  return input.value !== ""
}

function confirmValidator(input) {
  return input.checked
}

function fileValidator(input) {
  if (input && input.files && input.files[0]) {
    return input.files[0].size <= 100000
  }
  return false
}

const obj = {
  confirm: confirmValidator,
  select: selectValidator,
  tel: telValidator,
  months: monthValidator,
  years: yearsValidator,
  days: daysValidator,
  email: emailValidator,
  name: nameValidator,
  nationality: nationalityValidator,
  job: jobValidator,
  file: fileValidator,
}

const example = new Validation(obj)

const errors = example.validate()
if (errors.length === 0) {
  console.log("Форма валидна.")
} else {
  console.log("Ошибки валидации:", errors)
}
