import { Validation } from "./validation"
import {
  jobValidator,
  nationalityValidator,
  nameValidator,
  emailValidator,
  daysValidator,
  yearsValidator,
  monthValidator,
  telValidator,
  cityValidator,
  agreementsValidator,
  fileValidator,
} from "./validation/validators"

const form = document.querySelector("#unique-form")

const agreements = form.querySelector("#agreements")
const city = form.querySelector("#city")
const tel = form.querySelector("#tel")
const months = form.querySelector("#months")
const years = form.querySelector("#years")
const days = form.querySelector("#days")
const email = form.querySelector("#email")
const name = form.querySelector("#name")
const nationality = form.querySelector("#nationality")
const job = form.querySelector("#job")
const file = form.querySelector("#file")

// const buttons = career.querySelectorAll(".main__block")
// const closeBtn = popup.querySelector(".close__wrapper")

const schema = {
  agreements: agreementsValidator,
  city: cityValidator,
  tel: telValidator,
  email: emailValidator,
  name: nameValidator,
  nationality: nationalityValidator,
  job: jobValidator,
  file: fileValidator,
  birthday: {
    months: monthValidator,
    years: yearsValidator,
    days: daysValidator,
  },
}

const v = new Validation(schema)

agreements.addEventListener("blur", () => {
  v.validate("agreements")
})

city.addEventListener("blur", () => {
  v.validate("city")
})

tel.addEventListener("blur", () => {
  v.validate("tel")
})

months.addEventListener("blur", () => {
  v.validate("months")
})

years.addEventListener("blur", () => {
  v.validate("years")
})

days.addEventListener("blur", () => {
  v.validate("days")
})

email.addEventListener("blur", () => {
  v.validate("email")
})

name.addEventListener("blur", () => {
  v.validate("name")
})

nationality.addEventListener("blur", () => {
  v.validate("nationality")
})

job.addEventListener("blur", () => {
  v.validate("job")
})

// file.addEventListener("blur", () => {
//   v.validate("file")
// })

file.addEventListener("change", (e) => isValidFile(e.target))

function isValidFile(input) {
  const label = input.parentNode

  if (!input.files[0]) {
    label.classList.add("invalid")
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

agreements.addEventListener("change", () => {
  v.validate("agreements")
})

job.addEventListener("input", (e) => {
  v.validate("job")
})

years.addEventListener("input", (e) => {
  if (e.target.value.length === 4) {
    tel.focus()
  }
  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 2)
  }
  v.validate("years")
})

days.addEventListener("input", (e) => {
  if (e.target.value.length === 2) {
    months.focus()
    v.validate("days")
  }
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2)
  }
})

email.addEventListener("input", (e) => {
  v.validate("email")
})

name.addEventListener("input", (e) => {
  v.validate("name")
})

nationality.addEventListener("input", (e) => {
  v.validate("nationality")
})

function telHandler(e) {
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

tel.addEventListener("input", (e) => {
  telHandler(e.target)
  v.validate("tel")
})

telHandler(tel)

months.addEventListener("input", (e) => {
  if (e.target.value.length === 2) {
    years.focus()
    v.validate("months")
  }
  if (e.target.value.length > 2) {
    e.target.value = e.target.value.slice(0, 2)
  }
})

form.addEventListener("submit", (e) => {
  e.preventDefault()

  v.validateAll()
})

document.addEventListener("click", () => {
  console.log(v.elements)
})
