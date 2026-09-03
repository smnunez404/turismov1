# Evolución visual a universo de juego

> Fecha: 31 de agosto de 2026
> Estado: contrato de implementación vigente
> Alcance: frontend local, sin backend, base de datos, persistencia, multijugador real ni generación de imágenes.

## 1. Dirección

**Evolucionar, no rediseñar desde cero.** Se conserva la identidad tropical y cruceña, la paleta verde/amarillo/naranja, Baloo 2 + Nunito, la navegación, los radios amplios, los botones volumétricos y el hero ilustrado. La evolución aumenta profundidad, claridad de juego, continuidad del avatar y recompensa.

El criterio de tres segundos de la portada es:

1. Esto es un juego.
2. El juego permite descubrir Santa Cruz.
3. Quiero pulsar **JUGAR**.

## 2. Matriz ejecutiva del feedback

|   # | Apartado          | Resolución inmediata                                   | Asset pendiente                       | Decisión               |
| --: | ----------------- | ------------------------------------------------------ | ------------------------------------- | ---------------------- |
|   1 | Diagnóstico       | Refresh de composición y componentes                   | —                                     | Evolucionar            |
|   2 | Portada           | HUD, panel, CTA verde, jerarquía y proporción correcta | Hero por capas, tucán aislado         | Implementar + preparar |
|   3 | Universo de juego | Gramática de escena, HUD y manifiesto tipado           | Escenarios coherentes                 | Implementar + preparar |
|   4 | Tucán             | Definir slots, poses y contrato                        | Set completo de mascota               | No simular con recorte |
|   5 | Colores           | Formalizar roles y corregir CTA                        | —                                     | Implementar            |
|   6 | Escenarios        | Metadatos y mapa de reemplazo                          | Seis familias, dos relaciones y capas | Preparar               |
|   7 | Jerarquía         | Reto → JUGAR → emoción → marca → secundaria            | —                                     | Implementar            |
|   8 | Avatar            | Presencia en partida y cierres, SVG como fallback      | Modelo 3D en diez poses               | Implementar + preparar |
|   9 | Estados           | Normalizar botones/opciones, iconos y movimiento       | Celebraciones opcionales              | Implementar            |
|  10 | Resultados        | Componente común y métricas reales                     | Pose de celebración                   | Implementar            |
|  11 | Evitar            | Guardarraíles explícitos                               | —                                     | Aplicar siempre        |
|  12 | Sistema           | Completar escena, estados, resultados y contratos      | Mascota/avatar/escenarios             | Implementar + preparar |
|  13 | Prioridad         | Portada/resultados → sistema/avatar → handoff          | Producción externa posterior          | Ejecutar en lotes      |
|  14 | Aprobación        | Checklist y smoke test                                 | Revalidar al integrar assets          | Validar                |
|  15 | Conclusión        | Mantener esencia y aumentar juego                      | Recursos del handoff                  | Adoptado               |

La auditoría detallada y sus evidencias están en el vault: `wiki/estado/auditoria-feedback-visual-2026-08-31.md`.

## 3. Roles de color

| Rol                | Familia                 | Uso                                    | No usar para                |
| ------------------ | ----------------------- | -------------------------------------- | --------------------------- |
| Acción primaria    | Verde `--primary`       | JUGAR, continuar, confirmar, progreso  | Recompensas monetarias      |
| Recompensa         | Dorado `--accent`       | XP, monedas, insignias, desbloqueos    | CTA principal               |
| Reto/secundaria    | Naranja `--secondary`   | Versus, reto diario, acción secundaria | Error                       |
| Información        | Azul funcional puntual  | Ayuda o información neutral            | Decoración general          |
| Correcto           | Verde                   | acierto y confirmación                 | Todo el fondo de pantalla   |
| Incorrecto/pérdida | Rojo `--destructive`    | error, tiempo agotado, vida perdida    | “Casi” neutral o decoración |
| Descanso           | Card, background, muted | paneles, texto y separación            | Llamar atención simultánea  |

