// SPEC-08 — Mapa de temporadas y Camino de Temporada Cruceña (P-08)
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { temporadas } from "@/data/temporadas";
import { ilustracionTemporada, ilustracionAlbum } from "@/data/ilustraciones";
import { avanceTemporada, estadoDeMision, misionesDeTemporada } from "@/lib/progreso";
import { albumSantaCruz } from "@/data/coleccion";
import { ModalTarjetasTareas } from "@/components/ModalTarjetasTareas";

export const Route = createFileRoute("/temporadas")({
  head: () => ({
    meta: [
      { title: "Camino de Temporada — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Descubre Santa Cruz: progresa en el camino de temporada, completa misiones y desbloquea cofres chiquitanos.",
      },
      { property: "og:title", content: "Camino de Temporada — Soy Embajador Bolivia" },
      {
        property: "og:description",
        content: "Camino de recompensas cruceñas: misiones, cofres y tareas de temporada.",
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

// Hitos de recompensa en el Camino de Temporada (estilo Clash Pass)
const HITOS_CAMINO = [
  { puntos: 10, recompensa: "Cofre Chiquitano", tipo: "cofre", icono: "regalo" },
  { puntos: 25, recompensa: "50 Monedas", tipo: "monedas", icono: "cupon" },
  { puntos: 45, recompensa: "Estampa Catedral", tipo: "estampa", icono: "iglesia" },
  { puntos: 70, recompensa: "Cofre Chiquitano Mágico", tipo: "cofre", icono: "regalo" },
  { puntos: 100, recompensa: "Sombrero de Saó (Avatar)", tipo: "avatar", icono: "corona" },
] as const;

function MapaTemporadas() {
  const { usuario, actualizar } = useSesion();
  const activa = temporadas.find((t) => t.estado === "activa")!;
  const avance = avanceTemporada(activa.id, usuario);
  const listaMisiones = misionesDeTemporada(activa.id);

  const [modalTareasAbierto, setModalTareasAbierto] = useState(false);
  const [puntosCaminoExtra, setPuntosCaminoExtra] = useState(0);
  const [recompensasReclamadas, setRecompensasReclamadas] = useState<number[]>([]);

  // Puntos totales del camino (basados en misiones completadas + tareas realizadas)
  const puntosCamino = Math.min(100, avance.completadas * 20 + puntosCaminoExtra);

  // Estampas obtenidas
  const estampasObtenidas = usuario.album.length;
  const totalEstampas = albumSantaCruz.length;

  const reclamarHito = (pts: number) => {
    if (recompensasReclamadas.includes(pts) || puntosCamino < pts) return;
    setRecompensasReclamadas((prev) => [...prev, pts]);
    actualizar({ monedas: usuario.monedas + 30 });
  };

  return (
    <Pantalla conNav className="gap-4 sm:gap-5">
      {/* ── Header Principal ── */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
            Modo Historia
          </p>
          <h1 className="truncate text-2xl font-extrabold text-foreground">
            Camino de Temporada
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

      {/* ── Hero / Panel Destacado de Temporada Cruceña (Alineado a tokens Selva Vibrante) ── */}
      <section className="card-duo card-duo-activa relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/10 via-card to-accent/15 p-4 shadow-sm">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <img
              src="/camino/camino_banner.jpg"
              alt="Mascota Tucán Embajador de Santa Cruz"
              width={160}
              height={90}
              className="h-16 w-28 sm:h-20 sm:w-36 rounded-2xl object-cover shadow-xs border-2 border-primary/30 shrink-0"
            />
            <div>
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-black text-primary uppercase tracking-wider">
                <Icono nombre="corona" className="h-3 w-3" /> Temporada 1 · Santa Cruz
              </span>
              <h2 className="mt-1 text-lg sm:text-xl font-extrabold text-foreground leading-tight">
                Aventura Cruceña
              </h2>
              <p className="text-xs text-muted-foreground line-clamp-1">
                Avanzá por el camino cumpliendo misiones y tareas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setModalTareasAbierto(true)}
            className="btn-duo btn-duo-accent !w-auto flex items-center justify-center gap-2 !py-2 !px-4 shadow-xs shrink-0 cursor-pointer self-stretch sm:self-auto text-xs font-black uppercase"
          >
            <Icono nombre="pergamino" className="h-4 w-4 shrink-0" />
            <span>Tarjetas de Tareas</span>
          </button>
        </div>

        {/* Barra de progreso de camino */}
        <div className="relative z-10 mt-4 rounded-2xl bg-muted/60 p-3 border border-border">
          <div className="flex justify-between items-center text-xs font-bold text-muted-foreground">
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <Icono nombre="destello" className="h-3.5 w-3.5 text-accent-foreground" />
              <span>Progreso en el Camino</span>
            </span>
            <span className="font-extrabold text-primary">
              {puntosCamino} / 100 Puntos
            </span>
          </div>
          <div className="barra-duo mt-1.5 h-3">
            <span
              className="barra-duo-fill"
              style={{ width: `${puntosCamino}%` }}
            />
          </div>
        </div>
      </section>

      {/* ── Pista Horizontal de Hitos de Temporada (Estilo Camino / Battle Pass) ── */}
      <section className="card-duo p-4 overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[11px] font-black tracking-widest text-primary uppercase">
              Pase del Embajador Cruceño
            </p>
            <h3 className="text-base font-extrabold text-foreground">
              Camino de Misiones y Recompensas
            </h3>
          </div>
          <span className="text-[11px] font-bold text-muted-foreground hidden sm:inline">
            Deslizá para explorar el camino →
          </span>
        </div>

        {/* Pista scrollable horizontal */}
        <div className="no-scrollbar -mx-4 flex gap-4 overflow-x-auto px-4 py-2 snap-x snap-mandatory">
          {listaMisiones.map((mision, index) => {
            const hito = HITOS_CAMINO[index] ?? {
              puntos: (index + 1) * 20,
              recompensa: "Cofre",
              tipo: "cofre",
              icono: "regalo",
            };
            const estado = estadoDeMision(mision, usuario);
            const desbloqueado = puntosCamino >= hito.puntos;
            const reclamado = recompensasReclamadas.includes(hito.puntos);

            return (
              <div
                key={mision.id}
                className="flex flex-col items-center w-48 sm:w-56 shrink-0 snap-start rounded-2xl border-2 border-border bg-card p-3 shadow-xs hover:border-primary/40 transition-all"
              >
                {/* Indicador de Puntos del Hito */}
                <div className="flex items-center gap-1.5 rounded-full bg-muted/80 px-2.5 py-1 text-[11px] font-black text-foreground">
                  <Icono nombre="destello" className="h-3 w-3 text-amber-500" />
                  <span>{hito.puntos} pts requeridos</span>
                </div>

                {/* Tarjeta de Misión Superior */}
                <div className="mt-2.5 w-full rounded-xl border border-border/70 bg-muted/20 p-2.5 text-center">
                  <span className="inline-block text-[10px] font-extrabold text-primary uppercase tracking-wider">
                    Misión {mision.orden}
                  </span>
                  <p className="truncate text-xs font-bold text-foreground">
                    {mision.nombre}
                  </p>
                  <Link
                    to="/mision/$misionId"
                    params={{ misionId: mision.id }}
                    className={`btn-duo mt-2 !py-1 !px-2.5 !text-[11px] flex items-center justify-center gap-1 ${
                      estado === "completada"
                        ? "btn-duo-ghost"
                        : "btn-duo-primary"
                    }`}
                  >
                    <Icono
                      nombre={estado === "completada" ? "check" : "jugar"}
                      className="h-3.5 w-3.5"
                    />
                    <span>{estado === "completada" ? "Repetir" : "Jugar"}</span>
                  </Link>
                </div>

                {/* Conector vertical del camino */}
                <div className="my-1.5 h-4 w-1 bg-border rounded-full" />

                {/* Cofre o Recompensa Inferior */}
                <div
                  className={`w-full rounded-xl border-2 p-2.5 flex flex-col items-center text-center transition-all ${
                    reclamado
                      ? "border-emerald-600/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300"
                      : desbloqueado
                        ? "border-amber-400 bg-amber-500/10 shadow-sm ring-1 ring-amber-400/50"
                        : "border-border/60 bg-muted/40 opacity-75"
                  }`}
                >
                  <img
                    src="/camino/cofre_chiquitano.jpg"
                    alt="Cofre Chiquitano"
                    width={56}
                    height={56}
                    className={`h-12 w-12 object-contain drop-shadow-xs transition-transform ${
                      desbloqueado && !reclamado ? "animate-bounce" : ""
                    }`}
                  />
                  <span className="mt-1 text-[11px] font-extrabold text-foreground truncate max-w-full">
                    {hito.recompensa}
                  </span>

                  {reclamado ? (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                      <Icono nombre="check" className="h-3 w-3" /> Reclamado
                    </span>
                  ) : desbloqueado ? (
                    <button
                      type="button"
                      onClick={() => reclamarHito(hito.puntos)}
                      className="btn-duo btn-duo-accent !py-1 !px-2 !text-[10px] mt-1.5 w-full animate-pulse"
                    >
                      Abrir Cofre
                    </button>
                  ) : (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-muted-foreground">
                      <Icono nombre="bloqueado" className="h-3 w-3" /> Bloqueado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal de Tarjetas de Tareas */}
      <ModalTarjetasTareas
        abierto={modalTareasAbierto}
        alCerrar={() => setModalTareasAbierto(false)}
        onSumarPuntos={(pts) => setPuntosCaminoExtra((prev) => prev + pts)}
      />

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

      {/* ── Banner de Certificación y Reconocimiento ── */}
      <section className="card-duo flex flex-col gap-3 border-accent/40 bg-accent/5 p-4 text-center">
        <div className="flex flex-col items-center gap-1.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-accent/20 text-accent">
            <Icono nombre="certificado" className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-extrabold text-foreground">
            Título Oficial: Embajador de Santa Cruz
          </h4>
          <p className="text-xs text-muted-foreground max-w-xs">
            Completá las misiones o ingresá a la vista para emitir tu certificado digital o compartir tu progreso con tus amigos.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to="/certificado"
            className="btn-duo btn-duo-accent flex-1 text-xs py-2.5"
          >
            Ver certificado
          </Link>
          <Link
            to="/compartir"
            className="flex-1 rounded-xl border border-primary/40 bg-primary/10 py-2.5 text-center text-xs font-bold text-primary hover:bg-primary/20 transition-colors"
          >
            Compartir logros
          </Link>
        </div>
      </section>
    </Pantalla>
  );
}
