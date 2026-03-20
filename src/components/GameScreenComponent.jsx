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

export default function GameScreenComponent({
  board,
  gameMode,
  isRoundFinished,
  onFinalize,
  onNewRound,
  onReset,
  onSquareClick,
  players,
  result,
  status,
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
        <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
          <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-700">
            {gameMode === "quick" ? "Partida rapida" : "Partida multiple"}
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
                onClick={() => onSquareClick(index)}
                isHighlighted={Boolean(result?.line.includes(index))}
              />
            ))}
          </div>

          {isRoundFinished ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={onNewRound}
                type="button"
              >
                Nueva partida
              </button>
              <button
                className="inline-flex items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-slate-50 shadow-lg shadow-slate-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
                onClick={onFinalize}
                type="button"
              >
                Finalizar
              </button>
            </div>
          ) : (
            <button
              className="mt-6 inline-flex items-center justify-center rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={onReset}
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
