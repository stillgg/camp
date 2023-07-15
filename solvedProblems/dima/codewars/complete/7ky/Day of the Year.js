function toDayOfYear(arr) {
  let day = arr[0];
  let year = arr[2];
  let month = arr[1] - 1;
  let leapYear = 28;

  if (year % 4 === 0) {
    if (year % 100 === 0) {
      leapYear = 28;
      if (year % 400 === 0) {
        leapYear = 29;
      }
    } else {
      leapYear = 29;
    }
  }
  console.log(leapYear);
  for (let i = 1; i <= month; i++) {
    if (i === 2) {
      day += leapYear;
    }
    if (
      i === 1 ||
      i === 3 ||
      i === 5 ||
      i === 7 ||
      i === 8 ||
      i === 10 ||
      i === 12
    ) {
      day += 31;
    }
    if (i === 4 || i === 6 || i === 9 || i === 11) day += 30;
  }
  return day;
}

//https://www.codewars.com/kata/5a1ebe0d46d843454100004c
