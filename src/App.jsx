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
      className={[
        "aspect-square rounded-[1.35rem] border border-slate-200/80 text-4xl font-black text-slate-900 shadow-[0_14px_30px_rgba(15,23,42,0.10)] transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(15,23,42,0.14)] focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50",
        isHighlighted
          ? "bg-linear-to-b from-amber-300 to-orange-400"
          : "bg-linear-to-b from-white to-slate-100",
      ].join(" ")}
      onClick={onClick}
      type="button"
    >
      {value}
    </button>
  );
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
    status = `Ganó ${players[result.winner]}`;
  } else if (isDraw) {
    status = "Empate";
  }

  if (view === "mode-select") {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

        <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
          <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
            <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-700">
              Juego clasico
            </p>
            <h1 className="text-5xl font-black tracking-tight sm:text-6xl">TaTeTi</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
              Elegí cómo querés comenzar.
            </p>
            <p className="mt-2 text-xs font-medium capitalize text-slate-500 sm:text-sm">
              {todayLabel}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={startQuickGame}
                type="button"
              >
                Partida rápida
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-slate-50 shadow-lg shadow-slate-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={startMultiGame}
                type="button"
              >
                Partida múltiple
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (view === "multi-setup") {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

        <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
          <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
            <h2 className="text-3xl font-black tracking-tight">Partida múltiple</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Completá los nombres o dejalos vacíos para usar los valores por defecto.
            </p>

            <div className="mt-6 grid gap-4 text-left">
              <label className="text-sm font-semibold text-slate-700">
                Nombre Jugador 1 (X)
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                  onChange={(event) =>
                    setNameInputs((current) => ({ ...current, playerOne: event.target.value }))
                  }
                  placeholder="Jugador 1"
                  type="text"
                  value={nameInputs.playerOne}
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Nombre Jugador 2 (O)
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                  onChange={(event) =>
                    setNameInputs((current) => ({ ...current, playerTwo: event.target.value }))
                  }
                  placeholder="Jugador 2"
                  type="text"
                  value={nameInputs.playerTwo}
                />
              </label>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={confirmPlayers}
                type="button"
              >
                Comenzar
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={resetAllState}
                type="button"
              >
                Cancelar
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (view === "summary") {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

        <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
          <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
            <h2 className="text-center text-3xl font-black tracking-tight">Tanteador final</h2>

            <div className="mt-6 grid gap-2 rounded-2xl bg-slate-900 px-5 py-4 text-sm font-bold text-slate-50">
              <p>{players.X}: {score.X}</p>
              <p>{players.O}: {score.O}</p>
              <p>Empates: {score.draws}</p>
            </div>

            <ul className="mt-5 max-h-56 space-y-2 overflow-y-auto pr-1 text-sm text-slate-700">
              {history.map((match) => (
                <li className="rounded-xl bg-white/90 px-4 py-3 shadow-sm" key={match.round}>
                  Partida {match.round}: {match.winnerSymbol ? `Ganó ${players[match.winnerSymbol]}` : "Empate"}
                </li>
              ))}
            </ul>

            <button
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={resetAllState}
              type="button"
            >
              Volver al inicio
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
        <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
          <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-700">
            {gameMode === "quick" ? "Partida rápida" : "Partida múltiple"}
          </p>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl">TaTeTi</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            {players.X} (X) vs {players.O} (O)
          </p>

          <div
            aria-live="polite"
            className="mt-6 rounded-full bg-slate-900 px-4 py-3 text-sm font-bold text-slate-50 shadow-lg shadow-slate-900/10 sm:text-base"
          >
            {status}
          </div>

          <div aria-label="Tablero de TaTeTi" className="mt-6 grid grid-cols-3 gap-3" role="grid">
            {board.map((value, index) => (
              <Square
                key={index}
                value={value}
                onClick={() => handleSquareClick(index)}
                isHighlighted={Boolean(result?.line.includes(index))}
              />
            ))}
          </div>

          {isRoundFinished ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={handleNewRound}
                type="button"
              >
                Nueva partida
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-slate-50 shadow-lg shadow-slate-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={handleFinalize}
                type="button"
              >
                Finalizar
              </button>
            </div>
          ) : (
            <button
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={resetAllState}
              type="button"
            >
              Volver al inicio
            </button>
          )}
        </div>
      </section>
    </main>
  );
}
