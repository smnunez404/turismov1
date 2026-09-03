// Utilidades de presentación del prototipo.
export const fechaLarga = (d: Date) =>
  d.toLocaleDateString("es-BO", { day: "numeric", month: "long", year: "numeric" });

export const codigoCertificado = (nombre: string, puntos: number) => {
  const iniciales = (nombre || "Embajador")
    .trim()
    .split(/\s+/)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 3)
    .padEnd(2, "X");
  return `SEB-T1-${iniciales}-${String(puntos).padStart(4, "0")}`;
};
