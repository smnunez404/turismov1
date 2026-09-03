# Auditoría integral del brief de juego social

> Fecha: 1 de septiembre de 2026  
> Estado: auditoría vigente de producto visual  
> Alcance: frontend local y demostrable, sin backend ni base de datos

## 1. Objetivo y criterio

Este documento contrasta el brief de 1.082 líneas entregado por el stakeholder con la implementación visible del proyecto. Ningún requisito se declara cumplido sin evidencia en rutas, componentes, datos o estado local.

Estados utilizados:

- **Cumplido:** visible y recorrible en el frontend.
- **Parcial:** existe una porción funcional o visual, pero no toda la promesa.
- **Simulado local:** experiencia demostrable con datos sintéticos o estado efímero.
- **Pendiente futuro:** requiere producción adicional, integración o definición.
- **Fuera de alcance:** exige backend, base de datos, operación comercial o interacción real.

## 2. Resumen ejecutivo

El prototipo cumple la propuesta central como experiencia visual jugable: entrada rápida, personaje, partidas breves, variedad mecánica, feedback inmediato, progreso, vidas, racha, reto diario, versus de práctica, ranking, liga, álbum, recompensas ilustrativas y temporadas. La navegación prioriza **Jugar** y la promesa de entrada pregunta cuánto conoce el usuario Santa Cruz.

No es un producto conectado. Cuentas, sincronización, rankings reales, multijugador, notificaciones, analítica remota, invitaciones, acuerdos con marcas y canjes continúan explícitamente fuera de alcance. La implementación conserva su valor como prototipo de validación sin fingir estas capacidades.

### Lectura por estado

| Estado           | Evaluación                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| Cumplido         | Núcleo visual del juego, navegación, cinco retos por partida, feedback, progresión y colección |
| Parcial          | Escala del banco de contenido, riqueza de assets por región, set completo de mascota y avatar  |
| Simulado local   | Sesión, progreso, vidas, racha, versus, rankings, liga, equipos, premios e invitaciones        |
| Pendiente futuro | Más regiones, mayor biblioteca de escenas, personajes y poses finales                          |
| Fuera de alcance | Backend, base de datos, auth real, multijugador, notificaciones, analítica remota y canje real |

## 3. Matriz de cumplimiento por área

| Área del brief               | Estado               | Evidencia                                                           | Observación                                                                     |
| ---------------------------- | -------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Propuesta “¿Cuánto conocés?” | Cumplido             | `/`, `/jugar`, `src/routes/index.tsx`, `src/routes/jugar.index.tsx` | El foco es jugar y descubrir Santa Cruz.                                        |
| Entrada inmediata            | Cumplido             | `/setup`, `/partida`                                                | Nombre corto, avatar preparado y acceso directo a primera partida.              |
| CTA principal JUGAR          | Cumplido             | `/`, navegación inferior                                            | La portada usa “Jugar ahora” y Jugar ocupa la primera posición.                 |
| Partida de cinco desafíos    | Cumplido             | `/partida`, `PartidaCinco.tsx`                                      | Flujo breve con progreso, tiempo, selección y cierre.                           |
| Variedad de mecánicas        | Cumplido             | `src/data/desafios.ts`, `src/features/game/engine.ts`               | Opción, verdadero/falso, ordenar, memoria y asociación/intruso según contenido. |
| Feedback inmediato           | Cumplido             | `PartidaCinco.tsx`                                                  | Estados correcto/incorrecto, explicación y avance.                              |
| Dificultad y rotación        | Parcial              | motor local y datos                                                 | Existe selección/rotación local; no hay personalización conectada.              |
| XP, monedas y niveles        | Cumplido             | `SessionContext.tsx`, `ResultadoPartida.tsx`, `/perfil`             | Recompensa y progreso visibles durante la sesión.                               |
| Vidas                        | Cumplido local       | `/jugar`, `/jugar/ruleta`, contexto                                 | Tres vidas y recuperación simulada local.                                       |
| Racha                        | Cumplido local       | `/jugar`, `/perfil`, `/ranking`                                     | Estado efímero, no persiste entre dispositivos.                                 |
| Reto diario                  | Cumplido local       | `/jugar/dia`                                                        | Selección por fecha de Bolivia; sin clasificación diaria real.                  |
| Versus                       | Simulado local       | `/duelo`                                                            | Rival de práctica, no persona conectada.                                        |
| Ranking general              | Simulado local       | `/ranking`, `src/data/ranking.ts`                                   | Participantes sintéticos y jugador actual.                                      |
| Liga semanal                 | Simulado local       | `/liga`                                                             | Ciclo y divisiones representados sin servicio remoto.                           |
| Equipos                      | Simulado local       | `/equipos`                                                          | Clasificación ilustrativa.                                                      |
| Insignias y recompensas      | Cumplido visual      | `/recompensas`, `/perfil`                                           | Beneficios sujetos a futuros acuerdos.                                          |
| Álbum/colección              | Cumplido visual      | `/temporadas`, datos de álbum                                       | Descubrimientos y progreso local.                                               |
| Avatar personalizable        | Cumplido con límites | `/avatar`, `AvatarLienzo.tsx`                                       | Masculino habilitado; un tono de piel habilitado; resto visible como futuro.    |
| Mascota tucán                | Parcial cumplido     | `TucanGuia.tsx`, `public/mascota/tucan-guia.png`                    | Asset reutilizable en portada y resultados; falta set amplio de poses.          |
| Temporadas y misiones        | Cumplido visual      | `/temporadas`, `/mision/$misionId`                                  | Capítulos, escenas y retos recorribles.                                         |
| Contenido regional           | Cumplido base        | `src/data/*`                                                        | Santa Cruz es la edición actual; ampliar cantidad exige curaduría futura.       |
| Compartir/invitar            | Simulado local       | `/compartir`                                                        | Prepara una representación visual; no publica ni envía.                         |
| Premios patrocinados         | Simulado local       | `/liga`, `/recompensas`, `/jugar/ruleta`                            | Beneficios ilustrativos, sin acuerdo ni canje.                                  |
| Cuenta e inicio de sesión    | Simulado local       | `/login`, `/registro`                                               | No crea identidad remota.                                                       |
| Persistencia                 | Fuera de alcance     | `SessionContext.tsx`                                                | Estado en memoria de la sesión.                                                 |
| Analítica de producto        | Fuera de alcance     | `features/analytics/memory.ts`                                      | Eventos efímeros; nada se transmite.                                            |

