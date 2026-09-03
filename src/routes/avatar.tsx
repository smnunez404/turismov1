import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AvatarLienzo, AvatarPiezaMiniatura } from "@/components/AvatarLienzo";
import { Icono } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import {
  avatarAlAzar,
  categoriasPieza,
  coloresPelo,
  normalizarAvatar,
  piezasCompatiblesDe,
  regiones,
  tonosPiel,
} from "@/data/avatar-piezas";
import { cosmeticosAvatar } from "@/data/coleccion";
import type { CategoriaPieza } from "@/data/tipos";

function VistaPieza({
  avatar,
  categoria,
  piezaId,
}: {
  avatar: ReturnType<typeof normalizarAvatar>;
  categoria: CategoriaPieza;
  piezaId: string;
}) {
  return (
    <span className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-muted/60">
      <AvatarPiezaMiniatura avatar={avatar} categoria={categoria} piezaId={piezaId} />
    </span>
  );
}

export const Route = createFileRoute("/avatar")({
  validateSearch: (search: Record<string, unknown>) => ({
    origen:
      search["origen"] === "onboarding"
        ? ("onboarding" as const)
        : search["origen"] === "setup"
          ? ("setup" as const)
          : undefined,
  }),
  head: () => ({ meta: [{ title: "Diseñá tu explorador — Soy Embajador Bolivia" }] }),
  component: ConstructorAvatar,
});

