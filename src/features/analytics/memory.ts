// Telemetría efímera del prototipo: permanece solo en memoria y nunca sale del navegador.
export type EventoJuego =
  | { tipo: "invitado_configurado"; instante: number }
  | { tipo: "partida_iniciada"; instante: number; id: string; riesgo: boolean }
  | { tipo: "desafio_respondido"; instante: number; id: string; correcto: boolean }
  | { tipo: "partida_completada"; instante: number; id: string; modo: string; aciertos: number }
  | { tipo: "perfil_demo_activado"; instante: number }
  | { tipo: "canje_demo"; instante: number; premioId: string };

type EventoSinInstante = EventoJuego extends infer E
  ? E extends { instante: number }
    ? Omit<E, "instante">
    : never
  : never;

const eventos: EventoJuego[] = [];

export function registrarEvento(evento: EventoSinInstante) {
  eventos.push({ ...evento, instante: Date.now() } as EventoJuego);
}

export function obtenerEventosDeSesion(): readonly EventoJuego[] {
  return eventos;
}

export function limpiarEventosDeSesion() {
  eventos.length = 0;
}
