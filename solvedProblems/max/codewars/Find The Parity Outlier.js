function findOutlier(integers) {
  let tmp = 0;
  let odd = 0;
  let even = 0;

  for (let i = 0; i < integers.length; i++) {
    tmp += integers[i] % 2;
    integers[i] % 2 === 0 ? (odd = integers[i]) : (even = integers[i]);
  }

  if (tmp === 1) {
    return even;
  } else {
    return odd;
  }
}

console.log(findOutlier([0, 1, 2, 4, 6]));

// https://www.codewars.com/kata/5526fc09a1bbd946250002dc
