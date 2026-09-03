# SPEC-19 — Hub Jugar (P-19)

Ruta: `/jugar` · Sprint: S-5/rediseño · Estado: Hecho — verificado 28-08-2026

## Objetivo

Ser la entrada principal a los modos de juego y resumir el estado real de la sesión.

## Contenido

- Cuatro indicadores: XP, monedas, puntos de liga y vidas (`x/3`).
- Tarjeta principal de partida gratuita con cinco microdesafíos.
- Accesos a Ruleta, reto diario/práctica, Versus y álbum/mundos.
- Progreso al siguiente nivel.
- Ruleta se presenta como modo clásico interno, no como pestaña principal.

## Criterios de aceptación

- [x] Los indicadores leen el estado real de la sesión.
- [x] Cada acceso navega sin callejón sin salida.
- [x] Sin vidas se siguen ofreciendo partida gratuita, práctica y exploración.
- [x] Las cuatro estadísticas forman una cuadrícula 2×2 a 320 px y 4 columnas en pantallas
      amplias.
- [x] Las etiquetas compactas usan al menos 11 px y no se recortan con elipsis silenciosa.
