# Plan de implementación — Rediseño como juego social recurrente

> Estado: **implementado en el prototipo; validación con usuarios pendiente** · Fecha: 27 de agosto de 2026
> Origen: retroalimentación de la cliente después de probar el prototipo.
> La implementación conserva los límites acordados: sin backend, persistencia, multijugador
> real, analítica externa ni canjes reales.

## 1. Resumen ejecutivo

La retroalimentación no pide eliminar el producto actual: pide cambiar su centro de gravedad.
La marca, el concepto de temporadas, el contenido base, la identidad cruceña y la evolución
hacia “Embajador” se conservan. Lo que debe cambiar es la primera impresión y el ciclo
principal: el usuario entra para jugar y descubre, como consecuencia del progreso, que se
está convirtiendo en Embajador.

La prioridad no es sumar más pantallas ni cientos de preguntas. Es comprobar que un ciclo de
60–90 segundos provoca voluntariamente “una más”, revancha y retorno al día siguiente.
Por eso el trabajo se divide en dos alcances:

1. **MVP de experiencia, dentro del prototipo actual:** 20 desafíos excelentes, cinco
   mecánicas, juego como invitado, XP/monedas separados, niveles, ranking, versus simulado,
   reto diario simulado, racha de sesión, una insignia y una colección. Todo local y en memoria.
2. **MVP funcional posterior:** cuentas reales, persistencia, DAU/retención, desafío diario
   común verificable, rankings concurrentes, amigos, versus real, notificaciones y canjes.
   Requiere nueva propuesta técnica/económica porque contradice los guardarraíles actuales.

## 2. Decisión de producto

**Promesa principal:** “Jugá para descubrir cuánto conocés Santa Cruz.”

**Transformación emocional:**

```text
Curiosidad → juego rápido → descubrimiento → comparación → progreso → colección
→ hábito → reconocimiento como Embajador
```

“Embajador” permanece como nivel aspiracional y premio narrativo. No debe presentarse como
profesión, requisito previo ni explicación académica del producto.

### 2.1 Lo que se conserva

- Nombre e identidad de “Soy Embajador Bolivia”.
- Marca visual, tono cruceño, paleta y constructor de avatar.
- Temporadas y contenido cultural/turístico como materia prima.
- Feedback cálido: incluso el error entrega un descubrimiento.
- Ranking, versus, racha, vidas, insignias, equipos y recompensas como conceptos.
- Auspicios integrados como beneficio, nunca como publicidad invasiva.

## 3. Diagnóstico contra el prototipo actual

| Área         | Existe hoy                               | Problema observado                                                       | Decisión                                                                           |
| ------------ | ---------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Inicio       | Splash → registro/perfil/avatar/tutorial | Demasiada fricción antes de experimentar valor                           | Landing desafiante + `JUGAR`; nickname/avatar rápido; cuenta después del resultado |
| Juego rápido | Ruleta de 6 categorías                   | Sigue dominado por selección múltiple y puede sentirse examen            | Partida de 5 microdesafíos mezclados en 60–90 s                                    |
| Preguntas    | 36 rápidas + banco de misiones           | Alternativas débiles; todas las rápidas tienen la correcta en posición A | No reutilizarlas sin revisión; nuevo modelo de desafío y opciones plausibles       |
| Progreso     | Un saldo `puntos`                        | Mezcla nivel, ranking, certificado y gasto                               | Separar XP, monedas y puntos de liga                                               |
| Niveles      | 5 tramos por puntos                      | “Embajador” aparece demasiado pronto y no articula trayectoria larga     | Curioso → Explorador → Conocedor → Anfitrión → Embajador                           |
| Vidas        | 5; una por giro                          | No se recuperan con tiempo y pueden bloquear el único loop               | Piloto con 3 vidas solo en modos de riesgo; siempre dejar actividad gratuita       |
| Racha        | Contador en memoria                      | No representa días reales ni entrega hitos de forma consistente          | Simular en prototipo; persistir y validar únicamente en MVP funcional              |
| Reto diario  | Una pregunta determinista                | Puede cobrarse otra vez al reabrir; no compara a todos los usuarios      | Reto de 5 desafíos/60 s; resultado sintético ahora, global real después            |
| Ranking      | General y liga sintéticos                | Aparece tarde y mezcla conceptos de puntaje                              | Mostrar posición desde el primer resultado; rankear por XP o liga según vista      |
| Versus       | Cinco rondas contra bot                  | No es desafío entre amigos ni mide viralidad                             | Hacerlo prominente, honesto como simulación y con revancha; real después           |
| Avatar       | Constructor SVG por capas                | Principalmente decorativo                                                | Inventario de piezas bloqueadas por logros, colecciones y monedas                  |
| Recompensas  | Cupones ficticios por puntos             | Condiciones no se aplican y el gasto reduce progreso                     | Canjear solo monedas; etiquetar toda recompensa externa como demostración          |
| Temporadas   | 1 activa + 4 bloqueadas                  | Se sienten como índice lineal                                            | Convertirlas en ciclos/mundos con desafíos, colecciones y recompensas propias      |
| Analítica    | No existe                                | No se puede medir DAU/D1/D7 con memoria volátil                          | Taxonomía y registro manual ahora; instrumentación real en etapa funcional         |

