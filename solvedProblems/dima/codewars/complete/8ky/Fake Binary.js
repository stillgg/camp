function fakeBin(x) {
  return x.split("").reduce(function (acc, item) {
    return acc + (item >= 5 ? "1" : "0");
  }, "");
}

//https://www.codewars.com/kata/57eae65a4321032ce000002d/train/javascript
