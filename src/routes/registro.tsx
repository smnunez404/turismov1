// SPEC-02 — Perfil postvalor simulado; no crea una cuenta ni persiste datos.
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { useSesion } from "@/context/SessionContext";
import { registrarEvento } from "@/features/analytics/memory";

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Guardá tu progreso — Soy Embajador Bolivia" }] }),
  component: RegistroPostvalor,
});

function RegistroPostvalor() {
  const { usuario, actualizar } = useSesion();
  const navigate = useNavigate();
  const [correo, setCorreo] = useState(usuario.correo);
  const continuar = (e: React.FormEvent) => {
    e.preventDefault();
    registrarEvento({ tipo: "perfil_demo_activado" });
    actualizar({ correo: correo.trim(), esInvitado: false });
    navigate({ to: "/jugar" });
  };
  return (
    <Pantalla className="gap-6 pt-6">
      <BotonVolver fallback="/jugar" />
      <header>
        <p className="text-xs font-bold tracking-widest text-primary uppercase">
          Ya probaste el juego
        </p>
        <h1 className="text-3xl font-extrabold text-foreground">Guardá tu progreso</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Llevás {usuario.xp} XP y {usuario.monedas} monedas. Sumá tu correo para continuar tu
          recorrido con un perfil propio.
        </p>
      </header>
      <form onSubmit={continuar} className="grid gap-4">
        <label className="grid gap-1.5 text-sm font-bold text-foreground">
          Correo
          <input
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            type="email"
            placeholder="vos@correo.com"
            required
            autoComplete="email"
            className="min-h-12 rounded-2xl border-2 border-input bg-card px-4 text-base outline-none focus:border-primary"
          />
        </label>
        <button type="submit" className="btn-duo btn-duo-primary">
          Guardar mi progreso
        </button>
      </form>
      <Link to="/jugar" className="btn-duo btn-duo-ghost">
        Continuar como invitado
      </Link>
      <p className="text-center text-xs text-muted-foreground">
        En esta versión, tu progreso se conserva durante la sesión.
      </p>
    </Pantalla>
  );
}
