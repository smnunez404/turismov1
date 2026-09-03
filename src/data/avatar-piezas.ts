// Catálogo SINTÉTICO de piezas del constructor de avatar (SPEC-32).
// Las piezas se dibujan por capas en <AvatarLienzo />; no son imágenes.
import type { AvatarPersonalizado, CategoriaPieza, PiezaAvatar, RegionAvatar } from "./tipos";
import { cosmeticosAvatar } from "./coleccion";

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
  { id: "mochila", nombre: "Mochila" },
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

  // Cabello: cada silueta fue producida para una base concreta.
  sc("pelo-ninguno", "cabello", "Sin cabello", { compatibilidad: "unisex" }),
  sc("pelo-corto", "cabello", "Corto", { compatibilidad: "masculina" }),
  sc("pelo-degradado", "cabello", "Degradado tropical", { compatibilidad: "masculina" }),
  sc("pelo-ondulado-corto", "cabello", "Ondulado oriental", { compatibilidad: "masculina" }),
  sc("pelo-rizado-corto", "cabello", "Rizo natural", { compatibilidad: "masculina" }),
  sc("pelo-ondulado", "cabello", "Ondulado", { compatibilidad: "femenina" }),
  sc("pelo-largo", "cabello", "Largo", { compatibilidad: "femenina" }),
  sc("pelo-recogido", "cabello", "Recogido", { compatibilidad: "femenina" }),
  sc("pelo-rizado", "cabello", "Rizado", { compatibilidad: "femenina" }),
  sc("pelo-trenzas", "cabello", "Trenzas", { compatibilidad: "femenina" }),

  // Vello facial: los estilos producidos actualmente fueron ajustados al rostro masculino.
  sc("vello-ninguno", "vello", "Sin vello", { compatibilidad: "unisex" }),
  sc("vello-bigote", "vello", "Bigote clásico", { compatibilidad: "masculina" }),
  sc("vello-candado", "vello", "Candado joven", { compatibilidad: "masculina" }),
  sc("vello-barba", "vello", "Barba corta", { compatibilidad: "masculina" }),

  // Prenda: no se comparten siluetas entre cuerpos; cada asset corresponde a su presentación.
  sc("prenda-tipoy", "prenda", "Tipoy contemporáneo", { compatibilidad: "femenina" }),
  sc("prenda-lino", "prenda", "Camisa de lino", { compatibilidad: "masculina" }),
  sc("prenda-bordada", "prenda", "Blusa bordada", { compatibilidad: "femenina" }),
  sc("prenda-polera", "prenda", "Polera camba", { compatibilidad: "masculina" }),
  sc("prenda-guayabera", "prenda", "Guayabera", { compatibilidad: "masculina" }),
  sc("prenda-chaqueta-femenina", "prenda", "Chaleco explorador", { compatibilidad: "femenina" }),
  sc("prenda-blusa-campo", "prenda", "Blusa de campo", { compatibilidad: "femenina" }),
  sc("prenda-chaqueta-campo", "prenda", "Chaqueta de campo", { compatibilidad: "masculina" }),
  sc("prenda-camiseta-ruta", "prenda", "Camiseta de ruta", { compatibilidad: "masculina" }),
  { ...bloq("prenda-aguayo", "prenda", "Aguayo paceño", "la-paz"), compatibilidad: "unisex" },
  {
    ...bloq("prenda-pollera", "prenda", "Pollera valluna", "cochabamba"),
    compatibilidad: "femenina",
  },
  {
    ...bloq("prenda-camijeta", "prenda", "Camijeta beniana", "beni"),
    compatibilidad: "unisex",
  },
  {
    ...bloq("prenda-chacarera", "prenda", "Camisa chapaca", "tarija"),
    compatibilidad: "masculina",
  },

  // Sombreros producidos sobre un anclaje común de cabeza.
  sc("sombrero-ninguno", "sombrero", "Sin sombrero", { compatibilidad: "unisex" }),
  sc("sombrero-sao", "sombrero", "Sombrero de sao", { compatibilidad: "unisex" }),
  sc("sombrero-camba", "sombrero", "Sombrero camba", { compatibilidad: "masculina" }),
  sc("sombrero-panuelo", "sombrero", "Pañuelo al cuello", { compatibilidad: "femenina" }),
  sc("sombrero-gorra", "sombrero", "Gorra urbana", { compatibilidad: "unisex" }),
  sc("sombrero-safari", "sombrero", "Safari", { compatibilidad: "unisex" }),
  sc("sombrero-tejido", "sombrero", "Tejido de sao", { compatibilidad: "unisex" }),
  sc("sombrero-bucket", "sombrero", "Gorro aventura", { compatibilidad: "unisex" }),
  bloq("sombrero-chulo", "sombrero", "Chulo paceño", "la-paz"),
  bloq("sombrero-montera", "sombrero", "Montera potosina", "potosi"),
  bloq("sombrero-paja-beni", "sombrero", "Sombrero beniano", "beni"),

  // Accesorios: cada asset corresponde a la silueta para la que fue producido.
  sc("acc-ninguno", "accesorio", "Sin accesorio", { compatibilidad: "unisex" }),
  sc("acc-semillas", "accesorio", "Collar de semillas", { compatibilidad: "masculina" }),
  sc("acc-lentes", "accesorio", "Lentes de sol", { compatibilidad: "masculina" }),
  sc("acc-aretes", "accesorio", "Aretes dorados", { compatibilidad: "femenina" }),
  sc("acc-guitarra", "accesorio", "Guitarra de Cañoto", { compatibilidad: "masculina" }),
  sc("acc-brujula", "accesorio", "Brújula", { compatibilidad: "masculina" }),
  sc("acc-panuelo-verde", "accesorio", "Pañuelo explorador", { compatibilidad: "masculina" }),
  sc("acc-camara", "accesorio", "Cámara de ruta", { compatibilidad: "masculina" }),
  bloq("acc-panuelo-tarija", "accesorio", "Pañuelo tarijeño", "tarija"),

  // Mochila de exploración (capa posterior + correas frontales)
  sc("mochila-ninguna", "mochila", "Sin mochila"),
  sc("mochila-coral", "mochila", "Mochila coral"),
  sc("mochila-verde", "mochila", "Mochila bosque"),
  sc("mochila-mostaza", "mochila", "Mochila aventura"),

  // Fondo
  sc("fondo-liso", "fondo", "Liso"),
  sc("fondo-sol", "fondo", "Sol del oriente"),
  sc("fondo-selva", "fondo", "Selva"),
  sc("fondo-rayos", "fondo", "Rayos"),
];

