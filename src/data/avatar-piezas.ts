// Catálogo SINTÉTICO de piezas del constructor de avatar (SPEC-32).
// Las piezas se dibujan por capas en <AvatarLienzo />; no son imágenes.
import type { AvatarPersonalizado, CategoriaPieza, PiezaAvatar, RegionAvatar } from "./tipos";

export const regiones: { id: RegionAvatar; nombre: string; bloqueada: boolean; nota: string }[] = [
  { id: "santa-cruz", nombre: "Santa Cruz", bloqueada: false, nota: "Temporada activa" },
  { id: "la-paz", nombre: "La Paz", bloqueada: true, nota: "Chulo y aguayo: próxima ciudad" },
  { id: "cochabamba", nombre: "Cochabamba", bloqueada: true, nota: "Sombrero blanco y pollera" },
  { id: "potosi", nombre: "Potosí", bloqueada: true, nota: "Montera y tejido de altura" },
  { id: "beni", nombre: "Beni", bloqueada: true, nota: "Camijeta y sombrero de paja" },
  { id: "tarija", nombre: "Tarija", bloqueada: true, nota: "Chacarera y pañuelo tarijeño" },
];

export const categoriasPieza: { id: CategoriaPieza; nombre: string }[] = [
  { id: "cuerpo", nombre: "Cuerpo" },
  { id: "cara", nombre: "Cara" },
  { id: "cabello", nombre: "Cabello" },
  { id: "vello", nombre: "Vello" },
  { id: "prenda", nombre: "Prenda" },
  { id: "sombrero", nombre: "Sombrero" },
  { id: "accesorio", nombre: "Accesorio" },
  { id: "fondo", nombre: "Fondo" },
];

export const tonosPiel = [
  { id: "piel-1", valor: "#F7D9BE" },
  { id: "piel-2", valor: "#EFC29A" },
  { id: "piel-3", valor: "#DDA671" },
  { id: "piel-4", valor: "#C4854F" },
  { id: "piel-5", valor: "#9A6438" },
  { id: "piel-6", valor: "#6F4426" },
];

export const coloresPelo = [
  { id: "pelo-1", valor: "#1E1913" },
  { id: "pelo-2", valor: "#3D2A1B" },
  { id: "pelo-3", valor: "#6B4325" },
  { id: "pelo-4", valor: "#A9713C" },
  { id: "pelo-5", valor: "#D9A441" },
  { id: "pelo-6", valor: "#8C8C8C" },
];

const sc = (
  id: string,
  categoria: CategoriaPieza,
  nombre: string,
  extra?: Partial<PiezaAvatar>,
): PiezaAvatar => ({
  id,
  categoria,
  nombre,
  region: "santa-cruz",
  bloqueada: false,
  ...extra,
});

const bloq = (
  id: string,
  categoria: CategoriaPieza,
  nombre: string,
  region: RegionAvatar,
): PiezaAvatar => ({ id, categoria, nombre, region, bloqueada: true });

