function rotate(str) {
  const arr = [];
  for (let i = 0; i < str.length; i++) {
    arr.push(str.slice(i, str.length) + str.slice(0, i));
  }
  return arr;
}

console.log(rotate("Hello"));

// https://www.codewars.com/kata/586560a639c5ab3a260000f3/train/javascript
