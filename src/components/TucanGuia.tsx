type TucanGuiaProps = {
  mensaje?: string;
  tamano?: "sm" | "md" | "lg";
  className?: string;
};

const tamanos = {
  sm: "h-20 w-20",
  md: "h-28 w-28",
  lg: "h-36 w-36",
};

export function TucanGuia({ mensaje, tamano = "md", className = "" }: TucanGuiaProps) {
  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <img
        src="/mascota/tucan-guia.png"
        alt="Tucán guía de la expedición"
        width={1024}
        height={1024}
        className={`${tamanos[tamano]} shrink-0 object-contain object-bottom drop-shadow-lg`}
      />
      {mensaje && (
        <p className="mb-3 max-w-52 rounded-2xl rounded-bl-sm border border-border/80 bg-card/95 px-3 py-2 text-sm leading-snug font-bold text-foreground shadow-sm">
          {mensaje}
        </p>
      )}
    </div>
  );
}