## 4. Resoluciones de alcance y contradicciones

### 4.1 Veinte versus cincuenta desafíos

- **20 desafíos activos** constituyen el MVP de experiencia y son el único requisito para
  iniciar la prueba con 30–50 personas.
- Se puede normalizar el material recibido como **backlog editorial de hasta 50 candidatos**,
  pero no se desarrollarán ni activarán todos antes de validar el loop.
- Las 36 preguntas rápidas existentes no cuentan automáticamente: deben superar revisión
  factual, plausibilidad de distractores, dificultad y adaptación a mecánicas.
- Después del piloto se amplía de 20 a 50 solo si la evidencia identifica qué mecánicas
  generan repetición. Las siguientes 200/500 preguntas quedan fuera de alcance.

### 4.2 Tres versus cinco vidas

Se adopta la solicitud más reciente: **3 vidas** para el piloto. No representan los tres
fallos de una partida; son recursos distintos:

- iniciar un modo con riesgo puede costar una vida;
- una partida puede terminar por errores según sus propias reglas;
- llegar a cero no bloquea el producto: quedan disponibles reto diario completado en modo
  práctica, explorar álbum, revisar descubrimientos y modos gratuitos definidos;
- la recuperación temporal solo será demostrativa mientras no exista persistencia/reloj de
  servidor. No debe afirmarse que funciona entre recargas.

Esto requiere actualizar SPEC-20, SPEC-25, tipos, datos y textos antes de construir.

### 4.3 Registro después del valor

Flujo objetivo del prototipo:

```text
Landing → JUGAR → avatar rápido/aleatorio + nickname opcional
→ primera partida → resultado/XP/ranking → “¿Querés guardar tu progreso?”
→ registro simulado o continuar como invitado
```

No se pedirá correo ni contraseña antes de jugar. En el prototipo, “guardar” debe aclarar
que es una simulación de cuenta y que recargar reinicia el progreso. Una cuenta realmente
persistente pertenece al MVP funcional.

### 4.4 Reto diario y versus sin backend

- El prototipo seleccionará el reto por fecha de Bolivia mediante contenido local y mostrará
  un ranking sintético claramente identificado como demostración.
- El versus seguirá usando bot sintético y permitirá revancha/compartir conceptual. No puede
  afirmar que un amigo recibió o jugó el reto.
- “Todos juegan el mismo reto”, posición entre jugadores reales, invitaciones atribuibles y
  resultados asíncronos requieren backend, identidad, reloj confiable y antifraude.

### 4.5 Analítica bajo los guardarraíles actuales

Durante el prototipo no se enviarán eventos externos ni se guardarán identificadores. Se
implementará una interfaz de eventos desacoplada con adaptador en memoria y se usará una
planilla del moderador para las pruebas. DAU, MAU, D1, D7 y D30 solo serán métricas válidas
cuando exista persistencia, consentimiento y analítica aprobada como nuevo alcance.

## 5. Experiencia objetivo

### 5.1 Landing

Contenido recomendado:

- Marca: **SOY EMBAJADOR**.
- Pregunta: **¿Cuánto conocés realmente Santa Cruz?**
- Refuerzo: **Poné a prueba lo que sabés.**
- CTA dominante: **JUGAR**.
- Pruebas de valor: desafiar, subir en ranking y desbloquear recompensas.

No incluir tutorial extenso. La primera interacción debe enseñar la mecánica.

### 5.2 Game loop principal

```text
Entrar
→ ver objetivo/recompensa
→ jugar 5 microdesafíos
→ resultado inmediato
→ XP + monedas + progreso de colección/ranking
→ REVANCHA / JUGAR OTRA / RETAR
```

Objetivos medibles:

