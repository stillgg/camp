const strStr = function (haystack, needle) {
  let indexForNeedle = 0;
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[indexForNeedle]) {
      for (; indexForNeedle < needle.length; indexForNeedle++) {
        if (needle[indexForNeedle] !== haystack[i + indexForNeedle]) {
          indexForNeedle = 0;
          break;
        }
        if (indexForNeedle === needle.length - 1) {
          return i;
        }
      }
    }
  }
  return -1;
};

// const strStr = function (haystack, needle) {
//     return haystack.indexOf(needle);
//   };

console.log(strStr("mississippi", "issip"));

// https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
