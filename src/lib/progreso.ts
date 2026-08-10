// Derivación del estado de misiones a partir del progreso en memoria (SPEC-09).
import { misiones } from "@/data/misiones";
import type { Mision, UsuarioSesion } from "@/data/tipos";

export type EstadoMision = "bloqueada" | "disponible" | "completada";

export const misionesDeTemporada = (temporadaId: string) =>
  misiones
    .filter((m) => m.temporadaId === temporadaId)
    .sort((a, b) => a.orden - b.orden);

export function estadoDeMision(mision: Mision, usuario: UsuarioSesion): EstadoMision {
  if (usuario.progreso[mision.id]?.completada) return "completada";
  if (mision.orden === 1) return "disponible";
  const anterior = misionesDeTemporada(mision.temporadaId).find(
    (m) => m.orden === mision.orden - 1,
  );
  if (anterior && usuario.progreso[anterior.id]?.completada) return "disponible";
  return "bloqueada";
}

export function avanceTemporada(temporadaId: string, usuario: UsuarioSesion) {
  const lista = misionesDeTemporada(temporadaId);
  const completadas = lista.filter((m) => usuario.progreso[m.id]?.completada).length;
  return { completadas, total: lista.length, porcentaje: Math.round((completadas / lista.length) * 100) };
}

export const obtenerMision = (id: string) => misiones.find((m) => m.id === id) ?? null;

export const siguienteMision = (mision: Mision) =>
  misionesDeTemporada(mision.temporadaId).find((m) => m.orden === mision.orden + 1) ?? null;

// Insignia que otorga cada misión (docs/08-contenido-muestra.md).
export const insigniaDeMision: Record<string, string> = {
  m1: "i-origenes",
  m2: "i-corazon",
  m3: "i-explorador",
  m4: "i-anfitrion",
  m5: "i-aventura",
};