- tiempo hasta el primer toque jugable: ≤ 30 segundos;
- duración de partida: 60–90 segundos;
- exactamente 5 microdesafíos por partida del piloto;
- resultado visible en ≤ 2 segundos después del último desafío;
- reinicio de otra partida en un máximo de 2 toques;
- feedback breve tras cada respuesta, sin convertir la sesión en lectura larga.

### 5.3 Navegación primaria

Se propone priorizar cuatro destinos:

1. **Jugar** — loop principal, reto diario y accesos contextuales.
2. **Versus** — bot/revancha en prototipo; amigos en producto funcional.
3. **Descubrir** — temporadas, mundos, álbum y colecciones.
4. **Ranking** — posición, rival próximo y CTA para superarlo.

Perfil, avatar, recompensas y configuración quedan como destinos secundarios. La barra actual
de cinco ítems debe revisarse en prueba comparativa, no cambiarse solo por preferencia.

## 6. Mecánicas del MVP de experiencia

Se implementarán **cinco** mecánicas primero, elegidas por diversidad y costo razonable:

| Mecánica         | Interacción                              | Tiempo objetivo | Uso inicial               |
| ---------------- | ---------------------------------------- | --------------- | ------------------------- |
| Rápido           | elegir antes de terminar el tiempo       | 5–8 s           | reconocimiento ágil       |
| Detective        | detectar intruso o dato falso            | 8–12 s          | plausibilidad/curiosidad  |
| Imagen/observa   | reconocer lugar, objeto o plato          | 8–12 s          | identidad visual          |
| Asociación/orden | relacionar o reordenar elementos         | 12–18 s         | memoria/comprensión       |
| Decisión         | elegir acción o recomendación contextual | 12–18 s         | hospitalidad y aplicación |

“Conocimiento” se expresa dentro de estas interacciones, no como una sexta pantalla de examen.
Memoria avanzada y apuestas se posponen hasta validar comprensión, accesibilidad y ritmo.

### 6.1 Dificultad adaptativa del piloto

- **Fácil:** éxito inicial y conocimiento general.
- **Media:** recordar o asociar.
- **Difícil:** curiosidad menos conocida.
- El piloto no necesita un algoritmo complejo: ajustará el siguiente desafío según los
  últimos aciertos/fallos y evitará más de dos fallos seguidos en la primera partida.
- “Experto” queda para la expansión; primero se requiere evidencia de calibración.

### 6.2 Regla de feedback

Todo desafío debe terminar con:

- estado correcto/incorrecto accesible por texto e icono;
- explicación factual de una o dos frases;
- mensaje cálido “Ahora ya lo sabés” cuando hay error;
- recompensa explícita, sin otorgar el mismo XP de dominio por acertar y por fallar;
- fuente/revisor en metadata editorial, aunque no sea visible durante el juego.

## 7. Modelo de progresión

### 7.1 Economías separadas

| Saldo          | Se obtiene                                | Se utiliza                    | Nunca debe                     |
| -------------- | ----------------------------------------- | ----------------------------- | ------------------------------ |
| XP             | respuestas, partidas, versus, colecciones | nivel y ranking de progreso   | gastarse o disminuir por canje |
| Monedas        | completar partidas, hitos, colecciones    | cosméticos y recompensas demo | definir nivel o certificado    |
| Puntos de liga | actividades competitivas de la semana     | posición/división/equipo      | comprar objetos ni alterar XP  |

### 7.2 Niveles

Los umbrales se calibrarán después del piloto; los nombres quedan definidos:

1. Curioso.
2. Explorador.
3. Conocedor.
4. Anfitrión.
5. Embajador.

No se fijarán todavía niveles numéricos 1/5/10/20/30 sin simular la velocidad de avance.
El resultado de cada partida debe mostrar XP ganado, avance al siguiente nivel y una meta
cercana concreta.

### 7.3 Insignias, álbum y avatar

Piloto mínimo:

- una insignia transversal obtenible;
- una colección del álbum con 5 elementos;
- cinco desbloqueables de avatar vinculados a conducta/logros;
- inventario bloqueado con requisito visible;
- una recompensa por completar la colección: XP + monedas + cosmético.

El álbum reutiliza el contenido como coleccionables. Cada elemento requiere nombre, categoría,
imagen autorizada, descubrimiento, explicación breve, temporada y condición de desbloqueo.

## 8. Modelo de contenido

### 8.1 Esquema propuesto

