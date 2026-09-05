// SPEC: Verdad o Reto Cruceño (Dinámica social / fiesta entre amigos)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/jugar/retos")({
  head: () => ({
    meta: [
      { title: "Verdad o Reto Cruceño — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Dinámica social de preguntas y retos divertidos con modismos y tradiciones de Santa Cruz.",
      },
    ],
  }),
  component: VerdadORetoCruceño,
});

type Tarjeta = {
  id: string;
  tipo: "verdad" | "reto";
  texto: string;
  puntos: number;
  categoria: string;
};

const BANCO_TARJETAS: Tarjeta[] = [
  // Verdades
  {
    id: "v1",
    tipo: "verdad",
    texto: "¿Alguna vez te perdiste intentando ubicarte por los anillos de Santa Cruz?",
    puntos: 20,
    categoria: "Ciudad",
  },
  {
    id: "v2",
    tipo: "verdad",
    texto: "¿Qué comida típica cruceña no te gusta para nada aunque a todos les encante?",
    puntos: 20,
    categoria: "Sabores",
  },
  {
    id: "v3",
    tipo: "verdad",
    texto: "¿Cuál es el modismo o palabra camba que usás todos los días sin darte cuenta?",
    puntos: 20,
    categoria: "Cultura",
  },
  {
    id: "v4",
    tipo: "verdad",
    texto: "¿Te animarías a pasar una noche en una hacienda del monte chiquitano a oscuras?",
    puntos: 25,
    categoria: "Aventura",
  },
  // Retos
  {
    id: "r1",
    tipo: "reto",
    texto: "Hablá durante la siguiente ronda imitando el tono y los modismos más exagerados de un auténtico camba.",
    puntos: 30,
    categoria: "Actuación",
  },
  {
    id: "r2",
    tipo: "reto",
    texto: "Bailá unos pasos de chovena o taquirari en el medio del grupo por 20 segundos.",
    puntos: 35,
    categoria: "Baile",
  },
  {
    id: "r3",
    tipo: "reto",
    texto: "Nombrá 5 horneados típicos cruceños en menos de 7 segundos sin titubear.",
    puntos: 30,
    categoria: "Rapidez",
  },
  {
    id: "r4",
    tipo: "reto",
    texto: "Imitá el sonido o comportamiento de un piyo o una paraba hasta que alguien adivine.",
    puntos: 35,
    categoria: "Imitación",
  },
];

