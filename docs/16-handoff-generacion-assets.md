# Handoff para generación e integración de assets

> Fecha: 31 de agosto de 2026
> Estado: listo para producción externa
> Objetivo: continuar la generación de imágenes en otra plataforma sin depender de decisiones orales ni reinterpretar la dirección visual.

## 1. Principio rector

El producto debe sentirse como un **videojuego social de descubrimiento sobre Santa Cruz**, no como una postal turística ni como una aplicación infantil. La dirección es **evolucionar, no rediseñar desde cero**.

Conservar:

- identidad tropical y cruceña;
- verde, amarillo/dorado y naranja;
- ilustración estilizada en lugar de fotografía;
- formas amables y legibles;
- avatar joven-adulto;
- sensación de aventura contemporánea.

Los recursos nuevos deben pertenecer al mismo universo. No producir un estilo independiente para cada pantalla.

## 2. Biblia visual común

### Estilo

- Ilustración 3D estilizada de calidad editorial/videojuego casual premium.
- Formas limpias, volúmenes redondeados y materiales suaves.
- Proporciones humanas estilizadas pero adultas; evitar cabeza excesivamente grande.
- Iluminación tropical cálida, sombras suaves y profundidad atmosférica controlada.
- Color vibrante con jerarquía: verdes dominantes, dorado para recompensa, coral/naranja como acento.
- Detalles culturales bolivianos/cruceños específicos y respetuosos, nunca genéricos o caricaturizados.
- Bordes visuales limpios para recorte y lectura en móvil.

### Prompt base global

> Universo visual 3D estilizado para videojuego social de descubrimiento cultural ambientado en Santa Cruz de la Sierra, Bolivia; estética casual premium, joven-adulta, tropical y contemporánea; formas limpias y redondeadas, materiales suaves, iluminación cálida cinematográfica, colores vibrantes con verdes dominantes y acentos dorados/coral, profundidad clara entre planos, composición legible en pantalla móvil, identidad boliviana específica y respetuosa, acabado consistente entre todos los assets, sin texto ni logotipos.

### Negative prompt global

> fotografía, fotorrealismo, hiperrealismo, estética infantil preescolar, bebé, chibi extremo, cabeza desproporcionada, anime, low-poly crudo, pixel art, acuarela, collage, vector plano, estilo diferente al set, colores neón sin control, exceso de elementos, fondo ocupado detrás del sujeto, texto, letras, números, logotipo, marca de agua, bandera deformada, símbolos culturales inventados, estereotipos étnicos, manos deformes, dedos extra, extremidades duplicadas, anatomía rota, rostro inconsistente, ropa inconsistente, objetos fusionados, recorte incompleto, halo verde, chroma key, damero dibujado, fondo negro, fondo blanco rasterizado, sombra pegada al fondo, ruido, compresión, blur, aliasing.

## 3. Especificación técnica común

### Color y archivo

- Perfil: **sRGB IEC61966-2.1**.
- Profundidad: 8 bits por canal para export web; conservar master de mayor calidad si la plataforma lo permite.
- Sujetos aislados: PNG o WebP lossless con **alfa real**.
- Escenarios: WebP quality 82–88 para web y PNG/TIFF/PSD master si está disponible.
- No incrustar fondo blanco, negro, verde, damero ni halo en recursos que requieren transparencia.
- No hornear texto, botones, XP, monedas ni UI dentro de la imagen.

### Escala y consistencia

- Mantener cámara, lente aparente, escala de cabeza/cuerpo, iluminación y dirección de sombra consistentes en cada set.
- El sujeto debe caber completo dentro del lienzo con 8–12% de margen y pies visibles cuando la pose sea de cuerpo entero.
- Punto de apoyo de pies alineado entre poses.
- Sombra de contacto, si se genera, se entrega como archivo separado.
- No cambiar peinado, rasgos, tono de piel, chaqueta, mochila, pantalón o calzado entre poses salvo instrucción explícita.

### Masters y exports

Sujetos/avatar/mascota:

- master: 2048×2048 px;
- export principal: 1024×1024 px;
- miniatura: 512×512 px;
- alfa recto, bordes sin contaminación cromática;
- nombre sin sufijo para 1024; usar `@2x` para 2048 y `-512` para miniatura.

Escenarios:

- portrait master: 2160×2880 px (3:4);
- landscape master: 2880×1620 px (16:9);
- export web portrait: 1440×1920 px;
- export web landscape: 1920×1080 px;
- además, capas separadas al tamaño master: `fondo`, `medio`, `primer-plano`;
- cada capa debe conservar alfa donde corresponda y encajar exactamente al superponerse.

## 4. Avatar explorador — identidad bloqueada

