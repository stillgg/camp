function initSlider(selector, param) {
  const slider = document.querySelector(selector)
  const btnNext = slider.querySelector(".slider-button__right")
  const btnPrev = slider.querySelector(".slider-button__left")
  const track = slider.querySelector(".slider-track")
  const items = slider.querySelectorAll(".slider-item")
  const getGap = getComputedStyle(track)
  const slides = param.removeSlides
  let text = slider.querySelectorAll(".text")
  if (!text.length) text = false

  console.log(text)
  let indexActiveSlide = 0
  let positionStart = 0
  let currentPosition = 0
  let isDrag = false
  let removeIndex = 0

  if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

  btnNext.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    const clientWidth = window.innerWidth
    const removeIndex = getRemoveSlides(selector, clientWidth, slides)

    if (Math.abs(indexActiveSlide) <= items.length - removeIndex) {
      indexActiveSlide--
      track.style.transform = shift(indexActiveSlide, zdvig)
      document.body.classList.add("animation")

      if (text) redraw("next", text, indexActiveSlide)
    }

    if (Math.abs(indexActiveSlide) === items.length - 1 - removeIndex) {
      btnNext.classList.add("hiddenBtn-right")
    }

    currentPosition = zdvig * -indexActiveSlide

    if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left")

    setTimeout(() => {
      document.body.classList.remove("animation")
    }, 300)
  })

  btnPrev.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      track.style.transform = shift(indexActiveSlide, zdvig)
      document.body.classList.add("animation")

      if (text) redraw("prev", text, indexActiveSlide)

      if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

      if (indexActiveSlide !== items.length - 1 - removeIndex) {
        btnNext.classList.remove("hiddenBtn-right")
      }
    }

    currentPosition = zdvig * -indexActiveSlide

    setTimeout(() => {
      document.body.classList.remove("animation")
    }, 300)
  })

  function onDragStart(event) {
    event.preventDefault()
    isDrag = true

    track.style.transitionDelay = "0s"

    positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX
    positionStart += currentPosition
  }

  function onDragOver(event) {
    if (!isDrag) return

    const move = event.type === "touchmove" ? event.touches[0].clientX : event.clientX

    track.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`

    track.style.transitionDuration = "0ms"
  }

  function onDragEnd(event) {
    const zdvig = shiftCalculate()
    if (!isDrag) return

    let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

    const clientWidth = window.innerWidth
    removeIndex = getRemoveSlides(selector, clientWidth, slides)

    positionEnd += currentPosition

    if (
      positionStart > positionEnd &&
      Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
      -indexActiveSlide !== items.length - 1 - removeIndex
    ) {
      if (positionStart - positionEnd - 2 * zdvig > 0 && Math.abs(indexActiveSlide) + 2 < items.length - removeIndex) {
        indexActiveSlide -= 2
        if (text) redraw("next", text, indexActiveSlide)
      } else {
        indexActiveSlide--
        if (text) redraw("next", text, indexActiveSlide)
      }

      document.body.classList.add("animation")
    }

    if (positionStart < positionEnd && positionEnd - positionStart > zdvig * 0.2 && indexActiveSlide !== 0) {
      if (Math.abs(positionStart - positionEnd) - 2 * zdvig > 0 && indexActiveSlide + 2 <= 0) {
        indexActiveSlide += 2
        if (text) redraw("prev", text, indexActiveSlide)
      } else {
        indexActiveSlide++
        if (text) redraw("prev", text, indexActiveSlide)
      }

      document.body.classList.add("animation")
    }

    setTimeout(() => {
      document.body.classList.remove("animation")
    }, 300)

    if (indexActiveSlide === 0) {
      btnPrev.classList.add("hiddenBtn-left")
    } else btnPrev.classList.remove("hiddenBtn-left")

    if (Math.abs(indexActiveSlide) === items.length - 1 - removeIndex) {
      btnNext.classList.add("hiddenBtn-right")
    } else btnNext.classList.remove("hiddenBtn-right")

    track.style.transform = shift(indexActiveSlide, zdvig)
    track.style.transitionDuration = "400ms"

    currentPosition = -(indexActiveSlide * zdvig)
    isDrag = false
  }

  document.addEventListener("mouseleave", (event) => {
    const zdvig = shiftCalculate()

    track.style.transform = `translate3d(${indexActiveSlide * zdvig}px, 0px, 0px)`
    isDrag = false
    track.style.transitionDuration = "600ms"
  })

  track.addEventListener("mousedown", onDragStart)
  document.addEventListener("mousemove", onDragOver)
  document.addEventListener("mouseup", onDragEnd)

  track.addEventListener("touchstart", onDragStart)
  document.addEventListener("touchmove", onDragOver)
  document.addEventListener("touchend", onDragEnd)

  function shift(index, shift) {
    return `translate3d(${index * shift}px, 0px, 0px)`
  }

  function shiftCalculate() {
    const itemWidth = items[0].offsetWidth
    return (shiftValue = parseInt(getGap.gap) + itemWidth)
  }

  function getRemoveSlides(selector, window, slides) {
    if (selector === "#slider-news" && window >= 768 && window <= 992) {
      return 1
    }
    return window >= 1200 ? slides : window <= 992 ? 0 : 1
  }

  function redraw(direction, text, indexActiveSlide) {
    const index = Math.abs(indexActiveSlide)

    if (direction === "next") {
      const prevValue = slider.querySelector(".text.active")
      prevValue.classList.remove("active")
      text[index].classList.add("active")
    }

    if (direction === "prev") {
      const prevValue = slider.querySelector(".text.active")
      text[index].classList.add("active")
      prevValue.classList.remove("active")
    }
  }
}

initSlider("#slider-merch", { removeSlides: 1 })

initSlider("#slider-team", { removeSlides: 1 })

initSlider("#slider-news", { removeSlides: 2 })
