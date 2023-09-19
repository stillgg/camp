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

  get isError() {
    return Object.values(this.elements).some((element) => element.isError === true)
  }

  getErrorMessage(validationAnswer) {
    if (typeof validationAnswer === "boolean") return null

    return validationAnswer
  }

  validate(id) {
    const input = this.elements[id].formElement
    const validationAnswer = this.schema[id](input)
    const errorMessage = this.getErrorMessage(validationAnswer)

    if (typeof validationAnswer === "string" || validationAnswer === false) {
      this.elements[id] = {
        ...this.elements[id],
        isError: true,
        message: errorMessage,
      }
    } else if (validationAnswer === true) {
      this.elements[id] = {
        ...this.elements[id],
        isError: false,
        message: null,
      }
    }
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
}

export { Validation }
