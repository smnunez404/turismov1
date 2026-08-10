# SPEC-32 — Constructor de avatar personalizado

- **Pantalla:** P-05 (`/avatar`) · **Sprint:** S-6 · **Estado:** Hecho

**Propósito.** Convertir la elección de avatar en un acto de identidad propio: el usuario
arma su embajador con prendas y rasgos del oriente boliviano, en lugar de escoger entre
seis imágenes fijas.

**Comportamiento.**

- Avatar dibujado por capas en SVG (`src/components/AvatarLienzo.tsx`), recolorable y
  nítido en cualquier tamaño; no usa imágenes.
- Ocho categorías editables: cuerpo, cara, cabello, vello, prenda, sombrero, accesorio y
  fondo, más tono de piel (6) y color de cabello (6).
- Cada opción se previsualiza aplicada al avatar actual, no como icono suelto.
- Botón "Sorprendeme": combinación aleatoria con piezas desbloqueadas.
- Piezas de otras ciudades (La Paz, Cochabamba, Potosí, Beni, Tarija) aparecen visibles
  pero bloqueadas, como gancho de temporadas futuras.
- El avatar se puede editar después desde Perfil.

**Criterios de aceptación**

- [x] El avatar armado aparece en Perfil, Bienvenida, Mapa, Ranking, Liga, Duelo y Ruleta.
- [x] Las piezas bloqueadas se ven apagadas, con candado y mensaje de la ciudad que las abre.
- [x] La pantalla funciona en 390 px sin desbordamiento horizontal.
- [x] Los participantes sintéticos (ranking, liga, duelo) también se dibujan por capas,
      con una combinación estable derivada de su nombre (`avatarSintetico`). Ya no se
      muestran los PNG antiguos en ninguna pantalla.

**Notas.** Catálogo en `src/data/avatar-piezas.ts`; tipos `AvatarPersonalizado`,
`PiezaAvatar` y `RegionAvatar` en `src/data/tipos.ts`. Estado en `SessionContext`
(`usuario.avatar` + `actualizarAvatar`), solo en memoria.
