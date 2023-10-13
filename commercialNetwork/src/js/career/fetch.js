async function sendRequest(form) {
  await wait(2000, form)
}

async function getAllVacancies(vacancies, id) {
  await wait(2000)
  vacancies.push({
    id,
    title: "ТЕРРИТОРИАЛЬНЫЙ МЕНЕДЖЕР ПО ПРОДАЖАМ ТЕРРИТОРИИ",
    subtitle: "Что мы ждём",
    desctription: `
      Опыт управления продажами в розничной торговой сети (от 15 подчиненных) от 2 лет;
      <br>
      Аналитический склад ума;
      <br>
      Ориентация на результат;
      <br>
      Готовность к постоянным командировкам (до 60% рабочего времени).`,
    wage: "Заработная плата — 80-120 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).",
  })
  return vacancies
}

function wait(ms, body = null) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(body)
    }, ms)
  })
}

export { sendRequest, getAllVacancies }
