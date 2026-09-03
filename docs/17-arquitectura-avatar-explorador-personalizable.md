# Arquitectura del avatar explorador personalizable

> Fecha: 31 de agosto de 2026
> Estado: frontend SVG implementado; contrato 3D vigente; assets e integración 3D pendientes
> Alcance: selector inicial, editor de perfil, badges, partidas, resultados, ranking, Liga y Versus.

## 1. Decisión

Todo avatar —jugador, invitado y participante sintético— pertenece al lenguaje visual del **explorador joven-adulto**. La personalización no se reemplaza por presets ni URLs: `AvatarPersonalizado` y los IDs del catálogo siguen siendo el contrato funcional.

El SVG evolucionado es la implementación vigente y el fallback completo. El acabado 3D modular se activará progresivamente cuando existan assets productivos compatibles; actualmente no existen esos assets ni un renderer 3D activo.

## 2. Alcance funcional conservado

- `/setup`: pinta rápida, aleatorio y acceso al editor completo.
- `/avatar?origen=setup`: edición con retorno seguro a setup.
- `/avatar?origen=onboarding`: edición durante onboarding.
- `/avatar` desde Perfil: edición posterior.
- Borrador local: volver descarta; guardar confirma.
- “Sorprendeme”: sólo piezas gratuitas o desbloqueadas.
- Inventario, cosméticos y participantes sintéticos estables.
- Estado exclusivamente en memoria.

## 3. Contrato canónico

```ts
type AvatarPersonalizado = {
  cuerpo: string;
  cara: string;
  cabello: string;
  vello: string;
  prenda: string;
  sombrero: string;
  accesorio: string;
  fondo: string;
  tonoPiel: string;
  colorPelo: string;
};
```

Los ocho slots de pieza guardan IDs semánticos. `tonoPiel` y `colorPelo` guardan hoy valores hexadecimales de las paletas canónicas; el manifiesto futuro debe mapearlos determinísticamente a `piel-1`…`piel-6` y `pelo-1`…`pelo-6`, o introducir una migración compatible.

Nunca se guardan URL, extensión, pose, encuadre, plano o coordenadas en la sesión.

## 4. Render actual y arquitectura objetivo

### Implementado hoy

```text
AvatarPersonalizado → AvatarLienzo (SVG, retrato/cuerpo)
                     → AvatarInsignia (selección real/sintética/default)
```

### Planificado cuando existan assets 3D

```text
AvatarPersonalizado
        │
        ▼
normalizarAvatar() y mapear variantes
        │
        ▼
AvatarRenderer (fachada)
        │
        ├── combinación completa y compatible ──► Explorer3DLayerRenderer
        └── falta/error/incompatibilidad ─────────► SvgAvatarRenderer completo
```

`normalizarAvatar`, `AvatarRenderer`, `Explorer3DLayerRenderer` y `canRenderExplorer3D` son componentes planificados, no símbolos activos del frontend actual.

### Regla atómica

El 3D sólo se activa si están disponibles **todas** las capas necesarias para avatar, pose y encuadre. Ante una capa ausente, incompatibilidad o `onError`, toda la composición usa SVG. Nunca se mezcla parcialmente SVG y raster 3D.

## 5. Encuadres

| Encuadre  | Uso                                             | Estado actual                  |
| --------- | ----------------------------------------------- | ------------------------------ |
| `retrato` | badges, Perfil, Ranking, Liga, Versus y partida | SVG implementado; 3D pendiente |
| `cuerpo`  | setup, editor y escenas                         | SVG implementado; 3D pendiente |

`retrato` debe ser legible a 40 px. `cuerpo` conserva mochila, pantalón cargo y calzado. No se reduce cuerpo entero para fabricar badges.

## 6. Poses de presentación

- `neutral-frente`;
- `tres-cuartos`;
- `camina-derecha`;
- `camina-izquierda`;
- `celebra`;
- `pensando`;
- `casi`;
- `nivel`.

El editor usa `neutral-frente`. Una pose nunca modifica las piezas guardadas. Perfil y espalda pertenecen al model sheet de producción, no son poses runtime solicitables.

## 7. Composición y oclusión

Orden objetivo para capas 3D prerenderizadas:

1. fondo;
2. sombra separada;
3. cabello posterior;
4. accesorio posterior/mochila;
5. cuerpo/piel;
6. prenda;
7. cuello/cabeza;
8. rostro;
9. vello;
10. cabello frontal;
11. accesorio frontal;
12. sombrero frontal;
13. efecto de pose separado.

Cabello, sombreros y accesorios pueden requerir planos `back` y `front`. Todas las capas comparten canvas, pivote, cámara, rig, iluminación y alfa real.

## 8. Catálogo funcional actual

