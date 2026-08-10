# Sistema visual — Sprint 0

Identidad cruceña auténtica: cálida, tropical, con carácter. Nada de plantilla
internacional ni degradados genéricos.

## Paleta

| Token | Rol | Referencia |
| --- | --- | --- |
| `--primary` | Verde tropical profundo (selva chiquitana) | acciones principales, encabezados |
| `--accent` | Dorado sol cruceño | insignias, puntos, destaques |
| `--secondary` | Terracota / teja colonial | acentos cálidos, estados secundarios |
| `--background` | Crema arena | fondo general |
| `--foreground` | Marrón tierra oscuro | texto |
| `--muted` | Arena tenue | superficies suaves, estados bloqueados |
| `--destructive` | Rojo teja intenso | errores (tono cálido, nunca punitivo) |

Todos los valores se definen en `src/styles.css` como variables semánticas en `oklch`.
Los componentes nunca usan colores fijos como `text-white` o `bg-[#...]`.

## Tipografía

- Títulos: Fraunces (display con personalidad, peso alto).
- Cuerpo: Outfit (sans humanista, alta legibilidad en móvil).
- Escala móvil primero: cuerpo 16px, títulos de pantalla 28–34px.

## Tono verbal

- Voseo cruceño natural y cálido: "¿Qué tan buen embajador de Santa Cruz sos?".
- Nunca punitivo. El error se nombra como descubrimiento.
- Frases cortas; una idea por pantalla.

## Iconografía y forma

- Bordes generosos (radius 16–24px), tarjetas con sombra suave.
- Íconos de línea con acentos sólidos en dorado.
- Layout móvil: ancho máximo tipo teléfono centrado, incluso en escritorio.

## Reglas de composición

- Una acción principal por pantalla, siempre visible sin scroll.
- Progresión visible de forma permanente durante las misiones.
- Estados bloqueados visibles pero apagados, para generar deseo de completar.