### Modelo canónico

Persona joven-adulta de Bolivia, piel morena cálida, cabello negro, rasgos amables y seguros, expresión curiosa. Chaqueta verde petróleo, detalles textiles bolivianos sutiles y auténticos, mochila coral, pantalón cargo azul y zapatillas blancas. Silueta de explorador urbano contemporáneo, no uniforme escolar ni disfraz folclórico.

### Prompt maestro del avatar

> [PROMPT BASE GLOBAL]. Personaje de cuerpo entero, joven-adulto boliviano de piel morena cálida y cabello negro, rostro amable y curioso, chaqueta verde petróleo con detalles textiles bolivianos sutiles y coherentes, mochila coral, pantalón cargo azul, zapatillas blancas, explorador urbano contemporáneo, model sheet 3D estilizado casual premium, misma identidad facial y mismas proporciones en todas las vistas, iluminación principal desde arriba a la izquierda, sujeto aislado centrado, alfa transparente real, sin sombra integrada.

Añadir el negative prompt global y:

> niño, adolescente infantilizado, uniforme escolar, disfraz, traje folclórico genérico, poncho añadido sin solicitud, cambio de ropa, cambio de mochila, cambio de color, barba variable, edad variable, expresión extrema, cámara gran angular, perspectiva inconsistente, pies cortados.

### Referencia obligatoria

Las seis imágenes recibidas por chat son **dirección de arte**, no archivos productivos. Presentan damero/fondos/chroma/halos y no deben importarse. En la plataforma externa, adjuntarlas sólo como referencia de identidad y exigir regeneración con alfa real.

### Set y prompts de pose

En cada pedido, anteponer el prompt maestro y añadir sólo la instrucción de pose:

| Archivo 1024×1024                                | Instrucción específica                                                                                 | Uso previsto              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------- |
| `avatar-explorador-base-frente.png`              | Vista frontal ortográfica suave, postura neutral firme, brazos relajados, mirada a cámara.             | Ficha canónica, fallback  |
| `avatar-explorador-base-tres-cuartos.png`        | Vista tres cuartos hacia la derecha, postura de bienvenida, una mano cerca de la correa de la mochila. | Perfil, portada futura    |
| `avatar-explorador-base-perfil-derecho.png`      | Perfil derecho completo, postura neutral, silueta y mochila claramente separadas.                      | Transiciones, model sheet |
| `avatar-explorador-base-espalda.png`             | Vista posterior completa, mostrar mochila coral y detalles de la chaqueta sin cambiar diseño.          | Model sheet, recorrido    |
| `avatar-explorador-base-caminando-derecha.png`   | Caminata hacia la derecha, zancada natural, brazos coordinados, energía exploradora.                   | Navegación/escena         |
| `avatar-explorador-base-caminando-izquierda.png` | Caminata hacia la izquierda; no espejar texto ni detalles asimétricos incorrectamente.                 | Navegación/escena         |
| `avatar-explorador-base-celebra.png`             | Celebración contenida y adulta, un puño arriba, sonrisa genuina, pies apoyados.                        | Resultado positivo        |
| `avatar-explorador-base-pensando.png`            | Pose reflexiva, mano en mentón, mirada ligeramente elevada, curiosidad.                                | Pregunta/carga            |
| `avatar-explorador-base-casi.png`                | Error amable, gesto “casi”, sorpresa leve sin tristeza punitiva ni vergüenza.                          | Respuesta incorrecta      |
| `avatar-explorador-base-nivel.png`               | Subida de nivel, postura orgullosa con destellos dorados entregados en capa separada.                  | Nivel/desbloqueo          |

Para cada archivo generar también:

- `nombre@2x.png` a 2048×2048;
- `nombre-512.webp` a 512×512 lossless;
- `nombre-sombra.png` sólo si la composición requiere sombra de contacto separada.

### Control de consistencia del avatar

Aprobar el set sólo si:

- el rostro es reconociblemente el mismo en las diez poses;
- la altura aparente y el punto de pies coinciden;
- chaqueta, patrón, mochila, bolsillos y calzado no mutan;
- frontal/lateral/espalda describen un único modelo tridimensional;
- las caminatas no parecen simples espejos con detalles invertidos;
- no existen halos verdes o grises sobre fondos claros u oscuros;
- la expresión sigue siendo joven-adulta.

## 5. Tucán — mascota recurrente

### Diseño canónico

Tucán tropical 3D estilizado, amistoso, curioso y ágil; anatomía reconocible, pico expresivo pero no exagerado, paleta compatible con verde/dorado/naranja. Personalidad de guía aventurero. Puede llevar un detalle mínimo de marca —por ejemplo, pequeña bandana verde petróleo— pero no ropa compleja.

