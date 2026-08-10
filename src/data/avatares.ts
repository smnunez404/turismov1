import type { Avatar } from "./tipos";

// Contenido SINTÉTICO de muestra — docs/08-contenido-muestra.md
export const avatares: Avatar[] = [
  {
    id: "toborochi",
    nombre: "Toborochi",
    simbolo: "🌳",
    descripcion: "Raíz cruceña, firme y generosa",
  },
  {
    id: "sao",
    nombre: "Sombrero de sao",
    simbolo: "👒",
    descripcion: "El sol del oriente no se le escapa",
  },
  {
    id: "tipoy",
    nombre: "Tipoy",
    simbolo: "🧵",
    descripcion: "Tradición que se lleva puesta",
  },
  {
    id: "canoto",
    nombre: "Guitarra de Cañoto",
    simbolo: "🎸",
    descripcion: "Cuenta la historia cantando",
  },
  {
    id: "tucan",
    nombre: "Tucán",
    simbolo: "🦜",
    descripcion: "Curioso, colorido y bien hablado",
  },
  {
    id: "jaguar",
    nombre: "Jaguar",
    simbolo: "🐆",
    descripcion: "Explorador silencioso de la chiquitania",
  },
];

export const obtenerAvatar = (id: string | null) =>
  avatares.find((avatar) => avatar.id === id) ?? null;