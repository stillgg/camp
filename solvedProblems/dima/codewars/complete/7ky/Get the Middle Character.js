function getMiddle(s) {
  let del = Math.floor(s.length / 2);
  if (s.length % 2 === 1) {
    return s.charAt(del);
  } else {
    return s.slice(del - 1, del + 1);
  }
}
// https://www.codewars.com/kata/56747fd5cb988479af000028