## 4. Fases del brief

| Fase                            | Estado actual         | Cierre honesto                                                        |
| ------------------------------- | --------------------- | --------------------------------------------------------------------- |
| Fase 0 — prueba visual          | Cumplido              | La experiencia principal puede demostrarse de punta a punta.          |
| Fase 1 — núcleo jugable         | Cumplido visual/local | Partidas, progreso, vidas, racha, colección y avatar están presentes. |
| Fase 2 — retención y social     | Simulado local        | Diario, versus, ranking, liga y equipos existen sin conectividad.     |
| Fase 3 — contenido y temporadas | Parcial               | Arquitectura visible lista; falta ampliar contenido y assets finales. |
| Fase 4 — negocio/operación      | Fuera de alcance      | Patrocinios, premios y canjes sólo se representan visualmente.        |

## 5. Evidencia de arquitectura frontend

- **Rutas:** TanStack Router en `src/routes/`.
- **Estado:** `src/context/SessionContext.tsx`; no hay persistencia remota.
- **Motor:** `src/features/game/engine.ts` y utilidades en `src/lib/`.
- **Contenido:** catálogos tipados en `src/data/`.
- **Juego:** `src/components/PartidaCinco.tsx`.
- **Resultados:** `src/components/ResultadoPartida.tsx`.
- **Avatar:** `AvatarLienzo.tsx`, `AvatarInsignia.tsx` y catálogo de piezas.
- **Mascota:** `TucanGuia.tsx` y `/public/mascota/tucan-guia.png`.
- **Sistema visual:** `src/styles.css` con tokens y superficies de juego.

## 6. Cambios aplicados durante la auditoría

1. El CTA principal de portada ahora dice **Jugar ahora**.
2. El hub de juego abre con **¿Cuánto conocés Santa Cruz?**.
3. El CTA de configuración dice **Jugar mi primera partida**.
4. La liga se rotula como **liga de práctica** y ciclo semanal.
5. Se conserva la barra inferior con prioridad: Jugar, Versus, Descubrir, Ranking y Perfil.
6. No se añadió backend, base de datos, autenticación ni persistencia.

## 7. Brechas reales

### Requieren sólo frontend/assets

- Ampliar el tucán a estados de ayuda, acierto, error y diario.
- Producir más escenarios portrait/landscape por familia regional.
- Aumentar poses y cosméticos del avatar manteniendo el sistema modular.
- Expandir el banco de desafíos con revisión editorial y cultural.

### Requieren backend u operación

- Cuenta real, recuperación y sincronización.
- Ranking, liga, versus y equipos con personas reales.
- Reto diario competitivo y antifraude.
- Notificaciones y retorno programado.
- Analítica, experimentos y segmentación.
- Premios, inventario, códigos, canjes, marcas y términos legales.

Estas brechas no deben resolverse con datos fingidos ni mensajes ambiguos dentro del prototipo.

## 8. Guardarraíles vigentes

- No declarar envío, publicación, premio, posición o rival real.
- No introducir almacenamiento persistente sólo para aparentar producto conectado.
- No convertir la experiencia en examen o curso turístico.
- No ocultar el carácter ilustrativo de beneficios y competencias.
- No degradar accesibilidad: foco visible, targets táctiles, texto alternativo y estados no dependientes sólo del color.
- No añadir nuevas integraciones sin una decisión explícita de alcance.

## 9. Checklist de validación

- [x] Portada con propuesta de juego y CTA explícito.
- [x] Jugar como primera opción de navegación.
- [x] Configuración breve y acceso a partida.
- [x] Cinco desafíos y feedback inmediato.
- [x] Resultado con recompensas calculadas localmente.
- [x] Vidas, XP, monedas, nivel y racha visibles.
- [x] Diario, versus, ranking y liga diferenciados como locales cuando corresponde.
- [x] Perfil, álbum, recompensas, avatar y temporadas accesibles.
- [x] Mascota local reutilizable documentada.
- [x] Sin backend ni base de datos.
- [ ] Cuenta, competencia, invitaciones y canjes reales: fuera de alcance.

## 10. Conclusión

El brief está **sustancialmente cumplido como prototipo visual local**, no como plataforma social conectada. El núcleo que debe validarse —si el juego resulta claro, atractivo, breve, regional y motivador— ya puede probarse; las promesas sociales, comerciales y de persistencia quedan documentadas como simulación o trabajo futuro, sin presentarlas como capacidades reales.
