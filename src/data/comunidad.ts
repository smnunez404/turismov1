// Contenido SINTÉTICO de muestra — comunidad simulada (SPEC-13, SPEC-17).
// No hay integración real con redes ni con contactos del teléfono.
export const amigosSugeridos = ["Joaquín", "Valeria", "Diego", "Mariana"];

export type CanalCompartir = {
  id: string;
  nombre: string;
  icono: string;
  detalle: string;
};

export const canalesCompartir: CanalCompartir[] = [
  { id: "whatsapp", nombre: "WhatsApp", icono: "💬", detalle: "Enviar a un chat o estado" },
  { id: "instagram", nombre: "Instagram", icono: "📸", detalle: "Publicar en historias" },
  { id: "facebook", nombre: "Facebook", icono: "👍", detalle: "Compartir en tu muro" },
  { id: "enlace", nombre: "Copiar enlace", icono: "🔗", detalle: "Enlace simulado del logro" },
];
