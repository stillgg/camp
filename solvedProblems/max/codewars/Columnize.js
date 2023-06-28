function columnize(items, n) {
  let result = items[0] + " ".repeat(items.length - 1);
  for (let i = 1; i < items.length; i++) {
    if (i % n === 0) {
      result += `\n${items[i]}`;
    } else {
      result += `| ${items[i]}`;
    }
    result += " ".repeat(items.length - i - 1);
  }
  return result;
}

console.log(columnize(["1", "12", "123", "1234", "12345", "123456"], 1));

//   https://www.codewars.com/kata/6087bb6050a6230049a068f1/train/javascript
