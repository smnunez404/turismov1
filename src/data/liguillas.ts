// Modelo y utilidades para Liguillas y Torneos Privados estilo Kahoot / Clash Royale.
// Totalmente aislado de la economía de juego principal (no altera XP de liga ni monedas globales).

export type CategoriaLiguilla = "todas" | "historia" | "naturaleza" | "gastronomia" | "tradicion" | "personajes" | "hoy";

export type ParticipanteLiguilla = {
  id: string;
  nombre: string;
  puntos: number;
  aciertos: number;
  tiempoTotalSegundos: number;
  avatarId?: string;
  esAnfitrion?: boolean;
};

export type LiguillaPrivada = {
  pin: string;
  nombre: string;
  anfitrionNombre: string;
  categoria: CategoriaLiguilla;
  cantidadPreguntas: number; // 5, 8 o 10
  tiempoPorPreguntaSegundos: number; // 15 o 20
  creadaEn: number;
  estado: "esperando" | "jugando" | "finalizada";
  participantes: ParticipanteLiguilla[];
};

const CLAVE_STORAGE_LIGUILLAS = "embajador_bolivia_liguillas_privadas_v1";

// Torneos precargados para demostración instantánea (ej. Colegios / Amigos)
const LIGUILLAS_PREDETERMINADAS: LiguillaPrivada[] = [
  {
    pin: "SCZ26",
    nombre: "Promo 2026 - Copa Cruceña",
    anfitrionNombre: "Profe Carlos",
    categoria: "todas",
    cantidadPreguntas: 5,
    tiempoPorPreguntaSegundos: 15,
    creadaEn: Date.now() - 3600000,
    estado: "finalizada",
    participantes: [
      { id: "p1", nombre: "Mateo Suárez", puntos: 48, aciertos: 5, tiempoTotalSegundos: 32 },
      { id: "p2", nombre: "Luciana Ribera", puntos: 42, aciertos: 4, tiempoTotalSegundos: 38 },
      { id: "p3", nombre: "Joaquín Antelo", puntos: 35, aciertos: 4, tiempoTotalSegundos: 45 },
      { id: "p4", nombre: "Camila Justiniano", puntos: 28, aciertos: 3, tiempoTotalSegundos: 50 },
      { id: "p5", nombre: "Rodrigo Vaca", puntos: 20, aciertos: 2, tiempoTotalSegundos: 55 },
    ],
  },
  {
    pin: "CAMBA",
    nombre: "Torneo de Amigos del Barrio",
    anfitrionNombre: "Alejandro DATEC",
    categoria: "gastronomia",
    cantidadPreguntas: 5,
    tiempoPorPreguntaSegundos: 15,
    creadaEn: Date.now() - 1800000,
    estado: "esperando",
    participantes: [
      { id: "p1", nombre: "Alejandro DATEC", puntos: 0, aciertos: 0, tiempoTotalSegundos: 0, esAnfitrion: true },
      { id: "p2", nombre: "Maurizio", puntos: 0, aciertos: 0, tiempoTotalSegundos: 0 },
      { id: "p3", nombre: "Sebas", puntos: 0, aciertos: 0, tiempoTotalSegundos: 0 },
    ],
  },
];

export function cargarLiguillas(): LiguillaPrivada[] {
  if (typeof window === "undefined") return LIGUILLAS_PREDETERMINADAS;
  try {
    const raw = localStorage.getItem(CLAVE_STORAGE_LIGUILLAS);
    if (!raw) {
      guardarLiguillas(LIGUILLAS_PREDETERMINADAS);
      return LIGUILLAS_PREDETERMINADAS;
    }
    return JSON.parse(raw);
  } catch {
    return LIGUILLAS_PREDETERMINADAS;
  }
}

export function guardarLiguillas(lista: LiguillaPrivada[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CLAVE_STORAGE_LIGUILLAS, JSON.stringify(lista));
  } catch (e) {
    console.error("Error al guardar liguillas:", e);
  }
}

export function buscarLiguillaPorPin(pin: string): LiguillaPrivada | null {
  const lista = cargarLiguillas();
  return lista.find((l) => l.pin.trim().toUpperCase() === pin.trim().toUpperCase()) ?? null;
}

export function crearNuevaLiguilla(datos: {
  nombre: string;
  anfitrionNombre: string;
  categoria: CategoriaLiguilla;
  cantidadPreguntas: number;
}): LiguillaPrivada {
  const lista = cargarLiguillas();
  // Generar PIN aleatorio de 5 letras
  const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let pin = "";
  for (let i = 0; i < 5; i++) {
    pin += letras.charAt(Math.floor(Math.random() * letras.length));
  }

  const nueva: LiguillaPrivada = {
    pin,
    nombre: datos.nombre.trim() || "Torneo Cruceño Privado",
    anfitrionNombre: datos.anfitrionNombre.trim() || "Anfitrión",
    categoria: datos.categoria,
    cantidadPreguntas: datos.cantidadPreguntas,
    tiempoPorPreguntaSegundos: 15,
    creadaEn: Date.now(),
    estado: "esperando",
    participantes: [
      {
        id: `usr-${Date.now()}`,
        nombre: datos.anfitrionNombre.trim() || "Anfitrión",
        puntos: 0,
        aciertos: 0,
        tiempoTotalSegundos: 0,
        esAnfitrion: true,
      },
    ],
  };

  lista.unshift(nueva);
  guardarLiguillas(lista);
  return nueva;
}

export function registrarPuntajeParticipante(
  pin: string,
  nombre: string,
  aciertos: number,
  puntos: number,
  tiempoTotalSegundos: number,
  avatarId?: string,
) {
  const lista = cargarLiguillas();
  const index = lista.findIndex((l) => l.pin === pin);
  if (index === -1) return;

  const sala = { ...lista[index]! };
  const participanteIndex = sala.participantes.findIndex(
    (p) => p.nombre.toLowerCase() === nombre.toLowerCase(),
  );

  const nuevoParticipante: ParticipanteLiguilla = {
    id: `p-${Date.now()}`,
    nombre,
    puntos,
    aciertos,
    tiempoTotalSegundos,
    avatarId,
  };

  if (participanteIndex >= 0) {
    sala.participantes[participanteIndex] = nuevoParticipante;
  } else {
    sala.participantes.push(nuevoParticipante);
  }

  // Ordenar participantes por puntos descendente
  sala.participantes.sort((a, b) => b.puntos - a.puntos || a.tiempoTotalSegundos - b.tiempoTotalSegundos);
  lista[index] = sala;
  guardarLiguillas(lista);
}
