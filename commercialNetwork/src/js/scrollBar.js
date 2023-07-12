const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
const main = document.querySelector(".main");
let activeSlide = 0;
let position = 0;
let start = true;
const blackSection = [2, 6, 7, 8, 10, 11];

addEventListener("wheel", (event) => checkSection(event));

function checkSection(event) {
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
    main.style.transform = `translateY(${-position}px)`;
    changeCounter(activeSlide);
    changeLink(activeSlide);
    scrollBarColor(activeSlide);
    console.log(activeSlide);
    setTimeout(startF, 500);
  }
}

function startF() {
  start = true;
  console.log("Srabotalo");
}

function changeCounter(index) {
  console.log("changeCounter");
  counter.innerHTML = index + 1 >= 10 ? index + 1 : "0" + (index + 1);
}

function changeLink(index) {
  console.log("changeLink");
  links.forEach((link) => {
    link.classList.remove("active");
  });
  links[index].classList.add("active");
}

function scrollBarColor(index) {
  console.log("scrollBarColor");
  blackSection.includes(index)
    ? scrollbar.classList.add("black")
    : scrollbar.classList.remove("black");
}

// Добавление анимации перехода

for (let anchor of links) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const blockID = anchor.getAttribute("href").substr(1);

    document.getElementById(blockID).scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}
