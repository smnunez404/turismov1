// Modelo de datos SIMULADO — ver docs/07-modelo-datos-simulado.md
// No es una base de datos: alimenta el prototipo desde memoria.

// ---------- Constructor de avatar (SPEC-32) ----------

export type RegionAvatar = "santa-cruz" | "la-paz" | "cochabamba" | "potosi" | "beni" | "tarija";

export type CategoriaPieza =
  | "cuerpo"
  | "cara"
  | "cabello"
  | "vello"
  | "prenda"
  | "sombrero"
  | "accesorio"
  | "mochila"
  | "fondo";

export type PresentacionAvatar = "masculina" | "femenina";
export type CompatibilidadPresentacion = PresentacionAvatar | "unisex";

export type PiezaAvatar = {
  id: string;
  categoria: CategoriaPieza;
  nombre: string;
  region: RegionAvatar;
  bloqueada: boolean;
  compatibilidad?: CompatibilidadPresentacion;
};

export type AvatarPersonalizado = {
  presentacion: PresentacionAvatar;
  cuerpo: string;
  cara: string;
  cabello: string;
  vello: string;
  prenda: string;
  sombrero: string;
  accesorio: string;
  mochila: string;
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
  zona: string;
  rachaDias: number;
};

export type ProgresoMision = {
  completada: boolean;
  /** Mejor puntaje histórico de la misión. */
  puntos: number;
  /** Aciertos del intento más reciente. */
  aciertos: number;
  /** XP realmente añadido por el intento más reciente. */
  ultimoDelta?: number;
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
  /** Alias legacy; el canje nuevo usa exclusivamente costoMonedas. */
  costoPuntos: number;
  costoMonedas?: number;
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

// ---------- Rediseño: juego social recurrente ----------
export type MecanicaDesafio =
  "rapido" | "detective" | "imagen" | "asociacion" | "orden" | "decision";
export type FamiliaMecanica = "rapido" | "detective" | "imagen" | "asociacion-orden" | "decision";
export type DificultadDesafio = "facil" | "media" | "dificil";
export type OpcionDesafio = { id: string; texto: string; icono?: string | undefined };
export type SolucionDesafio =
  | { tipo: "unica"; opcionId: string }
  | { tipo: "conjunto"; opcionIds: string[] }
  | { tipo: "pares"; pares: [string, string][] }
  | { tipo: "secuencia"; opcionIds: string[] };
export type RespuestaDesafio = string | string[] | [string, string][];
export type Desafio = {
  id: string;
  temporadaId: string;
  categoriaId: string;
  mecanica: MecanicaDesafio;
  familia: FamiliaMecanica;
  dificultad: DificultadDesafio;
  consigna: string;
  opciones: OpcionDesafio[];
  solucion: SolucionDesafio;
  explicacion: string;
  recompensas: { xpAcierto: number; xpAprendizaje: number; monedas: number };
  tiempoSegundos?: number;
  asset?: string;
  coleccionableId?: string;
  fuente: string;
  revisadoPor: string;
  estado: "borrador" | "revisado" | "activo" | "retirado";
};
export type ResultadoDesafio = { correcto: boolean; xp: number; monedas: number };
export type ProgresoJuego = {
  desafios: Record<string, ResultadoDesafio>;
  partidas: number;
  versus: number;
  retoDiarioFecha: string | null;
};
export type ResumenPartida = {
  id: string;
  modo: "libre" | "diario" | "versus";
  fechaDiaria?: string | undefined;
  desafioIds: string[];
  /** Resultado real por desafío, usado como fuente de verdad del progreso. */
  resultados: Record<string, ResultadoDesafio>;
  coleccionables: string[];
  aciertos: number;
  xp: number;
  monedas: number;
  puntosLiga: number;
  ganoVersus?: boolean | undefined;
};

export type UsuarioSesion = {
  nombre: string;
  correo: string;
  avatarId: string | null;
  avatar: AvatarPersonalizado | null;
  /** Alias legacy sincronizado con xp; no se gasta. */
  puntos: number;
  xp: number;
  monedas: number;
  esInvitado: boolean;
  insignias: string[];
  progreso: Record<string, ProgresoMision>;
  progresoJuego: ProgresoJuego;
  album: string[];
  inventarioAvatar: string[];
  recompensasAplicadas: string[];
  partidasIniciadas: string[];
  tutorialVisto: boolean;
  vidas: number;
  racha: Racha;
  puntosLiga: number;
  medallas: Record<string, number>;
  equipoId: string | null;
  cupones: Cupon[];
  duelosGanados: number;
};
