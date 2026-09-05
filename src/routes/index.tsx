import { useState } from "react";
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
  const [modalPremiosAbierto, setModalPremiosAbierto] = useState(false);

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
          {/* Botón interactivo para ver premios */}
          <button
            type="button"
            onClick={() => setModalPremiosAbierto(true)}
            className="mb-2.5 inline-flex items-center gap-2 rounded-full bg-accent/95 px-3 py-1 text-[11px] font-black text-foreground uppercase tracking-wider shadow-lg hover:bg-accent transition-all cursor-pointer animate-pulse active:scale-95"
          >
            <span>🎁 ¡Jugá por premios reales!</span>
            <span className="rounded-full bg-black/15 px-1.5 py-0.2 text-[9px]">Ver premios →</span>
          </button>

          <h1
            id="reto-principal"
            className="max-w-[10ch] text-balance text-[2.75rem] leading-[0.95] font-extrabold tracking-[-0.03em] text-white drop-shadow-lg sm:text-[3.5rem]"
          >
            Santa Cruz te espera.
          </h1>
          <p className="mt-3 max-w-[32ch] text-pretty text-sm leading-relaxed font-semibold text-white/90 drop-shadow-sm sm:text-base">
            Demostrá cuánto conocés su cultura, sumá puntos en cada nivel y canjeá premios exclusivos.
          </p>

          <div className="mt-6 flex flex-col gap-3">
            {/* El botón principal abre el gancho de premios y de ahí ingresa directamente a las preguntas */}
            <button
              type="button"
              onClick={() => setModalPremiosAbierto(true)}
              className="btn-duo btn-duo-primary flex min-h-14 w-full items-center justify-center gap-3 text-base font-extrabold tracking-wide uppercase shadow-xl transition-transform active:scale-[0.98] cursor-pointer"
            >
              <span>Jugar ahora</span>
              <Icono nombre="siguiente" className="size-5" />
            </button>

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

      {/* ── Modal Promocional de Premios Reales (Splash Ganador sin barra de celular) ── */}
      {modalPremiosAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-3 sm:p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative flex max-h-[92vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl border-2 border-accent bg-card text-foreground shadow-2xl">
            {/* Imagen limpia de la promoción (sin barra de wifi/batería/reloj) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
              <img
                src="/camino/premios_splash_clean.jpg"
                alt="Recompensas Reales Santa Cruz"
                width={768}
                height={576}
                className="h-full w-full object-cover object-top"
              />
              <button
                type="button"
                onClick={() => setModalPremiosAbierto(false)}
                className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white font-extrabold hover:bg-black/90 transition-colors cursor-pointer text-xs"
                aria-label="Cerrar ventana"
              >
                Cerrar
              </button>
            </div>

            {/* Contenido ampliado de premios sin límites */}
            <div className="p-4 text-center flex flex-col gap-2">
              <span className="mx-auto w-fit rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-primary">
                Premios y Beneficios Exclusivos
              </span>

              <h2 className="text-lg sm:text-xl font-black text-foreground tracking-tight leading-tight">
                ¡Tu Conocimiento Vale Premios Reales!
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Respondé bien los desafíos de Santa Cruz para sumar monedas y canjear:
              </p>

              {/* Categorías de premios ampliadas */}
              <div className="grid grid-cols-2 gap-2 text-left my-1">
                <div className="rounded-xl border border-border bg-muted/40 p-2 flex items-center gap-2">
                  <Icono nombre="cine" className="h-4 w-4 text-accent-foreground shrink-0" />
                  <span className="text-[11px] font-bold text-foreground leading-tight">
                    Cine 2x1 y entretenimiento
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-2 flex items-center gap-2">
                  <Icono nombre="gastronomia" className="h-4 w-4 text-secondary shrink-0" />
                  <span className="text-[11px] font-bold text-foreground leading-tight">
                    Combos típicos y gastronomía
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-2 flex items-center gap-2">
                  <Icono nombre="tour" className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-[11px] font-bold text-foreground leading-tight">
                    Tours y viajes chiquitanos
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-2 flex items-center gap-2">
                  <Icono nombre="certificado" className="h-4 w-4 text-accent-foreground shrink-0" />
                  <span className="text-[11px] font-bold text-foreground leading-tight">
                    Becas y talleres culturales
                  </span>
                </div>
              </div>

              {/* Botón que manda directo a las preguntas */}
              <Link
                to="/partida"
                className="btn-duo btn-duo-primary mt-2 w-full py-3.5 text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
              >
                <span>¡Comenzar Desafío Ahora!</span>
                <Icono nombre="siguiente" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
