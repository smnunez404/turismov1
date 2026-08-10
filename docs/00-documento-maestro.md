# Soy Embajador Bolivia — Documento Maestro del Proyecto

> Fuente única de verdad. Versión 1.0 — Agosto 2026.
> Si algo no está en este documento, no está acordado. Si algo cambia, se actualiza
> aquí primero (ver [Bitácora de decisiones](./04-bitacora-decisiones.md)) y recién
> después se construye.

| Campo | Detalle |
| --- | --- |
| Etapa actual | Definición y Prototipado Interactivo del Producto (Pre-MVP) |
| Metodología | Spec-Driven Development (SDD) por sprints |
| Herramienta de construcción | Lovable (HTML / CSS / React vía desarrollo asistido) |
| Prestador | Sergio Mauricio Núñez — marca comercial Adaptive Labs |
| Cliente | Alejandra Caballero |
| Plaza | Santa Cruz de la Sierra, Bolivia |
| Versión del documento | 1.0 |
| Última actualización | Agosto 2026 |

## 0. Cómo usar este documento

Este documento tiene tres usos simultáneos:

1. **Continuidad entre sesiones.** Pegar el documento (o sus secciones relevantes) en
   una sesión nueva restaura el contexto completo.
2. **Base de conocimiento en Obsidian.** Cada sección numerada puede convertirse en una
   nota independiente enlazada. Los identificadores `SPEC-XX` y `S-X` son anclas estables.
3. **Contexto permanente para Lovable.** Las secciones 4, 5, 6, 8, 9, 10, 11 y 12 deben
   estar cargadas en el contexto del proyecto. Cada prompt referencia su `SPEC-XX`.

## 1. Ficha del proyecto

| Campo | Detalle |
| --- | --- |
| Nombre del producto | Soy Embajador Bolivia |
| Tipo de producto | Aplicación móvil gamificada de aprendizaje turístico |
| Etapa contratada | Definición y Prototipado Interactivo (no desarrollo funcional) |
| Plazo contractual | 7 a 15 días hábiles desde pago inicial + entrega de información |
| Rondas de observaciones | Una (1) ronda consolidada |
| Entregable principal | Prototipo navegable de alta fidelidad (acceso por enlace) |
| Fuera de entregable | Código fuente, archivos de diseño, acceso a la plataforma de construcción |
| Temporada activa | Temporada 1 — "Descubre Santa Cruz" |
| Temporadas futuras | Cultura, Patrimonio, Gastronomía, Naturaleza (solo visibles como bloqueadas) |

## 2. Problemática que el producto resuelve

| Capa | Descripción | Elemento de la experiencia que la resuelve |
| --- | --- | --- |
| Cognitiva — Desconocimiento | La persona vive en la ciudad pero no conoce su historia, orígenes ni el porqué de sus símbolos. No sabe explicar sus atractivos a un visitante. | Misión 1 (Los Orígenes) y Misión 2 (El Corazón de Santa Cruz) |
| Emocional — Desconexión | El conocimiento turístico se percibe como "para turistas". Aprender sobre turismo se asocia a manuales y folletos aburridos. | Narrativa de "Embajador", avatar, insignias, certificado |
| Conductual — Falta de rol anfitrión | Aun conociendo datos, la persona no sabe cómo actuar frente a un visitante. No hay hábito de explorar el propio entorno. | Misión 4 (Soy un Buen Anfitrión) y Misión 5 (Mi Primera Aventura) |
| Estructural — Información dispersa | El contenido turístico existe pero fragmentado y en formatos que no enganchan. | Formato unificado: misiones, feedback inmediato, progresión visible |

**Hipótesis central a validar:** si el aprendizaje turístico se presenta como juego con
progresión y recompensa, las personas lo retienen de forma natural, y ese conocimiento se
traduce en orgullo y en acción real (visitar, fotografiar, recomendar, invitar).

Lo que el prototipo debe permitir observar:

- ¿La navegación se entiende sin explicación?
- ¿La secuencia de misiones se siente lógica y motivadora?
- ¿Qué funcionalidades generan más valor percibido y cuáles sobran?
- ¿El usuario llega hasta el final de la temporada (certificado) o abandona antes?

## 3. Objetivo de esta etapa

