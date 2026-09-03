import { useCallback, useEffect, useRef, useState } from "react";
import { Icono, type NombreIcono } from "@/components/Icono";
import type { Desafio, RespuestaDesafio, ResultadoDesafio, ResumenPartida } from "@/data/tipos";
import { evaluarDesafio, resumirPartida, seleccionarCinco } from "@/features/game/engine";
import { registrarEvento } from "@/features/analytics/memory";

const TIEMPO_PREDETERMINADO = 15;
type MotivoResolucion = "respuesta" | "tiempo";

export function PartidaCinco({
  id,
  modo,
  semilla,
  fechaDiaria,
  recompensaAplicable = true,
  onComplete,
  onExit,
}: {
  id: string;
  modo: ResumenPartida["modo"];
  semilla: number;
  fechaDiaria?: string;
  /** Controla únicamente la comunicación visual; la sesión conserva la idempotencia real. */
  recompensaAplicable?: boolean;
  onComplete: (resumen: ResumenPartida, botAciertos?: number) => void;
  onExit?: () => void;
}) {
  const [desafios] = useState(() => seleccionarCinco(semilla));
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<RespuestaDesafio | null>(null);
  const [resultado, setResultado] = useState<ResultadoDesafio | null>(null);
  const [motivoResolucion, setMotivoResolucion] = useState<MotivoResolucion | null>(null);
  const [terminada, setTerminada] = useState(false);
  const [restanteMs, setRestanteMs] = useState(
    () => (desafios[0]?.tiempoSegundos ?? TIEMPO_PREDETERMINADO) * 1000,
  );
  const resultadosRef = useRef<Record<string, ResultadoDesafio>>({});
  const resueltaRef = useRef(false);
  const avanzandoRef = useRef(false);
  const finalizadaRef = useRef(false);
  const deadlineRef = useRef(0);
  const feedbackRef = useRef<HTMLElement>(null);
  const desafio = desafios[indice]!;
  const duracionSegundos = Math.max(1, desafio.tiempoSegundos ?? TIEMPO_PREDETERMINADO);
  const vencioTiempo = motivoResolucion === "tiempo";

  useEffect(() => {
    registrarEvento({ tipo: "partida_iniciada", id, riesgo: modo === "versus" });
  }, [id, modo]);

  useEffect(() => {
    if (resultado) feedbackRef.current?.focus();
  }, [resultado]);

  const responder = useCallback(
    (respuesta: RespuestaDesafio, motivo: MotivoResolucion = "respuesta") => {
      if (resueltaRef.current || finalizadaRef.current) return;
      if (resultadosRef.current[desafio.id]) return;

      resueltaRef.current = true;
      const evaluacion = evaluarDesafio(desafio, respuesta);
      resultadosRef.current = { ...resultadosRef.current, [desafio.id]: evaluacion };
      registrarEvento({
        tipo: "desafio_respondido",
        id: desafio.id,
        correcto: evaluacion.correcto,
      });
      setSeleccion(respuesta);
      setMotivoResolucion(motivo);
      setResultado(evaluacion);
    },
    [desafio],
  );

  useEffect(() => {
    const duracionMs = duracionSegundos * 1000;
    deadlineRef.current = Date.now() + duracionMs;
    resueltaRef.current = false;
    avanzandoRef.current = false;
    setRestanteMs(duracionMs);

    const actualizar = () => {
      if (resueltaRef.current || finalizadaRef.current) return;
      const faltante = Math.max(0, deadlineRef.current - Date.now());
      setRestanteMs(faltante);
      if (faltante <= 0) responder("", "tiempo");
    };

    const intervalo = window.setInterval(actualizar, 100);
    const vencimiento = window.setTimeout(actualizar, duracionMs);
    const reconciliarVisibilidad = () => {
      if (document.visibilityState === "visible") actualizar();
    };
    document.addEventListener("visibilitychange", reconciliarVisibilidad);

    return () => {
      window.clearInterval(intervalo);
      window.clearTimeout(vencimiento);
      document.removeEventListener("visibilitychange", reconciliarVisibilidad);
    };
  }, [desafio.id, duracionSegundos, responder]);

  function continuar() {
    if (!resultado || avanzandoRef.current || finalizadaRef.current) return;
    avanzandoRef.current = true;

    if (indice < desafios.length - 1) {
      const siguiente = desafios[indice + 1]!;
      setRestanteMs((siguiente.tiempoSegundos ?? TIEMPO_PREDETERMINADO) * 1000);
      setIndice((actual) => actual + 1);
      setSeleccion(null);
      setMotivoResolucion(null);
      setResultado(null);
      return;
    }

    finalizadaRef.current = true;
    const resultadosOrdenados = desafios.map(
      (item) => resultadosRef.current[item.id] ?? { correcto: false, xp: 0, monedas: 0 },
    );
    const botAciertos = modo === "versus" ? 2 + (semilla % 3) : undefined;
    const aciertos = resultadosOrdenados.filter((item) => item.correcto).length;
    const resumen = resumirPartida(id, modo, desafios, resultadosOrdenados, {
      fechaDiaria,
      ganoVersus: botAciertos === undefined ? undefined : aciertos > botAciertos,
    });
    setTerminada(true);
    onComplete(resumen, botAciertos);
  }

  if (terminada) {
    return (
      <p role="status" className="py-10 text-center font-bold text-muted-foreground">
        Preparando tu resultado…
      </p>
    );
  }

  const feedback = resultado ? estiloFeedback(resultado.correcto, vencioTiempo) : null;
  const respuestaCorrecta =
    resultado && !resultado.correcto ? textoRespuestaCorrecta(desafio) : null;

  return (
    <div className="flex flex-col gap-3">
      <header className="game-hud flex items-center justify-between gap-3 px-3 py-2">
        <div className="min-w-16 flex-1">
          {onExit && (
            <button
              type="button"
              onClick={onExit}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-xl px-2 text-sm font-bold text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-primary"
            >
              <Icono nombre="volver" className="h-4 w-4" />
              Salir
            </button>
          )}
        </div>
        <span className="text-center text-xs font-extrabold tracking-widest text-muted-foreground uppercase">
          Desafío {indice + 1} de {desafios.length}
        </span>
        <div className="flex min-w-16 flex-1 justify-end">
          <CronometroCircular restanteMs={restanteMs} duracionSegundos={duracionSegundos} />
        </div>
      </header>

      <div className="barra-duo h-2.5">
        <span
          className="barra-duo-fill"
          style={{ width: `${((indice + 1) / desafios.length) * 100}%` }}
        />
      </div>

      <section className="game-panel overflow-hidden">
        {desafio.asset && (
          <img
            src={desafio.asset}
            alt={`Pista visual: ${desafio.consigna}`}
            className="h-44 w-full object-cover"
          />
        )}
        <div className="p-4">
          <h1 className="text-xl leading-tight font-extrabold text-foreground">
            {desafio.consigna}
          </h1>
          <Opciones
            key={desafio.id}
            desafio={desafio}
            seleccion={seleccion}
            resultado={resultado}
            bloqueada={!!resultado}
            onResponder={responder}
          />
        </div>
      </section>

      {resultado && feedback && (
        <section
          ref={feedbackRef}
          tabIndex={-1}
          role="status"
          aria-live="polite"
          className={`feedback-juego reward-enter rounded-2xl border-2 p-4 shadow-lg focus:outline-none ${feedback.card}`}
        >
          <p className="flex items-center gap-2 font-extrabold">
            <Icono nombre={feedback.icono} className={feedback.iconoClassName} />
            {resultado.correcto
              ? "¡Bien visto!"
              : vencioTiempo
                ? "Se terminó el tiempo. Ahora ya lo sabés."
                : "Casi. Ahora ya lo sabés."}
          </p>
          <span
            className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-extrabold ${
              recompensaAplicable
                ? "bg-accent/30 text-accent-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {recompensaAplicable ? (
              <>
                <Icono nombre="xp" className="h-3.5 w-3.5" />
                +{resultado.xp} XP
                {resultado.monedas > 0 ? ` · +${resultado.monedas} monedas` : " · aprendizaje"}
              </>
            ) : (
              "Práctica · sin recompensa extra"
            )}
          </span>
          {respuestaCorrecta && (
            <p className={`mt-2 text-sm ${feedback.respuestaClassName}`}>
              <span className="font-bold">Respuesta correcta:</span> {respuestaCorrecta}
            </p>
          )}
          <p className="mt-2 text-sm text-muted-foreground">{desafio.explicacion}</p>
          <button type="button" className={feedback.boton} onClick={continuar}>
            {indice === desafios.length - 1 ? "Ver resultado" : "Siguiente desafío"}
          </button>
        </section>
      )}
      {!resultado && (
        <p className="sr-only">Respondé antes de que termine el tiempo.</p>
      )}
    </div>
  );
}

