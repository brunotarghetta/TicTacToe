import React from "react";

export default function LandingComponent({ todayLabel, onQuickGame, onMultiGame }) {
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
            Elegi como queres comenzar.
          </p>
          <p className="mt-2 text-xs font-medium capitalize text-slate-500 sm:text-sm">
            {todayLabel}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <button
              className="inline-flex items-center justify-center rounded-full bg-amber-700 px-6 py-3 text-sm font-bold text-amber-50 shadow-lg shadow-amber-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-amber-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={onQuickGame}
              type="button"
            >
              Partida rapida
            </button>
            <button
              className="inline-flex items-center justify-center rounded-full bg-slate-800 px-6 py-3 text-sm font-bold text-slate-50 shadow-lg shadow-slate-900/10 transition duration-150 hover:-translate-y-0.5 hover:bg-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20 sm:text-base"
              onClick={onMultiGame}
              type="button"
            >
              Partida multiple
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
