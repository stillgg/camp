const marks = document.querySelectorAll(".mark")
const bcgMap = document.querySelector('.background-map-wrapper')
const mapPopup = document.querySelector('.map__popup')
const mapClose = document.querySelector('.map__close')

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

bcgMap.addEventListener('click',()=>{
  mapPopup.classList.add('active')
})

mapClose.addEventListener('click',()=> {
  mapPopup.classList.remove('active')
})