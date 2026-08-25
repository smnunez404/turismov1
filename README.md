# Embajador Bolivia

necesito que guardes esto como archivo del proyecto, tambien necesito que documentemos el avance y todo lo que se deba documentar para cumplir cada punto de este proyecto, comencemos, los datos deben ser datos sinteticos

Soy Embajador Bolivia — Documento Maestro del Proyecto

Etapa actual: Definición y Prototipado Interactivo del Producto (Pre-MVP) Metodología: Spec-Driven Development (SDD) por sprints Herramienta de construcción: Lovable (HTML / CSS / React vía desarrollo asistido) Prestador: Sergio Mauricio Núñez — marca comercial Adaptive Labs Cliente: Alejandra Caballero Plaza: Santa Cruz de la Sierra, Bolivia Versión del documento: 1.0 Última actualización: Agosto 2026

0. Cómo usar este documento

Este documento es la única fuente de verdad del proyecto. Está diseñado para tres usos simultáneos:

Continuidad entre sesiones. Si se abre una sesión nueva con cualquier asistente de IA, pegar este documento (o sus secciones relevantes) restaura el contexto completo sin necesidad de reexplicar el proyecto.

Base de conocimiento en Obsidian. Cada sección numerada puede convertirse en una nota independiente enlazada. Los identificadores de especificación (SPEC-XX) y de sprint (S-X) funcionan como anclas estables para enlazar entre notas.

Contexto permanente para Lovable. Las secciones 4, 5, 6, 8, 9, 10, 11 y 12 deben estar cargadas en el Knowledge / contexto del proyecto en Lovable. Cada prompt de construcción debe referenciar el SPEC-XX correspondiente en vez de reexplicar el requerimiento.

Regla de oro: si algo no está en este documento, no está acordado. Si algo cambia, se actualiza aquí primero (ver §16 Bitácora de decisiones) y recién después se construye.

1. Ficha del proyecto

Campo Detalle Nombre del producto Soy Embajador Bolivia Tipo de producto Aplicación móvil gamificada de aprendizaje turístico Etapa contratada Definición y Prototipado Interactivo (no desarrollo funcional) Plazo contractual 7 a 15 días hábiles desde pago inicial + entrega de información Rondas de observaciones Una (1) ronda consolidada Entregable principal Prototipo navegable de alta fidelidad (acceso por enlace) Fuera de entregable Código fuente, archivos de diseño, acceso a la plataforma de construcción Temporada activa Temporada 1 — "Descubre Santa Cruz" Temporadas futuras Cultura, Patrimonio, Gastronomía, Naturaleza (solo visibles como bloqueadas)

2. Problemática que el producto resuelve

El producto ataca un problema de vínculo débil entre el ciudadano y su propio patrimonio turístico, descompuesto en cuatro capas. Cada capa está mapeada a un elemento concreto de la experiencia, y ese mapeo es el que justifica cada decisión de diseño del prototipo.

Capa Descripción Elemento de la experiencia que la resuelve Cognitiva — Desconocimiento La persona vive en la ciudad pero no conoce su historia, orígenes ni el porqué de sus símbolos. No sabe explicar sus atractivos a un visitante. Misión 1 (Los Orígenes) y Misión 2 (El Corazón de Santa Cruz) Emocional — Desconexión El conocimiento turístico se percibe como "para turistas", no como algo propio. Aprender sobre turismo se asocia a manuales y folletos aburridos. Narrativa de "Embajador", avatar, insignias, certificado Conductual — Falta de rol anfitrión Aun conociendo datos, la persona no sabe cómo actuar frente a un visitante. No hay hábito de explorar el propio entorno. Misión 4 (Soy un Buen Anfitrión) y Misión 5 (Mi Primera Aventura) Estructural — Información dispersa El contenido turístico existe pero fragmentado y en formatos que no enganchan. Formato unificado: misiones, feedback inmediato, progresión visible

Hipótesis central a validar en esta etapa:

