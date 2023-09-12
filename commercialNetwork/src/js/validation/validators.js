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

  return false
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

  return false
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

  return false
}

function emailValidator(input) {
  const EMAIL_REGEXP =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
  if (!EMAIL_REGEXP.test(input.value)) return "Неверно введен email"

  return false
}

function daysValidator(input) {
  if (+input.value > 31 || +input.value < 1) {
    return "Некорректно введена дата"
  }

  if (+input.value <= 9 && input.value.length <= 1) {
    input.value = "0" + input.value
  }

  return false
}

function yearsValidator(input) {
  const value = +input.value

  if (value > 2023 || value < 1950) {
    return "Некорректно введена дата"
  }

  if (value > 2005) {
    return "Мы принимаем на работу только совершеннолетних сотрудников"
  }

  return false
}

function monthValidator(input) {
  const value = +input.value
  if (value > 12 || value < 1) {
    return "Некорректно введена дата"
  }

  if (value <= 9 && input.value.length <= 1) {
    input.value = "0" + input.value
  }

  return false
}

function telValidator(input) {
  if (input.value.length !== 18) return "Неверный номер телефона"

  return false
}

function cityValidator(input) {
  if (input.value === "") return "Выберите город"

  return false
}

function agreementsValidator(input) {
  if (!input.checked) return true

  return false
}

function fileValidator(input) {
  if (!input.files[0]) {
    return "Прикрепите резюме"
  }
  if (input.files[0].size > 1048576) {
    return "Резюме должно быть меньше 1мб"
  }

  return false
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
