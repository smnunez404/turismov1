# Sprint 2 — Núcleo de misiones

- **Estado:** Hecho — cerrado el 10 de agosto de 2026
- **Specs:** SPEC-08, SPEC-09, SPEC-10 (5 variantes), SPEC-11 · **Pantallas:** P-08 a P-11

**Objetivo.** El corazón del producto. Es el sprint más pesado y el que más valor de
validación entrega.

## Checklist

- [x] Mapa de temporadas con Temporada 1 activa y 4 bloqueadas.
- [x] Portada de misión con estado y desbloqueo secuencial.
- [x] Motor de preguntas con las 5 variantes.
- [x] Feedback obligatorio con explicación corta en cada respuesta.
- [x] Misiones 1 a 4 jugables de punta a punta.

## Entregable

Misiones 1 a 4 jugables con las cinco variantes de interacción y feedback funcionando.
## Cierre

Construido: `/temporadas`, `/mision/$misionId`, `/mision/$misionId/jugar` con feedback
obligatorio. 32 preguntas sintéticas (8 por misión, misiones 1 a 4) cubriendo las
variantes múltiple, verdadero/falso, imagen y caso práctico; la variante *reto* queda
declarada en `m5p1` y se juega en el Sprint 3 (SPEC-13).

Verificado en navegador: desbloqueo secuencial, barra de progreso de temporada,
acumulación de puntos e insignia por misión.
