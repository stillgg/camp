var snakesAndLadders = function (board, dice) {
  let square = 0;
  for (const die of dice) {
    if (square + die >= board.length) continue;

    square += die;
    console.log(board[square]);
    square += board[square];
  }
  return square;
};

//https://www.codewars.com/kata/5821cd4770ca285b1f0001d5/train/javascript