```ts
type MecanicaDesafio = "rapido" | "detective" | "imagen" | "asociacion" | "orden" | "decision";

type Dificultad = "facil" | "media" | "dificil";

type Desafio = {
  id: string;
  temporadaId: string;
  categoriaId: string;
  mecanica: MecanicaDesafio;
  dificultad: Dificultad;
  consigna: string;
  opciones: OpcionDesafio[];
  solucion: SolucionDesafio;
  explicacion: string;
  recompensas: { xpAcierto: number; xpAprendizaje: number; monedas: number };
  tiempoSegundos?: number;
  assetId?: string;
  coleccionableId?: string;
  fuente: string;
  revisadoPor: string;
  estado: "borrador" | "revisado" | "activo" | "retirado";
};
```

La solución debe admitir selección única, conjuntos, pares y secuencias; no debe forzarse
todo a `respuestaCorrectaId`. El motor renderiza por `mecanica`, pero puntúa y retroalimenta
mediante un contrato común.

### 8.2 Distribución de los 20 activos

| Mecánica               | Cantidad | Dificultad sugerida         |
| ---------------------- | -------: | --------------------------- |
| Rápido                 |        4 | 2 fácil, 2 media            |
| Detective              |        4 | 1 fácil, 2 media, 1 difícil |
| Imagen                 |        4 | 2 fácil, 1 media, 1 difícil |
| Asociación/orden       |        4 | 1 fácil, 2 media, 1 difícil |
| Decisión/recomendación |        4 | 1 fácil, 2 media, 1 difícil |

Categorías: ciudad e historia, cultura/patrimonio, gastronomía, naturaleza, hospitalidad y
cuidado de la ciudad. Ninguna opción puede ser absurda o resolverse por pertenecer claramente
a otro departamento. Todo dato numérico, histórico o institucional debe validarse contra el
manual fuente y por la cliente antes de activarse.

### 8.3 Selección del banco compartido

El banco entregado por la cliente se clasifica así:

- **candidatos fuertes:** ciudad de los anillos, plazas/museos, gastronomía, naturaleza,
  hospitalidad, cuidado urbano e identificación visual;
- **requieren fuente/fecha:** población, cantidad de parques/plazas, especies, animales,
  visitantes/expositores de Expocruz y trazado del onceavo anillo;
- **requieren activo autorizado:** Catedral, Plaza 24 de Septiembre, majao, Jardín Botánico;
- **no activar todavía:** rutas cuyo orden no sea único, apuestas, datos ambiguos o cualquier
  pregunta sin respaldo verificable.

## 9. Arquitectura técnica propuesta

### 9.1 Principios

- Mantener React/TanStack/Tailwind y el sistema visual actual.
- No editar `src/routeTree.gen.ts`; TanStack lo regenera.
- Conservar datos locales y estado en memoria durante el prototipo.
- Extraer reglas de negocio de las rutas y hacerlas deterministas/injectables.
- Sustituir actualizaciones parciales de `SessionContext` por acciones de dominio/reducer.
- No instalar backend, SDK analítico ni autenticación durante el MVP de experiencia.

### 9.2 Estado objetivo del prototipo

```ts
type EstadoJugador = {
  identidad: { nickname: string; avatar: AvatarPersonalizado; esInvitado: boolean };
  economia: { xp: number; monedas: number; puntosLiga: number };
  nivel: string;
  vidas: { disponibles: number; maximo: 3 };
  racha: { diasSimulados: number; retoHechoEnSesion: boolean };
  progreso: { desafios: Record<string, ResultadoDesafio>; partidas: number };
  insignias: string[];
  album: string[];
  inventarioAvatar: string[];
  equipoId: string | null;
  cuponesDemo: Cupon[];
};
```

Acciones mínimas: iniciar/finalizar partida, responder desafío, otorgar recompensa, gastar
monedas, consumir/recuperar vida, completar reto diario, registrar versus, desbloquear
coleccionable/cosmético y reiniciar demo.

### 9.3 Motor de partida

Una máquina de estados simple controla:

```text
preparacion → presentando → respondido → feedback → siguiente → resultado
```

Responsabilidades:

- seleccionar cinco desafíos sin repetir;
- equilibrar mecánicas y dificultad;
- controlar tiempo de forma accesible;
- evaluar mediante estrategia por mecánica;
- calcular XP/monedas/liga una sola vez;
- impedir doble cobro al remontar o repetir acciones;
- producir un resumen independiente de la UI.

