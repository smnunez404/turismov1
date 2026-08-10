# SPEC-01 — Splash

- **Pantalla:** P-01 (`/`) · **Sprint:** S-1 · **Estado:** Hecho

**Propósito.** Establecer identidad visual y de marca desde el primer segundo.

**Comportamiento.** Aparición del logotipo e identidad del producto con transición
automática hacia Registro o Inicio de sesión.

**Criterios de aceptación**

- [x] La transición ocurre sin intervención del usuario.
- [x] La identidad visual es coherente con el resto del prototipo.
- [x] No excede unos pocos segundos de permanencia (2.6 s).

**Notas de implementación.** `src/routes/index.tsx`. Temporizador con `useEffect` y
navegación a `/registro`. Enlace de salto manual para la demostración.