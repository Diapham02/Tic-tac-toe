function Square(props) {
  return (
    <button
      className={`square ${props.value} ${props.isWinning ? 'winning' : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

export default Square;