function CronometroCircular({
  restanteMs,
  duracionSegundos,
}: {
  restanteMs: number;
  duracionSegundos: number;
}) {
  const restante = Math.max(0, Math.ceil(restanteMs / 1000));
  const proporcion = Math.min(1, Math.max(0, restanteMs / (duracionSegundos * 1000)));
  const radio = 23;
  const circunferencia = 2 * Math.PI * radio;
  const desplazamiento = circunferencia * (1 - proporcion);
  const tono = restante <= 5 ? "text-destructive" : restante <= 9 ? "text-accent" : "text-primary";

  return (
    <div
      role="timer"
      aria-label={`${restante} segundos restantes`}
      className={`relative h-14 w-14 shrink-0 ${restante <= 5 ? "animate-pulse" : ""}`}
    >
      <svg aria-hidden="true" viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle
          cx="32"
          cy="32"
          r={radio}
          stroke="currentColor"
          strokeWidth="7"
          className="fill-card text-muted"
        />
        <circle
          cx="32"
          cy="32"
          r={radio}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          className={`${tono} transition-all duration-100`}
          style={{ strokeDasharray: circunferencia, strokeDashoffset: desplazamiento }}
        />
      </svg>
      <span
        className={`absolute inset-0 grid place-items-center text-xl font-extrabold tabular-nums ${tono}`}
      >
        {restante}
      </span>
    </div>
  );
}

