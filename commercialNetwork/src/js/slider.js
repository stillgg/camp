function slider(
  selector,
  params = {
    gap: 20,
    index: 0,
  },
) {
  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const track = area.querySelector(".slider-track")
  const items = area.querySelectorAll(".slider-item")
  const getGapTrack = params.gap
  const itemWidth = items[0].clientWidth + getGapTrack
  const countActiveSlide = getTotalVisibleSlides(area)

  let indexActiveSlide = params.index
  let positionStart = 0
  let currentPosition = 0
  let isDrag = false
  let resizeTimeout

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  btnNext.addEventListener("click", () => {
    if (Math.abs(indexActiveSlide) <= items.length - countActiveSlide) {
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }

    if (Math.abs(indexActiveSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
      console.log("hidden")
    }

    currentPosition = itemWidth * -indexActiveSlide

    if (indexActiveSlide !== 0) btnPrev.classList.remove("hidden")
  })

  btnPrev.addEventListener("click", () => {
    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      changeSlide(indexActiveSlide)

      if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

      if (indexActiveSlide !== items.length - countActiveSlide) {
        btnNext.classList.remove("hidden")
      }
    }

    currentPosition = itemWidth * -indexActiveSlide
  })

  function onDragStart(event) {
    event.preventDefault()
    isDrag = true

    positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX
    positionStart += currentPosition
    track.style.transitionDuration = "0ms"
  }

  function getTotalVisibleSlides(selector) {
    const sliderWidth = selector.offsetWidth
    const itemWidth = items[0].offsetWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function onDragOver(event) {
    if (!isDrag) return

    const move = event.touches ? event.touches[0].clientX : event.clientX

    track.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`
  }

  function changeSlide(indexSlide) {
    track.style.transform = `translate3d(${indexSlide * itemWidth}px, 0px, 0px)`
  }

  function flippButtons(indexSlide) {
    if (indexSlide === 0) {
      btnPrev.classList.add("hidden")
    } else btnPrev.classList.remove("hidden")

    if (Math.abs(indexSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
    } else btnNext.classList.remove("hidden")
  }

  function onDragEnd(event) {
    if (!isDrag) return

    let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

    positionEnd += currentPosition

    const percentShift = 0.2
    const isMoved = positionEnd - positionStart > itemWidth * percentShift
    const isFirstSlide = indexActiveSlide !== 0

    if (
      positionStart > positionEnd &&
      Math.abs(positionEnd - positionStart) > itemWidth * percentShift &&
      Math.abs(indexActiveSlide) !== items.length - countActiveSlide
    ) {
      indexActiveSlide--
    }

    if (positionStart < positionEnd && isMoved && isFirstSlide) {
      indexActiveSlide++
    }

    flippButtons(indexActiveSlide)
    changeSlide(indexActiveSlide)

    track.style.transitionDuration = "400ms"

    currentPosition = -(indexActiveSlide * itemWidth)
    isDrag = false
  }

  function checkExit() {
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  function clearSlider() {
    window.removeEventListener("resize", debounceResize)
    document.removeEventListener("mouseleave", checkExit)

    track.removeEventListener("mousedown", onDragStart)
    document.removeEventListener("mousemove", onDragOver)
    document.removeEventListener("mouseup", onDragEnd)

    track.removeEventListener("touchstart", onDragStart)
    document.removeEventListener("touchmove", onDragOver)
    document.removeEventListener("touchend", onDragEnd)
  }

  function callSlider() {
    slider(selector, (params.index = indexActiveSlide))
  }

  function updateSlider() {
    clearSlider()
    callSlider()
  }

  function debounceResize() {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(updateSlider, 200)
  }

  window.addEventListener("resize", debounceResize)

  document.addEventListener("mouseleave", checkExit)

  track.addEventListener("mousedown", onDragStart)
  document.addEventListener("mousemove", onDragOver)
  document.addEventListener("mouseup", onDragEnd)

  track.addEventListener("touchstart", onDragStart)
  document.addEventListener("touchmove", onDragOver)
  document.addEventListener("touchend", onDragEnd)
}

slider("#slider-merch")

// slider("#slider-team")

// slider("#slider-news")
