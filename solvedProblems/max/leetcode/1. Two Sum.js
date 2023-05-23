function twoSum(nums, target) {
  let tmp = 0;
  let result = [];
  for (let i = 0; i < nums.length; i++) {
    for (let j = 1; j < nums.length; j++) {
      tmp = nums[i] + nums[j];
      if (tmp === target) {
        result.push(i);
        result.push(j);
        return result;
      }
    }
  }
}

console.log(twoSum([10, 20, 1, 0], 1));
