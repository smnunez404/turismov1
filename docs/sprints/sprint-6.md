# Sprint 6 — Identidad: constructor de avatar personalizado

Fase 2 · Spec SPEC-32 · Estado: Hecho (pendiente de validación con la cliente)

## Objetivo del sprint

Convertir la identidad del jugador en un gancho emocional propio: que el usuario no elija
un avatar prefabricado, sino que arme su embajador con rasgos, prendas y accesorios del
oriente boliviano, dejando visibles las piezas bloqueadas de otras ciudades como anticipo
de temporadas futuras.

## Alcance entregado

| Entregable                   | Detalle                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| Constructor de avatar (P-05) | 8 categorías editables: cuerpo, cara, cabello, vello, prenda, sombrero, accesorio y fondo |
| Recoloreado en vivo          | 6 tonos de piel y 6 colores de cabello aplicados al SVG sin regenerar arte                |
| Piezas desbloqueadas         | Tipoy, sombrero de sao, guayabera, guitarra de Cañoto y otros ítems cruceños              |
| Piezas bloqueadas            | Prendas de La Paz, Cochabamba, Potosí, Beni y Tarija con candado y explicación            |
| Botón "Sorprendeme"          | Combinación aleatoria de piezas desbloqueadas                                             |
| Integración global           | Avatar personalizado visible en Perfil, Bienvenida, Mapa, Ranking, Liga, Duelo y Ruleta   |
| Presets antiguos             | Se conservan como respaldo para los 12 participantes sintéticos de ranking/liga/duelo     |
| Arte                         | Sistema de dibujo SVG por capas en `AvatarLienzo`; sin dependencia de imágenes raster     |

## Fuera de alcance (documentado, no construido)

- Guardado persistente del avatar en backend o localStorage: se mantiene en memoria como
  el resto del estado del prototipo.
- Exportación o compartición del avatar como imagen.
- Nuevas piezas desbloqueables por logros; el catálogo es estático en esta entrega.

## Verificación

- Typecheck sin errores.
- QA móvil (390x844) en `/avatar`: sin desbordes horizontales, los sombreros no ocultan
  las opciones de cabello y las piezas bloqueadas se leen claramente.
- Flujo de onboarding completo (registro → avatar → bienvenida) verificado con Playwright.

## Siguiente paso

Validación con la cliente sobre qué prendas y accesorios adicionales de Santa Cruz deben
priorizarse para desbloquear en la Temporada 2, y si se desea persistencia del avatar al
pasar a backend.
