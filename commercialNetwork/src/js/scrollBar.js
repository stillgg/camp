const sections = document.querySelectorAll("section");
const indicator = document.querySelector("#indicator");
const indicatorLines = indicator.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const main = document.querySelector(".main");

const BLACK_SECTION_INDEXES = [2, 6, 7, 8, 10, 11];

let timer = null;
let isStart = false;

const watchedSlide = new Proxy(
  {
    activeSlide: 0,
  },
  onSlideChange()
);

function delay(callback) {
  timer = setTimeout(() => {
    callback();

    clearTimeout(timer);
    timer = null;
  }, 400);
}

function onScrollHandler(e) {
  const scrollAmountY = e.deltaY;

  const isScrollDown = scrollAmountY > 30;
  const isScrollUp = scrollAmountY < -30;

  if (isStart === false) {
    if (isScrollDown) {
      isStart = true;
      watchedSlide.activeSlide++;
    }

    if (isScrollUp) {
      isStart = true;
      watchedSlide.activeSlide--;
    }

    delay(() => {
      isStart = false;
    });
  }
}

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
  line.addEventListener("click", () => (watchedSlide.activeSlide = index))
);

document.addEventListener("wheel", onScrollHandler);
