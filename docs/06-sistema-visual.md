# Sistema visual consolidado

> Vigente desde el 31 de agosto de 2026. Identidad boliviana cálida, tropical y lúdica, aplicada a un prototipo móvil exclusivamente local.

## Paleta “Selva vibrante”

| Token                     | Rol                                                  |
| ------------------------- | ---------------------------------------------------- |
| `--primary`               | Verde selva para acciones principales y progreso     |
| `--lima`                  | Verde lima para brillos y acentos secundarios        |
| `--accent`                | Dorado sol para insignias y destacados               |
| `--secondary`             | Naranja cálido para categorías y estados secundarios |
| `--background` / `--card` | Fondos y superficies                                 |
| `--foreground`            | Texto de alto contraste                              |
| `--muted`                 | Superficies suaves y estados bloqueados              |
| `--destructive`           | Errores y pérdida de vidas, sin tono punitivo        |

Los valores estructurales viven en `src/styles.css` como variables semánticas `oklch`. Los SVG ilustrativos y los seis gajos de categoría conservan colores propios deliberados; no se usan colores fijos para sustituir tokens de interfaz.

## Tipografía

- **Baloo 2 700–800:** títulos, cifras y botones display.
- **Nunito 400–900:** cuerpo y etiquetas.
- Ambas familias se empaquetan localmente con `@fontsource` 5.3.0, subconjuntos Latin y Latin Extended.
- Escala móvil: cuerpo base de 16 px y etiquetas compactas no menores de 11 px.

## Tono verbal

- Voseo boliviano/cruceño natural, cálido y breve.
- El error se presenta como oportunidad de descubrir, nunca como castigo.
- Las capacidades inexistentes se nombran como demo, simulación, preparación o representación ilustrativa.

## Componentes y forma

- `btn-duo`: acción con borde inferior y estados hover, active y foco visible.
- `card-duo`: tarjeta redondeada con borde; `card-duo-activa` enfatiza selección/progreso.
- `barra-duo`: progreso grueso con color semántico.
- Radios de 16–24 px, iconos de línea y layout móvil centrado `max-w-md`.
- `Icono` envuelve `lucide-react`; `IconoPastilla` ofrece fondos tonales.

## Avatar explorador personalizable

### Frontend vigente

`AvatarLienzo.tsx` dibuja por capas SVG el mismo explorador joven-adulto en dos encuadres: `retrato` (viewBox 100×100) y `cuerpo` (viewBox 100×128). El catálogo de `src/data/avatar-piezas.ts` conserva 46 entradas en ocho categorías, seis tonos de piel y seis colores de cabello/vello.

- `cuerpo` se usa en `/setup` y `/avatar`; incluye mochila coral, pantalón cargo y calzado como kit base.
- `retrato` se usa en Perfil, badges, Ranking, Liga, Versus y partida; debe leerse a 40 px.
- El constructor mantiene borrador local y guarda sólo al confirmar.
- Las piezas bloqueadas muestran forma y requisito sin poder equiparse.
- Participantes sintéticos usan una combinación estable; el jugador sin configuración usa `avatarPorDefecto`.
- Las cuatro entradas `*-ninguno` representan ausencia de capa, no un asset vacío.
- Los PNG conceptuales de `public/avatar-explorador-*` no se importan: contienen fondos, chroma, damero o halos.

### Objetivo 3D

La identidad final es un explorador 3D modular, no presets fijos ni un PNG por combinación. `AvatarPersonalizado` permanece desacoplado del renderer. El contrato futuro resuelve los mismos IDs por versión, pose, encuadre, variante y plano.

El 3D sólo se activa cuando la combinación completa es compatible. Si falta una capa o falla la carga, se renderiza el avatar SVG completo; se prohíbe mezclar cabeza SVG con ropa raster 3D. `src/data/avatar-assets.ts` define actualmente rutas, canvas y variantes, pero no es todavía un manifiesto cargado ni activa un renderer 3D.

La arquitectura completa vive en `17-arquitectura-avatar-explorador-personalizable.md`; la producción, en la sección 14 de `16-handoff-generacion-assets.md`.

## Imágenes y álbum

- Portadas de temporada, misiones, hero y certificado son recursos locales con proporción intrínseca declarada.
- Las cinco estampas del álbum son SVG 400×400 cuadrados, sin texto embebido. Nombre, estado y requisito permanecen en HTML accesible.
- Perfil usa tarjetas de dos o tres columnas; Temporadas conserva filas descriptivas con estampa cuadrada.
- Los degradados se limitan a usos funcionales como Ruleta u overlays de contraste.

## Navegación

`BarraInferior.tsx` contiene cinco destinos: **Jugar, Versus, Descubrir, Ranking y Perfil**. Ruleta y reto diario se activan bajo Jugar; Liga y Equipos bajo Ranking; Avatar, Recompensas y Compartir bajo Perfil. Onboarding y partidas focalizadas pueden ocultar la barra.

## Accesibilidad y responsive

- Contenedor `min-h-dvh`, ancho máximo móvil, safe areas y espacio para la barra fija.
- Targets táctiles principales de al menos 44 px.
- Foco visible, `aria-pressed`/`aria-current`, estados ocupados y regiones vivas.
- Estadísticas 2×2 a 320 px; álbum, nivel, nombres y etiquetas permiten ajuste de línea.
- `prefers-reduced-motion` elimina esperas artificiales y reduce transiciones globales.

## Personajes de categoría

| Categoría          | Personaje  | Color funcional del gajo |
| ------------------ | ---------- | ------------------------ |
| Historia           | Cronista   | `#7C3AED`                |
| Naturaleza         | Amborín    | `#1FA94E`                |
| Gastronomía        | Cuñapé     | `#F2B008`                |
| Tradición y fiesta | Comparsera | `#E2427D`                |
| Personajes         | Taquirari  | `#DE3B2C`                |
| Santa Cruz hoy     | Urbanito   | `#2C7FF7`                |

Estos colores se limitan a Ruleta, personajes y banda de pregunta. El resto usa tokens semánticos.

## Evolución visual del 31 de agosto de 2026

La dirección vigente es **evolucionar, no rediseñar desde cero**. El contrato de feedback está en `15-evolucion-visual-feedback.md`; los contratos del avatar están en los documentos 16–17.

- Verde: acción primaria, confirmación y progreso.
- Dorado: XP, monedas, insignias y desbloqueos.
- Naranja: reto, Versus y acción secundaria.
- Rojo: fallo, tiempo agotado o pérdida.
- `scene-scrim`, `panel-scene` y `hud-chip` forman la gramática de escena.
- `opcion-juego` normaliza selección y resolución; `PartidaCinco` mantiene avatar y feedback accesible.
- `ResultadoPartida` unifica partida libre, diario y Versus con deltas reales; no inventa velocidad, percentiles ni ranking.
- `src/data/ilustraciones.ts` mantiene el manifiesto de imágenes existente.
- El tucán fusionado del hero no se recorta; se producirá como set aislado externo.
