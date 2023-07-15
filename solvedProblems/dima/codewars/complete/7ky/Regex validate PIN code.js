function validatePIN(pin) {
  if (pin.length === 4 || pin.length === 6) {
    const reg = /^\d+$/;
    if (reg.test(pin)) {
      return true;
    } else true;
  }
  return false;
}

//https://www.codewars.com/kata/55f8a9c06c018a0d6e000132
