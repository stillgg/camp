let array = [0, 1];

function mystery(n) {
  let lengthArray = 2;
  let i = 0;
  let result = "1";

  while (lengthArray < n) {
    lengthArray = lengthArray * 2;
    i++;
  }

  while (result.length !== i + 1) {
    if (n - lengthArray / 2 >= lengthArray / 4) {
      result += "0";
    } else {
      result += "1";
    }
    console.log(lengthArray, "length");
    console.log(n, "n");
    console.log(result);
    n = n - lengthArray / 2;
    lengthArray = lengthArray / 2;
  }
  console.log(lengthArray, "length");
  console.log(n, "n");
  return parseInt(result, 2);
}

// function T(n) {
//   const tmpArray = [];
//   for (let start = 0; start < array.length; start++) {
//     tmpArray.push("0" + array[start]);
//   }
//   for (let end = array.length - 1; end >= 0; end--) {
//     tmpArray.push("1" + array[end]);
//   }
//   array = tmpArray;
//   //   n = n / 2;
//   console.log(array);
//   console.log(n);
//   if (n > array.length) T(n);
// }
// let i = 0;
// let x = 2;
// function T(n) {
//   x = T(n) * 2;
//   i++;
//   if (n > x) {
//     T(n);
//   }
//   return x
// }

// function mysteryInv(n) {
//   T(n);
//   let i = 0;
//   for (const number of array) {
//     if (parseInt(number, 2) === n) return i;
//     i++;
//   }
// }

// function nameOfMystery() {}

console.log(mystery(9));

// console.log(T(5));

// https://www.codewars.com/kata/56b2abae51646a143400001d/train/javascript
