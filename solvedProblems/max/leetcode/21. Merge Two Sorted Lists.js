const mergeTwoLists = function (list1, list2) {
  const sortedList = [];
  let i = 0;
  let j = 0;
  while (i + j < list1.length + list2.length) {
    if (list1[i] <= list2[j]) {
      sortedList.push(list1[i]);
      i++;
    } else {
      sortedList.push(list2[j]);
      j++;
    }
  }
  console.log(sortedList);
  return sortedList;
};

mergeTwoLists([1, 2, 4, 43], [1, 3, 4, 56]);
// console.log(sortedList);

// https://leetcode.com/problems/merge-two-sorted-lists/
