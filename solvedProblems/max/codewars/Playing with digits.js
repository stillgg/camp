function digPow(n, p) {
  let sum = 0;
  let result = 0;
  let array = n.toString().split("");
  for (let i = 0; i < array.length; i++) {
    sum += Math.pow(array[i], p + i);
  }

  result = Math.round(sum / n, -1);

  if (sum % n == 0) {
    return result;
  } else {
    return -1;
  }
}

console.log(digPow(695, 2));
