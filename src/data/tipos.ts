// Modelo de datos SIMULADO — ver docs/07-modelo-datos-simulado.md
// No es una base de datos: alimenta el prototipo desde memoria.

export type Avatar = {
  id: string;
  nombre: string;
  simbolo: string;
  descripcion: string;
};

export type Temporada = {
  id: string;
  nombre: string;
  estado: "activa" | "bloqueada";
  orden: number;
  descripcion: string;
  icono: string;
};

export type Mision = {
  id: string;
  temporadaId: string;
  nombre: string;
  orden: number;
  descripcion: string;
  cantidadPreguntas: number;
  puntajeMaximo: number;
};

export type TipoPregunta =
  | "multiple"
  | "verdadero-falso"
  | "imagen"
  | "caso"
  | "reto";

export type Opcion = {
  id: string;
  texto: string;
  imagen?: string;
};

export type Pregunta = {
  id: string;
  misionId: string;
  tipo: TipoPregunta;
  enunciado: string;
  opciones: Opcion[];
  respuestaCorrectaId: string;
  retroalimentacion: string;
  puntaje: number;
};

export type Insignia = {
  id: string;
  nombre: string;
  descripcion: string;
  criterio: string;
  icono: string;
};

export type ParticipanteRanking = {
  id: string;
  nombre: string;
  avatarId: string;
  puntaje: number;
};

export type ProgresoMision = {
  completada: boolean;
  puntos: number;
  aciertos: number;
};

export type UsuarioSesion = {
  nombre: string;
  correo: string;
  avatarId: string | null;
  puntos: number;
  insignias: string[];
  progreso: Record<string, ProgresoMision>;
  tutorialVisto: boolean;
};