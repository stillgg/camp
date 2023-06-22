function isIsogram(str) {
  const substr = str.toLowerCase();
  for (let i = 0; i < substr.length; i++) {
    if (substr.includes(substr[i], i + 1)) {
      return false;
    }
  }
  return true;
}

//https://www.codewars.com/kata/54ba84be607a92aa900000f1
