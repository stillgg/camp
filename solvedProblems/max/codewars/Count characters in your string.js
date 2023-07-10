function count(string) {
  const result = {};
  for (let i = 0; i < string.length; i++) {
    if (!result[string[i]]) {
      result[string[i]] = 1;
    } else {
      result[string[i]]++;
    }
  }
  return result;
}

console.log(count("abbbbc"));

// https://www.codewars.com/kata/52efefcbcdf57161d4000091/train/javascript
