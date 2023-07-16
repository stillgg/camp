const sections = document.querySelectorAll("section");
const indicator = document.querySelector("#indicator");
const indicatorLines = indicator.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const main = document.querySelector(".main");

const BLACK_SECTION_INDEXES = [2, 6, 7, 8, 10, 11];

let isStart = false;
let timeoutId;

let clientY1;

const watchedSlide = new Proxy(
  {
    activeSlide: 0,
  },
  onSlideChange()
);

function onSlideChange() {
  return {
    set(target, property, slideIndex) {
      if (slideIndex < 0 || slideIndex > 11) {
        return;
      }

      const sectionHeight = document.documentElement.clientHeight;

      counter.innerText = slideIndex + 1;

      main.style.transform = `translateY(${-(sectionHeight * slideIndex)}px)`;

      sections.forEach((section) => section.classList.remove("active"));
      indicatorLines.forEach((line) => line.classList.remove("active"));
      indicator.classList.remove("black");

      sections[slideIndex].classList.add("active");
      indicatorLines[slideIndex].classList.add("active");

      if (BLACK_SECTION_INDEXES.includes(slideIndex))
        indicator.classList.add("black");

      return Reflect.set(target, property, slideIndex);
    },
  };
}

indicatorLines.forEach((line, index) =>
  line.addEventListener("click", (e) => {
    e.stopPropagation();
    watchedSlide.activeSlide = index;
  })
);

function onWheelHandler(e) {
  clearTimeout(timeoutId);

  const scrollAmountY = e.deltaY;

  const isScrollDown = scrollAmountY > 50;
  const isScrollUp = scrollAmountY < -50;

  if (isStart === false) {
    if (isScrollDown) {
      isStart = true;

      watchedSlide.activeSlide++;
    }

    if (isScrollUp) {
      isStart = true;

      watchedSlide.activeSlide--;
    }
  }

  timeoutId = setTimeout(function () {
    isStart = false;
    console.log("wheel event has stopped");
  }, 25);
}

function onDragStart(e) {
  clientY1 = e.touches ? e.touches[0].clientY : e.clientY;
}

function onDragEnd(e) {
  const clientY2 = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;
  diff = clientY1 - clientY2;

  if (diff < -100) {
    watchedSlide.activeSlide--;
  }
  if (diff > 100) {
    watchedSlide.activeSlide++;
  }
}

document.addEventListener("wheel", onWheelHandler);
document.addEventListener("touchstart", onDragStart);
document.addEventListener("touchend", onDragEnd);

document.addEventListener("mousedown", onDragStart);
document.addEventListener("mouseup", onDragEnd);
