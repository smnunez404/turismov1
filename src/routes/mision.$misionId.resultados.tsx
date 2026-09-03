// SPEC-12 — Resultados de misión (P-12)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
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
    <Pantalla className="gap-4 text-center">
      {/* ── Cabecera de Celebración Compacta ── */}
      <header className="flex flex-col items-center gap-1.5 pt-2">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/25 shadow-xs">
          <Icono nombre={perfecta ? "ranking" : "celebrar"} className="h-7 w-7" />
        </span>
        <p className="chapter-label">Misión {mision.orden} completada</p>
        <h1 className="text-2xl font-extrabold text-foreground">{mision.nombre}</h1>
      </header>

      {/* ── Panel Unificado de Logros y Recompensas ── */}
      <section className="card-duo p-4 text-left shadow-sm">
        {/* Métricas Principales (XP y Aciertos) */}
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="rounded-xl bg-primary/10 p-2.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">
              XP de este intento
            </p>
            <p className="mt-0.5 text-xl font-extrabold text-primary">
              +{progreso.ultimoDelta ?? progreso.puntos}
            </p>
            <p className="text-[10px] text-muted-foreground">Mejor: {progreso.puntos} XP</p>
          </div>
          <div className="rounded-xl bg-muted/60 p-2.5">
            <p className="text-[10px] font-bold text-muted-foreground uppercase">Aciertos</p>
            <p className="mt-0.5 text-xl font-extrabold text-foreground">
              {progreso.aciertos}/{mision.cantidadPreguntas}
            </p>
            <p className="text-[10px] text-muted-foreground">
              {perfecta ? "¡Puntaje perfecto!" : "Completado"}
            </p>
          </div>
        </div>

        {/* Insignia Desbloqueada Inline */}
        {insignia && (
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/15 p-3">
            <IconoPastilla nombre={insignia.icono} tono="accent" className="h-10 w-10 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold tracking-widest text-secondary uppercase">
                Insignia desbloqueada
              </p>
              <p className="text-sm font-extrabold text-foreground leading-snug">
                {insignia.nombre}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">{insignia.descripcion}</p>
            </div>
          </div>
        )}

        {perfecta && (
          <div className="mt-2.5 flex items-center gap-2 rounded-lg bg-primary/10 p-2 text-xs text-foreground">
            <Icono nombre="objetivo" className="h-4 w-4 shrink-0 text-primary" />
            <span>
              Sin errores: ganaste <strong>Memoria de Elefante</strong>.
            </span>
          </div>
        )}

        {/* Barra de Progreso de la Temporada */}
        <hr className="my-3 border-border" />
        <div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progreso de la temporada</span>
            <span className="font-bold text-foreground">
              {avance.completadas} de {avance.total} misiones
            </span>
          </div>
          <div className="barra-duo mt-1.5 h-2">
            <span className="barra-duo-fill" style={{ width: `${avance.porcentaje}%` }} />
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Llevás <strong className="text-foreground">{usuario.xp} XP</strong> como embajador.
          </p>
        </div>
      </section>

      {/* ── Botones de Acción (Directos y visibles) ── */}
      <div className="flex flex-col gap-2.5 pt-1">
        {finTemporada ? (
          <Link to="/certificado" className="btn-duo btn-duo-primary">
            <Icono nombre="certificado" className="h-4 w-4" /> Ver mi certificado de temporada
          </Link>
        ) : proxima ? (
          <Link
            to="/mision/$misionId"
            params={{ misionId: proxima.id }}
            className="btn-duo btn-duo-primary"
          >
            Siguiente misión: {proxima.nombre}
          </Link>
        ) : null}

        <Link to="/temporadas" className="btn-duo btn-duo-ghost text-sm py-2.5">
          Volver al mapa
        </Link>

        {/* Enlaces Secundarios Limpios en una sola fila */}
        <div className="mt-1 flex items-center justify-center gap-3 text-xs font-bold text-muted-foreground">
          <Link to="/ranking" className="hover:text-foreground hover:underline underline-offset-2">
            Ver ranking
          </Link>
          <span>·</span>
          <Link
            to="/compartir"
            className="hover:text-foreground hover:underline underline-offset-2"
          >
            Compartir logro
          </Link>
          <span>·</span>
          <Link to="/perfil" className="hover:text-foreground hover:underline underline-offset-2">
            Mi perfil
          </Link>
        </div>
      </div>
    </Pantalla>
  );
}
