# SPEC-11 — Feedback de respuesta

- **Pantalla:** P-11 (dentro de P-10) · **Sprint:** S-2 · **Estado:** Hecho (10 de agosto de 2026)

**Propósito.** Convertir cada respuesta en aprendizaje.

**Comportamiento.** Tras responder se muestra si fue correcta y siempre una explicación
corta. Tono cálido en caso de error.

**Criterios de aceptación**

- [x] El feedback aparece incluso en respuestas correctas.
- [x] Nunca se usa lenguaje punitivo.
- [x] El usuario no puede avanzar sin ver la explicación.

## Actualización visual — 31 de agosto de 2026

- `PartidaCinco` usa estados compartidos seleccionado/correcto/incorrecto con icono y texto, no sólo color.
- Al resolver, el foco se mueve al panel de feedback anunciado como región viva.
- El avatar del jugador permanece visible durante la partida.
- El tiempo agotado se presenta como descubrimiento, con estado de error moderado y no punitivo.
- Las transiciones respetan `prefers-reduced-motion`.