const piezasConVisual = new Set([
  "cuerpo-medio",
  "cara-alegre",
  "pelo-ninguno",
  "pelo-corto",
  "pelo-ondulado",
  "pelo-largo",
  "pelo-recogido",
  "pelo-rizado",
  "pelo-trenzas",
  "pelo-degradado",
  "pelo-ondulado-corto",
  "pelo-rizado-corto",
  "vello-ninguno",
  "vello-bigote",
  "vello-candado",
  "vello-barba",
  "prenda-tipoy",
  "prenda-lino",
  "prenda-bordada",
  "prenda-polera",
  "prenda-guayabera",
  "prenda-chaqueta-femenina",
  "prenda-blusa-campo",
  "prenda-chaqueta-campo",
  "prenda-camiseta-ruta",
  "sombrero-ninguno",
  "sombrero-sao",
  "sombrero-camba",
  "sombrero-gorra",
  "sombrero-safari",
  "sombrero-tejido",
  "sombrero-bucket",
  "acc-ninguno",
  "acc-lentes",
  "acc-aretes",
  "acc-brujula",
  "acc-panuelo-verde",
  "acc-camara",
  "mochila-ninguna",
  "mochila-coral",
  "mochila-verde",
  "mochila-mostaza",
  "fondo-liso",
  "fondo-sol",
  "fondo-selva",
  "fondo-rayos",
]);

export const piezaTieneVisual = (pieza: PiezaAvatar) => piezasConVisual.has(pieza.id);

export const piezasDe = (categoria: CategoriaPieza) =>
  piezasAvatar.filter((p) => p.categoria === categoria);

export const piezaCompatible = (
  pieza: PiezaAvatar,
  presentacion: AvatarPersonalizado["presentacion"],
) =>
  !pieza.compatibilidad ||
  pieza.compatibilidad === "unisex" ||
  pieza.compatibilidad === presentacion;

export const piezasCompatiblesDe = (
  categoria: CategoriaPieza,
  presentacion: AvatarPersonalizado["presentacion"],
) =>
  piezasDe(categoria).filter(
    (pieza) => piezaTieneVisual(pieza) && piezaCompatible(pieza, presentacion),
  );

export const avatarPorDefecto: AvatarPersonalizado = {
  presentacion: "masculina",
  cuerpo: "cuerpo-medio",
  cara: "cara-alegre",
  cabello: "pelo-ninguno",
  vello: "vello-ninguno",
  prenda: "prenda-lino",
  sombrero: "sombrero-ninguno",
  accesorio: "acc-ninguno",
  mochila: "mochila-ninguna",
  fondo: "fondo-liso",
  tonoPiel: tonosPiel[2]!.valor,
  colorPelo: coloresPelo[0]!.valor,
};