Transformar la visión inicial en un prototipo interactivo de alta fidelidad que permita
validar la experiencia de usuario, el alcance funcional y la viabilidad del MVP antes de
escribir una sola línea de software funcional. No es construir el producto: es descubrir
qué producto vale la pena construir.

Objetivos específicos de validación: experiencia general del usuario; navegación y
usabilidad; estructura y secuencia de las misiones; funcionalidades con mayor valor
percibido; oportunidades de simplificación; definición del alcance definitivo del MVP.

## 4. Alcance del servicio (lo que SÍ se construye)

### 4.1 Funcionalidades incluidas

| # | Funcionalidad | Naturaleza en el prototipo |
| --- | --- | --- |
| 1 | Pantalla Splash | Visual, con transición automática |
| 2 | Registro de usuario | Simulado (sin persistencia real ni validación de servidor) |
| 3 | Inicio de sesión | Simulado |
| 4 | Perfil de usuario | Poblado con datos de estado local |
| 5 | Selección de avatar | Set predefinido de avatares |
| 6 | Pantalla de bienvenida | Personalizada con nombre y avatar elegidos |
| 7 | Tutorial inicial | Secuencia corta de introducción a la mecánica |
| 8 | Selección de temporadas | Temporada 1 activa; resto visibles y bloqueadas |
| 9 | Temporada 1 — Descubre Santa Cruz | Contenido completo navegable |
| 10 | Desarrollo de cinco misiones | Con los cinco tipos de interacción |
| 11 | Sistema de puntos | Cálculo en estado local durante la sesión |
| 12 | Barra de progreso | Refleja avance dentro de misión y de temporada |
| 13 | Insignias | Desbloqueo simulado según reglas definidas |
| 14 | Ranking | Datos ficticios + posición del usuario |
| 15 | Certificado digital | Simulado, con nombre del usuario |
| 16 | Compartir logros | Pantalla de compartir simulada (sin publicación real) |
| 17 | Panel administrativo conceptual | Vista conceptual, no operativa |

### 4.2 Tipos de interacción a representar

Selección múltiple · Verdadero o falso · Selección de imágenes · Casos prácticos
(situaciones con decisión) · Retos (acción presencial).

### 4.3 Naturaleza del entregable

El prototipo no incorpora lógica de negocio, almacenamiento permanente ni conexión a
servicios externos. Es una simulación de la experiencia de usuario. En términos de
construcción:

- Todo el estado vive en memoria de la sesión (estado de React). Al recargar, se reinicia.
- No hay base de datos, autenticación real ni llamadas a APIs externas.
- El contenido se carga desde estructuras de datos locales.

## 5. Fuera de alcance de esta etapa (guardarraíl crítico)

Detalle operativo en [Guardarraíles](./05-guardarrailes.md).

### 5.1 Lista de exclusiones

No forma parte de esta etapa y no debe construirse: desarrollo backend; desarrollo
frontend funcional; base de datos; programación de lógica de negocio real; inteligencia
artificial funcional; integraciones con terceros; publicación en App Store o Google Play;
infraestructura en producción; panel administrativo definitivo; carga masiva de contenido;
desarrollo del MVP funcional. Estos servicios podrán contratarse por acuerdo independiente.

### 5.2 Traducción operativa para Lovable

| Si Lovable ofrece / sugiere… | Acción correcta |
| --- | --- |
| Conectar Supabase o cualquier base de datos | Rechazar. El estado va en memoria. |
| Autenticación real (Auth, OAuth, magic link) | Rechazar. El login es una pantalla simulada. |
| Llamadas a APIs externas o integraciones | Rechazar. Sin conexiones externas. |
| Funciones de IA en tiempo de ejecución | Rechazar. La IA es herramienta de construcción, no funcionalidad. |
| Deploy a producción / dominio propio | Rechazar. La entrega es un enlace de demostración. |
| Panel administrativo funcional con CRUD real | Rechazar. Solo vista conceptual estática. |
| Persistencia entre recargas (localStorage, backend) | Rechazar. El prototipo se reinicia; es esperado. |

### 5.3 Advertencia sobre alcance vivo

