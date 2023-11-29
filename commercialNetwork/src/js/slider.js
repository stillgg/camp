function slider(
  selector,
  params = {
    sliderIndex: 0,
    gap: 20,
    effect: "default",
    onClick: () => null,
  },
) {
  const defaultParams = {
    sliderIndex: params?.sliderIndex || 0,
    gap: params?.gap || 20,
    effect: params?.effect || "default",
    onClick: params?.onClick,
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
  let isCaptured = false

  function onClickBtnRight() {
    changeSlide(++indexActiveSlide)
  }

  function onClickBtnLeft() {
    changeSlide(--indexActiveSlide)
  }

  function getTotalVisibleSlides(selector) {
    const sliderWidth = selector.clientWidth
    const itemWidth = items[0].clientWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function toggleButtons(indexSlide) {
    indexSlide === 0 ? btnPrev.classList.add("hidden") : btnPrev.classList.remove("hidden")

    indexSlide >= items.length - totalVisibleSlides
      ? btnNext.classList.add("hidden")
      : btnNext.classList.remove("hidden")
  }

  function defaultEffect(indexSlide) {
    track.style.transitionDuration = "300ms"
    track.style.transform = `translate3d(-${indexSlide * itemWidth}px, 0px, 0px)`
  }

  function cardsEffect(indexSlide) {
    items.forEach((element, index) => {
      element.style.zIndex = items.length - index

      element.style.transform = "scale(0.7)"

      element.style.transition = "right 0.5s ease-in-out, transform 0.5s ease-in-out"

      index > indexSlide ? (element.style.transform = "scale(0.7)") : (element.style.transform = "scale(1)")
      index > indexSlide ? (element.style.right = "-28.57%") : (element.style.right = "100%")
    })

    items[indexSlide].style.right = 0
  }

  function changeSlide(indexSlide) {
    if (indexSlide < 0 || indexSlide > items.length - totalVisibleSlides) return

    switch (defaultParams.effect) {
      case "default":
        defaultEffect(indexSlide)
        break

      case "cards":
        cardsEffect(indexSlide)
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
    isCaptured = false

    positionStart = event.touches ? event.touches[0].clientX : event.clientX

    track.style.transitionDuration = "0ms"
  }

  function onDragOver(event) {
    if (!isDrag) return

    isCaptured = true

    const move = event.touches ? event.touches[0].clientX : event.clientX

    track.style.transform = `translate3d(${move - (positionStart + indexActiveSlide * itemWidth)}px, 0px, 0px)`
  }

  function onDragEnd(event) {
    if (!isDrag) return
    isDrag = false

    const positionEnd = event.touches ? event.changedTouches[0].clientX : event.clientX
    const isMoved = Math.abs(positionEnd - positionStart) > itemWidth * shiftRatio
    const isFirstSlide = indexActiveSlide === 0
    const isLastSlide = indexActiveSlide === items.length - totalVisibleSlides

    if (positionStart > positionEnd && isMoved && !isLastSlide) {
      return changeSlide(++indexActiveSlide)
    }

    if (positionStart < positionEnd && isMoved && !isFirstSlide) {
      return changeSlide(--indexActiveSlide)
    }

    changeSlide(indexActiveSlide)
  }

  function onMouseLeave() {
    isDrag = false
    changeSlide(indexActiveSlide)
  }

  function addEvents() {
    document.addEventListener("mouseleave", onMouseLeave)

    btnNext.addEventListener("click", onClickBtnRight)
    btnPrev.addEventListener("click", onClickBtnLeft)

    if (defaultParams.effect === "default") {
      track.addEventListener("mousedown", onDragStart)
      document.addEventListener("mousemove", onDragOver)
      document.addEventListener("mouseup", onDragEnd)

      track.addEventListener("touchstart", onDragStart, {
        passive: true,
      })
      document.addEventListener("touchmove", onDragOver)
      document.addEventListener("touchend", onDragEnd)

      track.addEventListener("click", onTrackClick)
    }

    window.addEventListener("resize", onResize)
  }

  function onTrackClick(event) {
    const onClick = params.onClick

    if (typeof onClick === "function" && isCaptured === false) {
      onClick(event)
    }

    isCaptured = false
  }

  function removeEvents() {
    window.removeEventListener("resize", onResize)
    document.removeEventListener("mouseleave", onMouseLeave)

    track.removeEventListener("mousedown", onDragStart)
    document.removeEventListener("mousemove", onDragOver)
    document.removeEventListener("mouseup", onDragEnd)

    track.removeEventListener("touchstart", onDragStart)
    document.removeEventListener("touchmove", onDragOver)
    document.removeEventListener("touchend", onDragEnd)

    btnNext.removeEventListener("click", onClickBtnRight)
    btnPrev.removeEventListener("click", onClickBtnLeft)
    track.removeEventListener("click", onTrackClick)
  }

  function onResize() {
    removeEvents()

    slider(selector, { ...defaultParams, sliderIndex: indexActiveSlide })
  }

  changeSlide(indexActiveSlide)
  addEvents()
}

export { slider }
