const findSubstring = function (s, words) {
  const arrayForIndex = [];
  const firstWord = words[0];
  let indexFirstWord = s.indexOf(firstWord);

  while (indexFirstWord !== -1) {
    arrayForIndex.push(indexFirstWord);
    indexFirstWord = s.indexOf(firstWord, indexFirstWord + 1);
  }

  let search;
  let xdsadsa = 0;
  let stack = [...words].splice(1);
  let result = 0;
  let arrayResult = [];

  for (let i = 0; i < arrayForIndex.length; i++) {
    for (let j = 1; j < words.length; j++) {
      search = s.slice(
        arrayForIndex[i] + firstWord.length * j,
        arrayForIndex[i] + firstWord.length * (j + 1)
      );
      console.log("CICL +", search);
      if (spliceStack(search)) {
        result++;
        arrayResult.push(arrayForIndex[i] + firstWord.length * j);
      } else {
        xdsadsa++;
        break;
      }
    }
    for (let k = 0; k < words.length - 1; k++) {
      search = s.slice(
        arrayForIndex[i] - firstWord.length * (k + 1),
        arrayForIndex[i] - firstWord.length * k
      );
      console.log("CICL -", search);
      if (spliceStack(search)) {
        result++;
        arrayResult.push(arrayForIndex[i] - firstWord.length * (k + 1));
      } else {
        xdsadsa++;
        break;
      }
    }
    if (xdsadsa === 2) {
      stack = [...words].splice(1);
      result = 0;
      arrayResult.length = 0;
    }
  }

  function spliceStack(search) {
    if (stack.indexOf(search) !== -1) {
      stack.splice(stack.indexOf(search), 1);
      console.log(stack, "DELETE");
    } else {
      return false;
    }
    return true;
  }
  console.log(arrayResult);
  return arrayResult;
};

console.log(
  findSubstring("goodgoodwordgoodbestword", ["word", "good", "best", "word"])
);

// https://leetcode.com/problems/substring-with-concatenation-of-all-words/