Reloj y azar deben pasar como dependencias (`Clock`, `RandomSource`) para que reto diario,
bot, opciones y pruebas sean reproducibles.

### 9.4 Instrumentación preparada

Contrato local sugerido:

```ts
type EventoJuego =
  | { tipo: "landing_vista" }
  | { tipo: "jugar_iniciado"; origen: string }
  | { tipo: "partida_iniciada"; modo: string }
  | { tipo: "desafio_respondido"; id: string; correcto: boolean; ms: number }
  | { tipo: "partida_completada"; duracionMs: number; segundaPartida: boolean }
  | { tipo: "versus_iniciado" | "revancha_solicitada" }
  | { tipo: "reto_diario_completado" }
  | { tipo: "registro_postvalor_visto" | "registro_postvalor_aceptado" }
  | { tipo: "recompensa_vista" | "canje_demo_solicitado" };
```

En el prototipo, `AnalyticsPort` escribe solo en un buffer en memoria o se deja en modo
observación manual. En el MVP funcional se conectará un adaptador aprobado, con consentimiento,
retención de datos y política de privacidad.

## 10. Plan de implementación

### Fase 0 — Alineación y formalización (P0, 2–3 días)

**Objetivo:** convertir el feedback en alcance aprobado antes de tocar el prototipo.

Tareas:

1. Aprobar este plan con cliente y prestador.
2. Registrar en `04-bitacora-decisiones.md` el cambio de foco y su impacto económico.
3. Actualizar documento maestro, estado, guardarraíles afectados y specs que quedarán obsoletas.
4. Definir segmento primario del piloto y composición por edades.
5. Acordar definición de éxito, 20 desafíos y responsable de validación factual.
6. Confirmar derechos de uso de fotografías y activos del manual.
7. Acordar que social, ranking y recompensas son simulados en el prototipo.

**Salida:** alcance firmado, lista de 20 candidatos y ninguna contradicción crítica de gobierno.

### Fase 1 — Núcleo jugable (P1, 6–8 días)

**Objetivo:** demostrar el game loop sin ampliar el contenido.

Tareas técnicas:

1. Rediseñar `/` como landing de curiosidad con CTA `JUGAR`.
2. Crear entrada invitada: avatar rápido/aleatorio y nickname opcional.
3. Crear motor de partida de cinco desafíos y resultado unificado.
4. Implementar cinco renderizadores/evaluadores de mecánica.
5. Separar XP, monedas y puntos de liga en tipos/estado/UI.
6. Implementar niveles y progreso al siguiente nivel.
7. Mostrar ranking sintético inmediatamente después de la primera partida.
8. Añadir CTA `JUGAR OTRA` en máximo dos toques.
9. Mostrar registro simulado después del resultado, nunca antes del valor.
10. Activar únicamente 20 desafíos aprobados.

Criterios de salida:

- primera interacción jugable ≤ 30 s;
- partida mediana entre 60 y 90 s;
- cinco desafíos sin repetición;
- recompensas idempotentes;
- usuario distingue XP de monedas;
- flujo completo usable a 320 y 390 px.

### Fase 2 — Competencia y retorno simulado (P1, 4–6 días)

**Objetivo:** probar si competencia y ritual diario provocan repetición.

1. Elevar Versus a navegación primaria.
2. Reutilizar bot actual dentro del nuevo motor de cinco rondas.
3. Añadir resultado, rival próximo y `REVANCHA` inmediata.
4. Rediseñar reto diario como cinco desafíos compartidos localmente durante la fecha de Bolivia.
5. Evitar doble recompensa dentro de una sesión.
6. Mostrar posición diaria sintética y aclaración de demostración.
7. Aplicar racha de sesión con estados preparados (día 1, 3 y 7) para validación.
8. Hacer el ranking accionable: “te faltan X XP” + `JUGAR`.
9. Reorientar compartir hacia resultado/reto/revancha.

Criterios de salida:

- versus identificado como bot/demo antes de jugar;
- revancha inicia en un toque;
- reto diario entrega recompensa una sola vez por sesión;
- no se afirma que invitaciones o posiciones procedan de personas reales;
- existe actividad gratuita cuando no hay vidas.

### Fase 3 — Colección, avatar y riesgo (P2, 5–7 días)

**Objetivo:** comprobar motivación por desbloqueo, no solo por puntaje.

