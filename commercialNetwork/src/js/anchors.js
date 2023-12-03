import { setSlide, getSectionIndex } from "./scrollBar"

const sections = document.querySelectorAll("section")
const anchors = document.querySelectorAll("a[data-anchor], .header__logo")
console.log(anchors)

anchors.forEach((link) => {
  link.addEventListener("click", () => {
    setSlide(getSectionIndex(link))
  })
})

const initSectionIndex = Array.from(sections).findIndex(
  (section) => "#" + section.getAttribute("data-anchor") === window.location.hash,
)

setSlide(initSectionIndex)
