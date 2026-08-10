// SPEC-03 — Inicio de sesión simulado (P-03)
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Iniciar sesión — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Volvé a tu recorrido de embajador y seguí donde lo dejaste.",
      },
      { property: "og:title", content: "Iniciar sesión — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Retomá tu progreso en la Temporada 1 Descubre Santa Cruz.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  const { cargarSesionDemo } = useSesion();
  const navigate = useNavigate();

  const entrar = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulado: carga un perfil sintético con progreso para la validación.
    cargarSesionDemo();
    navigate({ to: "/bienvenida" });
  };

  return (
    <Pantalla className="gap-7 pt-6">
      <Link
        to="/"
        className="self-start text-sm font-medium text-muted-foreground underline underline-offset-4"
      >
        ← Volver
      </Link>
      <header>
        <h1 className="text-3xl font-bold text-foreground">Qué bueno verte de nuevo</h1>
        <p className="mt-2 text-muted-foreground">
          Tu recorrido de embajador te está esperando.
        </p>
      </header>

      <form onSubmit={entrar} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Correo
          <input
            defaultValue="camila.demo@soyembajador.bo"
            type="email"
            inputMode="email"
            autoCapitalize="none"
            autoComplete="email"
            className="min-h-12 rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Contraseña
          <input
            type="password"
            defaultValue="demo1234"
            autoComplete="current-password"
            enterKeyHint="go"
            className="min-h-12 rounded-xl border border-input bg-card px-4 py-3 text-base text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="submit"
          className="mt-2 min-h-12 btn-duo btn-duo-primary"
        >
          Entrar
        </button>
      </form>

      <div className="rounded-xl bg-muted p-4 text-sm text-muted-foreground">
        Ingreso simulado: carga un perfil de demostración con 2 misiones completadas y 145
        puntos, para mostrar el estado de "usuario con progreso".
      </div>

      <p className="text-center text-sm text-muted-foreground">
        ¿Sos nuevo?{" "}
        <Link to="/registro" className="font-semibold text-primary underline underline-offset-4">
          Creá tu cuenta
        </Link>
      </p>
    </Pantalla>
  );
}