### Prompt maestro del tucán

> [PROMPT BASE GLOBAL]. Tucán tropical 3D estilizado casual premium, guía curioso y amistoso de un videojuego cultural de Santa Cruz, anatomía reconocible, pico expresivo con proporción equilibrada, ojos vivaces no infantiles, pequeño detalle verde petróleo consistente, iluminación igual al avatar, cuerpo completo aislado, alfa transparente real, sin pedestal, sin sombra integrada.

Negative adicional:

> peluche, pájaro bebé, mascota preescolar, ojos gigantes, pico deformado, alas como manos humanas, dientes, ropa compleja, múltiples accesorios, especie irreconocible, pose agresiva.

### Set requerido

| Archivo                     | Pose/expresión                                                                               | Uso                     |
| --------------------------- | -------------------------------------------------------------------------------------------- | ----------------------- |
| `tucan-guia-neutral.png`    | Posado en rama corta entregada con el sujeto, alerta y amable.                               | Onboarding/ayuda        |
| `tucan-guia-cta.png`        | Ala señalando abajo o hacia la derecha, mirada siguiendo la dirección.                       | Señalar JUGAR/continuar |
| `tucan-guia-celebra.png`    | Alas abiertas, salto breve, expresión alegre.                                                | Acierto/resultado       |
| `tucan-guia-casi.png`       | Cabeza inclinada, gesto comprensivo y alentador.                                             | Error amable            |
| `tucan-guia-diario.png`     | Con pequeño calendario físico sin texto ni número.                                           | Reto diario             |
| `tucan-guia-recompensa.png` | Junto a destellos/monedas en capa separada, sin texto.                                       | XP/desbloqueo           |
| `tucan-guia-temporada.png`  | Con brújula simple, mirando hacia adelante.                                                  | Temporadas/capítulos    |
| `tucan-guia-avatar.png`     | Composición a escala junto al avatar canónico tres cuartos; entregar ambos también aislados. | Marca/universo          |

Generar 2048, 1024 y 512 con la misma convención del avatar. Para poses direccionales, registrar en metadatos hacia dónde señalan.

## 6. Escenarios por familia

### Prompt base de escenario

> [PROMPT BASE GLOBAL]. Escenario jugable sin personajes protagonistas, composición con fondo atmosférico, plano medio reconocible y primer plano ambiental separado; zona segura central/inferior para panel de interfaz y zona superior segura para HUD; profundidad clara, lectura móvil, iluminación tropical cálida, detalles culturales y arquitectónicos fieles, sin texto, carteles legibles, logotipos ni UI. Generar versión portrait 3:4 y landscape 16:9 de la misma escena, no simples recortes; entregar composición final y capas perfectamente registradas: fondo, medio y primer plano.

### 6.1 Inicio — Santa Cruz tropical

Archivos base:

- `escena-inicio-santacruz-portrait.webp`
- `escena-inicio-santacruz-landscape.webp`
- capas con sufijos `-fondo.png`, `-medio.png`, `-primer-plano.png`.

Prompt específico:

> Santa Cruz de la Sierra como puerta de entrada a una aventura: Catedral Metropolitana reconocible en plano medio, vegetación tropical, cielo cálido, ciudad viva pero sin multitudes, sendero visual que invita a entrar, tucán no incluido porque será asset separado, zona central baja tranquila para CTA.

### 6.2 Centro histórico

Base: `escena-centro-historico-{portrait|landscape}`.

Prompt:

> Plaza 24 de Septiembre y arquitectura histórica cruceña, Catedral como hito, galerías y vegetación, sensación de exploración con pistas visuales sutiles, fidelidad arquitectónica, sin convertir la escena en postal estática.

### 6.3 Gastronomía

Base: `escena-gastronomia-{portrait|landscape}`.

Prompt:

> Mercado y mesa de descubrimiento gastronómico cruceño con ingredientes y platos reconocibles como majadito y cuñapé, composición de aventura culinaria, objetos agrupados por planos, ambiente higiénico y contemporáneo, sin marcas ni texto.

### 6.4 Naturaleza

Base: `escena-naturaleza-{portrait|landscape}`.

Prompt:

> Biodiversidad de Santa Cruz, vegetación tropical, sendero de parque o área protegida, toborochi y fauna local discreta, atmósfera de expedición y descubrimiento, sin mezclar ecosistemas incompatibles ni añadir animales fantásticos.

### 6.5 Carnaval y tradiciones

Base: `escena-carnaval-tradiciones-{portrait|landscape}`.

Prompt:

