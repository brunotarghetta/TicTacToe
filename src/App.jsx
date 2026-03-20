import React from "react";
import GameScreenComponent from "./components/GameScreenComponent";
import LandingComponent from "./components/LandingComponent";
import MultiplayerSetupComponent from "./components/MultiplayerSetupComponent";
import SummaryComponent from "./components/SummaryComponent";

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

const emptyBoard = Array(9).fill(null);

function createPlayers(mode, providedNames = {}) {
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

export default function App() {
  const [view, setView] = React.useState("mode-select");
  const [gameMode, setGameMode] = React.useState(null);
  const [nameInputs, setNameInputs] = React.useState({ playerOne: "", playerTwo: "" });
  const [players, setPlayers] = React.useState(createPlayers("quick"));
  const [board, setBoard] = React.useState(emptyBoard);
  const [startingSymbol, setStartingSymbol] = React.useState("X");
  const [isXNext, setIsXNext] = React.useState(true);
  const [score, setScore] = React.useState({ X: 0, O: 0, draws: 0 });
  const [history, setHistory] = React.useState([]);

  const todayLabel = new Intl.DateTimeFormat("es-AR", {
    dateStyle: "full",
  }).format(new Date());

  const result = calculateWinner(board);
  const isDraw = !result && board.every(Boolean);
  const isRoundFinished = Boolean(result || isDraw);

  function resetAllState() {
    setBoard(emptyBoard);
    setStartingSymbol("X");
    setIsXNext(true);
    setScore({ X: 0, O: 0, draws: 0 });
    setHistory([]);
    setNameInputs({ playerOne: "", playerTwo: "" });
    setPlayers(createPlayers("quick"));
    setGameMode(null);
    setView("mode-select");
  }

  function startQuickGame() {
    setGameMode("quick");
    setPlayers(createPlayers("quick"));
    setBoard(emptyBoard);
    setStartingSymbol("X");
    setIsXNext(true);
    setScore({ X: 0, O: 0, draws: 0 });
    setHistory([]);
    setView("game");
  }

  function startMultiGame() {
    setGameMode("multi");
    setView("multi-setup");
  }

  function handleNameInputChange(field, value) {
    setNameInputs((current) => ({ ...current, [field]: value }));
  }

  function confirmPlayers() {
    setPlayers(createPlayers("multi", nameInputs));
    setBoard(emptyBoard);
    setStartingSymbol("X");
    setIsXNext(true);
    setScore({ X: 0, O: 0, draws: 0 });
    setHistory([]);
    setView("game");
  }

  function handleSquareClick(index) {
    if (board[index] || isRoundFinished) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = isXNext ? "X" : "O";
    setBoard(nextBoard);
    setIsXNext((current) => !current);
  }

  function handleNewRound() {
    const winnerSymbol = result?.winner ?? null;

    setHistory((current) => [
      ...current,
      {
        round: current.length + 1,
        winnerSymbol,
      },
    ]);

    if (winnerSymbol === "X") {
      setScore((current) => ({ ...current, X: current.X + 1 }));
    } else if (winnerSymbol === "O") {
      setScore((current) => ({ ...current, O: current.O + 1 }));
    } else {
      setScore((current) => ({ ...current, draws: current.draws + 1 }));
    }

    const nextStartingSymbol = startingSymbol === "X" ? "O" : "X";
    setStartingSymbol(nextStartingSymbol);
    setBoard(emptyBoard);
    setIsXNext(nextStartingSymbol === "X");
  }

  function handleFinalize() {
    if (isRoundFinished) {
      const winnerSymbol = result?.winner ?? null;
      setHistory((current) => [
        ...current,
        {
          round: current.length + 1,
          winnerSymbol,
        },
      ]);

      if (winnerSymbol === "X") {
        setScore((current) => ({ ...current, X: current.X + 1 }));
      } else if (winnerSymbol === "O") {
        setScore((current) => ({ ...current, O: current.O + 1 }));
      } else {
        setScore((current) => ({ ...current, draws: current.draws + 1 }));
      }
    }

    setView("summary");
  }

  let status = `Turno de ${isXNext ? players.X : players.O}`;

  if (result) {
    status = `Gano ${players[result.winner]}`;
  } else if (isDraw) {
    status = "Empate";
  }

  if (view === "mode-select") {
    return (
      <LandingComponent
        onMultiGame={startMultiGame}
        onQuickGame={startQuickGame}
        todayLabel={todayLabel}
      />
    );
  }

  if (view === "multi-setup") {
    return (
      <MultiplayerSetupComponent
        nameInputs={nameInputs}
        onCancel={resetAllState}
        onConfirm={confirmPlayers}
        onNameChange={handleNameInputChange}
      />
    );
  }

  if (view === "summary") {
    return (
      <SummaryComponent
        history={history}
        onRestart={resetAllState}
        players={players}
        score={score}
      />
    );
  }

  return (
    <GameScreenComponent
      board={board}
      gameMode={gameMode}
      isRoundFinished={isRoundFinished}
      onFinalize={handleFinalize}
      onNewRound={handleNewRound}
      onReset={resetAllState}
      onSquareClick={handleSquareClick}
      players={players}
      result={result}
      status={status}
    />
  );
}
