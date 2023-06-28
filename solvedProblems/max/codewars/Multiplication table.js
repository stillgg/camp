multiplicationTable = function (size) {
  let result = [];
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(i + 1);
  }

  result.push(arr);
  arr = [];

  for (let j = 1; j < result[0].length; j++) {
    result.push(result[0].map((x) => x * (j + 1)));
    console.log(result);
  }

  return result;
};

console.log(multiplicationTable(15));
