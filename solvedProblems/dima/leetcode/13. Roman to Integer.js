var romanToInt = function (s) {
  let symbols = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  let result = 0;
  for (let i = 0; i < s.length; i++) {
    for (const key in symbols) {
      if (key === s[i]) {
        result += symbols[key];
        console.log(result);
      }
    }
  }
  return result;
};

//дорешать
//дорешать
//дорешать
//дорешать
//дорешать


romanToInt("III");
