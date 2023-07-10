function triangleType(a, b, c) {
  const arr = [a, b, c].sort(function (a, b) {
    console.log(a, "a");
    console.log(b, "b");
    return a - b;
  });

  function pow(x) {
    return Math.pow(x, 2);
  }

  if (arr[2] >= arr[1] + arr[0]) {
    return 0;
  }
  if (pow(arr[1]) + pow(arr[0]) > pow(arr[2])) {
    return 1;
  }
  if (pow(arr[1]) + pow(arr[0]) === pow(arr[2])) {
    return 2;
  }
  if (pow(arr[1]) + pow(arr[0]) < pow(arr[2])) {
    return 3;
  }
  return 0;
}

console.log(triangleType(7, 12, 8));

// https://www.codewars.com/kata/53907ac3cd51b69f790006c5/train/javascript
