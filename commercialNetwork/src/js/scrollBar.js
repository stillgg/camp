const app = document.querySelector(".app");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
const main = document.querySelector(".main");

let position = 0;
let start = true;
const blackSection = [2, 6, 7, 8, 10, 11];

let posY1;
let posY2;

const onSlideChange = {
  set(watchedSlide, prop, receiver) {
    if (start === true) {
      const arrTopPosition = [];

      for (let i = 0; i < sections.length; i++) {
        arrTopPosition.push(sections[i].offsetHeight * i);
      }

      position = arrTopPosition[receiver];
      main.style.transform = `translateY(${-position}px)`;
      changeLink(receiver);
      scrollBarColor(receiver);
      changeCounter(receiver);
      start = false;
      setTimeout(startF, 500);
    }

    return Reflect.set(...arguments);
  },
};

function startF() {
  start = true;
}

const watchedSlide = new Proxy(
  {
    activeSlide: 0,
  },
  onSlideChange
);

links.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    watchedSlide.activeSlide = index;
  });
});

function changeCounter(index) {
  counter.innerHTML = index + 1 >= 10 ? index + 1 : "0" + (index + 1);
}

function changeLink(index) {
  links.forEach((link) => {
    link.classList.remove("active");
  });
  links[index].classList.add("active");
}

function scrollBarColor(index) {
  blackSection.includes(index)
    ? scrollbar.classList.add("black")
    : scrollbar.classList.remove("black");
}

function startAction(ev) {
  if (ev.type === "touchstart") {
    posY1 = ev.touches[0].clientY;
  }

  if (ev.type === "mousedown") {
    posY1 = ev.clientY;
  }
}

function endAction(ev) {
  posY2 = ev.type === "touchend" ? ev.changedTouches[0].clientY : ev.clientY;
  checkAction();
}

function onWheel(ev) {
  if (watchedSlide.activeSlide !== 0 && ev.deltaY < -50 && start === true) {
    watchedSlide.activeSlide--;
  }
  if (watchedSlide.activeSlide !== 11 && ev.deltaY > 50 && start === true) {
    watchedSlide.activeSlide++;
  }
}

function checkAction() {
  if (Math.abs(posY1 - posY2) > 150) {
    if (watchedSlide.activeSlide !== 11 && posY1 > posY2 && start === true) {
      watchedSlide.activeSlide++;
    }
    if (watchedSlide.activeSlide !== 0 && posY1 < posY2 && start === true) {
      watchedSlide.activeSlide--;
    }
  }
}

app.addEventListener("wheel", onWheel);
app.addEventListener("touchstart", startAction);
app.addEventListener("touchend", endAction);
app.addEventListener("mousedown", startAction);
app.addEventListener("mouseup", endAction);
