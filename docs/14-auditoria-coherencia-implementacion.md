# Implementación de la auditoría de coherencia

> Inicio: 28 de agosto de 2026
> Estado: **completado**
> Alcance: correcciones visuales y de interacción dentro del prototipo local, sin backend,
> base de datos, persistencia, autenticación real ni integraciones externas.

## 1. Objetivo

Aplicar los hallazgos de la auditoría integral de navegación, imágenes, avatares y estados
simulados. La prioridad es que cada pantalla comunique exactamente lo que el prototipo hace,
que el recorrido nuevo y el educativo convivan sin contradicciones y que la identidad visual
se mantenga continua en móvil.

## 2. Criterios de aceptación

- El temporizador y sus textos describen el mismo comportamiento.
- Ruleta, partida libre, reto diario y versus alimentan una progresión comprensible.
- Recompensas, racha y resultados muestran únicamente valores realmente aplicados.
- La navegación principal prioriza Jugar, Versus, Descubrir, Ranking y Perfil.
- Login y onboarding legado quedan identificados y conectados como recorrido demo alternativo.
- Compartir, foto, rankings, rivales y beneficios sintéticos se rotulan como simulación.
- Baloo 2 y Nunito se cargan localmente; álbum, certificado y UI respetan el sistema visual.
- Las piezas bloqueadas del avatar se pueden reconocer, todas tienen renderer y el jugador
  aparece en Versus.
- La UI conserva targets táctiles claros y legibilidad razonable a 320 y 390 px.
- TypeScript, lint y build terminan sin errores.

## 3. Lotes de implementación

| Lote | Contenido                                                             | Estado         |
| ---- | --------------------------------------------------------------------- | -------------- |
| 1    | Verdad transaccional: tiempo, Ruleta, recompensas, racha y resultados | **Completado** |
| 2    | Navegación, onboarding legado y simulaciones                          | **Completado** |
| 3    | Tipografía, tokens, imágenes y proporciones                           | **Completado** |
| 4    | Constructor, piezas, fallbacks y presencia del avatar                 | **Completado** |
| 5    | Responsive, accesibilidad y movimiento reducido                       | **Completado** |
| 6    | Documentación consolidada y QA técnico                                | **Completado** |

## 4. Decisiones adoptadas

1. El proyecto continúa siendo un prototipo visual íntegramente local.
2. La barra principal queda en cinco destinos: **Jugar, Versus, Descubrir, Ranking y Perfil**.
   Ruleta y reto diario son modos internos de Jugar; Recompensas pertenece a Perfil.
3. Ranking histórico y Liga semanal conservan rutas separadas, pero se presentarán como dos
   vistas del mismo espacio competitivo.
4. El tiempo del desafío rápido sí puede cerrar la respuesta; la interfaz lo advertirá y los
   demás desafíos mantendrán el tiempo como referencia.
5. La edición del avatar será transaccional: los cambios se previsualizan localmente y se
   aplican al confirmar.
6. Las fuentes se incorporarán como recursos locales del bundle, sin depender de una CDN.
7. Las acciones que no ejecutan una capacidad real se nombrarán explícitamente como demo.

## 5. Registro de avance

### 28 de agosto de 2026 — Preparación

- Se revisaron documento maestro, estado, sistema visual, inventario de pantallas, specs y plan
  de rediseño antes de modificar código.
- Se inventariaron 26 rutas y 24 assets fuente.
- Se confirmó que no hay enlaces a rutas inexistentes ni assets claramente faltantes.
- Se verificó el estado inicial: TypeScript y build correctos; ESLint sin errores y con ocho
  advertencias de Fast Refresh.
- Se creó este registro para documentar cada lote antes del cierre.

### 28 de agosto de 2026 — Lote 1: verdad transaccional

- Los desafíos rápidos ahora explican que el tiempo sí cierra la respuesta; los demás lo
  presentan como referencia de ritmo. El feedback distingue explícitamente el vencimiento.
