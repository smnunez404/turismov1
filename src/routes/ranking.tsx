import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { participantesRanking } from "@/data/ranking";

export const Route = createFileRoute("/ranking")({
  head: () => ({ meta: [{ title: "Ranking Santa Cruz — Soy Embajador Bolivia" }] }),
  component: Ranking,
});

function Ranking() {
  const { usuario } = useSesion();
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const lista = [
    ...participantesRanking.map((p) => ({ ...p, puntaje: Math.max(20, p.puntaje - 180) })),
    {
      id: "yo",
      nombre: usuario.nombre || "Vos",
      avatarId: usuario.avatarId ?? "toborochi",
      puntaje: usuario.xp,
      zona: "Tu progreso",
      rachaDias: usuario.racha.dias,
    },
  ].sort((a, b) => b.puntaje - a.puntaje);

  const posicion = lista.findIndex((p) => p.id === "yo") + 1;
  const anterior = lista[posicion - 2];
  const faltan = anterior ? anterior.puntaje - usuario.xp + 1 : 0;

  // Podio Top 3
  const top1 = lista[0];
  const top2 = lista[1];
  const top3 = lista[2];

  // Resto de participantes (del 4 en adelante)
  const resto = lista.slice(3);
  const visibles = mostrarTodos ? resto : resto.slice(0, 4);
  const usuarioEnTop3 = posicion <= 3;

  return (
    <Pantalla conNav className="gap-4">
      {/* ── Tabs Superiores ── */}
      <nav aria-label="Vistas de competición" className="grid grid-cols-3 rounded-2xl bg-muted p-1 text-xs">
        <span className="rounded-xl bg-card px-2 py-2 text-center font-extrabold text-primary shadow-sm">
          Progreso XP
        </span>
        <Link
          to="/liga"
          className="rounded-xl px-2 py-2 text-center font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          Liga semanal
        </Link>
        <Link
          to="/equipos"
          className="rounded-xl px-2 py-2 text-center font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          Barrios
        </Link>
      </nav>

      {/* ── Tarjeta de Estado del Jugador + CTA directo ── */}
      <header className="game-panel p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="chapter-label">Ranking Santa Cruz</p>
            <h1 className="text-2xl font-extrabold text-foreground">Estás #{posicion}</h1>
            <p className="text-xs text-muted-foreground">
              {anterior
                ? `A ${faltan} XP de superar a ${anterior.nombre}`
                : "¡Estás en la cima de la tabla!"}
            </p>
          </div>
          <Link
            to="/partida"
            className="shrink-0 rounded-xl bg-primary px-4 py-2.5 text-xs font-extrabold text-primary-foreground uppercase shadow-sm transition-transform active:scale-95"
          >
            {faltan ? `+${faltan} XP` : "Jugar"}
          </Link>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 text-center text-xs">
          <div className="rounded-xl bg-muted/70 px-2 py-1.5">
            <strong className="block text-sm text-foreground">{lista.length}</strong>
            <span className="text-[11px] text-muted-foreground">exploradores</span>
          </div>
          <div className="rounded-xl bg-muted/70 px-2 py-1.5">
            <strong className="block text-sm text-foreground">{usuario.racha.dias} días</strong>
            <span className="text-[11px] text-muted-foreground">racha actual</span>
          </div>
        </div>
      </header>

      {/* ── PODIO VISUAL TOP 3 ── */}
      <section aria-label="Podio de líderes" className="card-duo p-3.5 pt-4">
        <p className="mb-2 text-center text-[11px] font-bold tracking-widest text-secondary uppercase">
          Líderes de la ciudad
        </p>
        <div className="grid grid-cols-3 items-end gap-2 text-center">
          {/* 2do Lugar (Plata) */}
          {top2 && (
            <div className="flex flex-col items-center">
              <div className="relative mb-1">
                <AvatarInsignia
                  semilla={top2.id === "yo" ? null : top2.nombre}
                  avatar={top2.id === "yo" ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 text-[10px] font-black text-slate-800 shadow">
                  2
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-bold text-foreground">
                {top2.id === "yo" ? "Vos" : top2.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {top2.puntaje} XP
              </span>
              <div className="mt-2 h-12 w-full rounded-t-lg bg-slate-200/80 dark:bg-slate-700/60" />
            </div>
          )}

          {/* 1er Lugar (Oro) */}
          {top1 && (
            <div className="flex flex-col items-center">
              <span className="mb-0.5 text-xs font-bold text-accent">👑</span>
              <div className="relative mb-1">
                <AvatarInsignia
                  semilla={top1.id === "yo" ? null : top1.nombre}
                  avatar={top1.id === "yo" ? usuario.avatar : null}
                  tamano="md"
                />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-black text-accent-foreground shadow">
                  1
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-extrabold text-foreground">
                {top1.id === "yo" ? "Vos" : top1.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-extrabold text-accent-foreground">
                {top1.puntaje} XP
              </span>
              <div className="mt-2 h-16 w-full rounded-t-lg bg-accent/30 dark:bg-accent/20 border-t-2 border-accent" />
            </div>
          )}

          {/* 3er Lugar (Bronce) */}
          {top3 && (
            <div className="flex flex-col items-center">
              <div className="relative mb-1">
                <AvatarInsignia
                  semilla={top3.id === "yo" ? null : top3.nombre}
                  avatar={top3.id === "yo" ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-black text-white shadow">
                  3
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-bold text-foreground">
                {top3.id === "yo" ? "Vos" : top3.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {top3.puntaje} XP
              </span>
              <div className="mt-2 h-8 w-full rounded-t-lg bg-amber-600/20 dark:bg-amber-800/40" />
            </div>
          )}
        </div>
      </section>

      {/* ── TABLA COMPACTA (Puestos 4 en adelante) ── */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Clasificación general
          </h2>
          <span className="text-[11px] font-bold text-muted-foreground">
            Puestos 4 a {lista.length}
          </span>
        </div>

        <ol className="flex flex-col gap-1.5">
          {visibles.map((p, idx) => {
            const numPuesto = idx + 4;
            const yo = p.id === "yo";
            return (
              <li
                key={p.id}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-colors ${
                  yo ? "border-primary bg-primary/8 shadow-sm" : "border-border bg-card"
                }`}
              >
                <span
                  className={`w-5 text-center text-xs font-extrabold ${yo ? "text-primary" : "text-muted-foreground"}`}
                >
                  {numPuesto}
                </span>
                <AvatarInsignia
                  semilla={yo ? null : p.nombre}
                  avatar={yo ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xs font-bold ${yo ? "text-primary font-extrabold" : "text-foreground"}`}
                  >
                    {p.nombre}
                    {yo && " · vos"}
                  </span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {p.zona} · racha de {p.rachaDias} d
                  </span>
                </span>
                <strong className={`text-xs ${yo ? "text-primary" : "text-foreground"}`}>
                  {p.puntaje} XP
                </strong>
              </li>
            );
          })}
        </ol>

        {/* Botón para expandir o colapsar la lista completa */}
        {resto.length > 4 && (
          <button
            type="button"
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <span>
              {mostrarTodos ? "Mostrar menos" : `Ver todos los ${lista.length} exploradores`}
            </span>
            <Icono nombre={mostrarTodos ? "arriba" : "abajo"} className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* ── Fila fija de "Tu lugar" (solo si estás colapsado fuera de la vista actual) ── */}
      {!usuarioEnTop3 && !mostrarTodos && posicion > 7 && (
        <div className="flex items-center gap-2.5 rounded-xl border-2 border-primary bg-primary/10 px-3 py-2 shadow-sm">
          <span className="w-5 text-center text-xs font-black text-primary">#{posicion}</span>
          <AvatarInsignia avatar={usuario.avatar} tamano="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-extrabold text-primary">
              {usuario.nombre || "Vos"} (Tu posición actual)
            </span>
            <span className="block truncate text-[10px] text-muted-foreground">
              A {faltan} XP de subir al puesto #{posicion - 1}
            </span>
          </span>
          <strong className="text-xs text-primary">{usuario.xp} XP</strong>
        </div>
      )}

      {/* ── Accesos inferiores ── */}
      <div className="pt-1">
        <Link to="/liga" className="btn-duo btn-duo-ghost text-xs">
          Ver liga semanal por divisiones
        </Link>
      </div>
    </Pantalla>
  );
}
