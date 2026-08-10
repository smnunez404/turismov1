// SPEC-28 — Duelo 1v1 (P-23) contra un rival simulado, 5 rondas.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { rivales } from "@/data/equipos";
import { preguntasRapidas } from "@/data/preguntas-rapidas";
import type { PreguntaRapida, Rival } from "@/data/tipos";
import { barajar, respuestaRival } from "@/lib/juego";

export const Route = createFileRoute("/duelo")({
  head: () => ({
    meta: [
      { title: "Duelo 1v1 — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Desafiá a otro cruceño a cinco rondas de preguntas sobre Santa Cruz.",
      },
      { property: "og:title", content: "Duelo 1v1 — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Cinco rondas, mismas preguntas para los dos: gana quien más sabe de su tierra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Duelo,
});

const RONDAS = 5;

function Duelo() {
  const { usuario, actualizar } = useSesion();
  const [rival, setRival] = useState<Rival | null>(null);
  const [cola, setCola] = useState<PreguntaRapida[]>([]);
  const [ronda, setRonda] = useState(0);
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [respRival, setRespRival] = useState<string | null>(null);
  const [mios, setMios] = useState(0);
  const [suyos, setSuyos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  function iniciar(r: Rival) {
    setRival(r);
    setCola(barajar(preguntasRapidas).slice(0, RONDAS));
    setRonda(0);
    setSeleccion(null);
    setRespRival(null);
    setMios(0);
    setSuyos(0);
    setTerminado(false);
  }

  const pregunta = cola[ronda];

  function responder(id: string) {
    if (!pregunta || !rival || seleccion) return;
    setSeleccion(id);
    const suRespuesta = respuestaRival(pregunta, rival.destreza);
    setRespRival(suRespuesta);
    if (id === pregunta.respuestaCorrectaId) setMios((m) => m + 1);
    if (suRespuesta === pregunta.respuestaCorrectaId) setSuyos((s) => s + 1);
  }

  function siguiente() {
    if (ronda + 1 >= cola.length) {
      const gane = mios > suyos;
      actualizar({
        puntos: usuario.puntos + mios * 8 + (gane ? 20 : 0),
        puntosLiga: usuario.puntosLiga + mios * 8 + (gane ? 20 : 0),
        duelosGanados: usuario.duelosGanados + (gane ? 1 : 0),
      });
      setTerminado(true);
      return;
    }
    setRonda((r) => r + 1);
    setSeleccion(null);
    setRespRival(null);
  }

  // ---------- Selección de rival ----------
  if (!rival) {
    return (
      <Pantalla conNav className="gap-5">
        <header>
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
            Jugá con alguien
          </p>
          <h1 className="text-2xl font-extrabold text-foreground">Elegí tu rival</h1>
          <p className="text-sm text-muted-foreground">
            Cinco rondas, las mismas preguntas para los dos. Ganar suma 20 pts extra a tu liga.
          </p>
        </header>
        <ul className="grid gap-3">
          {rivales.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => iniciar(r)}
                className="card-duo flex w-full items-center gap-3 p-4 text-left"
              >
                <AvatarInsignia semilla={r.nombre} tamano="sm" />
                <span className="min-w-0 flex-1">
                  <span className="block text-base font-extrabold text-foreground">{r.nombre}</span>
                  <span className="block text-xs text-muted-foreground">{r.frase}</span>
                </span>
                <Icono nombre="duelo" className="h-5 w-5 text-primary" />
              </button>
            </li>
          ))}
        </ul>
        <Link to="/compartir" className="btn-duo btn-duo-ghost">
          Invitar a un amigo al duelo
        </Link>
      </Pantalla>
    );
  }

  // ---------- Resultado ----------
  if (terminado) {
    const gane = mios > suyos;
    const empate = mios === suyos;
    return (
      <Pantalla conNav className="gap-5">
        <header className="text-center">
          <IconoPastilla nombre={gane ? "corona" : "duelo"} tono="accent" className="mx-auto" />
          <h1 className="mt-3 text-2xl font-extrabold text-foreground">
            {gane ? "¡Ganaste el duelo!" : empate ? "Empate" : "Perdiste por poco"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mios} a {suyos} contra {rival.nombre}
          </p>
        </header>
        <section className="card-duo p-5 text-sm text-muted-foreground">
          Sumaste {mios * 8 + (gane ? 20 : 0)} puntos a tu liga semanal y al marcador de tu equipo.
        </section>
        <div className="grid gap-3">
          <button type="button" className="btn-duo btn-duo-primary" onClick={() => setRival(null)}>
            Otro duelo
          </button>
          <Link to="/liga" className="btn-duo btn-duo-ghost">
            Ver la liga
          </Link>
        </div>
      </Pantalla>
    );
  }

  if (!pregunta) return null;

  return (
    <Pantalla className="gap-4">
      <header className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2">
          <AvatarInsignia avatar={usuario.avatar ?? avatarPorDefecto} tamano="sm" />
          <span className="text-lg font-extrabold text-foreground">{mios}</span>
        </span>
        <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
          Ronda {ronda + 1}/{cola.length}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-foreground">{suyos}</span>
          <AvatarInsignia semilla={rival.nombre} tamano="sm" />
        </span>
      </header>

      <h1 className="text-xl font-extrabold text-foreground">{pregunta.enunciado}</h1>

      <ul className="grid gap-3">
        {pregunta.opciones.map((op) => {
          const esCorrecta = op.id === pregunta.respuestaCorrectaId;
          const tono = !seleccion
            ? "border-border bg-card"
            : esCorrecta
              ? "border-primary bg-primary/10"
              : seleccion === op.id
                ? "border-destructive bg-destructive/10"
                : "border-border bg-card opacity-60";
          return (
            <li key={op.id}>
              <button
                type="button"
                disabled={!!seleccion}
                onClick={() => responder(op.id)}
                className={`w-full rounded-2xl border-2 border-b-4 p-3.5 text-left text-base font-bold text-foreground ${tono}`}
              >
                {op.texto}
                {respRival === op.id && (
                  <span className="ml-2 text-xs font-bold text-muted-foreground">
                    · eligió {rival.nombre.split(" ")[0]}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {seleccion && (
        <div className="rounded-2xl bg-muted p-4">
          <p className="text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
          <button type="button" className="btn-duo btn-duo-primary mt-3" onClick={siguiente}>
            {ronda + 1 >= cola.length ? "Ver resultado" : "Siguiente ronda"}
          </button>
        </div>
      )}
    </Pantalla>
  );
}