Si el aprendizaje turístico se presenta como juego con progresión y recompensa, las personas lo retienen de forma natural, y ese conocimiento se traduce en orgullo y en acción real (visitar, fotografiar, recomendar, invitar).

Lo que el prototipo debe permitir observar:

¿La navegación se entiende sin explicación?

¿La secuencia de misiones se siente lógica y motivadora?

¿Qué funcionalidades generan más valor percibido y cuáles sobran?

¿El usuario llega hasta el final de la temporada (certificado) o abandona antes?

3. Objetivo de esta etapa

Transformar la visión inicial del proyecto en un prototipo interactivo de alta fidelidad que permita validar la experiencia de usuario, el alcance funcional y la viabilidad del MVP antes de escribir una sola línea de software funcional.

El propósito es reducir riesgo técnico, funcional y económico mediante validación temprana. No es construir el producto: es descubrir qué producto vale la pena construir.

Objetivos específicos de validación:

Experiencia general del usuario

Navegación y usabilidad

Estructura y secuencia de las misiones

Funcionalidades con mayor valor percibido

Oportunidades de simplificación del producto

Definición del alcance definitivo del MVP

4. Alcance del servicio (lo que SÍ se construye)

El prototipo representará la experiencia completa del MVP propuesto. Todo lo listado aquí debe existir, ser navegable y sentirse real, aunque los datos sean simulados.

4.1 Funcionalidades incluidas

# Funcionalidad Naturaleza en el prototipo 1 Pantalla Splash Visual, con transición automática 2 Registro de usuario Simulado (sin persistencia real ni validación de servidor) 3 Inicio de sesión Simulado 4 Perfil de usuario Poblado con datos de estado local 5 Selección de avatar Set predefinido de avatares 6 Pantalla de bienvenida Personalizada con nombre y avatar elegidos 7 Tutorial inicial Secuencia corta de introducción a la mecánica 8 Selección de temporadas Temporada 1 activa; resto visibles y bloqueadas 9 Temporada 1 — Descubre Santa Cruz Contenido completo navegable 10 Desarrollo de cinco misiones Con los cinco tipos de interacción 11 Sistema de puntos Cálculo en estado local durante la sesión 12 Barra de progreso Refleja avance dentro de misión y de temporada 13 Insignias Desbloqueo simulado según reglas definidas 14 Ranking Datos ficticios + posición del usuario 15 Certificado digital Simulado, con nombre del usuario 16 Compartir logros Pantalla de compartir simulada (sin publicación real) 17 Panel administrativo conceptual Vista conceptual, no operativa

4.2 Tipos de interacción a representar

Selección múltiple

Verdadero o falso

Selección de imágenes

Casos prácticos (situaciones con decisión)

Retos (acción presencial)

4.3 Naturaleza del entregable

El prototipo no incorporará lógica de negocio, almacenamiento permanente de información ni conexión a servicios externos. Constituye una simulación de la experiencia de usuario, no un producto funcional.

Esto significa, en términos de construcción en Lovable:

Todo el estado vive en memoria de la sesión (estado de React). Al recargar, se reinicia.

No hay base de datos, no hay autenticación real, no hay llamadas a APIs externas.

El contenido (preguntas, imágenes, textos) se carga desde estructuras de datos locales, no desde un servidor.

5. Fuera de alcance de esta etapa (guardarraíl crítico)

Esta sección es la más importante para proteger el proyecto. Es el límite contractual y también el guardarraíl técnico que evita que el prototipo se convierta accidentalmente en un desarrollo no pagado.

5.1 Lista de exclusiones

Lo siguiente no forma parte de esta etapa y no debe construirse, aunque Lovable lo ofrezca automáticamente o el cliente lo sugiera en una reunión:

❌ Desarrollo Backend

❌ Desarrollo Frontend funcional

❌ Base de datos

❌ Programación (lógica de negocio real)

❌ Inteligencia Artificial funcional

❌ Integraciones con terceros

❌ Publicación en App Store o Google Play

❌ Infraestructura en producción

❌ Desarrollo del panel administrativo definitivo

❌ Carga masiva del contenido

