# Checklist de validación con la cliente — MVP Soy Embajador Bolivia

> Documento de sesión. Se recorre el MVP completo pantalla por pantalla,
> se marca Conforme / Observación y se registra cada hallazgo en la bitácora final.
> Fecha de sesión: ____________ Participantes: ____________
> Versión revisada: MVP v1.0 (Sprints 0 a 4 cerrados).

## Cómo usar este documento

1. Recorrer las secciones en orden: el flujo está encadenado como lo vive un usuario real.
2. Por cada fila marcar `OK` (conforme), `OBS` (observación) o `NA` (no aplica).
3. Toda fila `OBS` genera un hallazgo con ID `H-##` en la tabla de hallazgos.
4. No se cambian alcances durante la sesión: los hallazgos se clasifican después.
5. Recordar los guardarraíles: prototipo sin base de datos real, sin autenticación real
   y sin APIs externas. Los datos son sintéticos ([ver guardarraíles](./05-guardarrailes.md)).

Leyenda de severidad: `Bloqueante` (impide la demo), `Mayor` (afecta comprensión),
`Menor` (ajuste cosmético), `Fuera de alcance` (va al backlog post-MVP).

---

## Preparación previa (5 min)

| #   | Punto                                                             | Estado |
| --- | ----------------------------------------------------------------- | ------ |
| 0.1 | Abrir el prototipo en un celular o vista móvil (392 px de ancho)  | ☐      |
| 0.2 | Confirmar que la sesión arranca vacía (el estado vive en memoria) | ☐      |
| 0.3 | Explicar que refrescar la página reinicia el progreso             | ☐      |
| 0.4 | Tener a mano el [Documento Maestro](./00-documento-maestro.md)    | ☐      |

---

## Sprint 1 — Identidad y onboarding

| Spec                                             | Pantalla        | Qué validar                                         | OK/OBS | Hallazgo |
| ------------------------------------------------ | --------------- | --------------------------------------------------- | ------ | -------- |
| [SPEC-01](./02-specs/SPEC-01-splash.md)          | P-01 Splash     | Marca, tono visual y transición automática (~2.6 s) |        |          |
| [SPEC-02](./02-specs/SPEC-02-registro.md)        | P-02 Registro   | Campos pedidos, textos, validación básica           |        |          |
| [SPEC-03](./02-specs/SPEC-03-inicio-sesion.md)   | P-03 Login      | Ingreso con perfil demo, mensajes de error          |        |          |
| [SPEC-04](./02-specs/SPEC-04-creacion-perfil.md) | P-04 Perfil     | Datos solicitados y su utilidad real para la marca  |        |          |
| [SPEC-05](./02-specs/SPEC-05-avatar.md)          | P-05 Avatar     | Representatividad regional de los 6 avatares        |        |          |
| [SPEC-06](./02-specs/SPEC-06-bienvenida.md)      | P-06 Bienvenida | Claridad del concepto "Embajador"                   |        |          |
| [SPEC-07](./02-specs/SPEC-07-tutorial.md)        | P-07 Tutorial   | Los 3 pasos explican bien la mecánica               |        |          |

Pregunta guía: ¿una persona que entra por primera vez entiende qué gana y qué debe hacer?

---

## Sprint 2 — Núcleo de misiones

| Spec                                             | Pantalla      | Qué validar                                           | OK/OBS | Hallazgo |
| ------------------------------------------------ | ------------- | ----------------------------------------------------- | ------ | -------- |
| [SPEC-08](./02-specs/SPEC-08-mapa-temporadas.md) | P-08 Mapa     | Lectura del avance, misiones y temporadas bloqueadas  |        |          |
| [SPEC-09](./02-specs/SPEC-09-portada-mision.md)  | P-09 Portada  | Puntaje máximo e insignia en juego se entienden       |        |          |
| [SPEC-10](./02-specs/SPEC-10-motor-preguntas.md) | P-10 Juego    | Variantes: múltiple, verdadero/falso, imagen, caso    |        |          |
| [SPEC-11](./02-specs/SPEC-11-feedback.md)        | P-11 Feedback | Retroalimentación obligatoria, tono y valor educativo |        |          |

Puntos de contenido a revisar con la cliente:

- ☐ Exactitud cultural e histórica de las preguntas sintéticas.
- ☐ Nivel de dificultad adecuado al público objetivo.
- ☐ Cantidad de preguntas por misión.
- ☐ Desbloqueo secuencial: ¿debe exigirse completar la misión anterior?

---

## Sprint 3 — Gamificación, reto y progreso

