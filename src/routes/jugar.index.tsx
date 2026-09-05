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

        <Link to="/partida" className="btn-duo btn-duo-primary mt-3 text-sm py-2.5 flex items-center justify-center gap-2">
          <Icono nombre="rayo" className="h-5 w-5 shrink-0" />
          <span>JUGAR AHORA</span>
        </Link>
      </section>

      {/* ── Modos de Juego Especiales (Tarjetas visuales con imágenes 3D de alta calidad) ── */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Modalidades y Desafíos
          </h3>
          <span className="text-[11px] font-semibold text-primary">
            Nuevos modos interactivos
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Ruleta Cruceña */}
          <Link
            to="/jugar/ruleta"
            className="card-duo group relative overflow-hidden p-0 border-2 border-accent/40 bg-card hover:border-accent transition-all active:scale-[0.99] flex flex-row items-center h-24"
          >
            <div className="w-24 h-full shrink-0 relative overflow-hidden bg-accent/10">
              <img
                src="/camino/ruleta_crucena.jpg"
                alt="Ruleta Cruceña"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
            </div>
            <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-black uppercase text-secondary tracking-wide">
                  Clásico Cruceño
                </span>
                <span className="rounded-full bg-accent/20 px-1.5 py-0.2 text-[9px] font-extrabold text-accent-foreground">
                  6 Categorías
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-foreground truncate mt-0.5">
                Ruleta de la Suerte
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                Girá, respondé por medallas y coleccioná sellos.
              </p>
              <span className="text-[10px] font-bold text-secondary mt-1 flex items-center gap-1">
                {usuario.vidas ? "Girar ruleta (1 vida) →" : "Recuperar vidas →"}
              </span>
            </div>
          </Link>

          {/* Reto Diario */}
          <Link
            to="/jugar/dia"
            className="card-duo group relative overflow-hidden p-0 border-2 border-primary/30 bg-card hover:border-primary transition-all active:scale-[0.99] flex flex-row items-center h-24"
          >
            <div className="w-24 h-full shrink-0 relative overflow-hidden bg-primary/10">
              <img
                src="/camino/reto_diario.jpg"
                alt="Reto Diario"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
            </div>
            <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-black uppercase text-primary tracking-wide">
                  Reto de Hoy
                </span>
                {usuario.progresoJuego.retoDiarioFecha ? (
                  <span className="rounded-full bg-primary/15 px-1.5 py-0.2 text-[9px] font-extrabold text-primary">
                    Completado
                  </span>
                ) : (
                  <span className="rounded-full bg-amber-500/20 px-1.5 py-0.2 text-[9px] font-black text-amber-700 animate-pulse">
                    Disponible
                  </span>
                )}
              </div>
              <h4 className="text-sm font-extrabold text-foreground truncate mt-0.5">
                Desafío del Día
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                5 preguntas exclusivas para mantener tu racha.
              </p>
              <span className="text-[10px] font-bold text-primary mt-1">
                {usuario.progresoJuego.retoDiarioFecha ? "Volver a practicar →" : "Jugar reto del día →"}
              </span>
            </div>
          </Link>

          {/* Sopa de Letras */}
          <Link
            to={"/jugar/sopa" as any}
            className="card-duo group relative overflow-hidden p-0 border-2 border-emerald-500/35 bg-card hover:border-emerald-500 transition-all active:scale-[0.99] flex flex-row items-center h-24"
          >
            <div className="w-24 h-full shrink-0 relative overflow-hidden bg-emerald-500/10">
              <img
                src="/camino/sopa_letras.jpg"
                alt="Sopa de Letras"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
            </div>
            <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wide">
                  Mente Ágil
                </span>
                <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.2 text-[9px] font-extrabold text-emerald-600">
                  Nuevo
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-foreground truncate mt-0.5">
                Sopa de Letras
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                Encontrá modismos, fauna y flora cruceña.
              </p>
              <span className="text-[10px] font-bold text-emerald-600 mt-1">
                Buscar palabras →
              </span>
            </div>
          </Link>

          {/* Verdad o Reto */}
          <Link
            to={"/jugar/retos" as any}
            className="card-duo group relative overflow-hidden p-0 border-2 border-amber-500/35 bg-card hover:border-amber-500 transition-all active:scale-[0.99] flex flex-row items-center h-24"
          >
            <div className="w-24 h-full shrink-0 relative overflow-hidden bg-amber-500/10">
              <img
                src="/camino/verdad_reto.jpg"
                alt="Verdad o Reto"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
            </div>
            <div className="p-2.5 flex-1 min-w-0 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] font-black uppercase text-amber-600 tracking-wide">
                  En Grupo
                </span>
                <span className="rounded-full bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-600">
                  Amigos
                </span>
              </div>
              <h4 className="text-sm font-extrabold text-foreground truncate mt-0.5">
                Verdad o Reto Cruceño
              </h4>
              <p className="text-[11px] text-muted-foreground line-clamp-1">
                Preguntas picantes y penitencias cambas.
              </p>
              <span className="text-[10px] font-bold text-amber-600 mt-1">
                Jugar en grupo →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Banner Especial: Liguillas Privadas (Kahoot escolar y amigos) ── */}
      <section className="card-duo border-2 border-primary/40 bg-gradient-to-r from-primary/10 via-card to-accent/10 p-3.5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <img
            src="/camino/trofeo_liguillas.jpg"
            alt="Trofeo"
            width={48}
            height={48}
            className="h-11 w-11 object-contain drop-shadow-xs shrink-0"
          />
          <div>
            <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[9px] font-black text-primary uppercase">
              Nuevo modo torneo
            </span>
            <h3 className="text-sm font-extrabold text-foreground leading-tight mt-0.5">
              Liguillas Privadas con PIN
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Jugá con tu colegio o amigos estilo Kahoot sin alterar la liga global.
            </p>
          </div>
        </div>
        <Link
          to={"/liguillas" as any}
          className="btn-duo btn-duo-primary !py-1.5 !px-3.5 !text-xs !w-auto shrink-0"
        >
          Entrar
        </Link>
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
