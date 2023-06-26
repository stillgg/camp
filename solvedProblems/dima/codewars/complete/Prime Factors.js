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

//https://www.codewars.com/kata/542f3d5fd002f86efc00081a