const idsPorCategoria = new Map(
  categoriasPieza.map(({ id }) => [id, new Set(piezasDe(id).map((pieza) => pieza.id))]),
);

/** Repara configuraciones antiguas o incompletas sin descartar elecciones válidas. */
export function normalizarAvatar(
  avatar?: Partial<AvatarPersonalizado> | null,
): AvatarPersonalizado {
  const siguiente = { ...avatarPorDefecto, ...avatar };
  if (siguiente.presentacion !== "masculina" && siguiente.presentacion !== "femenina") {
    siguiente.presentacion = avatarPorDefecto.presentacion;
  }
  for (const { id } of categoriasPieza) {
    const actual = piezasAvatar.find((pieza) => pieza.id === siguiente[id]);
    const opciones = piezasCompatiblesDe(id, siguiente.presentacion);
    if (
      !idsPorCategoria.get(id)?.has(siguiente[id]) ||
      !actual ||
      !piezaTieneVisual(actual) ||
      !piezaCompatible(actual, siguiente.presentacion)
    ) {
      siguiente[id] = opciones[0]?.id ?? avatarPorDefecto[id];
    }
  }
  if (!tonosPiel.some((tono) => tono.valor === siguiente.tonoPiel)) {
    siguiente.tonoPiel = avatarPorDefecto.tonoPiel;
  }
  if (!coloresPelo.some((color) => color.valor === siguiente.colorPelo)) {
    siguiente.colorPelo = avatarPorDefecto.colorPelo;
  }
  return siguiente;
}

const alAzar = <T>(lista: T[]): T => lista[Math.floor(Math.random() * lista.length)] as T;

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
  const presentacion = base % 2 === 0 ? "femenina" : "masculina";
  const elegir = <T>(lista: T[], paso: number): T =>
    lista[hash(`${semilla}-${paso}`) % lista.length] as T;
  const libres = (c: CategoriaPieza) =>
    piezasCompatiblesDe(c, presentacion).filter((p) => !p.bloqueada);
  return {
    presentacion,
    cuerpo: elegir(libres("cuerpo"), 1).id,
    cara: elegir(libres("cara"), 2).id,
    cabello: elegir(
      libres("cabello").filter((p) => p.id !== "pelo-ninguno"),
      3,
    ).id,
    vello: base % 3 === 0 ? elegir(libres("vello"), 4).id : "vello-ninguno",
    prenda: elegir(libres("prenda"), 5).id,
    sombrero: elegir(libres("sombrero"), 6).id,
    accesorio: elegir(libres("accesorio"), 7).id,
    mochila: elegir(libres("mochila"), 8).id,
    fondo: elegir(libres("fondo"), 9).id,
    tonoPiel: elegir(tonosPiel, 9).valor,
    colorPelo: elegir(coloresPelo, 10).valor,
  };
}

/** Combinación aleatoria usando solo piezas gratuitas o ya obtenidas. */
export function avatarAlAzar(
  inventario: string[] = [],
  presentacion: AvatarPersonalizado["presentacion"] = "masculina",
): AvatarPersonalizado {
  const idsCosmeticos = new Set<string>(cosmeticosAvatar.map((item) => item.id));
  const disponible = (categoria: CategoriaPieza) =>
    piezasCompatiblesDe(categoria, presentacion).filter(
      (pieza) =>
        !pieza.bloqueada && (!idsCosmeticos.has(pieza.id) || inventario.includes(pieza.id)),
    );
  const libre = (categoria: CategoriaPieza) => {
    const opciones = disponible(categoria);
    const fallback = piezasCompatiblesDe(categoria, presentacion).find(
      (pieza) => !pieza.bloqueada && !idsCosmeticos.has(pieza.id),
    );
    return (opciones.length > 0 ? alAzar(opciones) : fallback)?.id ?? avatarPorDefecto[categoria];
  };
  return {
    presentacion,
    cuerpo: libre("cuerpo"),
    cara: libre("cara"),
    cabello: libre("cabello"),
    vello: libre("vello"),
    prenda: libre("prenda"),
    sombrero: libre("sombrero"),
    accesorio: libre("accesorio"),
    mochila: libre("mochila"),
    fondo: libre("fondo"),
    tonoPiel: alAzar(tonosPiel).valor,
    colorPelo: alAzar(coloresPelo).valor,
  };
}
