var isPalindrome = function (x) {
  x = String(x);
  let y = "";
  for (let i = x.length - 1; i >= 0; i--) {
    y += x[i];
  }
  y = String(y);
  if (x === y) {
    return true;
  } else {
    return false;
  }
};

isPalindrome(121);
