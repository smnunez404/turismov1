// SPEC-13 — Reto presencial (P-13, Misión 5)
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { Icono } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { amigosSugeridos } from "@/data/comunidad";
import { insigniaDeMision, obtenerMision, temporadaCompletada } from "@/lib/progreso";

export const Route = createFileRoute("/mision/$misionId/reto")({
  head: () => ({
    meta: [
      { title: "Reto presencial — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Visitá un lugar emblemático de Santa Cruz, tomá una foto y contá tu experiencia como embajador.",
      },
      { property: "og:title", content: "Mi Primera Aventura — reto presencial" },
      {
        property: "og:description",
        content: "Salí, visitá, fotografiá y contá: el reto que lleva el juego al mundo real.",
      },
    ],
  }),
  component: Reto,
});

const lugares = [
  { id: "plaza", nombre: "Plaza 24 de Septiembre", icono: "plaza" },
  { id: "catedral", nombre: "Catedral Basílica de San Lorenzo", icono: "iglesia" },
  { id: "lomas", nombre: "Lomas de Arena", icono: "desierto" },
  { id: "botanico", nombre: "Jardín Botánico", icono: "naturaleza" },
  { id: "manzana", nombre: "Manzana Uno", icono: "arte" },
];



function Reto() {
  const { misionId } = Route.useParams();
  const navigate = useNavigate();
  const { usuario, actualizar } = useSesion();
  const mision = obtenerMision(misionId);

  const [lugar, setLugar] = useState<string | null>(null);
  const [relato, setRelato] = useState("");
  const [foto, setFoto] = useState(false);
  const [invitados, setInvitados] = useState<string[]>([]);

  if (!mision) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <h1 className="text-2xl font-bold text-foreground">Misión no encontrada</h1>
        <Link to="/temporadas" className="text-sm text-primary underline underline-offset-4">
          Volver al mapa de temporadas
        </Link>
      </Pantalla>
    );
  }

  const listo = Boolean(lugar) && foto && relato.trim().length >= 10;
  const insignia = insignias.find((i) => i.id === insigniaDeMision[mision.id]);

  const enviar = () => {
    if (!listo) return;
    const nuevas = new Set(usuario.insignias);
    const insigniaId = insigniaDeMision[mision.id];
    if (insigniaId) nuevas.add(insigniaId);
    if (invitados.length > 0) nuevas.add("i-promotor");

    const progreso = {
      ...usuario.progreso,
      [mision.id]: { completada: true, puntos: mision.puntajeMaximo, aciertos: 1 },
    };
    if (temporadaCompletada(mision.temporadaId, { progreso })) nuevas.add("i-temporada");

    const previos = usuario.progreso[mision.id]?.puntos ?? 0;
    actualizar({
      puntos: usuario.puntos + Math.max(0, mision.puntajeMaximo - previos),
      insignias: Array.from(nuevas),
      progreso,
    });
    navigate({ to: "/mision/$misionId/resultados", params: { misionId: mision.id } });
  };

  return (
    <Pantalla className="gap-6 pb-12">
      <Link
        to="/mision/$misionId"
        params={{ misionId: mision.id }}
        className="text-sm text-muted-foreground underline underline-offset-4"
      >
        ← {mision.nombre}
      </Link>

      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Reto presencial · {mision.puntajeMaximo} puntos
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">
          Salí, visitá, fotografiá y contá
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Este reto se cumple en el mundo real: elegí un lugar de Santa Cruz, andá, sacá una
          foto y contanos qué te llevás de la visita.
        </p>
      </header>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">1. Elegí tu lugar</h2>
        <ul className="flex flex-col gap-2">
          {lugares.map((l) => (
            <li key={l.id}>
              <button
                type="button"
                onClick={() => setLugar(l.id)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-sm font-medium text-foreground transition-colors ${
                  lugar === l.id ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}
              >
                <Icono
                  nombre={l.icono}
                  className={`h-5 w-5 ${lugar === l.id ? "text-primary" : "text-muted-foreground"}`}
                />
                {l.nombre}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">2. Subí tu foto</h2>
        <button
          type="button"
          onClick={() => setFoto(!foto)}
          className={`flex h-36 w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed text-sm transition-colors ${
            foto
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-muted text-muted-foreground"
          }`}
        >
          <Icono
            nombre={foto ? "imagen" : "camara"}
            className={`h-9 w-9 ${foto ? "text-primary" : "text-muted-foreground"}`}
          />
          {foto ? "Foto cargada (simulada) · tocá para quitar" : "Tocá para simular la carga"}
        </button>
        <p className="mt-1 text-xs text-muted-foreground">
          La carga es simulada: el prototipo no guarda ningún archivo.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">3. Contá tu experiencia</h2>
        <textarea
          value={relato}
          onChange={(e) => setRelato(e.target.value)}
          rows={4}
          placeholder="¿Qué viste? ¿Qué le contarías a alguien que llega de visita?"
          className="w-full rounded-2xl border-2 border-input bg-card p-3 text-sm text-foreground outline-none focus:border-primary"
        />
      </section>

      <section className="rounded-2xl bg-accent/15 p-4">
        <h2 className="text-sm font-semibold text-foreground">
          4. Sumá embajadores (opcional)
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Invitá a alguien a hacer el recorrido con vos y ganá la insignia Promotor Cruceño.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {amigosSugeridos.map((a) => {
            const activo = invitados.includes(a);
            return (
              <li key={a}>
                <button
                  type="button"
                  onClick={() =>
                    setInvitados(
                      activo ? invitados.filter((x) => x !== a) : [...invitados, a],
                    )
                  }
                  className={`inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    activo
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {activo ? <Icono nombre="check" className="h-3.5 w-3.5" /> : "+"}
                  {a}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {insignia && (
        <p className="flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
          Al completar el reto ganás
          <Icono nombre={insignia.icono} className="h-4 w-4 text-secondary" />
          <strong className="text-foreground">{insignia.nombre}</strong>.
        </p>
      )}

      <button
        type="button"
        onClick={enviar}
        disabled={!listo}
        className="btn-duo btn-duo-primary disabled:opacity-50"
      >
        Completar el reto
      </button>
      {!listo && (
        <p className="text-center text-xs text-muted-foreground">
          Elegí un lugar, cargá la foto y escribí al menos una frase.
        </p>
      )}
    </Pantalla>
  );
}
