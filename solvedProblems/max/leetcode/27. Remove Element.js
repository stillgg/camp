const removeElement = function (nums, val) {
  let indexOldNums = 0;
  let indexNewNums = 0;
  while (indexOldNums < nums.length) {
    if (nums[indexOldNums] !== val) {
      nums[indexNewNums] = nums[indexOldNums];
      indexNewNums++;
    }
    indexOldNums++;
  }
  return indexNewNums;
};

console.log(removeElement([3, 2, 2, 3], 3));

// https://leetcode.com/problems/remove-element/description/