export const piezasAvatar: PiezaAvatar[] = [
  // Cuerpo
  sc("cuerpo-delgado", "cuerpo", "Delgado"),
  sc("cuerpo-medio", "cuerpo", "Medio"),
  sc("cuerpo-ancho", "cuerpo", "Ancho"),

  // Cara (gesto)
  sc("cara-alegre", "cara", "Alegre"),
  sc("cara-serena", "cara", "Serena"),
  sc("cara-picara", "cara", "Pícara"),
  sc("cara-sorprendida", "cara", "Sorprendida"),
  sc("cara-decidida", "cara", "Decidida"),

  // Cabello
  sc("pelo-ninguno", "cabello", "Sin cabello"),
  sc("pelo-corto", "cabello", "Corto"),
  sc("pelo-ondulado", "cabello", "Ondulado"),
  sc("pelo-largo", "cabello", "Largo"),
  sc("pelo-recogido", "cabello", "Recogido"),
  sc("pelo-rizado", "cabello", "Rizado"),
  sc("pelo-trenzas", "cabello", "Trenzas"),

  // Vello facial
  sc("vello-ninguno", "vello", "Sin vello"),
  sc("vello-bigote", "vello", "Bigote"),
  sc("vello-candado", "vello", "Candado"),
  sc("vello-barba", "vello", "Barba"),

  // Prenda (identidad cruceña)
  sc("prenda-tipoy", "prenda", "Tipoy"),
  sc("prenda-lino", "prenda", "Camisa de lino"),
  sc("prenda-bordada", "prenda", "Blusa bordada"),
  sc("prenda-polera", "prenda", "Polera camba"),
  sc("prenda-guayabera", "prenda", "Guayabera"),
  bloq("prenda-aguayo", "prenda", "Aguayo paceño", "la-paz"),
  bloq("prenda-pollera", "prenda", "Pollera valluna", "cochabamba"),

  // Sombrero
  sc("sombrero-ninguno", "sombrero", "Sin sombrero"),
  sc("sombrero-sao", "sombrero", "Sombrero de sao"),
  sc("sombrero-camba", "sombrero", "Sombrero camba"),
  sc("sombrero-panuelo", "sombrero", "Pañuelo al cuello"),
  sc("sombrero-gorra", "sombrero", "Gorra urbana"),
  bloq("sombrero-chulo", "sombrero", "Chulo paceño", "la-paz"),
  bloq("sombrero-montera", "sombrero", "Montera potosina", "potosi"),

  // Accesorio
  sc("acc-ninguno", "accesorio", "Sin accesorio"),
  sc("acc-semillas", "accesorio", "Collar de semillas"),
  sc("acc-lentes", "accesorio", "Lentes de sol"),
  sc("acc-aretes", "accesorio", "Aretes"),
  sc("acc-guitarra", "accesorio", "Guitarra de Cañoto"),

  // Fondo
  sc("fondo-liso", "fondo", "Liso"),
  sc("fondo-sol", "fondo", "Sol del oriente"),
  sc("fondo-selva", "fondo", "Selva"),
  sc("fondo-rayos", "fondo", "Rayos"),
];

export const piezasDe = (categoria: CategoriaPieza) =>
  piezasAvatar.filter((p) => p.categoria === categoria);

export const avatarPorDefecto: AvatarPersonalizado = {
  cuerpo: "cuerpo-medio",
  cara: "cara-alegre",
  cabello: "pelo-corto",
  vello: "vello-ninguno",
  prenda: "prenda-tipoy",
  sombrero: "sombrero-sao",
  accesorio: "acc-semillas",
  fondo: "fondo-sol",
  tonoPiel: tonosPiel[2]!.valor,
  colorPelo: coloresPelo[0]!.valor,
};

const alAzar = <T,>(lista: T[]): T => lista[Math.floor(Math.random() * lista.length)] as T;

/** Hash estable (no criptográfico) para derivar avatares reproducibles de un texto. */
function hash(texto: string): number {
  let h = 2166136261;
  for (let i = 0; i < texto.length; i++) {
    h ^= texto.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

/**
 * Avatar por capas determinista a partir de una semilla (nombre o id).
 * Se usa para los participantes sintéticos de ranking, liga y duelo,
 * de modo que nadie vea los PNG antiguos.
 */
export function avatarSintetico(semilla: string): AvatarPersonalizado {
  const base = hash(semilla);
  const elegir = <T,>(lista: T[], paso: number): T =>
    lista[hash(`${semilla}-${paso}`) % lista.length] as T;
  const libres = (c: CategoriaPieza) => piezasDe(c).filter((p) => !p.bloqueada);
  return {
    cuerpo: elegir(libres("cuerpo"), 1).id,
    cara: elegir(libres("cara"), 2).id,
    cabello: elegir(libres("cabello").filter((p) => p.id !== "pelo-ninguno"), 3).id,
    vello: base % 3 === 0 ? elegir(libres("vello"), 4).id : "vello-ninguno",
    prenda: elegir(libres("prenda"), 5).id,
    sombrero: elegir(libres("sombrero"), 6).id,
    accesorio: elegir(libres("accesorio"), 7).id,
    fondo: elegir(libres("fondo"), 8).id,
    tonoPiel: elegir(tonosPiel, 9).valor,
    colorPelo: elegir(coloresPelo, 10).valor,
  };
}

/** Combinación aleatoria usando solo piezas desbloqueadas. */
export function avatarAlAzar(): AvatarPersonalizado {
  const libre = (c: CategoriaPieza) => alAzar(piezasDe(c).filter((p) => !p.bloqueada)).id;
  return {
    cuerpo: libre("cuerpo"),
    cara: libre("cara"),
    cabello: libre("cabello"),
    vello: libre("vello"),
    prenda: libre("prenda"),
    sombrero: libre("sombrero"),
    accesorio: libre("accesorio"),
    fondo: libre("fondo"),
    tonoPiel: alAzar(tonosPiel).valor,
    colorPelo: alAzar(coloresPelo).valor,
  };
}