Las partes pueden acordar ajustes menores que no modifiquen sustancialmente el alcance.
Toda solicitud que implique nuevas funcionalidades, rediseños sustanciales o
modificaciones del alcance aprobado genera nueva propuesta económica y actualización del
cronograma.

- **Ajuste menor:** cambiar un color, reordenar dos elementos, corregir un texto, ajustar un ícono.
- **Cambio de alcance:** agregar una sexta misión, una segunda temporada funcional, modo multijugador, ranking con datos reales.

## 6. Principios de diseño y experiencia

1. **No es un manual digitalizado.** El usuario juega mientras descubre.
2. **La prioridad es la experiencia.** Ante conflicto con completitud funcional, gana la experiencia.
3. **Aprendizaje por comprensión, no por acierto.** Cada respuesta entrega explicación corta.
4. **Feedback cálido, nunca punitivo.**
5. **Progresión siempre visible.**
6. **Identidad local auténtica.** Estética cruceña y boliviana, no plantilla internacional.
7. **Simplicidad deliberada.** Menos mecánicas, mejor ejecutadas.

### 6.1 Arco emocional

- **Momento 1 — Despertar (Onboarding → M1–M2).** Sorpresa: "¿Esto no lo sabía de mi ciudad?"
- **Momento 2 — Descubrir y practicar (M3–M4).** Competencia: "Ya sé de qué hablo."
- **Momento 3 — Actuar y compartir (M5 → Certificado).** Orgullo público: "Soy embajador de mi ciudad."

## 7. Arquitectura de la experiencia

### 7.1 Flujo principal del usuario

```text
Splash
  |
Registro / Inicio de sesion (simulado)
  |
Creacion de perfil
  |
Seleccion de avatar
  |
Pantalla de bienvenida
  |
Tutorial corto
  |
Mapa / Seleccion de temporadas   <------+
  |                                     |
Temporada 1: Descubre Santa Cruz        |
  |                                     |
Pantalla de mision                      |
  |                                     |
Desarrollo de preguntas + feedback      |
  |                                     |
Pantalla de resultados                  |
  |                                     |
Puntos e insignias ---------------------+  (desbloquea siguiente mision)
  |  (al completar las 5 misiones)
Ranking
  |
Certificado digital
  |
Compartir logro / Invitar amigos
```

### 7.2 Inventario de pantallas

Ver [Inventario de pantallas](./03-pantallas.md) con rutas reales y estado.

## 8. Modelo de datos simulado

Ver [Modelo de datos simulado](./07-modelo-datos-simulado.md) para los tipos TypeScript.
Entidades: Usuario (sesión), Temporada, Misión, Pregunta, Insignia, Certificado, Ranking.

## 9. Especificaciones funcionales (SPEC)

Una nota por especificación en [`02-specs/`](./02-specs/). Cada prompt de construcción
referencia su `SPEC-XX` y sus criterios de aceptación.

## 10. Reglas de gamificación

| Elemento | Regla en el prototipo |
| --- | --- |
| Puntos | Cada respuesta correcta otorga puntaje; se acumula por misión y por temporada. |
| Barra de progreso | Dos niveles: dentro de la misión y dentro de la temporada (misiones / 5). |
| Desbloqueo de misiones | Secuencial: la misión N+1 se desbloquea al completar la N. |
| Insignias | Mínimo una por misión completada, más insignias especiales. |
| Nivel | Derivado de los puntos acumulados. Visible en Perfil. |
| Ranking | Comparación con participantes ficticios; se actualiza con el puntaje de la sesión. |
| Certificado | Se emite al completar las 5 misiones de la Temporada 1. |

Nota: las recompensas se entregan durante el recorrido, no solo al final.

## 11. Estructura de contenido — Temporada 1: "Descubre Santa Cruz"

Volumen estimado: 40–50 preguntas, 30–50 imágenes, más curiosidades, retroalimentaciones,
puntos e insignias. El contenido definitivo será preparado por el cliente; el prototipo usa
contenido de muestra sintético (ver [Contenido de muestra](./08-contenido-muestra.md)).

