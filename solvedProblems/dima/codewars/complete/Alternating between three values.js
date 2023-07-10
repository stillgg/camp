function f(x, cc) {
  if (x === cc.a) {
    return (x = cc.b);
  }
  if (x === cc.b) {
    return (x = cc.c);
  }
  if (x === cc.c) {
    return (x = cc.a);
  }
}

console.log(f(5, { a: 3, b: 4, c: 5 }));
//https://www.codewars.com/kata/596776fbb4f24d0d82000141/train/javascript
