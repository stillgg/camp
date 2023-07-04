function countDevelopers(list) {
  let count = 0;
  for (const iterator of list) {
    if (iterator.continent === "Europe" && iterator.language === "JavaScript") {
      count++;
    }
  }
  return count;
}

//https://www.codewars.com/kata/582746fa14b3892727000c4f/train/javascript
