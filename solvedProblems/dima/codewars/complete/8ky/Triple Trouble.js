function tripleTrouble(one, two, three) {
  return one
    .split("")
    .map((char, i) => char + two[i] + three[i])
    .join("");
}

//https://www.codewars.com/kata/5704aea738428f4d30000914/train/javascript
