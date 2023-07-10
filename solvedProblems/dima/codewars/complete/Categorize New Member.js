function openOrSenior(data) {
  const newArr = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] >= 55 && data[i][1] > 7) {
      newArr.push("Senior");
    } else newArr.push("Open");
  }
  return newArr;
}

openOrSenior([
  [18, 20],
  [45, 2],
  [61, 12],
  [37, 6],
  [21, 21],
  [78, 9],
]);

//https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa
