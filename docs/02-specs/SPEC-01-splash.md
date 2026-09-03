# SPEC-01 — Landing de curiosidad

- **Pantalla:** P-01 (`/`) · **Sprint:** rediseño social · **Estado:** Hecho — verificado 28-08-2026

**Propósito.** Comunicar la propuesta de juego antes de solicitar cualquier perfil y ofrecer
una entrada clara al prototipo.

**Comportamiento.** Landing estable con identidad de Santa Cruz, explicación breve y CTA manual
al setup rápido. Un acceso secundario conecta el login/onboarding demo legado. No existe splash
temporizado ni redirección automática.

**Criterios de aceptación**

- [x] La persona decide cuándo continuar.
- [x] El CTA principal navega a `/setup` y el secundario a `/login`.
- [x] La identidad visual es coherente con el resto del prototipo.
- [x] No afirma que exista cuenta, autenticación ni persistencia.

**Implementación.** `src/routes/index.tsx`.

## Actualización visual — 31 de agosto de 2026

- La portada debe superar el test de tres segundos: juego, Santa Cruz y deseo de pulsar JUGAR.
- El hero cuadrado declara 1024×1024, usa foco responsivo y conserva la Catedral/identidad tropical.
- HUD, panel semisólido y CTA verde con rayo refuerzan la lectura de videojuego.
- El dorado se reserva a recompensa; el CTA principal usa verde.
- El hero actual es fallback hasta producir versiones portrait/landscape por capas.
