# SPEC-04 — Configuración rápida de invitado

- **Pantalla:** P-04 (`/setup`) · **Sprint:** rediseño social · **Estado:** Hecho

**Propósito.** Dar identidad mínima sin frenar el acceso al primer juego.

**Comportamiento.** Nickname opcional y avatar aleatorio con piezas gratuitas. El usuario
continúa directamente a una partida de cinco desafíos; el correo se solicita únicamente
después de demostrar valor y siempre como simulación.

**Criterios de aceptación**

- [x] No solicita correo ni contraseña.
- [x] Permite jugar con el nombre por defecto `Curioso`.
- [x] El avatar aleatorio no utiliza cosméticos todavía bloqueados.
- [x] Continúa directamente a `/partida`.
- [x] Los datos viven solo en memoria.
