# SPEC-24 — Reto diario (P-22)

Ruta: `/jugar/dia` · Estado: actualizado por rediseño social

## Objetivo

Ofrecer un ritual gratuito de cinco desafíos, sin costo de vidas, elegido de forma determinista para la fecha de `America/La_Paz`.

## Reglas vigentes

- Usa exactamente cinco desafíos del banco local activo y las cinco familias de mecánicas.
- La selección es estable para la fecha boliviana y no depende de APIs ni reloj de servidor.
- La recompensa se aplica una sola vez por fecha dentro de la sesión en memoria.
- Después de completarlo queda disponible como práctica gratuita, incluso con cero vidas.
- El resultado usa aciertos y deltas realmente aplicados en la sesión; no inventa ni muestra una posición diaria.
- La racha es una simulación de sesión; recargar reinicia el estado.

## Criterios

- [x] Feedback cálido después de cada respuesta.
- [x] Cinco desafíos sin repetición dentro de la partida.
- [x] No consume vidas.
- [x] Recompensa idempotente durante la sesión.
- [x] No afirma comparación con personas reales.
