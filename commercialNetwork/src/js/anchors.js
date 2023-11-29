import { setSlide } from "./scrollBar"

const sections = document.querySelectorAll("section")
const anchors = document.querySelectorAll("[data-sectionId]")

anchors.forEach((link) => {
  link.addEventListener("click", () => {
    console.log(true)
    setSlide(+link.getAttribute("data-sectionId"))
    // window.location.hash = `#${sections[watchedSlide.activeSlide].getAttribute("id")}`
  })
})

const initSectionIndex = Array.from(sections).findIndex(
  (section) => "#" + section.getAttribute("data-anchor") === window.location.hash,
)

setSlide(initSectionIndex)