❌ Desarrollo del MVP funcional

Estos servicios podrán contratarse mediante acuerdo independiente.

5.2 Traducción operativa para Lovable

Lovable tiende a proponer o activar automáticamente capacidades que están fuera de alcance. Ante cada una, la respuesta correcta es:

Si Lovable ofrece / sugiere… Acción correcta Conectar Supabase o cualquier base de datos Rechazar. El estado va en memoria. Autenticación real (Auth, OAuth, magic link) Rechazar. El login es una pantalla simulada. Llamadas a APIs externas o integraciones Rechazar. Sin conexiones externas. Funciones de IA en tiempo de ejecución Rechazar. La IA es herramienta de construcción, no funcionalidad del producto. Deploy a producción / dominio propio Rechazar. La entrega es un enlace de demostración. Panel administrativo funcional con CRUD real Rechazar. Solo vista conceptual estática. Persistencia entre recargas (localStorage, backend) Rechazar. El prototipo se reinicia; eso es aceptable y esperado.

5.3 Advertencia sobre alcance vivo

Durante la ejecución, LAS PARTES pueden acordar ajustes menores que optimicen el producto, siempre que no modifiquen sustancialmente el alcance pactado.

Toda solicitud que implique nuevas funcionalidades, rediseños sustanciales o modificaciones del alcance aprobado genera:

Nueva propuesta económica

Actualización del cronograma

Criterio práctico para distinguir:

Ajuste menor → cambiar un color, reordenar dos elementos, corregir un texto, ajustar un ícono.

Cambio de alcance → agregar una sexta misión, agregar una segunda temporada funcional, agregar un modo multijugador, pedir que el ranking funcione con datos reales.

6. Principios de diseño y experiencia

Estos principios rigen toda decisión de diseño. Cuando haya duda sobre cómo resolver algo, se resuelve a favor de estos principios.

No es un manual digitalizado. El usuario debe sentir que juega mientras descubre, no que estudia.

La prioridad es la experiencia. Ante conflicto entre completitud funcional y calidad de experiencia, gana la experiencia.

Aprendizaje por comprensión, no por acierto. Cada respuesta —correcta o incorrecta— entrega una explicación corta. El objetivo es entender, no puntuar.

Feedback cálido, nunca punitivo. Una respuesta incorrecta es una oportunidad de descubrimiento, no un error castigado.

Progresión siempre visible. El usuario debe saber en todo momento dónde está, cuánto avanzó y qué sigue.

Identidad local auténtica. Estética, lenguaje e iconografía deben sentirse cruceñas y bolivianas, no genéricas ni de plantilla internacional.

Simplicidad deliberada. En esta versión no se desarrollan dinámicas complejas. Menos mecánicas, mejor ejecutadas.

6.1 Arco emocional de la experiencia

La experiencia se diseña en tres momentos psicológicos, no solo como secuencia de pantallas:

Momento 1 — Despertar (Onboarding → Misiones 1–2) Objetivo emocional: sorpresa. "¿Esto no lo sabía de mi ciudad?" El tutorial no solo explica mecánicas: plantea una pregunta gancho. La trivia inicial debe sentirse como un test de identidad, no como un examen.

Momento 2 — Descubrir y practicar (Misiones 3–4) Objetivo emocional: competencia. "Ya sé de qué hablo." Aquí el reconocimiento visual y los casos prácticos hacen visible el aprendizaje aplicado. Las insignias parciales y el ranking refuerzan el progreso durante el camino, no solo al final.

Momento 3 — Actuar y compartir (Misión 5 → Certificado) Objetivo emocional: orgullo público. "Soy embajador de mi ciudad." El reto presencial es el corazón de la validación: responde si la gente realmente sale a hacer algo. Compartir e invitar cierra el ciclo: de aprendiz a promotor.

7. Arquitectura de la experiencia

7.1 Flujo principal del usuario

Splash
  ↓
Registro / Inicio de sesión (simulado)
  ↓
Creación de perfil
  ↓
Selección de avatar
  ↓
