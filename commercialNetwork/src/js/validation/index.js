class Validation {
  constructor(schema) {
    this.schema = schema

    const keys = Object.keys(schema)
    const elements = {}

    keys.forEach((key) => {
      elements[key] = {
        isError: null,
        message: null,
        errorMessageElement: document.querySelector(`[data-error-message-${key}]`),
        formElement: document.querySelector(`#${key}`),
      }
    })

    this.elements = elements
  }

  validate(id) {
    const input = this.elements[id].formElement
    console.log(this.schema)
    const errorMessage = this.schema[id](input)
    const errorElement = this.elements[id].errorMessageElement
    // console.log(errorElement)

    if (typeof errorMessage === "string" || errorMessage === true) {
      this.elements[id].isError = true
      this.elements[id].message = this.schema[id](input)
      input.parentNode.classList.add("invalid")
      this.setErrorMessage(errorElement, errorMessage)

      if (errorElement) errorElement.textContent = errorMessage
    } else if (errorMessage === false) {
      this.elements[id].isError = false
      this.elements[id].message = null
      input.parentNode.classList.remove("invalid")
      // if (errorElement) errorElement.textContent = ""
    }
  }

  setErrorMessage(errorElement, errorMessage) {
    const arrayBirthday = document.querySelectorAll(".input__wrapper > input")

    arrayBirthday.forEach((input) => {
      if ((input.parentNode.classList.contains = "invalid")) {
        if (errorElement) errorElement.textContent = errorMessage
      }
    })
  }

  clear() {
    const keys = Object.keys(this.elements)
    keys.forEach((key) => {
      this.elements[key].isError = null
      this.elements[key].message = null
    })
  }

  validateAll() {
    const inputs = Object.keys(this.schema)

    inputs.forEach((input) => {
      this.validate(input)
    })
  }

  get isError() {}
}

export { Validation }