1. Cambiar máximo de vidas a tres en modos definidos.
2. Crear estado de recuperación demostrativa sin prometer persistencia.
3. Implementar álbum mínimo de una colección/cinco elementos.
4. Vincular descubrimientos del juego con coleccionables.
5. Crear cinco cosméticos desbloqueables y requisitos visibles.
6. Permitir gasto de monedas sin modificar XP.
7. Añadir una insignia transversal y recompensa por colección completa.
8. Convertir temporadas en mundos/ciclos desde `Descubrir`, sin construir nuevas temporadas.
9. Revisar catálogo/cupones para que toda acción sea inequívocamente demo.

Criterios de salida:

- ninguna economía afecta a otra por error;
- avatar comunica por qué una pieza está bloqueada;
- completar colección recompensa exactamente una vez;
- quedarse sin vidas no crea callejón sin salida;
- no hay canje externo presentado como real.

### Fase 4 — QA y piloto de experiencia (P0, 2 semanas)

**Objetivo:** decidir con conducta, no con opiniones, si existe el efecto “una más”.

Preparación:

1. Auditoría factual y cultural del 100 % de los 20 desafíos.
2. Prueba interna con 10 personas; corregir bloqueos antes del piloto.
3. QA P-01–P-26/rediseño a 320×568 y 390×844.
4. Verificar teclado, foco, lector, contraste, reducción de movimiento y alternativa al tiempo.
5. Preparar guion, consentimiento, planilla y códigos anónimos de participantes.

Piloto:

- 30–50 personas de edades y familiaridad digital/cultural variadas;
- primera sesión observada sin explicar la navegación;
- segunda invitación al día siguiente para una submuestra mínima de 15–20;
- máximo dos variantes simultáneas para no fragmentar la muestra;
- no preguntar solo “¿te gustó?”; observar partida 2, revancha, compartir y retorno.

Eventos manuales: inicio, primer toque, partida iniciada/completada/abandonada, duración,
segunda partida, versus, revancha, reto diario, ranking, desbloqueo, registro postvalor e
intención/acción de compartir.

### Fase 5 — Decisión y expansión de contenido (2–3 días)

- Consolidar resultados cuantitativos y cualitativos.
- Identificar mecánicas que generan repetición y las que producen abandono.
- Corregir o retirar desafíos con ambigüedad, error o dificultad extrema.
- Decidir: iterar loop, ampliar a 50, pausar o cotizar MVP funcional.
- No construir nuevas ciudades, temporadas funcionales ni cientos de preguntas sin superar
  la puerta de validación.

### Etapa posterior — MVP funcional (nuevo alcance)

Orden recomendado:

1. Backend, identidad, consentimiento y persistencia.
2. Modelo de eventos y analítica real.
3. Calendario confiable de racha, vidas y reto diario.
4. Rankings concurrentes y cierre semanal.
5. Amigos, invitaciones atribuibles y versus asíncrono.
6. Notificaciones y deep links.
7. Catálogo, inventario y canje seguro de recompensas.
8. Misiones patrocinadas y panel/métricas para empresas.
9. CMS/editorial solo cuando el volumen lo justifique.
10. Nuevas temporadas, ciudades y eventos nacionales.

## 11. Mapeo técnico sobre el repositorio

| Área actual                                      | Acción                                                                           |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| `src/routes/index.tsx`                           | sustituir splash explicativo por landing con juego inmediato                     |
| `registro.tsx`, `perfil-nuevo.tsx`, `avatar.tsx` | reordenar como setup invitado y registro postvalor; reutilizar constructor SVG   |
| `jugar.index.tsx`                                | convertir en hub contextual; el CTA principal inicia partida, no lista funciones |
| `jugar.ruleta.tsx`                               | extraer motor/recompensas; dejar ruleta secundaria o pausarla en el piloto       |
| `jugar.dia.tsx`                                  | sustituir pregunta única por reto diario de cinco desafíos e idempotencia        |
| `duelo.tsx`                                      | reutilizar bot, integrarlo al motor y añadir revancha/rotulado demo              |
| `ranking.tsx`, `liga.tsx`                        | separar ranking de XP y liga semanal; mostrar acceso temprano                    |
| `temporadas.tsx` y misiones                      | reposicionar bajo Descubrir; conservar contenido profundo                        |
| `recompensas.tsx`                                | migrar costo de puntos a monedas y validar requisitos/duplicados demo            |
| `perfil.tsx`                                     | mostrar economías, nivel, racha, álbum, insignias e inventario sin mezclarlos    |
| `SessionContext.tsx`                             | migrar a reducer/acciones de dominio; seguir en memoria                          |
| `src/data/tipos.ts`                              | introducir desafíos polimórficos, economía, colecciones y eventos                |
| `preguntas-rapidas.ts`                           | no extender en su forma actual; migrar solo contenido aprobado                   |
| `src/lib/juego.ts`                               | dividir evaluación, selección, economía y tiempo en reglas puras                 |
| `BarraInferior.tsx`                              | probar navegación de 4 destinos contra la actual antes de decidir                |
| `routeTree.gen.ts`                               | no editar manualmente                                                            |

