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
## Sistema de íconos e ilustraciones (actualización 10 de agosto de 2026)

Se eliminan los emojis de toda la interfaz. Motivo: los emojis se renderizan distinto en
cada sistema operativo, rompen la paleta de marca y dan aspecto genérico.

### Íconos

- Fuente única: `lucide-react`, envuelto en `src/components/Icono.tsx`.
- El componente expone nombres semánticos en español (`mapa`, `brujula`, `bloqueado`,
  `medalla`, `certificado`, `objetivo`, `ojo`, `arbol`, `palmera`, `ave`, `agua`, etc.)
  mapeados a íconos de Lucide. Los datos guardan la clave, nunca el ícono importado.
- `IconoPastilla` renderiza el ícono dentro de un contenedor redondeado con fondo tonal
  (`primary`, `secondary`, `muted`) para encabezados, insignias y tarjetas destacadas.
- Trazo de línea, color siempre por token semántico. Prohibido `text-white`/`bg-[#...]`.
- Los pictogramas de las preguntas tipo "imagen" también usan `Icono`; cada opción guarda
  `icono` y `texto` por separado en `src/data/preguntas.ts`.

### Avatares

- Seis ilustraciones vectorizadas propias en `src/assets/avatares/` (PNG transparente
  512×512): toborochi, sombrero de sao, tipoy, guitarra de Cañoto, tucán y jaguar.
- `src/data/avatares.ts` referencia la imagen importada; el tipo `Avatar` usa `imagen`
  en lugar del antiguo `simbolo`.
- `AvatarInsignia` muestra la ilustración y cae a un `Icono` cuando no hay imagen.

### Marca

- `src/assets/marca-embajador.png`: toborochi dentro de un pin de mapa. Se usa en el
  splash (P-01), en el certificado (P-16) y como favicon (`public/favicon.png`).
