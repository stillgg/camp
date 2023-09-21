import { Validation } from "../validation"
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
} from "../validation/validators"

import "./events"
import "./fillCity"

const form = document.querySelector("#unique-form")

const agreements = form.querySelector("#agreements")
const city = form.querySelector("#city")
const tel = form.querySelector("#tel")
const months = form.querySelector("#months")
const years = form.querySelector("#years")
const days = form.querySelector("#days")
const email = form.querySelector("#email")
const fio = form.querySelector("#name")
const nationality = form.querySelector("#nationality")
const job = form.querySelector("#job")
const file = form.querySelector("#file")
const fileName = form.querySelector(".filename")
const btnSubmit = form.querySelector("#submit")

const buttons = document.querySelectorAll(".main__block")
const closeBtn = document.querySelector(".close__wrapper")

const schema = {
  agreements: agreementsValidator,
  city: cityValidator,
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

const v = new Validation(schema, {
  onChange(element) {
    const isFormError = v.isError

    if (isFormError === false) btnSubmit.classList.remove("disabled")
    else btnSubmit.classList.add("disabled")

    checkField(element)
  },
})

function checkField(element) {
  const parentInputElement = element.formElement.parentNode
  const errorElement = element.errorMessageElement

  parentInputElement.classList.remove("invalid")

  if (errorElement !== null) {
    errorElement.textContent = element.message || ""
  }

  if (element.isError === true) {
    parentInputElement.classList.add("invalid")
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault()
  if (btnSubmit.classList.contains("disabled")) return

  v.validateAll()
})

export { v, fileName }
