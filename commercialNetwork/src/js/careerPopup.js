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
  adultValidator,
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
const fileName = form.querySelector(".filename")
const btnSubmit = form.querySelector("#submit")
const birhtdayInputs = form.querySelectorAll(".input__wrapper")

const buttons = document.querySelectorAll(".main__block")
const closeBtn = document.querySelector(".close__wrapper")

let day = null
let month = null
let year = null

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
    const id = element.formElement.getAttribute("id")
    const isFormError = v.isError

    if (isFormError === false) btnSubmit.classList.remove("disabled")
    else btnSubmit.classList.add("disabled")

    console.log(v.elements)

    if (id === "months" || id === "days" || id === "years") {
      checkBirthday(element)
    } else {
      checkField(element)
    }
  },
})

const listElements = [
  {
    el: file,
    events: [
      {
        name: "change",
        handler: fileHandler,
      },
      {
        name: "blur",
      },
    ],
  },
  {
    el: job,
    events: [
      {
        name: "input",
      },
      {
        name: "blur",
      },
    ],
  },
  {
    el: years,
    events: [
      {
        name: "blur",
        handler: yearsBlurHandler,
      },
      {
        name: "input",
        handler: yearsInputHandler,
      },
    ],
  },
  {
    el: days,
    events: [
      {
        name: "blur",
        handler: daysBlurHandler,
      },
      {
        name: "input",
        handler: daysInputHandler,
      },
    ],
  },
  {
    el: tel,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
        handler: telHandler,
      },
    ],
  },
  {
    el: months,
    events: [
      {
        name: "blur",
        handler: monthsBlurHandler,
      },
      {
        name: "input",
        handler: monthsInputHandler,
      },
    ],
  },
  {
    el: agreements,
    events: [
      {
        name: "blur",
      },
      {
        name: "change",
      },
    ],
  },
  {
    el: city,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: email,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: name,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
  {
    el: nationality,
    events: [
      {
        name: "blur",
      },
      {
        name: "input",
      },
    ],
  },
]

function addEvents(elements) {
  elements.forEach((element) => {
    const input = element.el
    const events = element.events

    for (const event of events) {
      input.addEventListener(event.name, (e) => {
        const id = e.target.getAttribute("id")
        if (typeof event.handler === "function") event.handler(e)
        v.validate(id)
      })
    }
  })
}

function fileHandler(e) {
  v.validate("file")

  if (v.elements.file.isError === false) {
    const input = e.target
    let str = ""

    for (let i = input.files[0].name.length - 1; i >= 0; i--) {
      if (input.files[0].name[i] === ".") break
      str += input.files[0].name[i]
    }
    str = str.split("").reverse().join("")

    const name = input.files[0].name.length > 15 ? input.files[0].name.slice(0, 15) + "..." + str : input.files[0].name
    fileName.textContent = name
  } else {
    fileName.textContent = ""
  }
}

function daysInputHandler(e) {
  const value = e.target.value

  if (value.length === 2) {
    months.focus()
  }

  if (value.length > 2) {
    e.target.value = value.slice(0, 2)
  }
}

function daysBlurHandler(e) {
  const value = e.target.value

  if (+value <= 9 && value.length === 1) {
    e.target.value = "0" + value
  }

  day = e.target.value
}

function monthsInputHandler(e) {
  const value = e.target.value

  if (value.length === 2) {
    years.focus()
  }

  if (value.length > 2) {
    e.target.value = value.slice(0, 2)
  }
}

function monthsBlurHandler(e) {
  const value = e.target.value

  if (+value <= 9 && value.length === 1) {
    e.target.value = "0" + value
  }

  month = e.target.value
}

function yearsInputHandler(e) {
  const value = e.target.value

  if (value.length === 4) {
    tel.focus()
  }

  if (value.length > 4) {
    e.target.value = value.slice(0, 2)
  }
}

function yearsBlurHandler(e) {
  year = e.target.value
}

function telHandler(e) {
  const value = e.target.value.replace(/\D+/g, "")
  const MaxLength = 11

  let result = "+7"

  if (value.length === 0) {
    e.target.value = result
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
  e.target.value = result
}

function checkBirthday(element) {
  const errorElement = element.errorMessageElement
  const parentInputElement = element.formElement.parentNode

  parentInputElement.classList.remove("invalid")

  if (element.isError === true) {
    parentInputElement.classList.add("invalid")
    errorElement.textContent = element.message
  }

  const isBirthdayError = Array.from(birhtdayInputs).some((input) => input.classList.contains("invalid"))

  if (isBirthdayError === false) {
    errorElement.textContent = ""
  }

  const validationAnswer = adultValidator(day, month, year)

  if (typeof validationAnswer === "string") {
    parentInputElement.classList.add("invalid")
    errorElement.textContent = validationAnswer
  }
}

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

addEvents(listElements)
