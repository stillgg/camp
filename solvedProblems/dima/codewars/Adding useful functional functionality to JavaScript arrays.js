Array.range = function (start, count) {
  return [];
};

Array.prototype.sum = function () {
  let i = 0;
  let summ = 0;
  let element;
  while (array || array.length < i) {
    element += this.array.pop;
    summ += element;
    i++;
  }
  return summ;
};

const array = [4, 5, 6];
let test;
test = array.sum();
//https://www.codewars.com/kata/52195c9bb576caf14200007f/train/javascript