- El resumen de partida conserva el resultado real de cada desafío y la sesión deja de marcar
  como correctos los fallos.
- La Ruleta cuenta como partida para monedas, insignia inicial, álbum y desbloqueos de avatar,
  además de mantener XP, liga y medallas por categoría.
- La racha vacía comienza en cero y el primer reto diario produce el día uno.
- La práctica diaria deja de anunciar XP y monedas ya cobrados.
- El beneficio de nivel Explorador exige realmente 100 XP.
- Los resultados de misión separan el mejor puntaje histórico del XP añadido en el último
  intento, evitando mostrar una recompensa inexistente al repetir.
- TypeScript terminó correctamente después del lote.

### 28 de agosto de 2026 — Lote 2: navegación y simulaciones

- La barra inferior prioriza Jugar, Versus, Descubrir, Ranking y Perfil. Ruleta y diario se
  mantienen dentro del hub Jugar; Avatar, Recompensas y Compartir activan Perfil.
- Landing ofrece un acceso secundario al recorrido demo con progreso. Login conduce a invitado
  y también enlaza explícitamente el onboarding clásico, eliminando las rutas huérfanas.
- Ranking XP y Liga semanal se presentan como dos vistas del mismo espacio competitivo.
- Resultados de misión deja una sola continuación dominante; ranking, tarjeta y perfil quedan
  agrupados en “Más opciones”.
- Compartir se renombró y reescribió como preparación de tarjeta/invitaciones demo. La insignia
  Promotor se aplica al confirmar la simulación y la pantalla declara que no publica ni envía.
- El reto presencial usa un selector local real con vista previa y aclara que la foto no sale
  del navegador ni se conserva.
- Ruleta y Versus advierten que abandonar no devuelve la vida. La recarga patrocinada queda
  rotulada como demo y cortesía ilustrativa.
- TypeScript terminó correctamente después del lote.

### 28 de agosto de 2026 — Lote 3: sistema visual

- Se añadieron `@fontsource/baloo-2@5.3.0` y `@fontsource/nunito@5.3.0` con versiones exactas.
  Las fuentes se empaquetan localmente y sólo se cargan subconjuntos latino/latino extendido.
- El certificado deja de usar serif y adopta el display Baloo 2 del resto de la marca.
- Landing, Ruleta y estados bloqueados reemplazan blancos fijos por tokens semánticos.
- Hero, marca, bienvenida y portada de misión declaran relaciones intrínsecas coherentes.
- Las cinco estampas del álbum se redibujaron como composiciones cuadradas, planas, sin
  degradados ni texto Arial embebido; nombre y explicación permanecen en HTML accesible.
- El build de producción confirmó la inclusión local de las fuentes y los nuevos SVG.

### 28 de agosto de 2026 — Lote 4: sistema de avatares

- El constructor trabaja sobre un borrador local. Piezas, colores y combinación aleatoria sólo
  actualizan la sesión al pulsar “Guardar: este soy yo”; volver descarta el borrador.
- Las opciones bloqueadas conservan el candado y el mensaje de requisito, pero su miniatura
  muestra la pieza real en lugar de repetir la pieza equipada.
- Se completó la anticipación regional con camijeta y sombrero benianos, camisa y pañuelo
  tarijeños, y renderers específicos para chulo paceño y montera potosina.
- `AvatarInsignia` usa una sola jerarquía visual: avatar configurado, avatar sintético estable
  para participantes ilustrativos y avatar por defecto para el jugador sin configuración.
- Ranking y Liga ya no generan al jugador desde su nombre ni importan un fallback propio.
- Versus presenta al jugador y a Cambita Curioso en el lobby y mantiene ambas identidades
  visibles durante la partida.
- TypeScript terminó correctamente después del lote.

### 28 de agosto de 2026 — Lote 5: responsive y accesibilidad

