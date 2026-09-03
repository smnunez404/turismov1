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
      {/* ── Header hero ── */}
      <header className="reward-panel reward-enter relative overflow-hidden p-4 text-center">
        <TucanGuia
          tamano="sm"
          className="pointer-events-none absolute -right-3 -bottom-2 opacity-80"
        />
        <div className="relative mx-auto flex w-fit items-end">
          <AvatarInsignia avatarId={usuario.avatarId} avatar={usuario.avatar} tamano="lg" />
          <IconoPastilla nombre={icono} tono={tono} className="-ml-3 -mb-1 shadow-sm" />
        </div>
        <p className="mt-2 text-xs font-extrabold tracking-widest text-primary uppercase">{ceja}</p>
        <h1 tabIndex={-1} autoFocus className="mt-1 text-2xl font-extrabold focus:outline-none">
          {titulo}
        </h1>
        <p className="mt-0.5 text-xs text-muted-foreground">{descripcion}</p>
      </header>

      {/* ── Indicadores compactos ── */}
      <section aria-label="Resultado de los cinco desafíos">
        <div className="flex justify-center gap-2">
          {resumen.desafioIds.map((id, indice) => {
            const correcto = resumen.resultados[id]?.correcto ?? false;
            return (
              <span
                key={id}
                aria-label={`Desafío ${indice + 1}: ${correcto ? "correcto" : "incorrecto"}`}
                className={`grid h-10 w-10 place-items-center rounded-full border-2 ${
                  correcto
                    ? "border-primary/45 bg-primary/12 text-primary"
                    : "border-destructive/35 bg-destructive/8 text-destructive"
                }`}
              >
                <Icono nombre={correcto ? "acierto" : "error"} className="h-4 w-4" />
              </span>
            );
          })}
        </div>
        <p className="mt-1.5 text-center text-xs font-bold text-muted-foreground">
          {resumen.aciertos} de {resumen.desafioIds.length} desafíos resueltos
        </p>
      </section>

      {/* ── Bloque unificado: recompensas + nivel + desbloqueos ── */}
      <section aria-label="Progreso y recompensas" className="card-duo p-4">
        {/* Datos de recompensa inline */}
        <div className={`grid gap-2 ${ligaGanada > 0 ? "grid-cols-3" : "grid-cols-2"}`}>
          <Dato icono="xp" valor={`+${xpGanado}`} etiqueta="XP reales" tono="accent" />
          <Dato icono="moneda" valor={`+${monedasGanadas}`} etiqueta="monedas" tono="accent" />
          {ligaGanada > 0 && (
            <Dato icono="liga" valor={`+${ligaGanada}`} etiqueta="liga" tono="secondary" />
          )}
        </div>

        {/* Separador sutil */}
        <hr className="my-3 border-border" />

        {/* Nivel y barra */}
        <div className="flex items-start justify-between gap-3 text-xs">
          <span>
            <strong className="block text-sm text-foreground">Nivel {nivel.nombre}</strong>
            <span className="text-muted-foreground">{usuario.xp} XP acumulados</span>
          </span>
          <span className="max-w-32 text-right font-bold text-muted-foreground">
            {nivel.siguiente ? `${nivel.faltan} XP para ${nivel.siguiente.nombre}` : "Nivel máximo"}
          </span>
        </div>
        <div className="barra-duo mt-2" aria-label={`${nivel.porcentaje}% del nivel completado`}>
          <span className="barra-duo-fill" style={{ width: `${nivel.porcentaje}%` }} />
        </div>

        {/* Racha (condicional) */}
        {mostrarRacha && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-secondary/10 p-2.5 text-sm">
            <Icono nombre="racha" className="h-5 w-5 text-secondary" />
            <span>
              <strong>{usuario.racha.dias} días de racha</strong>
              {usuario.racha.dias > previo.rachaDias && " · sumaste el día de hoy"}
            </span>
          </div>
        )}

        {/* Desbloqueos como línea inline */}
        {hayDesbloqueos && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-accent/12 p-2.5 text-sm">
            <Icono nombre="desbloqueo" className="h-4 w-4 shrink-0 text-accent-foreground" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Desbloqueaste</strong>{" "}
              {partesDesbloqueo.join(" · ")}
            </span>
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
