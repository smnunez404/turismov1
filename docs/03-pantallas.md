# Inventario de pantallas y estados

> Corte: 28 de agosto de 2026. El inventario contiene **28 IDs de pantalla/estado y 26 rutas
> reales**. P-11 vive dentro de P-10 y P-21 dentro de P-20.

| ID   | Pantalla                               | Ruta en el prototipo           | Momento / agrupación  | Estado |
| ---- | -------------------------------------- | ------------------------------ | --------------------- | ------ |
| P-01 | Landing de curiosidad                  | `/`                            | Entrada               | Hecho  |
| P-02 | Perfil postvalor simulado              | `/registro`                    | Entrada demo          | Hecho  |
| P-03 | Inicio de sesión demo legado           | `/login`                       | Entrada demo          | Hecho  |
| P-04 | Creación de perfil legada              | `/perfil-nuevo`                | Entrada demo          | Hecho  |
| P-05 | Constructor de avatar SVG por capas    | `/avatar`                      | Perfil                | Hecho  |
| P-06 | Bienvenida                             | `/bienvenida`                  | Onboarding legado     | Hecho  |
| P-07 | Tutorial                               | `/tutorial`                    | Onboarding legado     | Hecho  |
| P-08 | Mapa de temporadas                     | `/temporadas`                  | Descubrir             | Hecho  |
| P-09 | Detalle / portada de misión            | `/mision/$misionId`            | Descubrir             | Hecho  |
| P-10 | Pregunta activa (5 variantes)          | `/mision/$misionId/jugar`      | Descubrir             | Hecho  |
| P-11 | Feedback de respuesta                  | Dentro de P-10                 | Descubrir             | Hecho  |
| P-12 | Resultados de misión                   | `/mision/$misionId/resultados` | Descubrir             | Hecho  |
| P-13 | Reto con selector y vista previa local | `/mision/$misionId/reto`       | Descubrir             | Hecho  |
| P-14 | Perfil del usuario                     | `/perfil`                      | Perfil                | Hecho  |
| P-15 | Ranking histórico sintético            | `/ranking`                     | Ranking               | Hecho  |
| P-16 | Certificado visual                     | `/certificado`                 | Descubrir             | Hecho  |
| P-17 | Preparar tarjeta e invitaciones demo   | `/compartir`                   | Perfil                | Hecho  |
| P-18 | Panel administrativo conceptual        | `/admin-conceptual`            | Conceptual            | Hecho  |
| P-19 | Hub Jugar                              | `/jugar`                       | Jugar                 | Hecho  |
| P-20 | Ruleta de categorías                   | `/jugar/ruleta`                | Modo interno de Jugar | Hecho  |
| P-21 | Resumen de partida Ruleta              | Dentro de P-20                 | Jugar                 | Hecho  |
| P-22 | Reto diario / práctica                 | `/jugar/dia`                   | Jugar                 | Hecho  |
| P-23 | Versus contra bot demo                 | `/duelo`                       | Versus                | Hecho  |
| P-24 | Liga semanal sintética                 | `/liga`                        | Ranking               | Hecho  |
| P-25 | Equipos por zona sintéticos            | `/equipos`                     | Ranking               | Hecho  |
| P-26 | Recompensas y cupones ficticios        | `/recompensas`                 | Subpantalla de Perfil | Hecho  |
| P-27 | Setup rápido de invitado               | `/setup`                       | Camino principal      | Hecho  |
| P-28 | Partida de cinco microdesafíos         | `/partida`                     | Camino principal      | Hecho  |

## Navegación principal

La barra inferior tiene cinco destinos y agrupa rutas relacionadas:

- **Jugar:** `/jugar`, `/partida`, `/jugar/ruleta` y `/jugar/dia`.
- **Versus:** `/duelo`.
- **Descubrir:** `/temporadas`, misiones y `/certificado`.
- **Ranking:** `/ranking`, `/liga` y `/equipos`.
- **Perfil:** `/perfil`, `/avatar`, `/recompensas` y `/compartir`.

Ruleta no es una pestaña independiente y Recompensas pertenece a Perfil.

## Recorridos

- Principal: Landing → setup invitado → partida → resultado y progreso local.
- Educativo alternativo: Login/registro demo → nombre → avatar → bienvenida → tutorial →
  temporadas y misiones.

Todas las rutas son representaciones locales. No publican, envían, persisten, autentican,
conectan usuarios ni entregan beneficios reales.