- El hub Jugar presenta sus cuatro estadísticas en una cuadrícula 2×2 en móvil y vuelve a
  cuatro columnas en pantallas amplias; las etiquetas subieron de 9/10 px a un mínimo de 11 px.
- Perfil endurece el ajuste de nombres, correo, nivel, valores e insignias. Sus enlaces compactos
  tienen un área táctil mínima de 44 px.
- El álbum dejó la cuadrícula de cinco miniaturas y el contenido exclusivo en `title`: usa dos o
  tres columnas y muestra nombre, estado o requisito como texto visible para touch y lectores.
- Ruleta conserva un nombre accesible durante el giro, expone `aria-busy` y anuncia giro,
  categoría y feedback mediante regiones de estado dedicadas.
- El resumen final recibe el foco; “Casi…” usa el carácter de elipsis y los controles Bomba y
  Volver cumplen el mínimo táctil.
- `prefers-reduced-motion` elimina tanto la transición de la rueda como su espera de 2,6 s y
  reduce las transiciones globales sin cambiar el resultado sorteado.
- La revisión estática no encontró `title`, textos de 9 px ni tres puntos consecutivos en Hub,
  Perfil o Ruleta. TypeScript terminó correctamente después del lote.

### 28 de agosto de 2026 — Lote 6: consolidación documental y QA

- README, estado del proyecto, inventario de pantallas y sistema visual quedaron alineados con
  28 IDs de pantalla/estado, 26 rutas reales y la barra Jugar/Versus/Descubrir/Ranking/Perfil.
- Se eliminaron referencias vigentes a Fraunces/Outfit, seis avatares PNG, barra de cuatro
  destinos, splash automático y capacidades externas reales.
- Las specs de Landing, Login, reto presencial, compartir, Hub, medallas, racha, Liga y Equipos
  ahora describen el comportamiento implementado y sus límites de simulación.
- La presentación restante del álbum en Temporadas se corrigió de 640×400 a cuadrada; Perfil y
  Temporadas declaran 640×640 y usan los SVG planos como fuente única.
- El primer lint encontró 21 errores exclusivamente de formato Prettier en cuatro rutas. Se
  formatearon esos archivos con el binario local y se repitió todo el QA.
- Resultado final: ESLint con 0 errores y 8 advertencias no bloqueantes de Fast Refresh;
  TypeScript correcto; build cliente/SSR correcto con fuentes locales y SVG incluidos.
- npm había informado 3 vulnerabilidades altas al instalar las fuentes. No se ejecutó
  `npm audit fix` para evitar actualizaciones de dependencias fuera del alcance.
- El build conserva un aviso no bloqueante de Vite 8 sobre migrar `vite-tsconfig-paths` a su
  resolución nativa.
- La revisión semántica posterior al QA detectó y permitió corregir cinco inconsistencias:
  polaridad del blocker de historial, retorno del onboarding desde Avatar, cobro de cada intento
  de Versus, rótulo persistente del bot y rótulos demo en Liga/Ruleta.
- El proyecto no define runner ni suite de pruebas de aplicación; por instrucción de alcance no
  se añadió infraestructura de tests. Las transiciones se verificaron estáticamente y mediante
  lint, tipos y build después de corregirlas.

## 6. Validación final

- [x] Revisión estática del recorrido principal.
- [x] Revisión estática de Descubrir → certificado.
- [x] Revisión del constructor y sus piezas bloqueadas.
- [x] ESLint: 0 errores; 8 advertencias de Fast Refresh documentadas.
- [x] TypeScript: `tsc --noEmit` correcto.
- [x] Build de producción cliente y SSR correcto.

## 7. Cierre

Los criterios de aceptación de esta auditoría quedaron implementados y documentados. La
validación técnica está cerrada; la prueba visual con stakeholder y en dispositivos físicos
permanece como actividad externa al alcance de esta ejecución.
