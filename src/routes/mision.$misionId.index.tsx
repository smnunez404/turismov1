// SPEC-09 — Portada e Historia de Misión por Pasos (P-09)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { estadoDeMision, insigniaDeMision, obtenerMision } from "@/lib/progreso";
import { Icono, IconoPastilla } from "@/components/Icono";
import { ilustracionMision } from "@/data/ilustraciones";
import { historiasPasoAPaso } from "@/data/historiasPasoAPaso";

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
  const historia = historiasPasoAPaso[misionId];

  // Estado del paso actual en la historia (0-indexed)
  const [pasoActual, setPasoActual] = useState(0);
  const [historiaCompletada, setHistoriaCompletada] = useState(false);

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

  const totalPasos = historia?.diapositivas.length ?? 0;
  const diapositiva = historia?.diapositivas[pasoActual];
  const esUltimoPaso = pasoActual === totalPasos - 1;

  const avanzarPaso = () => {
    if (esUltimoPaso) {
      setHistoriaCompletada(true);
    } else {
      setPasoActual((prev) => Math.min(totalPasos - 1, prev + 1));
    }
  };

  const retrocederPaso = () => {
    setPasoActual((prev) => Math.max(0, prev - 1));
  };

  return (
    <Pantalla className="gap-3.5 pb-10">
      {/* Botón superior de retorno */}
      <BotonVolver fallback="/temporadas" preferirHistorial={false} etiqueta="Volver al Camino" />

      {/* ── Encabezado Compacto de Misión (Mobile-First) ── */}
      <header className="card-duo p-3.5 border-2 border-border flex items-center justify-between gap-3 shadow-xs">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-secondary">
            <Icono nombre="pergamino" className="h-3 w-3" /> Capítulo 1 · Misión {mision.orden}
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-foreground leading-tight truncate">
            {mision.nombre}
          </h1>
          <p className="text-[11px] text-muted-foreground line-clamp-1">
            {mision.descripcion}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-right">
          <div className="rounded-xl bg-muted/60 px-2.5 py-1 text-center">
            <p className="text-[9px] font-bold text-muted-foreground uppercase">Preguntas</p>
            <p className="text-xs font-black text-foreground">{mision.cantidadPreguntas}</p>
          </div>
          <div className="rounded-xl bg-accent/20 px-2.5 py-1 text-center text-accent-foreground">
            <p className="text-[9px] font-bold uppercase">Puntaje</p>
            <p className="text-xs font-black">{mision.puntajeMaximo} pts</p>
          </div>
        </div>
      </header>

      {/* ── Tarjeta Interactiva de Historia Paso a Paso (Sin Scroll Excesivo) ── */}
      {historia && diapositiva ? (
        <article className="card-duo overflow-hidden border-2 border-primary/30 bg-card shadow-sm flex flex-col">
          {/* Barra de progreso de la historia */}
          <div className="flex items-center justify-between border-b border-border bg-muted/30 px-3.5 py-2">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-primary/20 text-primary text-xs font-black">
                {pasoActual + 1}
              </span>
              <span className="text-xs font-extrabold text-foreground">
                {diapositiva.tituloParte}
              </span>
            </div>

            {/* Puntos / Indicadores de paso */}
            <div className="flex items-center gap-1.5" aria-label={`Parte ${pasoActual + 1} de ${totalPasos}`}>
              {historia.diapositivas.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-2 rounded-full transition-all ${
                    idx === pasoActual
                      ? "w-5 bg-primary"
                      : idx < pasoActual
                        ? "w-2 bg-primary/60"
                        : "w-2 bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Imagen ilustrada del paso actual */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              key={diapositiva.imagen}
              src={diapositiva.imagen}
              alt={diapositiva.tituloParte}
              width={1024}
              height={576}
              className="h-full w-full object-cover animate-in fade-in zoom-in-95 duration-200"
            />
            <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-2.5 pt-6 text-[11px] font-medium text-white/90 leading-tight">
              {diapositiva.pieDeFoto}
            </p>
          </div>

          {/* Cuerpo narrativo del paso */}
          <div className="p-3.5 sm:p-4 flex flex-col gap-2.5">
            <p className="text-xs sm:text-sm font-semibold text-foreground/95 leading-relaxed">
              {diapositiva.narrativa}
            </p>

            {/* Dato Curioso contextual de la diapositiva */}
            {diapositiva.datoClave && (
              <div className="rounded-xl border border-accent/40 bg-accent/10 p-2.5 text-xs text-accent-foreground">
                <span className="font-extrabold">{diapositiva.datoClave.titulo}: </span>
                <span className="text-foreground/80">{diapositiva.datoClave.detalle}</span>
              </div>
            )}

            {/* Si es el último paso, mostrar la lección formativa */}
            {esUltimoPaso && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs text-emerald-900 dark:text-emerald-300 font-bold flex items-start gap-1.5 animate-in fade-in">
                <Icono nombre="corazon" className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
                <span>
                  <strong>Lección del Embajador:</strong> {historia.leccionFinal}
                </span>
              </div>
            )}

            {/* Controles de navegación de la historia */}
            <div className="mt-2 pt-2 border-t border-border flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={retrocederPaso}
                disabled={pasoActual === 0}
                className="btn-duo btn-duo-neutral !py-1.5 !px-3 !text-xs !w-auto flex items-center gap-1 disabled:opacity-40 cursor-pointer"
              >
                <Icono nombre="flecha-izquierda" className="h-3.5 w-3.5" />
                <span>Anterior</span>
              </button>

              <span className="text-[11px] font-bold text-muted-foreground">
                {pasoActual + 1} de {totalPasos}
              </span>

              <button
                type="button"
                onClick={avanzarPaso}
                className="btn-duo btn-duo-primary !py-1.5 !px-3.5 !text-xs !w-auto flex items-center gap-1 font-extrabold cursor-pointer"
              >
                <span>{esUltimoPaso ? "Completar Historia ✓" : "Siguiente Parte →"}</span>
              </button>
            </div>
          </div>
        </article>
      ) : (
        /* Fallback para misiones sin historia paso a paso */
        <div className="card-duo overflow-hidden border-2 border-border p-0">
          <img
            src={ilustracionMision[mision.id]}
            alt={mision.nombre}
            className="h-40 w-full object-cover"
          />
        </div>
      )}

      {/* Insignia / Logro vinculado */}
      {insignia && (
        <div className="flex items-center gap-3 rounded-2xl border border-dashed border-accent bg-accent/10 p-3">
          <IconoPastilla nombre={insignia.icono} tono="accent" className="h-8 w-8 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-extrabold text-foreground">{insignia.nombre}</p>
            <p className="text-[10px] text-muted-foreground line-clamp-1">{insignia.descripcion}</p>
          </div>
        </div>
      )}

      {/* Botón Principal de Acción (Comenzar preguntas) */}
      {estado === "bloqueada" ? (
        <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-muted p-3.5 text-xs font-bold text-muted-foreground">
          <Icono nombre="bloqueado" className="h-4 w-4" /> Completá la misión anterior para desbloquear esta.
        </div>
      ) : esReto ? (
        <Link
          to="/mision/$misionId/reto"
          params={{ misionId: mision.id }}
          className="btn-duo btn-duo-primary py-2.5 text-xs sm:text-sm font-extrabold uppercase flex items-center justify-center gap-2 shadow-sm"
        >
          <Icono nombre="mapa" className="h-4 w-4" />
          <span>{progreso?.completada ? "Repetir el reto" : "Empezar el reto presencial"}</span>
        </Link>
      ) : (
        <div className="flex flex-col gap-1.5">
          <Link
            to="/mision/$misionId/jugar"
            params={{ misionId: mision.id }}
            className={`btn-duo py-3 text-xs sm:text-sm font-extrabold uppercase flex items-center justify-center gap-2 shadow-sm transition-all ${
              esUltimoPaso || historiaCompletada || progreso?.completada
                ? "btn-duo-primary animate-pulse"
                : "btn-duo-accent"
            }`}
          >
            <Icono nombre="jugar" className="h-4 w-4" />
            <span>
              {progreso?.completada
                ? "Repasar preguntas de la misión"
                : esUltimoPaso || historiaCompletada
                  ? "¡Listo! Comenzar preguntas"
                  : "Saltar historia y jugar preguntas →"}
            </span>
          </Link>
          {!esUltimoPaso && !historiaCompletada && !progreso?.completada && (
            <p className="text-center text-[10px] font-semibold text-muted-foreground">
              💡 Te sugerimos completar las {totalPasos} partes de la historia para responder con éxito.
            </p>
          )}
        </div>
      )}
    </Pantalla>
  );
}
