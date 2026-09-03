// SPEC-08 — Mapa de temporadas (P-08)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { temporadas } from "@/data/temporadas";
import { ilustracionAlbum, ilustracionMision, ilustracionTemporada } from "@/data/ilustraciones";
import { avanceTemporada, estadoDeMision, misionesDeTemporada } from "@/lib/progreso";
import { albumSantaCruz } from "@/data/coleccion";

export const Route = createFileRoute("/temporadas")({
  head: () => ({
    meta: [
      { title: "Mapa de temporadas — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Descubre Santa Cruz es la temporada activa: cinco misiones para conocer, sentir y contar tu ciudad.",
      },
      { property: "og:title", content: "Mapa de temporadas — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Cinco temporadas, una activa: empezá por Descubre Santa Cruz.",
      },
    ],
  }),
  component: MapaTemporadas,
});

const etiquetaEstado = {
  completada: "Completada",
  disponible: "Disponible",
  bloqueada: "Bloqueada",
} as const;

function MapaTemporadas() {
  const { usuario } = useSesion();
  const activa = temporadas.find((t) => t.estado === "activa")!;
  const avance = avanceTemporada(activa.id, usuario);
  const lista = misionesDeTemporada(activa.id);
  const [mostrarTodasMisiones, setMostrarTodasMisiones] = useState(false);

  // Misión activa o siguiente a jugar
  const misionActiva = lista.find((m) => estadoDeMision(m, usuario) === "disponible") ?? lista[0]!;
  const estadoActiva = estadoDeMision(misionActiva, usuario);
  const otrasMisiones = lista.filter((m) => m.id !== misionActiva.id);

  // Estampas obtenidas y conteo
  const estampasObtenidas = usuario.album.length;
  const totalEstampas = albumSantaCruz.length;

  return (
    <Pantalla conNav className="gap-5">
      {/* ── Header ── */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
            Descubrir
          </p>
          <h1 className="truncate text-2xl font-extrabold text-foreground">
            Hola, {usuario.nombre || "Embajador"}
          </h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full border-2 border-b-4 border-accent/60 bg-accent/25 px-3 py-1 text-sm font-extrabold text-accent-foreground">
            {usuario.xp} XP
          </span>
          <Link to="/perfil" aria-label="Ir a mi perfil">
            <AvatarInsignia avatarId={usuario.avatarId} avatar={usuario.avatar} tamano="sm" />
          </Link>
        </div>
      </header>

      {/* ── Capítulo 1: En curso (Misión activa destacada + lista compacta colapsable) ── */}
      <section className="game-panel overflow-hidden">
        <img
          src={ilustracionTemporada[activa.id]}
          alt={`Ilustración de la temporada ${activa.nombre}`}
          width={1024}
          height={576}
          className="h-28 w-full object-cover"
        />
        <div className="p-4">
          <div className="flex items-start gap-3">
            <IconoPastilla nombre={activa.icono} tono="primary" />
            <div className="min-w-0 flex-1">
              <p className="chapter-label">Capítulo {activa.orden} · En curso</p>
              <h2 className="truncate text-lg font-bold text-foreground">{activa.nombre}</h2>
              <p className="line-clamp-1 text-xs text-muted-foreground">{activa.descripcion}</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progreso del capítulo</span>
              <span className="font-bold text-foreground">
                {avance.completadas} de {avance.total} misiones
              </span>
            </div>
            <div className="barra-duo mt-1 h-2">
              <span className="barra-duo-fill" style={{ width: `${avance.porcentaje}%` }} />
            </div>
          </div>

          {/* Tarjeta de Misión Activa destacada */}
          <div className="mt-4">
            <p className="mb-2 text-[11px] font-bold tracking-widest text-primary uppercase">
              {estadoActiva === "completada" ? "Repetir misión" : "Tu siguiente misión"}
            </p>
            <Link
              to="/mision/$misionId"
              params={{ misionId: misionActiva.id }}
              className="flex items-center gap-3 rounded-2xl border-2 border-b-4 border-primary/50 bg-primary/8 p-3 transition-colors hover:border-primary active:translate-y-[2px]"
            >
              <span className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                <img
                  src={ilustracionMision[misionActiva.id]}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={576}
                  className="h-full w-full object-cover"
                />
                <span className="absolute right-1 bottom-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-extrabold text-primary-foreground shadow-sm">
                  {estadoActiva === "completada" ? (
                    <Icono nombre="check" className="h-3 w-3" />
                  ) : (
                    misionActiva.orden
                  )}
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-base font-extrabold text-foreground">
                  {misionActiva.nombre}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {etiquetaEstado[estadoActiva]} · hasta {misionActiva.puntajeMaximo} XP
                </span>
              </span>
              <span className="shrink-0 rounded-xl bg-primary px-3 py-1.5 text-xs font-extrabold text-primary-foreground uppercase shadow-sm">
                Jugar
              </span>
            </Link>
          </div>

          {/* Botón de acordeón para ver las otras 4 misiones sin ocupar pantalla */}
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setMostrarTodasMisiones(!mostrarTodasMisiones)}
              className="flex w-full items-center justify-between rounded-xl px-2 py-1.5 text-xs font-bold text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
            >
              <span>
                {mostrarTodasMisiones
                  ? "Ocultar otras misiones"
                  : `Ver las otras ${otrasMisiones.length} misiones del capítulo`}
              </span>
              <Icono
                nombre={mostrarTodasMisiones ? "arriba" : "abajo"}
                className="h-4 w-4 text-muted-foreground"
              />
            </button>

            {mostrarTodasMisiones && (
              <ul className="mt-2 flex flex-col gap-2 pt-1">
                {otrasMisiones.map((mision) => {
                  const estado = estadoDeMision(mision, usuario);
                  const bloqueada = estado === "bloqueada";

                  const contenido = (
                    <>
                      <span className="relative h-11 w-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={ilustracionMision[mision.id]}
                          alt=""
                          loading="lazy"
                          width={1024}
                          height={576}
                          className={`h-full w-full object-cover ${bloqueada ? "grayscale" : ""}`}
                        />
                        <span
                          className={`absolute right-0.5 bottom-0.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-extrabold ${
                            estado === "completada"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {estado === "completada" ? (
                            <Icono nombre="check" className="h-2.5 w-2.5" />
                          ) : (
                            <Icono nombre="bloqueado" className="h-2.5 w-2.5" />
                          )}
                        </span>
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-foreground">
                          {mision.nombre}
                        </span>
                        <span className="block text-[11px] text-muted-foreground">
                          {etiquetaEstado[estado]} · hasta {mision.puntajeMaximo} XP
                        </span>
                      </span>
                    </>
                  );

                  return (
                    <li key={mision.id}>
                      {bloqueada ? (
                        <div
                          aria-disabled="true"
                          className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 p-2 opacity-70"
                        >
                          {contenido}
                        </div>
                      ) : (
                        <Link
                          to="/mision/$misionId"
                          params={{ misionId: mision.id }}
                          className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2 transition-colors hover:border-primary"
                        >
                          {contenido}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* ── Próximas temporadas (Carrusel horizontal tipo referencia) ── */}
      <section>
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Próximas temporadas
          </h2>
          <span className="text-[11px] font-bold text-muted-foreground">
            Deslizá para ver más →
          </span>
        </div>
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 pt-1 snap-x snap-mandatory">
          {temporadas
            .filter((t) => t.estado === "bloqueada")
            .map((t) => (
              <div
                key={t.id}
                className="w-44 shrink-0 snap-start overflow-hidden card-duo flex flex-col justify-between"
              >
                <div>
                  <img
                    src={ilustracionTemporada[t.id]}
                    alt={`Ilustración de la temporada ${t.nombre}`}
                    loading="lazy"
                    width={1024}
                    height={576}
                    className="h-20 w-full object-cover opacity-60 grayscale"
                  />
                  <div className="p-3">
                    <IconoPastilla nombre={t.icono} tono="muted" className="h-7 w-7" />
                    <p className="mt-1 text-sm font-bold text-foreground leading-snug">
                      {t.nombre}
                    </p>
                    <p className="line-clamp-2 mt-0.5 text-[11px] text-muted-foreground">
                      {t.descripcion}
                    </p>
                  </div>
                </div>
                <div className="p-3 pt-0">
                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    <Icono nombre="bloqueado" className="h-3 w-3" /> Próximamente
                  </span>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ── Álbum Santa Cruz (Vitrina de 5 descubrimientos compacta y horizontal) ── */}
      <section className="card-duo p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-primary uppercase">
              Álbum Santa Cruz
            </p>
            <h2 className="text-base font-extrabold text-foreground">5 descubrimientos</h2>
          </div>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-extrabold text-primary">
            {estampasObtenidas} de {totalEstampas}
          </span>
        </div>

        {/* Fila de 5 figuritas / estampas */}
        <div className="grid grid-cols-5 gap-2">
          {albumSantaCruz.map((item) => {
            const obtenido = usuario.album.includes(item.id);
            return (
              <div
                key={item.id}
                title={obtenido ? item.nombre : "Estampa oculta"}
                className={`group relative flex flex-col items-center rounded-xl border-2 p-1.5 transition-all ${
                  obtenido
                    ? "border-primary/40 bg-primary/5"
                    : "border-border bg-muted/30 opacity-70"
                }`}
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  <img
                    src={ilustracionAlbum[item.id]}
                    alt={obtenido ? `Estampa ${item.nombre}` : ""}
                    loading="lazy"
                    width={640}
                    height={640}
                    className={`h-full w-full object-cover ${obtenido ? "" : "scale-110 blur-sm grayscale"}`}
                  />
                  {!obtenido && (
                    <span className="absolute inset-0 flex items-center justify-center bg-foreground/25">
                      <Icono nombre="bloqueado" className="h-4 w-4 text-background" />
                    </span>
                  )}
                </div>
                <span className="mt-1 truncate max-w-full text-[10px] font-bold text-foreground">
                  {obtenido ? item.nombre : "Oculta"}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-3 text-center text-[11px] text-muted-foreground">
          Completar la colección otorga 40 XP, 25 monedas y la Guitarra coleccionista.
        </p>
      </section>
    </Pantalla>
  );
}
