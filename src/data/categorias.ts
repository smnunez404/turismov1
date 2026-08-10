import type { Categoria } from "./tipos";

// SPEC-19 — Categorías de la ruleta "Preguntados cruceño".
// Contenido SINTÉTICO. `auspiciadorId` demuestra el formato "categoría patrocinada".
export const categorias: Categoria[] = [
  {
    id: "historia",
    nombre: "Historia",
    descripcion: "Fundación, traslados y memoria del oriente.",
    icono: "pergamino",
    tono: "secondary",
  },
  {
    id: "naturaleza",
    nombre: "Naturaleza",
    descripcion: "Parques, ríos, fauna y flora cruceña.",
    icono: "naturaleza",
    tono: "primary",
  },
  {
    id: "gastronomia",
    nombre: "Gastronomía",
    descripcion: "Sabores, mercados y sobremesas.",
    icono: "gastronomia",
    tono: "accent",
    auspiciadorId: "a-sabor",
  },
  {
    id: "tradicion",
    nombre: "Tradición y fiesta",
    descripcion: "Carnaval, música y costumbres.",
    icono: "tambor",
    tono: "secondary",
  },
  {
    id: "personajes",
    nombre: "Personajes",
    descripcion: "Gente que marcó a Santa Cruz.",
    icono: "amigos",
    tono: "primary",
  },
  {
    id: "hoy",
    nombre: "Santa Cruz hoy",
    descripcion: "La ciudad actual: barrios, ferias y vida urbana.",
    icono: "ciudad",
    tono: "accent",
    auspiciadorId: "a-mall",
  },
];

export const obtenerCategoria = (id: string) => categorias.find((c) => c.id === id) ?? null;

/** Aciertos necesarios en una categoría para ganar su medalla (SPEC-19). */
export const ACIERTOS_PARA_MEDALLA = 5;
