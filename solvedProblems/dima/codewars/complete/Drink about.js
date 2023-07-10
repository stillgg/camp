function peopleWithAgeDrink(old) {
  return old < 14
    ? "drink toddy"
    : old < 18
    ? "drink coke"
    : old < 21
    ? "drink beer"
    : old >= 21
    ? "drink whisky"
    : -1;
}

//https://www.codewars.com/kata/56170e844da7c6f647000063/train/javascript
