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

export const emptyBoard = Array(9).fill(null);

export function calculateWinner(squares) {
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

export function createPlayers(mode, providedNames = {}) {
  if (mode === "quick") {
    return {
      X: "Jugador 1",
      O: "Jugador 2",
    };
  }

  return {
    X: providedNames.playerOne?.trim() || "Jugador 1",
    O: providedNames.playerTwo?.trim() || "Jugador 2",
  };
}

export function getUpdatedHistory(history, winnerSymbol) {
  return [
    ...history,
    {
      round: history.length + 1,
      winnerSymbol,
    },
  ];
}

export function getUpdatedScore(score, winnerSymbol) {
  if (winnerSymbol === "X") {
    return { ...score, X: score.X + 1 };
  }

  if (winnerSymbol === "O") {
    return { ...score, O: score.O + 1 };
  }

  return { ...score, draws: score.draws + 1 };
}

export function getNextStartingSymbol(startingSymbol) {
  return startingSymbol === "X" ? "O" : "X";
}
