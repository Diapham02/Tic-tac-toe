import Square from "./Squares";
// Function to check if there is a winner
function checkWin(squares, size) {
  const board = [];
  for (let i = 0; i < size.rows; i++) {
    board[i] = squares.slice(i * size.columns, (i + 1) * size.columns);
  }
  // Check rows
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns - 2; j++) {
      if (
        board[i][j] &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2]
      ) {
        return board[i][j];
      }
    }
  }
  // Check columns
  for (let i = 0; i < size.columns; i++) {
    for (let j = 0; j < size.rows - 2; j++) {
      if (
        board[j][i] &&
        board[j][i] === board[j + 1][i] &&
        board[j][i] === board[j + 2][i]
      ) {
        return board[j][i];
      }
    }
  }
  // Check diagonals
  for (let i = 0; i < size.rows - 2; i++) {
    for (let j = 0; j < size.columns - 2; j++) {
      // Top-left to bottom-right
      if (
        board[i][j] &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2]
      ) {
        return board[i][j];
      }
      // Top-right to bottom-left
      if (
        board[i][j + 2] &&
        board[i][j + 2] === board[i + 1][j + 1] &&
        board[i][j + 2] === board[i + 2][j]
      ) {
        return board[i][j + 2];
      }
    }
  }

  //Check hoa
  const hoa = squares.every((square) => square !== null);
  if (hoa) {
    return "Hòa";
  }
  return null;
}

const Board = ({ size, squares, onClick, xNext, gameOver, setGameOver }) => {
  //render a square
  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
  };

  // Check for a winner
  const winner = checkWin(squares, size);
  if (winner && !gameOver) {
    setGameOver(true);
  }

  //Tao status
  let status;
  xNext = !xNext;
  if (winner) {
    if (winner === "Hòa") {
      status = "Hòa";
    } else {
      status = "Người thắng là: " + winner;
    }
  } else {
    status = "Người tiếp theo: " + (xNext ? "O" : "X");
  }

  // Render the board
  let board = [];
  for (let i = 0; i < size.rows; i++) {
    let row = [];
    for (let j = 0; j < size.columns; j++) {
      row.push(renderSquare(i * size.columns + j));
    }
    board.push(
      <div key={i} className="board-row">
        {row}
      </div>
    );
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div>{board}</div>
    </div>
  );
};

export default Board;
