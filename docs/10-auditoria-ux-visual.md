# Auditoría UX y QA visual mobile-first (P-01 a P-18)

Fecha: 10 de agosto de 2026 · Viewport de referencia: **390 × 844** (iPhone 12/13/14 Pro),
device scale factor 2, recorrido automatizado con Playwright sobre el prototipo local.

Objetivo: verificar que ninguna pantalla quedó con UI genérica (emojis, iconografía
por defecto, tipografía de sistema) y que el recorrido completo es cómodo en mano.

---

## 1. Método

1. Recorrido real de usuario: registro → perfil → avatar → bienvenida → tutorial →
   temporadas → misión → juego → feedback → resultados → reto presencial.
2. Acceso directo a las pantallas independientes (perfil, ranking, certificado,
   compartir, admin conceptual, login).
3. Captura por pantalla y revisión de: jerarquía tipográfica, densidad, altura de
   los objetivos táctiles (mínimo 44 px), balance vertical, iconografía y contraste.
4. Registro de errores de consola durante todo el recorrido.

## 2. Resultado global

| Dimensión | Estado |
| --- | --- |
| Emojis en la interfaz | **0** — reemplazados por el sistema `<Icono />` (lucide) |
| Avatares | 6 ilustraciones propias en `src/assets/avatares/` |
| Tipografía | Serif expresiva para títulos + sans geométrica para texto (no genérica) |
| Paleta | Verde tropical, sol y terracota sobre crema (tokens semánticos) |
| Errores de consola | Ninguno en el recorrido completo |
| Objetivos táctiles | Botones e inputs ≥ 48 px de alto |

## 3. Hallazgos por SPEC

| # | SPEC / Pantalla | Hallazgo | Severidad | Estado |
| --- | --- | --- | --- | --- |
| A-01 | SPEC-02 · P-02 Registro | Campo de correo sin `type="email"` ni `inputMode="email"`: el teclado móvil abría en modo texto | Alta | Corregido |
| A-02 | SPEC-02 · P-02 Registro | Sin salida hacia atrás desde el registro | Media | Corregido (enlace “← Volver”) |
| A-03 | SPEC-03 · P-03 Login | Correo sin `type="email"`; contraseña sin `autoComplete` | Media | Corregido |
| A-04 | SPEC-04/05/06/07 · Onboarding | Contenido centrado verticalmente dejaba ~300 px muertos arriba en pantallas altas | Media | Corregido (alineación superior con respiro fijo) |
| A-05 | Transversal · contenedor `Pantalla` | `min-h-screen` provoca saltos con la barra del navegador móvil; sin áreas seguras | Media | Corregido (`min-h-dvh` + `env(safe-area-inset-*)`) |
| A-06 | SPEC-09 · P-09 Portada de misión | La insignia mostraba el texto literal de la clave del icono (“pergamino”) en vez del pictograma | **Crítica** | Corregido (`IconoPastilla`) |
| A-07 | SPEC-13 · P-13 Reto presencial | “Plaza 24 de Septiembre” usaba un reloj de arena (mapeo heredado del emoji) | Baja | Corregido (icono de hito urbano) |
| A-08 | SPEC-14 · P-14 Perfil | La insignia “Alma de la Plaza” compartía el mismo icono equivocado | Baja | Corregido |
| A-09 | SPEC-11 · P-11 Feedback | Verificado: feedback obligatorio, color + icono (no solo color) para correcto/incorrecto | — | Conforme |
| A-10 | SPEC-12 · P-12 Resultados | Verificado: jerarquía puntaje/aciertos/insignia/progreso y tres acciones claras | — | Conforme |
| A-11 | SPEC-18 · P-18 Admin conceptual | Aviso de “vista conceptual” visible antes del contenido; se lee bien también en móvil | — | Conforme |
| A-12 | SPEC-17 · P-17 Compartir | Estado vacío con icono, explicación y acción directa a misiones | — | Conforme |

## 4. Criterios UX aplicados (mobile-first)

- Un objetivo por pantalla y acción principal siempre alcanzable con el pulgar.
- Botones e inputs de al menos 48 px de alto; nunca dos acciones primarias juntas.
- Texto base de 16 px para evitar el zoom automático de iOS en los formularios.
- Estados bloqueados y vacíos siempre explican **qué hacer para desbloquear**.
- El color nunca es el único portador de información: siempre acompaña un icono o texto.
- Áreas seguras respetadas arriba y abajo (notch y barra de gestos).

## 5. Pendientes sugeridos (no bloquean la validación)

1. Persistencia opcional del avance en el navegador para retomar la demo tras recargar.
2. Micro-animación de entrada de la insignia en resultados.
3. Revisión de textos largos en pantallas de 320 px de ancho (iPhone SE 1ª gen).
