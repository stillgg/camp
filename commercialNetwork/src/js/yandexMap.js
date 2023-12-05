const popup = document.querySelector(".popup__yandexMap")
const openPopup = document.querySelector(".content__map")
const closePopup = popup.querySelector(".preview__close")
const yandexMap = document.querySelector(".yandexMap")
const iframe = document.querySelector(".yandexMap__iframe")

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      if (yandexMap.classList.contains("active") && iframe.dataset.src) {
        const src = iframe.dataset.src
        iframe.setAttribute("src", src)
        iframe.removeAttribute("data-src")
      }
    }
  })
})

const config = { attributes: true }

observer.observe(yandexMap, config)

openPopup.addEventListener("click", () => {
  popup.classList.add("active")
})

closePopup.addEventListener("click", () => {
  popup.classList.remove("active")
})