> Escenario festivo cruceño contemporáneo inspirado en carnaval y tradiciones, color, música y movimiento sugerido mediante composición, elementos culturales fieles y respetuosos, espacio despejado para UI, sin disfraces genéricos ni saturación caótica.

### 6.6 Patrimonio

Base: `escena-patrimonio-{portrait|landscape}`.

Prompt:

> Recorrido por arquitectura, museo y objetos históricos de Santa Cruz, sensación de cámara de descubrimientos y capítulo final, luz cálida, piezas claramente separadas por planos, sin texto inventado en placas o documentos.

### Variantes de estado opcionales

Sólo después de aprobar las seis escenas base:

- `-dia` y `-atardecer` cuando una temporada lo necesite;
- `-bloqueada` debe resolverse preferentemente con overlay CSS, no regenerar una escena gris;
- clima o festividad únicamente si comunica estado real del juego.

## 7. Estructura de entrega

```text
src/assets/generated/
  avatar/
    avatar-explorador-base-frente.png
    ...
  tucan/
    tucan-guia-neutral.png
    ...
  escenarios/
    inicio/
      escena-inicio-santacruz-portrait.webp
      escena-inicio-santacruz-landscape.webp
      escena-inicio-santacruz-portrait-fondo.png
      escena-inicio-santacruz-portrait-medio.png
      escena-inicio-santacruz-portrait-primer-plano.png
      ...
    centro-historico/
    gastronomia/
    naturaleza/
    carnaval-tradiciones/
    patrimonio/
  masters/
    archivos editables o exports 2048/alta resolución
```

No copiar masters pesados al bundle web si no se importan. Si se conservan en el repositorio, colocarlos fuera de `src` y documentar su peso.

## 8. Mapa de integración

| Asset              | Ubicación actual/fallback                                 | Integración futura                                                | Criterio                                        |
| ------------------ | --------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------- |
| Hero inicio        | `src/assets/hero-santacruz.jpg` en `src/routes/index.tsx` | `<picture>` con portrait/landscape y foco desde manifiesto        | No perder Catedral ni zona de CTA               |
| Escenarios         | Temporadas/misiones actuales                              | Añadir a `manifiestoIlustraciones` en `src/data/ilustraciones.ts` | Sin cambiar contratos de pantalla               |
| Avatar             | `AvatarLienzo`/`AvatarInsignia` SVG                       | Crear adaptador de pose opcional dentro de `AvatarInsignia`       | SVG permanece como fallback y personalización   |
| Avatar celebra     | Resultado común                                           | Slot opcional en `ResultadoPartida`                               | No bloquear resultado si falta                  |
| Avatar casi        | Feedback de partida                                       | Slot decorativo opcional                                          | Explicación HTML sigue siendo principal         |
| Tucán CTA          | Portada                                                   | Slot absoluto con zona segura                                     | No tapar título o botón                         |
| Tucán celebra/casi | `PartidaCinco`                                            | Slot asociado al estado                                           | Sin loop permanente                             |
| Tucán diario       | `/jugar/dia`                                              | Cabecera del modo                                                 | Sin texto dentro del asset                      |
| Tucán recompensa   | `ResultadoPartida`                                        | Junto a desbloqueos                                               | Destellos separados si se animan                |
| Tucán temporada    | `/temporadas`                                             | Cabecera/capítulo                                                 | Misma escala e iluminación                      |
| Tucán + avatar     | Onboarding/marca                                          | Composición promocional                                           | Entregar sujetos aislados además de composición |

## 9. Procedimiento de integración

1. Copiar exports aprobados en `src/assets/generated`.
2. Verificar nombres, mayúsculas y extensión exacta.
3. Abrir cada PNG/WebP sobre fondos blanco, negro, verde y magenta para detectar halos.
4. Registrar cada escenario en `manifiestoIlustraciones` con `src`, `alt`, dimensiones, relación, foco, tipo y `decorative`.
5. Implementar `<picture>` para portrait/landscape; no decidir sólo por recorte CSS cuando las composiciones son distintas.
6. Añadir poses como mejora progresiva: el SVG debe seguir funcionando si un archivo no carga.
7. Mantener sombra y efectos en capas separadas cuando deban animarse.
8. Comprimir y medir peso antes de build.
9. Ejecutar TypeScript, lint y build.
10. Smoke test a 320, 390, 430 px y desktop.

## 10. Presupuesto de peso recomendado

- avatar/tucán 1024: ideal ≤ 350 KB por WebP lossless/PNG optimizado; miniatura ≤ 120 KB;
- escenario web 1920×1080: ideal ≤ 500 KB;
- escenario web 1440×1920: ideal ≤ 650 KB;
- carga inicial de portada: no añadir todas las poses; importar sólo hero y pose visible;
- el resto debe entrar por ruta/chunk o `loading="lazy"` cuando corresponda.

