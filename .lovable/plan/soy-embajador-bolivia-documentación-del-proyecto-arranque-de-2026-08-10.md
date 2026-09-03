# Soy Embajador Bolivia — Documentación del proyecto + arranque de Sprints

## Qué se hará en este paso

1. Guardar el Documento Maestro como archivo del proyecto (fuente única de verdad).
2. Crear la estructura de documentación viva que se actualizará en cada sprint.
3. Dejar documentado el Sprint 0 y comenzar la construcción del Sprint 1 (onboarding) con datos sintéticos.

## Estructura de documentación a crear

```text
docs/
  00-documento-maestro.md      Documento v1.0 íntegro, sin modificar
  01-estado-del-proyecto.md    Tablero de avance: sprint actual, estado por spec
  02-specs/                    SPEC-01 ... SPEC-18, una nota por spec
  03-pantallas.md              Inventario P-01..P-18 con ruta real y estado
  04-bitacora-decisiones.md    Seccion 16 viva, con fecha y origen de cada decisión
  05-guardarrailes.md          Seccion 5 operativa: qué se rechaza y por qué
  06-sistema-visual.md         Paleta, tipografía, tono, iconografía (Sprint 0)
  07-modelo-datos-simulado.md  Seccion 8 traducida a tipos TypeScript
  08-contenido-muestra.md      Inventario del contenido sintético por misión
  sprints/
      sprint-0.md ... sprint-4.md   Objetivo, alcance, entregable, checklist, cierre
```

Cada spec y cada sprint llevan estado: Pendiente / En curso / Hecho, más fecha y notas de aceptación. `01-estado-del-proyecto.md` es el resumen que se actualiza en cada entrega.

## Reglas de trabajo que quedan documentadas

- Todo el estado vive en memoria de React. Sin base de datos, sin autenticación real, sin APIs externas, sin persistencia entre recargas.
- Todo el contenido es sintético y verosímil (nombres, puntajes, ranking, preguntas de muestra sobre Santa Cruz).
- Cada cambio de alcance se registra en la bitácora antes de construirse.
- Cada construcción referencia su SPEC-XX.

## Sprint 0 — Alineación y fundaciones (se documenta ahora)

- Sistema visual cruceño: paleta cálida (verde tropical, terracota, dorado sol, crema), tipografía con carácter local, iconografía propia — nada de plantilla genérica.
- Arquitectura de pantallas y flujo principal mapeados a rutas.
- Modelo de datos simulado con tipos TypeScript.

## Sprint 1 — Identidad y onboarding (se construye ahora)

SPEC-01 a SPEC-07, pantallas P-01 a P-07:

- `/` Splash con transición automática
- `/registro` y `/login` simulados
- `/perfil-nuevo` creación de perfil
- `/avatar` selección de avatar (set predefinido)
- `/bienvenida` personalizada con nombre y avatar
- `/tutorial` 3 pasos, salteable, cierra con la pregunta gancho

Estado compartido en un contexto React en memoria (nombre, correo, avatar, puntos, insignias, progreso), sin persistencia.

## Detalles técnicos

- Rutas en `src/routes/` (TanStack Router). El Splash reemplaza el placeholder de `src/routes/index.tsx`.
- Contexto de sesión en `src/context/SessionContext.tsx`, montado en `__root.tsx`.
- Datos sintéticos en `src/data/`: `temporadas.ts`, `misiones.ts`, `preguntas.ts`, `insignias.ts`, `ranking.ts`, `avatares.ts`.
- Tokens de color y tipografía en `src/styles.css` como variables semánticas.
- Metadatos `head()` propios por ruta.

## Sprints siguientes (no se construyen ahora)

- Sprint 2: mapa de temporadas, portada de misión, motor de 5 tipos de pregunta, feedback.
- Sprint 3: resultados, reto presencial, perfil, ranking, puntos e insignias.
- Sprint 4: certificado, compartir/invitar, panel administrativo conceptual, pulido y documentos de cierre.

Al terminar cada sprint se actualizan el tablero de estado, las specs involucradas y la bitácora.
