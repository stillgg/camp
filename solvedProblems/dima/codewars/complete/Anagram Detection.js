var isAnagram = function (test, original) {
  test.toLowerCase().split("").sort().join("") ===
    original.toLowerCase().split("").sort().join("");
};

//https://www.codewars.com/kata/529eef7a9194e0cbc1000255