Si un asset excede el presupuesto, reducir ruido, optimizar alfa o exportar WebP; no degradar bordes del personaje.

## 11. Checklist de aprobación por lote

### Arte

- [ ] El estilo coincide con el set aprobado.
- [ ] Santa Cruz es reconocible donde corresponde.
- [ ] No parece postal turística ni app infantil.
- [ ] No hay texto, marca de agua o UI horneada.
- [ ] Los detalles culturales son específicos y respetuosos.

### Técnica

- [ ] sRGB correcto.
- [ ] Dimensiones y nombres exactos.
- [ ] Alfa real y bordes limpios.
- [ ] Sin damero/chroma/fondo rasterizado.
- [ ] Escala, luz y cámara consistentes.
- [ ] Capas alineadas píxel a píxel.
- [ ] Peso dentro del presupuesto o excepción documentada.

### Producto

- [ ] El asset tiene pantalla y estado de uso definidos.
- [ ] No compite con CTA, pregunta o feedback.
- [ ] Funciona en portrait y landscape.
- [ ] La UI sigue entendible si el asset no carga.
- [ ] No introduce una métrica o función inexistente.

## 12. Orden recomendado de producción

1. **Avatar canónico:** frente, tres cuartos, perfil y espalda.
2. **Avatar funcional:** celebra, pensando, casi, nivel y caminatas.
3. **Tucán canónico:** neutral, CTA, celebra y casi.
4. **Escena de inicio:** portrait/landscape y capas.
5. **Tucán restante:** diario, recompensa, temporada y dúo.
6. **Escenarios:** centro histórico, gastronomía, naturaleza, carnaval/tradiciones y patrimonio.
7. Integración y validación del primer lote antes de producir variantes opcionales.

## 13. Regla de cierre

Un archivo no se considera listo porque “se ve transparente” en el visor. Está listo sólo si pasa inspección de alfa, consistencia, dimensiones, nombre, peso, mapa de uso y prueba sobre la interfaz real. Las referencias actuales de avatar y el tucán fusionado del hero nunca se convierten directamente en assets productivos.

## 14. Extensión obligatoria — avatar personalizable completo

> Esta sección amplía el set de diez poses. No basta con generar un único explorador fijo: el selector inicial y el editor de Perfil deben conservar cuerpo, cara, cabello, vello, prenda, sombrero, accesorio, fondo, piel y cabello elegidos por cada participante.

### 14.1 Fuente de verdad y archivos relacionados

- Arquitectura: `docs/17-arquitectura-avatar-explorador-personalizable.md`.
- Contrato de rutas: `src/data/avatar-assets.ts`.
- IDs editables: `src/data/avatar-piezas.ts`.
- Editor: `src/routes/avatar.tsx`.
- Selección rápida: `src/routes/setup.tsx`.
- Renderers SVG vigentes: `src/components/AvatarLienzo.tsx` y `AvatarInsignia.tsx`.
- Fachada 3D → SVG: arquitectura planificada; todavía no está implementada.

Los ocho slots de pieza de `AvatarPersonalizado` conservan IDs; `tonoPiel` y `colorPelo` guardan hoy hexadecimales canónicos y deberán mapearse determinísticamente a `piel-N`/`pelo-N`. Nunca se guarda una URL. Cuando exista el manifiesto, cualquier capa faltante hará que la composición completa vuelva al SVG.

### 14.2 Ubicación y fórmula exacta

```text
src/assets/generated/avatar-personalizable/v1/
  {encuadre}/
    {pose}/
      {categoria}/
        {pieceId}/
          {pieceId}--{variante}--{plano}.webp
```

Valores cerrados:

- `encuadre`: `retrato` o `cuerpo`;
- primera pose obligatoria: `neutral-frente`;
- poses posteriores: `tres-cuartos`, `camina-derecha`, `camina-izquierda`, `celebra`, `pensando`, `casi`, `nivel`;
- `plano`: `back`, `base` o `front`;
- `variante`: `base`, `piel-1`…`piel-6` o `pelo-1`…`pelo-6`.

Ejemplos exactos:

