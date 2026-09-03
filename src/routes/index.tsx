import { createFileRoute, Link } from "@tanstack/react-router";
import { Icono } from "@/components/Icono";
import hero from "@/assets/hero-santacruz.jpg";
import marca from "@/assets/marca-embajador.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "¿Cuánto conocés Santa Cruz? — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Cinco desafíos rápidos para descubrir cuánto conocés Santa Cruz.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-foreground text-primary-foreground">
      <img
        src={hero}
        alt="Escenario ilustrado de Santa Cruz de la Sierra con naturaleza, ciudad y su catedral"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover object-[57%_center] sm:object-center"
      />
      <div className="landing-scrim absolute inset-0" />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
        <header
          className="flex items-center justify-between gap-4"
          aria-label="Soy Embajador Bolivia"
        >
          <div className="flex min-w-0 items-center gap-3">
            <img
              src={marca}
              alt=""
              width={512}
              height={512}
              className="h-12 w-12 shrink-0 rounded-2xl border border-white/20 bg-card p-1 shadow-xl"
            />
            <div className="min-w-0 drop-shadow-md">
              <p className="truncate text-sm font-extrabold tracking-[0.08em]">SOY EMBAJADOR</p>
              <p className="text-[11px] font-extrabold tracking-[0.28em] text-accent">BOLIVIA</p>
            </div>
          </div>
          <p className="border-l border-white/25 pl-3 text-right text-[10px] leading-tight font-extrabold tracking-[0.16em] text-white/75 uppercase">
            Edición
            <br />
            Santa Cruz
          </p>
        </header>

        <section className="mt-auto" aria-labelledby="reto-principal">
          <p className="mb-2 text-xs font-extrabold tracking-[0.2em] text-accent uppercase drop-shadow-sm">
            Aventura de conocimiento
          </p>
          <h1
            id="reto-principal"
            className="max-w-[10ch] text-balance text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.03em] text-white drop-shadow-lg sm:text-[3.5rem]"
          >
            Santa Cruz te espera.
          </h1>
          <p className="mt-3 max-w-[28ch] text-pretty text-sm leading-relaxed font-semibold text-white/90 drop-shadow-sm sm:text-base">
            Descubrí cuánto sabés de sus lugares, sabores e historias.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              to="/setup"
              className="btn-duo btn-duo-primary flex min-h-14 w-full items-center justify-center gap-3 text-base font-extrabold tracking-wide uppercase shadow-xl transition-transform active:scale-[0.98]"
            >
              <span>Jugar ahora</span>
              <Icono nombre="siguiente" className="size-5" />
            </Link>

            <Link
              to="/login"
              className="inline-flex min-h-11 items-center justify-center gap-2 text-center text-xs font-bold text-white/80 hover:text-white transition-colors"
            >
              <Icono nombre="perfil" className="size-3.5" />
              ¿Ya tenés cuenta?{" "}
              <span className="underline underline-offset-4 text-accent">
                Recuperar mi progreso
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
