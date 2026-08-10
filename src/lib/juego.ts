// Fase 2 — Lógica del modo Preguntados, retención, liga y cupones.
// Todo es simulado en memoria: no hay backend ni persistencia (docs/05-guardarrailes.md).
import { ACIERTOS_PARA_MEDALLA, categorias } from "@/data/categorias";
import { equipos } from "@/data/equipos";
import { participantesRanking } from "@/data/ranking";
import { preguntasDeCategoria } from "@/data/preguntas-rapidas";
import type { Cupon, Premio, PreguntaRapida, UsuarioSesion } from "@/data/tipos";

// ---------- Ruleta (SPEC-19) ----------
export const VIDAS_MAXIMAS = 5;
export const FALLOS_PERMITIDOS = 3;
export const PUNTOS_POR_ACIERTO = 10;

export function girarRuleta(semilla = Math.random()) {
  const indice = Math.floor(semilla * categorias.length) % categorias.length;
  return { indice, categoria: categorias[indice]! };
}

/** Preguntas de una categoría, barajadas y sin repetir dentro de la partida. */
export function tandaDeCategoria(categoriaId: string, cantidad = 1, usadas: string[] = []) {
  const disponibles = preguntasDeCategoria(categoriaId).filter((p) => !usadas.includes(p.id));
  const fuente = disponibles.length ? disponibles : preguntasDeCategoria(categoriaId);
  return barajar(fuente).slice(0, cantidad);
}

export function barajar<T>(lista: T[]): T[] {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j]!, copia[i]!];
  }
  return copia;
}

// ---------- Medallas por categoría (SPEC-21) ----------
export function medallaGanada(usuario: UsuarioSesion, categoriaId: string) {
  return (usuario.medallas[categoriaId] ?? 0) >= ACIERTOS_PARA_MEDALLA;
}

export function medallasDe(usuario: UsuarioSesion) {
  return categorias.map((c) => {
    const aciertos = usuario.medallas[c.id] ?? 0;
    return {
      categoria: c,
      aciertos,
      meta: ACIERTOS_PARA_MEDALLA,
      ganada: aciertos >= ACIERTOS_PARA_MEDALLA,
      porcentaje: Math.min(100, Math.round((aciertos / ACIERTOS_PARA_MEDALLA) * 100)),
    };
  });
}

// ---------- Racha diaria (SPEC-23) ----------
export const recompensasRacha = [
  { dia: 3, premio: "1 vida extra" },
  { dia: 7, premio: "Cupón sorpresa de un auspiciador" },
  { dia: 14, premio: "Doble puntos por un día" },
  { dia: 30, premio: "Insignia Embajador Constante" },
] as const;

export const proximaRecompensa = (dias: number) =>
  recompensasRacha.find((r) => r.dia > dias) ?? recompensasRacha[recompensasRacha.length - 1]!;

// ---------- Vidas (SPEC-25) ----------
export const puedeJugar = (usuario: UsuarioSesion) => usuario.vidas > 0;

// ---------- Liga semanal (SPEC-26) ----------
export const divisiones = [
  { id: "cuna", nombre: "División Cuñapé", minimo: 0 },
  { id: "tajibo", nombre: "División Tajibo", minimo: 150 },
  { id: "toborochi", nombre: "División Toborochi", minimo: 350 },
  { id: "jaguar", nombre: "División Jaguar", minimo: 600 },
] as const;

export function divisionDe(puntosLiga: number) {
  const indice = divisiones.reduce((acc, d, i) => (puntosLiga >= d.minimo ? i : acc), 0);
  const actual = divisiones[indice]!;
  const siguiente = divisiones[indice + 1] ?? null;
  return {
    actual,
    siguiente,
    faltan: siguiente ? siguiente.minimo - puntosLiga : 0,
  };
}

/** Tabla semanal simulada: mezcla participantes sintéticos con el jugador actual. */
export function tablaLiga(usuario: UsuarioSesion) {
  const otros = participantesRanking.slice(0, 9).map((p, i) => ({
    id: p.id,
    nombre: p.nombre,
    avatarId: p.avatarId,
    puntos: Math.max(20, Math.round(p.puntaje * 0.6) - i * 7),
    esUsuario: false,
  }));
  const yo = {
    id: "yo",
    nombre: usuario.nombre || "Vos",
    avatarId: usuario.avatarId ?? "toborochi",
    puntos: usuario.puntosLiga,
    esUsuario: true,
  };
  return [...otros, yo].sort((a, b) => b.puntos - a.puntos);
}

/** Marcador colectivo de equipos: base sintética + aporte del jugador. */
export function tablaEquipos(usuario: UsuarioSesion) {
  return equipos
    .map((e) => ({
      ...e,
      puntos: e.puntosBase + (usuario.equipoId === e.id ? usuario.puntosLiga : 0),
      esMio: usuario.equipoId === e.id,
    }))
    .sort((a, b) => b.puntos - a.puntos);
}

// ---------- Cupones (SPEC-30) ----------
export function emitirCupon(premio: Premio, nombre: string): Cupon {
  const iniciales = (nombre || "EB")
    .split(" ")
    .map((p) => p[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const azar = Math.random().toString(36).slice(2, 6).toUpperCase();
  return {
    id: `cp-${premio.id}-${azar}`,
    premioId: premio.id,
    codigo: `SEB-${iniciales || "EB"}-${azar}`,
    obtenido: new Date().toLocaleDateString("es-BO", { day: "2-digit", month: "short" }),
    usado: false,
  };
}

// ---------- Duelo (SPEC-28) ----------
export function respuestaRival(pregunta: PreguntaRapida, destreza: number) {
  const acierta = Math.random() < destreza;
  if (acierta) return pregunta.respuestaCorrectaId;
  const fallos = pregunta.opciones.filter((o) => o.id !== pregunta.respuestaCorrectaId);
  return barajar(fallos)[0]!.id;
}