function greetDevelopers(list) {
  for (const iterator of list) {
    iterator.greeting = `Hi ${iterator.firstName}, what do you like the most about ${iterator.language}?`;
  }
  return list;
}

//https://www.codewars.com/kata/58279e13c983ca4a2a00002a/train/javascript
