import { useState, useEffect } from "react";
import Board from "./Board";

const Game = () => {
  const [size, setSize] = useState({ rows: 3, columns: 3 });
  const [squares, setSquares] = useState(
    Array(size.rows * size.columns).fill(null)
  );
  const [xNext, setxNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [history, setHistory] = useState([{ value: "", row: "", col: "" }]);
  const currentSquares = history[history.length - 1];
  console.log(currentSquares);
  // Ham play
  function handlePlay(newSquares, row, col) {
    setHistory([...history, { squares: newSquares, position: { row, col } }]);
    setxNext(!xNext);
  }
  //Ham jump to
  function jumpTo(nextMove) {
    const newHistory = history.slice(0, nextMove + 1);
    const current = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    if (current) {
      setSquares(current.squares);
    } else {
      setSquares(Array(size.rows * size.columns).fill(null));
    }
    setxNext(nextMove % 2 === 0);
    setGameOver(false);
  }

  //Ham reset game
  function resetGame() {
    setHistory([{ value: "", row: "", col: "" }]);
    setSquares(Array(size.rows * size.columns).fill(null));
    setxNext(true);
    setGameOver(false);
  }

  // Ham luu posistion
  const moves = history.map((step, move) => {
    if (move === 0) {
      return null; // move = 0 ko render
    }
    const des =
      "Nhảy đến #" +
      move +
      " (vị trí: hàng " +
      step.position.row +
      ", cột " +
      step.position.col +
      ")";
    return (
      <li key={move} className="button-history">
        <button onClick={() => jumpTo(move)}>{des}</button>
      </li>
    );
  });

  // Update squares when size changes
  useEffect(() => {
    setSquares(Array(size.rows * size.columns).fill(null));
  }, [size]);

  // Handle size change
  const handleChange = (event) => {
    const newSize = { ...size };
    newSize[event.target.name] = parseInt(event.target.value);
    setSize(newSize);
  };

  // Handle click
  const handleClick = (i) => {
    if (gameOver || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xNext ? "X" : "O";
    //Check row + col
    const row = Math.floor(i / size.columns) + 1;
    const col = (i % size.columns) + 1;

    handlePlay(newSquares, row, col);
    setSquares(newSquares);
    setxNext(!xNext);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <span className="input-col-row">
        Cột
        <input
          type="number"
          name="rows"
          min={3}
          max={5}
          value={size.rows}
          onChange={handleChange}
        />
        Hàng
        <input
          type="number"
          name="columns"
          min={3}
          max={5}
          value={size.columns}
          onChange={handleChange}
        />
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span className="history">
          Lịch sử các bước:
          <ul>{moves}</ul>
        </span>
        <div
          className="game-board"
          style={{ gridTemplateColumns: `repeat(${size.columns}, 1fr)` }}
        >
          <Board
            xNext={xNext}
            size={size}
            squares={squares}
            gameOver={gameOver}
            setGameOver={setGameOver}
            onClick={handleClick}
            jumpto={jumpTo}
            handlePlay={handlePlay}
            resetGame={resetGame}
          />
          <hr />
          <button onClick={resetGame}>Reset Game</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Game;
