function pipeFix(numbers) {
  let min = Math.min(...numbers);
  const max = Math.max(...numbers);
  const result = [];
  for (min; min <= max; min++) {
    result.push(min);
  }
  return result;
}

console.log(pipeFix([1, 2, 3, 5, 6, 8, 9]));
//https://www.codewars.com/kata/56b29582461215098d00000f/train/javascript
