# SPEC-21 — Medallas por categoría

Sprint: S-5 · Estado: Hecho

## Objetivo
Equivalente a las coronas de Preguntados: dominar cada una de las 6 categorías cruceñas.

## Reglas
- Cada acierto en una categoría suma al contador de esa categoría.
- La medalla se gana al alcanzar el umbral definido en `ACIERTOS_PARA_MEDALLA`.
- Las medallas se muestran en el hub de juego y en el perfil.

## Criterios de aceptación
- [x] El progreso se calcula en `medallasDe()` y se refleja en barra y porcentaje.
- [x] Una medalla ganada cambia el tono del pictograma (de neutro a primario).
