export default function SummaryComponent({ history, onRestart, players, score }) {
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
                Partida {match.round}: {match.winnerSymbol ? `Gano ${players[match.winnerSymbol]}` : "Empate"}
              </li>
            ))}
          </ul>

          <button
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
            onClick={onRestart}
            type="button"
          >
            Volver al inicio
          </button>
        </div>
      </section>
    </main>
  );
}
