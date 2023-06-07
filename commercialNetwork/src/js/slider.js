const btnLeft = document.querySelector("#arrowBtnLeft");
const btnRight = document.querySelector("#arrowBtnRight");
const slides = document.querySelectorAll(".slide");

let activeSlide = 0;

const clickRight = () => {
  slides[activeSlide].classList.remove("slider__img__active");
  slides[activeSlide].classList.add("slider__img__prev");
  slides[activeSlide + 1].classList.add("slider__img__active");
  slides[activeSlide + 1].classList.remove("slider__img__next");
  activeSlide++;
  console.log(activeSlide);
  btnDisabled();
};
const clickLeft = () => {
  slides[activeSlide].classList.remove("slider__img__active");
  slides[activeSlide].classList.add("slider__img__next");
  slides[activeSlide - 1].classList.add("slider__img__active");
  slides[activeSlide - 1].classList.remove("slider__img__prev");
  activeSlide += -1;
  console.log(activeSlide);
  btnDisabled();
};

function btnDisabled() {
  btnLeft.classList.remove("disabled");
  btnRight.classList.remove("disabled");
  if (activeSlide === 0) {
    btnLeft.classList.add("disabled");
  }
  if (activeSlide === 2) {
    btnRight.classList.add("disabled");
  }
}

btnLeft.addEventListener("click", clickLeft);
btnRight.addEventListener("click", clickRight);
