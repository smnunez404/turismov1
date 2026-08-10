// SPEC-17 — Compartir logros e invitar (P-17)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { amigosSugeridos, canalesCompartir } from "@/data/comunidad";
import { avanceTemporada, nivelDe, temporadaCompletada } from "@/lib/progreso";

export const Route = createFileRoute("/compartir")({
  head: () => ({
    meta: [
      { title: "Compartir mis logros — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Compartí tus insignias e invitá a más personas a convertirse en embajadores de Santa Cruz.",
      },
      { property: "og:title", content: "Compartir mis logros de embajador" },
      {
        property: "og:description",
        content: "De aprendiz a promotor: mostrá tus insignias e invitá a tu gente.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Compartir,
});

function Compartir() {
  const { usuario, actualizar } = useSesion();
  const avance = avanceTemporada("t1", usuario);
  const nivel = nivelDe(usuario.puntos);
  const finTemporada = temporadaCompletada("t1", usuario);
  const obtenidas = insignias.filter((i) => usuario.insignias.includes(i.id));

  const [canal, setCanal] = useState<string | null>(null);
  const [compartido, setCompartido] = useState(false);
  const [invitados, setInvitados] = useState<string[]>([]);
  const [nuevoInvitado, setNuevoInvitado] = useState("");

  if (avance.completadas === 0) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <span className="text-6xl" aria-hidden="true">
          ✨
        </span>
        <h1 className="text-2xl font-bold text-foreground">Todavía no hay nada que contar</h1>
        <p className="text-sm text-muted-foreground">
          Completá tu primera misión y volvé para compartir tu primera insignia.
        </p>
        <Link
          to="/temporadas"
          className="mt-2 rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground"
        >
          Empezar una misión
        </Link>
      </Pantalla>
    );
  }

  const mensaje = finTemporada
    ? `Completé la Temporada 1 “Descubre Santa Cruz” con ${usuario.puntos} puntos y ${usuario.insignias.length} insignias. ¡Soy Embajador de mi ciudad!`
    : `Llevo ${avance.completadas} de ${avance.total} misiones y ${usuario.puntos} puntos como ${nivel.nombre} de Santa Cruz.`;

  const sumarInvitado = (nombre: string) => {
    const limpio = nombre.trim();
    if (!limpio || invitados.includes(limpio)) return;
    const lista = [...invitados, limpio];
    setInvitados(lista);
    if (!usuario.insignias.includes("i-promotor")) {
      actualizar({ insignias: [...usuario.insignias, "i-promotor"] });
    }
  };

  return (
    <Pantalla className="gap-6 pb-12">
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          De aprendiz a promotor
        </p>
        <h1 className="text-2xl font-bold text-foreground">Compartí lo que lograste</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Todo en esta pantalla es simulado: no se publica nada fuera del prototipo.
        </p>
      </header>

      <section className="rounded-2xl border border-accent bg-accent/15 p-5">
        <p className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
          Vista previa de la publicación
        </p>
        <p className="mt-2 text-base leading-snug font-semibold text-foreground">{mensaje}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {obtenidas.map((i) => (
            <li
              key={i.id}
              className="rounded-full bg-card px-2.5 py-1 text-xs font-semibold text-foreground"
            >
              <span aria-hidden="true">{i.icono}</span> {i.nombre}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">#SoyEmbajadorBolivia #SantaCruz</p>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Elegí dónde compartir
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {canalesCompartir.map((c) => {
            const activo = canal === c.id;
            return (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => {
                    setCanal(c.id);
                    setCompartido(false);
                  }}
                  aria-pressed={activo}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    activo
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary"
                  }`}
                >
                  <span className="text-2xl" aria-hidden="true">
                    {c.icono}
                  </span>
                  <p className="mt-1 text-sm font-bold text-foreground">{c.nombre}</p>
                  <p className="text-xs text-muted-foreground">{c.detalle}</p>
                </button>
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          disabled={!canal}
          onClick={() => setCompartido(true)}
          className="mt-3 w-full rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground"
        >
          {canal ? "Compartir (simulado)" : "Elegí un canal para continuar"}
        </button>
        {compartido && (
          <p
            role="status"
            className="mt-2 rounded-xl bg-primary/10 p-3 text-center text-sm text-foreground"
          >
            ✓ Publicación simulada enviada a{" "}
            {canalesCompartir.find((c) => c.id === canal)?.nombre}. En el prototipo no se
            conecta con la red real.
          </p>
        )}
      </section>

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-foreground">Invitá nuevos embajadores</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Al invitar a alguien ganás la insignia 📣 Promotor Cruceño.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {amigosSugeridos.map((a) => {
            const activo = invitados.includes(a);
            return (
              <li key={a}>
                <button
                  type="button"
                  onClick={() => sumarInvitado(a)}
                  disabled={activo}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activo
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary"
                  }`}
                >
                  {activo ? "✓ Invitado " : "+ "}
                  {a}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-3 flex gap-2">
          <input
            value={nuevoInvitado}
            onChange={(e) => setNuevoInvitado(e.target.value)}
            placeholder="Nombre de un amigo"
            className="flex-1 rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => {
              sumarInvitado(nuevoInvitado);
              setNuevoInvitado("");
            }}
            className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground"
          >
            Invitar
          </button>
        </div>
        {invitados.length > 0 && (
          <p role="status" className="mt-3 text-sm text-foreground">
            Invitaciones simuladas enviadas a <strong>{invitados.join(", ")}</strong>.
          </p>
        )}
      </section>

      <div className="flex flex-col gap-2 text-center">
        {finTemporada && (
          <Link
            to="/certificado"
            className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
          >
            Ver mi certificado
          </Link>
        )}
        <Link to="/perfil" className="text-sm text-muted-foreground underline underline-offset-4">
          Volver a mi perfil
        </Link>
      </div>
    </Pantalla>
  );
}
