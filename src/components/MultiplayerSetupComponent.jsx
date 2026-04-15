import React from "react";
import { getPreloadedUsers } from "../api/users";

export default function MultiplayerSetupComponent({
  nameInputs,
  onCancel,
  onConfirm,
  onNameChange,
}) {
  const [activePlayerField, setActivePlayerField] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const preloadedUsers = getPreloadedUsers();
  const excludedUser =
    activePlayerField === "playerOne" ? nameInputs.playerTwo : nameInputs.playerOne;

  const filteredUsers = preloadedUsers.filter((user) =>
    user !== excludedUser && user.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  function openUserModal(field) {
    setActivePlayerField(field);
    setSearchTerm("");
  }

  function closeUserModal() {
    setActivePlayerField(null);
    setSearchTerm("");
  }

  function selectUser(userName) {
    if (!activePlayerField) {
      return;
    }

    onNameChange(activePlayerField, userName);
    closeUserModal();
  }

  const isModalOpen = Boolean(activePlayerField);
  const activePlayerLabel = activePlayerField === "playerTwo" ? "Jugador 2" : "Jugador 1";

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
              <div className="mt-2 flex gap-2">
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                  onChange={(event) => onNameChange("playerOne", event.target.value)}
                  placeholder="Jugador 1"
                  type="text"
                  value={nameInputs.playerOne}
                />
                <button
                  aria-label="Buscar usuario precargado para Jugador 1"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-lg font-black text-slate-700 shadow-sm transition hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20"
                  onClick={() => openUserModal("playerOne")}
                  type="button"
                >
                  ...
                </button>
              </div>
            </label>

            <label className="text-sm font-semibold text-slate-700">
              Nombre Jugador 2 (O)
              <div className="mt-2 flex gap-2">
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
                  onChange={(event) => onNameChange("playerTwo", event.target.value)}
                  placeholder="Jugador 2"
                  type="text"
                  value={nameInputs.playerTwo}
                />
                <button
                  aria-label="Buscar usuario precargado para Jugador 2"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 text-lg font-black text-slate-700 shadow-sm transition hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20"
                  onClick={() => openUserModal("playerTwo")}
                  type="button"
                >
                  ...
                </button>
              </div>
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

      {isModalOpen ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-[1.75rem] border border-white/70 bg-white p-6 shadow-[0_32px_70px_rgba(15,23,42,0.24)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tight text-slate-900">
                  Seleccionar usuario
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Elegi un usuario precargado para {activePlayerLabel}.
                </p>
              </div>
              <button
                aria-label="Cerrar selector de usuarios"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-lg font-bold text-slate-700 transition hover:bg-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-900/20"
                onClick={closeUserModal}
                type="button"
              >
                x
              </button>
            </div>

            <input
              autoFocus
              className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-amber-600 focus:ring-2 focus:ring-amber-500/30"
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Buscar usuario precargado"
              type="text"
              value={searchTerm}
            />

            <div className="mt-5 grid max-h-72 grid-cols-2 gap-3 overflow-y-auto pr-1 sm:grid-cols-3">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <button
                    className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-amber-400 hover:bg-amber-50 hover:text-amber-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/25"
                    key={user}
                    onClick={() => selectUser(user)}
                    type="button"
                  >
                    {user}
                  </button>
                ))
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No hay usuarios que coincidan con la busqueda.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
