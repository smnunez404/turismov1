# SPEC-23 — Racha diaria

Sprint: S-5 · Estado: Hecho como simulación local — verificado 28-08-2026

## Objetivo

Representar un hábito diario dentro de una sesión demo.

## Reglas

- El reto del día actualiza la racha una sola vez por fecha de sesión.
- La racha vacía comienza en cero y el primer reto produce el día uno.
- Los hitos de días 3, 7, 14 y 30 se muestran como metas ilustrativas.
- Vida extra, cupón, doble puntuación e insignia futura no se emiten ni aplican actualmente.

## Criterios de aceptación

- [x] `proximaRecompensa()` devuelve una meta visual.
- [x] La racha se muestra en las vistas de progreso y reto diario.
- [x] No se suma dos veces el mismo día (`preguntaDelDiaHecha`).
- [x] La documentación no presenta las metas ilustrativas como beneficios entregados.
