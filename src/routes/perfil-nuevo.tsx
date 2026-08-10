// SPEC-04 — Creación de perfil (P-04)
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/perfil-nuevo")({
  head: () => ({
    meta: [
      { title: "Tu nombre de embajador — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Elegí cómo querés que te llamemos durante tu recorrido por Santa Cruz.",
      },
      { property: "og:title", content: "Tu nombre de embajador" },
      {
        property: "og:description",
        content: "Personalizá tu perfil antes de empezar la Temporada 1.",
      },
    ],
  }),
  component: PerfilNuevo,
});

function PerfilNuevo() {
  const { usuario, actualizar } = useSesion();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(usuario.nombre);

  const continuar = (e: React.FormEvent) => {
    e.preventDefault();
    actualizar({ nombre: nombre.trim() || "Embajador" });
    navigate({ to: "/avatar" });
  };

  return (
    <Pantalla className="gap-7 pt-4">
      <PasoOnboarding actual={2} total={4} />

      <header>
        <h1 className="text-3xl font-bold text-foreground">
          ¿Cómo te decimos, {usuario.nombre || "che"}?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Este nombre va a aparecer en tu perfil, en el ranking y en tu certificado.
        </p>
      </header>

      <form onSubmit={continuar} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Nombre a mostrar
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Camila"
            className="rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="submit"
          className="mt-2 btn-duo btn-duo-primary"
        >
          Continuar
        </button>
      </form>
    </Pantalla>
  );
}