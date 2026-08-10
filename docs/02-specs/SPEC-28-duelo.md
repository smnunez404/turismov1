# SPEC-28 — Duelo 1v1 (P-23)

Ruta: `/duelo` · Sprint: S-5 · Estado: Hecho

## Objetivo
Competencia directa y breve, la mecánica más viral de Preguntados.

## Reglas
- 5 rondas con las mismas preguntas para ambos jugadores.
- El rival es simulado con una destreza (probabilidad de acierto) por personaje.
- 8 pts por acierto propio; +20 pts extra si se gana el duelo.
- Ganar suma a `duelosGanados` y a la liga semanal.

## Criterios de aceptación
- [x] Marcador visible con ambos avatares durante toda la partida.
- [x] Tras responder se muestra la opción elegida por el rival y la retroalimentación.
- [x] Pantalla de resultado con victoria, empate o derrota y puntos ganados.
- [x] Acceso a invitar a un amigo (SPEC-17) desde la selección de rival.
