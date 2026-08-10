# Sistema visual — Sprint 0

Identidad cruceña auténtica: cálida, tropical, con carácter. Nada de plantilla
internacional ni degradados genéricos.

## Paleta (actualizada 10 de agosto de 2026 — "Selva vibrante")

Tras la validación de estilo con la cliente se adoptó una paleta más saturada, de energía
de juego (referencia Duolingo) sobre fondo blanco, conservando el verde y el dorado sol
cruceños.

| Token | Rol | Referencia |
| --- | --- | --- |
| `--primary` | Verde selva saturado (#58cc02 aprox.) | botones y acciones principales |
| `--lima` | Verde lima (#a6e22e aprox.) | brillos, barras de progreso, acentos |
| `--accent` | Dorado sol (#ffc800 aprox.) | insignias, puntos, destaques |
| `--secondary` | Naranja cruceño legible | etiquetas y estados secundarios |
| `--background` | Blanco verdoso casi puro | fondo general |
| `--foreground` | Verde tierra oscuro | texto |
| `--muted` | Gris verdoso claro | superficies suaves, estados bloqueados |
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

## Ilustraciones (10 de agosto de 2026)

Ilustraciones planas vectoriales generadas para el prototipo, mismo lenguaje que la paleta
(verde selva, lima, dorado; formas redondeadas, sin texto):

- `src/assets/temporadas/t1..t5.jpg` — portada de cada temporada (mapa P-08).
- `src/assets/misiones/m1..m5.jpg` — banner de cada misión de la Temporada 1 (P-09).
- `src/assets/hero-santacruz.jpg` — splash (P-01) y bienvenida (P-06).
- `src/assets/certificado-fondo.jpg` — marco decorativo del certificado (P-16).
- El mapeo id → imagen vive en `src/data/ilustraciones.ts`.

## Navegación principal

`src/components/BarraInferior.tsx` es una barra fija inferior de 4 ítems (Aprender,
Ranking, Logros, Perfil), presente en P-08, P-14, P-15 y P-16 mediante la prop `conNav`
de `Pantalla`. Reemplaza la antigua grilla de accesos del mapa de temporadas. Las
pantallas de onboarding y de juego no la muestran para no romper el foco.

## Actualización de estilo — referencia Duolingo (10 de agosto de 2026)

Referencia: https://design.duolingo.com/. Se adopta el lenguaje "juguetón pero claro"
de Duolingo, traducido al tono cruceño (verde tropical, dorado sol, terracota).

### Tipografía

- Títulos: **Baloo 2** (display redondeada, peso 700–800).
- Cuerpo: **Nunito** (400–900). Reemplazan a Fraunces/Outfit.

### Componentes base (utilidades en `src/styles.css`)

| Utilidad | Uso |
| --- | --- |
| `btn-duo` + `btn-duo-primary/secondary/accent/ghost` | Botón con volumen: borde inferior de 4px, mayúsculas, se hunde al presionar |
| `card-duo` / `card-duo-activa` | Tarjeta con borde 2px y base 4px; la variante activa tiñe el borde de primario |
| `barra-duo` / `barra-duo-fill` | Barra de progreso gruesa (16px) con brillo interior |

### Reglas

- Un solo botón principal por pantalla, ancho completo.
- En la lección (P-10/P-11) la acción y el feedback viven en una barra fija al pie,
  con `env(safe-area-inset-bottom)`; el contenido lleva `pb-40` para no quedar tapado.
- Opciones de respuesta: tarjetas grandes con estado seleccionado / correcto / incorrecto.
- Nodos de misión de 48px, mobile first, contenedor centrado `max-w-md`.
- Se mantiene la regla de tokens semánticos: nada de `text-white` ni `bg-[#...]`.

## Personajes de categoría (ruleta)
| Categoría | Personaje | Color de gajo |
|---|---|---|
| Historia | Cronista | #7C3AED |
| Naturaleza | Amborín | #1FA94E |
| Gastronomía | Cuñapé | #F2B008 |
| Tradición y fiesta | Comparsera | #E2427D |
| Personajes | Taquirari | #DE3B2C |
| Santa Cruz hoy | Urbanito | #2C7FF7 |

Estos colores son exclusivos de la ruleta y de la banda de pregunta; el resto de la UI sigue usando los tokens semánticos de la paleta Selva vibrante.
