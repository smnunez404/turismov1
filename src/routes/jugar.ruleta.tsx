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
import { FALLOS_PERMITIDOS, PUNTOS_POR_ACIERTO, girarRuleta, tandaDeCategoria } from "@/lib/juego";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";

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

function useMovimientoReducido() {
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const actualizar = () => setReducido(consulta.matches);
    actualizar();
    consulta.addEventListener("change", actualizar);
    return () => consulta.removeEventListener("change", actualizar);
  }, []);

  return reducido;
}

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
  const [anuncioRuleta, setAnuncioRuleta] = useState("Ruleta lista para girar.");
  const movimientoReducido = useMovimientoReducido();
  const respondidaRef = useRef(false);
  const timeoutGiroRef = useRef<number | null>(null);
  const tituloFinRef = useRef<HTMLHeadingElement>(null);
  const proteccionActiva = fase === "girando" || fase === "jugando";
  const { salir } = useSalidaProtegida(
    proteccionActiva,
    "¿Querés salir? Se perderá el progreso de este giro o partida y la vida utilizada no se recuperará.",
  );

  useEffect(
    () => () => {
      if (timeoutGiroRef.current !== null) window.clearTimeout(timeoutGiroRef.current);
    },
    [],
  );

  const sinVidas = usuario.vidas <= 0;
  const pregunta = cola[indice];
  const personaje = categoria ? personajeDe(categoria.id) : null;

  function girar() {
    if (sinVidas || fase === "girando") return;
    setFase("girando");
    setAnuncioRuleta("Girando la ruleta.");
    const { indice: i, categoria: elegida } = girarRuleta();

    // La flecha está arriba en 0° (12 en punto).
    // El gajo `i` empieza en `i * GAJO` y termina en `(i + 1) * GAJO`.
    // El centro del gajo está en `i * GAJO + GAJO / 2`.
    // Para que ese centro quede arriba al rotar en sentido horario,
    // debemos rotar un total de vueltas completas + (360 - centro).
    const centroGajo = i * GAJO + GAJO / 2;
    const anguloDestino = (360 - centroGajo + 360) % 360;

    setRotacion((prev) => {
      // Damos 6 vueltas completas (2160°) más el ángulo hacia el destino
      const vueltasExtra = 360 * 6;
      const rotacionActualNormalizada = prev % 360;
      const distancia = (anguloDestino - rotacionActualNormalizada + 360) % 360;
      return prev + vueltasExtra + (distancia === 0 ? 360 : distancia);
    });

    // Siempre dar 3200ms para que el usuario disfrute la animación de giro antes de pasar a la pregunta
    timeoutGiroRef.current = window.setTimeout(
      () => {
        timeoutGiroRef.current = null;
        setCategoria(elegida);
        setAnuncioRuleta(`Categoría elegida: ${elegida.nombre}.`);
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
      },
      3200,
    );
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

  useEffect(() => {
    if (fase === "fin") tituloFinRef.current?.focus();
  }, [fase]);

  // ---------- Fin de partida ----------
  if (fase === "fin" && categoria) {
    const totalCategoria = usuario.medallas[categoria.id] ?? 0;
    const medalla = totalCategoria >= ACIERTOS_PARA_MEDALLA;
    const medallaNueva = medalla && totalCategoria - aciertos < ACIERTOS_PARA_MEDALLA;
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
          <h1
            ref={tituloFinRef}
            tabIndex={-1}
            className="mt-2 text-2xl font-extrabold text-foreground focus:outline-none"
          >
            {medallaNueva
              ? "¡Nueva medalla conseguida!"
              : medalla
                ? "La medalla sigue en tu colección"
                : "Buena partida"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Categoría {categoria.nombre} · {aciertos} aciertos · +{puntos} XP · +{5 + aciertos}{" "}
            monedas
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
          <button
            type="button"
            className="btn-duo btn-duo-primary"
            onClick={() => {
              setFase("ruleta");
              setAnuncioRuleta("Ruleta lista para girar.");
            }}
          >
            Volver a jugar
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
        <p role="status" aria-live="polite" className="sr-only">
          {anuncioRuleta}
        </p>
        {/* Cabecera unificada: Salir, Marcador y Temporizador */}
        <header className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => salir("/jugar")}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-border bg-card px-2.5 text-xs font-extrabold text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Icono nombre="volver" className="h-3.5 w-3.5" /> Salir
          </button>

          {/* Contador de Aciertos y Corazones de fallos restantes */}
          <div className="flex items-center gap-3 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-black shadow-xs">
            <span className="flex items-center gap-1 text-primary">
              <Icono nombre="check" className="h-3.5 w-3.5" />
              <span>{aciertos}</span>
            </span>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            {/* 3 corazones de fallos permitidos */}
            <div
              className="flex items-center gap-1"
              aria-label={`${FALLOS_PERMITIDOS - fallos} intentos restantes`}
            >
              {Array.from({ length: FALLOS_PERMITIDOS }).map((_, i) => {
                const perdido = i < fallos;
                return (
                  <span
                    key={i}
                    className={`transition-transform duration-300 ${perdido ? "scale-90 opacity-30" : "scale-100 text-destructive"}`}
                  >
                    <Icono
                      nombre="vida"
                      className={`h-4 w-4 ${perdido ? "text-muted-foreground" : "text-destructive drop-shadow-xs"}`}
                    />
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex shrink-0 items-center justify-center">
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-black transition-colors ${
                restante <= 3
                  ? "border-destructive bg-destructive/15 text-destructive animate-pulse"
                  : "border-primary/40 bg-primary/10 text-primary"
              }`}
            >
              {restante}
            </span>
          </div>
        </header>

        {/* Banda de categoría compacta */}
        <div
          className="flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-white shadow-xs"
          style={{ backgroundColor: personaje.color }}
        >
          <img
            src={personaje.imagen}
            alt=""
            loading="lazy"
            width={640}
            height={640}
            className="h-10 w-10 shrink-0 object-contain drop-shadow-md"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-black tracking-wide uppercase">
              {categoria.nombre}
            </p>
            <p className="truncate text-[11px] opacity-90">
              Pregunta {indice + 1} de {cola.length} · {personaje.nombre}
            </p>
          </div>
        </div>

        <div className="barra-duo h-1.5">
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
            const estado = !respondida
              ? elegida
                ? "is-selected"
                : ""
              : esCorrecta
                ? "is-correct"
                : elegida
                  ? "is-incorrect"
                  : "";

            return (
              <li key={op.id}>
                <button
                  type="button"
                  disabled={respondida || fuera}
                  onClick={() => responder(op.id)}
                  className={`opcion-juego ${estado} ${
                    fuera ? "opacity-30 line-through pointer-events-none" : ""
                  }`}
                >
                  <span className="flex-1">{op.texto}</span>
                  {respondida && esCorrecta && (
                    <Icono nombre="acierto" className="h-5 w-5 shrink-0" />
                  )}
                  {respondida && elegida && !esCorrecta && (
                    <Icono nombre="error" className="h-5 w-5 shrink-0" />
                  )}
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
              className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-b-4 border-border bg-card px-4 py-2 text-xs font-extrabold text-foreground disabled:opacity-40"
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
            role="status"
            aria-live="assertive"
            aria-atomic="true"
            className={`fixed inset-x-0 bottom-0 z-30 border-t-2 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] bg-background/95 backdrop-blur ${
              correcta
                ? "border-primary/40 bg-primary/12 text-foreground"
                : "border-destructive/40 bg-destructive/10 text-foreground"
            }`}
          >
            <div className="mx-auto max-w-md">
              <p className="flex items-center gap-2 text-sm font-extrabold">
                <Icono
                  nombre={correcta ? "acierto" : "error"}
                  className={`h-5 w-5 ${correcta ? "text-primary" : "text-destructive"}`}
                />
                {correcta
                  ? "¡Correcto!"
                  : seleccion
                    ? "Casi. Ahora ya lo sabés:"
                    : "Se acabó el tiempo"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
              <button
                type="button"
                className={`btn-duo mt-3 ${correcta ? "btn-duo-primary" : "btn-duo-destructive"}`}
                onClick={continuar}
              >
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
      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {anuncioRuleta}
      </p>
      {fase === "girando" && (
        <button
          type="button"
          onClick={() => salir("/jugar")}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-xl px-3 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <Icono nombre="volver" className="h-4 w-4" /> Cancelar giro
        </button>
      )}
      <header className="text-center">
        <h1 className="text-2xl font-extrabold text-foreground">Ruleta cruceña</h1>
        <p className="text-sm text-muted-foreground">
          Seis categorías, una partida por giro. Cada giro usa una vida.
        </p>
      </header>

      <div
        className="relative mx-auto aspect-square w-full max-w-xs"
        aria-label="Ruleta de categorías"
        aria-busy={fase === "girando"}
      >
        {/* Flecha indicadora */}
        <span className="absolute -top-1 left-1/2 z-20 h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[20px] border-x-transparent border-t-foreground" />
        <div
          className="absolute inset-0 rounded-full ring-4 ring-foreground/10 will-change-transform pointer-events-none"
          style={{
            background: gradienteRueda,
            transform: `rotate(${rotacion}deg)`,
            transition: "transform 3s cubic-bezier(0.15, 0.85, 0.25, 1)",
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
        {/* Botón central GIRAR con relieve 3D y brillo */}
        <button
          type="button"
          onClick={girar}
          disabled={fase === "girando" || sinVidas}
          aria-label={fase === "girando" ? "Girando la ruleta" : "Girar la ruleta"}
          className="absolute top-1/2 left-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border-4 border-white bg-card text-foreground shadow-[0_8px_20px_rgba(0,0,0,0.25)] ring-4 ring-primary/40 transition-transform hover:scale-105 active:scale-95 disabled:opacity-60"
        >
          <span className="text-sm font-black tracking-wider text-primary uppercase">
            {fase === "girando" ? "Girando…" : "GIRAR"}
          </span>
          <span className="text-[9px] font-bold text-muted-foreground">1 vida</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-muted-foreground">
        <Icono nombre="vida" className="h-4 w-4 text-destructive" />
        {usuario.vidas} {usuario.vidas === 1 ? "vida disponible" : "vidas disponibles"}
      </div>

      {sinVidas ? (
        <section className="card-duo p-5 text-center">
          <IconoPastilla nombre="vida" tono="muted" className="mx-auto" />
          <p className="mt-2 text-sm font-extrabold text-foreground">Te quedaste sin vidas</p>
          <p className="text-sm text-muted-foreground">
            Recuperá tus vidas para seguir jugando con esta cortesía especial.
          </p>
          <button
            type="button"
            className="btn-duo btn-duo-accent mt-4"
            onClick={() => recargarVidas(3)}
          >
            Recargar 3 vidas · Cortesía de Bar Piraí
          </button>
        </section>
      ) : null}

      <section className="card-duo p-4">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-xs font-extrabold text-foreground uppercase tracking-wider">
            Personajes por categoría
          </p>
          <span className="text-[11px] font-bold text-primary">6 temáticas</span>
        </div>
        <ul className="mt-2 grid grid-cols-3 gap-2.5">
          {categorias.map((c) => {
            const p = personajeDe(c.id);
            const ganada = (usuario.medallas[c.id] ?? 0) >= ACIERTOS_PARA_MEDALLA;
            return (
              <li
                key={c.id}
                className={`flex flex-col items-center gap-1.5 rounded-xl border p-2 text-center transition-all ${
                  ganada ? "border-primary/40 bg-primary/5" : "border-border/60 bg-muted/20"
                }`}
              >
                <span
                  className="relative inline-flex h-12 w-12 items-center justify-center rounded-full shadow-xs"
                  style={{ backgroundColor: `${p.color}25` }}
                >
                  <img
                    src={p.imagen}
                    alt=""
                    loading="lazy"
                    width={640}
                    height={640}
                    className={`h-9 w-9 object-contain drop-shadow-xs ${ganada ? "" : "opacity-75"}`}
                  />
                  {ganada && (
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-black text-accent-foreground shadow-xs">
                      ★
                    </span>
                  )}
                </span>
                <span className="truncate max-w-full text-[11px] font-extrabold text-foreground">
                  {p.nombre}
                </span>
                <span className="truncate max-w-full text-[10px] text-muted-foreground leading-none">
                  {c.nombre}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <Link
        to="/jugar"
        className="inline-flex min-h-10 items-center justify-center text-center text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4"
      >
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
        <span className="block text-[11px] font-bold tracking-widest text-secondary uppercase">
          Auspiciador ficticio · demo
        </span>
        <span className="block font-extrabold text-foreground">{auspiciador.nombre}</span>
        Ejemplo conceptual: {auspiciador.mensaje}
      </p>
    </aside>
  );
}
