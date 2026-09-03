# SPEC-31 — Auspiciadores y formatos comerciales

Archivo: `src/data/auspiciadores.ts` · Sprint: S-5 · Estado: Hecho

## Objetivo

Modelar cómo entra una marca al juego sin dañar la experiencia.

## Formatos

| Formato       | Ubicación                      | Ejemplo sintético                |
| ------------- | ------------------------------ | -------------------------------- |
| `categoria`   | Pie de la tarjeta de categoría | Sabor Camba presenta Gastronomía |
| `premio-liga` | Cabecera de la liga semanal    | Cine Oriente premia al top 3     |
| `reto`        | Reto presencial y catálogo     | Café Toborochi, Rutas del Urubó  |
| `vidas`       | Momento sin vidas              | Bar Piraí te invita una vida     |

## Criterios de aceptación

- [x] Ninguna marca interrumpe una pregunta en curso.
- [x] Cada auspiciador tiene rubro, pictograma y mensaje propio.
- [x] Los nombres son ficticios y están marcados como demostración en la interfaz.
