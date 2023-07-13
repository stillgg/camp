const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
const main = document.querySelector(".main");
let activeSlide = 0;
let position = 0;
let start = true;
const blackSection = [2, 6, 7, 8, 10, 11];

addEventListener("wheel", (event) => onScrollHeader(event));

function onScrollHeader(event) {
  if (start === true) {
    const arrTopPosition = [];

    for (let i = 0; i < sections.length; i++) {
      arrTopPosition.push(sections[i].offsetHeight * i);
    }

    if (event.deltaY > 0 && activeSlide !== 11 && start === true) {
      activeSlide++;
    }

    if (event.deltaY < 0 && activeSlide !== 0 && start === true) {
      activeSlide--;
    }

    start = false;
    position = arrTopPosition[activeSlide];
    notDublicate(position);
    setTimeout(startF, 500);
  }
}

links.forEach((link, index) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    for (let i = 0; i < links.length; i++) {
      if (link.getAttribute("href") === links[i].getAttribute("href")) {
        activeSlide = i;
        position = sections[i].offsetHeight * i;
        notDublicate(position);
      }
    }
  });
});

function notDublicate(position) {
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

var el = document.querySelector(".app");

el.addEventListener("touchstart", (event) => startTest(event));
el.addEventListener("touchend", (event) => endTest(event));

function startTest(event) {
  console.log("START");
  console.log(event);
}

function endTest(event) {
  console.log("END");
  console.log(event);
}
