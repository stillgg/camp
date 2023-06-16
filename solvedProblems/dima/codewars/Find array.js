function findArray(arr1, arr2) {
  const arr3 = [];
  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] > arr1.length - 1 || arr1.length === 0 || arr2.length === 0) {
      continue;
    }
    arr3.push(arr1[arr2[i]]);
  }
  return arr3;
}

// https://www.codewars.com/kata/59a2a3ba5eb5d4e609000055/train/javascript
