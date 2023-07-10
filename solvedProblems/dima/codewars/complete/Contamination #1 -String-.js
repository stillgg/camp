function contamination(text, char) {
  let oldText = "";
  if (text.length === 0 || char.length === 0) return "";
  for (let i = 0; i < text.length; i++) {
    oldText += char;
  }
  return oldText;
}

//https://www.codewars.com/kata/596fba44963025c878000039/train/javascript
