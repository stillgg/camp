import { Validation } from "../validation"
import {
  jobValidator,
  nationalityValidator,
  fioValidator,
  emailValidator,
  daysValidator,
  yearsValidator,
  monthValidator,
  telValidator,
  cityValidator,
  agreementsValidator,
  fileValidator,
} from "../validation/validators"
import "./events"
import "./fillCity"
import "./fetch"
import { sendRequest, getAllVacancies } from "./fetch"

const form = document.querySelector("#form")

const btnSubmit = form.querySelector("#submit")
const successPopup = document.querySelector(".popup__form")
const closeSuccessPopup = document.querySelector("#success-popup-form")
const career__popup = document.querySelector(".career__popup")
const inputs = form.querySelectorAll("input")
const closeBtn = document.querySelector("#close-popup")
const select = form.querySelector("#city")
const fileConainer = form.querySelector("#fileContainer")
const blurBlock = document.querySelector(".popup__blur")
const mainBtn = document.querySelector(".main__btn")
const careerMain = document.querySelector(".career__main")

const schema = {
  agreements: agreementsValidator,
  city: cityValidator,
  tel: telValidator,
  months: monthValidator,
  years: yearsValidator,
  days: daysValidator,
  email: emailValidator,
  fio: fioValidator,
  nationality: nationalityValidator,
  job: jobValidator,
  file: fileValidator,
}

const v = new Validation(schema, {
  onChange(element) {
    const isFormError = v.isError
    if (isFormError === false) btnSubmit.classList.remove("disabled")
    else btnSubmit.classList.add("disabled")

    checkField(element)
  },
})

const vacancies = [
  {
    id: 1,
    title: "ПОЛЕВОЙ ТРЕНЕР ПО ПРЯМЫМ ПРОДАЖАМ",
    subtitle: "Что мы ждём",
    desctription: `
    Опыт работы в активных продажах обязателен;
    <br>
    Опыт обучения персонала розничных торговых сетей от 2 лет;
    <br>
    Опыт разработки и внедрения скриптов;
    <br>
    Готовность к постоянным командировкам (до 90% рабочего времени);
    <br>
    Водительские права категории B — желательно, но не обязательно.`,
    wage: "Заработная плата — от 70 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).",
  },
  {
    id: 2,
    title: "ПРОМОУТЕР",
    subtitle: "Что мы ждём",
    desctription: `
    Вам от 18 лет;
    <br>
    Возможно без опыта;
    <br>
    Активность и целеустремлённость.`,
    wage: "Заработная плата 15 000 - 70 000 ₽ (в зависимости от занятости).",
  },
  {
    id: 3,
    title: "МЕНЕДЖЕР ПО РАЗВИТИЮ",
    subtitle: "Что мы ждём",
    desctription: `
    Опыт работы в сфере развития розничного ритейла обязателен;
    <br>
    Опыт заключения арендных договоров с торговыми центрами, магазинами, гипермаркетами;
    <br>
    Опыт ведения переговоров с ЛПР;
    <br>
    Готовность к постоянным командировкам (до 90% рабочего времени);
    <br>
    Водительские права категории B — желательно, но не обязательно.`,
    wage: "Заработная плата — от 70 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).",
  },
  {
    id: 4,
    title: "СУПЕРВАЙЗЕР",
    subtitle: "Что мы ждём",
    desctription: `
    Вам от 18 до 30 лет;
    <br>
    Опыт активных продаж от 1 года;
    <br>
    Водительские права категории B — желательно, но не обязательно;
    <br>
    Готовность к релокации.`,
    wage: "Заработная плата 40 000 - 200 000 ₽ + оплата жилья (в зависимости от объёма контролируемой сети).",
  },
]

function checkField(element) {
  const parentInputElement = element.formElement.parentNode
  const errorElement = element.errorMessageElement

  parentInputElement.classList.remove("invalid")

  if (errorElement !== null) {
    errorElement.textContent = element.message || ""
  }

  if (element.isError === true) {
    parentInputElement.classList.add("invalid")
  }
}

