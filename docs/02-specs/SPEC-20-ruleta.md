# SPEC-20 — Ruleta de categorías (P-20)

Ruta: `/jugar/ruleta` · Sprint: S-5 · Estado: Hecho

## Objetivo

Motor de partida rápida al estilo Preguntados: girar, recibir una categoría y responder
hasta acumular 3 fallos.

## Reglas

- Girar cuesta 1 vida; sin vidas no se puede jugar.
- Tanda de hasta 6 preguntas de la categoría sorteada, sin repetición dentro de la partida.
- 10 puntos por acierto; los puntos suman al total y a la liga semanal.
- 3 fallos terminan la partida; los aciertos suman a la medalla de esa categoría.

## Criterios de aceptación

- [x] El giro dura aproximadamente 2,5 s y luego revela la categoría.
- [x] Con `prefers-reduced-motion: reduce`, la categoría se resuelve sin animación ni espera.
- [x] El estado ocupado, la categoría elegida y el feedback de cada respuesta se anuncian a
      tecnologías de asistencia con nombres y regiones de estado explícitos.
- [x] El feedback de cada respuesta es obligatorio antes de continuar.
- [x] El resumen final muestra aciertos, puntos y avance de medalla, y recibe el foco al abrirse.
- [x] Sin vidas, la pantalla ofrece una recarga demo local en lugar de bloquear en silencio o
      prometer una recuperación real.

## Rediseño visual (referencia Preguntados)

- Rueda circular con 6 gajos de color (`conic-gradient`), flecha superior y botón central
  **GIRAR**.
- El giro frena con el gajo sorteado bajo la flecha; el botón conserva un nombre accesible
  durante el estado “Girando…”.
- Cada categoría tiene un personaje propio (`src/data/personajes.ts`): Cronista, Amborín,
  Cuñapé, Comparsera, Taquirari y Urbanito.
- Pantalla de pregunta: cabecera marcador `aciertos vs fallos`, banda con el color y el personaje
  de la categoría, temporizador de 20 s y comodines (bomba que descarta 2 opciones, contador de
  vidas).
- Al agotarse el tiempo la pregunta cuenta como fallo y muestra la retroalimentación.
- La galería de personajes en la ruleta muestra en color sólo las medallas ya ganadas.
