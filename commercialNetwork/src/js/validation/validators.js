function jobValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (input.value.length < 5) {
    return "Длина должна быть больше 4 символов"
  }
  if (input.value.length > 50) {
    return "Длина должна быть меньше 50 символов"
  }
  if (!input.value.match(regex)) {
    return "Введены некорректные символы"
  }

  return true
}

function nationalityValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (input.value.length < 4) {
    return "Длина должна быть больше 3 символов"
  }
  if (input.value.length > 20) {
    return "Длина Гражданства должна быть меньше 20 символов"
  }
  if (!input.value.match(regex)) {
    return "Введены некорректные символы"
  }

  return true
}

function nameValidator(input) {
  const regex = /^[А-Яа-яA-Za-z ']+$/
  if (input.value.length < 6) {
    return "ФИО должно быть более 5 символов"
  }
  if (input.value.length > 50) {
    return "ФИО должно быть менее 50 символов"
  }
  if (!input.value.match(regex)) {
    return "Введены некорректные символы"
  }

  return true
}

function emailValidator(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  if (!EMAIL_REGEXP.test(input.value)) return "Неверно введен email"

  return true
}

function daysValidator(input) {
  if (+input.value > 31 || +input.value < 1) {
    return "Некорректно введена дата"
  }

  return true
}

function yearsValidator(input) {
  const value = +input.value
  const currentYear = new Date().getFullYear()

  if (value > currentYear || value < 1950) {
    return "Некорректно введена дата"
  }

  return true
}

function monthValidator(input) {
  const value = +input.value
  if (value > 12 || value < 1) {
    return "Некорректно введена дата"
  }

  return true
}

function telValidator(input) {
  if (input.value.length !== 18) return "Неверный номер телефона"

  return true
}

function cityValidator(input) {
  if (input.value === "") return "Выберите город"

  return true
}

function agreementsValidator(input) {
  if (!input.checked) return false

  return true
}

function fileValidator(input) {
  if (!input.files[0]) {
    return "Прикрепите резюме"
  }
  if (input.files[0].size > 1048576) {
    return "Резюме должно быть меньше 1мб"
  }

  return true
}

export {
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
}