| Categoría | Entradas | Variación       |
| --------- | -------: | --------------- |
| Cuerpo    |        3 | 6 tonos de piel |
| Cara      |        5 | expresión       |
| Cabello   |        7 | 6 colores       |
| Vello     |        4 | 6 colores       |
| Prenda    |        9 | diseño fijo     |
| Sombrero  |        8 | diseño fijo     |
| Accesorio |        6 | diseño fijo     |
| Fondo     |        4 | diseño fijo     |

Total: **46 entradas**, incluidas cuatro opciones `*-ninguno` que se resuelven con lista de capas vacía, no con archivos transparentes. Hay cinco cosméticos por progreso y ocho piezas regionales bloqueadas.

## 9. Producción recomendada

### Preferida: modelo 3D modular

- Un rig compartido y proporciones bloqueadas.
- Expresiones compatibles con el mismo rostro.
- Cabellos, vellos, prendas, sombreros y accesorios modulares.
- Materiales parametrizados para piel y cabello.
- Fuentes GLB/Blender y renders 2D alineados para web.

### Alternativa aceptable

Capas 3D prerenderizadas sólo si seed/modelo, cámara, canvas, pivote, luz y oclusión permanecen idénticos.

### Rechazado

- PNG completo por combinación.
- Presets fijos que eliminan personalización.
- Mezcla parcial SVG/raster.
- Piezas generadas con cámaras o luces distintas.
- PNG conceptuales `public/avatar-explorador-*` como assets finales.

## 10. Contrato de rutas

La fórmula canónica coincide con `src/data/avatar-assets.ts` y la sección 14 del handoff:

```text
src/assets/generated/avatar-personalizable/v1/
  {encuadre}/{pose}/{categoria}/{pieceId}/
    {pieceId}--{variante}--{plano}.webp
```

- variante: `base`, `piel-1`…`piel-6` o `pelo-1`…`pelo-6`;
- plano: `back`, `base` o `front`;
- canvas retrato: master 2048×2048, web 1024×1024;
- canvas cuerpo: master 2048×2560, web 1024×1280.

El manifiesto futuro debe declarar versión, disponibilidad, dimensiones, pivote, plano, cuerpos compatibles y peso. `src/data/avatar-assets.ts` define hoy la convención, pero no importa archivos inexistentes.

## 11. Disponibilidad y desbloqueos

Se distinguen `previewable`, `equippable` y `reason`. El booleano histórico `bloqueada` se conserva por compatibilidad. Una temporada futura podrá habilitar piezas regionales sin cambiar su ID o asset.

Cosméticos vigentes, con requisito gratuito y compra alternativa en monedas:

- `fondo-rayos`: primera partida o 30 monedas;
- `prenda-guayabera`: 60 XP o 55 monedas;
- `pelo-trenzas`: reto diario o 45 monedas;
- `sombrero-camba`: primer Versus o 60 monedas;
- `acc-guitarra`: álbum completo o 90 monedas.

La compra se resuelve por ID en el reducer, nunca por un precio enviado desde la UI. Rechaza catálogo desconocido, saldo insuficiente y duplicados; descuenta saldo y añade al inventario. Las piezas regionales no son comprables.

## 12. Criterios implementados

- [x] Setup, editor y Perfil usan el mismo estado de explorador.
- [x] Las 46 entradas tienen fallback SVG funcional.
- [x] Los dos encuadres existen en SVG.
- [x] Setup ofrece aleatorio y personalización completa.
- [x] Guardar/cancelar, inventario, aleatorio y sintéticos se conservan.
- [x] Los PNG conceptuales no se importan.
- [x] El contrato de rutas/canvas está tipado sin activar el 3D.

## 13. Backlog 3D ordenado

1. Resolver el adaptador hex → variante o migración compatible.
2. Aprobar model sheet, rig, cámaras, pivotes y materiales.
3. Producir `neutral-frente` para `cuerpo` y `retrato`.
4. Cubrir todas las entradas aplicables, variantes y planos.
5. Crear manifiesto estático de disponibilidad/compatibilidad.
6. Implementar normalizador, fachada, `canRenderExplorer3D` y `onError` atómico.
7. Añadir poses una por una, manteniendo SVG para poses incompletas.
8. Implementar carga progresiva por encuadre, pose y categoría.
9. Validar alfa, oclusión, legibilidad a 40 px, 320/390/430 px, rendimiento y rutas consumidoras.

## 14. Criterios finales del paquete 3D

- [ ] Dos combinaciones distintas conservan personalización entre setup, editor, Perfil, partida y resultado.
- [ ] Todas las capas mantienen identidad, rostro, proporciones, cámara y luz.
- [ ] Cualquier faltante activa fallback SVG completo sin avatar vacío ni parpadeo.
- [ ] La carga inicial no descarga todo el catálogo.
- [ ] No hay chroma, damero, halos, UI o texto horneados.

Producción detallada: `docs/16-handoff-generacion-assets.md`, sección 14.
