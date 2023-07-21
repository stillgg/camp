const network = document.querySelector(".network");
const numbers = network.querySelectorAll(".number__loader");

// const time = 4;

// numbers.forEach((number) => {
// 	let i = 1;
// 	let num = number.dataset.num;
// 	step = (1000 * time) / num;
// 	console.log(step);

// 	const timer = setInterval(function () {
// 		if (i <= num) {
// 			number.innerHTML = i;
// 		} else {
// 			clearInterval(timer);
// 		}
// 		i++;
// 	}, step);
// });

console.log(numbers);

const num = numbers[1].dataset.num;
let time = 4;
const step = +num / (50 * time);
let i = step;

console.log(num);

const timer = setInterval(() => {
	numbers[1].innerHTML += Math.round(i);
	i += step;
	// console.log(i);
	// console.log(num);
}, 20);

setTimeout(() => {
	clearInterval(timer);
}, 4020);
