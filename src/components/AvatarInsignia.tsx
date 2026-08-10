import { Icono } from "@/components/Icono";
import { AvatarLienzo } from "@/components/AvatarLienzo";
import { avatarSintetico } from "@/data/avatar-piezas";
import type { AvatarPersonalizado } from "@/data/tipos";

const tamanos = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
} as const;

export function AvatarInsignia({
  avatarId,
  avatar,
  semilla,
  tamano = "md",
}: {
  avatarId?: string | null;
  avatar?: AvatarPersonalizado | null;
  semilla?: string | null;
  tamano?: keyof typeof tamanos;
}) {
  if (avatar) return <AvatarLienzo avatar={avatar} tamano={tamano} />;

  // Participantes sintéticos: se dibujan con el mismo sistema por capas (SPEC-32),
  // derivado de una semilla estable, en vez de los PNG antiguos.
  const clave = semilla ?? avatarId ?? null;
  if (clave) return <AvatarLienzo avatar={avatarSintetico(clave)} tamano={tamano} />;

  return (
    <span
      aria-label="Sin avatar"
      role="img"
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-card p-1 ring-1 ring-border shadow-sm ${tamanos[tamano]}`}
    >
      <Icono nombre="destello" className="h-1/2 w-1/2 text-muted-foreground" />
    </span>
  );
}
