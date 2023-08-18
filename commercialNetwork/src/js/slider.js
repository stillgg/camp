function slider(
  selector,
  params = {
    sliderIndex: 0,
    gap: 20,
    effect: "default",
  },
) {
  const defaultParams = {
    sliderIndex: params?.sliderIndex || 0,
    gap: params?.gap || 20,
    effect: params.effect || "default",
  }

  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const items = area.querySelectorAll(".slider-item")

  const track = area.querySelector(".slider-track")
  const itemWidth = items[0].clientWidth + defaultParams.gap
  const totalVisibleSlides = getTotalVisibleSlides(area)
  const shiftRatio = 0.2

  let indexActiveSlide = defaultParams.sliderIndex
  let positionStart = 0
  let isDrag = false

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  function onClickBtnRight() {
    if (indexActiveSlide < items.length - totalVisibleSlides) {
      indexActiveSlide++
      changeSlide(indexActiveSlide)
    }
  }

  function onClickBtnLeft() {
    if (indexActiveSlide !== 0) {
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }
  }

  function getTotalVisibleSlides(selector) {
    const sliderWidth = selector.clientWidth
    const itemWidth = items[0].clientWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function toggleButtons(indexSlide) {
    if (indexSlide === 0) {
      btnPrev.classList.add("hidden")
    } else btnPrev.classList.remove("hidden")

    if (indexSlide >= items.length - totalVisibleSlides) {
      btnNext.classList.add("hidden")
    } else btnNext.classList.remove("hidden")
  }

  function defaultEffect(indexSlide) {
    track.style.transform = `translate3d(-${indexSlide * itemWidth}px, 0px, 0px)`
  }

  function cardsEffect(indexSlide) {
    items.forEach((element, index) => {
      element.style.zIndex = items.length - index

      element.style.transform = "scale(0.7)"

      index > indexSlide ? (element.style.transform = "scale(0.7)") : (element.style.transform = "scale(1)")
      index > indexSlide ? (element.style.left = "45%") : (element.style.left = "-100%")
    })

    items[indexSlide].style.left = 0
  }

  function changeSlide(indexSlide) {
    switch (defaultParams.effect) {
      case "default":
        defaultEffect(indexSlide)
        break

      case "cards":
        cardsEffect(indexSlide)
        break

      default:
        break
    }

    items.forEach((element) => {
      element.classList.remove("active")
    })

    items[indexSlide].classList.add("active")

    toggleButtons(indexSlide)
  }

  function onDragStart(event) {
    event.preventDefault()
    isDrag = true

    positionStart = event.touches ? event.touches[0].clientX : event.clientX

    track.style.transitionDuration = "0ms"
  }

  function onDragOver(event) {
    if (!isDrag) return

    const move = event.touches ? event.touches[0].clientX : event.clientX

    track.style.transform = `translate3d(${move - (positionStart + indexActiveSlide * itemWidth)}px, 0px, 0px)`
  }

  function onDragEnd(event) {
    if (!isDrag) return

    const positionEnd = event.touches ? event.changedTouches[0].clientX : event.clientX
    const isMoved = Math.abs(positionEnd - positionStart) > itemWidth * shiftRatio
    const isFirstSlide = indexActiveSlide !== 0
    const isLastSlide = indexActiveSlide !== items.length - totalVisibleSlides

    if (positionStart > positionEnd && isMoved && isLastSlide) {
      indexActiveSlide++
    }

    if (positionStart < positionEnd && isMoved && isFirstSlide) {
      indexActiveSlide--
    }

    changeSlide(indexActiveSlide)

    track.style.transitionDuration = "400ms"
    isDrag = false
  }

  function onMouseLeave() {
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  function addEvents() {
    document.addEventListener("mouseleave", onMouseLeave)

    btnNext.addEventListener("click", onClickBtnRight)
    btnPrev.addEventListener("click", onClickBtnLeft)

    if (defaultParams.effect === "default") {
      track.addEventListener("mousedown", onDragStart)
      document.addEventListener("mousemove", onDragOver)
      document.addEventListener("mouseup", onDragEnd)

      track.addEventListener("touchstart", onDragStart)
      document.addEventListener("touchmove", onDragOver)
      document.addEventListener("touchend", onDragEnd)
    }

    window.addEventListener("resize", onResize)
  }

  function removeEvents() {
    window.removeEventListener("resize", onResize)
    document.removeEventListener("mouseleave", onMouseLeave)

    btnNext.removeEventListener("click", onClickBtnRight)
    btnPrev.removeEventListener("click", onClickBtnLeft)

    track.removeEventListener("mousedown", onDragStart)
    document.removeEventListener("mousemove", onDragOver)
    document.removeEventListener("mouseup", onDragEnd)

    track.removeEventListener("touchstart", onDragStart)
    document.removeEventListener("touchmove", onDragOver)
    document.removeEventListener("touchend", onDragEnd)
  }

  function onResize() {
    removeEvents()

    slider(selector, { ...defaultParams, sliderIndex: indexActiveSlide })
  }

  changeSlide(indexActiveSlide)
  addEvents()
}

export { slider }

