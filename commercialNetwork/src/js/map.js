const marks = document.querySelectorAll(".mark")
const bcgMap = document.querySelector(".background-map-wrapper")
const mapPopup = document.querySelector(".map__popup-wrapper")
const mapClose = document.querySelector(".map__popup-close")
const arrows = document.querySelector('.arrows')

marks.forEach((mark) => {
  mark.addEventListener("click", () => {
    deleteClasses()
    mark.parentNode.classList.add("animation-play")
  })
})

function deleteClasses() {
  marks.forEach((mark) => {
    mark.parentNode.classList.remove("animation-play")
  })
}





bcgMap.addEventListener("click", () => {
  mapPopup.classList.add("active")
})

mapClose.addEventListener("click", () => {
  mapPopup.classList.remove("active")
})