function showPopupSuccess() {
  successPopup.querySelector(".container__text").textContent = "Форма отправлена"
  showPopup()
}

function showPopupError() {
  successPopup.querySelector(".container__text").textContent = "Произошла ошибка"
  showPopup()
}

function showPopup() {
  successPopup.classList.add("active")
  blurBlock.classList.add("blur")
}

function closePopupForm() {
  career__popup.classList.remove("active")
}

function setLoading(isLoading, element) {
  if (isLoading === true) element.classList.add("loading")
  else element.classList.remove("loading")
}

function addDescritionWork(id) {
  for (const vacancy of vacancies) {
    if (vacancy.id === +id) {
      document.querySelector(".preview__text").innerHTML = `<h2 class="text__title">${vacancy.title}</h2>
      <span class="text__requirements">${vacancy.subtitle}:</span>
      <div class="requirements__description">
        <p class="description__paragraph">${vacancy.desctription}</p>
      </div>
      <span class="text__requirements">Что мы обещаем:</span>
      <div class="requirements__description">
        <p class="description__paragraph">${vacancy.wage}</p>
      </div>`

      job.value = vacancy.title.toLowerCase()
      break
    }
  }
}

function createElement() {
  const newElement = document.createElement("div")
  newElement.classList.add("main__block")
  newElement.setAttribute("id", Object.keys(vacancies).length)

  careerMain.insertBefore(newElement, mainBtn)
  newElement.innerHTML = `
        <div class="main__body">
          <div class="block__content">
            <h3 class="content__title">ТЕРРИТОРИАЛЬНЫЙ МЕНЕДЖЕР ПО ПРОДАЖАМ ТЕРРИТОРИИ СИБИРЬ</h3>
            <span class="content__description">Подробнее</span>
          </div>
        </div>
      `
}

function showVacancies() {
  createElement()
}

function hideBtn() {
  mainBtn.classList.add("hide")
}

function createValuesForm() {
  const valuesForm = {}

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].getAttribute("id") === "file") {
      valuesForm[file] = document.querySelector(`#${inputs[i].getAttribute("id")}`).value
      continue
    }
  }

  valuesForm.city = select.value

  return valuesForm
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (btnSubmit.classList.contains("disabled")) return
  v.validateAll()

  if (!v.isError) {
    const valuesForm = createValuesForm()

    const formData = new FormData()
    formData.append("data", JSON.stringify(valuesForm))

    formData.append("resume", document.querySelector("#file").files[0])

    try {
      setLoading(true, btnSubmit)

      await sendRequest(formData)

      showPopupSuccess()
    } catch (error) {
      showPopupError()
    } finally {
      closePopupForm()
      setLoading(false, btnSubmit)
    }
  }
})

closeSuccessPopup.addEventListener("click", (e) => {
  if (!e.target) return

  successPopup.classList.remove("active")
  blurBlock.classList.remove("blur")

  inputs.forEach((input) => {
    input.value = ""
  })

  select.value = ""
  fileConainer.childNodes[0].remove()
})

closeBtn.addEventListener("click", () => {
  career__popup.classList.remove("active")
})

mainBtn.addEventListener("click", async () => {
  try {
    setLoading(true, mainBtn)
    await getAllVacancies(vacancies, Object.keys(vacancies).length + 1)
    showVacancies()
    hideBtn()
  } catch (error) {
    mainBtn.firstElementChild.textContent = "Произошла ошибка"
  } finally {
    setLoading(false, mainBtn)
  }
})

careerMain.addEventListener("click", (e) => {
  const target = e.target.closest(".main__block")
  console.log(target)

  if (target) {
    const id = target.getAttribute("id")
    addDescritionWork(id)

    career__popup.classList.add("active")
  }
})

export { v }
