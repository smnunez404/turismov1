// SPEC-09 — Portada de misión (P-09)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { estadoDeMision, insigniaDeMision, obtenerMision } from "@/lib/progreso";
import { Icono, IconoPastilla } from "@/components/Icono";

export const Route = createFileRoute("/mision/$misionId/")({
  head: ({ params }) => {
    const mision = obtenerMision(params.misionId);
    const titulo = mision
      ? `${mision.nombre} — Soy Embajador Bolivia`
      : "Misión no encontrada — Soy Embajador Bolivia";
    const desc = mision?.descripcion ?? "Esta misión no existe en la Temporada 1.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: PortadaMision,
});

function PortadaMision() {
  const { misionId } = Route.useParams();
  const { usuario } = useSesion();
  const mision = obtenerMision(misionId);

  if (!mision) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Misión no encontrada</h1>
        <Link to="/temporadas" className="text-sm text-primary underline underline-offset-4">
          Volver al mapa de temporadas
        </Link>
      </Pantalla>
    );
  }

  const estado = estadoDeMision(mision, usuario);
  const progreso = usuario.progreso[mision.id];
  const insignia = insignias.find((i) => i.id === insigniaDeMision[mision.id]);
  const esReto = mision.id === "m5";

  return (
    <Pantalla className="gap-6 pb-12">
      <Link to="/temporadas" className="text-sm text-muted-foreground underline underline-offset-4">
        ← Mapa de temporadas
      </Link>

      <header className="card-duo p-6">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Misión {mision.orden} · Temporada 1
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">{mision.nombre}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{mision.descripcion}</p>

        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl bg-muted p-3">
            <dt className="text-[11px] text-muted-foreground uppercase">Preguntas</dt>
            <dd className="text-lg font-bold text-foreground">{mision.cantidadPreguntas}</dd>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <dt className="text-[11px] text-muted-foreground uppercase">Puntaje</dt>
            <dd className="text-lg font-bold text-foreground">{mision.puntajeMaximo}</dd>
          </div>
          <div className="rounded-xl bg-muted p-3">
            <dt className="text-[11px] text-muted-foreground uppercase">Estado</dt>
            <dd className="text-sm font-bold text-foreground capitalize">{estado}</dd>
          </div>
        </dl>
      </header>

      {insignia && (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-accent bg-accent/10 p-4">
          <IconoPastilla nombre={insignia.icono} tono="accent" />
          <div>
            <p className="text-sm font-semibold text-foreground">{insignia.nombre}</p>
            <p className="text-xs text-muted-foreground">{insignia.descripcion}</p>
          </div>
        </div>
      )}

      {progreso?.completada && (
        <p className="rounded-xl bg-primary/10 p-4 text-sm text-foreground">
          Ya completaste esta misión con <strong>{progreso.puntos} puntos</strong> y{" "}
          {progreso.aciertos} aciertos. Podés repetirla para repasar.
        </p>
      )}

      {estado === "bloqueada" ? (
        <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border bg-muted p-5 text-sm text-muted-foreground">
          <Icono nombre="bloqueado" className="h-4 w-4" /> Completá la misión anterior para
          desbloquear esta.
        </div>
      ) : esReto ? (
        <Link
          to="/mision/$misionId/reto"
          params={{ misionId: mision.id }}
          className="btn-duo btn-duo-primary"
        >
          {progreso?.completada ? "Repetir el reto" : "Empezar el reto presencial"}
        </Link>
      ) : (
        <Link
          to="/mision/$misionId/jugar"
          params={{ misionId: mision.id }}
          className="btn-duo btn-duo-primary"
        >
          {progreso?.completada ? "Repetir misión" : "Comenzar misión"}
        </Link>
      )}
    </Pantalla>
  );
}
