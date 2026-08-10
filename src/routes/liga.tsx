// SPEC-26 — Liga semanal con divisiones (P-24). Reemplaza al ranking fijo como pantalla competitiva.
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { obtenerAuspiciador, premios } from "@/data/auspiciadores";
import { divisionDe, tablaLiga } from "@/lib/juego";

export const Route = createFileRoute("/liga")({
  head: () => ({
    meta: [
      { title: "Liga semanal — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Cada semana empieza una tabla nueva: subí de división y ganá premios de los auspiciadores.",
      },
      { property: "og:title", content: "Liga semanal — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Divisiones Cuñapé, Tajibo, Toborochi y Jaguar con premios reales para el top.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Liga,
});

function Liga() {
  const { usuario } = useSesion();
  const tabla = tablaLiga(usuario);
  const division = divisionDe(usuario.puntosLiga);
  const premioLiga = premios.find((p) => p.auspiciadorId === "a-cine")!;
  const auspiciador = obtenerAuspiciador(premioLiga.auspiciadorId);

  return (
    <Pantalla conNav className="gap-5">
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Se reinicia cada lunes
        </p>
        <h1 className="text-2xl font-extrabold text-foreground">{division.actual.nombre}</h1>
        <p className="text-sm text-muted-foreground">
          {division.siguiente
            ? `Te faltan ${Math.max(0, division.faltan)} pts para ascender a ${division.siguiente.nombre}.`
            : "Estás en la división más alta. Defendé tu lugar."}
        </p>
      </header>

      {auspiciador && (
        <section className="card-duo card-duo-activa flex items-center gap-3 p-4">
          <IconoPastilla nombre={auspiciador.icono} tono="accent" />
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-foreground">
              Premio de la semana: {premioLiga.titulo}
            </p>
            <p className="text-xs text-muted-foreground">
              Cortesía de {auspiciador.nombre} para el top 3 · {premioLiga.detalle}
            </p>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Tabla de la semana
        </h2>
        <ol className="grid gap-2">
          {tabla.map((p, i) => (
            <li
              key={p.id}
              className={`card-duo flex items-center gap-3 p-3 ${p.esUsuario ? "card-duo-activa" : ""}`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                  i < 3 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <AvatarInsignia avatarId={p.avatarId} avatar={p.esUsuario ? usuario.avatar : null} tamano="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-extrabold text-foreground">
                  {p.nombre}
                  {p.esUsuario && " (vos)"}
                </span>
                {i < 3 && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Icono nombre="cupon" className="h-3 w-3" /> Zona de premio
                  </span>
                )}
              </span>
              <span className="text-sm font-extrabold text-foreground">{p.puntos} pts</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-3">
        <Link to="/equipos" className="btn-duo btn-duo-ghost">
          Ver la liga de equipos
        </Link>
        <Link to="/ranking" className="text-center text-xs text-muted-foreground underline underline-offset-4">
          Ver el ranking histórico general
        </Link>
      </div>
    </Pantalla>
  );
}