class Validation {
  constructor(schema, params) {
    this.schema = schema

    const keys = Object.keys(schema)
    const obj = {}

    keys.forEach((key) => {
      obj[key] = {
        isError: null,
        message: null,
        errorMessageElement: document.querySelector(`[data-error-message-${key}]`),
        formElement: document.querySelector(`#${key}`),
      }
    })

    const elements = new Proxy(obj, {
      set(target, key, value) {
        target[key] = value
        params.onChange(value)
        return true
      },
    })

    this.elements = elements
  }

  validate(id) {
    // console.log(this.elements)
    const input = this.elements[id].formElement
    const errorMessage = this.schema[id](input)
    const errorElement = this.elements[id].errorMessageElement

    // console.log(...this.elements[id])

    if (typeof errorMessage === "string" || errorMessage === true) {
      this.elements[id] = {
        ...this.elements[id],
        isError: true,
        message: this.schema[id](input),
      }

      input.parentNode.classList.add("invalid")
      this.setErrorMessage(errorElement, errorMessage)

      if (errorElement) errorElement.textContent = errorMessage
    } else if (errorMessage === false) {
      this.elements[id] = {
        ...this.elements[id],
        isError: false,
        message: null,
      }
      input.parentNode.classList.remove("invalid")
      this.setErrorMessage(errorElement, "")
    }
  }

  setErrorMessage(errorElement, errorMessage) {
    if (errorElement) errorElement.textContent = errorMessage
  }

  clear() {
    const keys = Object.keys(this.elements)
    keys.forEach((key) => {
      this.elements[key].isError = null
      this.elements[key].message = null
    })
  }

  get isError() {
    return Object.values(this.elements).some((element) => element.isError === true)
  }

  validateAll() {
    const inputs = Object.keys(this.schema)

    inputs.forEach((input) => {
      this.validate(input)
    })
  }
}

export { Validation }
