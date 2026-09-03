# Constructor de avatar personalizado (temática boliviana)

Reemplazar los 6 avatares fijos por un creador de personaje por capas, con el set de Santa Cruz desbloqueado y los sets de otros departamentos visibles pero bloqueados.

## Cómo lo verá el usuario

En `/avatar` (P-05), en lugar de una grilla de 6 imágenes:

- Un personaje grande al centro que se actualiza en vivo con cada cambio.
- Pestañas de partes: Cuerpo · Cara · Cabello · Vello facial · Prenda · Sombrero · Accesorio · Fondo.
- Dentro de cada pestaña, opciones en miniatura; toque = aplica al instante.
- Selector de tono de piel y color de cabello (paleta de 6 tonos cada uno).
- Botón "Sorpréndeme" (combinación aleatoria) y "Reiniciar".
- Una fila de **Regiones**: Santa Cruz (activa) · La Paz · Cochabamba · Potosí · Beni · Tarija, con candado e insignia "Próximamente". Al tocar una bloqueada aparece un mensaje: se abre cuando llegue esa temporada.
- Las prendas cruceñas son las que dan identidad: tipoy, camisa de lino, sombrero de sao, pañuelo, guitarra de Cañoto, gorra urbana, collar de semillas.

Desde Perfil se puede volver a editar el avatar en cualquier momento ("Editar mi personaje").

```text
   [ pestañas: Cuerpo Cara Pelo Barba Ropa Sombrero ]
              ( personaje en vivo )
   [ tono de piel ] [ color de pelo ]
   [ o o o o o o ]  grilla de opciones
   [ Santa Cruz ] [La Paz 🔒] [Cbba 🔒] ...
              ( Este soy yo )
```

## Alcance visual

Avatar compuesto por capas SVG dibujadas en código (no imágenes generadas), estilo plano tipo Duolingo: trazo grueso, formas redondeadas, paleta "Selva vibrante". Ventajas: recolorable, nítido en cualquier tamaño, sin peso extra de assets, y funciona igual en Perfil, Ranking, Liga, Duelo, Bienvenida y Certificado.

## Detalles técnicos

- `src/data/avatar-piezas.ts`: catálogo sintético de piezas — `{ id, categoria, nombre, region, bloqueada }` — más paletas de piel y cabello. Región `santa-cruz` desbloqueada; el resto marcadas como bloqueadas.
- `src/data/tipos.ts`: nuevo tipo `AvatarPersonalizado` (cuerpo, cara, cabello, vello, prenda, sombrero, accesorio, fondo, tonoPiel, colorPelo). En `UsuarioSesion`, `avatarId: string | null` pasa a convivir con `avatar: AvatarPersonalizado | null`.
- `src/components/AvatarLienzo.tsx`: renderiza el SVG por capas en tamaños sm/md/lg/xl.
- `src/components/AvatarInsignia.tsx`: si el usuario tiene avatar personalizado usa `AvatarLienzo`; si recibe un `avatarId` (participantes ficticios de ranking, liga, duelo, equipos) sigue usando los PNG actuales. Así no se rompe ningún dato sintético existente.
- `src/routes/avatar.tsx`: reescritura como constructor con pestañas, estado local y guardado en `SessionContext` al confirmar.
- `src/context/SessionContext.tsx`: `actualizarAvatar(parcial)` y un avatar por defecto cruceño en la sesión demo.
- `src/routes/perfil.tsx`: enlace "Editar mi personaje" hacia `/avatar`.
- Se conservan los PNG actuales para los personajes ficticios; no se borra nada.

## Documentación a actualizar

- `docs/02-specs/SPEC-05-avatar.md`: reescritura del comportamiento y criterios de aceptación (constructor por capas, regiones bloqueadas).
- Nueva `docs/02-specs/SPEC-32-constructor-avatar.md` con el catálogo de piezas y la regla de desbloqueo por región/ciudad.
- `docs/07-modelo-datos-simulado.md`: agregar `AvatarPersonalizado`.
- `docs/06-sistema-visual.md`: sistema de capas y paletas de piel/cabello.
- `docs/04-bitacora-decisiones.md`: decisión de pasar de avatares fijos a constructor, y por qué SVG en vez de imágenes.
- `docs/03-pantallas.md` y `docs/01-estado-del-proyecto.md`: estado de P-05.
- `docs/sprints/sprint-6.md`: alcance y verificación.

## Fuera de alcance

Sin backend ni persistencia (la sesión sigue en memoria), sin compra de prendas con puntos en esta etapa (se deja anotado como gancho para la fase de recompensas), sin sets de otros departamentos más allá de mostrarlos bloqueados.
