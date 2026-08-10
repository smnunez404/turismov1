// SPEC-07 — Tutorial (P-07)
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Cómo se juega — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Misiones, puntos e insignias: en tres pasos entendés toda la mecánica del juego.",
      },
      { property: "og:title", content: "Cómo se juega — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Misiones, puntos e insignias explicados en tres pasos.",
      },
    ],
  }),
  component: Tutorial,
});

const pasos = [
  {
    icono: "🗺️",
    titulo: "Cinco misiones, un recorrido",
    texto:
      "Cada misión te lleva por una parte de Santa Cruz. Se desbloquean de a una: terminás la primera y se abre la siguiente.",
  },
  {
    icono: "⭐",
    titulo: "Puntos por descubrir, no por acertar",
    texto:
      "Cada respuesta suma puntos y siempre te explicamos el porqué. Equivocarse acá es parte de aprender.",
  },
  {
    icono: "🏅",
    titulo: "Insignias y certificado",
    texto:
      "Vas ganando insignias en el camino. Al completar la temporada recibís tu certificado de Embajador.",
  },
];

function Tutorial() {
  const { actualizar } = useSesion();
  const [indice, setIndice] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const finalizar = () => {
    actualizar({ tutorialVisto: true });
    setTerminado(true);
  };

  if (terminado) {
    return (
      <Pantalla className="justify-center gap-6 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          ¿Qué tan buen embajador de Santa Cruz sos?
        </h1>
        <p className="text-muted-foreground">
          Hay una sola forma de averiguarlo. Empecemos por los orígenes.
        </p>
        <div className="rounded-2xl border border-dashed border-border bg-muted p-5 text-sm text-muted-foreground">
          El mapa de temporadas y las misiones llegan en el Sprint 2 (SPEC-08 a SPEC-11).
        </div>
      </Pantalla>
    );
  }

  const paso = pasos[indice] ?? pasos[0]!;

  return (
    <Pantalla className="justify-center gap-8">
      <PasoOnboarding actual={indice + 1} total={pasos.length} />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="text-6xl" role="img" aria-hidden="true">
          {paso.icono}
        </span>
        <h1 className="text-2xl font-bold text-foreground">{paso.titulo}</h1>
        <p className="text-muted-foreground">{paso.texto}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() =>
            indice === pasos.length - 1 ? finalizar() : setIndice(indice + 1)
          }
          className="rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {indice === pasos.length - 1 ? "¡Estoy listo!" : "Siguiente"}
        </button>
        <button
          type="button"
          onClick={finalizar}
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          Saltar tutorial
        </button>
      </div>
    </Pantalla>
  );
}