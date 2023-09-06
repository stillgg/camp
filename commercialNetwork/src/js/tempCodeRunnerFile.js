const form = document.querySelector("#unique-form")

const inputConfirm = form.querySelector("#confirm")
const inputSelect = form.querySelector("select")
const inputTel = form.querySelector("#tel")
const inputMonths = form.querySelector("#months")
const inputYears = form.querySelector("#years")
const inputDays = form.querySelector("#days")
const inputEmail = form.querySelector("#email")
const inputName = form.querySelector("#name")
const inputNationality = form.querySelector("#nationality")
const inputJob = form.querySelector("#job")
const inputFile = form.querySelector("#file")

class Validation {
  constructor(schema) {
    this.schema = schema
  }

  isEror(name) {
    const validator = this.schema[name]
    if (!validator) {
      console.log("error")
      return false
    }
    return !validator(name)
  }

  isValid() {}

  validate() {
    const names = Object.keys(this.schema)
    const errors = names.filter((name) => this.isError(name))
    return errors
  }
}

jobValidator = (input) => {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (!input.value.match(regex) && input.value.length < 5 && input.value.length > 50) return false

  return true
}

nationalityValidator = (input) => {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (!input.value.match(regex) && input.value.length < 4 && input.value.length > 20) return false

  return true
}

nameValidator = (input) => {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (!input.value.match(regex) && input.value.length > 50 && input.value.length < 6) return false

  return true
}

emailValidator = (input) => {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

  if (!EMAIL_REGEXP) return false
  return true
}

daysValidator = (input) => {
  const value = +input.value
  if (value < 1 && value > 31) return false

  return true
}

yearsValidator = (input) => {
  const value = +input.value
  if (value < 1950 && value > 2005) return false

  return true
}

monthValidator = (input) => {
  const value = +input.value
  if (value < 1 && value > 12) return false

  return true
}

telValidator = (input) => {
  if (input.value.length !== 18) return false

  return true
}

selectValidator = (input) => {
  if (input.value === "") return false

  return true
}

confirmValidator = (input) => {
  if (!input.checked) return false

  return true
}

fileValidator = (input) => {
  if (!input.files[0] || input.files[0].size > 100000) return false

  return true
}

const obj = {
  confirm: { confirmValidator },
  select: { selectValidator },
  tel: { telValidator },
  month: { monthValidator },
  years: { yearsValidator },
  days: { daysValidator },
  email: { emailValidator },
  name: { nameValidator },
  nationality: { nationalityValidator },
  job: { jobValidator },
  file: { fileValidator },
}

const example = new Validation(obj)

console.log(obj.name.nameValidator())
