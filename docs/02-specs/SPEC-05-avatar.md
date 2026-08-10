# SPEC-05 — Selección de avatar

- **Pantalla:** P-05 (`/avatar`) · **Sprint:** S-1 · **Estado:** Hecho

**Propósito.** Primer acto de identidad del usuario dentro del producto.

**Comportamiento.** Desde S-6 la pantalla es un constructor por capas (ver SPEC-32): el
usuario arma su embajador con rasgos, prendas y sombreros cruceños. Los 6 avatares
predefinidos quedan como respaldo para participantes sintéticos.

**Criterios de aceptación**

- [x] El avatar elegido aparece en Perfil, Bienvenida, Ranking y Certificado.
- [x] La selección se siente como una decisión de identidad, no como un formulario.

**Notas.** Presets en `src/data/avatares.ts`; piezas del constructor en
`src/data/avatar-piezas.ts`. Detalle completo en SPEC-32.