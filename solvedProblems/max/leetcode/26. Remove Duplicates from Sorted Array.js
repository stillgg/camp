const removeDuplicates = function (nums) {
  const sortedArray = [];

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== nums[i + 1]) {
      sortedArray.push(nums[i]);
    }
  }
  nums.forEach((num, index) => {
    nums[index] = sortedArray[index];
  });
  // nums = [...sortedArray];
  console.log(nums);
  return sortedArray.length;
};

console.log(removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]));

// https://leetcode.com/problems/remove-duplicates-from-sorted-array/
