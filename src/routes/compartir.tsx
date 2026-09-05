// SPEC-17 — Preparar tarjeta e invitaciones simuladas (P-17)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { insignias } from "@/data/insignias";
import { amigosSugeridos, canalesCompartir } from "@/data/comunidad";
import { avanceTemporada, nivelDe, temporadaCompletada } from "@/lib/progreso";

export const Route = createFileRoute("/compartir")({
  head: () => ({
    meta: [
      { title: "Preparar tarjeta — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Prepará una demostración visual de tus logros e invitaciones.",
      },
      { property: "og:title", content: "Mis logros de Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "De aprendiz a promotor: una tarjeta de demostración con progreso e insignias.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Compartir,
});

function Compartir() {
  const { usuario, actualizar } = useSesion();
  const avance = avanceTemporada("t1", usuario);
  const nivel = nivelDe(usuario.xp);
  const finTemporada = temporadaCompletada("t1", usuario);
  const obtenidas = insignias.filter((i) => usuario.insignias.includes(i.id));

  const [canal, setCanal] = useState<string | null>(null);
  const [tarjetaPreparada, setTarjetaPreparada] = useState(false);
  const [invitados, setInvitados] = useState<string[]>([]);
  const [nuevoInvitado, setNuevoInvitado] = useState("");
  const [invitacionesPreparadas, setInvitacionesPreparadas] = useState(false);

  if (avance.completadas === 0 && usuario.progresoJuego.partidas === 0) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <BotonVolver fallback="/perfil" preferirHistorial={false} className="self-start" />
        <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/20 text-accent-foreground ring-1 ring-accent/30">
          <Icono nombre="destello" className="h-9 w-9" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">Todavía no hay nada que contar</h1>
        <p className="text-sm text-muted-foreground">
          Completá una partida o una misión y volvé para preparar tu primera tarjeta.
        </p>
        <Link to="/partida" className="mt-2 btn-duo btn-duo-primary">
          Jugar una partida
        </Link>
      </Pantalla>
    );
  }

  const mensaje = finTemporada
    ? `Completé la Temporada 1 “Descubre Santa Cruz” con ${usuario.xp} XP y ${usuario.insignias.length} insignias. ¡Soy Embajador de mi ciudad!`
    : usuario.progresoJuego.partidas > 0
      ? `Completé ${usuario.progresoJuego.partidas} partidas de cinco desafíos y llegué a ${usuario.xp} XP como ${nivel.nombre}. ¿Te animás a superar mi resultado?`
      : `Llevo ${avance.completadas} de ${avance.total} misiones y ${usuario.xp} XP como ${nivel.nombre} de Santa Cruz.`;

  const sumarInvitado = (nombre: string) => {
    const limpio = nombre.trim();
    if (!limpio || invitados.includes(limpio)) return;
    setInvitados((actuales) => [...actuales, limpio]);
    setInvitacionesPreparadas(false);
  };

  const prepararInvitaciones = () => {
    if (invitados.length === 0) return;
    setInvitacionesPreparadas(true);
    if (!usuario.insignias.includes("i-promotor")) {
      actualizar({ insignias: [...usuario.insignias, "i-promotor"] });
    }
  };

  return (
    <Pantalla className="gap-6 pb-12">
      <BotonVolver fallback="/perfil" preferirHistorial={false} />
      <header>
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Simulación de difusión
        </p>
        <h1 className="text-2xl font-bold text-foreground">Prepará la tarjeta de tu logro</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Esta pantalla representa cómo se vería compartir. No publica ni envía datos reales.
        </p>
      </header>

      <section className="card-duo relative overflow-hidden p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold tracking-widest text-primary uppercase">
            Tarjeta de logro
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
            <Icono nombre="destello" className="h-3 w-3" /> Nivel {nivel.nombre}
          </span>
        </div>

        <p className="mt-2 text-base font-bold leading-snug text-foreground">{mensaje}</p>

        {obtenidas.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {obtenidas.slice(0, 3).map((i) => (
              <span
                key={i.id}
                className="inline-flex items-center gap-1 rounded-full bg-muted/80 px-2.5 py-1 text-xs font-semibold text-foreground"
              >
                <Icono nombre={i.icono} className="h-3.5 w-3.5 text-primary" /> {i.nombre}
              </span>
            ))}
            {obtenidas.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-muted/60 px-2 py-1 text-xs font-bold text-muted-foreground">
                +{obtenidas.length - 3} más
              </span>
            )}
          </div>
        )}

        <p className="mt-3 text-[11px] font-medium text-muted-foreground">
          #SoyEmbajadorBolivia · #SantaCruz
        </p>
      </section>

      {/* ── Canales rápidos de difusión ── */}
      <section className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          Elegí un canal para compartir
        </h2>
        <div className="grid grid-cols-2 gap-2.5">
          {canalesCompartir.map((c) => {
            const activo = canal === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCanal(c.id);
                  setTarjetaPreparada(true);
                }}
                aria-pressed={activo}
                className={`flex items-center gap-3 rounded-2xl border-2 p-3 text-left transition-all ${
                  activo
                    ? "border-primary bg-primary/10 shadow-xs"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <IconoPastilla nombre={c.icono} tono={activo ? "primary" : "muted"} className="h-10 w-10" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-foreground leading-tight">{c.nombre}</p>
                  <p className="text-[11px] text-muted-foreground line-clamp-1">{c.detalle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {tarjetaPreparada && (
          <div
            role="status"
            className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 p-3 text-xs font-medium text-foreground transition-all"
          >
            <Icono nombre="check" className="h-4 w-4 shrink-0 text-primary" />
            <span>
              Tarjeta lista para <strong>{canalesCompartir.find((c) => c.id === canal)?.nombre}</strong>.
            </span>
          </div>
        )}
      </section>

      {/* ── Invitaciones a amigos ── */}
      <section className="card-duo p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Invitar amigos</h2>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary">
            <Icono nombre="compartir" className="h-3.5 w-3.5" /> +Insignia Promotor
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          Seleccioná contactos para enviarles una invitación a jugar:
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {amigosSugeridos.map((a) => {
            const activo = invitados.includes(a);
            return (
              <button
                key={a}
                type="button"
                onClick={() => {
                  setInvitados((actuales) =>
                    activo ? actuales.filter((nombre) => nombre !== a) : [...actuales, a],
                  );
                  setInvitacionesPreparadas(false);
                }}
                className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
                  activo
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {activo ? <Icono nombre="check" className="h-3 w-3" /> : "+"}
                {a}
              </button>
            );
          })}
        </div>

        <div className="mt-3 flex gap-2">
          <input
            value={nuevoInvitado}
            onChange={(e) => setNuevoInvitado(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sumarInvitado(nuevoInvitado);
                setNuevoInvitado("");
              }
            }}
            placeholder="Otro amigo..."
            className="min-w-0 flex-1 rounded-xl border border-input bg-background px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => {
              sumarInvitado(nuevoInvitado);
              setNuevoInvitado("");
            }}
            className="rounded-xl bg-secondary px-3 py-2 text-xs font-bold text-secondary-foreground hover:opacity-90"
          >
            Agregar
          </button>
        </div>

        {invitados.length > 0 && (
          <button
            type="button"
            onClick={prepararInvitaciones}
            className="btn-duo btn-duo-secondary mt-3 w-full py-2.5 text-xs"
          >
            {invitacionesPreparadas
              ? `✓ Invitaciones enviadas a (${invitados.length})`
              : `Enviar invitaciones (${invitados.length})`}
          </button>
        )}
      </section>

      <div className="flex flex-col gap-2 text-center pt-1">
        {finTemporada && (
          <Link to="/certificado" className="btn-duo btn-duo-ghost">
            Ver mi certificado
          </Link>
        )}
        <Link to="/perfil" className="text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors">
          Volver a mi perfil
        </Link>
      </div>
    </Pantalla>
  );
}