function Opciones({
  desafio,
  seleccion,
  resultado,
  bloqueada,
  onResponder,
}: {
  desafio: Desafio;
  seleccion: RespuestaDesafio | null;
  resultado: ResultadoDesafio | null;
  bloqueada: boolean;
  onResponder: (respuesta: RespuestaDesafio) => void;
}) {
  const multiple = desafio.solucion.tipo === "conjunto";
  const orden = desafio.solucion.tipo === "secuencia";
  const elegidas = Array.isArray(seleccion) ? (seleccion as string[]) : [];
  const [temporal, setTemporal] = useState<string[]>([]);
  const alternar = (id: string) =>
    setTemporal((actual) =>
      actual.includes(id) ? actual.filter((x) => x !== id) : [...actual, id],
    );
  const agregarOrden = (id: string) =>
    setTemporal((actual) => (actual.includes(id) ? actual : [...actual, id]));

  if (orden) {
    const secuenciaCorrecta = desafio.solucion.opcionIds
      .map((id, i) => `${i + 1}. ${desafio.opciones.find((o) => o.id === id)?.texto}`)
      .join("  →  ");

    return (
      <div className="mt-3 grid gap-3">
        <p className="text-xs text-muted-foreground">Tocá cada opción en el orden correcto.</p>
        <div
          className={`min-h-10 rounded-xl p-2 text-sm font-bold ${
            bloqueada && !resultado?.correcto
              ? "border border-destructive/35 bg-destructive/8 text-foreground"
              : "bg-muted text-foreground"
          }`}
        >
          {bloqueada && !resultado?.correcto ? (
            <>
              <p className="text-xs font-extrabold tracking-wide text-destructive uppercase">
                Orden correcto
              </p>
              <p className="mt-1">{secuenciaCorrecta}</p>
            </>
          ) : temporal.length ? (
            temporal
              .map((id, i) => `${i + 1}. ${desafio.opciones.find((o) => o.id === id)?.texto}`)
              .join("  →  ")
          ) : (
            "Tu secuencia aparecerá aquí"
          )}
        </div>
        {desafio.opciones.map((opcion) => {
          const seleccionada = temporal.includes(opcion.id);
          const enSolucion = desafio.solucion.opcionIds.includes(opcion.id);
          const estado =
            bloqueada && enSolucion
              ? "is-correct"
              : bloqueada && seleccionada && !enSolucion
                ? "is-incorrect"
                : seleccionada
                  ? "is-selected"
                  : "";
          return (
            <button
              key={opcion.id}
              type="button"
              disabled={bloqueada || seleccionada}
              onClick={() => agregarOrden(opcion.id)}
              className={`opcion-juego ${estado}`}
            >
              <span className="flex-1">{opcion.texto}</span>
              {bloqueada && enSolucion && <Icono nombre="acierto" className="h-5 w-5" />}
              {bloqueada && seleccionada && !enSolucion && (
                <Icono nombre="error" className="h-5 w-5" />
              )}
            </button>
          );
        })}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={bloqueada}
            onClick={() => setTemporal([])}
            className="btn-duo btn-duo-ghost"
          >
            Reiniciar
          </button>
          <button
            type="button"
            disabled={bloqueada || temporal.length !== desafio.opciones.length}
            onClick={() => onResponder(temporal)}
            className="btn-duo btn-duo-primary"
          >
            Confirmar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 grid gap-3">
      {desafio.opciones.map((opcion) => {
        const activa = multiple
          ? (bloqueada ? elegidas : temporal).includes(opcion.id)
          : seleccion === opcion.id;
        const correcta = bloqueada && esOpcionCorrecta(desafio, opcion.id);
        const incorrecta = bloqueada && activa && !correcta;
        const estado = correcta
          ? "is-correct"
          : incorrecta
            ? "is-incorrect"
            : activa
              ? "is-selected"
              : "";
        return (
          <button
            key={opcion.id}
            type="button"
            disabled={bloqueada}
            aria-pressed={activa}
            onClick={() => (multiple ? alternar(opcion.id) : onResponder(opcion.id))}
            className={`opcion-juego ${estado}`}
          >
            {opcion.icono && <Icono nombre={opcion.icono} className="h-5 w-5" />}
            <span className="flex-1">{opcion.texto}</span>
            {correcta && <Icono nombre="acierto" className="h-5 w-5" />}
            {incorrecta && <Icono nombre="error" className="h-5 w-5" />}
          </button>
        );
      })}
      {multiple && (
        <button
          type="button"
          disabled={bloqueada || temporal.length === 0}
          onClick={() => onResponder(temporal)}
          className="btn-duo btn-duo-primary"
        >
          Confirmar asociaciones
        </button>
      )}
    </div>
  );
}

function estiloFeedback(correcto: boolean, vencioTiempo: boolean) {
  if (correcto) {
    return {
      card: "border-primary/45 bg-primary/12 text-foreground",
      icono: "acierto" as NombreIcono,
      iconoClassName: "h-5 w-5 text-primary",
      respuestaClassName: "text-primary",
      boton: "btn-duo btn-duo-primary mt-3",
    };
  }
  if (vencioTiempo) {
    return {
      card: "border-accent/45 bg-accent/15 text-foreground",
      icono: "tiempo" as NombreIcono,
      iconoClassName: "h-5 w-5 text-accent-foreground",
      respuestaClassName: "text-accent-foreground",
      boton: "btn-duo btn-duo-primary mt-3",
    };
  }
  return {
    card: "border-destructive/35 bg-destructive/8 text-foreground",
    icono: "error" as NombreIcono,
    iconoClassName: "h-5 w-5 text-destructive",
    respuestaClassName: "text-destructive",
    boton: "btn-duo btn-duo-primary mt-3",
  };
}

function textoOpcion(desafio: Desafio, id: string) {
  return desafio.opciones.find((opcion) => opcion.id === id)?.texto ?? id;
}

function textoRespuestaCorrecta(desafio: Desafio): string | null {
  const { solucion } = desafio;
  if (solucion.tipo === "unica") return textoOpcion(desafio, solucion.opcionId);
  if (solucion.tipo === "conjunto") {
    return solucion.opcionIds.map((id) => textoOpcion(desafio, id)).join(" · ");
  }
  if (solucion.tipo === "secuencia") {
    return solucion.opcionIds
      .map((id, indice) => `${indice + 1}. ${textoOpcion(desafio, id)}`)
      .join(" → ");
  }
  if (solucion.tipo === "pares") {
    return solucion.pares
      .map(([a, b]) => `${textoOpcion(desafio, a)} ↔ ${textoOpcion(desafio, b)}`)
      .join(" · ");
  }
  return null;
}

function esOpcionCorrecta(desafio: Desafio, opcionId: string) {
  if (desafio.solucion.tipo === "unica") return desafio.solucion.opcionId === opcionId;
  if (desafio.solucion.tipo === "conjunto") return desafio.solucion.opcionIds.includes(opcionId);
  return false;
}
