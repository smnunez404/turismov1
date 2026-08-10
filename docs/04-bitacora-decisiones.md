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
