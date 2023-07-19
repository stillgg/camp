const numbers = document.querySelectorAll(".number__loader");
console.log(numbers);

const time = 4;

numbers.forEach((number) => {
  const num = number.dataset.num;
  console.log(num);
});
