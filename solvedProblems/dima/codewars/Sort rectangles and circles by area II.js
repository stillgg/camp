function sortByArea(array) {
  const newArr = [];
  for (let i = 0; i < array.length; i++) {
    if (typeof array[i] === "object") {
      (1 / 2) * array[i][0] * array[i][1];
    } else {
      array[i] ** 2 * 3.14;
    }
  }
  return newArr.sort();
}

//переделать
console.log(sortByArea([[2, 5], 6, 4]));
//https://www.codewars.com/kata/5a1ebc2480171f29cf0000e5/train/javascript