```text
src/assets/generated/avatar-personalizable/v1/cuerpo/neutral-frente/cuerpo/cuerpo-medio/cuerpo-medio--piel-3--base.webp
src/assets/generated/avatar-personalizable/v1/retrato/neutral-frente/cabello/pelo-corto/pelo-corto--pelo-1--back.webp
src/assets/generated/avatar-personalizable/v1/retrato/neutral-frente/cabello/pelo-corto/pelo-corto--pelo-1--front.webp
src/assets/generated/avatar-personalizable/v1/cuerpo/neutral-frente/prenda/prenda-tipoy/prenda-tipoy--base--base.webp
src/assets/generated/avatar-personalizable/v1/retrato/neutral-frente/sombrero/sombrero-sao/sombrero-sao--base--front.webp
src/assets/generated/avatar-personalizable/v1/cuerpo/neutral-frente/accesorio/acc-guitarra/acc-guitarra--base--back.webp
src/assets/generated/avatar-personalizable/v1/cuerpo/neutral-frente/accesorio/acc-guitarra/acc-guitarra--base--front.webp
```

No crear archivos para IDs `*-ninguno`; el manifiesto los representa como lista vacía. No entregar capas transparentes inútiles.

### 14.3 Canvas bloqueado

| Encuadre  |    Master |       Web | Pivote master | Uso                                             |
| --------- | --------: | --------: | ------------: | ----------------------------------------------- |
| `retrato` | 2048×2048 | 1024×1024 |     1024,1960 | perfil, ranking, partida, resultado, miniaturas |
| `cuerpo`  | 2048×2560 | 1024×1280 |     1024,2440 | setup y editor                                  |

Todas las capas de un mismo encuadre/pose deben tener exactamente el canvas completo, aunque el contenido ocupe una zona pequeña. Prohibido recortar cada pieza a su bounding box. Cámara, escala, pivote, FOV, rig, luz y sombra deben permanecer bloqueados.

### 14.4 Catálogo exacto que debe producirse

#### Cuerpo — plano `base`, variantes `piel-1`…`piel-6`

| ID               | Nombre  |
| ---------------- | ------- |
| `cuerpo-delgado` | Delgado |
| `cuerpo-medio`   | Medio   |
| `cuerpo-ancho`   | Ancho   |

Cada cuerpo debe conservar el mismo esqueleto, altura, cabeza y anclas; cambia constitución, no edad ni identidad.

#### Cara — plano `front`, variante `base`

| ID                 | Expresión   |
| ------------------ | ----------- |
| `cara-alegre`      | Alegre      |
| `cara-serena`      | Serena      |
| `cara-picara`      | Pícara      |
| `cara-sorprendida` | Sorprendida |
| `cara-decidida`    | Decidida    |

Las caras son expresiones del mismo explorador, no cinco personas diferentes. Deben funcionar con los seis tonos de piel; preferir morph/rig o máscara facial, no piel horneada alrededor.

#### Cabello — planos `back` + `front`, variantes `pelo-1`…`pelo-6`

| ID              | Diseño             |
| --------------- | ------------------ |
| `pelo-ninguno`  | Sin asset          |
| `pelo-corto`    | Corto              |
| `pelo-ondulado` | Ondulado           |
| `pelo-largo`    | Largo              |
| `pelo-recogido` | Recogido           |
| `pelo-rizado`   | Rizado             |
| `pelo-trenzas`  | Trenzas, cosmético |

Si un peinado no tiene geometría posterior, se omite `back`; nunca entregar un archivo vacío. Debe incluir máscara/compatibilidad con sombreros.

#### Vello facial — plano `front`, variantes `pelo-1`…`pelo-6`

| ID              | Diseño    |
| --------------- | --------- |
| `vello-ninguno` | Sin asset |
| `vello-bigote`  | Bigote    |
| `vello-candado` | Candado   |
| `vello-barba`   | Barba     |

El vello sigue el rostro y no cambia forma de mandíbula, edad o identidad de la persona.

#### Prenda — plano `base`, variante `base`

| ID                 | Diseño                                              | Región/estado         |
| ------------------ | --------------------------------------------------- | --------------------- |
| `prenda-tipoy`     | Tipoy reinterpretado para exploración contemporánea | Santa Cruz            |
| `prenda-lino`      | Camisa de lino                                      | Santa Cruz            |
| `prenda-bordada`   | Blusa bordada                                       | Santa Cruz            |
| `prenda-polera`    | Polera camba                                        | Santa Cruz            |
| `prenda-guayabera` | Guayabera                                           | cosmético por 60 XP   |
| `prenda-aguayo`    | Aguayo paceño                                       | La Paz, bloqueado     |
| `prenda-pollera`   | Pollera valluna                                     | Cochabamba, bloqueado |
| `prenda-camijeta`  | Camijeta beniana                                    | Beni, bloqueado       |
| `prenda-chacarera` | Camisa chapaca                                      | Tarija, bloqueado     |

Todas las prendas deben conservar la silueta de explorador joven-adulto y ser respetuosas. No convertir indumentaria cultural en disfraz. La mochila coral y pantalón cargo son base separada; la prenda no debe hornearlos.

