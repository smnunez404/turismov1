import { desafiosActivos } from "@/data/desafios";
import type {
  Desafio,
  FamiliaMecanica,
  RespuestaDesafio,
  ResultadoDesafio,
  ResumenPartida,
} from "@/data/tipos";

export const CANTIDAD_DESAFIOS_PARTIDA = 5;
const familias: FamiliaMecanica[] = [
  "rapido",
  "detective",
  "imagen",
  "asociacion-orden",
  "decision",
];

export function semillaTexto(texto: string) {
  let h = 2166136261;
  for (const caracter of texto) h = Math.imul(h ^ caracter.charCodeAt(0), 16777619);
  return Math.abs(h);
}

export function fechaBolivia(fecha = new Date()) {
  const partes = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/La_Paz",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(fecha);
  const valor = (tipo: Intl.DateTimeFormatPartTypes) =>
    partes.find((p) => p.type === tipo)?.value ?? "";
  return `${valor("year")}-${valor("month")}-${valor("day")}`;
}

function aleatorio(semilla: number) {
  let estado = semilla || 1;
  return () => {
    estado = Math.imul(estado ^ (estado >>> 15), estado | 1);
    estado ^= estado + Math.imul(estado ^ (estado >>> 7), estado | 61);
    return ((estado ^ (estado >>> 14)) >>> 0) / 4294967296;
  };
}

export function seleccionarCinco(semilla: number, banco = desafiosActivos): Desafio[] {
  const random = aleatorio(semilla);
  return familias.map((familia) => {
    const candidatos = banco.filter((d) => d.estado === "activo" && d.familia === familia);
    if (candidatos.length === 0) {
      throw new Error(`No hay desafíos activos para la familia ${familia}.`);
    }
    const elegido = candidatos[Math.floor(random() * candidatos.length)]!;
    const opciones = [...elegido.opciones];
    for (let i = opciones.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [opciones[i], opciones[j]] = [opciones[j]!, opciones[i]!];
    }
    return { ...elegido, opciones };
  });
}

const iguales = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().every((valor, i) => valor === [...b].sort()[i]);

export function evaluarDesafio(desafio: Desafio, respuesta: RespuestaDesafio): ResultadoDesafio {
  const { solucion, recompensas } = desafio;
  let correcto = false;
  if (solucion.tipo === "unica") correcto = respuesta === solucion.opcionId;
  if (solucion.tipo === "conjunto" && Array.isArray(respuesta)) {
    correcto = iguales(respuesta as string[], solucion.opcionIds);
  }
  if (solucion.tipo === "secuencia" && Array.isArray(respuesta)) {
    const secuencia = respuesta as string[];
    correcto =
      secuencia.length === solucion.opcionIds.length &&
      secuencia.every((valor, i) => valor === solucion.opcionIds[i]);
  }
  if (solucion.tipo === "pares" && Array.isArray(respuesta)) {
    const serializar = (pares: [string, string][]) => pares.map((p) => p.join(":"));
    correcto = iguales(serializar(respuesta as [string, string][]), serializar(solucion.pares));
  }
  return {
    correcto,
    xp: correcto ? recompensas.xpAcierto : recompensas.xpAprendizaje,
    monedas: correcto ? recompensas.monedas : 0,
  };
}

export function resumirPartida(
  id: string,
  modo: ResumenPartida["modo"],
  desafios: Desafio[],
  resultados: ResultadoDesafio[],
  extra: Pick<ResumenPartida, "fechaDiaria" | "ganoVersus"> = {},
): ResumenPartida {
  const aciertos = resultados.filter((r) => r.correcto).length;
  const bonusXp = modo === "diario" ? 15 : modo === "versus" ? (extra.ganoVersus ? 20 : 5) : 10;
  const bonusMonedas = modo === "diario" ? 8 : 5;
  const coleccionables = [
    ...new Set(desafios.flatMap((d) => (d.coleccionableId ? [d.coleccionableId] : []))),
  ];
  return {
    id,
    modo,
    ...extra,
    aciertos,
    desafioIds: desafios.map((d) => d.id),
    resultados: Object.fromEntries(
      desafios.map((desafio, indice) => [
        desafio.id,
        resultados[indice] ?? { correcto: false, xp: 0, monedas: 0 },
      ]),
    ),
    coleccionables,
    xp: resultados.reduce((total, r) => total + r.xp, 0) + bonusXp,
    monedas: resultados.reduce((total, r) => total + r.monedas, 0) + bonusMonedas,
    puntosLiga: modo === "versus" ? aciertos * 10 + (extra.ganoVersus ? 20 : 0) : 0,
  };
}
