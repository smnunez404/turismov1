# Sprint 1 — Identidad y onboarding

- **Estado:** Hecho · **Cierre:** 2026-08-10
- **Specs:** SPEC-01 … SPEC-07 · **Pantallas:** P-01 a P-07

**Objetivo.** Que el usuario pueda entrar, crear su identidad y entender el juego.

## Construido

| Spec    | Pantalla                 | Ruta            | Nota                                           |
| ------- | ------------------------ | --------------- | ---------------------------------------------- |
| SPEC-01 | P-01 Splash              | `/`             | Transición automática de 2.6 s                 |
| SPEC-02 | P-02 Registro            | `/registro`     | Nombre y correo, sin validación de servidor    |
| SPEC-03 | P-03 Inicio de sesión    | `/login`        | Carga perfil demo con progreso                 |
| SPEC-04 | P-04 Creación de perfil  | `/perfil-nuevo` | Confirma nombre a mostrar                      |
| SPEC-05 | P-05 Selección de avatar | `/avatar`       | 6 avatares cruceños                            |
| SPEC-06 | P-06 Bienvenida          | `/bienvenida`   | Nombre + avatar + narrativa de Embajador       |
| SPEC-07 | P-07 Tutorial            | `/tutorial`     | 3 pasos, salteable, cierra con pregunta gancho |

## Checklist de Definition of Done

- [x] Cada spec cumple sus criterios de aceptación.
- [x] Recorrido navegable de punta a punta: Splash → Tutorial.
- [x] Estado de sesión únicamente en memoria; se reinicia al recargar.
- [x] Ninguna capacidad de la lista de exclusiones fue introducida.
- [x] Metadatos `head()` propios por pantalla.

## Entregable

Recorrido completo desde Splash hasta Tutorial, navegable de punta a punta, con datos
sintéticos.

## Observaciones para la validación con el cliente

- Confirmar la estética y la cantidad definitiva de avatares.
- Confirmar el tono verbal (voseo cruceño) en textos de onboarding.
- La salida del Tutorial queda apuntando al Mapa de temporadas (Sprint 2).
