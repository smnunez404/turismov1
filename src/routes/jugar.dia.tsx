// SPEC-24 — Pregunta del día (P-22): una pregunta gratis diaria que alimenta la racha.
import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { preguntasRapidas } from "@/data/preguntas-rapidas";
import { obtenerCategoria } from "@/data/categorias";
import { proximaRecompensa, recompensasRacha } from "@/lib/juego";

export const Route = createFileRoute("/jugar/dia")({
  head: () => ({
    meta: [
      { title: "Pregunta del día — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Una pregunta cruceña por día para mantener tu racha y ganar recompensas.",
      },
      { property: "og:title", content: "Pregunta del día — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Respondé una pregunta diaria sobre Santa Cruz y sumá días de racha.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PreguntaDelDia,
});

function PreguntaDelDia() {
  const { usuario, actualizar } = useSesion();
  const [seleccion, setSeleccion] = useState<string | null>(null);

  // Selección estable por día (simulada con el día del año).
  const pregunta = useMemo(() => {
    const dia = Math.floor(Date.now() / 86_400_000);
    return preguntasRapidas[dia % preguntasRapidas.length]!;
  }, []);
  const categoria = obtenerCategoria(pregunta.categoriaId);
  const respondida = seleccion !== null;
  const correcta = seleccion === pregunta.respuestaCorrectaId;

  function responder(id: string) {
    if (respondida) return;
    setSeleccion(id);
    const acierto = id === pregunta.respuestaCorrectaId;
    const dias = usuario.racha.preguntaDelDiaHecha ? usuario.racha.dias : usuario.racha.dias + 1;
    actualizar({
      puntos: usuario.puntos + (acierto ? 15 : 5),
      puntosLiga: usuario.puntosLiga + (acierto ? 15 : 5),
      racha: {
        dias,
        mejorRacha: Math.max(usuario.racha.mejorRacha, dias),
        preguntaDelDiaHecha: true,
      },
    });
  }

  const siguiente = proximaRecompensa(usuario.racha.dias);

  return (
    <Pantalla conNav className="gap-5">
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Todos los días
        </p>
        <h1 className="text-2xl font-extrabold text-foreground">Pregunta del día</h1>
      </header>

      <section className="card-duo card-duo-activa flex items-center gap-3 p-4">
        <IconoPastilla nombre="racha" tono="accent" />
        <div>
          <p className="text-lg font-extrabold text-foreground">
            {usuario.racha.dias} días seguidos
          </p>
          <p className="text-xs text-muted-foreground">
            Próximo premio en el día {siguiente.dia}: {siguiente.premio}
          </p>
        </div>
      </section>

      <section className="card-duo p-5">
        {categoria && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-[11px] font-bold text-muted-foreground">
            <Icono nombre={categoria.icono} className="h-3.5 w-3.5" />
            {categoria.nombre}
          </span>
        )}
        <h2 className="mt-3 text-lg font-extrabold text-foreground">{pregunta.enunciado}</h2>
        <ul className="mt-4 grid gap-3">
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
                  className={`w-full rounded-2xl border-2 border-b-4 p-3.5 text-left text-base font-bold text-foreground ${tono}`}
                >
                  {op.texto}
                </button>
              </li>
            );
          })}
        </ul>
        {respondida && (
          <div className="mt-4 rounded-2xl bg-muted p-4">
            <p className="text-sm font-extrabold text-foreground">
              {correcta ? "¡Correcto! +15 pts" : "No era esa, pero sumás +5 pts"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{pregunta.retroalimentacion}</p>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
          Premios por racha
        </h2>
        <ul className="grid gap-2">
          {recompensasRacha.map((r) => (
            <li
              key={r.dia}
              className={`card-duo flex items-center gap-3 p-3 ${
                usuario.racha.dias >= r.dia ? "card-duo-activa" : ""
              }`}
            >
              <IconoPastilla
                nombre={usuario.racha.dias >= r.dia ? "check" : "regalo"}
                tono={usuario.racha.dias >= r.dia ? "primary" : "muted"}
              />
              <span className="text-sm">
                <span className="block font-extrabold text-foreground">Día {r.dia}</span>
                <span className="block text-xs text-muted-foreground">{r.premio}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <Link to="/jugar" className="text-center text-sm text-muted-foreground underline underline-offset-4">
        Volver al modo rápido
      </Link>
    </Pantalla>
  );
}