function XO(str) {
  let quantityX = 0;
  let quantityO = 0;

  const myStr = str.toLowerCase();

  for (let i = 0; i < myStr.length; i++) {
    if (myStr[i] === "x") {
      quantityX++;
    }
    if (myStr[i] === "o") {
      quantityO++;
    }
  }
  return quantityO === quantityX;
}

//https://www.codewars.com/kata/55908aad6620c066bc00002a
