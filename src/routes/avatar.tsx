// SPEC-05 — Selección de avatar (P-05)
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { avatares } from "@/data/avatares";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/avatar")({
  head: () => ({
    meta: [
      { title: "Elegí tu avatar — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Toborochi, tipoy, tucán o jaguar: elegí el símbolo cruceño que te representa.",
      },
      { property: "og:title", content: "Elegí tu avatar cruceño" },
      {
        property: "og:description",
        content: "Seis símbolos del oriente boliviano para representarte como embajador.",
      },
    ],
  }),
  component: SeleccionAvatar,
});

function SeleccionAvatar() {
  const { usuario, actualizar } = useSesion();
  const navigate = useNavigate();

  return (
    <Pantalla className="justify-center gap-8">
      <PasoOnboarding actual={3} total={4} />

      <header>
        <h1 className="text-3xl font-bold text-foreground">Elegí quién te representa</h1>
        <p className="mt-2 text-muted-foreground">
          Cada símbolo cuenta algo del oriente. Escogé el que más te suene a vos.
        </p>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {avatares.map((avatar) => {
          const seleccionado = usuario.avatarId === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => actualizar({ avatarId: avatar.id })}
              aria-pressed={seleccionado}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 p-3 transition-all ${
                seleccionado
                  ? "scale-[1.04] border-primary bg-accent/40 shadow-md ring-2 ring-primary/40"
                  : "border-border bg-card hover:border-accent"
              }`}
            >
              <img
                src={avatar.imagen}
                alt=""
                loading="lazy"
                width={512}
                height={512}
                className="h-14 w-14 object-contain"
              />
              <span className="text-center text-xs font-semibold text-foreground">
                {avatar.nombre}
              </span>
            </button>
          );
        })}
      </div>

      <p className="min-h-10 text-center text-sm text-muted-foreground">
        {avatares.find((a) => a.id === usuario.avatarId)?.descripcion ??
          "Tocá un avatar para conocer su historia."}
      </p>

      <button
        type="button"
        disabled={!usuario.avatarId}
        onClick={() => navigate({ to: "/bienvenida" })}
        className="rounded-xl bg-primary px-4 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
      >
        Este soy yo
      </button>
    </Pantalla>
  );
}