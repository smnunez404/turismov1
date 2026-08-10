// SPEC-05 / SPEC-32 — Constructor de avatar cruceño (P-05)
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pantalla, PasoOnboarding } from "@/components/Pantalla";
import { AvatarLienzo } from "@/components/AvatarLienzo";
import { Icono } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import {
  avatarAlAzar,
  avatarPorDefecto,
  categoriasPieza,
  coloresPelo,
  piezasDe,
  regiones,
  tonosPiel,
} from "@/data/avatar-piezas";
import type { CategoriaPieza } from "@/data/tipos";

export const Route = createFileRoute("/avatar")({
  head: () => ({
    meta: [
      { title: "Armá tu avatar — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Construí tu embajador cruceño: tipoy, sombrero de sao, peinado y accesorios típicos de Santa Cruz.",
      },
      { property: "og:title", content: "Armá tu avatar cruceño" },
      {
        property: "og:description",
        content: "Elegí cara, cabello, prendas y sombreros del oriente boliviano.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ConstructorAvatar,
});

function ConstructorAvatar() {
  const { usuario, actualizar, actualizarAvatar } = useSesion();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState<CategoriaPieza>("cara");
  const [aviso, setAviso] = useState<string | null>(null);

  const avatar = usuario.avatar ?? avatarPorDefecto;
  const piezas = piezasDe(categoria);
  const esColor = categoria === "cabello" || categoria === "cuerpo";

  return (
    <Pantalla className="gap-5 pt-4">
      <PasoOnboarding actual={3} total={4} />

      <header>
        <h1 className="text-3xl font-bold text-foreground">Armá tu embajador</h1>
        <p className="mt-1 text-muted-foreground">
          Vestilo con lo nuestro: tipoy, sao y todo lo camba. Después podés cambiarlo cuando querás.
        </p>
      </header>

      <div className="flex flex-col items-center gap-3">
        <AvatarLienzo avatar={avatar} tamano="xl" className="shadow-md" />
        <button
          type="button"
          onClick={() => actualizarAvatar(avatarAlAzar())}
          className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-card px-4 py-2 text-sm font-bold text-foreground"
        >
          <Icono nombre="destello" className="h-4 w-4" />
          Sorprendeme
        </button>
      </div>

      <nav
        aria-label="Categorías de personalización"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1"
      >
        {categoriasPieza.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategoria(c.id)}
            aria-pressed={categoria === c.id}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${
              categoria === c.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {c.nombre}
          </button>
        ))}
      </nav>

      <div className="grid grid-cols-3 gap-2">
        {piezas.map((pieza) => {
          const seleccionada = avatar[pieza.categoria] === pieza.id;
          const region = regiones.find((r) => r.id === pieza.region);
          return (
            <button
              key={pieza.id}
              type="button"
              onClick={() => {
                if (pieza.bloqueada) {
                  setAviso(`${pieza.nombre}: se desbloquea con la ciudad de ${region?.nombre}.`);
                  return;
                }
                setAviso(null);
                actualizarAvatar({ [pieza.categoria]: pieza.id });
              }}
              aria-pressed={seleccionada}
              className={`relative flex flex-col items-center gap-1 rounded-2xl border-2 p-2 text-center transition-all ${
                seleccionada
                  ? "border-primary bg-accent/40 shadow-md"
                  : "border-border bg-card hover:border-accent"
              } ${pieza.bloqueada ? "opacity-50" : ""}`}
            >
              <AvatarLienzo
                avatar={{ ...avatar, [pieza.categoria]: pieza.bloqueada ? avatar[pieza.categoria] : pieza.id }}
                tamano="md"
              />
              <span className="text-[11px] leading-tight font-semibold text-foreground">
                {pieza.nombre}
              </span>
              {pieza.bloqueada && (
                <span className="absolute top-1 right-1 rounded-full bg-foreground/80 p-1">
                  <Icono nombre="bloqueado" className="h-3 w-3 text-background" />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {esColor && (
        <section className="flex flex-col gap-3">
          {categoria === "cuerpo" && (
            <div>
              <p className="mb-2 text-sm font-bold text-foreground">Tono de piel</p>
              <div className="flex flex-wrap gap-2">
                {tonosPiel.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-label={`Tono ${t.id}`}
                    aria-pressed={avatar.tonoPiel === t.valor}
                    onClick={() => actualizarAvatar({ tonoPiel: t.valor })}
                    style={{ backgroundColor: t.valor }}
                    className={`h-10 w-10 rounded-full border-2 ${
                      avatar.tonoPiel === t.valor ? "border-primary ring-2 ring-primary/40" : "border-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          {categoria === "cabello" && (
            <div>
              <p className="mb-2 text-sm font-bold text-foreground">Color de cabello</p>
              <div className="flex flex-wrap gap-2">
                {coloresPelo.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    aria-label={`Color ${c.id}`}
                    aria-pressed={avatar.colorPelo === c.valor}
                    onClick={() => actualizarAvatar({ colorPelo: c.valor })}
                    style={{ backgroundColor: c.valor }}
                    className={`h-10 w-10 rounded-full border-2 ${
                      avatar.colorPelo === c.valor ? "border-primary ring-2 ring-primary/40" : "border-border"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      <p aria-live="polite" className="min-h-10 text-center text-sm text-muted-foreground">
        {aviso ?? "Las piezas de otras ciudades se abren cuando llegue su temporada."}
      </p>

      <button
        type="button"
        onClick={() => {
          if (!usuario.avatar) actualizar({ avatar: avatarPorDefecto });
          navigate({ to: "/bienvenida" });
        }}
        className="btn-duo btn-duo-primary"
      >
        Este soy yo
      </button>
    </Pantalla>
  );
}
