Array.range = function (start, count) {
  const arr = [];
  let i = 0;
  while (i < count) {
    arr.push(start + i);
    i++;
  }
  return arr;
};

Array.prototype.sum = function () {
  let i = 0;
  let sum = 0;
  console.log(Array);
  while (this.length > i) {
    sum += this[i];
    i++;
  }
  return sum;
};

//https://www.codewars.com/kata/52195c9bb576caf14200007f/train/javascript
