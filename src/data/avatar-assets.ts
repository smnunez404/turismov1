import type { CategoriaPieza } from "@/data/tipos";

/** Contrato de producción. No importa assets inexistentes ni activa todavía el renderer 3D. */
export const VERSION_ASSETS_AVATAR = "v1" as const;

/** Primer set canónico generado para comunicar el acabado 3D objetivo. */
export const avatarCanonico = {
  retrato: "/avatars/canonico/explorador-neutral-retrato.png",
  cuerpo: "/avatars/canonico/explorador-neutral-cuerpo.png",
} as const;

export function assetCanonicoAvatar(encuadre: keyof typeof avatarCanonico) {
  return avatarCanonico[encuadre];
}

export const encuadresAvatar = ["retrato", "cuerpo"] as const;
export const posesAvatar = [
  "neutral-frente",
  "tres-cuartos",
  "camina-derecha",
  "camina-izquierda",
  "celebra",
  "pensando",
  "casi",
  "nivel",
] as const;
export const planosAvatar = ["back", "base", "front"] as const;

export type EncuadreAssetAvatar = (typeof encuadresAvatar)[number];
export type PoseAssetAvatar = (typeof posesAvatar)[number];
export type PlanoAssetAvatar = (typeof planosAvatar)[number];

export const variantesPielAvatar = [
  "piel-1",
  "piel-2",
  "piel-3",
  "piel-4",
  "piel-5",
  "piel-6",
] as const;
export const variantesPeloAvatar = [
  "pelo-1",
  "pelo-2",
  "pelo-3",
  "pelo-4",
  "pelo-5",
  "pelo-6",
] as const;

/** Planos mínimos por categoría; piezas específicas pueden omitir archivos completamente transparentes. */
export const planosPorCategoriaAvatar: Record<CategoriaPieza, readonly PlanoAssetAvatar[]> = {
  fondo: ["base"],
  cuerpo: ["base"],
  cara: ["front"],
  cabello: ["back", "front"],
  vello: ["front"],
  prenda: ["base"],
  sombrero: ["front"],
  accesorio: ["back", "front"],
  mochila: ["back", "front"],
};

export type SolicitudRutaAvatar = {
  encuadre: EncuadreAssetAvatar;
  pose: PoseAssetAvatar;
  categoria: CategoriaPieza;
  pieceId: string;
  variante?: string;
  plano: PlanoAssetAvatar;
  extension?: "webp" | "png";
};

/**
 * Ruta exacta esperada para una capa 3D prerenderizada.
 * Ejemplo:
 * src/assets/generated/avatar-personalizable/v1/cuerpo/neutral-frente/cabello/pelo-corto/pelo-corto--pelo-1--front.webp
 */
export function rutaEsperadaCapaAvatar({
  encuadre,
  pose,
  categoria,
  pieceId,
  variante = "base",
  plano,
  extension = "webp",
}: SolicitudRutaAvatar) {
  return `src/assets/generated/avatar-personalizable/${VERSION_ASSETS_AVATAR}/${encuadre}/${pose}/${categoria}/${pieceId}/${pieceId}--${variante}--${plano}.${extension}`;
}

export const contratoCanvasAvatar = {
  retrato: {
    master: { width: 2048, height: 2048 },
    web: { width: 1024, height: 1024 },
    pivot: { x: 1024, y: 1960 },
  },
  cuerpo: {
    master: { width: 2048, height: 2560 },
    web: { width: 1024, height: 1280 },
    pivot: { x: 1024, y: 2440 },
  },
} as const;
