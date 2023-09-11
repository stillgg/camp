// import "./scss/index.scss"
// import "./js/hamburger"
// import "./js/map"
// import "./js/scrollBar"
// import "./js/networkLoader"

// import "./js/validate"
// import "./js/careerPopup"
// import "./js/fillCity"

// import { slider } from "./js/slider"

// slider("#slider-team-mobile")
// slider("#slider-team-desktop", { effect: "cards" })

// slider("#slider-news")
// slider("#slider-merch")

class Validation {
  constructor(schema) {
    this.schema = schema

    const keys = Object.keys(schema)
    const elements = {}

    keys.forEach((key) => {
      elements[key] = {
        isEror: null,
        message: null,
        domElement: document.querySelector(`${key}`),
      }
    })
  }

  validate() {}

  validateAll() {}
}

const schema = {
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

const inputs = new Validation()

console.log(inputs)
