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
import { sendRequest, requestURL } from "./fetch"

const form = document.querySelector("#form")

const btnSubmit = form.querySelector("#submit")
const buttons = document.querySelectorAll(".main__block")
const successPopup = document.querySelector(".popup__form")
const closeSuccessPopup = document.querySelector("#success-popup-form")
const career__popup = document.querySelector(".career__popup")
const inputs = form.querySelectorAll("input")
const closeBtn = document.querySelector("#close-popup")
const select = form.querySelector("#city")
const fileConainer = form.querySelector("#fileContainer")
const section = document.querySelector('.career')
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

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (btnSubmit.classList.contains("disabled")) return
  v.validateAll()

  if (!v.isError) {
    const btnText = btnSubmit.textContent
    const myForm = new FormData(form)

    btnSubmit.innerHTML = `<span class='loader'></span>`
    const loader = form.querySelector(".loader")

    loader.classList.add("active")


    await fetch('https://localhost:3000/articles',{
      method:'POST',
      body:myForm
    })
    
    setTimeout(() => {
      successPopup.classList.add("active")
      loader.classList.add("active")
      btnSubmit.textContent = btnText
      career__popup.classList.add("blur")
      section.classList.add("blur")
    }, 2000)
  }
  // sendRequest("POST", requestURL).then((data) => console.log(data))
})

closeSuccessPopup.addEventListener("click", (e) => {
  if (!e.target) return

  successPopup.classList.remove("active")
  career__popup.classList.remove("blur")
  section.classList.remove("blur")

  inputs.forEach((input) => {
    input.value = ""
  })

  select.value = ""
  fileConainer.childNodes[0].remove()
})

closeBtn.addEventListener("click", () => {
  career__popup.classList.remove("active")
})

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const workName = button.querySelector(".content__title").textContent

    addDescritionWork(workName)

    career__popup.classList.add("active")
  })
})

function addDescritionWork(workName) {
  const description = document.querySelector(".preview__text")
  const inputJob = form.querySelector("#job")

  inputJob.value = workName.toLowerCase()

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
    Вам от 14 лет;
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

export { v }
