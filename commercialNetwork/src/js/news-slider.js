const btnNext = document.querySelector("#news-btn-next")
const btnPrev = document.querySelector("#news-btn-prev")
const sectionNews = document.querySelector(".news")

const trackNews = document.querySelector(".news-slider-track")
const newsItems = document.querySelectorAll(".news-body__item")
const getGap = getComputedStyle(trackNews)

let indexActiveSlide = 0
let positionStart = 0
let currentPosition = 0
let isDrag = false
let removeIndex = 0

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

btnNext.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  const clientWidth = window.innerWidth
  const removeIndex = getRemoveSlides(clientWidth, 2)

  if (Math.abs(indexActiveSlide) <= newsItems.length - removeIndex) {
    indexActiveSlide--
    trackNews.style.transform = shift(indexActiveSlide, zdvig)
    sectionNews.classList.add("animation")
  }

  if (Math.abs(indexActiveSlide) === newsItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  }

  currentPosition = zdvig * -indexActiveSlide

  if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left")
  setTimeout(() => {
    sectionNews.classList.remove("animation")
  }, 300)
})

btnPrev.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  if (indexActiveSlide !== 0) {
    indexActiveSlide++
    trackNews.style.transform = shift(indexActiveSlide, zdvig)
    sectionNews.classList.add("animation")

    if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

    if (indexActiveSlide !== newsItems.length - 1 - removeIndex) {
      btnNext.classList.remove("hiddenBtn-right")
    }
  }

  currentPosition = zdvig * -indexActiveSlide

  setTimeout(() => {
    sectionNews.classList.remove("animation")
  }, 300)
})

function shift(index, shift) {
  return `translate3d(${index * shift}px, 0px, 0px)`
}

function shiftCalculate() {
  const itemWidth = newsItems[0].offsetWidth
  return (shiftValue = parseInt(getGap.gap) + itemWidth)
}

function onDragStart(event) {
  event.preventDefault()

  isDrag = true

  trackNews.style.transitionDelay = "0s"

  positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX

  positionStart += currentPosition
}

function onDragOver(event) {
  if (!isDrag) return

  const move = event.type === "touchmove" ? event.touches[0].clientX : event.clientX

  trackNews.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`

  trackNews.style.transitionDuration = "0ms"
}

function onDragEnd(event) {
  const zdvig = shiftCalculate()

  if (!isDrag) return
  let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

  const clientWidth = window.innerWidth
  removeIndex = getRemoveSlides(clientWidth, 2)

  positionEnd += currentPosition

  if (
    positionStart > positionEnd &&
    Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
    -indexActiveSlide !== newsItems.length - 1 - removeIndex
  ) {
    if (positionStart - positionEnd - 2 * zdvig > 0 && -indexActiveSlide + 2 <= newsItems.length - 1 - removeIndex) {
      indexActiveSlide -= 2
    } else indexActiveSlide--

    sectionNews.classList.add("animation")
  }

  if (positionStart < positionEnd && positionEnd - positionStart > zdvig * 0.2 && indexActiveSlide !== 0) {
    if (Math.abs(positionStart - positionEnd) - 2 * zdvig > 0 && indexActiveSlide + 2 < 0) {
      indexActiveSlide += 2
    } else indexActiveSlide++

    sectionNews.classList.add("animation")
  }

  setTimeout(() => {
    sectionNews.classList.remove("animation")
  }, 300)

  if (indexActiveSlide === 0) {
    btnPrev.classList.add("hiddenBtn-left")
  } else btnPrev.classList.remove("hiddenBtn-left")

  if (Math.abs(indexActiveSlide) === newsItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  } else btnNext.classList.remove("hiddenBtn-right")

  trackNews.style.transform = shift(indexActiveSlide, zdvig)
  trackNews.style.transitionDuration = "400ms"

  currentPosition = -(indexActiveSlide * zdvig)
  isDrag = false
}

sectionNews.addEventListener("mouseleave", (event) => {
  const zdvig = shiftCalculate()

  trackNews.style.transform = `translate3d(${indexActiveSlide * zdvig}px, 0px, 0px)`
  isDrag = false
  trackNews.style.transitionDuration = "600ms"
})

trackNews.addEventListener("mousedown", onDragStart)
sectionNews.addEventListener("mousemove", onDragOver)
sectionNews.addEventListener("mouseup", onDragEnd)

trackNews.addEventListener("touchstart", onDragStart)
sectionNews.addEventListener("touchmove", onDragOver)
sectionNews.addEventListener("touchend", onDragEnd)

function getRemoveSlides(window, slides) {
  return window >= 1200 ? slides : window <= 768 ? 0 : 1
}