Pantalla de bienvenida
  ↓
Tutorial corto
  ↓
Mapa / Selección de temporadas   ←──────┐
  ↓                                      │
Temporada 1: Descubre Santa Cruz         │
  ↓                                      │
Pantalla de misión                       │
  ↓                                      │
Desarrollo de preguntas + feedback       │
  ↓                                      │
Pantalla de resultados                   │
  ↓                                      │
Obtención de puntos e insignias ─────────┘  (desbloquea siguiente misión)
  ↓  (al completar las 5 misiones)
Ranking
  ↓
Certificado digital
  ↓
Compartir logro / Invitar amigos


7.2 Inventario de pantallas

ID Pantalla Momento del arco Sprint P-01 Splash — S-1 P-02 Registro Despertar S-1 P-03 Inicio de sesión Despertar S-1 P-04 Creación de perfil Despertar S-1 P-05 Selección de avatar Despertar S-1 P-06 Bienvenida Despertar S-1 P-07 Tutorial Despertar S-1 P-08 Mapa de temporadas Despertar S-2 P-09 Detalle / portada de misión Descubrir S-2 P-10 Pregunta activa (5 variantes) Descubrir S-2 P-11 Feedback de respuesta Descubrir S-2 P-12 Resultados de misión Descubrir S-3 P-13 Reto presencial (Misión 5) Actuar S-3 P-14 Perfil del usuario Transversal S-3 P-15 Ranking Descubrir / Actuar S-3 P-16 Certificado digital Actuar S-4 P-17 Compartir logros / Invitar Actuar S-4 P-18 Panel administrativo conceptual — S-4

8. Modelo de datos simulado

Este modelo no es una base de datos. Es la estructura de los datos locales que alimentan el prototipo. Su valor adicional es que sirve como insumo directo para diseñar el esquema real en la etapa de desarrollo posterior.

Usuario (sesión)

Nombre

Correo (simulado, sin validación)

Avatar seleccionado

Nivel alcanzado

Puntos acumulados

Insignias obtenidas

Progreso por temporada y por misión

Temporada

Identificador

Nombre

Estado: activa / bloqueada

Orden de aparición

Descripción breve

Imagen o ícono representativo

Misión

Identificador

Temporada a la que pertenece

Nombre

Orden dentro de la temporada

Estado: bloqueada / disponible / completada

Descripción breve

Cantidad de preguntas

Puntaje máximo alcanzable

Pregunta

Identificador

Misión a la que pertenece

Tipo: múltiple / verdadero-falso / imagen / caso práctico / reto

Enunciado

Opciones de respuesta

Respuesta correcta

Texto de retroalimentación (explicación corta)

Imagen asociada (cuando aplica)

Puntaje que otorga

Insignia

Identificador

Nombre

Descripción

Criterio de desbloqueo

Ícono

Estado: bloqueada / obtenida

Certificado

Nombre del usuario

Temporada completada

Puntaje final

Fecha de emisión (simulada)

Diseño visual compartible

Ranking

Lista de participantes ficticios con nombre, avatar y puntaje

Posición destacada del usuario actual

9. Especificaciones funcionales (SPEC)

Cada especificación es una unidad de trabajo independiente. En Lovable, cada prompt debe referenciar su SPEC-XX y sus criterios de aceptación.

SPEC-01 — Splash

Pantalla: P-01 Propósito: Establecer identidad visual y de marca desde el primer segundo. Comportamiento: Aparición de logotipo e identidad del producto con transición automática hacia Registro o Inicio de sesión. Criterios de aceptación:

La transición ocurre sin intervención del usuario.

La identidad visual es coherente con el resto del prototipo.

No excede unos pocos segundos de permanencia.

SPEC-02 — Registro (simulado)

Pantalla: P-02 Propósito: Simular el ingreso de un usuario nuevo sin fricción. Comportamiento: Campos de nombre y correo. Al confirmar, avanza al siguiente paso. No hay validación de servidor, no hay verificación de correo, no hay contraseña real. Criterios de aceptación:

