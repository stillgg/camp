const app = document.querySelector(".app");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
const main = document.querySelector(".main");

let isFinishDelay = true;
const blackSection = [2, 6, 7, 8, 10, 11];

let posY1;
let timerId;

const watchedSlide = new Proxy(
  {
    activeSlide: 0,
  },
  onSlideChange()
);

links.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    watchedSlide.activeSlide = index;
  });
});

function changeSection(index) {
  const slideHeight = document.documentElement.clientHeight;

  main.style.transform = `translateY(${-slideHeight * index}px)`;
}

function changeCounter(index) {
  counter.innerHTML = index + 1 >= 10 ? index + 1 : "0" + (index + 1);
}

function changeIndicator(index) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  links[index].classList.add("active");
}

function changeScrollBarColor(index) {
  blackSection.includes(index)
    ? scrollbar.classList.add("black")
    : scrollbar.classList.remove("black");
}

function onSlideChange() {
  return {
    set(watchedSlide, prop, activeIndex) {
      if (isFinishDelay === true && activeIndex >= 0 && activeIndex <= 11) {
        clearTimeout(timerId);

        changeSection(activeIndex);
        changeIndicator(activeIndex);
        changeScrollBarColor(activeIndex);
        changeCounter(activeIndex);

        isFinishDelay = false;
        timerId = setTimeout(() => (isFinishDelay = true), 500);

        return Reflect.set(...arguments);
      }
    },
  };
}

function onDragStart(event) {
  posY1 = event.touches ? event.touches[0].clientY : event.clientY;
}

function onDragEnd(event) {
  const posY2 = event.changedTouches
    ? event.changedTouches[0].clientY
    : event.clientY;

  if (posY1 > posY2 && isFinishDelay === true) {
    watchedSlide.activeSlide++;
  }

  if (posY1 < posY2 && isFinishDelay === true) {
    watchedSlide.activeSlide--;
  }
}

function onWheel(event) {
  if (event.deltaY < -50 && isFinishDelay === true) {
    watchedSlide.activeSlide--;
  }

  if (event.deltaY > 50 && isFinishDelay === true) {
    watchedSlide.activeSlide++;
  }
}

app.addEventListener("wheel", onWheel);
app.addEventListener("touchstart", onDragStart);
app.addEventListener("touchend", onDragEnd);

app.addEventListener("mousedown", onDragStart);
app.addEventListener("mouseup", onDragEnd);
