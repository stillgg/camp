function triangular(n) {
  let summ = n;
  for (let i = n; i < 0; i--) {
    if (n < 0) {
      return 0;
    }
    summ += i;
  }
  return summ;
}
// проблема со скоростью, не прошел тест
//https://www.codewars.com/kata/525e5a1cb735154b320002c8
