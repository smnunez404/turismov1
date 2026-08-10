# SPEC-25 — Sistema de vidas

Sprint: S-5 · Estado: Hecho

## Objetivo
Dosificar el juego y crear el retorno, sin frustrar.

## Reglas
- Máximo 5 vidas. Cada partida de ruleta consume 1.
- Sin vidas: la ruleta se bloquea y se explica cómo recuperarlas.
- Vías de recuperación previstas: espera, premio de racha o cortesía de un auspiciador.

## Criterios de aceptación
- [x] `puedeJugar()` gobierna el bloqueo.
- [x] El contador de vidas es visible en el hub antes de iniciar la partida.