Los datos ingresados se reflejan luego en Perfil, Bienvenida y Certificado.

El formulario nunca bloquea el avance por errores técnicos.

Existe acceso visible a "ya tengo cuenta" → Inicio de sesión.

SPEC-03 — Inicio de sesión (simulado)

Pantalla: P-03 Propósito: Representar el retorno de un usuario existente. Comportamiento: Ingreso simulado que lleva directamente al Mapa de temporadas con un estado de progreso de ejemplo. Criterios de aceptación:

Permite demostrar el estado "usuario con progreso" durante la validación con usuarios.

No requiere credenciales reales.

SPEC-04 — Creación de perfil

Pantalla: P-04 Propósito: Capturar los datos mínimos que personalizan la experiencia. Comportamiento: Confirmación o complemento del nombre a mostrar. Tono cálido, no burocrático. Criterios de aceptación:

El nombre capturado se usa en todos los puntos de personalización posteriores.

SPEC-05 — Selección de avatar

Pantalla: P-05 Propósito: Primer acto de identidad del usuario dentro del producto. Comportamiento: Set predefinido de avatares. Selección visual, inmediata, con estado seleccionado claro. Criterios de aceptación:

El avatar elegido aparece en Perfil, Bienvenida, Ranking y Certificado.

La selección se siente como una decisión de identidad, no como un formulario.

SPEC-06 — Bienvenida

Pantalla: P-06 Propósito: Cerrar el onboarding con una sensación de pertenencia. Comportamiento: Saludo personalizado con nombre y avatar. Presenta la narrativa de "Embajador". Criterios de aceptación:

Incluye el nombre real ingresado por el usuario.

Comunica el rol que el usuario está asumiendo, no solo da la bienvenida.

SPEC-07 — Tutorial

Pantalla: P-07 Propósito: Enseñar la mecánica y plantear la pregunta gancho. Comportamiento: Secuencia corta (idealmente 3 pasos) que explica misiones, puntos e insignias, y cierra con una provocación del tipo "¿Qué tan buen embajador de Santa Cruz sos?". Criterios de aceptación:

Es breve y salteable.

Termina con motivación, no con instrucciones.

SPEC-08 — Mapa de temporadas

Pantalla: P-08 Propósito: Mostrar el universo del producto y anclar la progresión. Comportamiento: Temporada 1 activa y accesible. Temporadas Cultura, Patrimonio, Gastronomía y Naturaleza visibles pero bloqueadas, con indicador de "próximamente". Criterios de aceptación:

Las temporadas bloqueadas no son accesibles pero sí visibles y atractivas.

Se comunica que el producto tiene recorrido futuro (valor percibido).

SPEC-09 — Portada de misión

Pantalla: P-09 Propósito: Contextualizar antes de jugar. Comportamiento: Nombre de la misión, descripción breve, cantidad de preguntas, puntaje alcanzable, estado. Botón de inicio. Criterios de aceptación:

Refleja correctamente el estado bloqueada / disponible / completada.

Las misiones se desbloquean secuencialmente.

SPEC-10 — Motor de preguntas (5 variantes)

Pantalla: P-10 Propósito: Núcleo de la experiencia de aprendizaje. Variantes a representar:

Selección múltiple — enunciado + opciones de texto

Verdadero o falso — enunciado + dos opciones

Selección de imágenes — enunciado + grilla de imágenes seleccionables

Caso práctico — situación narrada + opciones de decisión

Reto — instrucción de acción presencial (ver SPEC-13)

Criterios de aceptación:

Las cinco variantes están representadas al menos una vez en la temporada.

Indicador de progreso dentro de la misión siempre visible (ej. "3 de 8").

Una sola pregunta por pantalla; sin scroll excesivo.

SPEC-11 — Feedback de respuesta

Pantalla: P-11 Propósito: Convertir cada respuesta en aprendizaje. Comportamiento: Tras responder, se muestra si fue correcta y siempre una explicación corta. Tono cálido en caso de error. Criterios de aceptación:

