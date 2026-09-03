import { useCallback, useEffect } from "react";
import { useRouter } from "@tanstack/react-router";

const MENSAJE_SALIDA = "¿Querés salir? Perderás el progreso de esta partida.";

export function useSalidaProtegida(activa: boolean, mensaje = MENSAJE_SALIDA) {
  const router = useRouter();

  useEffect(() => {
    if (!activa) return;
    return router.history.block({
      // TanStack espera `true` para bloquear: aceptar la salida debe permitir navegar.
      blockerFn: () => !window.confirm(mensaje),
      enableBeforeUnload: true,
    });
  }, [activa, mensaje, router]);

  const confirmarSalida = useCallback(() => !activa || window.confirm(mensaje), [activa, mensaje]);

  const salir = useCallback(
    (fallback: string, preferirHistorial = false) => {
      if (!confirmarSalida()) return;
      if (preferirHistorial && router.history.canGoBack()) {
        router.history.back({ ignoreBlocker: true });
      } else {
        router.history.push(fallback, undefined, { ignoreBlocker: true });
      }
    },
    [confirmarSalida, router],
  );

  return { confirmarSalida, salir };
}
