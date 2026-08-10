import { obtenerAvatar } from "@/data/avatares";

const tamanos = {
  sm: "h-10 w-10 text-xl",
  md: "h-16 w-16 text-3xl",
  lg: "h-24 w-24 text-5xl",
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
      role="img"
      aria-label={avatar ? `Avatar ${avatar.nombre}` : "Sin avatar"}
      className={`inline-flex items-center justify-center rounded-full bg-accent/25 ring-2 ring-accent ${tamanos[tamano]}`}
    >
      {avatar?.simbolo ?? "✨"}
    </span>
  );
}