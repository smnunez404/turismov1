# SPEC-02 — Registro (simulado)

- **Pantalla:** P-02 (`/registro`) · **Sprint:** S-1 · **Estado:** Hecho

**Propósito.** Simular el ingreso de un usuario nuevo sin fricción.

**Comportamiento.** Campos de nombre y correo. Al confirmar, avanza al siguiente paso.
Sin validación de servidor, sin verificación de correo, sin contraseña real.

**Criterios de aceptación**

- [x] Los datos ingresados se reflejan luego en Perfil, Bienvenida y Certificado.
- [x] El formulario nunca bloquea el avance por errores técnicos.
- [x] Existe acceso visible a "ya tengo cuenta" → Inicio de sesión.

**Notas.** Los datos se guardan en el contexto de sesión en memoria. No hay autenticación.