// SPEC-10 — Motor de preguntas (P-10) + SPEC-11 — Feedback de respuesta (P-11)
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";
import { useSesion } from "@/context/SessionContext";
import { preguntasDeMision } from "@/data/preguntas";
import type { TipoPregunta } from "@/data/tipos";
import { insigniaDeMision, obtenerMision } from "@/lib/progreso";
import { Icono } from "@/components/Icono";

export const Route = createFileRoute("/mision/$misionId/jugar")({
  head: ({ params }) => {
    const mision = obtenerMision(params.misionId);
    const titulo = mision
      ? `Jugar: ${mision.nombre} — Soy Embajador Bolivia`
      : "Misión no encontrada — Soy Embajador Bolivia";
    const desc = mision
      ? `${mision.cantidadPreguntas} preguntas sobre ${mision.nombre.toLowerCase()}, con explicación en cada respuesta.`
      : "Esta misión no existe en la Temporada 1.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Jugar,
});

const etiquetaTipo: Record<TipoPregunta, string> = {
  multiple: "Selección múltiple",
  "verdadero-falso": "Verdadero o falso",
  imagen: "Reconocé la imagen",
  caso: "Caso práctico",
  reto: "Reto",
};

function Jugar() {
  const { misionId } = Route.useParams();
  const router = useRouter();
  const { usuario, actualizar } = useSesion();

  const mision = obtenerMision(misionId);
  const lista = preguntasDeMision(misionId).filter((p) => p.tipo !== "reto");

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const hayProgreso = indice > 0 || seleccion !== null || respondida;
  const { salir } = useSalidaProtegida(
    hayProgreso,
    "¿Querés abandonar la misión? Perderás las respuestas de este intento.",
  );

  if (!mision || lista.length === 0) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Misión no disponible</h1>
        <Link to="/temporadas" className="text-sm text-primary underline underline-offset-4">
          Volver al mapa de temporadas
        </Link>
      </Pantalla>
    );
  }

  const pregunta = lista[indice]!;
  const esCorrecta = seleccion === pregunta.respuestaCorrectaId;

  const responder = () => {
    if (!seleccion || respondida) return;
    setRespondida(true);
    if (seleccion === pregunta.respuestaCorrectaId) {
      setAciertos((a) => a + 1);
      setPuntos((p) => p + pregunta.puntaje);
    }
  };

  const cerrarMision = (aciertosFinales: number, puntosFinales: number) => {
    const nuevas = new Set(usuario.insignias);
    const insigniaId = insigniaDeMision[mision.id];
    if (insigniaId) nuevas.add(insigniaId);
    if (aciertosFinales === lista.length) nuevas.add("i-perfecto");

    const yaCompletada = usuario.progreso[mision.id];
    const puntosPrevios = yaCompletada?.puntos ?? 0;
    const delta = Math.max(0, puntosFinales - puntosPrevios);

    actualizar({
      puntos: usuario.puntos + delta,
      insignias: Array.from(nuevas),
      progreso: {
        ...usuario.progreso,
        [mision.id]: {
          completada: true,
          puntos: Math.max(puntosPrevios, puntosFinales),
          aciertos: aciertosFinales,
          ultimoDelta: delta,
        },
      },
    });
    router.history.replace(`/mision/${mision.id}/resultados`, undefined, {
      ignoreBlocker: true,
    });
  };

  const continuar = () => {
    if (indice === lista.length - 1) {
      cerrarMision(aciertos, puntos);
      return;
    }
    setIndice(indice + 1);
    setSeleccion(null);
    setRespondida(false);
  };

  return (
    <Pantalla className="gap-6 pb-40">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <BotonVolver
            fallback={`/mision/${mision.id}`}
            etiqueta={mision.nombre}
            preferirHistorial={false}
            onVolver={() => salir(`/mision/${mision.id}`)}
            className="-ml-3"
          />
          <span aria-live="polite">
            {indice + 1} de {lista.length}
          </span>
        </div>
        <div className="barra-duo">
          <span
            className="barra-duo-fill"
            style={{ width: `${((indice + (respondida ? 1 : 0)) / lista.length) * 100}%` }}
          />
        </div>
      </header>

      <div>
        <span className="inline-block rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-secondary uppercase">
          {etiquetaTipo[pregunta.tipo]}
        </span>
        <h1 className="mt-3 text-2xl leading-tight font-extrabold text-balance text-foreground">
          {pregunta.enunciado}
        </h1>
      </div>

      <ul className={pregunta.tipo === "imagen" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"}>
        {pregunta.opciones.map((opcion) => {
          const elegida = seleccion === opcion.id;
          const correcta = opcion.id === pregunta.respuestaCorrectaId;
          const estado =
            respondida && correcta
              ? "is-correct"
              : respondida && elegida
                ? "is-incorrect"
                : elegida
                  ? "is-selected"
                  : "";

          return (
            <li key={opcion.id}>
              <button
                type="button"
                disabled={respondida}
                onClick={() => setSeleccion(opcion.id)}
                className={`opcion-juego ${estado}`}
              >
                {opcion.icono ? (
                  <span className="flex w-full flex-col items-center gap-2 text-center">
                    <Icono nombre={opcion.icono} className="h-9 w-9" />
                    <span>{opcion.texto}</span>
                  </span>
                ) : (
                  <span className="flex-1">{opcion.texto}</span>
                )}
                {respondida && correcta && <Icono nombre="acierto" className="h-5 w-5 shrink-0" />}
                {respondida && elegida && !correcta && (
                  <Icono nombre="error" className="h-5 w-5 shrink-0" />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {/* Barra de acción fija al pie, estilo lección (mobile first) */}
      <div className="fixed inset-x-0 bottom-0 z-10 flex justify-center border-t-2 border-border bg-background/95 backdrop-blur">
        <div className="w-full max-w-md px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {respondida && (
            <div
              role="status"
              className={`mb-3 rounded-2xl p-3.5 border-2 ${
                esCorrecta
                  ? "border-primary/40 bg-primary/12 text-foreground"
                  : "border-destructive/40 bg-destructive/10 text-foreground"
              }`}
            >
              <p className="flex items-center gap-2 text-sm font-extrabold">
                <Icono
                  nombre={esCorrecta ? "acierto" : "error"}
                  className={`h-5 w-5 ${esCorrecta ? "text-primary" : "text-destructive"}`}
                />
                {esCorrecta ? "¡Correcto!" : "Casi. Ahora ya lo sabés:"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
            </div>
          )}
          <button
            type="button"
            onClick={respondida ? continuar : responder}
            disabled={!seleccion}
            className={`btn-duo disabled:opacity-50 ${
              respondida && !esCorrecta ? "btn-duo-destructive" : "btn-duo-primary"
            }`}
          >
            {respondida
              ? indice === lista.length - 1
                ? "Ver resultado"
                : "Continuar"
              : "Responder"}
          </button>
        </div>
      </div>
    </Pantalla>
  );
}
