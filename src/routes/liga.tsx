// SPEC-26 — Liga semanal con divisiones (P-24). Reemplaza al ranking fijo como pantalla competitiva.
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { obtenerAuspiciador, premios } from "@/data/auspiciadores";
import { divisionDe, tablaLiga } from "@/lib/juego";

export const Route = createFileRoute("/liga")({
  head: () => ({
    meta: [
      { title: "Liga semanal — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Explorá una liga de práctica: subí de división y conocé beneficios ilustrativos.",
      },
      { property: "og:title", content: "Liga semanal — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Divisiones y clasificación sintética para representar una competencia semanal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Liga,
});

function Liga() {
  const { usuario } = useSesion();
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const tabla = tablaLiga(usuario);
  const posicion = tabla.findIndex((participante) => participante.esUsuario) + 1;
  const division = divisionDe(usuario.puntosLiga);
  const premioLiga = premios.find((p) => p.auspiciadorId === "a-cine")!;
  const auspiciador = obtenerAuspiciador(premioLiga.auspiciadorId);

  // Podio Top 3 de la liga
  const top1 = tabla[0];
  const top2 = tabla[1];
  const top3 = tabla[2];

  // Resto de participantes (del puesto 4 en adelante)
  const resto = tabla.slice(3);
  const visibles = mostrarTodos ? resto : resto.slice(0, 4);
  const usuarioEnTop3 = posicion <= 3;
  const usuarioDatos = tabla[posicion - 1];

  return (
    <Pantalla conNav className="gap-4">
      {/* ── Tabs Superiores ── */}
      <nav aria-label="Vistas de competición" className="grid grid-cols-3 rounded-2xl bg-muted p-1 text-xs">
        <Link
          to="/ranking"
          className="rounded-xl px-2 py-2 text-center font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          Progreso XP
        </Link>
        <span className="rounded-xl bg-card px-2 py-2 text-center font-extrabold text-primary shadow-sm">
          Liga semanal
        </span>
        <Link
          to="/equipos"
          className="rounded-xl px-2 py-2 text-center font-bold text-muted-foreground hover:text-foreground transition-colors"
        >
          Barrios
        </Link>
      </nav>

      {/* ── Header de División y Posición ── */}
      <header className="game-panel p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="chapter-label">Liga de práctica · Ciclo semanal</p>
            <h1 className="text-2xl font-extrabold text-foreground">{division.actual.nombre}</h1>
            <p className="text-xs text-muted-foreground">
              {division.siguiente
                ? `Te faltan ${Math.max(0, division.faltan)} pts para ascender a ${division.siguiente.nombre}`
                : "¡Estás en la división más alta!"}
            </p>
          </div>
          <span className="shrink-0 rounded-xl bg-primary/10 px-3 py-2 text-xs font-black text-primary">
            Puesto #{posicion}
          </span>
        </div>
      </header>

      {/* ── Tarjeta de Premio Semanal Compacta ── */}
      {auspiciador && (
        <section className="card-duo flex items-center gap-3 p-3">
          <IconoPastilla nombre={auspiciador.icono} tono="accent" className="h-8 w-8" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold tracking-widest text-secondary uppercase">
              Premio semanal para el Top 3
            </p>
            <p className="text-xs font-extrabold text-foreground truncate">{premioLiga.titulo}</p>
            <p className="text-[11px] text-muted-foreground truncate">
              Cortesía de {auspiciador.nombre}
            </p>
          </div>
        </section>
      )}

      {/* ── PODIO VISUAL TOP 3 (Zona de premio) ── */}
      <section aria-label="Podio de la liga" className="card-duo p-3.5 pt-4">
        <p className="mb-2 text-center text-[11px] font-bold tracking-widest text-secondary uppercase">
          Zona de premio semanal (Top 3)
        </p>
        <div className="grid grid-cols-3 items-end gap-2 text-center">
          {/* 2do Lugar (Plata) */}
          {top2 && (
            <div className="flex flex-col items-center">
              <div className="relative mb-1">
                <AvatarInsignia
                  semilla={top2.esUsuario ? null : top2.nombre}
                  avatar={top2.esUsuario ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-300 text-[10px] font-black text-slate-800 shadow">
                  2
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-bold text-foreground">
                {top2.esUsuario ? "Vos" : top2.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {top2.puntos} pts
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
                  semilla={top1.esUsuario ? null : top1.nombre}
                  avatar={top1.esUsuario ? usuario.avatar : null}
                  tamano="md"
                />
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-black text-accent-foreground shadow">
                  1
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-extrabold text-foreground">
                {top1.esUsuario ? "Vos" : top1.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-extrabold text-accent-foreground">
                {top1.puntos} pts
              </span>
              <div className="mt-2 h-16 w-full rounded-t-lg bg-accent/30 dark:bg-accent/20 border-t-2 border-accent" />
            </div>
          )}

          {/* 3er Lugar (Bronce) */}
          {top3 && (
            <div className="flex flex-col items-center">
              <div className="relative mb-1">
                <AvatarInsignia
                  semilla={top3.esUsuario ? null : top3.nombre}
                  avatar={top3.esUsuario ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-black text-white shadow">
                  3
                </span>
              </div>
              <p className="max-w-full truncate text-xs font-bold text-foreground">
                {top3.esUsuario ? "Vos" : top3.nombre}
              </p>
              <span className="mt-0.5 rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                {top3.puntos} pts
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
            Clasificación semanal
          </h2>
          <span className="text-[11px] font-bold text-muted-foreground">
            Puestos 4 a {tabla.length}
          </span>
        </div>

        <ol className="flex flex-col gap-1.5">
          {visibles.map((p, idx) => {
            const numPuesto = idx + 4;
            return (
              <li
                key={p.id}
                className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-colors ${
                  p.esUsuario ? "border-primary bg-primary/8 shadow-sm" : "border-border bg-card"
                }`}
              >
                <span
                  className={`w-5 text-center text-xs font-extrabold ${p.esUsuario ? "text-primary" : "text-muted-foreground"}`}
                >
                  {numPuesto}
                </span>
                <AvatarInsignia
                  semilla={p.esUsuario ? null : p.nombre}
                  avatar={p.esUsuario ? usuario.avatar : null}
                  tamano="sm"
                />
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-xs font-bold ${p.esUsuario ? "text-primary font-extrabold" : "text-foreground"}`}
                  >
                    {p.nombre}
                    {p.esUsuario && " (vos)"}
                  </span>
                  <span className="block truncate text-[10px] text-muted-foreground">
                    {p.zona} · racha de {p.rachaDias} d
                  </span>
                </span>
                <span
                  className={`text-xs font-extrabold ${p.esUsuario ? "text-primary" : "text-foreground"}`}
                >
                  {p.puntos} pts
                </span>
              </li>
            );
          })}
        </ol>

        {/* Botón expandir/colapsar */}
        {resto.length > 4 && (
          <button
            type="button"
            onClick={() => setMostrarTodos(!mostrarTodos)}
            className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            <span>
              {mostrarTodos ? "Mostrar menos" : `Ver todos los ${tabla.length} participantes`}
            </span>
            <Icono nombre={mostrarTodos ? "arriba" : "abajo"} className="h-3.5 w-3.5" />
          </button>
        )}
      </section>

      {/* ── Fila de "Tu posición" (si estás colapsado fuera del Top visible) ── */}
      {!usuarioEnTop3 && !mostrarTodos && posicion > 7 && usuarioDatos && (
        <div className="flex items-center gap-2.5 rounded-xl border-2 border-primary bg-primary/10 px-3 py-2 shadow-sm">
          <span className="w-5 text-center text-xs font-black text-primary">#{posicion}</span>
          <AvatarInsignia avatar={usuario.avatar} tamano="sm" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-extrabold text-primary">
              {usuario.nombre || "Vos"} (Tu posición)
            </span>
            <span className="block truncate text-[10px] text-muted-foreground">
              {division.actual.nombre} · {usuarioDatos.zona}
            </span>
          </span>
          <strong className="text-xs text-primary">{usuarioDatos.puntos} pts</strong>
        </div>
      )}

      {/* ── Accesos inferiores ── */}
      <div className="grid gap-2 pt-1">
        <Link to="/equipos" className="btn-duo btn-duo-ghost text-xs">
          Ver la liga de equipos por barrio
        </Link>
      </div>
    </Pantalla>
  );
}
