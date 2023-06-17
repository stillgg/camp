function triangular(n) {
  if (n < 0) return 0;
  let result = Math.floor((n * n) / 2 + n / 2);
  return result;
}

triangular(3);
//https://www.codewars.com/kata/525e5a1cb735154b320002c8
