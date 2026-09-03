# Bitácora de decisiones

> Registro de toda definición relevante. Es la evidencia de alcance aprobado.
> Toda modificación de alcance se registra aquí **antes** de ser construida.

| Fecha      | Decisión                                                                                           | Origen                     | Impacto en alcance               |
| ---------- | -------------------------------------------------------------------------------------------------- | -------------------------- | -------------------------------- |
| —          | Construcción íntegra en Lovable con metodología SDD por sprints                                    | Prestador                  | Ninguno                          |
| —          | El prototipo no incorpora persistencia ni backend                                                  | Contrato, cláusula Tercera | Define naturaleza del entregable |
| 2026-08-10 | Se adopta `docs/` dentro del proyecto como base documental viva (compatible con Obsidian)          | Prestador                  | Ninguno                          |
| 2026-08-10 | Todo el contenido del prototipo es sintético hasta que el cliente entregue el contenido definitivo | Cliente / Prestador        | Ninguno (previsto en §11)        |
| 2026-08-10 | Estado de sesión en contexto React en memoria; se reinicia al recargar                             | Prestador                  | Ninguno (previsto en §4.3)       |
| 2026-08-10 | Identidad visual cruceña definida en Sprint 0: verde tropical, terracota, dorado sol, crema        | Prestador                  | Ninguno                          |
| 2026-08-10 | Rutas del prototipo en español, alineadas al inventario de pantallas                               | Prestador                  | Ninguno                          |

## Cómo registrar una decisión

1. Anotar fecha, decisión, quién la origina e impacto en alcance.
2. Si el impacto es "cambio de alcance", no construir: generar nueva propuesta económica
   y actualización del cronograma (§5.3 del documento maestro).
3. Recién después, actualizar la spec afectada y construir.

## 10 de agosto de 2026 — Sprint 2

- Las opciones de tipo _imagen_ se representan con pictogramas y texto, no con fotografías:
  el prototipo no incorpora archivos de imagen reales (guardarraíl §5).
- La misión 5 aparece en el mapa pero su reto presencial se juega en el Sprint 3.
- El cierre de misión muestra un resumen inline; la pantalla completa de resultados
  (SPEC-12) corresponde al Sprint 3.
- Repetir una misión no descuenta puntos: se conserva el mejor puntaje obtenido.
- Insignia "Memoria de Elefante" se otorga al completar una misión sin errores.

## 10 de agosto de 2026 — Sprint 3

- Escala de niveles definida en 5 tramos (0 / 80 / 160 / 240 / 320 puntos); es contenido
  del prototipo y puede recalibrarse con el contenido definitivo.
- El reto presencial exige tres señales para considerarse cumplido: lugar elegido, foto
  simulada y relato de al menos una frase. La foto nunca se guarda.
- Invitar amigos es opcional y otorga la insignia "Promotor Cruceño"; la pantalla completa
  de compartir e invitar (SPEC-17) queda para el Sprint 4.
- Completar las 5 misiones otorga la insignia "Embajador de Santa Cruz" y habilita el
  certificado (SPEC-16, Sprint 4).
- Recordatorio de alcance: al recargar la página el progreso se reinicia (sin persistencia).

## 10 de agosto de 2026 — Sprint 4

- El certificado no se descarga ni se genera como PDF: se diseña para captura de pantalla,
  coherente con el guardarraíl de "sin backend ni archivos generados".
- Se agrega un código de certificado simulado con formato `SEB-T1-<iniciales>-<puntaje>`
  para dar credibilidad visual; no verifica nada.
- Compartir exige al menos una misión completada; el certificado exige la temporada entera.
- El panel administrativo se construye como vista de escritorio y estática, con un aviso
  permanente de que es conceptual, para evitar que el cliente lo interprete como funcional.
- La lista de amigos sugeridos se centraliza en `src/data/comunidad.ts` porque la usan el
  reto presencial (P-13) y la pantalla de compartir (P-17).

## 10 de agosto de 2026 — Profesionalización visual (post Sprint 4)

- Se retiran todos los emojis de la interfaz y de los datos sintéticos. Quedan reemplazados
  por el sistema de íconos `Icono`/`IconoPastilla` basado en `lucide-react`.
- Los datos (`temporadas`, `insignias`, `comunidad`, `preguntas`, secciones de admin y pasos
  del tutorial) guardan claves de ícono en español, no glifos, para que un cambio de set
  gráfico no obligue a tocar las pantallas.
- Las preguntas tipo "imagen" separan `texto` e `icono`; se agregó `icono?: string` a la
  opción en `src/data/tipos.ts`.
