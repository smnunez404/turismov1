# SPEC-23 — Racha diaria

Sprint: S-5 · Estado: Hecho

## Objetivo
Crear el hábito diario. La racha cuenta días consecutivos con actividad.

## Reglas
- La pregunta del día es la forma más simple de mantener la racha.
- Premios: día 3 (1 vida extra), día 7 (cupón sorpresa), día 14 (doble puntos por un día),
  día 30 (insignia Embajador Constante).
- Se muestra el próximo premio y a cuántos días está.

## Criterios de aceptación
- [x] `proximaRecompensa()` devuelve siempre un objetivo visible.
- [x] La racha se muestra en el hub de juego y en la pregunta del día.
- [x] No se suma dos veces el mismo día (`preguntaDelDiaHecha`).
