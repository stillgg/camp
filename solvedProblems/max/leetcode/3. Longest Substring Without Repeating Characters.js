const lengthOfLongestSubstring = function (s) {
  let arr = [];
  let maxLengthArray = 0;
  for (let i = 0; i < s.length; i++) {
    if (!arr.includes(s[i])) {
      arr.push(s[i]);
      if (arr.length > maxLengthArray) {
        maxLengthArray = arr.length;
      }
    } else {
      for (let j = 0; j < arr.length; j++) {
        if (s[i] === arr[j]) {
          arr = arr.slice(j + 1);
        }
      }
      arr.push(s[i]);
    }
  }
  return maxLengthArray;
};

console.log(lengthOfLongestSubstring("dvdf"));

// https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
