function twoSum(nums, target) {
  let summ = 0;
  const arrIndex = [];

  for (let i = 0; i < nums.length; i++) {
    summ = nums[i];

    for (let j = 0; j < nums.length; j++) {
      if (i === j) {
        continue;
      } else if (summ + nums[j] === target) {
        arrIndex.push(i);
        arrIndex.push(j);
        summ += nums[j];
        break;
      }
    }

    if (summ === target) break;
  }
  return arrIndex;
}

console.log(twoSum([3, 1, 2, 2, 8, 4], 11));
