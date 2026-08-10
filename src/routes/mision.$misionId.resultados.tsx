// SPEC-12 — Resultados de misión (P-12)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import {
  avanceTemporada,
  insigniaDeMision,
  obtenerMision,
  siguienteMision,
  temporadaCompletada,
} from "@/lib/progreso";

export const Route = createFileRoute("/mision/$misionId/resultados")({
  head: ({ params }) => {
    const mision = obtenerMision(params.misionId);
    const titulo = mision
      ? `Resultados: ${mision.nombre} — Soy Embajador Bolivia`
      : "Resultados — Soy Embajador Bolivia";
    const desc = mision
      ? `Puntaje, aciertos e insignia obtenida en la misión ${mision.nombre}.`
      : "Resultados de la misión.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Resultados,
});

function Resultados() {
  const { misionId } = Route.useParams();
  const { usuario } = useSesion();
  const mision = obtenerMision(misionId);
  const progreso = mision ? usuario.progreso[mision.id] : undefined;

  if (!mision || !progreso) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Todavía no jugaste esta misión</h1>
        <Link to="/temporadas" className="text-sm text-primary underline underline-offset-4">
          Volver al mapa de temporadas
        </Link>
      </Pantalla>
    );
  }

  const avance = avanceTemporada(mision.temporadaId, usuario);
  const insignia = insignias.find((i) => i.id === insigniaDeMision[mision.id]);
  const perfecta = progreso.aciertos === mision.cantidadPreguntas;
  const proxima = siguienteMision(mision);
  const finTemporada = temporadaCompletada(mision.temporadaId, usuario);

  return (
    <Pantalla className="gap-6 pb-12 text-center">
      <header className="flex flex-col items-center gap-2 pt-4">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icono nombre={perfecta ? "ranking" : "celebrar"} className="h-9 w-9" />
        </span>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Misión {mision.orden} completada
        </p>
        <h1 className="text-2xl font-bold text-foreground">{mision.nombre}</h1>
      </header>

      <dl className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <dt className="text-[11px] text-muted-foreground uppercase">Puntaje</dt>
          <dd className="text-2xl font-bold text-primary">+{progreso.puntos}</dd>
        </div>
        <div className="rounded-2xl bg-card p-4 shadow-sm">
          <dt className="text-[11px] text-muted-foreground uppercase">Aciertos</dt>
          <dd className="text-2xl font-bold text-foreground">
            {progreso.aciertos}/{mision.cantidadPreguntas}
          </dd>
        </div>
      </dl>

      {insignia && (
        <section className="rounded-2xl bg-accent/20 p-6">
          <p className="text-xs font-semibold tracking-widest text-accent-foreground uppercase">
            Insignia desbloqueada
          </p>
          <span className="mx-auto mt-2 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-secondary shadow-sm ring-1 ring-accent/40">
            <Icono nombre={insignia.icono} className="h-8 w-8" />
          </span>
          <p className="mt-2 text-lg font-bold text-foreground">{insignia.nombre}</p>
          <p className="text-sm text-muted-foreground">{insignia.descripcion}</p>
        </section>
      )}

      {perfecta && (
        <p className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 p-3 text-sm text-foreground">
          <Icono nombre="objetivo" className="h-4 w-4 text-primary" />
          Sin un solo error: también ganaste <strong>Memoria de Elefante</strong>.
        </p>
      )}

      <section className="rounded-2xl bg-card p-5 text-left shadow-sm">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progreso de la temporada</span>
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
        <p className="mt-3 text-sm text-muted-foreground">
          Llevás <strong className="text-foreground">{usuario.puntos} puntos</strong> como
          embajador.
        </p>
      </section>

      <div className="flex flex-col gap-3">
        {finTemporada ? (
          <Link
            to="/certificado"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Icono nombre="certificado" /> Ver mi certificado de la Temporada 1
          </Link>
        ) : proxima ? (
          <Link
            to="/mision/$misionId"
            params={{ misionId: proxima.id }}
            className="rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Siguiente misión: {proxima.nombre}
          </Link>
        ) : null}
        <Link
          to="/ranking"
          className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
        >
          Ver ranking
        </Link>
        <Link
          to="/compartir"
          className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground"
        >
          Compartir mi logro
        </Link>
        <Link to="/perfil" className="text-sm text-muted-foreground underline underline-offset-4">
          Ir a mi perfil
        </Link>
      </div>
    </Pantalla>
  );
}
