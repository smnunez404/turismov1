// Derivación del estado de misiones a partir del progreso en memoria (SPEC-09).
import { misiones } from "@/data/misiones";
import type { Mision, UsuarioSesion } from "@/data/tipos";

export type EstadoMision = "bloqueada" | "disponible" | "completada";

export const misionesDeTemporada = (temporadaId: string) =>
  misiones.filter((m) => m.temporadaId === temporadaId).sort((a, b) => a.orden - b.orden);

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
  return {
    completadas,
    total: lista.length,
    porcentaje: Math.round((completadas / lista.length) * 100),
  };
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

// Niveles derivados de los puntos acumulados (§10 del documento maestro).
export const niveles = [
  { nombre: "Curioso", minimo: 0 },
  { nombre: "Explorador", minimo: 100 },
  { nombre: "Conocedor", minimo: 240 },
  { nombre: "Anfitrión", minimo: 450 },
  { nombre: "Embajador", minimo: 750 },
] as const;

export function nivelDe(puntos: number) {
  const indice = niveles.reduce((acc, nivel, i) => (puntos >= nivel.minimo ? i : acc), 0);
  const actual = niveles[indice]!;
  const siguiente = niveles[indice + 1] ?? null;
  const base = actual.minimo;
  const techo = siguiente?.minimo ?? actual.minimo + 80;
  const porcentaje = Math.min(100, Math.round(((puntos - base) / (techo - base)) * 100));
  return {
    indice: indice + 1,
    nombre: actual.nombre,
    siguiente,
    porcentaje,
    faltan: siguiente ? siguiente.minimo - puntos : 0,
  };
}

export const temporadaCompletada = (
  temporadaId: string,
  usuario: { progreso: Record<string, { completada: boolean }> },
) => misionesDeTemporada(temporadaId).every((m) => usuario.progreso[m.id]?.completada);