#### Sombrero — plano `front` y `back` sólo si cruza detrás de la cabeza

| ID                   | Diseño            | Región/estado        |
| -------------------- | ----------------- | -------------------- |
| `sombrero-ninguno`   | Sin asset         | libre                |
| `sombrero-sao`       | Sombrero de sao   | Santa Cruz           |
| `sombrero-camba`     | Sombrero camba    | cosmético por Versus |
| `sombrero-panuelo`   | Pañuelo al cuello | Santa Cruz           |
| `sombrero-gorra`     | Gorra urbana      | Santa Cruz           |
| `sombrero-chulo`     | Chulo paceño      | La Paz, bloqueado    |
| `sombrero-montera`   | Montera potosina  | Potosí, bloqueado    |
| `sombrero-paja-beni` | Sombrero beniano  | Beni, bloqueado      |

`sombrero-panuelo` se conserva con su ID histórico aunque visualmente sea cuello; su ancla debe declararse como cuello y no cabeza.

#### Accesorio — `front`, `back` o ambos según oclusión

| ID                   | Diseño             | Planos mínimos   |
| -------------------- | ------------------ | ---------------- |
| `acc-ninguno`        | Sin asset          | ninguno          |
| `acc-semillas`       | Collar de semillas | `front`          |
| `acc-lentes`         | Lentes de sol      | `front`          |
| `acc-aretes`         | Aretes             | `front`          |
| `acc-guitarra`       | Guitarra de Cañoto | `back` + `front` |
| `acc-panuelo-tarija` | Pañuelo tarijeño   | `front`          |

La mochila coral forma parte del kit base del explorador y no reemplaza el slot `accesorio`. Debe poder ocultarse sólo si un accesorio posterior presenta conflicto documentado.

#### Fondo — plano `base`, variante `base`

| ID            | Diseño                         |
| ------------- | ------------------------------ |
| `fondo-liso`  | Superficie verde neutra        |
| `fondo-sol`   | Sol del oriente                |
| `fondo-selva` | Selva tropical estilizada      |
| `fondo-rayos` | Rayos de recompensa, cosmético |

Los fondos sólo se usan en encuadre retrato/editor y pueden ser vector/CSS si eso reduce peso. No se hornean detrás de cada pieza corporal.

### 14.5 Paletas discretas

#### Piel

| Variante | Valor de referencia |
| -------- | ------------------- |
| `piel-1` | `#F7D9BE`           |
| `piel-2` | `#EFC29A`           |
| `piel-3` | `#DDA671`           |
| `piel-4` | `#C4854F`           |
| `piel-5` | `#9A6438`           |
| `piel-6` | `#6F4426`           |

#### Cabello y vello

| Variante | Valor de referencia |
| -------- | ------------------- |
| `pelo-1` | `#1E1913`           |
| `pelo-2` | `#3D2A1B`           |
| `pelo-3` | `#6B4325`           |
| `pelo-4` | `#A9713C`           |
| `pelo-5` | `#D9A441`           |
| `pelo-6` | `#8C8C8C`           |

Preferir materiales parametrizados o máscaras tintables. Si se exportan variantes raster, deben usar exactamente estos IDs y mantener highlights/sombras; no aplicar un color plano sobre toda la textura.

### 14.6 Prompt de modelo modular

> Crear un único sistema modular 3D estilizado casual premium del explorador joven-adulto boliviano definido en este handoff. Congelar identidad facial, edad, proporciones, esqueleto, cámara, lente, escala, pivote, iluminación y materiales base. Separar cuerpo/piel, expresión facial, cabello posterior/frontal, vello, prenda, sombrero posterior/frontal, accesorio posterior/frontal, mochila coral, pantalón cargo azul y zapatillas blancas. Cada módulo debe intercambiarse sin mover cabeza, hombros, manos o pies. Detalles textiles bolivianos específicos y respetuosos. Preparar encuadre retrato cuadrado y cuerpo 4:5 desde el mismo modelo. Transparencia alfa real, sin sombra horneada, sin fondo, sin texto.

Negative adicional:

> personas distintas entre piezas, rostro distinto, edad distinta, cambio de altura, cámara distinta, FOV distinto, pose distinta, luz distinta, pieza recortada a bounding box, fondo integrado, chroma, damero, halo, ropa fusionada con piel, cabello fusionado con sombrero, accesorios flotantes, oclusión imposible, disfraz folclórico, estética infantil, cuerpo chibi, textura fotográfica, manos o pies mutantes.

### 14.7 Prompts por categoría

