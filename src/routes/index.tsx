// SPEC-01 — Splash (P-01)
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import marca from "@/assets/marca-embajador.png";
import hero from "@/assets/hero-santacruz.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Soy Embajador Bolivia — Descubre Santa Cruz jugando" },
      {
        name: "description",
        content:
          "Aprendé la historia, el patrimonio y los secretos de Santa Cruz de la Sierra a través de misiones, puntos e insignias.",
      },
      { property: "og:title", content: "Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Misiones, puntos e insignias para convertirte en embajador de tu ciudad.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/registro" }), 2600);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-primary px-6 text-center">
      <img
        src={hero}
        alt=""
        width={1024}
        height={1024}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary/70"
      />
      <div className="relative animate-in fade-in zoom-in-95 duration-700">
        <img
          src={marca}
          alt="Soy Embajador Bolivia"
          width={512}
          height={512}
          className="mx-auto h-24 w-24 rounded-2xl bg-primary-foreground/95 p-2 object-contain shadow-lg"
        />
        <h1 className="mt-6 text-4xl font-bold text-primary-foreground">Soy Embajador</h1>
        <p className="mt-1 text-lg font-medium tracking-[0.3em] text-accent uppercase">Bolivia</p>
        <p className="mt-6 text-sm text-primary-foreground/80">Temporada 1 · Descubre Santa Cruz</p>
      </div>

      <Link
        to="/registro"
        className="relative mt-14 text-xs text-primary-foreground/80 underline underline-offset-4"
      >
        Saltar intro
      </Link>
    </main>
  );
}