| Misión | Nombre | Temática | Preguntas | Interacción dominante |
| --- | --- | --- | --- | --- |
| M1 | Los Orígenes | Historia, fundación, identidad camba, Cañoto, curiosidades | 8–10 | Selección múltiple, verdadero/falso |
| M2 | El Corazón de Santa Cruz | Plaza 24 de Septiembre, Catedral, museos, patrimonio urbano | 8–10 | Selección múltiple, selección de imágenes |
| M3 | Explorador del Destino | Atractivos naturales, culturales y patrimoniales | 8–10 | Selección de imágenes |
| M4 | Soy un Buen Anfitrión | Casos de atención, recomendaciones y comportamiento | 8–10 | Casos prácticos |
| M5 | Mi Primera Aventura | Reto presencial: visitar, fotografiar, compartir, invitar | 1 reto | Reto |

## 12. Plan de sprints

Ver [`sprints/`](./sprints/). Sprint 0 fundaciones · Sprint 1 identidad y onboarding ·
Sprint 2 núcleo de misiones · Sprint 3 gamificación, reto y progreso · Sprint 4 cierre,
certificado y consolidación.

## 13. Entregables finales

| # | Entregable | Descripción |
| --- | --- | --- |
| 1 | Prototipo interactivo navegable | Se entrega mediante enlace de acceso a la demostración. |
| 2 | Flujo funcional del producto | Documento que describe la navegación y la experiencia planteada. |
| 3 | Documento de alcance validado del MVP | Funcionalidades validadas que formarán parte del MVP. |
| 4 | Roadmap inicial del proyecto | Propuesta de evolución en etapas futuras. |
| 5 | Estimación de desarrollo | Estimación preliminar de tiempo, inversión y fases. |

No forman parte del entregable: código fuente, archivos de diseño, ni acceso a la
plataforma de construcción, salvo acuerdo expreso, escrito y adicional.

## 14. Definition of Ready / Definition of Done

**Ready:** comportamiento descrito en §9; criterios de aceptación definidos; contenido de
muestra disponible; no depende de nada excluido en §5.

**Done:** cumple todos sus criterios; es navegable desde y hacia las pantallas contiguas;
respeta los principios de §6; no introduce capacidades de §5.1; el estado simulado es
coherente; queda registrada en la bitácora si hubo definición nueva.

## 15. Riesgos, supuestos y preguntas abiertas

| Riesgo | Impacto | Mitigación |
| --- | --- | --- |
| Contenido definitivo no llega a tiempo | Bloquea Sprint 2 y 3 | Contenido de muestra; fecha de entrega como hito temprano |
| Expansión no controlada del alcance | Retrabajo no pagado, incumplimiento de plazo | Aplicar §5.3 sin excepciones |
| Lovable activa capacidades fuera de alcance | Convierte el prototipo en desarrollo | Aplicar tabla §5.2 en cada prompt |
| Observaciones fragmentadas | Consume la única ronda contratada | Recordar la obligación de observaciones consolidadas |
| Retrasos atribuibles al cliente | Extiende el plazo | El plazo se amplía por período equivalente |

**Supuestos vigentes:** el prototipo se reinicia al recargar; el ranking usa datos
ficticios verosímiles; las temporadas 2 a 5 solo existen como referencia visual bloqueada;
el panel administrativo es vista conceptual.

**Preguntas abiertas:** identidad de marca previa; nombre definitivo registrado; cantidad y
estética de avatares; imágenes reales disponibles y derechos de uso; respaldo institucional
del certificado; fecha comprometida de entrega del contenido de la Temporada 1.

## 16. Bitácora de decisiones

Ver [Bitácora de decisiones](./04-bitacora-decisiones.md).

## 17. Glosario

| Término | Significado |
| --- | --- |
| MVP | Producto Mínimo Viable. |
| Prototipo de alta fidelidad | Simulación visual e interactiva sin lógica funcional. |
| SDD | Spec-Driven Development: cada unidad de trabajo parte de una spec con criterios de aceptación. |
| Sprint | Ciclo corto de trabajo que termina en un incremento navegable. |
| Embajador | Rol narrativo que asume el usuario dentro del producto. |
| Ronda consolidada | Conjunto único de observaciones agrupadas, una por proyecto. |
| Ajuste menor | Cambio que optimiza sin alterar sustancialmente el alcance. |
| Cambio de alcance | Solicitud que agrega funcionalidad o rediseña sustancialmente. |