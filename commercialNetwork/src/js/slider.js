function slider(selector) {
  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const track = area.querySelector(".slider-track")
  const items = area.querySelectorAll(".slider-item")
  const getGapTrack = getComputedStyle(track)

  let text = area.querySelectorAll(".text")
  if (!text.length) text = false

  let indexActiveSlide = 0
  let positionStart = 0
  let currentPosition = 0
  let isDrag = false

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  btnNext.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    const countActiveSlide = activeSlides(area)

    if (Math.abs(indexActiveSlide) <= items.length - countActiveSlide) {
      indexActiveSlide--
      track.style.transform = shift(indexActiveSlide, zdvig)
      document.body.classList.add("animation")

      if (text) redraw("next", text, indexActiveSlide)
    }

    if (Math.abs(indexActiveSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
    }

    currentPosition = zdvig * -indexActiveSlide

    if (indexActiveSlide !== 0) btnPrev.classList.remove("hidden")

    setTimeout(() => {
      document.body.classList.remove("animation")
    }, 300)
  })

  btnPrev.addEventListener("click", () => {
    const zdvig = shiftCalculate()
    const countActiveSlide = activeSlides(area)

    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      track.style.transform = shift(indexActiveSlide, zdvig)
      document.body.classList.add("animation")

      if (text) redraw("prev", text, indexActiveSlide)

      if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

      if (indexActiveSlide !== items.length - countActiveSlide) {
        btnNext.classList.remove("hidden")
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

  function activeSlides(selector) {
    const sliderWidth = selector.offsetWidth
    const itemWidth = items[0].offsetWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function onDragOver(event) {
    if (!isDrag) return

    const move = event.type === "touchmove" ? event.touches[0].clientX : event.clientX

    track.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`

    track.style.transitionDuration = "0ms"
  }

  function flippingButtons(indexSlide) {
    const countActiveSlide = activeSlides(area)

    if (indexSlide === 0) {
      btnPrev.classList.add("hidden")
    } else btnPrev.classList.remove("hidden")

    if (Math.abs(indexSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
    } else btnNext.classList.remove("hidden")
  }

  function onDragEnd(event) {
    if (!isDrag) return

    const zdvig = shiftCalculate()
    const countActiveSlide = activeSlides(area)

    let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

    positionEnd += currentPosition

    if (
      positionStart > positionEnd &&
      Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
      -indexActiveSlide !== items.length - countActiveSlide
    ) {
      if (
        positionStart - positionEnd - 2 * zdvig > 0 &&
        Math.abs(indexActiveSlide) + 2 < items.length - countActiveSlide
      ) {
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

    flippingButtons(indexActiveSlide)

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
    return (shiftValue = parseInt(getGapTrack.gap) + itemWidth)
  }

  function redraw(direction, text, indexActiveSlide) {
    const index = Math.abs(indexActiveSlide)

    if (direction === "next") {
      const prevValue = area.querySelector(".text.active")
      prevValue.classList.remove("active")
      text[index].classList.add("active")
    }

    if (direction === "prev") {
      const prevValue = area.querySelector(".text.active")
      text[index].classList.add("active")
      prevValue.classList.remove("active")
    }
  }
}

slider("#slider-merch")

slider("#slider-team")

slider("#slider-news")
