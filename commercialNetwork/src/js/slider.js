function slider(selector) {
  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const track = area.querySelector(".slider-track")
  const items = area.querySelectorAll(".slider-item")
  const getGapTrack = getComputedStyle(track)
  const itemWidth = items[0].offsetWidth + parseInt(getGapTrack.gap)

  let indexActiveSlide = 0
  let positionStart = 0
  let currentPosition = 0
  let isDrag = false

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  btnNext.addEventListener("click", () => {
    const countActiveSlide = getTotalVisibleSlides(area)

    if (Math.abs(indexActiveSlide) <= items.length - countActiveSlide) {
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }

    if (Math.abs(indexActiveSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
    }

    currentPosition = itemWidth * -indexActiveSlide

    if (indexActiveSlide !== 0) btnPrev.classList.remove("hidden")
  })

  btnPrev.addEventListener("click", () => {
    const countActiveSlide = getTotalVisibleSlides(area)

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

    track.style.transitionDelay = "0s"

    positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX
    positionStart += currentPosition
  }

  function getTotalVisibleSlides(selector) {
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

  function changeSlide(indexSlide) {
    track.style.transform = `translate3d(${indexSlide * itemWidth}px, 0px, 0px)`
  }

  function flippButtons(indexSlide) {
    const countActiveSlide = getTotalVisibleSlides(area)

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

    const countActiveSlide = getTotalVisibleSlides(area)
    const procentShift = 0.2
    const isMoved = positionEnd - positionStart > itemWidth * procentShift
    const isFirstSlide = indexActiveSlide !== 0

    if (
      positionStart > positionEnd &&
      Math.abs(positionEnd - positionStart) > itemWidth * procentShift &&
      Math.abs(indexActiveSlide) !== items.length - countActiveSlide
    ) {
      if (
        positionStart - positionEnd - 2 * itemWidth > 0 &&
        Math.abs(indexActiveSlide) + 2 < items.length - countActiveSlide
      ) {
        indexActiveSlide -= 2
      } else {
        indexActiveSlide--
      }
    }

    if (positionStart < positionEnd && isMoved && isFirstSlide) {
      if (Math.abs(positionStart - positionEnd) - 2 * itemWidth > 0 && indexActiveSlide + 2 <= 0) {
        indexActiveSlide += 2
      } else {
        indexActiveSlide++
      }
    }

    flippButtons(indexActiveSlide)
    changeSlide(indexActiveSlide)

    track.style.transitionDuration = "400ms"

    currentPosition = -(indexActiveSlide * itemWidth)
    isDrag = false
  }

  function goingBeyond() {
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  // window.addEventListener("resize", () => {
  //   alert("22")
  // })
  document.addEventListener("mouseleave", goingBeyond)

  track.addEventListener("mousedown", onDragStart)
  document.addEventListener("mousemove", onDragOver)
  document.addEventListener("mouseup", onDragEnd)

  track.addEventListener("touchstart", onDragStart)
  document.addEventListener("touchmove", onDragOver)
  document.addEventListener("touchend", onDragEnd)
}

slider("#slider-merch")

slider("#slider-team")

slider("#slider-news")
