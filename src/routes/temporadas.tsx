// SPEC-08 — Mapa de temporadas (P-08)
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { useSesion } from "@/context/SessionContext";
import { temporadas } from "@/data/temporadas";
import { avanceTemporada, estadoDeMision, misionesDeTemporada } from "@/lib/progreso";

export const Route = createFileRoute("/temporadas")({
  head: () => ({
    meta: [
      { title: "Mapa de temporadas — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Descubre Santa Cruz es la temporada activa: cinco misiones para conocer, sentir y contar tu ciudad.",
      },
      { property: "og:title", content: "Mapa de temporadas — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Cinco temporadas, una activa: empezá por Descubre Santa Cruz.",
      },
    ],
  }),
  component: MapaTemporadas,
});

const etiquetaEstado = {
  completada: "Completada",
  disponible: "Disponible",
  bloqueada: "Bloqueada",
} as const;

function MapaTemporadas() {
  const { usuario } = useSesion();
  const activa = temporadas.find((t) => t.estado === "activa")!;
  const avance = avanceTemporada(activa.id, usuario);
  const lista = misionesDeTemporada(activa.id);

  return (
    <Pantalla className="gap-6 pb-12">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
            Tu recorrido
          </p>
          <h1 className="text-2xl font-bold text-foreground">
            Hola, {usuario.nombre || "Embajador"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-accent/25 px-3 py-1 text-sm font-semibold text-accent-foreground">
            {usuario.puntos} pts
          </span>
          <AvatarInsignia avatarId={usuario.avatarId} tamano="sm" />
        </div>
      </header>

      <section className="rounded-2xl bg-card p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <span className="text-3xl" aria-hidden="true">
            {activa.icono}
          </span>
          <div>
            <p className="text-xs font-semibold tracking-widest text-primary uppercase">
              Temporada 1 · Activa
            </p>
            <h2 className="text-xl font-bold text-foreground">{activa.nombre}</h2>
            <p className="text-sm text-muted-foreground">{activa.descripcion}</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progreso de temporada</span>
            <span>
              {avance.completadas} de {avance.total} misiones
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${avance.porcentaje}%` }}
            />
          </div>
        </div>

        <ul className="mt-5 flex flex-col gap-3">
          {lista.map((mision) => {
            const estado = estadoDeMision(mision, usuario);
            const bloqueada = estado === "bloqueada";
            const contenido = (
              <>
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    estado === "completada"
                      ? "bg-primary text-primary-foreground"
                      : bloqueada
                        ? "bg-muted text-muted-foreground"
                        : "bg-accent text-accent-foreground"
                  }`}
                >
                  {estado === "completada" ? "✓" : bloqueada ? "🔒" : mision.orden}
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-foreground">
                    {mision.nombre}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {etiquetaEstado[estado]} · {mision.puntajeMaximo} pts
                  </span>
                </span>
              </>
            );

            return (
              <li key={mision.id}>
                {bloqueada ? (
                  <div
                    aria-disabled="true"
                    className="flex items-center gap-3 rounded-xl border border-border bg-muted/50 p-3 opacity-70"
                  >
                    {contenido}
                  </div>
                ) : (
                  <Link
                    to="/mision/$misionId"
                    params={{ misionId: mision.id }}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 transition-colors hover:border-primary"
                  >
                    {contenido}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Próximas temporadas
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {temporadas
            .filter((t) => t.estado === "bloqueada")
            .map((t) => (
              <li
                key={t.id}
                className="relative overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm"
              >
                <span className="text-2xl" aria-hidden="true">
                  {t.icono}
                </span>
                <p className="mt-1 text-sm font-bold text-foreground">{t.nombre}</p>
                <p className="text-xs text-muted-foreground">{t.descripcion}</p>
                <span className="mt-2 inline-block rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  🔒 Próximamente
                </span>
              </li>
            ))}
        </ul>
      </section>
    </Pantalla>
  );
}
