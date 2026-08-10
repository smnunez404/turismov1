import type { Avatar } from "./tipos";
import toborochiImg from "@/assets/avatares/toborochi.png";
import saoImg from "@/assets/avatares/sao.png";
import tipoyImg from "@/assets/avatares/tipoy.png";
import canotoImg from "@/assets/avatares/canoto.png";
import tucanImg from "@/assets/avatares/tucan.png";
import jaguarImg from "@/assets/avatares/jaguar.png";

// Contenido SINTÉTICO de muestra — docs/08-contenido-muestra.md
export const avatares: Avatar[] = [
  {
    id: "toborochi",
    nombre: "Toborochi",
    imagen: toborochiImg,
    descripcion: "Raíz cruceña, firme y generosa",
  },
  {
    id: "sao",
    nombre: "Sombrero de sao",
    imagen: saoImg,
    descripcion: "El sol del oriente no se le escapa",
  },
  {
    id: "tipoy",
    nombre: "Tipoy",
    imagen: tipoyImg,
    descripcion: "Tradición que se lleva puesta",
  },
  {
    id: "canoto",
    nombre: "Guitarra de Cañoto",
    imagen: canotoImg,
    descripcion: "Cuenta la historia cantando",
  },
  {
    id: "tucan",
    nombre: "Tucán",
    imagen: tucanImg,
    descripcion: "Curioso, colorido y bien hablado",
  },
  {
    id: "jaguar",
    nombre: "Jaguar",
    imagen: jaguarImg,
    descripcion: "Explorador silencioso de la chiquitania",
  },
];

export const obtenerAvatar = (id: string | null) =>
  avatares.find((avatar) => avatar.id === id) ?? null;