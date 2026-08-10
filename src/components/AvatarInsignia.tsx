import { obtenerAvatar } from "@/data/avatares";
import { Icono } from "@/components/Icono";
import { AvatarLienzo } from "@/components/AvatarLienzo";
import type { AvatarPersonalizado } from "@/data/tipos";

const tamanos = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
} as const;

export function AvatarInsignia({
  avatarId,
  avatar,
  tamano = "md",
}: {
  avatarId?: string | null;
  avatar?: AvatarPersonalizado | null;
  tamano?: keyof typeof tamanos;
}) {
  if (avatar) return <AvatarLienzo avatar={avatar} tamano={tamano} />;

  const preset = obtenerAvatar(avatarId ?? null);
  return (
    <span
      aria-label={preset ? `Avatar ${preset.nombre}` : "Sin avatar"}
      role="img"
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-card p-1 ring-1 ring-border shadow-sm ${tamanos[tamano]}`}
    >
      {preset ? (
        <img
          src={preset.imagen}
          alt=""
          loading="lazy"
          width={512}
          height={512}
          className="h-full w-full object-contain"
        />
      ) : (
        <Icono nombre="destello" className="h-1/2 w-1/2 text-muted-foreground" />
      )}
    </span>
  );
}