function VerdadORetoCruceño() {
  const { usuario, actualizar } = useSesion();
  const [tarjetaActual, setTarjetaActual] = useState<Tarjeta | null>(null);
  const [modoElegido, setModoElegido] = useState<"verdad" | "reto" | null>(null);
  const [contadorRondas, setContadorRondas] = useState(1);
  const [jugadorActual, setJugadorActual] = useState(1);
  const [totalJugadores, setTotalJugadores] = useState(3);

  const sacarTarjeta = (tipo: "verdad" | "reto") => {
    setModoElegido(tipo);
    const filtradas = BANCO_TARJETAS.filter((t) => t.tipo === tipo);
    const aleatoria = filtradas[Math.floor(Math.random() * filtradas.length)];
    setTarjetaActual(aleatoria);
  };

  const cumplirTarjeta = () => {
    if (tarjetaActual) {
      actualizar({ monedas: usuario.monedas + 10, xp: usuario.xp + tarjetaActual.puntos });
    }
    // Pasar al siguiente jugador
    setJugadorActual((prev) => (prev >= totalJugadores ? 1 : prev + 1));
    setContadorRondas((prev) => prev + 1);
    setTarjetaActual(null);
    setModoElegido(null);
  };

  const pasarTurno = () => {
    setJugadorActual((prev) => (prev >= totalJugadores ? 1 : prev + 1));
    setTarjetaActual(null);
    setModoElegido(null);
  };

  return (
    <Pantalla conNav className="gap-3 sm:gap-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Link
            to="/jugar"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted"
            aria-label="Volver a Jugar"
          >
            <Icono nombre="flecha-izquierda" className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-secondary">
              Social · Amigos & Junta
            </span>
            <h1 className="text-xl font-extrabold text-foreground leading-tight">
              Verdad o Reto Cruceño
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/20 px-2.5 py-1 text-xs font-black text-primary">
            Ronda #{contadorRondas}
          </span>
        </div>
      </header>

      {/* Banner Temático */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-accent/40 bg-card p-3 shadow-sm flex items-center gap-3">
        <img
          src="/camino/verdad_reto.jpg"
          alt="Verdad o Reto Cruceño"
          width={70}
          height={70}
          className="h-14 w-14 rounded-xl object-cover shadow-xs border border-accent/30 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-foreground">
            Turno de: <span className="text-primary font-black">Jugador #{jugadorActual}</span>
          </p>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Ideal para jugar en persona con amigos, colegios o reuniones.
          </p>
          <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>Jugadores:</span>
            {[2, 3, 4, 5, 6].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setTotalJugadores(num);
                  if (jugadorActual > num) setJugadorActual(1);
                }}
                className={`h-5 w-5 rounded-md font-bold transition-colors cursor-pointer ${
                  totalJugadores === num ? "bg-primary text-white font-black" : "bg-muted hover:bg-muted/80"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Selector de Verdad o Reto */}
      {!tarjetaActual ? (
        <section className="mt-4 flex flex-col gap-3">
          <h2 className="text-center text-sm font-extrabold text-foreground">
            ¿Qué elige el Jugador #{jugadorActual}?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => sacarTarjeta("verdad")}
              className="card-duo flex flex-col items-center justify-center p-5 text-center border-2 border-sky-400 bg-sky-500/10 hover:bg-sky-500/20 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="text-3xl">🗣️</span>
              <h3 className="mt-2 text-base font-black text-sky-800 dark:text-sky-300 uppercase tracking-wide">
                Verdad
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Confesiones y anécdotas cruceñas
              </p>
            </button>

            <button
              type="button"
              onClick={() => sacarTarjeta("reto")}
              className="card-duo flex flex-col items-center justify-center p-5 text-center border-2 border-amber-500 bg-amber-500/10 hover:bg-amber-500/20 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span className="text-3xl">🔥</span>
              <h3 className="mt-2 text-base font-black text-amber-800 dark:text-amber-300 uppercase tracking-wide">
                Reto
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Pruebas divertidas y de actuación
              </p>
            </button>
          </div>
        </section>
      ) : (
        /* Tarjeta Descubierta */
        <section className="animate-in zoom-in-95 mt-2 flex flex-col items-center">
          <div
            className={`w-full rounded-3xl border-3 p-5 shadow-xl text-center ${
              tarjetaActual.tipo === "verdad"
                ? "border-sky-400 bg-gradient-to-b from-sky-50 to-sky-100/60 dark:from-sky-950 dark:to-card"
                : "border-amber-400 bg-gradient-to-b from-amber-50 to-amber-100/60 dark:from-amber-950 dark:to-card"
            }`}
          >
            <span className="rounded-full bg-card px-3 py-1 text-[11px] font-black uppercase tracking-wider shadow-xs border border-border">
              {tarjetaActual.tipo === "verdad" ? "🗣️ Pregunta de Verdad" : "🔥 Prueba de Reto"} · {tarjetaActual.categoria}
            </span>

            <p className="my-6 text-lg sm:text-xl font-black text-foreground leading-snug px-2">
              "{tarjetaActual.texto}"
            </p>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground mb-4">
              <span>Recompensa al cumplir:</span>
              <span className="text-primary font-black">+{tarjetaActual.puntos} XP</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={cumplirTarjeta}
                className="btn-duo btn-duo-primary py-2.5 text-xs font-black uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>¡Cumplido!</span>
                <span>✓</span>
              </button>
              <button
                type="button"
                onClick={pasarTurno}
                className="btn-duo btn-duo-neutral py-2.5 text-xs font-black uppercase text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cobarde / Pasar turno
              </button>
            </div>
          </div>
        </section>
      )}
    </Pantalla>
  );
}
