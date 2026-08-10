// SPEC-20 — Ruleta de categorías y partida rápida (P-20) + SPEC-21 resultado con medallas.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { categorias, ACIERTOS_PARA_MEDALLA } from "@/data/categorias";
import { obtenerAuspiciador } from "@/data/auspiciadores";
import type { Categoria, PreguntaRapida } from "@/data/tipos";
import {
  FALLOS_PERMITIDOS,
  PUNTOS_POR_ACIERTO,
  girarRuleta,
  tandaDeCategoria,
} from "@/lib/juego";

export const Route = createFileRoute("/jugar/ruleta")({
  head: () => ({
    meta: [
      { title: "Ruleta cruceña — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Girá la ruleta, te toca una categoría de Santa Cruz y respondés hasta fallar tres veces.",
      },
      { property: "og:title", content: "Ruleta cruceña — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Historia, naturaleza, gastronomía, tradición, personajes y la ciudad de hoy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ruleta,
});

type Fase = "ruleta" | "girando" | "jugando" | "fin";

function Ruleta() {
  const { usuario, sumarPartida, gastarVida, recargarVidas } = useSesion();
  const [fase, setFase] = useState<Fase>("ruleta");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [cola, setCola] = useState<PreguntaRapida[]>([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [puntos, setPuntos] = useState(0);

  const sinVidas = usuario.vidas <= 0;

  function girar() {
    if (sinVidas) return;
    setFase("girando");
    const { categoria: elegida } = girarRuleta();
    window.setTimeout(() => {
      setCategoria(elegida);
      setCola(tandaDeCategoria(elegida.id, 6));
      setIndice(0);
      setSeleccion(null);
      setRespondida(false);
      setAciertos(0);
      setFallos(0);
      setPuntos(0);
      gastarVida();
      setFase("jugando");
    }, 1100);
  }

  const pregunta = cola[indice];

  function responder(opcionId: string) {
    if (respondida || !pregunta) return;
    setSeleccion(opcionId);
    setRespondida(true);
    if (opcionId === pregunta.respuestaCorrectaId) {
      setAciertos((a) => a + 1);
      setPuntos((p) => p + PUNTOS_POR_ACIERTO);
    } else {
      setFallos((f) => f + 1);
    }
  }

  function continuar() {
    const fallosTotales = fallos;
    const esUltima = indice + 1 >= cola.length;
    if (fallosTotales >= FALLOS_PERMITIDOS || esUltima) {
      if (categoria) sumarPartida({ categoriaId: categoria.id, aciertos, puntos });
      setFase("fin");
      return;
    }
    setIndice((i) => i + 1);
    setSeleccion(null);
    setRespondida(false);
  }

  // ---------- Fin de partida ----------
  if (fase === "fin" && categoria) {
    const totalCategoria = (usuario.medallas[categoria.id] ?? 0);
    const medalla = totalCategoria >= ACIERTOS_PARA_MEDALLA;
    return (
      <Pantalla conNav className="gap-5">
        <header className="text-center">
          <IconoPastilla nombre={medalla ? "medalla" : "celebrar"} tono="accent" className="mx-auto" />
          <h1 className="mt-3 text-2xl font-extrabold text-foreground">
            {medalla ? "¡Medalla conseguida!" : "Buena partida"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Categoría {categoria.nombre} · {aciertos} aciertos · +{puntos} pts
          </p>
        </header>

        <section className="card-duo p-5">
          <p className="text-sm text-muted-foreground">
            Progreso en {categoria.nombre}: {Math.min(totalCategoria, ACIERTOS_PARA_MEDALLA)} de{" "}
            {ACIERTOS_PARA_MEDALLA} aciertos para la medalla.
          </p>
          <div className="barra-duo mt-2">
            <span
              className="barra-duo-fill"
              style={{
                width: `${Math.min(100, Math.round((totalCategoria / ACIERTOS_PARA_MEDALLA) * 100))}%`,
              }}
            />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Tus puntos también suman a la liga semanal y al marcador de tu equipo.
          </p>
        </section>

        <AvisoAuspiciador />

        <div className="grid gap-3">
          <button type="button" className="btn-duo btn-duo-primary" onClick={() => setFase("ruleta")}>
            Girar de nuevo
          </button>
          <Link to="/liga" className="btn-duo btn-duo-ghost">
            Ver mi liga
          </Link>
        </div>
      </Pantalla>
    );
  }

  // ---------- Partida ----------
  if (fase === "jugando" && pregunta && categoria) {
    const correcta = seleccion === pregunta.respuestaCorrectaId;
    return (
      <Pantalla className="gap-4 pb-44">
        <header className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-b-4 border-border bg-card px-3 py-1 text-xs font-extrabold text-foreground">
            <Icono nombre={categoria.icono} className="h-4 w-4 text-primary" />
            {categoria.nombre}
          </span>
          <span className="flex items-center gap-1 text-sm font-extrabold text-destructive">
            {Array.from({ length: FALLOS_PERMITIDOS }, (_, i) => (
              <Icono
                key={i}
                nombre="vida"
                className={`h-4 w-4 ${i < FALLOS_PERMITIDOS - fallos ? "" : "opacity-25"}`}
              />
            ))}
          </span>
        </header>

        <div className="barra-duo">
          <span
            className="barra-duo-fill"
            style={{ width: `${Math.round(((indice + 1) / cola.length) * 100)}%` }}
          />
        </div>

        <h1 className="text-xl font-extrabold text-foreground">{pregunta.enunciado}</h1>

        <ul className="grid gap-3">
          {pregunta.opciones.map((op) => {
            const elegida = seleccion === op.id;
            const esCorrecta = op.id === pregunta.respuestaCorrectaId;
            const tono = !respondida
              ? "border-border bg-card"
              : esCorrecta
                ? "border-primary bg-primary/10"
                : elegida
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-card opacity-60";
            return (
              <li key={op.id}>
                <button
                  type="button"
                  disabled={respondida}
                  onClick={() => responder(op.id)}
                  className={`w-full rounded-2xl border-2 border-b-4 p-3.5 text-left text-base font-bold text-foreground transition-colors ${tono}`}
                >
                  {op.texto}
                </button>
              </li>
            );
          })}
        </ul>

        {respondida && (
          <div
            className={`fixed inset-x-0 bottom-0 z-30 border-t-2 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] ${
              correcta
                ? "border-primary/40 bg-primary/10"
                : "border-destructive/40 bg-destructive/10"
            }`}
          >
            <div className="mx-auto max-w-md">
              <p className="text-sm font-extrabold text-foreground">
                {correcta ? "¡Correcto!" : "Casi..."}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
              <button type="button" className="btn-duo btn-duo-primary mt-3" onClick={continuar}>
                Continuar
              </button>
            </div>
          </div>
        )}
      </Pantalla>
    );
  }

  // ---------- Ruleta ----------
  return (
    <Pantalla conNav className="gap-5">
      <header className="text-center">
        <h1 className="text-2xl font-extrabold text-foreground">Ruleta cruceña</h1>
        <p className="text-sm text-muted-foreground">
          Seis categorías, una partida por giro. Cada giro usa una vida.
        </p>
      </header>

      <div
        className={`mx-auto grid aspect-square w-full max-w-xs grid-cols-3 place-items-center gap-2 rounded-full border-2 border-b-4 border-border bg-card p-4 ${
          fase === "girando" ? "animate-spin" : ""
        }`}
        style={fase === "girando" ? { animationDuration: "700ms" } : undefined}
        aria-live="polite"
      >
        {categorias.map((c) => (
          <div key={c.id} className="flex flex-col items-center gap-1 text-center">
            <IconoPastilla nombre={c.icono} tono={c.tono} />
            <span className="text-[10px] leading-tight font-bold text-muted-foreground">
              {c.nombre}
            </span>
          </div>
        ))}
      </div>

      {sinVidas ? (
        <section className="card-duo p-5 text-center">
          <IconoPastilla nombre="vida" tono="muted" className="mx-auto" />
          <p className="mt-2 text-sm font-extrabold text-foreground">Te quedaste sin vidas</p>
          <p className="text-sm text-muted-foreground">
            Se recargan solas con el tiempo, o te invita una Bar Piraí.
          </p>
          <button
            type="button"
            className="btn-duo btn-duo-accent mt-4"
            onClick={() => recargarVidas(5)}
          >
            Recargar cortesía de Bar Piraí
          </button>
        </section>
      ) : (
        <button
          type="button"
          className="btn-duo btn-duo-primary"
          onClick={girar}
          disabled={fase === "girando"}
        >
          {fase === "girando" ? "Girando..." : `Girar (${usuario.vidas} vidas)`}
        </button>
      )}

      <Link to="/jugar" className="text-center text-sm text-muted-foreground underline underline-offset-4">
        Volver al modo rápido
      </Link>
    </Pantalla>
  );
}

function AvisoAuspiciador() {
  const auspiciador = obtenerAuspiciador("a-cine");
  if (!auspiciador) return null;
  return (
    <aside className="card-duo flex items-center gap-3 border-dashed p-4">
      <IconoPastilla nombre={auspiciador.icono} tono="accent" />
      <p className="text-xs text-muted-foreground">
        <span className="block font-extrabold text-foreground">{auspiciador.nombre}</span>
        {auspiciador.mensaje}
      </p>
    </aside>
  );
}