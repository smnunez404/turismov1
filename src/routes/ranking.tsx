// SPEC-15 — Ranking (P-15)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { useSesion } from "@/context/SessionContext";
import { participantesRanking } from "@/data/ranking";

export const Route = createFileRoute("/ranking")({
  head: () => ({
    meta: [
      { title: "Ranking de embajadores — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Compará tu puntaje con el de otros embajadores de Santa Cruz y subí posiciones misión a misión.",
      },
      { property: "og:title", content: "Ranking de embajadores" },
      {
        property: "og:description",
        content: "Tu posición entre los embajadores de Santa Cruz.",
      },
    ],
  }),
  component: Ranking,
});

function Ranking() {
  const { usuario } = useSesion();

  const lista = [
    ...participantesRanking,
    {
      id: "yo",
      nombre: usuario.nombre || "Vos",
      avatarId: usuario.avatarId ?? "toborochi",
      puntaje: usuario.puntos,
    },
  ].sort((a, b) => b.puntaje - a.puntaje);

  const posicion = lista.findIndex((p) => p.id === "yo") + 1;

  return (
    <Pantalla conNav className="gap-6">
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Temporada 1
        </p>
        <h1 className="text-2xl font-bold text-foreground">Ranking de embajadores</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Estás en la posición <strong className="text-foreground">#{posicion}</strong> de{" "}
          {lista.length} con {usuario.puntos} puntos.
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Participantes ficticios de demostración: no representan personas reales.
        </p>
      </header>

      <ol className="flex flex-col gap-2">
        {lista.map((p, i) => {
          const yo = p.id === "yo";
          return (
            <li
              key={p.id}
              className={`flex items-center gap-3 rounded-xl border p-3 ${
                yo ? "border-primary bg-primary/10 shadow-sm" : "border-border bg-card"
              }`}
            >
              <span
                className={`w-6 text-center text-sm font-bold ${
                  i < 3 ? "text-accent-foreground" : "text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              <AvatarInsignia avatarId={p.avatarId} tamano="sm" />
              <span className="flex-1 text-sm font-semibold text-foreground">
                {p.nombre}
                {yo && (
                  <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">
                    Vos
                  </span>
                )}
              </span>
              <span className="text-sm font-bold text-foreground">{p.puntaje}</span>
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col gap-2 text-center">
        <Link to="/temporadas" className="btn-duo btn-duo-primary">
          Sumar más puntos
        </Link>
        <Link to="/perfil" className="text-sm text-muted-foreground underline underline-offset-4">
          Ver mi perfil
        </Link>
      </div>
    </Pantalla>
  );
}
