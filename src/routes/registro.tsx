// SPEC-02 — Registro simulado (P-02)
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/registro")({
  head: () => ({
    meta: [
      { title: "Creá tu cuenta — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Sumate como embajador de Santa Cruz: ingresá tu nombre y empezá la Temporada 1.",
      },
      { property: "og:title", content: "Creá tu cuenta — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Ingresá tu nombre y empezá la Temporada 1 Descubre Santa Cruz.",
      },
    ],
  }),
  component: Registro,
});

function Registro() {
  const { usuario, actualizar } = useSesion();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(usuario.nombre);
  const [correo, setCorreo] = useState(usuario.correo);

  const continuar = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulado: sin validación de servidor, nunca bloquea el avance.
    actualizar({ nombre: nombre.trim(), correo: correo.trim() });
    navigate({ to: "/perfil-nuevo" });
  };

  return (
    <Pantalla className="gap-7 pt-4">
      <Link
        to="/"
        className="self-start text-sm font-medium text-muted-foreground underline underline-offset-4"
      >
        ← Volver
      </Link>
      <PasoOnboarding actual={1} total={4} />

      <header>
        <h1 className="text-3xl font-bold text-foreground">Sumate como embajador</h1>
        <p className="mt-2 text-muted-foreground">
          Santa Cruz tiene historias que ni los cruceños conocen. Empecemos por vos.
        </p>
      </header>

      <form onSubmit={continuar} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          ¿Cómo te llamás?
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Camila"
            autoComplete="given-name"
            enterKeyHint="next"
            className="min-h-12 rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Tu correo
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="camila@correo.com"
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoComplete="email"
            enterKeyHint="go"
            className="min-h-12 rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="submit"
          className="mt-2 min-h-12 btn-duo btn-duo-primary"
        >
          Empezar mi camino
        </button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="font-semibold text-primary underline underline-offset-4">
          Iniciá sesión
        </Link>
      </p>

      <p className="text-center text-xs text-muted-foreground">
        Prototipo de demostración: los datos no se guardan.
      </p>
    </Pantalla>
  );
}