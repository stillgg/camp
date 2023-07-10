function oddOrEven(array) {
  let summ = 0;
  for (let i = 0; i < array.length; i++) {
    summ += array[i];
  }

  if (summ % 2 === 1 || summ % 2 === -1) {
    return "odd";
  } else return "even";
}

//https://www.codewars.com/kata/5949481f86420f59480000e7/train/javascript