Regla: cada pantalla tiene un único foco cromático dominante. El color nunca será el único indicador de estado; se acompaña con icono, texto, borde o `aria-*`.

## 4. Gramática de escena y HUD

### Escena

Una escena combina, cuando existan los recursos:

1. fondo atmosférico;
2. ciudad/paisaje en plano medio;
3. sujeto u objeto interactivo;
4. primer plano ambiental;
5. UI en un plano independiente.

Mientras sólo exista el hero único, la profundidad se crea con recorte responsivo, scrims localizados y paneles semisólidos. **No** se duplica el JPG para fingir parallax.

### HUD

El HUD usa pastillas compactas y semánticas, no tarjetas decorativas gigantes:

- modo o cantidad de desafíos;
- tiempo cuando corresponda;
- XP, monedas o racha sólo si aportan contexto;
- identidad del jugador en partidas y resultados.

El HUD debe permanecer legible sobre ilustración, tener bordes/sombra sutil y respetar safe areas.

### Panel de reto

- superficie oscura o clara semisólida según el fondo;
- título como elemento dominante;
- copy de una o dos líneas;
- CTA verde a ancho completo con icono de rayo;
- enlaces demo y disclaimer fuera de la jerarquía principal.

## 5. Botones y estados compartidos

### Botones

| Estado        | Tratamiento                                                |
| ------------- | ---------------------------------------------------------- |
| Normal        | Borde inferior volumétrico y contraste AA razonable        |
| Hover         | Cambio tonal leve, sin desplazamiento permanente           |
| Presionado    | Traslación vertical de 2 px y reducción del borde inferior |
| Focus-visible | Anillo de foco separado del borde                          |
| Disabled      | Opacidad, saturación y cursor; sin sombra de acción        |
| Loading       | `aria-busy`, contenido estable y acción bloqueada          |
| Completado    | Icono de acierto + copy; no depende sólo del verde         |

### Opciones de respuesta

Clases comunes: `opcion-juego`, `is-selected`, `is-correct`, `is-incorrect`.

- seleccionada: borde primario y anillo interior;
- correcta: verde, check y copy de feedback;
- incorrecta: destructive, X y explicación amable;
- no elegida tras resolver: se mantiene neutral o atenuada;
- disabled por respuesta: conserva legibilidad; no usa una opacidad que oculte el resultado.

## 6. Iconografía semántica

Los componentes deben solicitar iconos por intención y no por aspecto accidental:

- `xp`: destello;
- `moneda`: cupón/moneda del sistema vigente;
- `racha`: llama;
- `liga`: escudo;
- `ranking`: podio;
- `acierto`: círculo con check;
- `error`: círculo con X;
- `tiempo`: cronómetro;
- `nivel`: corona;
- `desbloqueo`: regalo;
- `jugar`: rayo.

`Icono` debe conservar un fallback seguro para contenido dinámico, pero los usos internos deben preferir el tipo `NombreIcono` para detectar errores durante TypeScript.

## 7. Resultados como componente de continuidad

El resultado común debe poder mostrar sólo los datos disponibles:

1. avatar e identidad del jugador;
2. mensaje según desempeño;
3. tira de cinco respuestas (acierto/error);
4. XP y monedas ganadas en esa partida;
5. progreso de nivel posterior;
6. racha, liga o desbloqueos sólo si la sesión permite calcular un delta real;
7. CTA principal contextual;
8. una o dos alternativas con jerarquía menor.

No se muestran velocidad, percentiles, posición histórica ni ranking real porque el prototipo no registra esos datos. Una clasificación sintética sólo puede aparecer en pantallas que ya declaran participantes/datos demo; nunca como consecuencia real de una partida.

El componente recibe un resumen y datos posteriores; no modifica sesión. La ruta toma un snapshot antes de aplicar la recompensa y deriva los deltas después.

## 8. Avatar

### Vigente

`AvatarLienzo` y `AvatarInsignia` son la fuente visual y fallback funcional. Deben aparecer en perfil, ranking, liga, Versus, partida y resultados. El constructor SVG sigue siendo personalizable y transaccional.

### Futuro raster 3D

