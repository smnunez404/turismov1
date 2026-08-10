// Modelo de datos SIMULADO — ver docs/07-modelo-datos-simulado.md
// No es una base de datos: alimenta el prototipo desde memoria.

// ---------- Constructor de avatar (SPEC-32) ----------

export type RegionAvatar =
  | "santa-cruz"
  | "la-paz"
  | "cochabamba"
  | "potosi"
  | "beni"
  | "tarija";

export type CategoriaPieza =
  | "cuerpo"
  | "cara"
  | "cabello"
  | "vello"
  | "prenda"
  | "sombrero"
  | "accesorio"
  | "fondo";

export type PiezaAvatar = {
  id: string;
  categoria: CategoriaPieza;
  nombre: string;
  region: RegionAvatar;
  bloqueada: boolean;
};

export type AvatarPersonalizado = {
  cuerpo: string;
  cara: string;
  cabello: string;
  vello: string;
  prenda: string;
  sombrero: string;
  accesorio: string;
  fondo: string;
  tonoPiel: string;
  colorPelo: string;
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

export type TipoPregunta = "multiple" | "verdadero-falso" | "imagen" | "caso" | "reto";

export type Opcion = {
  id: string;
  texto: string;
  imagen?: string;
  icono?: string;
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

// ---------- Fase 2: modo Preguntados, retención y auspicios ----------

export type Categoria = {
  id: string;
  nombre: string;
  descripcion: string;
  icono: string;
  tono: "primary" | "accent" | "secondary" | "muted";
  auspiciadorId?: string;
};

export type PreguntaRapida = {
  id: string;
  categoriaId: string;
  enunciado: string;
  opciones: Opcion[];
  respuestaCorrectaId: string;
  retroalimentacion: string;
};

export type Equipo = {
  id: string;
  nombre: string;
  zona: string;
  icono: string;
  puntosBase: number;
  integrantes: number;
};

export type Auspiciador = {
  id: string;
  nombre: string;
  rubro: string;
  icono: string;
  formato: "categoria" | "reto" | "premio-liga" | "vidas";
  mensaje: string;
};

export type Premio = {
  id: string;
  auspiciadorId: string;
  titulo: string;
  detalle: string;
  costoPuntos: number;
  vigencia: string;
  condicion: string;
};

export type Cupon = {
  id: string;
  premioId: string;
  codigo: string;
  obtenido: string;
  usado: boolean;
};

export type Rival = {
  id: string;
  nombre: string;
  avatarId: string;
  destreza: number; // 0..1 probabilidad de acertar
  frase: string;
};

export type Racha = {
  dias: number;
  mejorRacha: number;
  preguntaDelDiaHecha: boolean;
};

export type UsuarioSesion = {
  nombre: string;
  correo: string;
  avatarId: string | null;
  avatar: AvatarPersonalizado | null;
  puntos: number;
  insignias: string[];
  progreso: Record<string, ProgresoMision>;
  tutorialVisto: boolean;
  // Fase 2
  vidas: number;
  racha: Racha;
  puntosLiga: number;
  medallas: Record<string, number>; // categoriaId -> aciertos acumulados
  equipoId: string | null;
  cupones: Cupon[];
  duelosGanados: number;
};
