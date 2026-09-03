# SPEC-28 — Versus bot demo (P-23)

Ruta: `/duelo` · Estado: actualizado por rediseño social

## Objetivo

Probar competencia breve y revancha sin afirmar multijugador real.

## Reglas vigentes

- Usa el motor común de exactamente cinco desafíos.
- El rival es un bot local y está rotulado como `BOT` y `DEMO` antes, durante y después.
- El marcador del bot es determinista para la partida.
- Consume una de tres vidas y otorga XP, monedas y puntos de liga separados.
- La revancha inicia en un toque cuando queda una vida.
- Compartir solo prepara una simulación; no envía retos ni atribuye recepción.

## Criterios

- [x] Cinco rondas y resultado común.
- [x] Bot identificado inequívocamente.
- [x] Revancha inmediata.
- [x] Resultado idempotente por identificador de partida.
- [x] Alternativas gratuitas visibles con cero vidas.

## Actualización visual — 31 de agosto de 2026

El avatar se conserva antes, durante y después del versus. El cierre común diferencia marcador demo del bot y recompensas reales del jugador, muestra los cinco resultados, progreso y desbloqueos, y mantiene la revancha como acción contextual sin afirmar multijugador.
