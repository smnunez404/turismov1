// SPEC-10 — Motor de preguntas (P-10) + SPEC-11 — Feedback de respuesta (P-11)
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
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
  const navigate = useNavigate();
  const { usuario, actualizar } = useSesion();

  const mision = obtenerMision(misionId);
  const lista = preguntasDeMision(misionId).filter((p) => p.tipo !== "reto");

  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [puntos, setPuntos] = useState(0);

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
        },
      },
    });
    navigate({ to: "/mision/$misionId/resultados", params: { misionId: mision.id } });
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
    <Pantalla className="gap-6 pb-12">
      <header className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <Link
            to="/mision/$misionId"
            params={{ misionId: mision.id }}
            className="underline underline-offset-4"
          >
            ← {mision.nombre}
          </Link>
          <span aria-live="polite">
            {indice + 1} de {lista.length}
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${((indice + (respondida ? 1 : 0)) / lista.length) * 100}%` }}
          />
        </div>
      </header>

      <div>
        <span className="inline-block rounded-full bg-secondary/15 px-3 py-1 text-[11px] font-semibold tracking-wide text-secondary uppercase">
          {etiquetaTipo[pregunta.tipo]}
        </span>
        <h1 className="mt-3 text-xl font-bold text-foreground">{pregunta.enunciado}</h1>
      </div>

      <ul
        className={
          pregunta.tipo === "imagen" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3"
        }
      >
        {pregunta.opciones.map((opcion) => {
          const elegida = seleccion === opcion.id;
          const correcta = opcion.id === pregunta.respuestaCorrectaId;
          let estilo = "border-border bg-card hover:border-primary";
          if (respondida && correcta) estilo = "border-primary bg-primary/10";
          else if (respondida && elegida) estilo = "border-destructive bg-destructive/10";
          else if (elegida) estilo = "border-primary bg-primary/5";

          return (
            <li key={opcion.id}>
              <button
                type="button"
                disabled={respondida}
                onClick={() => setSeleccion(opcion.id)}
                className={`w-full rounded-xl border p-4 text-left text-sm font-medium text-foreground transition-colors disabled:cursor-default ${estilo}`}
              >
                {opcion.texto}
              </button>
            </li>
          );
        })}
      </ul>

      {respondida && (
        <div
          role="status"
          className={`rounded-2xl p-4 ${esCorrecta ? "bg-primary/10" : "bg-accent/20"}`}
        >
          <p className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Icono
              nombre={esCorrecta ? "check" : "ojo"}
              className={`h-4 w-4 ${esCorrecta ? "text-primary" : "text-secondary"}`}
            />
            {esCorrecta ? "¡Correcto!" : "Casi. Mirá esto"}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
        </div>
      )}

      <button
        type="button"
        onClick={respondida ? continuar : responder}
        disabled={!seleccion}
        className="rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
      >
        {respondida
          ? indice === lista.length - 1
            ? "Ver resultado"
            : "Continuar"
          : "Responder"}
      </button>
    </Pantalla>
  );
}
