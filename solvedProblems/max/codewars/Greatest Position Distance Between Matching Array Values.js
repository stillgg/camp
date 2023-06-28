const greatestDistance = function (data) {
  let distance = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = data.length; j > 0; j--) {
      if (data[i] === data[j]) {
        j - i > distance ? (distance = j - i) : (distance = distance);
      }
    }
  }
  return distance;
};

console.log(greatestDistance([9, 7, 1, 2, 3, 7, 0, -1, -2]));

// https://www.codewars.com/kata/5442e4fc7fc447653a0000d5/train/javascript
