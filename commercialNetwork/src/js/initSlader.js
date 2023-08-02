function initSlader(buttonNext, buttonPrev, sectionSlider, trackSlader, itemsSlader, text, slides) {
  const btnNext = document.querySelector(buttonNext)
  const btnPrev = document.querySelector(buttonPrev)
  const section = document.querySelector(sectionSlider)
  const track = document.querySelector(trackSlader)
  const items = document.querySelectorAll(itemsSlader)
  const getGap = getComputedStyle(track)
  let sliderText = false

  if (text) {
    sliderText = document.querySelectorAll(text)
  }

  let indexActiveSlide = 0
  let positionStart = 0
  let currentPosition = 0
  let isDrag = false
  let removeIndex = 0

  if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

  btnNext.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    const clientWidth = window.innerWidth
    const removeIndex = getRemoveSlides(clientWidth, slides)

    if (Math.abs(indexActiveSlide) <= items.length - removeIndex) {
      indexActiveSlide--
      track.style.transform = shift(indexActiveSlide, zdvig)
      section.classList.add("animation")

      if (sliderText) redraw("next", sliderText, indexActiveSlide)
    }

    if (Math.abs(indexActiveSlide) === items.length - 1 - removeIndex) {
      btnNext.classList.add("hiddenBtn-right")
    }

    currentPosition = zdvig * -indexActiveSlide

    if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left")

    setTimeout(() => {
      section.classList.remove("animation")
    }, 300)
  })

  btnPrev.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      track.style.transform = shift(indexActiveSlide, zdvig)
      section.classList.add("animation")

      if (sliderText) redraw("prev", sliderText, indexActiveSlide)

      if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

      if (indexActiveSlide !== items.length - 1 - removeIndex) {
        btnNext.classList.remove("hiddenBtn-right")
      }
    }

    currentPosition = zdvig * -indexActiveSlide

    setTimeout(() => {
      section.classList.remove("animation")
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
    removeIndex = getRemoveSlides(clientWidth, slides)

    positionEnd += currentPosition

    if (
      positionStart > positionEnd &&
      Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
      -indexActiveSlide !== items.length - 1 - removeIndex
    ) {
      if (positionStart - positionEnd - 2 * zdvig > 0 && Math.abs(indexActiveSlide) + 2 < items.length - removeIndex) {
        indexActiveSlide -= 2
        if (sliderText) redraw("next", sliderText, indexActiveSlide)
      } else {
        indexActiveSlide--
        if (sliderText) redraw("next", sliderText, indexActiveSlide)
      }

      section.classList.add("animation")
    }

    if (positionStart < positionEnd && positionEnd - positionStart > zdvig * 0.2 && indexActiveSlide !== 0) {
      if (Math.abs(positionStart - positionEnd) - 2 * zdvig > 0 && indexActiveSlide + 2 <= 0) {
        indexActiveSlide += 2
        if (sliderText) redraw("prev", sliderText, indexActiveSlide)
      } else {
        indexActiveSlide++
        if (sliderText) redraw("prev", sliderText, indexActiveSlide)
      }

      section.classList.add("animation")
    }

    setTimeout(() => {
      section.classList.remove("animation")
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

  section.addEventListener("mouseleave", (event) => {
    const zdvig = shiftCalculate()

    track.style.transform = `translate3d(${indexActiveSlide * zdvig}px, 0px, 0px)`
    isDrag = false
    track.style.transitionDuration = "600ms"
  })

  track.addEventListener("mousedown", onDragStart)
  section.addEventListener("mousemove", onDragOver)
  section.addEventListener("mouseup", onDragEnd)

  track.addEventListener("touchstart", onDragStart)
  section.addEventListener("touchmove", onDragOver)
  section.addEventListener("touchend", onDragEnd)

  function shift(index, shift) {
    return `translate3d(${index * shift}px, 0px, 0px)`
  }

  function shiftCalculate() {
    const itemWidth = items[0].offsetWidth
    return (shiftValue = parseInt(getGap.gap) + itemWidth)
  }

  function getRemoveSlides(window, slides) {
    return window >= 1200 ? slides : window <= 992 ? 0 : 1
  }

  function redraw(direction, text, indexActiveSlide) {
    const index = Math.abs(indexActiveSlide)

    if (direction === "next") {
      const prevValue = document.querySelector(".text.active")
      prevValue.classList.remove("active")
      text[index].classList.add("active")
    }

    if (direction === "prev") {
      const prevValue = document.querySelector(".text.active")
      text[index].classList.add("active")
      prevValue.classList.remove("active")
    }
  }
}

initSlader("#merch-btn-next", "#merch-btn-prev", ".merch", ".merch-slider-track", ".merch-slider-item", 0, 1)

initSlader("#news-btn-next", "#news-btn-prev", ".news", ".news-slider-track", ".news-body__item", 0, 2)

initSlader("#team-btn-next", "#team-btn-prev", ".team", ".team-slider-track", ".team__item", "#text", 1)
