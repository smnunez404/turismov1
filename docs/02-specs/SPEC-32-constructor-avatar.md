# SPEC-32 — Constructor de explorador personalizable

- **Pantallas:** P-05 (`/avatar`) y selección rápida (`/setup`) · **Sprint:** S-6 · **Estado:** Hecho en frontend SVG; integración 3D modular pendiente

**Propósito.** Convertir la elección de avatar en un acto de identidad propio: el participante arma su explorador joven-adulto con prendas y rasgos de Santa Cruz y anticipos regionales de Bolivia, en lugar de escoger entre imágenes fijas. La selección rápida de setup y la edición desde Perfil pertenecen al mismo sistema.

## Comportamiento implementado

- `AvatarLienzo` compone actualmente el explorador por capas SVG y funciona como fallback completo.
- Dos encuadres: `cuerpo` en setup/editor y `retrato` en badges, Perfil, Ranking, Liga, Versus y partida.
- Ocho categorías editables: cuerpo, cara, cabello, vello, prenda, sombrero, accesorio y fondo.
- Catálogo de 46 entradas: 3 cuerpos, 5 caras, 7 cabellos, 4 vellos, 9 prendas, 8 sombreros, 6 accesorios y 4 fondos.
- Seis tonos de piel y seis colores compartidos por cabello/vello.
- Cada opción se previsualiza aplicada al avatar actual. Las bloqueadas muestran forma y requisito, pero no pueden equiparse hasta ganarse o comprarse.
- Los cinco cosméticos especiales tienen dos vías equivalentes: requisito de progreso gratuito o compra con monedas. El precio vive en `cosmeticosAvatar`; el reducer valida catálogo, saldo y duplicados antes de descontar.
- Las ocho piezas regionales no son comprables: permanecen reservadas para sus temporadas.
- “Sorprendeme” combina sólo piezas gratuitas o desbloqueadas.
- `/setup` permite “Otra pinta” o entrar al editor completo y regresar sin perder el borrador de sesión.
- La edición es transaccional: volver descarta el borrador local; el CTA final confirma todos los cambios.
- `AvatarPersonalizado` guarda selección, nunca URL, extensión, pose, encuadre ni coordenadas. Los ocho slots guardan IDs; `tonoPiel` y `colorPelo` conservan por ahora sus valores hexadecimales canónicos.
- Participantes sintéticos usan combinaciones estables derivadas de una semilla.

## Evolución 3D contratada

El mismo estado admitirá capas 3D prerenderizadas cuando exista el paquete modular completo. La fachada futura sólo activará 3D si todas las capas requeridas para avatar, pose y encuadre están disponibles y son compatibles. Ante faltante, incompatibilidad o error de carga se dibuja el avatar SVG completo; nunca se mezclan capas SVG y raster en una misma composición.

La pose es presentación y no modifica el estado guardado. El mapeo futuro de los hexadecimales de piel/cabello a `piel-1`…`piel-6` y `pelo-1`…`pelo-6` debe ser determinista.

## Criterios de aceptación implementados

- [x] Setup y editor representan el mismo explorador personalizable.
- [x] El avatar armado aparece en Perfil, Bienvenida, Mapa, Ranking, Liga, Versus, partida y Ruleta.
- [x] Jugador y rival son visibles tanto en el lobby como durante la partida Versus.
- [x] Las 46 entradas tienen representación SVG; las cuatro selecciones `*-ninguno` se resuelven sin capa.
- [x] Hay seis tonos de piel y seis colores de cabello/vello.
- [x] Los cinco cosméticos se pueden ganar por progreso o comprar con monedas; la compra valida saldo, evita duplicados, actualiza inventario y permite equipar.
- [x] Las piezas regionales permanecen visibles pero fuera de venta.
- [x] Los encuadres `cuerpo` y `retrato` responden a usos distintos.
- [x] Las piezas bloqueadas se ven apagadas, con candado, apariencia propia y mensaje de la ciudad que las abre.
- [x] La pantalla funciona en 390 px sin desbordamiento horizontal.
- [x] Los participantes sintéticos se dibujan con una combinación estable (`avatarSintetico`). El jugador sin configuración usa `avatarPorDefecto`.
- [x] No se muestran los PNG antiguos ni las referencias conceptuales 3D como assets productivos.
- [x] `src/data/avatar-assets.ts` define versión, encuadres, poses, planos, variantes, canvas y rutas esperadas sin importar archivos inexistentes.

## Criterios futuros — backlog 3D

- [ ] Producir y aprobar modelo/rig modular, cámara, pivotes y materiales canónicos.
- [ ] Generar cobertura `neutral-frente` completa para `retrato` y `cuerpo` antes de otras poses.
- [ ] Crear manifiesto estático de disponibilidad y compatibilidad.
- [ ] Implementar normalización de variantes y fachada todo-o-nada.
- [ ] Volver al SVG completo ante `onError`, faltante o incompatibilidad, sin parpadeo.
- [ ] Cargar progresivamente sólo encuadre, pose y categoría visibles.
- [ ] Validar alfa, oclusiones, 40 px, 320/390/430 px y rendimiento.

**Notas.** Catálogo en `src/data/avatar-piezas.ts`; tipos en `src/data/tipos.ts`; contrato de assets en `src/data/avatar-assets.ts`; arquitectura en `docs/17-arquitectura-avatar-explorador-personalizable.md`; producción en la sección 14 de `docs/16-handoff-generacion-assets.md`. Todo el estado permanece en memoria mediante `SessionContext`.
