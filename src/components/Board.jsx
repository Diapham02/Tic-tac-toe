import Square from "./Squares";
//check winner
function checkWin(squares, size) {
  const board = []; //Khoi tao 1 mảng rỗng để so sánh
  //Chuyen tu mang 1 chieu sang 2 chieu de so sanh vi tri tu (i * size.columns den (i + 1) * size.columns)
  for (let i = 0; i < size.rows; i++) {
    board[i] = squares.slice(i * size.columns, (i + 1) * size.columns);
  }
  // Check hàng 3 gia tri gan nhau
  for (let i = 0; i < size.rows; i++) {
    for (let j = 0; j < size.columns - 2; j++) {
      if (
        board[i][j] &&
        board[i][j] === board[i][j + 1] &&
        board[i][j] === board[i][j + 2]
      ) {
        // Neu tim thay 3 gia tri lien tiep giong nhau trả về gia tri do
        return board[i][j];
      }
    }
  }
  // Check cột 3 gia tri gan nhau
  // Duyet tung cot cua bang
  for (let i = 0; i < size.columns; i++) {
    //Tung hang cua cot
    for (let j = 0; j < size.rows - 2; j++) {
      if (
        board[j][i] &&
        board[j][i] === board[j + 1][i] &&
        board[j][i] === board[j + 2][i]
      ) {
        //Trả về giá trị của ô đang được kiểm tra nếu tìm thấy một chuỗi ba ô liên tiếp giống nhau
        return board[j][i];
      }
    }
  }
  //Check duong cheo 3 gia tri gan nhau
  //kiểm tra hai đường chéo từ trên xuống dưới
  for (let i = 0; i < size.rows - 2; i++) {
    for (let j = 0; j < size.columns - 2; j++) {
      // trên trái -> dưới phải
      if (
        board[i][j] &&
        board[i][j] === board[i + 1][j + 1] &&
        board[i][j] === board[i + 2][j + 2]
      ) {
        return board[i][j];
      }
      // Trên phải -> dưới trái
      if (
        board[i][j + 2] &&
        board[i][j + 2] === board[i + 1][j + 1] &&
        board[i][j + 2] === board[i + 2][j]
      ) {
        return board[i][j + 2];
      }
    }
  }

  //Check hòa nếu tất cả các ô đều được đánh
  const hoa = squares.every((square) => square !== null);
  if (hoa) {
    return "Hòa";
  }
  return null;
}

//Render square với tham số (i) trả về Square với key và value là (i)
const Board = ({ size, squares, onClick, xNext, gameOver, setGameOver }) => {
  //Square nhận value là giá trị click vào
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
  //Duyệt qua từng hàng dựa trên số lượng hàng
  for (let i = 0; i < size.rows; i++) {
    //Tạo mảng rỗng để chứa Square của hàng
    let row = [];
    //Lặp 2 để duyệt từng cột, mỗi lần lặp thì hàm render được gọi với i*size.col
    for (let j = 0; j < size.columns; j++) {
      row.push(renderSquare(i * size.columns + j)); //push kết quả vào row
    }
    board.push(
      //tạo thẻ div với key là i, sau đó thẻ div được thêm vào mảng board
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
