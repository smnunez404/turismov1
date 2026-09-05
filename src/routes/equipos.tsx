// SPEC-27 — Equipos por zona (P-25): elegí tu barrio y sumá al marcador colectivo.
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { tablaEquipos } from "@/lib/juego";

export const Route = createFileRoute("/equipos")({
  head: () => ({
    meta: [
      { title: "Equipos por zona — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Elegí tu zona de Santa Cruz y sumá tus puntos al marcador colectivo de la semana.",
      },
      { property: "og:title", content: "Equipos por zona — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Centro, Equipetrol, Plan 3000, Villa 1ro de Mayo, Urubó y Pampa de la Isla.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Equipos,
});

function Equipos() {
  const { usuario, actualizar } = useSesion();
  const tabla = tablaEquipos(usuario);
  const mio = tabla.find((e) => e.esMio) ?? null;

  return (
    <Pantalla conNav className="gap-4">
      {/* ── Tabs Superiores ── */}
      <nav aria-label="Vistas de competición" className="grid grid-cols-3 rounded-2xl bg-muted p-1 text-xs sm:text-sm">
        <Link
          to="/ranking"
          className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center font-bold text-muted-foreground hover:bg-card/50 hover:text-foreground transition-all"
        >
          <Icono nombre="ranking" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">Progreso XP</span>
        </Link>
        <Link
          to="/liga"
          className="flex items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-center font-bold text-muted-foreground hover:bg-card/50 hover:text-foreground transition-all"
        >
          <Icono nombre="liga" className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="truncate">Liga semanal</span>
        </Link>
        <span className="flex items-center justify-center gap-1.5 rounded-xl bg-card px-2 py-2.5 text-center font-extrabold text-primary shadow-xs">
          <Icono nombre="ciudad" className="h-4 w-4 shrink-0 text-primary" />
          <span className="truncate">Barrios</span>
        </span>
      </nav>

      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Liga de barrios
        </p>
        <h1 className="text-2xl font-extrabold text-foreground">Jugá por tu zona</h1>
        <p className="text-sm text-muted-foreground">
          Todo lo que ganás en misiones, ruleta y duelos suma al marcador de tu equipo.
        </p>
      </header>

      {mio && (
        <section className="card-duo card-duo-activa flex items-center gap-3 p-4">
          <IconoPastilla nombre={mio.icono} tono="primary" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-extrabold text-foreground">{mio.nombre}</p>
            <p className="text-xs text-muted-foreground">
              Tu aporte esta semana: {usuario.puntosLiga} pts · {mio.integrantes} embajadores
            </p>
          </div>
          <button
            type="button"
            onClick={() => actualizar({ equipoId: null })}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-xl border border-border bg-card px-3 text-xs sm:text-sm font-extrabold text-muted-foreground hover:bg-muted hover:text-foreground transition-all shadow-2xs cursor-pointer"
          >
            <Icono nombre="amigos" className="h-3.5 w-3.5" />
            <span>Cambiar</span>
          </button>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          {mio ? "Marcador de la semana" : "Elegí tu equipo"}
        </h2>
        <ol className="grid gap-2">
          {tabla.map((e, i) => (
            <li key={e.id}>
              <button
                type="button"
                onClick={() => actualizar({ equipoId: e.id })}
                className={`card-duo flex w-full items-center gap-3 p-3 text-left ${
                  e.esMio ? "card-duo-activa" : ""
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                    i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </span>
                <IconoPastilla nombre={e.icono} tono={e.esMio ? "primary" : "muted"} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold text-foreground">
                    {e.nombre}
                  </span>
                  <span className="block text-[11px] text-muted-foreground">
                    {e.zona} · {e.integrantes} embajadores
                  </span>
                </span>
                <span className="text-sm font-extrabold text-foreground">{e.puntos}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground">
          <Icono nombre="destello" className="h-3.5 w-3.5" />
          Clasificación ilustrativa para esta versión.
        </p>
      </section>

      <Link to="/liga" className="btn-duo btn-duo-ghost">
        Volver a mi liga
      </Link>
    </Pantalla>
  );
}
