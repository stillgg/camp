import { v, fileName } from "./index"

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
    fileName.parentElement.classList.add("active")
  } else {
    fileName.textContent = ""
    fileName.parentElement.classList.remove("active")
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

export {
  fileHandler,
  daysInputHandler,
  daysBlurHandler,
  monthsInputHandler,
  monthsBlurHandler,
  yearsInputHandler,
  telHandler,
}
