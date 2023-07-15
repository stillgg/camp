function sumDigits(number) {
  return Math.abs(number)
    .toString()
    .split("")
    .reduce((acc, item) => +acc + +item, 0);
}

console.log(sumDigits(-32));
//https://www.codewars.com/kata/52f3149496de55aded000410/train/javascript
