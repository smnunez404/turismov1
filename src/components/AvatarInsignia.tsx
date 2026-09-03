import { AvatarLienzo } from "@/components/AvatarLienzo";
import { avatarPorDefecto, avatarSintetico } from "@/data/avatar-piezas";
import type { AvatarPersonalizado } from "@/data/tipos";

export function AvatarInsignia({
  avatarId,
  avatar,
  semilla,
  tamano = "md",
}: {
  avatarId?: string | null;
  avatar?: AvatarPersonalizado | null;
  semilla?: string | null;
  tamano?: "sm" | "md" | "lg";
}) {
  const claveSintetica = semilla ?? avatarId;
  const avatarEfectivo =
    avatar ?? (claveSintetica ? avatarSintetico(claveSintetica) : avatarPorDefecto);

  return <AvatarLienzo avatar={avatarEfectivo} tamano={tamano} encuadre="retrato" />;
}