Estructura sugerida, introducida gradualmente:

```text
src/features/game/
  engine.ts
  evaluators.ts
  rewards.ts
  difficulty.ts
  types.ts
src/features/progression/
  economy.ts
  levels.ts
  collections.ts
src/features/retention/
  daily.ts
  streak.ts
  lives.ts
src/features/social/
  versus.ts
  rankings.ts
src/data/desafios/
  temporada-1.ts
  colecciones.ts
```

No es necesario mover todo el repositorio antes de entregar valor; la extracción debe seguir
los límites de dominio mientras se modifica cada flujo.

## 12. Métricas y puertas de decisión

### 12.1 Métricas válidas en el prototipo

| Pregunta                      | Métrica                                     | Umbral orientativo |
| ----------------------------- | ------------------------------------------- | -----------------: |
| ¿Activa rápido?               | completa primera partida sin ayuda          |             ≥ 80 % |
| ¿Se entiende el loop?         | tiempo mediano a primer resultado           |            ≤ 2 min |
| ¿Existe “una más”?            | inicia segunda partida espontáneamente      |             ≥ 40 % |
| ¿Funciona competencia?        | inicia versus o revancha                    |             ≥ 35 % |
| ¿Se entiende progreso?        | diferencia XP, monedas, liga y vidas        |             ≥ 80 % |
| ¿Interesa volver?             | acepta/realiza segunda sesión de submuestra |             ≥ 35 % |
| ¿El contenido está calibrado? | acierto por desafío                         |            25–85 % |
| ¿Es claro?                    | reportes de ambigüedad/error por desafío    |              < 5 % |
| ¿El auspicio aporta?          | se percibe útil/no intrusivo                |             ≥ 70 % |
| ¿La UX bloquea?               | callejones sin salida                       |                  0 |

Con 30–50 personas estos umbrales son señales para decidir e iterar, no evidencia estadística
definitiva de mercado.

### 12.2 Métricas que requieren MVP funcional

- DAU y MAU.
- Retención D1, D7 y D30 por cohortes.
- Sesiones por usuario y partidas por sesión entre días.
- Versus enviados, aceptados y completados.
- Coeficiente de invitación/viralidad.
- Rachas reales y recuperación.
- Recompensas emitidas, abiertas y canjeadas.
- Actividad por campaña/auspiciador.

Umbrales iniciales para considerar escalamiento después de al menos 28 días y una cohorte
suficiente: finalización del primer juego ≥ 80 %, registro postvalor ≥ 40 %, D1 ≥ 30 % y
D7 ≥ 15 %. Deben recalibrarse con segmento, canal y tamaño de muestra.

## 13. Estrategia de pruebas

Aunque la entrega inicial sea un prototipo, las reglas económicas y de recompensa deben ser
verificables. Cobertura recomendada durante la implementación:

- pruebas unitarias del motor, evaluadores, dificultad, recompensas e idempotencia;
- pruebas unitarias de separación XP/monedas/liga;
- pruebas de reto diario con reloj inyectado y zona `America/La_Paz`;
- pruebas de vidas y actividad disponible en saldo cero;
- pruebas de desbloqueo único de insignia/colección/cosmético;
- integración del game loop y registro postvalor;
- recorridos E2E de primera partida, revancha, reto diario y canje demo;
- QA visual a 320 y 390 px;
- accesibilidad con teclado, foco, lector y movimiento reducido.

Scripts esperados al cerrar la implementación: typecheck, lint, pruebas en ejecución única y
build. No usar watchers durante validación automatizada.

## 14. Riesgos y mitigaciones

