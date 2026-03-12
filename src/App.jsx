import React from "react";

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares) {
  for (const [a, b, c] of winningLines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }

  return null;
}

function Square({ value, onClick, isHighlighted }) {
  return (
    <button
      className={`square${isHighlighted ? " square--highlighted" : ""}`}
      onClick={onClick}
      type="button"
    >
      {value}
    </button>
  );
}

export default function App() {
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = React.useState(emptyBoard);
  const [isXNext, setIsXNext] = React.useState(true);

  const result = calculateWinner(board);
  const isDraw = !result && board.every(Boolean);

  function handleSquareClick(index) {
    if (board[index] || result) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext((current) => !current);
  }

  function handleReset() {
    setBoard(emptyBoard);
    setIsXNext(true);
  }

  let status = `Turno de ${isXNext ? "X" : "O"}`;

  if (result) {
    status = `Ganó ${result.winner}`;
  } else if (isDraw) {
    status = "Empate";
  }

  return (
    <main className="app">
      <section className="game-card">
        <p className="eyebrow">Juego clásico</p>
        <h1>TaTeTi</h1>
        <p className="description">
          Jugá una partida rápida en un tablero simple, centrado y fácil de usar.
        </p>

        <div className="status" aria-live="polite">
          {status}
        </div>

        <div className="board" role="grid" aria-label="Tablero de TaTeTi">
          {board.map((value, index) => (
            <Square
              key={index}
              value={value}
              onClick={() => handleSquareClick(index)}
              isHighlighted={Boolean(result?.line.includes(index))}
            />
          ))}
        </div>

        <button className="reset-button" onClick={handleReset} type="button">
          Reiniciar partida
        </button>
      </section>
    </main>
  );
}