El feedback aparece incluso en respuestas correctas (refuerza y amplía).

Nunca se usa lenguaje punitivo.

El usuario no puede avanzar sin ver la explicación.

SPEC-12 — Resultados de misión

Pantalla: P-12 Propósito: Cerrar el ciclo de la misión con recompensa. Comportamiento: Puntaje obtenido, aciertos, insignia desbloqueada (si aplica), avance de temporada, botón para continuar a la siguiente misión. Criterios de aceptación:

La obtención de insignia se siente como un momento, no como un dato.

Actualiza barra de progreso de temporada.

SPEC-13 — Reto presencial (Misión 5)

Pantalla: P-13 Propósito: Llevar el aprendizaje al mundo real. Es la validación conductual más importante del prototipo. Comportamiento: Instrucción de visitar un lugar, tomar una fotografía y compartir la experiencia. Simulación de carga de foto (sin almacenamiento real). Invitación a sumar amigos como embajadores. Criterios de aceptación:

La carga de foto es simulada; el prototipo no persiste el archivo.

Se comunica claramente la acción esperada en el mundo real.

Incluye el llamado a invitar amigos.

SPEC-14 — Perfil del usuario

Pantalla: P-14 Propósito: Espejo del progreso e identidad del usuario. Comportamiento: Muestra avatar, nivel alcanzado, puntos acumulados, insignias obtenidas (con las bloqueadas visibles en estado apagado) y progreso de la temporada. Criterios de aceptación:

Las insignias no obtenidas se ven, pero apagadas (genera deseo de completar).

Los datos reflejan el estado real de la sesión.

SPEC-15 — Ranking

Pantalla: P-15 Propósito: Motivación social y comparación. Comportamiento: Lista de participantes con datos ficticios, avatar y puntaje. Posición del usuario actual destacada. Criterios de aceptación:

Los datos son claramente ficticios pero verosímiles.

La posición del usuario se destaca visualmente.

SPEC-16 — Certificado digital

Pantalla: P-16 Propósito: Materializar el logro. Punto máximo del arco emocional. Comportamiento: Certificado con nombre del usuario, temporada completada, puntaje y fecha. Diseño pensado para ser capturado y compartido. Criterios de aceptación:

Incluye el nombre real ingresado.

El diseño es visualmente compartible (formato apto para redes).

Es simulado: no se genera archivo descargable real.

SPEC-17 — Compartir logros e invitar

Pantalla: P-17 Propósito: Cerrar el ciclo: de aprendiz a promotor. Comportamiento: Opciones simuladas de compartir a redes e invitar amigos a sumarse como embajadores. Criterios de aceptación:

No hay integración real con APIs de redes sociales.

La acción se representa de forma creíble para la validación.

SPEC-18 — Panel administrativo conceptual

Pantalla: P-18 Propósito: Mostrar al cliente cómo se administrará el contenido a futuro, sin construirlo. Comportamiento: Vista estática que representa la gestión de preguntas, respuestas, imágenes y puntajes. Criterios de aceptación:

Es conceptual: no ejecuta ninguna operación real.

Comunica claramente su carácter demostrativo.

10. Reglas de gamificación

Elemento Regla en el prototipo Puntos Cada respuesta correcta otorga puntaje. El puntaje se acumula por misión y por temporada. Los valores exactos se definen junto con el contenido. Barra de progreso Existe en dos niveles: dentro de la misión (pregunta actual / total) y dentro de la temporada (misiones completadas / 5). Desbloqueo de misiones Secuencial. La misión N+1 se desbloquea al completar la misión N. Insignias Mínimo una insignia por misión completada, más insignias especiales (ej. temporada completa, desempeño destacado, reto presencial cumplido). Nivel Derivado de los puntos acumulados. Visible en Perfil. Ranking Comparación con participantes ficticios. Se actualiza con el puntaje de la sesión. Certificado Se emite al completar las 5 misiones de la Temporada 1.

Nota de diseño: las recompensas deben entregarse durante el recorrido, no solo al final. Un usuario que no recibe nada hasta la misión 5 abandona antes.

