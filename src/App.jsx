import React from "react";
import GameScreenComponent from "./components/GameScreenComponent";
import LandingComponent from "./components/LandingComponent";
import MultiplayerSetupComponent from "./components/MultiplayerSetupComponent";
import SummaryComponent from "./components/SummaryComponent";
import {
  calculateWinner,
  createPlayers,
  emptyBoard,
  getNextStartingSymbol,
  getUpdatedHistory,
  getUpdatedScore,
} from "./gameUtils";

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

  function recordRoundResult(winnerSymbol) {
    setHistory((current) => getUpdatedHistory(current, winnerSymbol));
    setScore((current) => getUpdatedScore(current, winnerSymbol));
  }

  function handleNewRound() {
    const winnerSymbol = result?.winner ?? null;
    recordRoundResult(winnerSymbol);

    const nextStartingSymbol = getNextStartingSymbol(startingSymbol);
    setStartingSymbol(nextStartingSymbol);
    setBoard(emptyBoard);
    setIsXNext(nextStartingSymbol === "X");
  }

  function handleFinalize() {
    if (isRoundFinished) {
      const winnerSymbol = result?.winner ?? null;
      recordRoundResult(winnerSymbol);
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
