# SPEC-02 — Perfil postvalor (simulado)

- **Pantalla:** P-02 (`/registro`) · **Sprint:** rediseño social · **Estado:** Hecho

**Propósito.** Ofrecer un perfil solo después de que la persona haya completado su primera
partida y tenga XP/monedas que quiera conservar conceptualmente.

**Comportamiento.** El camino principal no pasa por esta pantalla antes de jugar. Después del
resultado, el usuario puede ingresar un correo de demostración o continuar como invitado.
Al confirmar vuelve al hub. No existe cuenta, contraseña, verificación, backend ni persistencia.

**Criterios de aceptación**

- [x] La primera partida se completa sin correo ni registro.
- [x] El resultado ofrece crear perfil demo o continuar como invitado.
- [x] El perfil conserva XP/monedas dentro de la sesión actual.
- [x] La pantalla declara que recargar reinicia todo.
- [x] No afirma que se creó una cuenta real.
