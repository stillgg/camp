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
import { sendRequest, sendRequestWork } from "./fetch"

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
const vacancyContainer = document.querySelector(".main__container")
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

function addDescritionWork(workName) {
  const description = document.querySelector(".preview__text")
  const inputJob = form.querySelector("#job")

  if (workName === "ТЕРРИТОРИАЛЬНЫЙ МЕНЕДЖЕР ПО ПРОДАЖАМ ТЕРРИТОРИИ СИБИРЬ") {
    inputJob.value = workName.slice(0, 47).toLowerCase()
  } else {
    inputJob.value = workName.toLowerCase()
  }

  switch (workName) {
    case "ПОЛЕВОЙ ТРЕНЕР ПО ПРЯМЫМ ПРОДАЖАМ":
      descriptionTrainer(description, workName)
      break

    case "ПРОМОУТЕР":
      descriptionPromoter(description, workName)
      break

    case "МЕНЕДЖЕР ПО РАЗВИТИЮ":
      descriptionManager(description, workName)
      break

    case "СУПЕРВАЙЗЕР":
      descriptionSupervaiser(description, workName)
      break
    case "ТЕРРИТОРИАЛЬНЫЙ МЕНЕДЖЕР ПО ПРОДАЖАМ ТЕРРИТОРИИ СИБИРЬ":
      descriptionTerritoryManager(description, workName)
      break
  }
}

function descriptionTrainer(description, workName) {
  description.innerHTML = `<h2 class="text__title">${workName}</h2>
  <span class="text__requirements">Что мы ждём:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Опыт работы в активных продажах обязателен;
    </p>
    <p class="description__paragraph">Опыт обучения персонала розничных торговых сетей от 2 лет;</p>
    <p class="description__paragraph">Опыт разработки и внедрения скриптов;</p>
    <p class="description__paragraph">Готовность к постоянным командировкам (до 90% рабочего времени);</p>
    <p class="description__paragraph">Водительские права категории B — желательно, но не обязательно.</p>
  </div>
  <span class="text__requirements">Что мы обещаем:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Заработная плата — от 70 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).
    </p>
  </div>`
}

function descriptionPromoter(description, workName) {
  description.innerHTML = `<h2 class="text__title">${workName}</h2>
  <span class="text__requirements">Что мы ждём:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Вам от 18 лет;
    </p>
    <p class="description__paragraph">Возможно без опыта;</p>
    <p class="description__paragraph">Активность и целеустремлённость.</p>
  <span class="text__requirements">Что мы обещаем:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Заработная плата 15 000 - 70 000 ₽ (в зависимости от занятости).
    </p>
  </div>`
}

function descriptionManager(description, workName) {
  description.innerHTML = `<h2 class="text__title">${workName}</h2>
  <span class="text__requirements">Что мы ждём:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Опыт работы в сфере развития розничного ритейла обязателен;
    </p>
    <p class="description__paragraph">Опыт заключения арендных договоров с торговыми центрами, магазинами, гипермаркетами;</p>
    <p class="description__paragraph">Опыт ведения переговоров с ЛПР;</p>
    <p class="description__paragraph">Готовность к постоянным командировкам (до 90% рабочего времени);</p>
    <p class="description__paragraph">Водительские права категории B — желательно, но не обязательно.</p>
  </div>
  <span class="text__requirements">Что мы обещаем:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Заработная плата — от 70 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).
    </p>
  </div>`
}

function descriptionTerritoryManager(description, workName) {
  description.innerHTML = `<h2 class="text__title">${workName}</h2>
  <span class="text__requirements">Что мы ждём:</span>
  <div class="requirements__description">
    <p class="description__paragraph">Опыт управления продажами в розничной торговой сети (от 15 подчиненных) от 2 лет;</p>
    <p class="description__paragraph">Опыт подбора и адаптации торгового персонала;</p>
    <p class="description__paragraph">Аналитический склад ума;</p>
    <p class="description__paragraph">Ориентация на результат;</p>
    <p class="description__paragraph">Готовность к постоянным командировкам (до 60% рабочего времени).</p>
  </div>
  <span class="text__requirements">Что мы обещаем:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Заработная плата — 80-120 000 ₽ + компенсационный пакет (командировки, суточные и т.д.).
    </p>
  </div>`
}

function descriptionSupervaiser(description, workName) {
  description.innerHTML = `<h2 class="text__title">${workName}</h2>
  <span class="text__requirements">Что мы ждём:</span>
  <div class="requirements__description">
    <p class="description__paragraph">Вам от 18 до 30 лет;</p>
    <p class="description__paragraph">Опыт активных продаж от 1 года;</p>
    <p class="description__paragraph">Водительские права категории B — желательно, но не обязательно;</p>
    <p class="description__paragraph">Готовность к релокации.</p>
  </div>
  <span class="text__requirements">Что мы обещаем:</span>
  <div class="requirements__description">
    <p class="description__paragraph">
    Заработная плата 40 000 - 200 000 ₽ + оплата жилья (в зависимости от объёма контролируемой сети).
    </p>
  </div>`
}

function showVacancies() {
  vacancyContainer.classList.add("succsess")
  mainBtn.firstElementChild.textContent = "Показать больше вакансий"

  hideBtn()
}

function hideBtn() {
  mainBtn.classList.add("hide")
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (btnSubmit.classList.contains("disabled")) return
  v.validateAll()

  if (!v.isError) {
    const formData = new FormData()
    formData.append(
      "data",
      JSON.stringify({
        job: "",
        email: "",
      }),
    )

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

    await sendRequestWork()

    showVacancies()
  } catch (error) {
    mainBtn.firstElementChild.textContent = "Произошла ошибка"
  } finally {
    setLoading(false, mainBtn)
  }
})

careerMain.addEventListener("click", (e) => {
  const target = e.target.closest(".main__block")

  if (target) {
    const workName = target.querySelector(".content__title").textContent

    addDescritionWork(workName)

    career__popup.classList.add("active")
  }
})
export { v }
