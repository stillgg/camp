function narcissistic(value) {
  let sum = 0;
  const strValue = value.toString();
  for (let i = 0; i < strValue.length; i++) {
    sum += Math.pow(strValue[i], strValue.length);
  }
  return sum === value;
}

console.log(narcissistic(122));

//   https://www.codewars.com/kata/5287e858c6b5a9678200083c