- Los avatares pasan de emoji a ilustración propia (PNG transparente). El tipo `Avatar`
  cambia `simbolo` por `imagen`.
- Se crea una marca gráfica (toborochi + pin) usada en splash, certificado y favicon; se
  elimina `public/favicon.ico` por defecto.

## 10 de agosto de 2026 — Lenguaje visual tipo Duolingo

**Decisión.** Adoptar el sistema de interacción de Duolingo (botones con volumen,
tarjetas gruesas, tipografía redondeada, barra de acción fija en la lección) sobre la
paleta cruceña ya definida.

**Motivo.** La UI se veía correcta pero plana y genérica; el producto es gamificado y
necesita affordances físicas y lecturas rápidas en móvil.

**Implicancias.** Fuentes cambian a Baloo 2 + Nunito; se crean utilidades `btn-duo`,
`card-duo` y `barra-duo` en `src/styles.css` y se aplican en todas las pantallas
(P-01 a P-18). No cambia ninguna regla de negocio ni el modelo de datos.

## 10 de agosto de 2026 — Paleta "Selva vibrante", ilustraciones y menú inferior

- **Paleta.** Se cambia a verde selva saturado + lima + dorado sol sobre blanco (referencia
  Duolingo), decidido por la cliente. Se agrega el token `--lima`. Motivo: la paleta crema
  anterior se leía editorial y poco "juego".
- **Ilustraciones.** Se generan 12 ilustraciones planas propias (5 temporadas, 5 misiones,
  hero y marco de certificado) en lugar de fotografía de stock, para mantener coherencia de
  marca y evitar derechos de imagen.
- **Navegación.** Se agrega barra inferior fija de 4 ítems (Aprender, Ranking, Logros,
  Perfil) en las pantallas de recorrido, y se elimina la grilla de accesos del mapa de
  temporadas por redundante.

## Fase 2 — Modo Preguntados y modelo de negocio

- **Se adopta la mecánica de Preguntados** (ruleta de categorías, medallas y duelo) como
  capa diaria sobre las misiones narrativas, porque el MVP se agotaba al terminar la temporada.
- **Liga semanal con reinicio los lunes** en vez de un ranking histórico único: evita que
  los usuarios nuevos queden descolgados de forma permanente. El ranking general se conserva.
- **Equipos por zona de Santa Cruz** como motor social, apoyados en la identidad de barrio.
- **Auspiciadores nunca intrusivos**: entran como categoría presentada, premio de liga,
  cupón o vida invitada. No hay banners ni interrupciones dentro de una pregunta.
- **Auspiciadores y premios ficticios** hasta cerrar acuerdos comerciales; la interfaz lo
  declara de forma explícita.
- **Notificaciones fuera del prototipo** (SPEC-29): requieren backend y consentimiento.
- **Menú inferior ampliado a 5 ítems** (Aprender, Jugar, Liga, Premios, Perfil), con
  etiquetas de 10 px para no colisionar en pantallas de 390 px.

## Ruleta estilo Preguntados (personajes y color por categoría)

- Se adopta la referencia visual de Preguntados para P-20: rueda de gajos de color, botón central, personajes por categoría, temporizador y comodines.
- Los personajes son ilustraciones propias sintéticas (`src/assets/personajes/*.png`), no marcas de terceros.
- El color de cada categoría vive en `src/data/personajes.ts` (capa de presentación) y no reemplaza los tokens semánticos del sistema visual.

## Constructor de avatar por capas (SPEC-32)

- El avatar deja de ser una imagen fija: se arma con piezas SVG (cuerpo, cara, cabello, vello, prenda, sombrero, accesorio, fondo) más tono de piel y color de cabello.
- Motivo: la identidad del jugador es el gancho emocional del producto y permite vestir al personaje con prendas típicas cruceñas (tipoy, sombrero de sao, guayabera).
- Las piezas de otras ciudades (La Paz, Cochabamba, Potosí, Beni, Tarija) se muestran bloqueadas como anticipo de temporadas futuras.
- Se eligió SVG en vez de PNG por peso, nitidez y porque permite recolorear sin generar arte nuevo.
- Los 6 presets previos se conservan para los participantes sintéticos de ranking, liga y duelo.

## 28 de agosto de 2026 — Corrección integral de coherencia

- Se aprueba aplicar la auditoría visual y de navegación sin ampliar el alcance técnico: el
  prototipo continúa sin backend, base de datos, persistencia ni integraciones reales.
- La navegación primaria se fija para esta validación en **Jugar, Versus, Descubrir, Ranking
  y Perfil**. Ruleta y reto diario quedan dentro de Jugar; Recompensas queda dentro de Perfil.
