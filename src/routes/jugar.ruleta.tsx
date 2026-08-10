// SPEC-20 — Ruleta de categorías y partida rápida (P-20) + SPEC-21 resultado con medallas.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { useSesion } from "@/context/SessionContext";
import { categorias, ACIERTOS_PARA_MEDALLA } from "@/data/categorias";
import { obtenerAuspiciador } from "@/data/auspiciadores";
import { personajeDe } from "@/data/personajes";
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

const GAJO = 360 / categorias.length;
const SEGUNDOS = 20;

/** Fondo de la rueda: un gajo de color por categoría (estilo Preguntados). */
const gradienteRueda = `conic-gradient(${categorias
  .map((c, i) => {
    const color = personajeDe(c.id).color;
    return `${color} ${i * GAJO}deg ${(i + 1) * GAJO}deg`;
  })
  .join(", ")})`;

function Ruleta() {
  const { usuario, sumarPartida, gastarVida, recargarVidas } = useSesion();
  const [fase, setFase] = useState<Fase>("ruleta");
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [rotacion, setRotacion] = useState(0);
  const [cola, setCola] = useState<PreguntaRapida[]>([]);
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [fallos, setFallos] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [bombas, setBombas] = useState(1);
  const [descartadas, setDescartadas] = useState<string[]>([]);
  const [restante, setRestante] = useState(SEGUNDOS);
  const respondidaRef = useRef(false);

  const sinVidas = usuario.vidas <= 0;
  const pregunta = cola[indice];
  const personaje = categoria ? personajeDe(categoria.id) : null;

  function girar() {
    if (sinVidas || fase === "girando") return;
    setFase("girando");
    const { indice: i, categoria: elegida } = girarRuleta();
    // La flecha apunta arriba: llevamos el centro del gajo elegido a 0°.
    setRotacion((prev) => {
      const base = prev + 360 * 4;
      const objetivo = 360 - (i * GAJO + GAJO / 2);
      return base + ((objetivo - (base % 360) + 360) % 360);
    });
    window.setTimeout(() => {
      setCategoria(elegida);
      setCola(tandaDeCategoria(elegida.id, 6));
      setIndice(0);
      setSeleccion(null);
      setRespondida(false);
      respondidaRef.current = false;
      setDescartadas([]);
      setRestante(SEGUNDOS);
      setAciertos(0);
      setFallos(0);
      setPuntos(0);
      setBombas(1);
      gastarVida();
      setFase("jugando");
    }, 2600);
  }

  function responder(opcionId: string | null) {
    if (respondidaRef.current || !pregunta) return;
    respondidaRef.current = true;
    setSeleccion(opcionId);
    setRespondida(true);
    if (opcionId && opcionId === pregunta.respuestaCorrectaId) {
      setAciertos((a) => a + 1);
      setPuntos((p) => p + PUNTOS_POR_ACIERTO);
    } else {
      setFallos((f) => f + 1);
    }
  }

  // Temporizador por pregunta (referencia Preguntados).
  useEffect(() => {
    if (fase !== "jugando" || respondida) return;
    const id = window.setInterval(() => {
      setRestante((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          responder(null);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fase, respondida, indice]);

  function usarBomba() {
    if (!pregunta || bombas <= 0 || respondida) return;
    const malas = pregunta.opciones
      .filter((o) => o.id !== pregunta.respuestaCorrectaId)
      .map((o) => o.id)
      .slice(0, 2);
    setDescartadas(malas);
    setBombas((b) => b - 1);
  }

  function continuar() {
    const esUltima = indice + 1 >= cola.length;
    if (fallos >= FALLOS_PERMITIDOS || esUltima) {
      if (categoria) sumarPartida({ categoriaId: categoria.id, aciertos, puntos });
      setFase("fin");
      return;
    }
    setIndice((i) => i + 1);
    setSeleccion(null);
    setRespondida(false);
    respondidaRef.current = false;
    setDescartadas([]);
    setRestante(SEGUNDOS);
  }

  // ---------- Fin de partida ----------
  if (fase === "fin" && categoria) {
    const totalCategoria = usuario.medallas[categoria.id] ?? 0;
    const medalla = totalCategoria >= ACIERTOS_PARA_MEDALLA;
    return (
      <Pantalla conNav className="gap-5">
        <header className="text-center">
          <img
            src={personajeDe(categoria.id).imagen}
            alt=""
            loading="lazy"
            width={640}
            height={640}
            className="mx-auto h-28 w-28 object-contain"
          />
          <h1 className="mt-2 text-2xl font-extrabold text-foreground">
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
  if (fase === "jugando" && pregunta && categoria && personaje) {
    const correcta = seleccion === pregunta.respuestaCorrectaId;
    return (
      <Pantalla className="gap-4 pb-44">
        {/* Cabecera tipo marcador de partida */}
        <header className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <AvatarInsignia avatarId={usuario.avatarId} avatar={usuario.avatar} tamano="sm" />
            <span className="text-lg font-extrabold text-foreground">{aciertos}</span>
          </div>
          <span className="text-xs font-extrabold tracking-widest text-muted-foreground">VS</span>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold text-foreground">{fallos}</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted ring-1 ring-border">
              <Icono nombre="ruleta" className="h-5 w-5 text-muted-foreground" />
            </span>
          </div>
        </header>

        {/* Banda de categoría con su color y personaje */}
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-white"
          style={{ backgroundColor: personaje.color }}
        >
          <img
            src={personaje.imagen}
            alt=""
            loading="lazy"
            width={640}
            height={640}
            className="h-12 w-12 shrink-0 object-contain drop-shadow"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold">{categoria.nombre}</p>
            <p className="truncate text-xs opacity-90">
              Pregunta {indice + 1} de {cola.length} · {personaje.nombre}
            </p>
          </div>
          <span className="ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/25 text-base font-extrabold">
            {restante}
          </span>
        </div>

        <div className="barra-duo">
          <span
            className="barra-duo-fill"
            style={{ width: `${Math.round((restante / SEGUNDOS) * 100)}%` }}
          />
        </div>

        <h1 className="text-xl font-extrabold text-foreground">{pregunta.enunciado}</h1>

        <ul className="grid gap-3">
          {pregunta.opciones.map((op) => {
            const elegida = seleccion === op.id;
            const esCorrecta = op.id === pregunta.respuestaCorrectaId;
            const fuera = descartadas.includes(op.id);
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
                  disabled={respondida || fuera}
                  onClick={() => responder(op.id)}
                  className={`w-full rounded-2xl border-2 border-b-4 p-3.5 text-left text-base font-bold text-foreground transition-colors ${tono} ${
                    fuera ? "opacity-30 line-through" : ""
                  }`}
                >
                  {op.texto}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Comodines */}
        {!respondida && (
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={usarBomba}
              disabled={bombas <= 0}
              className="inline-flex items-center gap-2 rounded-full border-2 border-b-4 border-border bg-card px-4 py-2 text-xs font-extrabold text-foreground disabled:opacity-40"
            >
              <Icono nombre="destello" className="h-4 w-4 text-accent" />
              Bomba ({bombas})
            </button>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-b-4 border-border bg-card px-4 py-2 text-xs font-extrabold text-foreground">
              <Icono nombre="vida" className="h-4 w-4 text-destructive" />
              {usuario.vidas}
            </span>
          </div>
        )}

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
                {correcta ? "¡Correcto!" : seleccion ? "Casi..." : "Se acabó el tiempo"}
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

      <div className="relative mx-auto aspect-square w-full max-w-xs" aria-live="polite">
        {/* Flecha indicadora */}
        <span className="absolute -top-1 left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[20px] border-x-transparent border-t-foreground" />
        <div
          className="absolute inset-0 rounded-full ring-4 ring-foreground/10"
          style={{
            background: gradienteRueda,
            transform: `rotate(${rotacion}deg)`,
            transition: "transform 2.5s cubic-bezier(0.17, 0.85, 0.25, 1)",
          }}
        >
          {categorias.map((c, i) => {
            const ang = ((i * GAJO + GAJO / 2) * Math.PI) / 180;
            const r = 33;
            return (
              <span
                key={c.id}
                className="absolute flex h-14 w-14 items-center justify-center"
                style={{
                  left: `${50 + r * Math.sin(ang)}%`,
                  top: `${50 - r * Math.cos(ang)}%`,
                  transform: `translate(-50%, -50%) rotate(${i * GAJO + GAJO / 2}deg)`,
                }}
              >
                <img
                  src={personajeDe(c.id).imagen}
                  alt=""
                  loading="lazy"
                  width={640}
                  height={640}
                  className="h-12 w-12 object-contain drop-shadow"
                />
              </span>
            );
          })}
        </div>
        {/* Botón central GIRAR */}
        <button
          type="button"
          onClick={girar}
          disabled={fase === "girando" || sinVidas}
          className="absolute top-1/2 left-1/2 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-card bg-foreground text-sm font-extrabold tracking-wide text-background shadow-lg disabled:opacity-60"
        >
          {fase === "girando" ? "..." : "GIRAR"}
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-muted-foreground">
        <Icono nombre="vida" className="h-4 w-4 text-destructive" />
        {usuario.vidas} vidas · cada giro usa una
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
      ) : null}

      <section className="card-duo p-4">
        <p className="text-xs font-extrabold text-foreground">Personajes por categoría</p>
        <ul className="mt-3 grid grid-cols-3 gap-3">
          {categorias.map((c) => {
            const p = personajeDe(c.id);
            const ganada = (usuario.medallas[c.id] ?? 0) >= ACIERTOS_PARA_MEDALLA;
            return (
              <li key={c.id} className="flex flex-col items-center gap-1 text-center">
                <span
                  className="relative inline-flex h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${p.color}22` }}
                >
                  <img
                    src={p.imagen}
                    alt=""
                    loading="lazy"
                    width={640}
                    height={640}
                    className={`h-10 w-10 object-contain ${ganada ? "" : "opacity-60 grayscale"}`}
                  />
                  {ganada && (
                    <Icono
                      nombre="medalla"
                      className="absolute -right-1 -bottom-1 h-4 w-4 text-accent"
                    />
                  )}
                </span>
                <span className="text-[10px] leading-tight font-bold text-muted-foreground">
                  {p.nombre}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

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
