const btnNext = document.querySelector("#merch-btn-next")
const btnPrev = document.querySelector("#merch-btn-prev")
const sectionMerch = document.querySelector(".merch")

const trackMerch = document.querySelector(".merch-slider-track")
const merchItems = document.querySelectorAll(".merch-slider-item")
const getGap = getComputedStyle(trackMerch)

let indexActiveSlide = 0
let positionStart = 0
let currentPosition = 0
let isDrag = false
let removeIndex = 0

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

btnNext.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  const clientWidth = window.innerWidth
  const removeIndex = getRemoveSlides(clientWidth, 1)

  if (Math.abs(indexActiveSlide) <= merchItems.length - removeIndex) {
    indexActiveSlide--
    trackMerch.style.transform = shift(indexActiveSlide, zdvig)
    sectionMerch.classList.add("animation")
  }

  if (Math.abs(indexActiveSlide) === merchItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  }

  currentPosition = zdvig * -indexActiveSlide
  if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left")

  setTimeout(() => {
    sectionMerch.classList.remove("animation")
  }, 300)
})

btnPrev.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  if (indexActiveSlide !== 0) {
    indexActiveSlide++
    trackMerch.style.transform = shift(indexActiveSlide, zdvig)
    sectionMerch.classList.add("animation")

    if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

    if (indexActiveSlide !== merchItems.length - 1 - removeIndex) {
      btnNext.classList.remove("hiddenBtn-right")
    }
  }

  currentPosition = zdvig * -indexActiveSlide

  setTimeout(() => {
    sectionMerch.classList.remove("animation")
  }, 300)
})

function shift(index, shift) {
  return `translate3d(${index * shift}px, 0px, 0px)`
}

function shiftCalculate() {
  const itemWidth = merchItems[0].offsetWidth
  return (shiftValue = parseInt(getGap.gap) + itemWidth)
}

function onDragStart(event) {
  event.preventDefault()
  isDrag = true

  trackMerch.style.transitionDelay = "0s"

  positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX

  positionStart += currentPosition
}

function onDragOver(event) {
  if (!isDrag) return

  const move = event.type === "touchmove" ? event.touches[0].clientX : event.clientX

  trackMerch.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`

  trackMerch.style.transitionDuration = "0ms"
}

function onDragEnd(event) {
  const zdvig = shiftCalculate()
  if (!isDrag) return

  let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

  const clientWidth = window.innerWidth
  removeIndex = getRemoveSlides(clientWidth, 1)

  positionEnd += currentPosition

  if (
    positionStart > positionEnd &&
    Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
    -indexActiveSlide !== merchItems.length - 1 - removeIndex
  ) {
    if (
      positionStart - positionEnd - 2 * zdvig > 0 &&
      Math.abs(indexActiveSlide) + 2 < merchItems.length - removeIndex
    ) {
      indexActiveSlide -= 2
    } else indexActiveSlide--

    sectionMerch.classList.add("animation")
  }

  if (positionStart < positionEnd && positionEnd - positionStart > zdvig * 0.2 && indexActiveSlide !== 0) {
    if (Math.abs(positionStart - positionEnd) - 2 * zdvig > 0 && indexActiveSlide + 2 <= 0) {
      indexActiveSlide += 2
    } else indexActiveSlide++

    sectionMerch.classList.add("animation")
  }

  setTimeout(() => {
    sectionMerch.classList.remove("animation")
  }, 300)

  if (indexActiveSlide === 0) {
    btnPrev.classList.add("hiddenBtn-left")
  } else btnPrev.classList.remove("hiddenBtn-left")

  if (Math.abs(indexActiveSlide) === merchItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  } else btnNext.classList.remove("hiddenBtn-right")

  trackMerch.style.transform = shift(indexActiveSlide, zdvig)
  trackMerch.style.transitionDuration = "400ms"

  currentPosition = -(indexActiveSlide * zdvig)
  isDrag = false
}

sectionMerch.addEventListener("mouseleave", (event) => {
  const zdvig = shiftCalculate()

  trackMerch.style.transform = `translate3d(${indexActiveSlide * zdvig}px, 0px, 0px)`
  isDrag = false
  trackMerch.style.transitionDuration = "600ms"
})

trackMerch.addEventListener("mousedown", onDragStart)
sectionMerch.addEventListener("mousemove", onDragOver)
sectionMerch.addEventListener("mouseup", onDragEnd)

trackMerch.addEventListener("touchstart", onDragStart)
sectionMerch.addEventListener("touchmove", onDragOver)
sectionMerch.addEventListener("touchend", onDragEnd)

function getRemoveSlides(window, slides) {
  return window >= 1200 ? slides : window <= 992 ? 0 : 1
}
