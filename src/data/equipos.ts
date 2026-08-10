import type { Equipo, Rival } from "./tipos";

// SPEC-27 — Equipos por zona de Santa Cruz (datos SINTÉTICOS).
export const equipos: Equipo[] = [
  { id: "e-centro", nombre: "Centro Histórico", zona: "1er anillo", icono: "plaza", puntosBase: 4820, integrantes: 312 },
  { id: "e-equipetrol", nombre: "Equipetrol", zona: "3er anillo", icono: "ciudad", puntosBase: 4610, integrantes: 288 },
  { id: "e-plan3000", nombre: "Plan 3000", zona: "Distrito 8", icono: "amigos", puntosBase: 5140, integrantes: 401 },
  { id: "e-villa", nombre: "Villa 1ro de Mayo", zona: "Distrito 6", icono: "bandera", puntosBase: 4390, integrantes: 265 },
  { id: "e-urubo", nombre: "Urubó", zona: "Zona norte del Piraí", icono: "naturaleza", puntosBase: 3980, integrantes: 197 },
  { id: "e-pampa", nombre: "Pampa de la Isla", zona: "Distrito 7", icono: "hoja", puntosBase: 4275, integrantes: 243 },
];

export const obtenerEquipo = (id: string | null) =>
  id ? (equipos.find((e) => e.id === id) ?? null) : null;

// SPEC-28 — Rivales simulados para el duelo 1v1.
export const rivales: Rival[] = [
  { id: "rv1", nombre: "Joaquín Suárez", avatarId: "canoto", destreza: 0.55, frase: "Dale pues, a ver quién sabe más de su tierra." },
  { id: "rv2", nombre: "Valeria Justiniano", avatarId: "tucan", destreza: 0.7, frase: "Aviso: soy fanática de la Chiquitania." },
  { id: "rv3", nombre: "Diego Peña", avatarId: "jaguar", destreza: 0.45, frase: "Juego tranquilo, pero no me dejo ganar." },
  { id: "rv4", nombre: "Mariana Roca", avatarId: "sao", destreza: 0.62, frase: "Gastronomía es lo mío, cuidate." },
];