import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AvatarLienzo } from "@/components/AvatarLienzo";
import { BotonVolver } from "@/components/BotonVolver";
import { Icono } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { avatarAlAzar, normalizarAvatar } from "@/data/avatar-piezas";

export const Route = createFileRoute("/setup")({
  head: () => ({ meta: [{ title: "Creá tu explorador — Soy Embajador Bolivia" }] }),
  component: SetupInvitado,
});

function SetupInvitado() {
  const { usuario, configurarInvitado } = useSesion();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState(usuario.nombre);
  const [avatar, setAvatar] = useState(() => normalizarAvatar(usuario.avatar));
  const nombreValido = nombre.trim().length >= 2;

  function guardarBorrador() {
    configurarInvitado(nombre.trim() || "Curioso", avatar);
  }

  return (
    <Pantalla className="gap-4 pb-2 pt-2">
      <BotonVolver fallback="/" etiqueta="Inicio" preferirHistorial={false} />

      <header className="flex flex-col gap-2">
        <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold tracking-widest text-primary uppercase">
          Paso 1 de 2 · Tu identidad
        </span>
        <h1 className="text-balance text-2xl font-extrabold text-foreground">
          Tu próxima aventura empieza acá
        </h1>
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Elegí cómo te llamamos. Ya preparamos un explorador para vos; lo podés cambiar después.
        </p>
      </header>

      <section
        className="card-duo card-duo-activa relative overflow-hidden p-4"
        aria-labelledby="preview-title"
      >
        <div className="absolute inset-x-0 top-0 h-24 bg-primary/10" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-3">
          <div className="flex w-full items-center justify-between gap-3">
            <p id="preview-title" className="font-extrabold">
              Tu explorador
            </p>
            <span className="rounded-full bg-card px-3 py-1 text-[11px] font-extrabold text-primary shadow-sm">
              LISTO PARA SALIR
            </span>
          </div>
          <div className="relative flex h-56 w-full justify-center overflow-hidden rounded-[1.75rem] bg-muted/40 shadow-lg ring-1 ring-border">
            <AvatarLienzo
              avatar={avatar}
              encuadre="cuerpo"
              tamano="lg"
              className="h-full w-56 rounded-[1.5rem] shadow-none ring-0"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() =>
                setAvatar({
                  ...avatarAlAzar(usuario.inventarioAvatar, avatar.presentacion),
                  tonoPiel: avatar.tonoPiel,
                })
              }
              className="btn-duo btn-duo-ghost"
            >
              <Icono nombre="destello" className="h-4 w-4" />
              Otra pinta
            </button>
            <button
              type="button"
              onClick={() => {
                guardarBorrador();
                navigate({ to: "/avatar", search: { origen: "setup" } });
              }}
              className="btn-duo btn-duo-secondary"
            >
              <Icono nombre="perfil" className="h-4 w-4" />
              Personalizar
            </button>
          </div>
        </div>
      </section>

      <label className="flex flex-col gap-2 text-sm font-extrabold text-foreground">
        ¿Cómo querés que te llamemos?
        <input
          value={nombre}
          onChange={(event) => setNombre(event.target.value)}
          maxLength={24}
          placeholder="Por ejemplo, Cami"
          autoFocus
          aria-invalid={nombre.length > 0 && !nombreValido}
          className="min-h-12 rounded-2xl border-2 border-input bg-card px-4 text-base font-semibold outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
      </label>

      <button
        type="button"
        disabled={!nombreValido}
        className="btn-duo btn-duo-primary disabled:opacity-50"
        onClick={() => {
          guardarBorrador();
          navigate({ to: "/partida" });
        }}
      >
        Jugar mi primera partida
      </button>
    </Pantalla>
  );
}
