function slider(
  selector,
  params = {
    sliderIndex: 0,
    gap: 20,
  },
) {
  console.log("параметры", params.sliderIndex)

  const defaultParams = {
    sliderIndex: params?.sliderIndex || 0,
    gap: params?.gap || 20,
  }

  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const track = area.querySelector(".slider-track")
  const items = area.querySelectorAll(".slider-item")
  const itemWidth = items[0].clientWidth + defaultParams.gap
  const countActiveSlide = getTotalVisibleSlides(area)
  const percentShift = 0.2

  let indexActiveSlide = defaultParams.sliderIndex
  let positionStart = 0
  let isDrag = false

  console.log("присвоение", indexActiveSlide)

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  function onClickBtnRight() {
    if (Math.abs(indexActiveSlide) <= items.length - countActiveSlide) {
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }
    console.log("клик право", indexActiveSlide)
  }

  function onClickBtnLeft() {
    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      changeSlide(indexActiveSlide)
    }
    console.log("клик лево", indexActiveSlide)
  }

  function getTotalVisibleSlides(selector) {
    const sliderWidth = selector.clientWidth
    const itemWidth = items[0].clientWidth
    return Math.floor(sliderWidth / itemWidth)
  }

  function changeSlide(indexSlide) {
    track.style.transform = `translate3d(${indexSlide * itemWidth}px, 0px, 0px)`

    if (indexSlide === 0) {
      btnPrev.classList.add("hidden")
    } else btnPrev.classList.remove("hidden")

    if (Math.abs(indexSlide) === items.length - countActiveSlide) {
      btnNext.classList.add("hidden")
    } else btnNext.classList.remove("hidden")
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

    track.style.transform = `translate3d(${move - (positionStart - indexActiveSlide * itemWidth)}px, 0px, 0px)`
  }

  function onDragEnd(event) {
    if (!isDrag) return

    const positionEnd = event.touches ? event.changedTouches[0].clientX : event.clientX
    const isMoved = Math.abs(positionEnd - positionStart) > itemWidth * percentShift
    const isFirstSlide = indexActiveSlide !== 0
    const isLastSlide = Math.abs(indexActiveSlide) !== items.length - countActiveSlide

    if (positionStart > positionEnd && isMoved && isLastSlide) {
      indexActiveSlide--
    }

    if (positionStart < positionEnd && isMoved && isFirstSlide) {
      indexActiveSlide++
    }

    changeSlide(indexActiveSlide)

    console.log("драг", indexActiveSlide)

    track.style.transitionDuration = "400ms"
    isDrag = false
  }

  function onMouseLeave() {
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  function recalculationActiveSlide(indexActiveSlide) {
    const isLastSlide = Math.abs(indexActiveSlide) === items.length - countActiveSlide
    const lastSlide = items.length - countActiveSlide

    console.log("last", lastSlide)
    console.log("count", countActiveSlide)

    for (let i = lastSlide; i < items.length; i++) {
      if (isLastSlide && Math.abs(i - items.length) !== countActiveSlide) {
        indexActiveSlide++
      }
    }

    // while (isLastSlide && items.length - Math.abs(indexActiveSlide) > countActiveSlide) {
    //   indexActiveSlide++
    // }

    console.log("recalculation", indexActiveSlide)
  }

  function beforeInitialization() {
    recalculationActiveSlide(indexActiveSlide)
    changeSlide(indexActiveSlide)
    document.addEventListener("mouseleave", onMouseLeave)

    btnNext.addEventListener("click", onClickBtnRight)
    btnPrev.addEventListener("click", onClickBtnLeft)

    track.addEventListener("mousedown", onDragStart)
    document.addEventListener("mousemove", onDragOver)
    document.addEventListener("mouseup", onDragEnd)

    track.addEventListener("touchstart", onDragStart)
    document.addEventListener("touchmove", onDragOver)
    document.addEventListener("touchend", onDragEnd)
  }

  beforeInitialization()

  return {
    destroy: function () {
      document.removeEventListener("mouseleave", onMouseLeave)

      btnNext.removeEventListener("click", onClickBtnRight)
      btnPrev.removeEventListener("click", onClickBtnLeft)

      track.removeEventListener("mousedown", onDragStart)
      document.removeEventListener("mousemove", onDragOver)
      document.removeEventListener("mouseup", onDragEnd)

      track.removeEventListener("touchstart", onDragStart)
      document.removeEventListener("touchmove", onDragOver)
      document.removeEventListener("touchend", onDragEnd)

      console.log("return", indexActiveSlide)

      return { selector, params: { ...defaultParams, sliderIndex: indexActiveSlide } }
    },
    getCurrentIndex: function () {
      return indexActiveSlide
    },
    setCurrentIndex: function (index) {
      indexActiveSlide = index
    },
  }
}

export { slider }
