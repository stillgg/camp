function Xbonacci(signature, n) {
  const arrayLength = signature.length;
  const newXbonacci = [...signature];

  if (arrayLength > n) return signature.splice(0, n);
  for (let i = arrayLength; i < n; i++) {
    let summ = 0;
    for (let j = i - arrayLength; j < i; j++) {
      summ += newXbonacci[j];
    }

    newXbonacci.push(summ);
  }
  return newXbonacci;
}

//https://www.codewars.com/kata/556e0fccc392c527f20000c5/train/javascript
