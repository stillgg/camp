const findMedianSortedArrays = function (nums1, nums2) {
  const sortedArray = [];
  let i = 0;
  let j = 0;
  let middle;

  while (i + j < nums1.length + nums2.length) {
    if (nums1[i] <= nums2[j] || nums2[j] === undefined) {
      sortedArray.push(nums1[i]);
      i++;
    } else {
      sortedArray.push(nums2[j]);
      j++;
    }
  }

  middle = sortedArray.length / 2;
  console.log(sortedArray);
  return sortedArray.length % 2 === 0
    ? (sortedArray[middle] + sortedArray[middle - 1]) / 2
    : sortedArray[Math.floor(middle)];
};

console.log(findMedianSortedArrays([1, 3], [2, 4, 5]));

// https://leetcode.com/problems/median-of-two-sorted-arrays/
