// SPEC-06 — Bienvenida (P-06)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/bienvenida")({
  head: () => ({
    meta: [
      { title: "Bienvenido, embajador — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Asumí el rol de embajador de Santa Cruz: conocer, contar y hacer sentir orgullo.",
      },
      { property: "og:title", content: "Bienvenido, embajador de Santa Cruz" },
      {
        property: "og:description",
        content: "Tu misión: conocer tu ciudad y saber contarla a quien llegue de visita.",
      },
    ],
  }),
  component: Bienvenida,
});

function Bienvenida() {
  const { usuario } = useSesion();
  const nombre = usuario.nombre || "Embajador";

  return (
    <Pantalla className="gap-7 pt-6 text-center">
      <PasoOnboarding actual={4} total={4} />

      <div className="flex flex-col items-center gap-4">
        <AvatarInsignia avatarId={usuario.avatarId} tamano="lg" />
        <h1 className="text-3xl font-bold text-foreground">
          Bienvenido, {nombre}
        </h1>
      </div>

      <div className="rounded-2xl bg-card p-5 text-left shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-secondary uppercase">
          Tu nuevo rol
        </p>
        <p className="mt-2 text-base text-foreground">
          Desde hoy sos <strong>Embajador de Santa Cruz</strong>. No se trata de aprender
          datos: se trata de saber contar tu ciudad a quien llegue, y de sentir orgullo
          cuando lo hagas.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Cinco misiones te esperan en la Temporada 1: Descubre Santa Cruz.
        </p>
      </div>

      <Link
        to="/tutorial"
        className="btn-duo btn-duo-primary"
      >
        Ver cómo funciona
      </Link>
    </Pantalla>
  );
}