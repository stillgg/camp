import { v } from "./index"

const form = document.querySelector("#form")
const file = form.querySelector("#file")

function fileHandler(e) {
  hideFile(e)

  if (v.elements.file.isError === false) {
    const input = e.target

    showFile(input.files[0])
  }
}

function showFile(file) {
  const fileElement = document.createElement("div")

  const [fileName, fileFormat] = file.name.split(".")

  fileElement.classList.add("file-info")
  fileElement.innerHTML = `
    <svg class="paper" width="20" height="20">
      <use xlink:href="../resources/icons/sprite.svg#paper"></use>
    </svg>
    <div class="wrapper-file">
      <span class="filename">${fileName}</span>
      <span class="fileformat">.${fileFormat}</span>
    </div>
    <span class="close-btn"> </span>
  `

  const fileContainer = document.querySelector("#fileContainer")
  fileContainer.appendChild(fileElement)

  setTimeout(() => {
    fileElement.classList.add("show-file")
  }, 300)

  const closeFiles = form.querySelectorAll(".close-btn")
  const closeFile = closeFiles[1] || closeFiles[0]

  closeFile.addEventListener("click", hideFile)
}

function hideFile() {
  const fileElements = fileContainer.querySelectorAll(".file-info")
  const firstFileElement = fileElements[0]

  if (firstFileElement) {
    firstFileElement.classList.add("hide-file")

    setTimeout(() => {
      fileContainer.removeChild(firstFileElement)
      file.value = ""
    }, 300)
  }
  v.validate("file")
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
