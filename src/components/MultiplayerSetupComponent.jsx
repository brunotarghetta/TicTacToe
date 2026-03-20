export default function MultiplayerSetupComponent({
  nameInputs,
  onCancel,
  onConfirm,
  onNameChange,
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(160deg,#f6efe6_0%,#d8e8f2_100%)] px-6 py-10 text-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),rgba(255,255,255,0)_35%)]" />

      <section className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-md place-items-center">
        <div className="w-full rounded-[2rem] border border-white/60 bg-white/75 p-7 text-center shadow-[0_24px_60px_rgba(15,23,42,0.16)] backdrop-blur md:p-8">
          <h2 className="text-3xl font-black tracking-tight">Partida multiple</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Completa los nombres o dejalos vacios para usar los valores por defecto.
          </p>

          <div className="mt-6 grid gap-4 text-left">
            <label className="text-sm font-semibold text-slate-700">
              Nombre Jugador 1 (X)
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                onChange={(event) => onNameChange("playerOne", event.target.value)}
                placeholder="Jugador 1"
                type="text"
                value={nameInputs.playerOne}
              />
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Nombre Jugador 2 (O)
              <input
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                onChange={(event) => onNameChange("playerTwo", event.target.value)}
                placeholder="Jugador 2"
                type="text"
                value={nameInputs.playerTwo}
              />
            </label>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={onConfirm}
              type="button"
            >
              Comenzar
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 shadow-lg shadow-slate-900/5 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={onCancel}
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
