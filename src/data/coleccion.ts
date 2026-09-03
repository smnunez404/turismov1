export type Coleccionable = {
  id: string;
  nombre: string;
  categoria: string;
  icono: string;
  descubrimiento: string;
  explicacion: string;
  temporadaId: string;
  requisito: string;
};

export const albumSantaCruz: Coleccionable[] = [
  {
    id: "album-anillos",
    nombre: "Ciudad de anillos",
    categoria: "Ciudad",
    icono: "ciudad",
    descubrimiento: "Una forma singular de ubicarse",
    explicacion: "Los anillos organizan buena parte del trazado y del lenguaje cotidiano.",
    temporadaId: "t1",
    requisito: "Encontrarlo en un desafío",
  },
  {
    id: "album-toborochi",
    nombre: "Toborochi",
    categoria: "Naturaleza",
    icono: "arbol",
    descubrimiento: "El árbol de tronco abultado",
    explicacion: "Es una imagen muy reconocible del paisaje oriental.",
    temporadaId: "t1",
    requisito: "Encontrarlo en un desafío",
  },
  {
    id: "album-majadito",
    nombre: "Majadito",
    categoria: "Gastronomía",
    icono: "gastronomia",
    descubrimiento: "Arroz con sabor de casa",
    explicacion: "Una preparación tradicional que puede llevar charque y plátano.",
    temporadaId: "t1",
    requisito: "Encontrarlo en un desafío",
  },
  {
    id: "album-plaza",
    nombre: "Plaza 24 de Septiembre",
    categoria: "Patrimonio",
    icono: "plaza",
    descubrimiento: "El corazón del centro histórico",
    explicacion: "Es un punto de encuentro y memoria urbana.",
    temporadaId: "t1",
    requisito: "Encontrarlo en un desafío",
  },
  {
    id: "album-hospitalidad",
    nombre: "Calidez camba",
    categoria: "Hospitalidad",
    icono: "anfitrion",
    descubrimiento: "Recibir también cuenta",
    explicacion: "Escuchar, orientar y cuidar hacen mejor la visita.",
    temporadaId: "t1",
    requisito: "Completar una partida",
  },
];

export type CosmeticoAvatar = {
  id: string;
  nombre: string;
  requisito: string;
  precioMonedas: number;
};

/** Cada cosmético puede ganarse por progreso o comprarse con monedas de la sesión. */
export const cosmeticosAvatar = [
  {
    id: "fondo-rayos",
    nombre: "Rayos de curiosidad",
    requisito: "Completar tu primera partida",
    precioMonedas: 30,
  },
  {
    id: "prenda-guayabera",
    nombre: "Guayabera exploradora",
    requisito: "Llegar a 60 XP",
    precioMonedas: 55,
  },
  {
    id: "pelo-trenzas",
    nombre: "Trenzas del reto diario",
    requisito: "Completar el reto diario",
    precioMonedas: 45,
  },
  {
    id: "sombrero-camba",
    nombre: "Sombrero versus",
    requisito: "Completar un versus",
    precioMonedas: 60,
  },
  {
    id: "acc-guitarra",
    nombre: "Guitarra coleccionista",
    requisito: "Completar el álbum",
    precioMonedas: 90,
  },
] as const satisfies readonly CosmeticoAvatar[];

export function obtenerCosmeticoAvatar(id: string) {
  return cosmeticosAvatar.find((item) => item.id === id);
}

export const INSIGNIA_PRIMERA_PARTIDA = "i-curiosidad";
export const ALBUM_RECOMPENSA_ID = "recompensa:album-santa-cruz";
