function findMultiples(integer, limit) {
  const finded = [];
  for (let i = integer; i <= limit; i++) {
    if (i % integer === 0) {
      finded.push(i);
    }
  }
  return finded;
}

//https://www.codewars.com/kata/58ca658cc0d6401f2700045f/train/javascript
