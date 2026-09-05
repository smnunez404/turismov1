import { useState } from "react";
import { Icono, type NombreIcono } from "@/components/Icono";

export type TareaTemporada = {
  id: string;
  titulo: string;
  icono: NombreIcono;
  meta: number;
  progreso: number;
  puntosCamino: number;
  reclamada: boolean;
};

const TAREAS_INICIALES: TareaTemporada[] = [
  {
    id: "t1",
    titulo: "Comienza una partida rápida en el modo juego",
    icono: "rayo",
    meta: 1,
    progreso: 1,
    puntosCamino: 10,
    reclamada: false,
  },
  {
    id: "t2",
    titulo: "Girá la ruleta cruceña y respondé una tanda",
    icono: "ruleta",
    meta: 1,
    progreso: 1,
    puntosCamino: 10,
    reclamada: false,
  },
  {
    id: "t3",
    titulo: "Acierta 3 preguntas de Gastronomía tradicional",
    icono: "gastronomia",
    meta: 3,
    progreso: 2,
    puntosCamino: 15,
    reclamada: false,
  },
  {
    id: "t4",
    titulo: "Gana un duelo versus contra un explorador",
    icono: "duelo",
    meta: 1,
    progreso: 0,
    puntosCamino: 20,
    reclamada: false,
  },
  {
    id: "t5",
    titulo: "Sumá puntos de liga para tu barrio o zona",
    icono: "ciudad",
    meta: 50,
    progreso: 35,
    puntosCamino: 15,
    reclamada: false,
  },
  {
    id: "t6",
    titulo: "Mantené tu racha activa por 2 días consecutivos",
    icono: "racha",
    meta: 2,
    progreso: 2,
    puntosCamino: 25,
    reclamada: false,
  },
];

export function ModalTarjetasTareas({
  abierto,
  alCerrar,
  onSumarPuntos,
}: {
  abierto: boolean;
  alCerrar: () => void;
  onSumarPuntos?: (pts: number) => void;
}) {
  const [tareas, setTareas] = useState<TareaTemporada[]>(TAREAS_INICIALES);

  if (!abierto) return null;

  const reclamar = (id: string, pts: number) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, reclamada: true } : t))
    );
    if (onSumarPuntos) onSumarPuntos(pts);
  };

  const completadasCount = tareas.filter((t) => t.progreso >= t.meta).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-tarjetas-tareas"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="card-duo relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden bg-card text-foreground shadow-2xl border-2 border-border">
        {/* Cabecera armonizada con el sistema */}
        <header className="relative flex items-center justify-between border-b-2 border-border bg-muted/30 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground ring-1 ring-accent/40">
              <Icono nombre="pergamino" className="h-5 w-5" />
            </span>
            <div>
              <h2
                id="titulo-tarjetas-tareas"
                className="text-base sm:text-lg font-extrabold tracking-wide uppercase text-foreground"
              >
                Tarjetas de Tareas
              </h2>
              <p className="text-[11px] text-muted-foreground font-semibold">
                {completadasCount} de {tareas.length} listas para sumar al camino
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={alCerrar}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-foreground hover:bg-muted/80 active:scale-95 transition-all cursor-pointer font-black text-sm"
            aria-label="Cerrar ventana de tareas"
          >
            ✕
          </button>
        </header>

        {/* Mensaje de guía con personaje */}
        <div className="flex items-center gap-3 bg-primary/10 px-4 py-2.5 border-b border-border">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Icono nombre="ave" className="h-5 w-5" />
          </span>
          <div className="rounded-2xl bg-card px-3 py-1.5 text-xs font-bold text-foreground shadow-xs border border-border leading-tight">
            ¡Completá tareas todas las veces que quieras para progresar en el camino de temporada!
          </div>
        </div>

        {/* Grilla de Tareas */}
        <div className="overflow-y-auto p-3.5 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {tareas.map((tarea) => {
              const completa = tarea.progreso >= tarea.meta;
              return (
                <div
                  key={tarea.id}
                  className={`flex flex-col justify-between rounded-2xl border-2 p-3 transition-all ${
                    tarea.reclamada
                      ? "border-emerald-500/30 bg-emerald-500/5 opacity-70"
                      : completa
                        ? "card-duo-activa border-accent bg-accent/5 shadow-xs"
                        : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                        completa
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icono nombre={tarea.icono} className="h-4 w-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold leading-snug text-foreground">
                        {tarea.titulo}
                      </p>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-black text-foreground">
                        +{tarea.puntosCamino} pts de camino
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-border flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {tarea.progreso}/{tarea.meta}
                    </span>

                    {tarea.reclamada ? (
                      <span className="flex items-center gap-1 text-[11px] font-black text-emerald-600">
                        <Icono nombre="check" className="h-3.5 w-3.5" /> Reclamado
                      </span>
                    ) : completa ? (
                      <button
                        type="button"
                        onClick={() => reclamar(tarea.id, tarea.puntosCamino)}
                        className="btn-duo btn-duo-primary !py-1 !px-3 !text-[11px] !w-auto shadow-xs cursor-pointer"
                      >
                        Reclamar
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                        En curso
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pie de modal */}
        <footer className="border-t border-border bg-muted/20 px-4 py-2.5 text-center text-[11px] text-muted-foreground">
          Nuevas tarjetas de tareas se renuevan diariamente a medianoche.
        </footer>
      </div>
    </div>
  );
}
