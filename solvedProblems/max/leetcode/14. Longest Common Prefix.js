const longestCommonPrefix = function (strs) {
  let y = "";
  const firstWorld = strs[0];
  for (let i = 0; i < firstWorld.length; i++) {
    let counter = 0;
    for (let j = 0; j < strs.length; j++) {
      if (strs[j][i] === firstWorld[i]) {
        counter++;
      }
    }
    if (counter === strs.length) {
      y += firstWorld[i];
    } else {
      return y;
    }
  }
  return y;
};

console.log(longestCommonPrefix(["flower", "flow", "flight"]));
