// SPEC-14 — Perfil del usuario (P-14)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { participantesRanking } from "@/data/ranking";
import { avanceTemporada, misionesDeTemporada, nivelDe } from "@/lib/progreso";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Mi perfil de embajador — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Tu nivel, tus puntos, tus insignias y el avance de la Temporada 1 en un solo lugar.",
      },
      { property: "og:title", content: "Mi perfil de embajador" },
      {
        property: "og:description",
        content: "Nivel, puntos, insignias y progreso de temporada.",
      },
    ],
  }),
  component: Perfil,
});

function Perfil() {
  const { usuario } = useSesion();
  const nivel = nivelDe(usuario.puntos);
  const avance = avanceTemporada("t1", usuario);
  const misiones = misionesDeTemporada("t1");
  const posicion =
    participantesRanking.filter((p) => p.puntaje > usuario.puntos).length + 1;

  return (
    <Pantalla className="gap-6 pb-12">
      <header className="flex flex-col items-center gap-3 rounded-2xl bg-card p-6 text-center shadow-sm">
        <AvatarInsignia avatarId={usuario.avatarId} tamano="lg" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {usuario.nombre || "Embajador"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {usuario.correo || "Perfil del prototipo"}
          </p>
        </div>
        <div className="flex w-full justify-center gap-2">
          <span className="rounded-full bg-accent/25 px-3 py-1 text-sm font-semibold text-accent-foreground">
            {usuario.puntos} pts
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            Nivel {nivel.indice} · {nivel.nombre}
          </span>
          <span className="rounded-full bg-secondary/15 px-3 py-1 text-sm font-semibold text-secondary">
            #{posicion} del ranking
          </span>
        </div>
        <div className="w-full text-left">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progreso de nivel</span>
            <span>
              {nivel.siguiente
                ? `Faltan ${nivel.faltan} pts para ${nivel.siguiente.nombre}`
                : "Nivel máximo"}
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-accent transition-all"
              style={{ width: `${nivel.porcentaje}%` }}
            />
          </div>
        </div>
      </header>

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Temporada 1 · Descubre Santa Cruz</span>
          <span>
            {avance.completadas} de {avance.total} misiones
          </span>
        </div>
        <div className="mt-1.5 h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${avance.porcentaje}%` }}
          />
        </div>
        <ul className="mt-4 flex flex-col gap-2">
          {misiones.map((m) => {
            const p = usuario.progreso[m.id];
            return (
              <li
                key={m.id}
                className="flex items-center justify-between text-sm text-foreground"
              >
                <span className={p?.completada ? "" : "text-muted-foreground"}>
                  {p?.completada ? "✓" : "○"} {m.nombre}
                </span>
                <span className="text-xs text-muted-foreground">
                  {p?.completada ? `${p.puntos} pts` : "—"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Insignias ({usuario.insignias.length}/{insignias.length})
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {insignias.map((i) => {
            const obtenida = usuario.insignias.includes(i.id);
            return (
              <li
                key={i.id}
                className={`rounded-2xl border p-4 ${
                  obtenida
                    ? "border-accent bg-accent/15"
                    : "border-border bg-muted/50 opacity-60 grayscale"
                }`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {i.icono}
                </span>
                <p className="mt-1 text-sm font-bold text-foreground">{i.nombre}</p>
                <p className="text-xs text-muted-foreground">
                  {obtenida ? i.descripcion : i.criterio}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="flex flex-col gap-2 text-center">
        <Link
          to="/temporadas"
          className="rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Seguir jugando
        </Link>
        <Link to="/ranking" className="text-sm text-muted-foreground underline underline-offset-4">
          Ver el ranking
        </Link>
      </div>
    </Pantalla>
  );
}
