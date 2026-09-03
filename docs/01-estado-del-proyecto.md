> Última actualización: 31 de agosto de 2026 — sistema de explorador personalizable.
>
> **Estado actual:** frontend visual evolucionado y local. El selector inicial, el editor de Perfil y todos los consumidores usan un único sistema de explorador personalizable. El renderer SVG en `retrato`/`cuerpo` está implementado y funciona como fallback completo. El contrato 3D modular está definido; assets, manifiesto y renderer 3D siguen pendientes.

## Alcance técnico

- Prototipo exclusivamente visual/local con React, TanStack y datos TypeScript sintéticos.
- 28 IDs de pantalla/estado y 26 rutas reales; P-11 y P-21 son estados embebidos.
- Sin backend, base de datos, `localStorage`, autenticación, usuarios conectados, publicación, subida de archivos, notificaciones, pagos ni emisión/validación real de beneficios.
- Login, compartir, foto, rankings, equipos, rivales, auspiciadores y cupones son simulaciones.
- El estado vive en `SessionContext` y dura únicamente durante la sesión abierta.
- **Implementado para avatar:** 46 entradas, paletas 6/6, selección rápida, editor transaccional, sintéticos estables y SVG en dos encuadres.
- **Contrato definido:** versión, poses, planos, variantes, canvas y rutas en `src/data/avatar-assets.ts`.
- **Pendiente:** producción 3D modular, manifiesto de disponibilidad, fachada híbrida, carga progresiva y QA visual externo según documentos 16–17.

## Recorridos vigentes

- **Principal:** `/` → `/setup` → `/partida` → resultado → Hub Jugar/Perfil.
- **Personalización inicial:** `/setup` → `/avatar?origen=setup` → `/setup`.
- **Educativo alternativo:** `/login` o `/registro` → nombre → `/avatar?origen=onboarding` → bienvenida → tutorial → temporadas y misiones.
- **Navegación fija:** Jugar, Versus, Descubrir, Ranking y Perfil.

## Avance por sprint

| Sprint           | Objetivo                                               | Specs             | Estado                                   |
| ---------------- | ------------------------------------------------------ | ----------------- | ---------------------------------------- |
| S-0              | Alineación y fundaciones                               | —                 | Hecho                                    |
| S-1              | Identidad y onboarding                                 | SPEC-01 … SPEC-07 | Hecho                                    |
| S-2              | Núcleo de misiones                                     | SPEC-08 … SPEC-11 | Hecho                                    |
| S-3              | Gamificación, reto y progreso                          | SPEC-12 … SPEC-15 | Hecho                                    |
| S-4              | Cierre, certificado y consolidación                    | SPEC-16 … SPEC-18 | Hecho                                    |
| S-5              | Preguntados, retención y modelo ilustrativo            | SPEC-19 … SPEC-31 | Hecho                                    |
| S-6              | Constructor por capas                                  | SPEC-32           | Hecho en frontend SVG/fallback           |
| Auditoría        | Coherencia visual, navegación, estados y accesibilidad | Documento 14      | Completado                               |
| Evolución visual | Feedback de 15 apartados                               | Documentos 15–16  | Implementado; assets externos pendientes |
| Evolución avatar | Explorador personalizable coherente en todo el sistema | Documento 17      | Frontend implementado; 3D pendiente      |

## Avance por especificación

