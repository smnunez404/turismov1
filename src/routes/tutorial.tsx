// SPEC-07 — Tutorial (P-07)
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { useSesion } from "@/context/SessionContext";
import { Icono } from "@/components/Icono";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Cómo se juega — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Misiones, puntos e insignias: en tres pasos entendés toda la mecánica del juego.",
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
    icono: "mapa",
    titulo: "Cinco misiones, un recorrido",
    texto:
      "Cada misión te lleva por una parte de Santa Cruz. Se desbloquean de a una: terminás la primera y se abre la siguiente.",
  },
  {
    icono: "objetivo",
    titulo: "Puntos por descubrir, no por acertar",
    texto:
      "Cada respuesta suma puntos y siempre te explicamos el porqué. Equivocarse acá es parte de aprender.",
  },
  {
    icono: "certificado",
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
        <Link to="/temporadas" className="btn-duo btn-duo-primary">
          Empezar la Temporada 1
        </Link>
      </Pantalla>
    );
  }

  const paso = pasos[indice] ?? pasos[0]!;

  return (
    <Pantalla className="gap-7 pt-4">
      {indice === 0 ? (
        <BotonVolver fallback="/bienvenida" />
      ) : (
        <button
          type="button"
          onClick={() => setIndice((actual) => actual - 1)}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl px-3 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Icono nombre="volver" className="h-4 w-4" /> Anterior
        </button>
      )}
      <PasoOnboarding actual={indice + 1} total={pasos.length} />

      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
          <Icono nombre={paso.icono} className="h-9 w-9" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">{paso.titulo}</h1>
        <p className="text-muted-foreground">{paso.texto}</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => (indice === pasos.length - 1 ? finalizar() : setIndice(indice + 1))}
          className="btn-duo btn-duo-primary"
        >
          {indice === pasos.length - 1 ? "¡Estoy listo!" : "Siguiente"}
        </button>
        <button
          type="button"
          onClick={finalizar}
          className="inline-flex min-h-11 items-center justify-center text-sm text-muted-foreground underline underline-offset-4"
        >
          Saltar tutorial
        </button>
      </div>
    </Pantalla>
  );
}
