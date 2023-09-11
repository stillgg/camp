class Validation {
  constructor(schema) {
    this.schema = schema

    const keys = Object.keys(schema)
    const elements = {}

    keys.forEach((key) => {
      elements[key] = {
        isError: null,
        message: null,
        domElement: document.querySelector(`#${key}`),
      }
    })

    this.elements = elements
  }

  validate(id) {
    const input = this.elements[id].domElement
    const errorMessage = this.schema[id](input)

    if (typeof errorMessage === "string") {
      this.elements[id].isError = true
      this.elements[id].message = this.schema[id](input)
      input.parentNode.classList.add("invalid")

      if (input.nextElementSibling !== null) {
        input.nextElementSibling.textContent = this.elements[id].message
      }
    } else if (errorMessage === false) {
      this.elements[id].isError = false
      this.elements[id].message = null
      input.parentNode.classList.remove("invalid")
      input.nextElementSibling.textContent = null
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

  get isError() {}
}

export { Validation }
