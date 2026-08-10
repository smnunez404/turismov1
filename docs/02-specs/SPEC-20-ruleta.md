# SPEC-20 — Ruleta de categorías (P-20)

Ruta: `/jugar/ruleta` · Sprint: S-5 · Estado: Hecho

## Objetivo
Motor de partida rápida al estilo Preguntados: girar, recibir una categoría y responder
hasta acumular 3 fallos.

## Reglas
- Girar cuesta 1 vida; sin vidas no se puede jugar.
- Tanda de hasta 6 preguntas de la categoría sorteada, sin repetición dentro de la partida.
- 10 puntos por acierto; los puntos suman al total y a la liga semanal.
- 3 fallos terminan la partida; los aciertos suman a la medalla de esa categoría.

## Criterios de aceptación
- [x] La animación de giro dura ~1.1 s y luego revela la categoría.
- [x] El feedback de cada respuesta es obligatorio antes de continuar.
- [x] El resumen final muestra aciertos, puntos y avance de medalla.
- [x] Sin vidas, la pantalla explica cuándo se recuperan en lugar de bloquear en silencio.
