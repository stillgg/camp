function twoSum(nums, target) {
  const arrIndex = [];
  for (let i = 0; i < nums.length; i++) {
    summ = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      if (summ + nums[j] === target) {
        arrIndex.push(i);
        arrIndex.push(j);
        summ += nums[j];
        return arrIndex;
      }
    }
  }
}
twoSum([3, 1, 2, 2, 8, 4], 11);
