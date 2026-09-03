import type { Auspiciador, Premio } from "./tipos";

// SPEC-30/31 — Auspiciadores de DEMOSTRACIÓN.
// Nombres ficticios inspirados en rubros reales de Santa Cruz (cine, mall, café, bar, tours).
// Se reemplazan por marcas reales cuando existan acuerdos comerciales firmados.
export const auspiciadores: Auspiciador[] = [
  {
    id: "a-cine",
    nombre: "Cine Oriente",
    rubro: "Cine",
    icono: "cine",
    formato: "premio-liga",
    mensaje: "Premio de la liga semanal: entradas para el top 3.",
  },
  {
    id: "a-mall",
    nombre: "Paseo Guapurú",
    rubro: "Centro comercial",
    icono: "mall",
    formato: "categoria",
    mensaje: "Presenta la categoría Santa Cruz hoy.",
  },
  {
    id: "a-sabor",
    nombre: "Sabor Camba",
    rubro: "Restaurante",
    icono: "gastronomia",
    formato: "categoria",
    mensaje: "Presenta la categoría Gastronomía.",
  },
  {
    id: "a-cafe",
    nombre: "Café Toborochi",
    rubro: "Cafetería",
    icono: "cafe",
    formato: "reto",
    mensaje: "Reto presencial: visitá el local y ganá tu cupón.",
  },
  {
    id: "a-bar",
    nombre: "Bar Piraí",
    rubro: "Bar",
    icono: "bar",
    formato: "vidas",
    mensaje: "Te invita una vida extra para seguir jugando.",
  },
  {
    id: "a-tour",
    nombre: "Rutas del Urubó",
    rubro: "Turismo",
    icono: "tour",
    formato: "reto",
    mensaje: "Tour con descuento para embajadores activos.",
  },
];

export const obtenerAuspiciador = (id?: string) =>
  id ? (auspiciadores.find((a) => a.id === id) ?? null) : null;

// SPEC-30 — Catálogo de recompensas de demostración canjeables solo con monedas.
export const premios: Premio[] = [
  {
    id: "pr-cine",
    auspiciadorId: "a-cine",
    titulo: "2x1 en entradas de cine",
    detalle: "Válido de lunes a jueves en cualquier función 2D.",
    costoPuntos: 120,
    vigencia: "30 días desde el canje",
    condicion: "Nivel Explorador o superior",
  },
  {
    id: "pr-mall",
    auspiciadorId: "a-mall",
    titulo: "Bs 30 de descuento en el patio de comidas",
    detalle: "Compra mínima de Bs 80 en locales adheridos.",
    costoPuntos: 90,
    vigencia: "21 días desde el canje",
    condicion: "Racha de 3 días",
  },
  {
    id: "pr-sabor",
    auspiciadorId: "a-sabor",
    titulo: "Postre cruceño de cortesía",
    detalle: "Con cualquier plato principal, un cuñapé dulce o arroz con leche.",
    costoPuntos: 60,
    vigencia: "15 días desde el canje",
    condicion: "Medalla de Gastronomía",
  },
  {
    id: "pr-cafe",
    auspiciadorId: "a-cafe",
    titulo: "Café + cuñapé por Bs 15",
    detalle: "Presentá el código al pedir en caja.",
    costoPuntos: 45,
    vigencia: "15 días desde el canje",
    condicion: "Completar un reto presencial",
  },
  {
    id: "pr-bar",
    auspiciadorId: "a-bar",
    titulo: "15% en consumo",
    detalle: "No acumulable con otras promociones.",
    costoPuntos: 80,
    vigencia: "30 días desde el canje",
    condicion: "Top 10 de la liga semanal",
  },
  {
    id: "pr-tour",
    auspiciadorId: "a-tour",
    titulo: "20% en tour al Urubó",
    detalle: "Salidas de sábado y domingo, cupo sujeto a disponibilidad.",
    costoPuntos: 150,
    vigencia: "45 días desde el canje",
    condicion: "Completar la Temporada 1",
  },
];

export const obtenerPremio = (id: string) => premios.find((p) => p.id === id) ?? null;