11. Estructura de contenido — Temporada 1: "Descubre Santa Cruz"

Volumen total estimado: 40–50 preguntas, 30–50 imágenes, más curiosidades, retroalimentaciones, puntos e insignias.

Estado del contenido: el contenido definitivo será preparado por EL CLIENTE. En esta etapa no se desarrolla el contenido, únicamente la estructura para alojarlo. El prototipo usará contenido de muestra representativo.

Misión Nombre Temática Preguntas Tipo de interacción dominante M1 Los Orígenes Historia, fundación, identidad camba, Cañoto, curiosidades 8–10 Selección múltiple, verdadero/falso M2 El Corazón de Santa Cruz Plaza 24 de Septiembre, Catedral, museos, patrimonio urbano 8–10 Selección múltiple, selección de imágenes M3 Explorador del Destino Atractivos naturales, culturales y patrimoniales 8–10 Selección de imágenes M4 Soy un Buen Anfitrión Casos de atención, recomendaciones y comportamiento 8–10 Casos prácticos M5 Mi Primera Aventura Reto presencial: visitar, fotografiar, compartir, invitar 1 reto Reto

12. Plan de sprints

Cuatro sprints cortos alineados al plazo contractual de 7 a 15 días hábiles. Cada sprint cierra con un incremento navegable.

Sprint 0 — Alineación y fundaciones

Objetivo: Dejar todo listo para construir sin ambigüedades.

Reunión inicial de alineación con el cliente

Revisión del documento funcional

Identificación de dudas y supuestos (§14)

Priorización de funcionalidades

Definición de identidad visual: paleta, tipografía, tono, iconografía

Organización del flujo principal del usuario

Diseño de arquitectura de pantallas

Configuración del proyecto en Lovable y carga de este documento como contexto

Entregable del sprint: flujo y arquitectura de pantallas aprobados; sistema visual definido.

Sprint 1 — Identidad y onboarding

Objetivo: Que el usuario pueda entrar, crear su identidad y entender el juego.

Specs: SPEC-01, SPEC-02, SPEC-03, SPEC-04, SPEC-05, SPEC-06, SPEC-07 Pantallas: P-01 a P-07

Entregable del sprint: recorrido completo desde Splash hasta Tutorial, navegable de punta a punta.

Sprint 2 — Núcleo de misiones

Objetivo: El corazón del producto. Es el sprint más pesado y el que más valor de validación entrega.

Specs: SPEC-08, SPEC-09, SPEC-10 (5 variantes), SPEC-11 Pantallas: P-08 a P-11

Entregable del sprint: Misiones 1 a 4 jugables con las cinco variantes de interacción y feedback funcionando.

Sprint 3 — Gamificación, reto y progreso

Objetivo: Que el avance se sienta y se vea.

Specs: SPEC-12, SPEC-13, SPEC-14, SPEC-15 + reglas de §10 Pantallas: P-12 a P-15

Entregable del sprint: puntos, insignias, progreso, perfil, ranking y reto presencial integrados.

Sprint 4 — Cierre, certificado y consolidación

Objetivo: Cerrar el ciclo emocional y dejar el prototipo listo para validar.

Specs: SPEC-16, SPEC-17, SPEC-18 Pantallas: P-16 a P-18 Además:

Validación conjunta con el cliente

Incorporación de la ronda única consolidada de observaciones

Pulido visual y de consistencia

Preparación de los documentos entregables (§13)

Entregable del sprint: prototipo completo navegable + documentación de cierre.

13. Entregables finales

# Entregable Descripción 1 Prototipo interactivo navegable Representación visual del funcionamiento del MVP. Se entrega mediante enlace de acceso a la demostración. 2 Flujo funcional del producto Documento que describe la navegación principal y la experiencia planteada para la primera versión. 3 Documento de alcance validado del MVP Funcionalidades que formarán parte del MVP y de la primera versión, ya validadas. 4 Roadmap inicial del proyecto Propuesta de evolución del producto en etapas futuras. 5 Estimación de desarrollo Estimación preliminar de tiempo, inversión y fases para construir el MVP funcional.