function ConstructorAvatar() {
  const { usuario, actualizarAvatar, comprarCosmeticoAvatar } = useSesion();
  const { origen } = Route.useSearch();
  const navigate = useNavigate();
  const tonoPielDisponible = tonosPiel[2]!.valor;
  const inicial = useMemo(
    () =>
      normalizarAvatar({
        ...usuario.avatar,
        presentacion: "masculina",
        tonoPiel: tonoPielDisponible,
      }),
    [usuario.avatar, tonoPielDisponible],
  );
  const [avatar, setAvatar] = useState(inicial);
  const [categoria, setCategoria] = useState<CategoriaPieza>("cabello");
  const [mensaje, setMensaje] = useState("Elegí una pieza para verla en tu explorador.");
  const destinoSalida =
    origen === "setup" ? "/setup" : origen === "onboarding" ? "/perfil-nuevo" : "/perfil";
  const destinoGuardado = origen === "onboarding" ? "/bienvenida" : destinoSalida;
  const hayCambios = JSON.stringify(avatar) !== JSON.stringify(inicial);
  const piezasCategoria = piezasCompatiblesDe(categoria, avatar.presentacion);
  const piezaActiva = piezasCategoria.find((pieza) => pieza.id === avatar[categoria]);

  return (
    <Pantalla className="gap-3.5 pb-28 pt-2">
      {/* ── Barra Superior ── */}
      <header className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate({ to: destinoSalida })}
          className="inline-flex min-h-10 items-center gap-1.5 rounded-full px-2 text-xs font-extrabold text-muted-foreground hover:text-foreground transition-colors"
        >
          <span aria-hidden="true">←</span> Salir
        </button>
        <span className="rounded-full bg-accent/25 px-2.5 py-1 text-xs font-extrabold text-accent-foreground">
          {usuario.monedas} monedas
        </span>
      </header>

      {/* ── Visor del Avatar en Vivo Compacto ── */}
      <section className="relative overflow-hidden rounded-3xl bg-muted/60 p-3 ring-1 ring-border shadow-xs">
        <div className="flex items-center justify-between">
          <p className="chapter-label">Taller del explorador</p>
          {hayCambios && (
            <span className="rounded-full bg-card px-2 py-0.5 text-[10px] font-extrabold text-primary shadow-xs">
              Sin guardar
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center justify-center gap-4">
          <div className="flex h-44 w-36 items-end justify-center overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border">
            <AvatarLienzo
              avatar={avatar}
              encuadre="cuerpo"
              tamano="lg"
              className="h-44 w-36 rounded-2xl ring-0"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <p className="text-xs font-extrabold text-foreground leading-tight">
                {piezaActiva?.nombre ?? "Personalizado"}
              </p>
              <p className="text-[11px] text-muted-foreground">Vista en vivo</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAvatar({
                  ...avatarAlAzar(usuario.inventarioAvatar, avatar.presentacion),
                  tonoPiel: tonoPielDisponible,
                });
                setMensaje("¡Nueva combinación! Podés seguir ajustándola.");
              }}
              className="btn-duo btn-duo-ghost text-xs py-2 px-3 flex items-center gap-1.5"
            >
              <Icono nombre="destello" className="h-3.5 w-3.5 text-accent" />
              Sorprendeme
            </button>
          </div>
        </div>
      </section>

      {/* ── Carrusel de Categorías sin scrollbar tosca ── */}
      <nav
        aria-label="Categorías del avatar"
        className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 pb-1"
      >
        {categoriasPieza.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={categoria === item.id}
            onClick={() => {
              setCategoria(item.id);
              setMensaje(`Elegí tu opción de ${item.nombre.toLocaleLowerCase()}.`);
            }}
            className={`min-h-9 shrink-0 rounded-full px-3.5 text-xs font-extrabold transition-all ${
              categoria === item.id
                ? "bg-primary text-primary-foreground shadow-xs scale-100"
                : "bg-card text-muted-foreground ring-1 ring-border hover:bg-muted/50"
            }`}
          >
            {item.nombre}
          </button>
        ))}
      </nav>

      {/* ── Selector de Color Integrado (si aplica) ── */}
      {(categoria === "cuerpo" || categoria === "cabello") && (
        <section className="card-duo p-2.5">
          <p className="mb-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
            {categoria === "cuerpo" ? "Tono de piel" : "Color de cabello"}
          </p>
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {(categoria === "cuerpo" ? tonosPiel : coloresPelo).map((color) => {
              const clave = categoria === "cuerpo" ? "tonoPiel" : "colorPelo";
              const bloqueado = categoria === "cuerpo" && color.valor !== tonoPielDisponible;
              const activo = avatar[clave] === color.valor;
              return (
                <button
                  key={color.id}
                  type="button"
                  disabled={bloqueado}
                  aria-label={bloqueado ? `${color.id}, por desbloquear` : color.id}
                  aria-pressed={activo}
                  onClick={() => setAvatar((actual) => ({ ...actual, [clave]: color.valor }))}
                  style={{ backgroundColor: color.valor }}
                  className={`relative flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-transform ${
                    activo
                      ? "border-primary ring-2 ring-primary/40 scale-110"
                      : "border-border/60 hover:scale-105"
                  } ${bloqueado ? "cursor-not-allowed opacity-40 grayscale" : ""}`}
                >
                  {bloqueado && (
                    <span
                      className="rounded-full bg-foreground/90 p-0.5 text-background"
                      aria-hidden="true"
                    >
                      <Icono nombre="bloqueado" className="size-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Catálogo de Piezas Compacto ── */}
      <section aria-labelledby="opciones-title" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2
            id="opciones-title"
            className="text-xs font-extrabold text-foreground uppercase tracking-wider"
          >
            Opciones ({piezasCategoria.length})
          </h2>
          <span className="text-[11px] text-muted-foreground">{mensaje}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {piezasCategoria.map((pieza) => {
            const cosmetico = cosmeticosAvatar.find((item) => item.id === pieza.id);
            const bloqueada =
              pieza.bloqueada || Boolean(cosmetico && !usuario.inventarioAvatar.includes(pieza.id));
            const seleccionada = avatar[categoria] === pieza.id;
            const region = regiones.find((item) => item.id === pieza.region);
            return (
              <button
                key={pieza.id}
                type="button"
                aria-pressed={seleccionada}
                onClick={() => {
                  if (bloqueada) {
                    if (
                      cosmetico &&
                      usuario.monedas >= cosmetico.precioMonedas &&
                      comprarCosmeticoAvatar(cosmetico.id)
                    ) {
                      setAvatar((actual) => ({ ...actual, [categoria]: pieza.id }));
                      setMensaje(`${pieza.nombre} desbloqueado.`);
                    } else {
                      setMensaje(
                        cosmetico
                          ? `Cuesta ${cosmetico.precioMonedas} monedas.`
                          : `De ${region?.nombre}.`,
                      );
                    }
                    return;
                  }
                  setAvatar((actual) => ({ ...actual, [categoria]: pieza.id }));
                  setMensaje(`${pieza.nombre} seleccionado.`);
                }}
                className={`relative flex min-h-24 flex-col items-center justify-between gap-1 rounded-2xl border-2 p-1.5 text-center transition-all ${
                  seleccionada
                    ? "border-primary bg-primary/10 shadow-xs scale-[0.98]"
                    : "border-border bg-card hover:border-primary/50"
                } ${bloqueada ? "opacity-60" : ""}`}
              >
                <VistaPieza avatar={avatar} categoria={categoria} piezaId={pieza.id} />
                <span className="text-[10px] leading-tight font-extrabold truncate max-w-full">
                  {pieza.nombre}
                </span>
                {bloqueada && (
                  <span
                    className="absolute right-1 top-1 rounded-full bg-foreground/90 p-0.5 text-background"
                    aria-label="Bloqueado"
                  >
                    <Icono nombre="bloqueado" className="h-2.5 w-2.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── Barra Flotante Fija Inferior (Sticky Action Bar) ── */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex justify-center border-t-2 border-border bg-background/95 p-3 backdrop-blur shadow-xl">
        <div className="flex w-full max-w-md gap-2.5">
          <button
            type="button"
            disabled={!hayCambios}
            onClick={() => setAvatar(inicial)}
            className="btn-duo btn-duo-ghost flex-1 text-xs py-2.5 disabled:opacity-40"
          >
            Deshacer
          </button>
          <button
            type="button"
            onClick={() => {
              actualizarAvatar(avatar);
              navigate({ to: destinoGuardado });
            }}
            className="btn-duo btn-duo-primary flex-[2] text-xs py-2.5 uppercase font-black tracking-wide"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </Pantalla>
  );
}
