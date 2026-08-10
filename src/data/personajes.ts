// SPEC-19/20 — Personajes y colores por categoría (estilo ruleta Preguntados).
// Contenido SINTÉTICO: mascotas ilustradas propias del prototipo cruceño.
import historia from "@/assets/personajes/historia.png";
import naturaleza from "@/assets/personajes/naturaleza.png";
import gastronomia from "@/assets/personajes/gastronomia.png";
import tradicion from "@/assets/personajes/tradicion.png";
import personajesImg from "@/assets/personajes/personajes.png";
import hoy from "@/assets/personajes/hoy.png";

export type Personaje = {
  nombre: string;
  imagen: string;
  /** Color del gajo de la ruleta y de la cabecera de pregunta. */
  color: string;
};

export const personajes: Record<string, Personaje> = {
  historia: { nombre: "Cronista", imagen: historia, color: "#7C3AED" },
  naturaleza: { nombre: "Amborín", imagen: naturaleza, color: "#1FA94E" },
  gastronomia: { nombre: "Cuñapé", imagen: gastronomia, color: "#F2B008" },
  tradicion: { nombre: "Comparsera", imagen: tradicion, color: "#E2427D" },
  personajes: { nombre: "Taquirari", imagen: personajesImg, color: "#DE3B2C" },
  hoy: { nombre: "Urbanito", imagen: hoy, color: "#2C7FF7" },
};

export const personajeDe = (categoriaId: string) =>
  personajes[categoriaId] ?? personajes["historia"]!;
