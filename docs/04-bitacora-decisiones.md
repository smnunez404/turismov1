# Bitácora de decisiones

> Registro de toda definición relevante. Es la evidencia de alcance aprobado.
> Toda modificación de alcance se registra aquí **antes** de ser construida.

| Fecha | Decisión | Origen | Impacto en alcance |
| --- | --- | --- | --- |
| — | Construcción íntegra en Lovable con metodología SDD por sprints | Prestador | Ninguno |
| — | El prototipo no incorpora persistencia ni backend | Contrato, cláusula Tercera | Define naturaleza del entregable |
| 2026-08-10 | Se adopta `docs/` dentro del proyecto como base documental viva (compatible con Obsidian) | Prestador | Ninguno |
| 2026-08-10 | Todo el contenido del prototipo es sintético hasta que el cliente entregue el contenido definitivo | Cliente / Prestador | Ninguno (previsto en §11) |
| 2026-08-10 | Estado de sesión en contexto React en memoria; se reinicia al recargar | Prestador | Ninguno (previsto en §4.3) |
| 2026-08-10 | Identidad visual cruceña definida en Sprint 0: verde tropical, terracota, dorado sol, crema | Prestador | Ninguno |
| 2026-08-10 | Rutas del prototipo en español, alineadas al inventario de pantallas | Prestador | Ninguno |

## Cómo registrar una decisión

1. Anotar fecha, decisión, quién la origina e impacto en alcance.
2. Si el impacto es "cambio de alcance", no construir: generar nueva propuesta económica
   y actualización del cronograma (§5.3 del documento maestro).
3. Recién después, actualizar la spec afectada y construir.
## 10 de agosto de 2026 — Sprint 2

- Las opciones de tipo *imagen* se representan con pictogramas y texto, no con fotografías:
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
