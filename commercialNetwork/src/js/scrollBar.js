import { infoSlides, countAnimation, resetAnimation } from "./countAnimation"
const app = document.querySelector(".app")
const sections = document.querySelectorAll("section")
const indicator = document.querySelector("#indicator")
const indicatorLines = indicator.querySelectorAll(".sections__wrapper")
const counter = document.querySelector(".number__current")
const main = document.querySelector(".main")
const header = document.querySelector(".header")
const headerLinks = document.querySelectorAll(".nav__link")

let isStart = false
let timer = null
let timeoutId
let clientY1

const watchedSlide = new Proxy(
  {
    activeSlide: 0,
  },
  onSlideChange(),
)

const setSlide = (slideIndex) => {
  watchedSlide.activeSlide = slideIndex
}

function initSectionsHeight() {
  const height = document.documentElement.clientHeight
  main.style.height = height + "px"

  sections.forEach((section) => {
    section.style.height = height + "px"
  })
}

function onSlideChange() {
  return {
    set(target, property, slideIndex) {
      if (slideIndex < 0 || slideIndex > 11) {
        return true
      }

      const sectionHeight = document.documentElement.clientHeight

      counter.innerText = slideIndex + 1

      main.style.transform = `translateY(${-(sectionHeight * slideIndex)}px)`

      sections.forEach((section) => section.classList.remove("active"))
      indicatorLines.forEach((line) => line.classList.remove("active"))
      indicator.classList.remove("black")
      header.classList.remove("black")

      sections[slideIndex].classList.add("active")
      indicatorLines[slideIndex].classList.add("active")
      window.location.hash = `#${sections[slideIndex].getAttribute("data-anchor")}`

      infoSlides.find((slide) => {
        if (slide.slideIndex === slideIndex) {
          countAnimation(true, slide)
          resetAnimation(slide.elements)
        }
      })

      if (sections[slideIndex].getAttribute("data-section-theme") === "dark") {
        indicator.classList.add("black")
        header.classList.add("black")
      }

      activeLink(slideIndex)

      return Reflect.set(target, property, slideIndex)
    },
  }
}

indicatorLines.forEach((line, index) =>
  line.addEventListener("click", (e) => {
    e.stopPropagation()
    setSlide(index)
  }),
)

function delay() {
  timer = setTimeout(() => {
    clearTimeout(timer)
    timer = null
  }, 500)
}

function onWheel(e) {
  clearTimeout(timeoutId)

  const scrollAmountY = e.deltaY

  const isScrollDown = scrollAmountY > 25
  const isScrollUp = scrollAmountY < -25

  if (isStart === false && timer === null) {
    if (isScrollDown) {
      isStart = true
      watchedSlide.activeSlide++

      delay()
    }

    if (isScrollUp) {
      isStart = true
      watchedSlide.activeSlide--

      delay()
    }
  }

  if (isStart) {
    timeoutId = setTimeout(function () {
      isStart = false
    }, 25)
  }
}

function onDragStart(e) {
  clientY1 = e.touches ? e.touches[0].clientY : e.clientY
}

function onDragEnd(e) {
  const clientY2 = e.changedTouches ? e.changedTouches[0].clientY : e.clientY
  const diff = clientY1 - clientY2

  if (diff < -100) {
    watchedSlide.activeSlide--
  }
  if (diff > 100) {
    watchedSlide.activeSlide++
  }
}

function activeLink(slideIndex) {
  headerLinks.forEach((link) => {
    link.classList.remove("active")

    if (+link.dataset.sectionid === slideIndex) link.classList.add("active")
  })
}

initSectionsHeight()

main.addEventListener("wheel", onWheel)
main.addEventListener("touchstart", onDragStart)
main.addEventListener("touchend", onDragEnd)

main.addEventListener("mousedown", onDragStart)
main.addEventListener("mouseup", onDragEnd)

window.addEventListener("resize", initSectionsHeight)

export { setSlide }
