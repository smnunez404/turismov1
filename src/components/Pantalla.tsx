import type { ReactNode } from "react";

// Contenedor móvil compartido del prototipo (docs/06-sistema-visual.md).
export function Pantalla({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <main className="flex min-h-screen justify-center bg-background px-4 py-8">
      <div className={`flex w-full max-w-md flex-col ${className}`}>{children}</div>
    </main>
  );
}

export function PasoOnboarding({ actual, total }: { actual: number; total: number }) {
  return (
    <div className="flex items-center gap-2" aria-label={`Paso ${actual} de ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 flex-1 rounded-full transition-colors ${
            i < actual ? "bg-primary" : "bg-muted"
          }`}
        />
      ))}
    </div>
  );
}