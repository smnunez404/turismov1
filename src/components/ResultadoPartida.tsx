import type { ReactNode } from "react";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import type { NombreIcono } from "@/components/Icono";
import type { ResumenPartida, UsuarioSesion } from "@/data/tipos";
import type { EstadoPrevioResultado } from "@/lib/resultado";
import { nivelDe } from "@/lib/progreso";
import { TucanGuia } from "@/components/TucanGuia";

export function ResultadoPartida({
  usuario,
  resumen,
  previo,
  ceja,
  titulo,
  descripcion,
  icono = "celebrar",
  tono = "accent",
  mostrarRacha = false,
  detalle,
  acciones,
}: {
  usuario: UsuarioSesion;
  resumen: ResumenPartida;
  previo: EstadoPrevioResultado;
  ceja: string;
  titulo: string;
  descripcion: string;
  icono?: NombreIcono;
  tono?: "primary" | "accent" | "secondary" | "muted";
  mostrarRacha?: boolean;
  detalle?: ReactNode;
  acciones: ReactNode;
}) {
  const nivel = nivelDe(usuario.xp);
  const xpGanado = Math.max(0, usuario.xp - previo.xp);
  const monedasGanadas = Math.max(0, usuario.monedas - previo.monedas);
  const ligaGanada = Math.max(0, usuario.puntosLiga - previo.puntosLiga);
  const albumNuevos = diferencia(usuario.album, previo.album).length;
  const avatarNuevos = diferencia(usuario.inventarioAvatar, previo.inventarioAvatar).length;
  const insigniasNuevas = diferencia(usuario.insignias, previo.insignias).length;
  const hayDesbloqueos = albumNuevos + avatarNuevos + insigniasNuevas > 0;

  const partesDesbloqueo: string[] = [];
  if (albumNuevos > 0) partesDesbloqueo.push(`${albumNuevos} estampa(s)`);
  if (avatarNuevos > 0) partesDesbloqueo.push(`${avatarNuevos} pieza(s)`);
  if (insigniasNuevas > 0) partesDesbloqueo.push(`${insigniasNuevas} insignia(s)`);

  return (
    <div className="flex flex-col gap-3">
      {/* ── Header hero con ambientación festiva y temática cruceña ── */}
      <header className="reward-panel reward-enter relative overflow-hidden p-5 text-center border-2 border-primary/25 bg-gradient-to-b from-card via-card to-primary/5 shadow-md">
        {/* Adorno visual festivo de fondo */}
        <div className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-accent/20 blur-2xl" />
        <div className="pointer-events-none absolute -right-6 -bottom-6 h-28 w-28 rounded-full bg-primary/20 blur-2xl" />
        
        <TucanGuia
          tamano="sm"
          className="pointer-events-none absolute right-1 -top-1 opacity-90 drop-shadow-sm"
        />

        <div className="relative mx-auto flex w-fit items-center justify-center">
          <div className="relative rounded-full ring-4 ring-primary/20 ring-offset-2 ring-offset-background p-1 bg-card">
            <AvatarInsignia avatarId={usuario.avatarId} avatar={usuario.avatar} tamano="lg" />
          </div>
          <span className="absolute -top-1 -right-2 z-10 filter drop-shadow-md animate-bounce">
            <IconoPastilla nombre={icono} tono={tono} className="h-8 w-8 !rounded-full shadow-sm" />
          </span>
        </div>

        <p className="mt-3 text-xs font-black tracking-widest text-primary uppercase flex items-center justify-center gap-1.5">
          <Icono nombre="destello" className="h-3.5 w-3.5 text-primary" />
          <span>{ceja}</span>
          <Icono nombre="destello" className="h-3.5 w-3.5 text-primary" />
        </p>
        <h1 tabIndex={-1} autoFocus className="mt-1 text-2xl sm:text-3xl font-black text-foreground tracking-tight focus:outline-none">
          {titulo}
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          {descripcion}
        </p>
      </header>

      {/* ── Indicadores compactos y visuales ── */}
      <section aria-label="Resultado de los cinco desafíos" className="py-0.5">
        <div className="flex justify-center gap-2 sm:gap-3">
          {resumen.desafioIds.map((id, indice) => {
            const correcto = resumen.resultados[id]?.correcto ?? false;
            return (
              <span
                key={id}
                aria-label={`Desafío ${indice + 1}: ${correcto ? "correcto" : "incorrecto"}`}
                className={`grid h-10 w-10 sm:h-11 sm:w-11 place-items-center rounded-2xl border-2 transition-transform shadow-xs ${
                  correcto
                    ? "border-primary bg-primary/15 text-primary scale-105"
                    : "border-destructive/40 bg-destructive/10 text-destructive opacity-80"
                }`}
              >
                <Icono nombre={correcto ? "acierto" : "error"} className="h-4 w-4 sm:h-5 sm:w-5" />
              </span>
            );
          })}
        </div>
        <p className="mt-2 text-center text-xs font-extrabold text-foreground flex items-center justify-center gap-1.5">
          {resumen.aciertos === 5 ? (
            <span className="text-primary flex items-center gap-1">
              <Icono nombre="corona" className="h-4 w-4 text-primary" />
              ¡Puntaje perfecto! 5 de 5 resueltos
            </span>
          ) : (
            <span className="text-muted-foreground">
              {resumen.aciertos} de {resumen.desafioIds.length} desafíos resueltos
            </span>
          )}
        </p>
      </section>

      {/* ── Bloque unificado: recompensas + nivel + desbloqueos ── */}
      <section aria-label="Progreso y recompensas" className="card-duo border-2 border-border/80 bg-card p-4 shadow-xs">
        {/* Recompensas destacadas estilo gaming con SVG icons */}
        <div className={`grid gap-2.5 ${ligaGanada > 0 ? "grid-cols-3" : "grid-cols-2"}`}>
          <div className="rounded-2xl border-2 border-accent/40 bg-accent/10 p-3 text-center transition-all flex flex-col items-center">
            <Icono nombre="rayo" className="h-5 w-5 text-accent-foreground" />
            <p className="mt-1 text-xl font-black text-foreground">+{xpGanado}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-accent-foreground">XP reales</p>
          </div>
          <div className="rounded-2xl border-2 border-secondary/40 bg-secondary/10 p-3 text-center transition-all flex flex-col items-center">
            <Icono nombre="cupon" className="h-5 w-5 text-secondary" />
            <p className="mt-1 text-xl font-black text-foreground">+{monedasGanadas}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary">monedas</p>
          </div>
          {ligaGanada > 0 && (
            <div className="rounded-2xl border-2 border-primary/40 bg-primary/10 p-3 text-center transition-all flex flex-col items-center">
              <Icono nombre="ranking" className="h-5 w-5 text-primary" />
              <p className="mt-1 text-xl font-black text-foreground">+{ligaGanada}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-primary">liga</p>
            </div>
          )}
        </div>

        {/* Separador */}
        <hr className="my-3.5 border-border" />

        {/* Nivel y barra */}
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-muted-foreground">Tu Rango</span>
            <p className="text-sm font-extrabold text-foreground">Nivel {nivel.nombre}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-semibold text-muted-foreground">
              {nivel.siguiente ? `${nivel.faltan} XP restantes` : "Rango Máximo"}
            </span>
            <p className="text-xs font-bold text-primary">
              {nivel.siguiente ? `para ${nivel.siguiente.nombre}` : "¡Embajador Maestro!"}
            </p>
          </div>
        </div>
        <div className="barra-duo mt-2 h-3" aria-label={`${nivel.porcentaje}% del nivel completado`}>
          <span className="barra-duo-fill" style={{ width: `${nivel.porcentaje}%` }} />
        </div>

        {/* Racha (condicional) */}
        {mostrarRacha && (
          <div className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-secondary/30 bg-secondary/10 p-2.5 text-xs sm:text-sm">
            <Icono nombre="racha" className="h-5 w-5 text-secondary shrink-0" />
            <div>
              <strong className="text-foreground">{usuario.racha.dias} días seguidos de racha</strong>
              <p className="text-[11px] text-muted-foreground">¡Mantené tu constancia jugando cada día!</p>
            </div>
          </div>
        )}

        {/* Desbloqueos como línea destacada */}
        {hayDesbloqueos && (
          <div className="mt-3 flex items-center gap-2.5 rounded-xl border-2 border-accent/40 bg-accent/15 p-2.5 text-xs sm:text-sm">
            <Icono nombre="regalo" className="h-5 w-5 text-accent-foreground shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-black uppercase text-accent-foreground">¡Nuevo Botín Obtenido!</p>
              <p className="text-xs font-bold text-foreground truncate">
                {partesDesbloqueo.join(" · ")}
              </p>
            </div>
          </div>
        )}
      </section>

      {detalle}
      <div className="grid gap-3">{acciones}</div>
    </div>
  );
}

function Dato({
  icono,
  valor,
  etiqueta,
  tono,
}: {
  icono: NombreIcono;
  valor: string;
  etiqueta: string;
  tono: "accent" | "secondary";
}) {
  const clase =
    tono === "accent" ? "text-accent-foreground bg-accent/15" : "text-secondary bg-secondary/10";
  return (
    <div className={`rounded-xl p-2.5 text-center ${clase}`}>
      <Icono nombre={icono} className="mx-auto h-4 w-4" />
      <p className="mt-0.5 text-lg font-extrabold text-foreground">{valor}</p>
      <p className="text-[11px] font-bold text-muted-foreground">{etiqueta}</p>
    </div>
  );
}

function diferencia(actual: string[], anterior: string[]) {
  const conocidos = new Set(anterior);
  return actual.filter((id) => !conocidos.has(id));
}
