function isTriangle(a, b, c) {
  if (c >= b + a || a >= b + c || b >= a + c) return false;
  return true;
}

//https://www.codewars.com/kata/56606694ec01347ce800001b/train/javascript
