import type { ReactNode } from "react";
import { BarraInferior } from "@/components/BarraInferior";

// Contenedor móvil compartido del prototipo (docs/06-sistema-visual.md).
export function Pantalla({
  children,
  className = "",
  conNav = false,
}: {
  children: ReactNode;
  className?: string;
  conNav?: boolean;
}) {
  return (
    <>
      <main
        className={`flex min-h-dvh justify-center bg-background px-4 pt-[max(1.5rem,env(safe-area-inset-top))] ${
          conNav
            ? "pb-[calc(5.5rem+env(safe-area-inset-bottom))]"
            : "pb-[max(2rem,env(safe-area-inset-bottom))]"
        }`}
      >
        <div className={`flex w-full max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl flex-col transition-all duration-150 ${className}`}>{children}</div>
      </main>
      {conNav && <BarraInferior />}
    </>
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
