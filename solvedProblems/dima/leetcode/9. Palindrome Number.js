var isPalindrome = function (x) {
  x = String(x);
  let y = "";
  for (let i = x.length - 1; i >= 0; i--) {
    y += x[i];
  }
  x === y ? true : false;
  return x;
};