El avatar objetivo es joven-adulto, 3D estilizado, piel morena cálida, cabello negro, chaqueta verde petróleo, detalles textiles bolivianos, mochila coral, pantalón cargo azul y zapatillas blancas. El contrato completo se define en `docs/16-handoff-generacion-assets.md`.

No se mezclan capas SVG personalizables sobre una pose 3D hasta definir anclajes, oclusión y escala. El raster 3D no elimina el fallback SVG.

## 9. Tucán / mascota

Existe un asset local reutilizable en `public/mascota/tucan-guia.png`, encapsulado por `src/components/TucanGuia.tsx`. Se usa actualmente en portada y resultados; no proviene de recortar el tucán fusionado del hero.

El set sigue siendo parcial: faltan poses específicas para onboarding, acierto, error amable, reto diario, recompensa y temporada. Las reacciones deben reforzar una acción o estado, no estar animadas permanentemente.

## 10. Escenarios y biblioteca de assets

Familias: inicio, centro histórico, gastronomía, naturaleza, carnaval/tradiciones y patrimonio.

Cada entrada de ilustración debe definir:

- `src`;
- `alt`;
- `width` y `height` intrínsecos;
- `aspect` (`square`, `portrait`, `landscape`);
- `focalPoint` (`x`, `y` en porcentaje);
- `kind` (`hero`, `season`, `mission`, `album`, `scene`, `character`);
- `decorative`.

Los reemplazos futuros mantienen el mismo contrato para evitar cambios de pantalla. Los escenarios finales deben ofrecer portrait y landscape; los masters por capas separan fondo, plano medio y primer plano.

## 11. Movimiento y feedback

Permitido:

- respuesta de presión;
- pulso del cronómetro en tramo crítico;
- entrada breve del feedback;
- incremento breve de XP;
- celebración al subir de nivel, obtener insignia o desbloquear.

Evitar:

- loops ambientales constantes en cada pantalla;
- animar elementos sin significado;
- sacudidas punitivas intensas;
- demoras que bloqueen continuar;
- movimiento sin equivalente bajo `prefers-reduced-motion`.

Con movimiento reducido, el estado final aparece de inmediato y mantiene la misma información.

## 12. Accesibilidad y responsive

- safe areas superior e inferior;
- targets principales de al menos 44×44 px;
- orden de foco equivalente al orden visual;
- foco enviado al feedback y al encabezado de resultados;
- regiones vivas para tiempo agotado, acierto y recompensa;
- imágenes informativas con alt contextual y decorativas con alt vacío;
- `object-position` derivado del foco del manifiesto cuando aplique;
- validación mínima a 320, 390 y 430 px.

## 13. Guardarraíles

- No rediseñar desde cero.
- No mezclar fotografía realista sin sistema con ilustración.
- No importar damero, chroma, fondo negro ni halos como transparencia.
- No recortar elementos fusionados del hero para fingir assets.
- No inventar datos que el estado local no contiene.
- No convertir todas las superficies en colores de énfasis.
- No sobrecargar preguntas con decoración.
- No infantilizar al avatar o el tono.
- No crear un estilo de ilustración distinto por pantalla.

## 14. Secuencia de implementación

1. Portada: jerarquía, HUD, panel y CTA.
2. Tokens, estados, iconos y manifiesto.
3. Partida: avatar, opciones y foco.
4. Resultado común en partida libre, diario y Versus.
5. Alinear resultado de Ruleta y evitar anuncios repetidos.
6. Preparar handoff de avatar, tucán y escenarios.
7. Actualizar sistema visual, estado, bitácora, wiki y validación.

## 15. Criterios de cierre

- La portada cumple el test de tres segundos.
- Verde se reserva a acción/progreso y dorado a recompensa.
- Partida y resultados muestran al jugador.
- Las opciones tienen estados compartidos accesibles.
- Los cierres muestran sólo métricas reales de la sesión.
- El manifiesto permite sustituir assets sin reescribir pantallas.
- El handoff permite producir todos los recursos pendientes sin depender de decisiones orales.
- Lint, TypeScript y build terminan correctamente.
