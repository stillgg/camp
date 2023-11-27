const popup = document.querySelector(".popup__yandexMap")
const openPopup = document.querySelector(".content__map")
const closePopup = popup.querySelector(".preview__close")

openPopup.addEventListener("click", () => {
  popup.classList.add("active")
})

closePopup.addEventListener("click", () => {
  popup.classList.remove("active")
})
