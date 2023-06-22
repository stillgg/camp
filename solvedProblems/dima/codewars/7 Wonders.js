function solve(compasses, gears, tablets) {
  let count = compasses ** 2 + gears ** 2 + tablets ** 2;
  let collection = 0;

  while (compasses !== 0 && gears !== 0 && tablets !== 0) {
    compasses--;
    gears--;
    tablets--;
    collection++;
  }
  return count + collection * 7;
}

//https://www.codewars.com/kata/5adadcb36edb07df5600092e
