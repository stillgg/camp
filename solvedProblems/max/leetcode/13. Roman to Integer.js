const romanToInt = function (s) {
  let result = 0;
  let arr = [];
  let symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  for (let number of s.split("")) {
    for (let i = 0; i < Object.keys(symbols).length; i++) {
      if (number == Object.keys(symbols)[i]) {
        arr.push(Object.values(symbols)[i]);
      }
    }
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) {
      arr[i] = -arr[i];
    }
    result += arr[i];
  }
  return result;
};

console.log(romanToInt("XVIII"));
