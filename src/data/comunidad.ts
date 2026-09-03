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
  { id: "whatsapp", nombre: "WhatsApp", icono: "whatsapp", detalle: "Enviar a un chat o estado" },
  { id: "instagram", nombre: "Instagram", icono: "instagram", detalle: "Publicar en historias" },
  { id: "facebook", nombre: "Facebook", icono: "facebook", detalle: "Compartir en tu muro" },
  { id: "enlace", nombre: "Copiar enlace", icono: "enlace", detalle: "Copiar enlace del logro" },
];
