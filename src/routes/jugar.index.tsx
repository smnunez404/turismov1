import { createFileRoute, Link } from "@tanstack/react-router";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { TOTAL_DESAFIOS_ACTIVOS } from "@/data/desafios";
import { nivelDe } from "@/lib/progreso";

export const Route = createFileRoute("/jugar/")({
  head: () => ({ meta: [{ title: "Jugar — Soy Embajador Bolivia" }] }),
  component: HubJugar,
});

function HubJugar() {
  const { usuario } = useSesion();
  const nivel = nivelDe(usuario.xp);

  return (
    <Pantalla conNav className="gap-4">
      {/* ── Header con Avatar real del usuario ── */}
      <header className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="chapter-label">Hola, {usuario.nombre || "Curioso"}</p>
          <h1 className="truncate text-2xl font-extrabold text-foreground">
            ¿Cuánto conocés Santa Cruz?
          </h1>
        </div>
        <Link
          to="/perfil"
          aria-label="Ver mi perfil"
          className="shrink-0 transition-transform active:scale-95"
        >
          <AvatarInsignia avatarId={usuario.avatarId} avatar={usuario.avatar} tamano="sm" />
        </Link>
      </header>

      {/* ── Panel de Métricas y Nivel Integrado (Cabecera) ── */}
      <section className="card-duo p-3">
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <Dato icono="destello" valor={usuario.xp} etiqueta="XP" />
          <Dato icono="cupon" valor={usuario.monedas} etiqueta="monedas" />
          <Dato icono="ranking" valor={usuario.puntosLiga} etiqueta="liga" />
          <Dato icono="vida" valor={`${usuario.vidas}/3`} etiqueta="vidas" />
        </div>

        <hr className="my-2 border-border" />

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span className="font-bold text-foreground">Nivel {nivel.nombre}</span>
          <span>
            {nivel.siguiente ? `${nivel.faltan} XP para ${nivel.siguiente.nombre}` : "Nivel máximo"}
          </span>
        </div>
        <div className="barra-duo mt-1.5 h-2">
          <span className="barra-duo-fill" style={{ width: `${nivel.porcentaje}%` }} />
        </div>
      </section>

      {/* ── Tarjeta Principal de Acción: Partida Rápida ── */}
      <section className="card-duo card-duo-activa relative overflow-hidden p-4">
        <div className="flex items-start gap-3">
          <IconoPastilla nombre="rayo" tono="primary" className="h-10 w-10 shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold tracking-widest text-primary uppercase">
              Partida rápida gratuita
            </p>
            <h2 className="text-lg font-extrabold text-foreground leading-tight">
              5 desafíos · 5 mecánicas
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
              {TOTAL_DESAFIOS_ACTIVOS} desafíos en rotación: rápido, detective, observá, asociación
              y decisión.
            </p>
          </div>
        </div>

        <Link to="/partida" className="btn-duo btn-duo-primary mt-3 text-sm py-2.5">
          JUGAR AHORA
        </Link>
      </section>

      {/* ── Otros Modos de Juego (Grilla interactiva 2x2 compacta) ── */}
      <section>
        <h3 className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          Otros modos de juego
        </h3>
        <div className="grid grid-cols-2 gap-2.5">
          {/* Ruleta */}
          <Link
            to="/jugar/ruleta"
            className="card-duo card-duo-activa border-accent flex flex-col justify-between p-3 transition-colors hover:border-primary active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between">
                <IconoPastilla nombre="ruleta" tono="accent" className="h-7 w-7" />
                <span className="rounded-full bg-secondary/15 px-1.5 py-0.5 text-[10px] font-extrabold text-secondary uppercase">
                  Clásico
                </span>
              </div>
              <p className="mt-2 text-xs font-extrabold text-foreground leading-snug">
                Ruleta cruceña
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                6 categorías y medallas
              </p>
            </div>
            <span className="mt-2 text-[10px] font-bold text-secondary">
              {usuario.vidas ? "Usa 1 vida →" : "Recuperar vidas →"}
            </span>
          </Link>

          {/* Reto Diario */}
          <Link
            to="/jugar/dia"
            className="card-duo flex flex-col justify-between p-3 transition-colors hover:border-primary active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between">
                <IconoPastilla nombre="calendario" tono="muted" className="h-7 w-7" />
                {usuario.progresoJuego.retoDiarioFecha && (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-extrabold text-primary">
                    Listo
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs font-extrabold text-foreground leading-snug">
                Reto diario
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                5 preguntas por fecha
              </p>
            </div>
            <span className="mt-2 text-[10px] font-bold text-primary">
              {usuario.progresoJuego.retoDiarioFecha ? "Practicar gratis →" : "Jugar hoy →"}
            </span>
          </Link>

          {/* Versus */}
          <Link
            to="/duelo"
            className="card-duo flex flex-col justify-between p-3 transition-colors hover:border-primary active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between">
                <IconoPastilla nombre="duelo" tono="muted" className="h-7 w-7" />
                <span className="text-[10px] font-bold text-muted-foreground">1v1</span>
              </div>
              <p className="mt-2 text-xs font-extrabold text-foreground leading-snug">
                Duelo Versus
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                Rival de práctica
              </p>
            </div>
            <span className="mt-2 text-[10px] font-bold text-muted-foreground">
              {usuario.vidas ? "Desafiar rival →" : "Sin vidas →"}
            </span>
          </Link>

          {/* Descubrir / Álbum */}
          <Link
            to="/temporadas"
            className="card-duo flex flex-col justify-between p-3 transition-colors hover:border-primary active:scale-[0.98]"
          >
            <div>
              <div className="flex items-center justify-between">
                <IconoPastilla nombre="mapa" tono="muted" className="h-7 w-7" />
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-extrabold text-muted-foreground">
                  {usuario.album.length}/5
                </span>
              </div>
              <p className="mt-2 text-xs font-extrabold text-foreground leading-snug">
                Capítulos y álbum
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-tight">
                Misiones de Santa Cruz
              </p>
            </div>
            <span className="mt-2 text-[10px] font-bold text-muted-foreground">Ver mapa →</span>
          </Link>
        </div>
      </section>
    </Pantalla>
  );
}

function Dato({
  icono,
  valor,
  etiqueta,
}: {
  icono: string;
  valor: string | number;
  etiqueta: string;
  tono?: string;
}) {
  return (
    <div className="rounded-xl bg-muted/40 p-1.5 text-center">
      <Icono nombre={icono} className="mx-auto h-3.5 w-3.5 text-primary" />
      <p className="font-extrabold text-sm text-foreground">{valor}</p>
      <p className="text-[10px] leading-tight text-muted-foreground">{etiqueta}</p>
    </div>
  );
}
