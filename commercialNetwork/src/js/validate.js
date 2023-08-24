const btnSubmit = document.querySelector(".form__btn")
export let confirm = false

const onInput = (input) => {
  if (!eval(`isValid${input.id}(input)`)) {
    input.parentNode.classList.add("invalid")
    // btnSubmit.disabled = true
  } else {
    input.parentNode.classList.remove("invalid")
    btnSubmit.disabled = false
    btnSubmit.classList.remove("disabled")
  }
}

function isValidConfirm(input) {
  if (input.checked) {
    btnSubmit.disabled = false
    btnSubmit.classList.remove("disabled")
    input.parentNode.classList.remove("invalid")
    confirm = true
    return true
  } else {
    input.parentNode.classList.add("invalid")
    confirm = false
    return false
  }
}

function isValidSelect(input) {
  if (input.value === "") {
    input.parentNode.dataset.el = "Выберите город"
    input.classList.add("invalid")
    return false
  } else {
    input.classList.remove("invalid")
    return true
  }
}

function isValidTel(input) {
  console.log(input.value.length)
  if (input.value.length !== 18) {
    input.parentNode.dataset.el = "Неверный номер телефона"
    return false
  } else {
    return true
  }
}

function isValidMonths(input) {
  if (+input.value < 1) {
    input.value = ""
    input.classList.add("invalid")
    return
  }
  if (+input.value > 12 || +input.value < 1) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")
  return true
}

function isValidYears(input) {
  if (+input.value < 1) {
    input.value = ""
  }
  if (+input.value > 2023 || +input.value < 1950) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  if (+input.value > 2005) {
    input.parentNode.parentNode.dataset.el = "Мы принимаем на работу только совершеннолетних сотрудников"
    input.parentNode.parentNode.classList.add("invalid")
    input.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")

  return true
}

function isValidDays(input) {
  if (+input.value < 1) {
    input.value = ""
    input.classList.add("invalid")
    return
  }
  if (+input.value > 31 || +input.value < 1) {
    input.parentNode.parentNode.dataset.el = "Некорректно введена дата"
    input.classList.add("invalid")
    input.parentNode.parentNode.classList.add("invalid")
    return
  }
  input.parentNode.parentNode.classList.remove("invalid")
  input.classList.remove("invalid")

  return true
}

function isValidEmail(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  input.parentNode.dataset.el = "Неверно введен email"
  return EMAIL_REGEXP.test(input.value)
}

function isValidName(input) {
  const regex = /^[A-Za-z ']+$/
  if (input.value.length < 6) {
    input.parentNode.dataset.el = "Длина ФИО должна быть больше 5 символов"
    return false
  }
  if (input.value.length > 50) {
    input.parentNode.dataset.el = "Длина ФИО должна быть меньше 50 символов"
    return false
  }
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }

  return true
}

function isValidNationality(input) {
  const regex = /^[A-Za-z]+$/
  if (input.value.length < 4) {
    input.parentNode.dataset.el = "Длина Гражданства должна быть больше 3 символов"
    return false
  }
  if (input.value.length > 20) {
    input.parentNode.dataset.el = "Длина Гражданства должна быть меньше 20 символов"
    return false
  }
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }

  return true
}

function isValidJob(input) {
  const regex = /^[A-Za-z ]+$/
  if (input.value.length < 5) {
    input.parentNode.dataset.el = "Длина Должности должна быть больше 4 символов"
    return false
  }
  if (input.value.length > 50) {
    input.parentNode.dataset.el = "Длина Должности должна быть меньше 50 символов"
    return false
  }
  if (!input.value.match(regex)) {
    input.parentNode.dataset.el = "Введены некорректные символы"
    return false
  }
  return true
}

export { onInput }
