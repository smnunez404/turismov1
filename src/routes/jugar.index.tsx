// SPEC-19 — Hub de juego rápido (P-19): ruleta, pregunta del día, duelo y racha.
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { categorias } from "@/data/categorias";
import { obtenerAuspiciador } from "@/data/auspiciadores";
import { medallasDe, proximaRecompensa, VIDAS_MAXIMAS } from "@/lib/juego";

export const Route = createFileRoute("/jugar/")({
  head: () => ({
    meta: [
      { title: "Jugar rápido — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Girá la ruleta de categorías cruceñas, respondé la pregunta del día y desafiá a un rival.",
      },
      { property: "og:title", content: "Jugar rápido — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Ruleta de categorías, pregunta del día y duelos 1v1 sobre Santa Cruz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HubJugar,
});

function HubJugar() {
  const { usuario } = useSesion();
  const medallas = medallasDe(usuario);
  const ganadas = medallas.filter((m) => m.ganada).length;
  const siguiente = proximaRecompensa(usuario.racha.dias);

  return (
    <Pantalla conNav className="gap-5">
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Modo rápido
        </p>
        <h1 className="text-2xl font-extrabold text-foreground">Jugá y sumá para tu liga</h1>
      </header>

      <section className="grid grid-cols-3 gap-2">
        <Indicador icono="racha" valor={`${usuario.racha.dias}`} etiqueta="días de racha" />
        <Indicador icono="vida" valor={`${usuario.vidas}/${VIDAS_MAXIMAS}`} etiqueta="vidas" />
        <Indicador icono="medalla" valor={`${ganadas}/6`} etiqueta="medallas" />
      </section>

      <section className="card-duo card-duo-activa p-5">
        <div className="flex items-start gap-3">
          <IconoPastilla nombre="ruleta" tono="primary" />
          <div className="min-w-0">
            <h2 className="text-lg font-extrabold text-foreground">Ruleta de categorías</h2>
            <p className="text-sm text-muted-foreground">
              Girá, te toca una categoría cruceña y respondés hasta fallar 3 veces.
            </p>
          </div>
        </div>
        <Link to="/jugar/ruleta" className="btn-duo btn-duo-primary mt-4">
          Girar la ruleta
        </Link>
      </section>

      <section className="grid gap-3">
        <Link to="/jugar/dia" className="card-duo flex items-center gap-3 p-4">
          <IconoPastilla nombre="calendario" tono="accent" />
          <span className="min-w-0 flex-1">
            <span className="block text-base font-extrabold text-foreground">
              Pregunta del día
            </span>
            <span className="block text-xs text-muted-foreground">
              {usuario.racha.preguntaDelDiaHecha
                ? "Ya la respondiste hoy · volvé mañana"
                : `Sumá tu racha · próximo premio: ${siguiente.premio}`}
            </span>
          </span>
          <Icono nombre="siguiente" className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/duelo" className="card-duo flex items-center gap-3 p-4">
          <IconoPastilla nombre="duelo" tono="secondary" />
          <span className="min-w-0 flex-1">
            <span className="block text-base font-extrabold text-foreground">Duelo 1v1</span>
            <span className="block text-xs text-muted-foreground">
              5 rondas contra un rival · {usuario.duelosGanados} duelos ganados
            </span>
          </span>
          <Icono nombre="siguiente" className="h-5 w-5 text-muted-foreground" />
        </Link>

        <Link to="/equipos" className="card-duo flex items-center gap-3 p-4">
          <IconoPastilla nombre="escudo" tono="primary" />
          <span className="min-w-0 flex-1">
            <span className="block text-base font-extrabold text-foreground">Mi equipo</span>
            <span className="block text-xs text-muted-foreground">
              Sumá tus puntos al marcador de tu zona
            </span>
          </span>
          <Icono nombre="siguiente" className="h-5 w-5 text-muted-foreground" />
        </Link>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Medallas por categoría
        </h2>
        <ul className="grid grid-cols-2 gap-3">
          {medallas.map((m) => {
            const auspiciador = obtenerAuspiciador(m.categoria.auspiciadorId);
            return (
              <li key={m.categoria.id} className="card-duo p-3">
                <div className="flex items-center gap-2">
                  <IconoPastilla nombre={m.categoria.icono} tono={m.ganada ? "primary" : "muted"} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-extrabold text-foreground">
                      {m.categoria.nombre}
                    </span>
                    <span className="block text-[11px] text-muted-foreground">
                      {m.aciertos}/{m.meta} aciertos
                    </span>
                  </span>
                </div>
                <div className="barra-duo mt-2 h-2.5">
                  <span className="barra-duo-fill" style={{ width: `${m.porcentaje}%` }} />
                </div>
                {auspiciador && (
                  <p className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                    <Icono nombre={auspiciador.icono} className="h-3 w-3" />
                    Presenta {auspiciador.nombre}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {categorias.length} categorías cruceñas · las medallas se muestran en tu perfil
        </p>
      </section>
    </Pantalla>
  );
}

function Indicador({
  icono,
  valor,
  etiqueta,
}: {
  icono: string;
  valor: string;
  etiqueta: string;
}) {
  return (
    <div className="card-duo flex flex-col items-center gap-0.5 p-3 text-center">
      <Icono nombre={icono} className="h-5 w-5 text-primary" />
      <span className="text-lg font-extrabold text-foreground">{valor}</span>
      <span className="text-[10px] leading-tight text-muted-foreground">{etiqueta}</span>
    </div>
  );
}