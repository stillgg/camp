const numbers = document.querySelectorAll(".number__loader");

const time = 4;

numbers.forEach((number) => {
	let i = 1;
	let num = number.dataset.num;
	step = (1000 * time) / num;
	console.log(step);

	const timer = setInterval(function () {
		if (i <= num) {
			number.innerHTML = i;
		} else {
			clearInterval(timer);
		}
		i++;
	}, step);
});
