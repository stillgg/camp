function getCharacters(obj, key, val) {
  const foundCharacters = [];
  for (const i of obj.characters) {
    for (const j in i) {
      if (j === key) {
        if (val.toLowerCase() === i[j].toLowerCase()) {
          foundCharacters.push(i);
        }
      }
    }
  }
  return foundCharacters;
}

//https://www.codewars.com/kata/55d5da66a0e378b8bc0000c6/train/javascript
