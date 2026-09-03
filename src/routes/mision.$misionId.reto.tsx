// SPEC-13 — Reto presencial (P-13, Misión 5)
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";
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
          "Visitá un lugar emblemático de Santa Cruz, elegí una foto local y contá tu experiencia.",
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
  const router = useRouter();
  const { usuario, actualizar } = useSesion();
  const mision = obtenerMision(misionId);

  const [lugar, setLugar] = useState<string | null>(null);
  const [relato, setRelato] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [invitados, setInvitados] = useState<string[]>([]);
  const formularioModificado = Boolean(lugar || foto || relato.trim() || invitados.length);
  const { salir } = useSalidaProtegida(
    formularioModificado,
    "¿Querés abandonar el reto? Perderás los datos que completaste.",
  );

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

  const listo = Boolean(lugar) && Boolean(foto) && relato.trim().length >= 10;
  const insignia = insignias.find((i) => i.id === insigniaDeMision[mision.id]);

  const enviar = () => {
    if (!listo) return;
    const nuevas = new Set(usuario.insignias);
    const insigniaId = insigniaDeMision[mision.id];
    if (insigniaId) nuevas.add(insigniaId);
    if (invitados.length > 0) nuevas.add("i-promotor");

    const previos = usuario.progreso[mision.id]?.puntos ?? 0;
    const delta = Math.max(0, mision.puntajeMaximo - previos);
    const progreso = {
      ...usuario.progreso,
      [mision.id]: {
        completada: true,
        puntos: mision.puntajeMaximo,
        aciertos: 1,
        ultimoDelta: delta,
      },
    };
    if (temporadaCompletada(mision.temporadaId, { progreso })) nuevas.add("i-temporada");

    actualizar({
      puntos: usuario.puntos + delta,
      insignias: Array.from(nuevas),
      progreso,
    });
    router.history.replace(`/mision/${mision.id}/resultados`, undefined, {
      ignoreBlocker: true,
    });
  };

  const elegirFoto = (archivo?: File) => {
    if (!archivo) return;
    const lector = new FileReader();
    lector.onload = () => setFoto(typeof lector.result === "string" ? lector.result : null);
    lector.readAsDataURL(archivo);
  };

  return (
    <Pantalla className="gap-6 pb-12">
      <BotonVolver
        fallback={`/mision/${mision.id}`}
        etiqueta={mision.nombre}
        preferirHistorial={false}
        onVolver={() => salir(`/mision/${mision.id}`)}
      />

      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Reto presencial · {mision.puntajeMaximo} XP
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground">
          Salí, visitá, fotografiá y contá
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Elegí un lugar de Santa Cruz, andá, seleccioná una foto de tu dispositivo y contanos qué
          te llevás de la visita.
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
                aria-pressed={lugar === l.id}
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
        <h2 className="mb-2 text-sm font-semibold text-foreground">2. Elegí una foto local</h2>
        {foto ? (
          <div className="overflow-hidden rounded-2xl border-2 border-primary bg-muted">
            <img
              src={foto}
              alt="Vista previa de la foto elegida para el reto"
              className="h-48 w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setFoto(null)}
              className="min-h-11 w-full bg-card px-4 text-sm font-bold text-destructive"
            >
              Quitar foto
            </button>
          </div>
        ) : (
          <label className="flex h-36 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted text-sm text-muted-foreground transition-colors hover:border-primary">
            <Icono nombre="camara" className="h-9 w-9" />
            Seleccionar una foto del dispositivo
            <input
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(evento) => elegirFoto(evento.target.files?.[0])}
            />
          </label>
        )}
        <p className="mt-1 text-xs text-muted-foreground">
          La vista previa vive sólo en esta pantalla; no se guarda ni se envía.
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
        <h2 className="text-sm font-semibold text-foreground">4. Sumá embajadores (opcional)</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Elegí acompañantes para representar la invitación dentro de esta demo.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {amigosSugeridos.map((a) => {
            const activo = invitados.includes(a);
            return (
              <li key={a}>
                <button
                  type="button"
                  aria-pressed={activo}
                  onClick={() =>
                    setInvitados(activo ? invitados.filter((x) => x !== a) : [...invitados, a])
                  }
                  className={`inline-flex min-h-11 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
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
          Elegí un lugar, seleccioná una foto y escribí al menos una frase.
        </p>
      )}
    </Pantalla>
  );
}
