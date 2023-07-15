function findAverage(array) {
  return array.length
    ? array.reduce((acc, item) => acc + item, 0) / array.length
    : array;
}

//https://www.codewars.com/kata/57a2013acf1fa5bfc4000921/train/javascript
