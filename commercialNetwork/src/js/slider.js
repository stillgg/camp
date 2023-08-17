function slider(
  selector,
  params = {
    sliderIndex: 0,
    gap: 20,
    effect: "none",
  },
) {
  const defaultParams = {
    sliderIndex: params?.sliderIndex || 0,
    gap: params?.gap || 20,
    effect: params.effect || "none",
  }

  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const items = area.querySelectorAll(".slider-item")

  const track = area.querySelector(".slider-track")
  const itemWidth = items[0].clientWidth + defaultParams.gap
  const totalVisibleSlides = getTotalVisibleSlides(area)
  const percentShift = 0.2

  let indexActiveSlide = defaultParams.sliderIndex
  let positionStart = 0
  let isDrag = false
  let prev = indexActiveSlide

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  function onClickBtnRight() {
    if (indexActiveSlide < items.length - totalVisibleSlides) {
      prev = indexActiveSlide
      indexActiveSlide++
      changeSlide(indexActiveSlide)
    }
  }

  function onClickBtnLeft() {
    if (indexActiveSlide !== 0) {
      prev = indexActiveSlide
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }
  }

  function getTotalVisibleSlides(selector) {
    const sliderWidth = selector.clientWidth
    const itemWidth = items[0].clientWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function changeSlide(indexSlide) {
    if (defaultParams.effect === "none") {
      track.style.transform = `translate3d(-${indexSlide * itemWidth}px, 0px, 0px)`
    }

    if (indexSlide === 0) {
      btnPrev.classList.add("hidden")
    } else btnPrev.classList.remove("hidden")

    if (indexSlide >= items.length - totalVisibleSlides) {
      btnNext.classList.add("hidden")
    } else btnNext.classList.remove("hidden")

    let i = items.length
    items.forEach((element) => {
      element.style.zIndex = i
      i--
    })

    items[indexSlide - 1] && items[indexSlide - 1].classList.remove("prev")
    items[indexSlide] && items[indexSlide].classList.remove("next") + items[indexSlide].classList.remove("prev")

    items[prev].classList.remove("active")
    items[indexSlide].classList.add("active")

    items[indexSlide - 1] && items[indexSlide - 1].classList.add("prev")
    items[indexSlide + 1] && items[indexSlide + 1].classList.add("next")
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

    if (defaultParams.effect === "none") {
      track.style.transform = `translate3d(${move - (positionStart + indexActiveSlide * itemWidth)}px, 0px, 0px)`
    }
  }

  function onDragEnd(event) {
    if (!isDrag) return

    const positionEnd = event.touches ? event.changedTouches[0].clientX : event.clientX
    const isMoved = Math.abs(positionEnd - positionStart) > itemWidth * percentShift
    const isFirstSlide = indexActiveSlide !== 0
    const isLastSlide = indexActiveSlide !== items.length - totalVisibleSlides

    prev = indexActiveSlide

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
    prev = indexActiveSlide
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  function addEvents() {
    document.addEventListener("mouseleave", onMouseLeave)

    btnNext.addEventListener("click", onClickBtnRight)
    btnPrev.addEventListener("click", onClickBtnLeft)

    track.addEventListener("mousedown", onDragStart)
    document.addEventListener("mousemove", onDragOver)
    document.addEventListener("mouseup", onDragEnd)

    track.addEventListener("touchstart", onDragStart)
    document.addEventListener("touchmove", onDragOver)
    document.addEventListener("touchend", onDragEnd)

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
