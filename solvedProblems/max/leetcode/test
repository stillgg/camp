const isValid = function (s) {
  if (s.length % 2 !== 0) return false;
  if (s.length === 0) return true;

  const arr = [];
  const symbols = {
    "(": ")",
    "[": "]",
    "{": "}",
  };

  for (let el of s) {
    if (symbols[el]) {
      arr.push(el);
    } else {
      const deleteElement = arr.pop();

      if (el !== symbols[deleteElement]) {
        return false;
      }
    }
  }
  return arr.length === 0;
};
console.log(isValid("(({)})"));
