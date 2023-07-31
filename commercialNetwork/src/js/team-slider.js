const btnNext = document.querySelector("#team-btn-next")
const btnPrev = document.querySelector("#team-btn-prev")
const sectionTeam = document.querySelector(".team")


const trackTeam = document.querySelector(".team-slider-track")
const teamItems = document.querySelectorAll(".team__item")
const teamText = document.querySelectorAll('#text')
const getGap = getComputedStyle(trackTeam)

let indexActiveSlide = 0
let positionStart = 0
let currentPosition = 0
let isDrag = false
let removeIndex = 0

if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

btnNext.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  const clientWidth = window.innerWidth
  const removeIndex = getRemoveSlides(clientWidth, 1)


  if (Math.abs(indexActiveSlide) <= teamItems.length - removeIndex) {
    indexActiveSlide--
    redraw('next',teamText,indexActiveSlide)
    trackTeam.style.transform = shift(indexActiveSlide, zdvig)
  }

  if (Math.abs(indexActiveSlide) === teamItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  }

  currentPosition = zdvig * -indexActiveSlide
  if (indexActiveSlide !== 0) btnPrev.classList.remove("hiddenBtn-left")
})

btnPrev.addEventListener("click", () => {
  const zdvig = shiftCalculate()
  if (indexActiveSlide !== 0) {

    indexActiveSlide++
    redraw('prev',teamText,indexActiveSlide)
    trackTeam.style.transform = shift(indexActiveSlide, zdvig)

    if (indexActiveSlide === 0) btnPrev.classList.add("hiddenBtn-left")

    if (indexActiveSlide !== teamItems.length - 1 - removeIndex) {
      btnNext.classList.remove("hiddenBtn-right")
    }
  }

  currentPosition = zdvig * -indexActiveSlide
})

function shift(index, shift) {
  return `translate3d(${index * shift}px, 0px, 0px)`
}

function shiftCalculate() {
  const itemWidth = teamItems[0].offsetWidth
  return (shiftValue = parseInt(getGap.gap) + itemWidth)
}

function onDragStart(event) {
  event.preventDefault()
  isDrag = true

  trackTeam.style.transitionDelay = "0s"

  positionStart = event.type === "touchstart" ? event.touches[0].clientX : event.clientX

  positionStart += currentPosition
}

function onDragOver(event) {
  if (!isDrag) return

  const move = event.type === "touchmove" ? event.touches[0].clientX : event.clientX

  trackTeam.style.transform = `translate3d(${move - positionStart}px, 0px, 0px)`

  trackTeam.style.transitionDuration = "0ms"
}

function onDragEnd(event) {
  const zdvig = shiftCalculate()
  if (!isDrag) return

  let positionEnd = event.type === "touchend" ? event.changedTouches[0].clientX : event.clientX

  const clientWidth = window.innerWidth
  removeIndex = getRemoveSlides(clientWidth, 1)

  positionEnd += currentPosition

  if (
    positionStart > positionEnd &&
    Math.abs(positionEnd - positionStart) > zdvig * 0.2 &&
    -indexActiveSlide !== teamItems.length -1 - removeIndex
  ) {
    if (positionStart - positionEnd - 2 * zdvig > 0 && Math.abs(indexActiveSlide) + 2 < teamItems.length - removeIndex) {
      indexActiveSlide -= 2
      redraw('next',teamText,indexActiveSlide)
    } else {indexActiveSlide--
        redraw('next',teamText,indexActiveSlide)}
  }

  if (positionStart < positionEnd && positionEnd - positionStart > zdvig * 0.2 && indexActiveSlide !== 0) {
    if (Math.abs(positionStart - positionEnd) - 2 * zdvig > 0 && indexActiveSlide + 2 <= 0) {
        
        indexActiveSlide += 2
        redraw('prev',teamText,indexActiveSlide)
    } else 
    {
        
        indexActiveSlide++
        redraw('prev',teamText,indexActiveSlide)
    }
  }

  if (indexActiveSlide === 0) {
    btnPrev.classList.add("hiddenBtn-left")
  } else btnPrev.classList.remove("hiddenBtn-left")

  if (Math.abs(indexActiveSlide) === teamItems.length - 1 - removeIndex) {
    btnNext.classList.add("hiddenBtn-right")
  } else btnNext.classList.remove("hiddenBtn-right")

  trackTeam.style.transform = shift(indexActiveSlide, zdvig)
  trackTeam.style.transitionDuration = "400ms"

  currentPosition = -(indexActiveSlide * zdvig)
  isDrag = false
}

sectionTeam.addEventListener("mouseleave", (event) => {
  const zdvig = shiftCalculate()

  trackTeam.style.transform = `translate3d(${indexActiveSlide * zdvig}px, 0px, 0px)`
  isDrag = false
  trackTeam.style.transitionDuration = "600ms"
})

trackTeam.addEventListener("mousedown", onDragStart)
sectionTeam.addEventListener("mousemove", onDragOver)
sectionTeam.addEventListener("mouseup", onDragEnd)

trackTeam.addEventListener("touchstart", onDragStart)
sectionTeam.addEventListener("touchmove", onDragOver)
sectionTeam.addEventListener("touchend", onDragEnd)

function getRemoveSlides(window, slides) {
  return window > 992 ? slides : 0
}

function redraw(direction,text,indexActiveSlide){
const index = Math.abs(indexActiveSlide)

    if(direction === 'next'){
        const prevValue = document.querySelector('.text.active')
        prevValue.classList.remove('active')
        text[index].classList.add('active')
    }

    if(direction === 'prev'){
        const prevValue = document.querySelector('.text.active')
        text[index].classList.add('active')
        prevValue.classList.remove('active')
    }

}