No forman parte del entregable: código fuente, archivos de diseño, ni acceso a la plataforma de construcción, salvo acuerdo expreso, escrito y adicional entre LAS PARTES.

14. Definition of Ready / Definition of Done

Definition of Ready (una spec está lista para construirse si…)

Su comportamiento está descrito en §9

Sus criterios de aceptación están definidos

El contenido de muestra necesario está disponible

No depende de ninguna funcionalidad excluida en §5

Definition of Done (una spec está terminada si…)

Cumple todos sus criterios de aceptación

Es navegable desde y hacia las pantallas contiguas del flujo

Respeta los principios de diseño de §6

No introduce ninguna capacidad listada en §5.1

El estado simulado se comporta de forma coherente con el resto del prototipo

Está registrada en la bitácora de decisiones si hubo alguna definición nueva

15. Riesgos, supuestos y preguntas abiertas

Riesgos identificados

Riesgo Impacto Mitigación Contenido definitivo no llega a tiempo Bloquea Sprint 2 y 3 El prototipo usa contenido de muestra; se acuerda fecha de entrega como hito temprano Expansión no controlada del alcance Retrabajo no pagado, incumplimiento de plazo Aplicar §5.3 sin excepciones; toda solicitud nueva → nueva propuesta Lovable activa capacidades fuera de alcance Convierte el prototipo en desarrollo Aplicar tabla de §5.2 en cada prompt Observaciones fragmentadas en vez de consolidadas Consume la única ronda contratada Recordar al cliente la obligación de emitir observaciones consolidadas Retrasos atribuibles al cliente Extiende el plazo El plazo se amplía por período equivalente a la demora (cláusula contractual)

Supuestos vigentes

El prototipo se reinicia al recargar; esto es aceptable y esperado.

El ranking usa datos ficticios verosímiles.

Las temporadas 2 a 5 solo existen como referencia visual bloqueada.

El panel administrativo es una vista conceptual, sin operación.

Preguntas abiertas a confirmar con el cliente

¿Existe identidad de marca previa (logotipo, paleta, tipografía) o se define desde cero en Sprint 0?

¿El nombre definitivo del producto está confirmado y registrado?

¿Cuántos avatares se ofrecen y con qué estética?

¿Qué imágenes reales de Santa Cruz estarán disponibles y con qué derechos de uso?

¿El certificado debe llevar algún respaldo institucional (universidad, entidad turística)?

¿Fecha comprometida de entrega del contenido de la Temporada 1?

16. Bitácora de decisiones

Registro de toda definición relevante tomada durante el proyecto. Mantener actualizado: es la evidencia de alcance aprobado.

Fecha Decisión Origen Impacto en alcance — Construcción íntegra en Lovable con metodología SDD por sprints Prestador Ninguno — El prototipo no incorpora persistencia ni backend Contrato, cláusula Tercera Define naturaleza del entregable —

17. Glosario

Término Significado MVP Producto Mínimo Viable. Primera versión funcional con lo esencial para validar la hipótesis. Prototipo de alta fidelidad Simulación visual e interactiva que se ve y se navega como el producto real, pero sin lógica funcional. SDD (Spec-Driven Development) Metodología donde cada unidad de trabajo parte de una especificación con criterios de aceptación definidos antes de construir. Sprint Ciclo corto de trabajo que termina en un incremento navegable. Embajador Rol narrativo que asume el usuario dentro del producto. Ronda consolidada Conjunto único de observaciones agrupadas, contractualmente limitado a una por proyecto. Ajuste menor Cambio que optimiza sin alterar sustancialmente el alcance pactado. Cambio de alcance Solicitud que agrega funcionalidad o rediseña sustancialmente; genera nueva propuesta económica.

Documento maestro — versión 1.0. Toda modificación de alcance debe registrarse en §16 antes de ser construida.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ambajador-bolivia.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8b83c819-82dd-4484-9efd-7769a8cffc1b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
