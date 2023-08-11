function slider(
  selector,
  params = {
    sliderIndex: 0,
    gap: 20,
  },
) {
  const defaltParams = {
    sliderIndex: params?.sliderIndex || 0,
    gap: params?.gap || 20,
  }

  const area = document.querySelector(selector)
  const btnNext = area.querySelector(".slider-button__right")
  const btnPrev = area.querySelector(".slider-button__left")
  const track = area.querySelector(".slider-track")
  const items = area.querySelectorAll(".slider-item")
  const itemWidth = items[0].clientWidth + defaltParams.gap
  const countActiveSlide = getTotalVisibleSlides(area)
  const percentShift = 0.2

  let indexActiveSlide = defaltParams.sliderIndex
  console.log(indexActiveSlide)
  let positionStart = 0
  let isDrag = false

  if (indexActiveSlide === 0) btnPrev.classList.add("hidden")

  btnNext.addEventListener("click", () => {
    if (Math.abs(indexActiveSlide) <= items.length - countActiveSlide) {
      indexActiveSlide--
      changeSlide(indexActiveSlide)
    }
  })

  btnPrev.addEventListener("click", () => {
    if (indexActiveSlide !== 0) {
      indexActiveSlide++
      changeSlide(indexActiveSlide)
    }
  })

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

    track.style.transitionDuration = "400ms"
    isDrag = false
  }

  function onMouseLeave() {
    changeSlide(indexActiveSlide)
    isDrag = false
    track.style.transitionDuration = "600ms"
  }

  function recalculationActiveSlide(indexActiveSlide) {
    // const isLastSlide = Math.abs(indexActiveSlide) === items.length - countActiveSlide
    console.log(indexActiveSlide)
    // while (isLastSlide && Math.abs(indexActiveSlide) > lastSlide) {
    //   indexActiveSlide++
    // }
    while (indexActiveSlide) {
      indexActiveSlide++
    }
  }

  function beforeInitialization() {
    changeSlide(indexActiveSlide)
    document.addEventListener("mouseleave", onMouseLeave)

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

      track.removeEventListener("mousedown", onDragStart)
      document.removeEventListener("mousemove", onDragOver)
      document.removeEventListener("mouseup", onDragEnd)

      track.removeEventListener("touchstart", onDragStart)
      document.removeEventListener("touchmove", onDragOver)
      document.removeEventListener("touchend", onDragEnd)
    },
    init: function () {
      console.log(indexActiveSlide)
      slider(selector, { ...defaltParams, sliderIndex: indexActiveSlide })
    },
  }
}

export { slider }
