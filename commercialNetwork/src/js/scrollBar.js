const app = document.querySelector(".app");
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
const main = document.querySelector(".main");

let activeSlide = 0;
let position = 0;
let start = true;
const blackSection = [2, 6, 7, 8, 10, 11];

let posY1;
let posY2;

addEventListener("wheel", (event) => startAction(event));

function changeSection(vector) {
  if (start === true) {
    const arrTopPosition = [];

    for (let i = 0; i < sections.length; i++) {
      arrTopPosition.push(sections[i].offsetHeight * i);
    }

    if (vector === "up" && activeSlide !== 11 && start === true) {
      activeSlide++;
    }

    if (vector === "down" && activeSlide !== 0 && start === true) {
      activeSlide--;
    }

    start = false;
    position = arrTopPosition[activeSlide];
    onSlideChange(position);
    setTimeout(startF, 500);
  }
}

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    for (let i = 0; i < links.length; i++) {
      if (link.getAttribute("href") === links[i].getAttribute("href")) {
        activeSlide = i;
        position = sections[i].offsetHeight * i;
        onSlideChange(position);
      }
    }
  });
});

function onSlideChange(position) {
  main.style.transform = `translateY(${-position}px)`;
  changeLink(activeSlide);
  scrollBarColor(activeSlide);
  changeCounter(activeSlide);
}

function startF() {
  start = true;
}

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

app.addEventListener("touchstart", (event) => startAction(event));
app.addEventListener("touchend", (event) => endAction(event));
app.addEventListener("mousedown", (event) => startAction(event));
app.addEventListener("mouseup", (event) => endAction(event));

function startAction(ev) {
  if (ev.type === "wheel" && Math.abs(ev.deltaY) > 50) {
    ev.deltaY > 0 ? changeSection("up") : changeSection("down");
  }

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

function checkAction() {
  if (Math.abs(posY1 - posY2) > 150) {
    posY1 > posY2 ? changeSection("up") : changeSection("down");
  }
  posY1 = undefined;
  posY2 = undefined;
}
