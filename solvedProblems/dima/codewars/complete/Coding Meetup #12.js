function findAdmin(list, lang) {
  return list.filter(
    (item) => item.language === lang && item.githubAdmin === "yes"
  );
}

//https://www.codewars.com/kata/582dace555a1f4d859000058/train/javascript