- **Cuerpo:** “Mantener el mismo rig y altura; variar únicamente constitución delgada/media/ancha y material de piel parametrizado; ropa, cabello y accesorios ausentes”.
- **Cara:** “Mismo rostro canónico; producir sólo expresión alegre/serena/pícara/sorprendida/decidida mediante rig facial, sin cambiar anatomía”.
- **Cabello:** “Mismo cráneo y línea de implantación; separar geometría posterior y frontal; compatibilidad con sombreros; material tintable”.
- **Vello:** “Ajustado al mismo rostro; máscara/material tintable; sin modificar edad ni mandíbula”.
- **Prenda:** “Vestir el mismo cuerpo y rig; preservar anclas de mochila y accesorios; reinterpretación contemporánea respetuosa”.
- **Sombrero:** “Usar ancla de cabeza/cuello documentada; separar plano posterior si cruza detrás del cabello; no alterar peinado base”.
- **Accesorio:** “Usar anclas de rostro, orejas, cuello, espalda o mano; separar front/back; no fusionar con prenda”.
- **Fondo:** “Composición gráfica 3D suave, sin personaje, sin UI ni texto; zona central limpia”.

### 14.8 Orden de producción del avatar personalizable

1. Congelar model sheet y rig canónico.
2. Generar `neutral-frente/cuerpo`: cuerpos, piel, base mochila/cargo/calzado.
3. Generar `neutral-frente/retrato` desde el mismo modelo.
4. Caras y seis tonos de piel.
5. Cabellos y vellos con variantes de color.
6. Cinco prendas libres de Santa Cruz.
7. Sombreros y accesorios libres.
8. Cinco cosméticos por progreso.
9. Ocho piezas regionales bloqueadas.
10. Fondos.
11. Validar todas las combinaciones en el editor antes de producir otras poses.
12. Extender pose por pose; el renderer SVG cubre cualquier pose aún incompleta.

### 14.9 Mapa de pantallas del avatar personalizable

| Pantalla/componente         | Encuadre                    | Pose                                            | Comportamiento                                |
| --------------------------- | --------------------------- | ----------------------------------------------- | --------------------------------------------- |
| `/setup`                    | cuerpo                      | neutral-frente                                  | pinta rápida + acceso al editor               |
| `/avatar` preview principal | cuerpo                      | neutral-frente                                  | combinación completa editable                 |
| `/avatar` miniaturas        | retrato                     | neutral-frente                                  | preview de una pieza sobre combinación actual |
| `/perfil`                   | retrato                     | neutral-frente                                  | identidad del jugador                         |
| `/bienvenida`               | retrato                     | tres-cuartos si está completo; fallback neutral | cierre de onboarding                          |
| `/temporadas`               | retrato                     | neutral-frente                                  | acceso al perfil                              |
| `/ranking` y `/liga`        | retrato                     | neutral-frente                                  | jugador y sintéticos                          |
| `/duelo`                    | retrato                     | neutral-frente                                  | jugador y bot demo                            |
| `PartidaCinco`              | retrato                     | pensando si está completo; fallback neutral     | identidad durante pregunta                    |
| `ResultadoPartida`          | retrato/cuerpo según layout | celebra si está completo; fallback neutral      | cierre y recompensa                           |
| Ruleta                      | retrato                     | neutral-frente                                  | marcador                                      |

### 14.10 Integración técnica después de generar

1. Copiar los archivos manteniendo la fórmula exacta.
2. Generar un manifiesto TypeScript con imports estáticos o `import.meta.glob`; no hacer fetch a rutas arbitrarias.
3. Validar que cada capa declara canvas, pivote, plano, cuerpo compatible y peso.
4. Implementar `canRenderExplorer3D(avatar, encuadre, pose)`.
5. Activar 3D sólo si la combinación completa existe.
6. Ante cualquier `onError`, volver al `SvgAvatarRenderer` completo.
7. Cargar sólo encuadre/pose/categoría visibles; no incluir cientos de capas en el chunk inicial.
8. Probar guardar, cancelar, aleatorio, bloqueos, desbloqueos y participantes sintéticos.
9. Probar sobre fondos blanco, negro, verde y magenta para detectar contaminación alfa.
10. Ejecutar lint, TypeScript, build y smoke test de `/setup`, `/avatar`, `/perfil`, `/ranking`, `/duelo` y resultados.

### 14.11 Criterio de aprobación

El lote no está completo si sólo existe el explorador base. Debe demostrarse que dos usuarios pueden elegir combinaciones distintas en setup/editor y que ambas conservan el mismo estilo 3D, edad, rostro, cámara y calidad en perfil, partida y resultado. La personalización no puede depender de una combinación fija ni perderse al cambiar de encuadre.
