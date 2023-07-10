// function longestPalindrome(str) {
//   const reverseStr = str.split("").reverse().join("");
//   const arrResult = [];
//   let result = 0;
//   let start = "";
//   let finish = "";
//   for (let i = 0; i < str.length; i++) {
//     const tmp = reverseStr.indexOf(str[i]);

//     for (let j = 0; j < reverseStr.length; j++) {
//       start += str[i + j];
//       finish += reverseStr[j + tmp];
//       console.log(start, "start");
//       console.log(finish, "finish");
//       if (start === finish) {
//         result++;
//       } else {
//         arrResult.push(result);
//         start = "";
//         finish = "";
//         result = 0;
//         break;
//       }
//     }
//   }
//   return Math.max(...arrResult);
// }

function longestPalindrome(str) {
  let tmp = "";
  const arrResult = [];

  for (let i = 0; i < str.length; i++) {
    for (let j = i; j < str.length; j++) {
      tmp += str[j];

      const tmpReverse = tmp.split("").reverse().join("");
      console.log(tmp, "tmp");
      console.log(tmpReverse, "tmpReverse");
      if (tmp === tmpReverse) {
      } else {
        arrResult.push(tmp.length);
        tmp = "";
        break;
      }
    }
  }

  return Math.max(...arrResult);
}

console.log(longestPalindrome("zyabyz"));
// d33123454321jklbaab
