import { obtenerAvatar } from "@/data/avatares";
import { Icono } from "@/components/Icono";

const tamanos = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
} as const;

export function AvatarInsignia({
  avatarId,
  tamano = "md",
}: {
  avatarId: string | null;
  tamano?: keyof typeof tamanos;
}) {
  const avatar = obtenerAvatar(avatarId);
  return (
    <span
      aria-label={avatar ? `Avatar ${avatar.nombre}` : "Sin avatar"}
      role="img"
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-card p-1 ring-1 ring-border shadow-sm ${tamanos[tamano]}`}
    >
      {avatar ? (
        <img
          src={avatar.imagen}
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
