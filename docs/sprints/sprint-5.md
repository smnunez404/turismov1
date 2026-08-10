# Sprint 5 — Modo Preguntados, retención y modelo de negocio

Fase 2 · Specs SPEC-19 … SPEC-31 · Estado: Hecho (pendiente de validación con la cliente)

## Objetivo del sprint
Que la aplicación tenga una razón diaria de uso y un camino claro de monetización con
auspiciadores locales, sin perder el propósito educativo y turístico de la Fase 1.

## Alcance entregado
| Entregable | Detalle |
| --- | --- |
| Hub de juego rápido (P-19) | Racha, vidas, medallas y accesos a todos los modos |
| Ruleta de categorías (P-20/21) | 6 categorías cruceñas, 3 fallos por partida, 10 pts por acierto |
| Pregunta del día (P-22) | Una pregunta gratis diaria que alimenta la racha |
| Duelo 1v1 (P-23) | 5 rondas contra rival simulado, +20 pts por victoria |
| Liga semanal (P-24) | 4 divisiones, reinicio los lunes, premio para el top 3 |
| Equipos por zona (P-25) | 6 zonas de Santa Cruz con marcador colectivo |
| Premios y cupones (P-26) | Catálogo por puntos, emisión de código y billetera |
| Navegación | Menú inferior ampliado a 5 ítems: Aprender, Jugar, Liga, Premios, Perfil |
| Contenido | 36 preguntas rápidas, 6 categorías, 6 equipos, 4 rivales, 6 auspiciadores, 6 premios |

## Fuera de alcance (documentado, no construido)
- Notificaciones push y disparadores de retorno (SPEC-29).
- Multijugador real y canje verificado de cupones.
- Pagos, facturación a auspiciadores y panel de métricas comerciales.

## Verificación
- Typecheck sin errores.
- QA móvil (390x844) en `/jugar`, `/jugar/dia`, `/jugar/ruleta`, `/duelo`, `/liga`,
  `/equipos` y `/recompensas`: sin desbordes horizontales ni errores de consola.

## Siguiente paso
Sesión de validación con la cliente sobre el modelo de negocio y la lista de rubros
de auspiciadores reales a contactar en Santa Cruz.
