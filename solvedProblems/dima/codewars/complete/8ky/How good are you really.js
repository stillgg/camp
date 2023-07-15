function betterThanAverage(classPoints, yourPoints) {
  const sum = classPoints.reduce((acc, item) => acc + item, 0);
  const avg = Math.ceil(sum / classPoints.length);
  return avg < yourPoints;
}

console.log(betterThanAverage([2, 3], 5));
//https://www.codewars.com/kata/5601409514fc93442500010b/train/javascript
