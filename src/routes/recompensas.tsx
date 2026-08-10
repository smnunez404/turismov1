// SPEC-30/31 — Billetera de premios y catálogo de auspiciadores (P-26).
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { obtenerAuspiciador, obtenerPremio, premios } from "@/data/auspiciadores";
import { emitirCupon } from "@/lib/juego";

export const Route = createFileRoute("/recompensas")({
  head: () => ({
    meta: [
      { title: "Premios y cupones — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Canjeá tus puntos por descuentos reales en cine, gastronomía y tours de Santa Cruz.",
      },
      { property: "og:title", content: "Premios y cupones — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Jugar da beneficios: cupones de auspiciadores locales para embajadores activos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Recompensas,
});

function Recompensas() {
  const { usuario, guardarCupon, usarCupon } = useSesion();

  return (
    <Pantalla conNav className="gap-5">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
            Tu esfuerzo vale
          </p>
          <h1 className="text-2xl font-extrabold text-foreground">Premios</h1>
        </div>
        <span className="rounded-full border-2 border-b-4 border-accent/60 bg-accent/25 px-3 py-1 text-sm font-extrabold text-accent-foreground">
          {usuario.puntos} pts
        </span>
      </header>

      {usuario.cupones.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            Mis cupones
          </h2>
          <ul className="grid gap-3">
            {usuario.cupones.map((c) => {
              const premio = obtenerPremio(c.premioId);
              const auspiciador = obtenerAuspiciador(premio?.auspiciadorId);
              return (
                <li key={c.id} className={`card-duo p-4 ${c.usado ? "opacity-60" : "card-duo-activa"}`}>
                  <div className="flex items-center gap-3">
                    <IconoPastilla nombre={auspiciador?.icono ?? "cupon"} tono="accent" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-extrabold text-foreground">
                        {premio?.titulo}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {auspiciador?.nombre} · obtenido el {c.obtenido}
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 rounded-xl bg-muted px-3 py-2 text-center font-mono text-base font-extrabold tracking-widest text-foreground">
                    {c.codigo}
                  </p>
                  {c.usado ? (
                    <p className="mt-2 text-center text-xs font-bold text-muted-foreground">
                      Cupón usado
                    </p>
                  ) : (
                    <button
                      type="button"
                      className="btn-duo btn-duo-ghost mt-3"
                      onClick={() => usarCupon(c.id)}
                    >
                      Marcar como usado en el local
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Catálogo de auspiciadores
        </h2>
        <ul className="grid gap-3">
          {premios.map((p) => {
            const auspiciador = obtenerAuspiciador(p.auspiciadorId);
            const alcanza = usuario.puntos >= p.costoPuntos;
            return (
              <li key={p.id} className="card-duo p-4">
                <div className="flex items-start gap-3">
                  <IconoPastilla nombre={auspiciador?.icono ?? "regalo"} tono={alcanza ? "primary" : "muted"} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold text-foreground">{p.titulo}</p>
                    <p className="text-xs text-muted-foreground">{auspiciador?.nombre}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.detalle}</p>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Icono nombre="calendario" className="h-3 w-3" /> {p.vigencia} ·{" "}
                      {p.condicion}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!alcanza}
                  onClick={() => guardarCupon(emitirCupon(p, usuario.nombre), p.costoPuntos)}
                  className={`btn-duo mt-3 ${alcanza ? "btn-duo-primary" : "btn-duo-ghost opacity-60"}`}
                >
                  {alcanza ? `Canjear por ${p.costoPuntos} pts` : `Necesitás ${p.costoPuntos} pts`}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="text-center text-xs text-muted-foreground">
        Auspiciadores de demostración con nombres ficticios. Se reemplazan por marcas reales al
        cerrar acuerdos comerciales.
      </p>

      <Link to="/jugar" className="btn-duo btn-duo-ghost">
        Seguir jugando para ganar puntos
      </Link>
    </Pantalla>
  );
}