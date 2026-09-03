# SPEC-12 — Resultados de misión

- **Pantalla:** P-12 · **Sprint:** S-3 · **Estado:** Hecho (10 de agosto de 2026)

**Propósito.** Cerrar el ciclo de la misión con recompensa.

**Comportamiento.** Puntaje obtenido, aciertos, insignia desbloqueada (si aplica), avance
de temporada y botón para continuar.

**Criterios de aceptación**

- [x] La obtención de insignia se siente como un momento, no como un dato.
- [x] Actualiza la barra de progreso de temporada.

## Resultado común del motor de cinco — 31 de agosto de 2026

Además del cierre de misión, partida libre, reto diario y Versus usan `ResultadoPartida.tsx`. El componente muestra avatar, tira de cinco respuestas, recompensas realmente aplicadas mediante snapshot antes/después, progreso de nivel, racha cuando corresponde y desbloqueos reales. No muestra velocidad, percentiles ni posición de ranking inexistente. Cada ruta conserva un CTA contextual dominante.
