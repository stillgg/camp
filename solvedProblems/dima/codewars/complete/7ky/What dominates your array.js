function dominator(arr) {
  const newArray = new Map();
  const halfLength = arr.length / 2;

  for (let i = 0; i < arr.length; i++) {
    const currentValue = arr[i];
    const count = (newArray.get(currentValue) || 0) + 1;
    newArray.set(currentValue, count);

    if (count > halfLength) {
      return currentValue;
    }
  }
  return -1;
}

//https://www.codewars.com/kata/559e10e2e162b69f750000b4/train/javascript
