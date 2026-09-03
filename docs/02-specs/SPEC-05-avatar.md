# SPEC-05 — Avatar e inventario cosmético

- **Pantallas:** setup rápido (`/setup`) y editor (`/avatar`) · **Estado:** Hecho

**Propósito.** Representar al jugador y convertir el avatar en parte de la progresión.

**Comportamiento.** Antes del primer juego se elige una combinación rápida/aleatoria usando
solo piezas gratuitas. El editor completo permite cambiar capas y muestra bloqueos por ciudad
o logro. Cinco cosméticos se obtienen por primera partida, XP, reto diario, versus y álbum.

**Criterios de aceptación**

- [x] El avatar aparece en perfil, ranking, liga y certificado.
- [x] El azar respeta el inventario del jugador.
- [x] Cada cosmético bloqueado explica su requisito.
- [x] Los desbloqueos se aplican una sola vez durante la sesión.
- [x] Guardar desde el onboarding continúa a Bienvenida; editar desde Perfil vuelve a Perfil.

**Notas.** Catálogo en `src/data/avatar-piezas.ts`; reglas en `src/data/coleccion.ts` y
`SessionContext`. Todo se reinicia al recargar.
