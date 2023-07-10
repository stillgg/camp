function isPalindrome(x) {
  x = x.toLowerCase();
  const check = x.split("").reverse(x).join("");
  return check === x;
}

//https://www.codewars.com/kata/57a1fd2ce298a731b20006a4/train/javascript
