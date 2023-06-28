function anagramDifference(w1, w2) {
  let result = 0;
  for (let i = 0; i < w1.length; i++) {
    if (w2.includes(w1[i])) {
      w2 = w2.replace(w1[i], 1);
      result++;
    }
  }
  return w1.length + w2.length - 2 * result;
}

console.log(anagramDifference("aab", "a"));

// https://www.codewars.com/kata/5b1b27c8f60e99a467000041/train/javascript
