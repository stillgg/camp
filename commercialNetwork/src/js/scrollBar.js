const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".sections__wrapper");
const counter = document.querySelector(".number__current");
const scrollbar = document.querySelector(".scrollbar");
let scrollDistance = window.scrollY;

window.addEventListener("scroll", (e) => {
  //   console.log(window.scrollY > scrollDistance);
  scrollDistance = window.scrollY;
  checkSection(scrollDistance);
});

function checkSection(scrollDistance) {
  sections.forEach((section, index) => {
    if (section.classList.contains("active")) {
      links[index].classList.remove("active");
    }
    if (
      section.offsetTop <= scrollDistance &&
      section.offsetTop + section.clientHeight > scrollDistance
    ) {
      //   console.log(section.clientHeight, "1");
      //   console.log(section.offsetTop, "2");
      //   console.log(scrollDistance, "3");

      links[index].classList.add("active");
      section.classList.add("active");
      changeCounter(index);
      if (index + 1 === 3 || (index + 1 >= 7 && index + 1 !== 10)) {
        scrollbar.classList.add("black");
      } else {
        scrollbar.classList.remove("black");
      }
    }
  });
}

checkSection();

function changeCounter(index) {
  counter.innerHTML = index + 1 >= 10 ? index + 1 : "0" + (index + 1);
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
