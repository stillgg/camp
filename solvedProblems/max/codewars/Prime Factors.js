function primeFactors(n) {
  const array = [];

  for (let i = 2; i <= n; i++) {
    while (n % i === 0) {
      array.push(i);
      n = n / i;
    }
  }

  return array;
}

console.log(primeFactors(12));
