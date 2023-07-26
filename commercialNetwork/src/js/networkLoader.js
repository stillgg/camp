const network = document.querySelector(".network");
const numbers = network.querySelectorAll(".number__loader");

// const num = numbers[1].dataset.num;

const time = 4;

numbers.forEach((number, index) => {
  let i = 1;
  let num = number.dataset.num;
  const animationNum = Number(num.split("").splice(0, 3).join(""));
  const ostatok = num.split("").splice(3, num.length);
  step = (1000 * time + index * 200) / animationNum;
  console.log(num);
  console.log(animationNum);
  console.log(ostatok);

  const timer = setInterval(function () {
    if (i <= animationNum) {
      number.innerHTML = i + "0".repeat(ostatok.length);
    } else {
      clearInterval(timer);
    }
    i++;
  }, step);
});

// console.log(numbers);

// const num = numbers[1].dataset.num;
// let time = 4;
// const step = +num / (50 * time);
// let i = step;

// console.log(num);

// const timer = setInterval(() => {
// 	numbers[1].innerHTML += Math.round(i);
// 	i += step;
// 	// console.log(i);
// 	// console.log(num);
// }, 20);

// setTimeout(() => {
// 	clearInterval(timer);
// }, 4020);
