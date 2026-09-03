# SPEC-21 — Medallas por categoría

Sprint: S-5 · Estado: Hecho — verificado 28-08-2026

## Objetivo

Representar el dominio progresivo de las seis categorías cruceñas.

## Reglas

- Cada acierto en Ruleta suma al contador local de su categoría.
- La medalla se alcanza con el umbral definido en `ACIERTOS_PARA_MEDALLA`.
- El resumen muestra avance y la galería de personajes distingue medallas alcanzadas.
- No existe emisión externa ni persistencia entre recargas.

## Criterios de aceptación

- [x] El progreso se calcula con el estado real de la sesión.
- [x] Una medalla alcanzada cambia el tratamiento visual del personaje.
- [x] El resumen separa aciertos, puntos y avance de categoría.

## Actualización de copy — 31 de agosto de 2026

El cierre de Ruleta anuncia “Nueva medalla” únicamente cuando la partida cruza el umbral. Si la medalla ya existía, confirma que sigue en la colección sin presentarla otra vez como un desbloqueo nuevo.
