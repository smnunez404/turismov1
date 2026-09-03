# SPEC-03 — Inicio de sesión demo

- **Pantalla:** P-03 (`/login`) · **Sprint:** S-1 · **Estado:** Hecho — verificado 28-08-2026

**Propósito.** Representar el retorno de una persona con progreso para fines de demostración.

**Comportamiento.** Los campos son visuales y no autentican. Al continuar se carga en memoria un
perfil sintético con progreso y se navega a `/bienvenida`. La pantalla también enlaza el
onboarding clásico para un perfil nuevo.

**Criterios de aceptación**

- [x] Permite demostrar un usuario con progreso durante la validación.
- [x] No valida, envía ni conserva credenciales.
- [x] Declara que el acceso es demo y sólo dura durante la sesión.
- [x] Bienvenida y onboarding quedan conectados sin rutas huérfanas.

**Notas.** El perfil demo se carga en `SessionContext`; recargar reinicia el estado local.
