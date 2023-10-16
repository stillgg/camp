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
import "./cities"
import "./api"
import { sendForm, getVacancies } from "./api"
import { city, tel, months, years, days, email, fio, nationality, job } from "./events"
import { vacancies } from "./constants"

const form = document.querySelector("#form")

const btnSubmit = form.querySelector("#submit")
const successPopup = document.querySelector(".popup__form")
const closeSuccessPopupBtn = document.querySelector("#success-popup-form")
const career__popup = document.querySelector(".career__popup")
const closeFormPopupBtn = document.querySelector("#close-popup")
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


function setLoading(isLoading, element) {
  if (isLoading === true) element.classList.add("loading")
  else element.classList.remove("loading")
}

function renderVacancies(newVacancies) {

  for (const vacancy of newVacancies) {
    const newElement = document.createElement("div")
    newElement.classList.add("main__block")
    newElement.setAttribute("id", vacancy.id)
    careerMain.append(newElement)
    newElement.innerHTML = `
          <div class="main__body">
            <div class="block__content">
              <h3 class="content__title">${vacancy.title}</h3>
              <span class="content__description">Подробнее</span>
            </div>
          </div>
        `
  }
}

function updateFormPopup(id) {
  const currentVacancy = vacancies.find((vacancy) => vacancy.id === +id)

  career__popup.querySelector(".preview__text").innerHTML = `<h2 class="text__title">${currentVacancy.title}</h2>
    <span class="text__requirements">${currentVacancy.subtitle}:</span>
    <div class="requirements__description">
      <p class="description__paragraph">${currentVacancy.desctription}</p>
    </div>
    <span class="text__requirements">Что мы обещаем:</span>
    <div class="requirements__description">
      <p class="description__paragraph">${currentVacancy.wage}</p>
    </div>`

  job.value = currentVacancy.title.toLowerCase()
}

form.addEventListener("submit", async (e) => {
  e.preventDefault()

  v.validateAll()

  if (!v.isError) {
    const formData = new FormData()

    formData.append(
      "data",
      JSON.stringify({
        agreement: true,
        city: city.value,
        tel: tel.value,
        months: months.value,
        years: years.value,
        days: days.value,
        email: email.value,
        fio: fio.value,
        nationality: nationality.value,
        job: job.value,
      }),
    )

    formData.append("resume", document.querySelector("#file").files[0])

    try {
      setLoading(true, btnSubmit)

      await sendForm(formData)
      blurBlock.classList.add("blur")
      successPopup.classList.add("active")
    } catch (error) {
      successPopup.classList.add("active")
      successPopup.querySelector(".container__text").textContent = "Произошла ошибка"
    } finally {
      career__popup.classList.remove("active")
      setLoading(false, btnSubmit)
    }
  }
})

closeSuccessPopupBtn.addEventListener("click", (e) => {
  successPopup.classList.remove("active")
  blurBlock.classList.remove("blur")
})

closeFormPopupBtn.addEventListener("click", () => {
  career__popup.classList.remove("active")
})

mainBtn.addEventListener("click", async () => {
  try {
    setLoading(true, mainBtn)

    const newVacancies = await getVacancies(vacancies)

    vacancies.push(...newVacancies)

    renderVacancies(newVacancies)
    mainBtn.classList.add("hide")
  } catch (error) {
  } finally {
    setLoading(false, mainBtn)
  }
})

careerMain.addEventListener("click", (e) => {
  const target = e.target.closest(".main__block")

  if (target) {
    const id = target.getAttribute("id")
    updateFormPopup(id)

    career__popup.classList.add("active")
  }
})

export { v }