| Riesgo                                        | Nivel | Mitigación                                                      |
| --------------------------------------------- | ----- | --------------------------------------------------------------- |
| Convertir feedback en expansión masiva        | Alto  | congelar MVP en 20 desafíos y cinco mecánicas                   |
| Confundir simulación con producto real        | Alto  | etiquetas demo y separación contractual del MVP funcional       |
| Medir intención como retención                | Alto  | segunda sesión observada ahora; D1/D7 solo con persistencia     |
| Contenido incorrecto o desactualizado         | Alto  | fuente, fecha y aprobación factual por desafío                  |
| Opciones demasiado obvias                     | Alto  | revisión de distractores y tasa de acierto del piloto           |
| Mezclar economías                             | Alto  | reducer, reglas puras y pruebas de invariantes                  |
| Sobrecargar navegación                        | Medio | un CTA principal y desbloqueo progresivo                        |
| Temporizador excluyente                       | Medio | reducción de movimiento, tiempo adaptado y modo sin presión     |
| Ranking/bot percibidos como personas reales   | Medio | rotular sintético/demo en todo el flujo                         |
| Recompensas crean expectativa legal/comercial | Alto  | no usar marcas/códigos reales sin acuerdos y operación definida |
| Fotografías sin derechos                      | Alto  | inventario de licencias/autorizaciones antes de cargar          |
| Fase 2 contradice contrato original           | Alto  | bitácora, aprobación y nueva propuesta antes de construir       |

## 15. Decisiones pendientes de cliente

No bloquean la redacción del plan, pero sí el inicio de implementación:

1. Segmento primario del piloto y cuotas por edad.
2. ¿Avatar y nickname son obligatorios o se permite “Jugar como invitado” con valores aleatorios?
3. Cinco mecánicas definitivas entre rápido, detective, imagen, asociación, orden y decisión.
4. Qué modos consumen vida y qué actividad queda siempre gratuita.
5. Fuente oficial y responsable de aprobar datos del manual.
6. Derechos de las fotografías para desafíos visuales.
7. Nombre y contenido de la primera colección del álbum.
8. Cinco cosméticos disponibles para desbloquear.
9. Ranking principal por XP, ciudad o liga durante el piloto.
10. Texto exacto para identificar bots, rankings y recompensas como simulación.
11. Si la ruleta continúa como modo secundario o se pausa durante el piloto.
12. Aprobación económica y contractual del rediseño como cambio de alcance.

## 16. Definition of Done del MVP de experiencia

El rediseño está listo para piloto únicamente cuando:

- [ ] El CTA `JUGAR` lleva al primer desafío sin registro largo.
- [ ] El primer resultado aparece en menos de dos minutos en prueba mediana.
- [ ] La partida contiene cinco desafíos y dura aproximadamente 60–90 segundos.
- [ ] Las cinco mecánicas se entienden sin explicación externa.
- [ ] Los 20 desafíos tienen fuente, explicación, dificultad y aprobación.
- [ ] XP, monedas y puntos de liga son independientes.
- [ ] Embajador funciona como nivel aspiracional, no como requisito de entrada.
- [ ] Ranking y versus aparecen temprano, rotulados como sintéticos cuando corresponda.
- [ ] Reto diario y recompensas son idempotentes durante la sesión.
- [ ] Tres vidas no bloquean toda la experiencia.
- [ ] Una insignia, una colección y cinco cosméticos pueden desbloquearse.
- [ ] Registro/cuenta se solicita después de demostrar valor.
- [ ] No hay backend, persistencia, API, auth o analítica externa accidental.
- [ ] No hay afirmaciones de interacción, retorno o canje real.
- [ ] Typecheck, lint, pruebas y build terminan correctamente.
- [ ] QA mobile y accesibilidad no presentan bloqueos críticos.
- [ ] Guion, muestra, consentimiento y planilla del piloto están preparados.

## 17. Orden recomendado de ejecución

```text
Aprobar alcance
→ corregir gobierno documental
→ diseñar/validar 20 desafíos
→ construir motor y economías
→ rediseñar entrada y resultado
→ integrar versus/reto diario/ranking
→ añadir colección/avatar/vidas
→ QA interno con 10 personas
→ piloto con 30–50
→ decidir con evidencia
→ recién entonces cotizar MVP funcional o ampliar a 50 desafíos
```

## 18. Conclusión

El prototipo ya posee buena parte de los conceptos solicitados, pero hoy están distribuidos
en pantallas y simulaciones independientes. El rediseño debe integrarlos alrededor de una
sola pregunta de producto: **¿el usuario quiere jugar otra partida sin que se lo pidan?**

La implementación correcta no consiste en construir las quince ideas simultáneamente. Consiste
en entregar un loop corto, diverso y medible; demostrar competencia, progresión y recompensa;
y utilizar esa evidencia para decidir si corresponde invertir en persistencia, comunidad real,
operación comercial y expansión nacional.
