import { watchedSlide } from "./scrollBar"

const sections = document.querySelectorAll("section")
const anchors = document.querySelectorAll("[data-sectionId]")

anchors.forEach((link) => {
  link.addEventListener("click", () => {
    watchedSlide.activeSlide = +link.getAttribute("data-sectionId")
    window.location.hash = `#${sections[watchedSlide.activeSlide].getAttribute("id")}`
  })
})