| Spec                                             | Pantalla        | Qué validar                                         | OK/OBS | Hallazgo |
| ------------------------------------------------ | --------------- | --------------------------------------------------- | ------ | -------- |
| [SPEC-12](./02-specs/SPEC-12-resultados.md)      | P-12 Resultados | Resumen de puntos, aciertos e insignias             |        |          |
| [SPEC-13](./02-specs/SPEC-13-reto-presencial.md) | P-13 Reto       | Lugares emblemáticos, foto simulada, relato         |        |          |
| [SPEC-14](./02-specs/SPEC-14-perfil.md)          | P-14 Perfil     | Nivel, barra de progreso e inventario de insignias  |        |          |
| [SPEC-15](./02-specs/SPEC-15-ranking.md)         | P-15 Ranking    | Posición del usuario entre participantes sintéticos |        |          |

Reglas a confirmar explícitamente:

- ☐ Umbrales de nivel: 0 / 80 / 160 / 240 / 320 puntos.
- ☐ Nombres de niveles: Curioso, Explorador, Anfitrión, Embajador, Embajador de Oro.
- ☐ El Reto Presencial exige las 4 misiones previas completadas.
- ☐ Nombres e íconos de las insignias.

---

## Sprint 4 — Cierre, certificado y difusión

| Spec                                         | Pantalla         | Qué validar                                          | OK/OBS | Hallazgo |
| -------------------------------------------- | ---------------- | ---------------------------------------------------- | ------ | -------- |
| [SPEC-16](./02-specs/SPEC-16-certificado.md) | P-16 Certificado | Diseño, datos mostrados y código de certificado      |        |          |
| [SPEC-17](./02-specs/SPEC-17-compartir.md)   | P-17 Compartir   | Canales, texto sugerido, insignia "Promotor Cruceño" |        |          |
| [SPEC-18](./02-specs/SPEC-18-panel-admin.md) | P-18 Admin       | La maqueta comunica bien la gestión futura           |        |          |

Reglas a confirmar:

- ☐ El certificado exige las 5 misiones de la Temporada 1.
- ☐ Formato del código `SEB-T1-<iniciales>-<puntaje>`.
- ☐ Invitar a una persona otorga la insignia de promotor.

---

## Recorrido transversal (después de las pantallas)

| #   | Punto                                                                   | OK/OBS | Hallazgo |
| --- | ----------------------------------------------------------------------- | ------ | -------- |
| T.1 | Consistencia visual: paleta, tipografías y botones en todo el flujo     |        |          |
| T.2 | Tono de los textos: cercano, cruceño, sin errores de redacción          |        |          |
| T.3 | Legibilidad en celular con luz de día (contrastes)                      |        |          |
| T.4 | Navegación: siempre hay forma de volver o continuar                     |        |          |
| T.5 | Estados bloqueados: se explica claramente cómo desbloquear              |        |          |
| T.6 | Nombres de marca y de la app usados de forma uniforme                   |        |          |
| T.7 | Recorrido completo de punta a punta sin trabas (Misión 1 → certificado) |        |          |

---

## Registro de hallazgos

| ID   | Spec / Pantalla | Sprint | Descripción del hallazgo | Severidad | Decisión | Responsable |
| ---- | --------------- | ------ | ------------------------ | --------- | -------- | ----------- |
| H-01 |                 |        |                          |           |          |             |
| H-02 |                 |        |                          |           |          |             |
| H-03 |                 |        |                          |           |          |             |
| H-04 |                 |        |                          |           |          |             |
| H-05 |                 |        |                          |           |          |             |
| H-06 |                 |        |                          |           |          |             |
| H-07 |                 |        |                          |           |          |             |
| H-08 |                 |        |                          |           |          |             |
| H-09 |                 |        |                          |           |          |             |
| H-10 |                 |        |                          |           |          |             |

Decisión posible: `Corregir en la ronda única`, `Backlog post-MVP`, `Descartado`.

---

## Cierre de la sesión

| #   | Acuerdo                                                           | Estado |
| --- | ----------------------------------------------------------------- | ------ |
| C.1 | Todos los hallazgos quedaron registrados con severidad y decisión | ☐      |
| C.2 | Se definió qué entra en la ronda única de ajustes                 | ☐      |
| C.3 | Se acordó fecha de entrega de los ajustes                         | ☐      |
| C.4 | Lo fuera de alcance quedó anotado como fase 2                     | ☐      |
| C.5 | Se registró la conformidad general del MVP                        | ☐      |

Conformidad general: ☐ Aprobado ☐ Aprobado con observaciones ☐ Requiere nueva revisión

Firma / conformidad de la cliente: ____________________ Fecha: ____________

Después de la sesión: trasladar las decisiones a
[la bitácora de decisiones](./04-bitacora-decisiones.md) y actualizar
[el estado del proyecto](./01-estado-del-proyecto.md).
