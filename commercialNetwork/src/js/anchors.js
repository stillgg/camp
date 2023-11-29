import { setSlide } from "./scrollBar"

const sections = document.querySelectorAll("section")
const anchors = document.querySelectorAll("[data-sectionId]")

anchors.forEach((link) => {
  link.addEventListener("click", () => {
    setSlide(+link.getAttribute("data-sectionId"))
  })
})

const initSectionIndex = Array.from(sections).findIndex(
  (section) => "#" + section.getAttribute("data-anchor") === window.location.hash,
)

setSlide(initSectionIndex)
