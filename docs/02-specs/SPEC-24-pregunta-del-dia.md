# SPEC-24 — Pregunta del día (P-22)

Ruta: `/jugar/dia` · Sprint: S-5 · Estado: Hecho

## Objetivo
Una pregunta gratis por día, sin costo de vidas, que alimenta la racha.

## Reglas
- La pregunta se elige de forma estable por día (mismo ítem durante toda la jornada).
- Acierto: +15 pts. Error: +5 pts (nunca se castiga con cero por participar).
- Al responder se marca `preguntaDelDiaHecha` y avanza la racha.
- Se listan los premios de racha con los ya alcanzados marcados.

## Criterios de aceptación
- [x] La retroalimentación aparece siempre, con acierto o con error.
- [x] Las opciones se bloquean tras responder.
- [x] No consume vidas.
