# Contenido de muestra (sintético)

Todo el contenido del prototipo es **sintético y verosímil**. El contenido definitivo será
preparado por el cliente (§11 del documento maestro). Este inventario permite verificar
que la estructura soporta el volumen real esperado.

## Volumen objetivo vs. muestra

| Concepto                 | Volumen definitivo estimado | Muestra en el prototipo                |
| ------------------------ | --------------------------- | -------------------------------------- |
| Preguntas                | 40–50                       | 8 por misión en M1–M4 + 1 reto en M5   |
| Imágenes                 | 30–50                       | ilustraciones y marcadores de posición |
| Insignias                | 5 + especiales              | 5 por misión + 3 especiales            |
| Participantes de ranking | reales                      | 12 ficticios                           |
| Avatares                 | por confirmar               | 6 predefinidos                         |

## Avatares (muestra)

Set de 6 avatares con estética cruceña: toborochi, sombrero de sao, tipoy, guitarra de
Cañoto, tucán y jaguar.

## Ranking (muestra)

12 participantes ficticios con nombres bolivianos verosímiles y puntajes distribuidos
alrededor del rango alcanzable por el usuario, para que su posición se mueva de forma
creíble durante la demostración.

## Preguntas por misión

| Misión                      | Tipos representados       | Cantidad de muestra |
| --------------------------- | ------------------------- | ------------------- |
| M1 Los Orígenes             | múltiple, verdadero/falso | 8                   |
| M2 El Corazón de Santa Cruz | múltiple, imagen          | 8                   |
| M3 Explorador del Destino   | imagen                    | 8                   |
| M4 Soy un Buen Anfitrión    | caso práctico             | 8                   |
| M5 Mi Primera Aventura      | reto presencial           | 1                   |

Toda pregunta lleva retroalimentación corta obligatoria, tanto para aciertos como para
errores (SPEC-11).

## Advertencia visible en el prototipo

El ranking y el certificado indican de forma discreta que los datos son de demostración.

## Banco de preguntas (Sprint 2) — `src/data/preguntas.ts`

| Misión                      | Preguntas | Variantes cubiertas                     |
| --------------------------- | --------- | --------------------------------------- |
| M1 Los Orígenes             | 8         | múltiple, verdadero/falso, imagen, caso |
| M2 El Corazón de Santa Cruz | 8         | múltiple, verdadero/falso, imagen, caso |
| M3 Explorador del Destino   | 8         | múltiple, verdadero/falso, imagen, caso |
| M4 Soy un Buen Anfitrión    | 8         | múltiple, verdadero/falso, imagen, caso |
| M5 Mi Primera Aventura      | 1         | reto (se juega en Sprint 3)             |

Todas las preguntas valen 10 puntos y llevan retroalimentación obligatoria.

## Contenido sintético de la Fase 2

| Conjunto            | Archivo                         | Cantidad             |
| ------------------- | ------------------------------- | -------------------- |
| Categorías cruceñas | `src/data/categorias.ts`        | 6                    |
| Preguntas rápidas   | `src/data/preguntas-rapidas.ts` | 36 (6 por categoría) |
| Equipos por zona    | `src/data/equipos.ts`           | 6                    |
| Rivales de duelo    | `src/data/equipos.ts`           | 4                    |
| Auspiciadores       | `src/data/auspiciadores.ts`     | 6                    |
| Premios canjeables  | `src/data/auspiciadores.ts`     | 6                    |

Todos los nombres de marcas son ficticios y deben sustituirse al firmar acuerdos reales.
