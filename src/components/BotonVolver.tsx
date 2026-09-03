import { useRouter } from "@tanstack/react-router";
import { Icono } from "@/components/Icono";

export function BotonVolver({
  fallback,
  etiqueta = "Volver",
  preferirHistorial = true,
  confirmar,
  onVolver,
  className = "",
}: {
  fallback: string;
  etiqueta?: string;
  preferirHistorial?: boolean;
  confirmar?: string;
  onVolver?: () => void;
  className?: string;
}) {
  const router = useRouter();

  const volver = () => {
    if (confirmar && !window.confirm(confirmar)) return;
    if (onVolver) {
      onVolver();
      return;
    }
    if (preferirHistorial && router.history.canGoBack()) {
      router.history.back({ ignoreBlocker: true });
      return;
    }
    router.history.push(fallback, undefined, { ignoreBlocker: true });
  };

  return (
    <button
      type="button"
      onClick={volver}
      className={`inline-flex min-h-11 w-fit items-center gap-2 rounded-xl px-3 text-sm font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`}
    >
      <Icono nombre="volver" className="h-4 w-4" />
      {etiqueta}
    </button>
  );
}
