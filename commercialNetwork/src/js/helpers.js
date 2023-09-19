function isAdult(dateString) {
  if (dateString.includes("null")) return

  const currentDate = new Date()

  const dateParts = dateString.split(".")

  const day = parseInt(dateParts[0], 10)
  const month = parseInt(dateParts[1], 10) - 1
  const year = parseInt(dateParts[2], 10)

  const birthday = new Date(year, month, day)

  return Math.floor((currentDate - birthday) / (60 * 60 * 24 * 365 * 1000)) <= 18
    ? "Мы принимаем на работу только совершеннолетних сотрудников"
    : null
}

export { isAdult }
