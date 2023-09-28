import { Validation } from "../validation"
import {
  jobValidator,
  nationalityValidator,
  fioValidator,
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
import './fetch'
import { sendRequest,requestURL } from "./fetch"

const form = document.querySelector("#form")

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
  fio: fioValidator,
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

  sendRequest('POST',requestURL,v.elements).then(data => console.log(data))
})

export { v }