| Spec                                                                          | Pantalla     | Estado                                     |
| ----------------------------------------------------------------------------- | ------------ | ------------------------------------------ |
| [SPEC-01 Landing](./02-specs/SPEC-01-splash.md)                               | P-01         | Hecho; HUD/escena evolucionados            |
| [SPEC-02 Registro demo](./02-specs/SPEC-02-registro.md)                       | P-02         | Hecho                                      |
| [SPEC-03 Inicio de sesión demo](./02-specs/SPEC-03-inicio-sesion.md)          | P-03         | Hecho                                      |
| [SPEC-04 Creación de perfil](./02-specs/SPEC-04-creacion-perfil.md)           | P-04         | Hecho                                      |
| [SPEC-05 Avatar](./02-specs/SPEC-05-avatar.md)                                | P-05         | Hecho; SVG es fallback vigente             |
| [SPEC-06 Bienvenida](./02-specs/SPEC-06-bienvenida.md)                        | P-06         | Hecho                                      |
| [SPEC-07 Tutorial](./02-specs/SPEC-07-tutorial.md)                            | P-07         | Hecho                                      |
| [SPEC-08 Mapa](./02-specs/SPEC-08-mapa-temporadas.md)                         | P-08         | Hecho                                      |
| [SPEC-09 Portada de misión](./02-specs/SPEC-09-portada-mision.md)             | P-09         | Hecho                                      |
| [SPEC-10 Motor de preguntas](./02-specs/SPEC-10-motor-preguntas.md)           | P-10         | Hecho                                      |
| [SPEC-11 Feedback](./02-specs/SPEC-11-feedback.md)                            | P-11         | Hecho                                      |
| [SPEC-12 Resultados](./02-specs/SPEC-12-resultados.md)                        | P-12         | Hecho; deltas reales                       |
| [SPEC-13 Reto presencial demo](./02-specs/SPEC-13-reto-presencial.md)         | P-13         | Hecho                                      |
| [SPEC-14 Perfil](./02-specs/SPEC-14-perfil.md)                                | P-14         | Hecho; acción “Personalizar mi explorador” |
| [SPEC-15 Ranking](./02-specs/SPEC-15-ranking.md)                              | P-15         | Hecho como demo                            |
| [SPEC-16 Certificado visual](./02-specs/SPEC-16-certificado.md)               | P-16         | Hecho                                      |
| [SPEC-17 Compartir demo](./02-specs/SPEC-17-compartir.md)                     | P-17         | Hecho                                      |
| [SPEC-18 Panel conceptual](./02-specs/SPEC-18-panel-admin.md)                 | P-18         | Hecho                                      |
| [SPEC-19 Hub Jugar](./02-specs/SPEC-19-hub-jugar.md)                          | P-19         | Hecho                                      |
| [SPEC-20 Ruleta](./02-specs/SPEC-20-ruleta.md)                                | P-20         | Hecho                                      |
| [SPEC-21 Medallas](./02-specs/SPEC-21-medallas.md)                            | P-21         | Hecho                                      |
| [SPEC-22 Banco rápido](./02-specs/SPEC-22-banco-preguntas-rapidas.md)         | —            | Hecho                                      |
| [SPEC-23 Racha](./02-specs/SPEC-23-racha.md)                                  | —            | Hecho como demo de sesión                  |
| [SPEC-24 Reto diario](./02-specs/SPEC-24-pregunta-del-dia.md)                 | P-22         | Hecho                                      |
| [SPEC-25 Vidas](./02-specs/SPEC-25-vidas.md)                                  | —            | Hecho                                      |
| [SPEC-26 Liga sintética](./02-specs/SPEC-26-liga-semanal.md)                  | P-24         | Hecho como demo                            |
| [SPEC-27 Equipos sintéticos](./02-specs/SPEC-27-equipos.md)                   | P-25         | Hecho como demo                            |
| [SPEC-28 Versus](./02-specs/SPEC-28-duelo.md)                                 | P-23         | Hecho                                      |
| [SPEC-29 Retención](./02-specs/SPEC-29-retencion.md)                          | —            | Documentado                                |
| [SPEC-30 Premios ficticios](./02-specs/SPEC-30-premios-cupones.md)            | P-26         | Hecho como demo                            |
| [SPEC-31 Auspiciadores ficticios](./02-specs/SPEC-31-auspiciadores.md)        | —            | Hecho como demo                            |
| [SPEC-32 Explorador personalizable](./02-specs/SPEC-32-constructor-avatar.md) | P-05 + setup | Hecho en frontend; acabado 3D pendiente    |

## Cambios del 31 de agosto

- Portada/HUD, estados de juego, iconos y resultados comunes evolucionados.
- Avatar visible durante partida y resultados.
- Setup muestra cuerpo entero y permite “Otra pinta” o edición completa.
- Editor y Perfil adoptan “explorador personalizable” y encuadre de cuerpo.
- `AvatarLienzo` soporta `retrato` y `cuerpo` con mochila, cargo y calzado base.
- Catálogo preservado: 46 entradas, seis pieles, seis colores y cinco cosméticos.
- Los cinco cosméticos pueden ganarse por progreso o comprarse con monedas desde el editor; la compra valida saldo, evita duplicados, actualiza inventario y previsualiza la pieza. “Guardar mi explorador” confirma el equipamiento.
- Perfil muestra requisito/precio y enlaza directamente a la tienda del explorador. Las piezas regionales continúan fuera de venta.
- `src/data/avatar-assets.ts` fija rutas, poses, planos, variantes y canvas sin activar assets inexistentes.
- Documentos 16–17 fijan producción e integración 3D modular con fallback SVG atómico.

## Backlog del avatar 3D

1. Mapear los hexadecimales canónicos a variantes `piel-N`/`pelo-N` o migrar de forma compatible.
2. Producir y aprobar model sheet, rig, cámaras y pivotes.
3. Cubrir primero `neutral-frente` en `cuerpo` y `retrato`.
4. Crear manifiesto estático y comprobación de disponibilidad completa.
5. Implementar fachada 3D → SVG, `onError` atómico y carga progresiva.
6. Extender poses y validar oclusión, alfa, 40 px, responsive y rendimiento.

## QA final — extensión del avatar

- Prettier: archivos TypeScript/TSX afectados formateados.
- ESLint: **0 errores**, 8 advertencias históricas no bloqueantes de Fast Refresh.
- TypeScript (`tsc --noEmit`): **correcto**.
- Build cliente y SSR/Nitro: **correcto**; persiste el aviso no bloqueante de Vite 8 sobre `vite-tsconfig-paths`.
- Smoke HTTP: `/setup`, `/avatar?origen=setup`, `/avatar?origen=onboarding`, `/perfil`, `/ranking`, `/duelo`, `/partida` y `/recompensas` respondieron 200. Setup, editor, Perfil y tienda/catálogo incluyeron sus textos esperados.
- Vault: 74 Markdown, 53 páginas wiki, 0 errores de frontmatter, 0 wikilinks rotos y 0 huérfanas.
- `git diff --check`: correcto.

La prueba con stakeholder, lector de pantalla y dispositivos físicos permanece externa.

## Documentación relacionada

- [Inventario de pantallas](./03-pantallas.md)
- [Sistema visual consolidado](./06-sistema-visual.md)
- [Bitácora de decisiones](./04-bitacora-decisiones.md)
- [Auditoría anterior](./14-auditoria-coherencia-implementacion.md)
- [Evolución visual del feedback](./15-evolucion-visual-feedback.md)
- [Handoff de generación de assets](./16-handoff-generacion-assets.md)
- [Arquitectura del avatar explorador personalizable](./17-arquitectura-avatar-explorador-personalizable.md)
- [Checklist con stakeholder](./09-checklist-validacion-cliente.md)
