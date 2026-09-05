# ENTREGABLE 1: PROTOTIPO INTERACTIVO NAVEGABLE
## Proyecto: Soy Embajador Bolivia (Fase 1: Descubre Santa Cruz)
**Cliente:** Alejandra Caballero (C.I. 3866326)  
**Prestador:** Adaptive Labs  
**Versión:** MVP v1.2 Release Candidate (Alta Fidelidad - Game First)  
**Fecha:** Septiembre de 2026  
**Repositorio Oficial:** `https://github.com/smnunez404/turismov1` (Rama `main`)

---

## 1. DESCRIPCIÓN DEL ENTREGABLE
Conforme a la **Cláusula Quinta (Punto 1)** del Contrato de Prestación de Servicios Profesionales, el presente documento certifica y describe la entrega del **Prototipo Interactivo Navegable de Alta Fidelidad**.

El prototipo ha sido diseñado para simular de forma integral y determinista la experiencia del usuario (UX) y el sistema visual (UI) de la aplicación, permitiendo validar la viabilidad del concepto, las mecánicas de juego social y el valor educativo/turístico antes de incurrir en costos de desarrollo de backend masivo.

---

## 2. ENLACES Y ACCESO AL PROTOTIPO

* **Acceso Local (Servidor de Desarrollo):** `http://localhost:8080/`
* **Código Fuente y Control de Versiones:** `https://github.com/smnunez404/turismov1` (Sincronizado en rama `main`)
* **Framework:** TanStack Start (React 19, TypeScript, Vite 8, Nitro Engine SSR).
* **Diseño y Estilo:** Vanilla CSS + Tailwind CSS estructurado bajo la paleta semántica *Selva Vibrante* y sistema de diseño Duolingo-like ("Game-First").

---

## 3. MAPA DE NAVEGACIÓN Y PANTALLAS IMPLEMENTADAS

El prototipo cuenta con **28 rutas y subrutas funcionales en memoria**, organizadas en 4 módulos clave:

### A. Módulo de Adopción e Identidad (Onboarding)
1. **P-01 Splash & Portada (`/`):** Presentación de marca con distintivo promocional de premios, sin emojis crudos, con acceso a juego rápido y registro.
2. **P-02 Registro Simulado (`/registro`):** Formulario de captura de datos con validaciones reactivas en memoria.
3. **P-03 Inicio de Sesión Simulado (`/login`):** Acceso rápido con selector de cuentas demo para pruebas.
4. **P-04 Perfil de Usuario (`/perfil`):** Panel integral con nivel, XP, balance de monedas, insignias y descubrimientos del álbum.
5. **P-05 Creador de Avatar Cruceño (`/avatar` y `/setup`):** Canvas interactivo de cuerpo entero y retrato con selección de tonos de piel, peinados y accesorios regionales (sombrero de saó, mochila de expedición).
6. **P-06 Bienvenida (`/bienvenida`):** Presentación del propósito cultural y consagración inicial del usuario como explorador.
7. **P-07 Tutorial Interactivo (`/tutorial`):** Inducción en 3 pasos sobre el flujo de juego, misiones y recompensas.

### B. Módulo de Temporadas y Gamificación
8. **P-08 Mapa de Temporadas (`/temporadas`):** Visualización general de capítulos y estado de progreso.
9. **Pase del Embajador Cruceño (`/temporadas`):** Pista horizontal de progresión tipo Battle Pass con cofres chiquitanos interactivos y modal de misiones secundarias.
10. **P-09 a P-11 Misiones 1 a 4 (`/mision/$misionId`):**
    * **Misión 1:** Fundación de Santa Cruz de la Sierra (1561) y Río Pirai.
    * **Misión 2:** Catedral Metropolitana y Casco Viejo Cruceño.
    * **Misión 3:** Naturaleza viva y Chiquitania.
    * **Misión 4:** Sabores cruceños, gastronomía tradicional y leyendas.
    * *Mecánicas:* Preguntas de opción múltiple, verdadero/falso, casos y dilemas con retroalimentación cultural obligatoria.
11. **P-13 Misión 5: Reto Presencial (`/mision/m5/reto`):** Simulación de geolocalización, captura fotográfica en puntos turísticos y redacción de anécdota.
12. **P-12 Resultados y Recompensas (`/mision/$misionId/resultados`):** Pantalla de evaluación con cálculo de XP, otorgamiento de insignias y retroalimentación de precisión.

### C. Módulo de Juego Social y Retención
13. **P-19 Hub de Juegos (`/jugar`):** Menú central de actividades con acceso a desafíos diarios y juegos alternativos.
14. **P-20 Ruleta Cruceña (`/jugar/ruleta`):** Mecánica de ruleta interactiva con giros diarios y recompensas comerciales.
15. **P-29 Liguillas Privadas (`/liguillas`):** Creación y unión a torneos privados mediante código PIN para colegios y grupos de amigos, con podio y temporizador estilo Kahoot.
16. **P-30 Sopa de Letras Cruceña (`/jugar/sopa`):** Minijuego de destreza táctil buscando palabras autóctonas (Majadito, Toborochi, Tipoy).
17. **P-31 Verdad o Reto Cruceño (`/jugar/retos`):** Dinámica grupal para reuniones sociales de 2 a 6 jugadores con retos culturales.
18. **P-15 Ranking y Ligas (`/ranking`):** Tabla de clasificación comunitaria con competidores sintéticos.

### D. Módulo de Consagración y Difusión
19. **P-16 Certificado Oficial (`/certificado`):** Generador del título digital de "Embajador de Santa Cruz" con orla dorada, fondo pergamino de alta definición, código de verificación criptográfica simulado (`HASH: CRZ-EMB-XXXX`), y **Modo Evaluación** para auditoría rápida sin bloqueo previo.
20. **P-17 Tarjeta Social de Logros (`/compartir`):** Previsualización en formato vertical (9:16) para Instagram Stories y WhatsApp con el **Avatar 3D del explorador**, nivel, estadísticas, pastillas de insignias y generador de enlaces de invitación.
21. **P-18 Panel Administrativo Conceptual (`/admin-conceptual`):** Backoffice accesible mediante clave (`admin`/`admin`) para simular la gestión de temporadas, preguntas y métricas.

---

## 4. CRITERIOS DE CONFORMIDAD TÉCNICA
* **Independencia de Estado:** Todo el progreso reside en el estado reactivo (`useSesion`). No requiere bases de datos activas ni conectividad externa obligatoria para su ejecución.
* **Ergonomía Móvil (Mobile-First):** Optimizado para resoluciones compactas (392px a 430px) y escalable a monitores de escritorio.
* **Pureza Iconográfica:** 100% de la iconografía basada en vectores SVG (Lucide React). Cumplimiento estricto del lineamiento de cero emojis crudos en botones y títulos.
