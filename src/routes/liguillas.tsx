// SPEC-28 — Liguillas y Torneos Privados estilo Kahoot / Clash Royale (P-26)
// Aislado de la economía del juego: no suma ni resta puntos de la liga general ni monedas oficiales.
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import {
  cargarLiguillas,
  buscarLiguillaPorPin,
  crearNuevaLiguilla,
  registrarPuntajeParticipante,
  type LiguillaPrivada,
  type CategoriaLiguilla,
} from "@/data/liguillas";
import { tandaDeCategoria, barajar } from "@/lib/juego";
import { preguntasRapidas } from "@/data/preguntas-rapidas";
import type { PreguntaRapida } from "@/data/tipos";

export const Route = createFileRoute("/liguillas")({
  head: () => ({
    meta: [
      { title: "Liguillas y Torneos Privados — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Crea o únete a una liguilla privada con PIN para competir con tus amigos o colegio estilo Kahoot.",
      },
      { property: "og:title", content: "Liguillas y Torneos Privados — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Competencias privadas con código PIN: preguntas cruceñas y podio exclusivo.",
      },
    ],
  }),
  component: VistaLiguillas,
});

type ModoVista = "hub" | "crear" | "unirse" | "jugando" | "podio";

function VistaLiguillas() {
  const { usuario } = useSesion();
  const [modo, setModo] = useState<ModoVista>("hub");
  const [liguillas, setLiguillas] = useState<LiguillaPrivada[]>(() => cargarLiguillas());

  // Formulario Crear
  const [nombreTorneo, setNombreTorneo] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<CategoriaLiguilla>("todas");
  const [cantPreguntas, setCantPreguntas] = useState(5);

  // Formulario Unirse
  const [pinIngresado, setPinIngresado] = useState("");
  const [apodoJugador, setApodoJugador] = useState(usuario.nombre || "Curioso");
  const [errorPin, setErrorPin] = useState("");

  // Estado de partida activa
  const [salaActual, setSalaActual] = useState<LiguillaPrivada | null>(null);
  const [preguntasJuego, setPreguntasJuego] = useState<PreguntaRapida[]>([]);
  const [indicePregunta, setIndicePregunta] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respondida, setRespondida] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [tiempoInicio, setTiempoInicio] = useState(0);

  const recargarLista = () => setLiguillas(cargarLiguillas());

  // Iniciar creación
  const handleCrear = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreTorneo.trim()) return;
    const nueva = crearNuevaLiguilla({
      nombre: nombreTorneo,
      anfitrionNombre: usuario.nombre || "Profesor / Anfitrión",
      categoria: categoriaSeleccionada,
      cantidadPreguntas: cantPreguntas,
    });
    recargarLista();
    prepararJuego(nueva, usuario.nombre || "Anfitrión");
  };

  // Unirse con PIN
  const handleUnirse = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorPin("");
    const pinLimpio = pinIngresado.trim().toUpperCase();
    if (!pinLimpio) {
      setErrorPin("Por favor ingresa un código PIN");
      return;
    }
    const sala = buscarLiguillaPorPin(pinLimpio);
    if (!sala) {
      setErrorPin("No encontramos ninguna liguilla con ese código PIN");
      return;
    }
    prepararJuego(sala, apodoJugador.trim() || "Explorador");
  };

  const prepararJuego = (sala: LiguillaPrivada, apodo: string) => {
    setSalaActual(sala);
    setApodoJugador(apodo);

    // Obtener preguntas según la categoría
    let banco: PreguntaRapida[] = [];
    if (sala.categoria === "todas") {
      banco = barajar(preguntasRapidas).slice(0, sala.cantidadPreguntas);
    } else {
      banco = tandaDeCategoria(sala.categoria, sala.cantidadPreguntas);
    }
    if (!banco.length) banco = barajar(preguntasRapidas).slice(0, sala.cantidadPreguntas);

    setPreguntasJuego(banco);
    setIndicePregunta(0);
    setSeleccion(null);
    setRespondida(false);
    setAciertos(0);
    setPuntos(0);
    setTiempoInicio(Date.now());
    setModo("jugando");
  };

  const responder = (opcionId: string) => {
    if (respondida) return;
    const actual = preguntasJuego[indicePregunta]!;
    const esCorrecta = opcionId === actual.respuestaCorrectaId;
    setSeleccion(opcionId);
    setRespondida(true);

    if (esCorrecta) {
      setAciertos((a) => a + 1);
      setPuntos((p) => p + 10);
    }
  };

  const siguientePregunta = () => {
    if (indicePregunta + 1 < preguntasJuego.length) {
      setIndicePregunta((i) => i + 1);
      setSeleccion(null);
      setRespondida(false);
    } else {
      // Fin del juego: Registrar participante y pasar a podio
      const duracion = Math.max(1, Math.round((Date.now() - tiempoInicio) / 1000));
      if (salaActual) {
        registrarPuntajeParticipante(
          salaActual.pin,
          apodoJugador,
          aciertos,
          puntos,
          duracion,
          usuario.avatarId,
        );
        const actualizada = buscarLiguillaPorPin(salaActual.pin) ?? salaActual;
        setSalaActual(actualizada);
      }
      recargarLista();
      setModo("podio");
    }
  };

  // -------------------------------------------------------------
  // VISTA: JUGANDO (Estilo Kahoot cruceño)
  // -------------------------------------------------------------
  if (modo === "jugando" && salaActual && preguntasJuego[indicePregunta]) {
    const pregunta = preguntasJuego[indicePregunta]!;
    const correcta = seleccion === pregunta.respuestaCorrectaId;

    return (
      <Pantalla className="gap-4">
        {/* Cabecera del Torneo */}
        <header className="flex items-center justify-between gap-3 border-b pb-3">
          <div>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black text-primary uppercase">
              PIN: {salaActual.pin}
            </span>
            <h1 className="text-base font-extrabold text-foreground truncate mt-0.5">
              {salaActual.nombre}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs font-black text-primary">
              <Icono nombre="check" className="h-4 w-4" /> {aciertos}
            </span>
            <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-black text-accent-foreground">
              {puntos} pts
            </span>
          </div>
        </header>

        {/* Progreso de preguntas */}
        <div>
          <div className="flex justify-between text-xs font-bold text-muted-foreground mb-1">
            <span>Pregunta {indicePregunta + 1} de {preguntasJuego.length}</span>
            <span className="capitalize">{pregunta.categoriaId}</span>
          </div>
          <div className="barra-duo h-2">
            <span
              className="barra-duo-fill"
              style={{ width: `${Math.round(((indicePregunta + 1) / preguntasJuego.length) * 100)}%` }}
            />
          </div>
        </div>

        {/* Enunciado tipo Kahoot */}
        <div className="rounded-2xl border-2 border-border bg-card p-4 shadow-xs text-center min-h-[5rem] flex items-center justify-center">
          <p className="text-base sm:text-lg font-extrabold text-foreground leading-snug">
            {pregunta.enunciado}
          </p>
        </div>

        {/* Opciones en 2 columnas (A, B, C, D) con colores vivos */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pregunta.opciones.map((op, opIdx) => {
            const elegida = seleccion === op.id;
            const esOpCorrecta = op.id === pregunta.respuestaCorrectaId;
            const letra = ["A", "B", "C", "D"][opIdx] ?? `${opIdx + 1}`;

            let claseColor = "border-border bg-card hover:border-primary/50";
            if (respondida) {
              if (esOpCorrecta) {
                claseColor = "border-primary bg-primary text-primary-foreground font-black";
              } else if (elegida) {
                claseColor = "border-destructive bg-destructive text-destructive-foreground";
              } else {
                claseColor = "opacity-40 border-border bg-muted/40";
              }
            } else if (elegida) {
              claseColor = "border-primary bg-primary/10";
            }

            return (
              <li key={op.id}>
                <button
                  type="button"
                  disabled={respondida}
                  onClick={() => responder(op.id)}
                  className={`opcion-juego ${claseColor} flex items-center gap-3 p-3.5 rounded-2xl w-full text-left transition-all cursor-pointer`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-black shadow-xs ${
                      respondida && esOpCorrecta
                        ? "bg-white/30 text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {letra}
                  </span>
                  <span className="flex-1 text-sm sm:text-base font-bold leading-tight">
                    {op.texto}
                  </span>
                  {respondida && esOpCorrecta && (
                    <Icono nombre="acierto" className="h-5 w-5 shrink-0 text-white" />
                  )}
                  {respondida && elegida && !esOpCorrecta && (
                    <Icono nombre="error" className="h-5 w-5 shrink-0 text-white" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Feedback y Siguiente */}
        {respondida && (
          <div className="rounded-2xl border-2 p-3.5 bg-card/90 shadow-sm animate-in fade-in">
            <p className="text-xs sm:text-sm text-muted-foreground font-medium">
              <strong className={correcta ? "text-primary" : "text-destructive"}>
                {correcta ? "¡Correcto! " : "Casi: "}
              </strong>
              {pregunta.retroalimentacion}
            </p>
            <button
              type="button"
              onClick={siguientePregunta}
              className="btn-duo btn-duo-primary mt-3 flex items-center justify-center gap-2"
            >
              <span>{indicePregunta + 1 < preguntasJuego.length ? "Siguiente pregunta" : "Ver Podio Final"}</span>
              <Icono nombre="siguiente" className="h-4 w-4 shrink-0" />
            </button>
          </div>
        )}
      </Pantalla>
    );
  }

  // -------------------------------------------------------------
  // VISTA: PODIO Y CLASIFICACIÓN GENERAL (Estilo Kahoot / Torneo)
  // -------------------------------------------------------------
  if (modo === "podio" && salaActual) {
    const participantes = [...salaActual.participantes].sort((a, b) => b.puntos - a.puntos);
    const top1 = participantes[0];
    const top2 = participantes[1];
    const top3 = participantes[2];

    const textoCompartir = `🏆 ¡Terminamos la Liguilla Cruceña "${salaActual.nombre}"! 
Mi puntaje: ${puntos} pts (${aciertos} aciertos). 
¡Jugá con nosotros en Soy Embajador Bolivia usando el PIN: ${salaActual.pin}!`;

    return (
      <Pantalla conNav className="gap-5">
        <header className="text-center">
          <img
            src="/camino/trofeo_liguillas.jpg"
            alt="Trofeo de Torneo"
            width={80}
            height={80}
            className="mx-auto h-20 w-20 object-contain drop-shadow-md animate-bounce"
          />
          <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-accent/25 px-3 py-0.5 text-xs font-black text-accent-foreground">
            PIN: {salaActual.pin}
          </span>
          <h1 className="mt-1 text-2xl font-extrabold text-foreground">
            Podio de la Liguilla
          </h1>
          <p className="text-xs text-muted-foreground">
            {salaActual.nombre} · Anfitrión: {salaActual.anfitrionNombre}
          </p>
        </header>

        {/* Podio Visual Top 3 */}
        <section className="card-duo p-4">
          <p className="mb-3 text-center text-xs font-black tracking-widest text-primary uppercase">
            Top 3 Ganadores
          </p>
          <div className="grid grid-cols-3 items-end gap-2 text-center pt-2">
            {/* 2do Lugar */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-muted-foreground">2° Lugar</span>
              <span className="my-1 flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-base font-black shadow-xs">
                🥈
              </span>
              <p className="truncate max-w-full text-xs font-extrabold text-foreground">
                {top2?.nombre || "Vacante"}
              </p>
              <span className="text-[11px] font-black text-muted-foreground">
                {top2 ? `${top2.puntos} pts` : "-"}
              </span>
              <div className="mt-1 h-14 w-full rounded-t-xl bg-slate-300/40 dark:bg-slate-700/40" />
            </div>

            {/* 1er Lugar */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-black text-amber-500">1° Campeón</span>
              <span className="my-1 flex h-12 w-12 items-center justify-center rounded-full bg-amber-400 text-xl font-black shadow-md ring-2 ring-amber-300">
                🥇
              </span>
              <p className="truncate max-w-full text-xs font-extrabold text-foreground">
                {top1?.nombre || "Vacante"}
              </p>
              <span className="text-xs font-black text-amber-500">
                {top1 ? `${top1.puntos} pts` : "-"}
              </span>
              <div className="mt-1 h-20 w-full rounded-t-xl bg-amber-400/40" />
            </div>

            {/* 3er Lugar */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-500">3° Lugar</span>
              <span className="my-1 flex h-10 w-10 items-center justify-center rounded-full bg-amber-700/30 text-base font-black shadow-xs">
                🥉
              </span>
              <p className="truncate max-w-full text-xs font-extrabold text-foreground">
                {top3?.nombre || "Vacante"}
              </p>
              <span className="text-[11px] font-black text-muted-foreground">
                {top3 ? `${top3.puntos} pts` : "-"}
              </span>
              <div className="mt-1 h-10 w-full rounded-t-xl bg-amber-800/30" />
            </div>
          </div>
        </section>

        {/* Tabla General de la Sala */}
        <section className="card-duo p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-black tracking-wider text-muted-foreground uppercase">
              Clasificación Completa ({participantes.length} jugadores)
            </h2>
            <span className="text-[11px] text-muted-foreground font-semibold">Torneo privado</span>
          </div>

          <ol className="divide-y divide-border">
            {participantes.map((p, idx) => (
              <li key={p.id} className="flex items-center justify-between py-2 text-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="w-5 text-center font-black text-muted-foreground">
                    #{idx + 1}
                  </span>
                  <span className="truncate font-extrabold text-foreground">
                    {p.nombre} {p.nombre.toLowerCase() === apodoJugador.toLowerCase() && " (Vos)"}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <strong className="block font-black text-primary">{p.puntos} pts</strong>
                  <span className="text-[10px] text-muted-foreground">{p.aciertos} aciertos</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Botones de acción del podio */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(textoCompartir)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-duo btn-duo-accent flex items-center justify-center gap-2"
          >
            <Icono nombre="whatsapp" className="h-4 w-4 shrink-0" />
            <span>Compartir en WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => setModo("hub")}
            className="btn-duo btn-duo-ghost flex items-center justify-center gap-2"
          >
            <Icono nombre="trofeo" className="h-4 w-4 shrink-0 text-primary" />
            <span>Volver a Liguillas</span>
          </button>
        </div>
      </Pantalla>
    );
  }

  // -------------------------------------------------------------
  // VISTA: CREAR LIGUILLA
  // -------------------------------------------------------------
  if (modo === "crear") {
    return (
      <Pantalla conNav className="gap-5">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModo("hub")}
            className="rounded-xl border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <Icono nombre="volver" className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Crear torneo privado</p>
            <h1 className="text-2xl font-extrabold text-foreground">Nueva Liguilla</h1>
          </div>
        </header>

        <form onSubmit={handleCrear} className="card-duo p-5 space-y-4">
          <div>
            <label className="block text-xs font-black text-foreground mb-1">
              Nombre de la Liguilla o Torneo
            </label>
            <input
              type="text"
              required
              value={nombreTorneo}
              onChange={(e) => setNombreTorneo(e.target.value)}
              placeholder="Ej. Promo 2026 La Salle o Torneo Cruceño"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-foreground mb-1">
              Categoría de preguntas
            </label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value as CategoriaLiguilla)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm font-bold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="todas">Todas las categorías (Mixto)</option>
              <option value="historia">Historia Cruceña</option>
              <option value="gastronomia">Gastronomía Tradicional</option>
              <option value="naturaleza">Naturaleza y Flora/Fauna</option>
              <option value="tradicion">Tradición y Carnaval</option>
              <option value="hoy">Santa Cruz Hoy (Urbano)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-black text-foreground mb-1">
              Cantidad de preguntas
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[5, 8, 10].map((cant) => (
                <button
                  type="button"
                  key={cant}
                  onClick={() => setCantPreguntas(cant)}
                  className={`rounded-xl border-2 py-2 text-xs font-extrabold transition-all cursor-pointer ${
                    cantPreguntas === cant
                      ? "border-primary bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {cant} preguntas
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-muted/60 p-3 text-xs text-muted-foreground">
            ℹ️ Al crear la sala se generará un código PIN automático de 5 letras para que tus alumnos o amigos se unan fácilmente.
          </div>

          <button type="submit" className="btn-duo btn-duo-primary w-full flex items-center justify-center gap-2">
            <Icono nombre="trofeo" className="h-4 w-4" />
            <span>Generar Torneo y Jugar</span>
          </button>
        </form>
      </Pantalla>
    );
  }

  // -------------------------------------------------------------
  // VISTA: UNIRSE CON PIN
  // -------------------------------------------------------------
  if (modo === "unirse") {
    return (
      <Pantalla conNav className="gap-5">
        <header className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModo("hub")}
            className="rounded-xl border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <Icono nombre="volver" className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Unirse a sala</p>
            <h1 className="text-2xl font-extrabold text-foreground">Ingresar Código PIN</h1>
          </div>
        </header>

        <form onSubmit={handleUnirse} className="card-duo p-5 space-y-4 text-center">
          <div>
            <label className="block text-xs font-black text-foreground mb-1">
              Tu Nombre o Apodo
            </label>
            <input
              type="text"
              required
              value={apodoJugador}
              onChange={(e) => setApodoJugador(e.target.value)}
              placeholder="Ej. Cambita 10"
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm font-bold text-foreground text-center"
            />
          </div>

          <div>
            <label className="block text-xs font-black text-foreground mb-1">
              Código PIN de la Liguilla
            </label>
            <input
              type="text"
              required
              maxLength={8}
              value={pinIngresado}
              onChange={(e) => setPinIngresado(e.target.value.toUpperCase())}
              placeholder="Ej. SCZ26"
              className="w-full rounded-2xl border-2 border-primary bg-primary/5 px-4 py-3 text-2xl font-black text-center tracking-widest text-primary uppercase focus:outline-none"
            />
            {errorPin && <p className="mt-1 text-xs font-bold text-destructive">{errorPin}</p>}
          </div>

          <button type="submit" className="btn-duo btn-duo-primary w-full flex items-center justify-center gap-2">
            <Icono nombre="rayo" className="h-4 w-4" />
            <span>Entrar al Torneo</span>
          </button>
        </form>
      </Pantalla>
    );
  }

  // -------------------------------------------------------------
  // VISTA PRINCIPAL: HUB DE LIGUILLAS Y TORNEOS PRIVADOS
  // -------------------------------------------------------------
  return (
    <Pantalla conNav className="gap-5">
      {/* Cabecera */}
      <header className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest text-secondary uppercase">
            Torneos Escolares y Privados
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Liguillas Cruceñas
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Salas privadas con código PIN estilo Kahoot. No afecta la liga general.
          </p>
        </div>
        <img
          src="/camino/trofeo_liguillas.jpg"
          alt="Trofeo"
          width={60}
          height={60}
          className="h-14 w-14 object-contain drop-shadow-sm shrink-0"
        />
      </header>

      {/* Botones Principales: Unirse y Crear */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => {
            setErrorPin("");
            setModo("unirse");
          }}
          className="btn-duo btn-duo-primary flex items-center justify-center gap-2 !py-3.5 shadow-md"
        >
          <Icono nombre="rayo" className="h-5 w-5 shrink-0" />
          <span>Unirse con Código PIN</span>
        </button>

        <button
          type="button"
          onClick={() => setModo("crear")}
          className="btn-duo btn-duo-accent flex items-center justify-center gap-2 !py-3.5 shadow-md"
        >
          <Icono nombre="corona" className="h-5 w-5 shrink-0" />
          <span>Crear Nueva Liguilla</span>
        </button>
      </div>

      {/* Salas activas / torneos disponibles */}
      <section className="card-duo p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-black tracking-wider text-muted-foreground uppercase">
            Torneos en Curso / Demostración
          </h2>
          <span className="text-[11px] font-bold text-primary">3 a 100 participantes</span>
        </div>

        <div className="space-y-2.5">
          {liguillas.map((sala) => (
            <div
              key={sala.pin}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-2xs hover:border-primary/40 transition-all"
            >
              <div className="flex items-center gap-3">
                <IconoPastilla nombre="trofeo" tono="primary" className="h-10 w-10 shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black text-primary uppercase">
                      PIN: {sala.pin}
                    </span>
                    <span className="text-[11px] font-bold text-muted-foreground">
                      {sala.participantes.length} participantes
                    </span>
                  </div>
                  <h3 className="truncate text-sm font-extrabold text-foreground mt-0.5">
                    {sala.nombre}
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Organizado por: {sala.anfitrionNombre} · {sala.cantidadPreguntas} preguntas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={() => {
                    setSalaActual(sala);
                    setModo("podio");
                  }}
                  className="rounded-xl border border-border bg-muted/60 px-3 py-1.5 text-xs font-bold text-foreground hover:bg-muted"
                >
                  Ver Podio
                </button>
                <button
                  type="button"
                  onClick={() => prepararJuego(sala, usuario.nombre || "Curioso")}
                  className="btn-duo btn-duo-primary !py-1.5 !px-3.5 !text-xs !w-auto"
                >
                  Jugar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios de las Liguillas para colegios y amigos */}
      <section className="rounded-2xl border border-dashed border-border p-3.5 text-xs text-muted-foreground">
        <p className="font-extrabold text-foreground mb-1 flex items-center gap-1.5">
          <Icono nombre="amigos" className="h-4 w-4 text-secondary" />
          Ideal para colegios, grupos de amigos y competencias familiares:
        </p>
        <p>
          Las liguillas son salas independientes creadas para disfrutar y aprender juntos. Los acuerdos o premios
          se definen libremente entre los participantes sin alterar la clasificación general de la app.
        </p>
      </section>
    </Pantalla>
  );
}
