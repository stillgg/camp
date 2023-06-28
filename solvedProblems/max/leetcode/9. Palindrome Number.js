function isPalindrome(x) {
  const reverseArray = x.toString().split("").reverse().join("");
  return +reverseArray === x;
}

console.log(isPalindrome(12121));
