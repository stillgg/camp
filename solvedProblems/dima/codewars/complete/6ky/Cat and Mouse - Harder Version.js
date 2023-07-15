function catMouse(x, j) {
  if (!(x.includes("C") && x.includes("D") && x.includes("m"))) {
    return "boring without all three";
  }
  const board = Array.from(x);
  console.log(board);
  let isDog = false;
  const jump = j;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "C" || board[i] === "m") {
      const newBoard = board.slice(i, board.length);

      for (let k = 1; k <= jump; k++) {
        if (newBoard[k] === "D") isDog = true;
        if (newBoard[k] === "C" || newBoard[k] === "m") {
          return isDog ? "Protected!" : "Caught!";
        }
      }
    }
  }
  return "Escaped!";
}

//https://www.codewars.com/kata/57ee2a1b7b45efcf700001bf/train/javascript