- Las simulaciones de compartir, selección de foto, rankings, rivales y beneficios deben
  declararse en el mismo punto de interacción, no solamente en la Landing.
- El avatar por capas se convierte en la representación única para jugador y participantes
  sintéticos. Las piezas regionales bloqueadas deben ser reconocibles antes de desbloquearse.
- Baloo 2 y Nunito se cargarán desde el bundle local para preservar el sistema visual sin
  dependencia de una CDN.
- El detalle de implementación y validación queda registrado en
  `14-auditoria-coherencia-implementacion.md`.

## 31 de agosto de 2026 — Evolución visual posterior a la presentación

- Se adopta el feedback de dirección como un **refresh**, no un rediseño: conservar identidad tropical/cruceña, paleta, tipografías, navegación y componentes base.
- Verde queda reservado para acción principal/progreso; dorado para XP/recompensa; naranja para reto/acción secundaria; rojo para fallo o pérdida.
- La portada se reorganiza como escena de juego con HUD, panel semisólido y CTA verde. El hero actual continúa como fallback y declara su proporción cuadrada real.
- Partida libre, diario y Versus comparten `ResultadoPartida`: avatar, cinco resultados, recompensas reales, nivel, racha y desbloqueos derivados de snapshots de sesión.
- Se elimina la posición sintética de los cierres principales. No se mostrarán velocidad, percentiles ni ranking real sin una fuente de datos real.
- `AvatarLienzo` y `AvatarInsignia` permanecen como representación funcional y fallback. No se reemplazan por las referencias 3D recibidas porque contienen damero, chroma/fondos y halos.
- El tucán fusionado en el hero no se recorta. Avatar 3D, tucán y seis familias de escenarios se producirán externamente según `16-handoff-generacion-assets.md`.
- Se prohíbe fingir profundidad duplicando el mismo JPEG, mezclar fotografía sin sistema, hornear UI en imágenes o usar animación decorativa permanente.
- El alcance sigue siendo exclusivamente frontend local, sin backend, base de datos ni persistencia.

## 31 de agosto de 2026 — Explorador personalizable 3D con fallback SVG completo

- Todo avatar —jugador, invitado y participante sintético— adopta el lenguaje del explorador joven-adulto.
- `AvatarPersonalizado` conserva los ocho IDs de pieza como fuente funcional. Piel y cabello conservan hoy valores hexadecimales canónicos y deberán mapearse determinísticamente a las variantes de assets.
- Se mantienen 46 entradas de catálogo, seis tonos de piel, seis colores de cabello/vello, inventario, aleatorio y desbloqueos. No se reduce el editor a presets fijos.
- `AvatarLienzo` SVG en `retrato`/`cuerpo` es la implementación vigente y el fallback permanente, no una identidad visual alternativa.
- El acabado 3D será modular. Sólo se activa cuando la combinación completa de avatar, pose y encuadre esté disponible y sea compatible; cualquier faltante o error vuelve al SVG completo.
- Se prohíbe mezclar capas SVG y raster 3D, guardar URLs en sesión, usar los PNG conceptuales como assets o generar archivos vacíos para selecciones `*-ninguno`.
- La pose es presentación; no forma parte del estado editable. `retrato` y `cuerpo` se producen como encuadres distintos desde el mismo modelo.
- `docs/17-arquitectura-avatar-explorador-personalizable.md` gobierna arquitectura y la sección 14 de `docs/16-handoff-generacion-assets.md` gobierna producción.
- Assets 3D, manifiesto, fachada híbrida, carga progresiva y QA visual permanecen en backlog; no se presentan como implementados.

## 31 de agosto de 2026 — Economía local de cosméticos del explorador

- Los cinco cosméticos especiales pueden obtenerse por dos vías: cumplir su requisito de progreso sin costo o comprarlos con monedas de la sesión.
- Los precios son declarativos en `src/data/coleccion.ts`; el reducer resuelve el precio por ID, valida saldo e inventario y evita cobros duplicados.
- La compra añade la pieza a `inventarioAvatar`, descuenta monedas y la habilita para previsualizarla, guardarla o incluirla en “Sorprendeme”.
- Las piezas regionales no se venden y permanecen reservadas para temporadas futuras.
- La tienda vive dentro de `/avatar`; Perfil muestra requisito/precio y enlaza al editor. `/recompensas` conserva su catálogo separado de cupones demostrativos.
- Compra, monedas e inventario continúan exclusivamente en memoria y se reinician al recargar.
