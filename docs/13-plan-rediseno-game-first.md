# 13 — Plan de rediseño "Game-First" (Fase 3)

> Fuente: retroalimentación de la cliente tras la primera demo del prototipo (agosto 2026).
> Este documento traduce esa retroalimentación en un plan de implementación ejecutable:
> qué ya existe, qué cambia, qué se construye nuevo, en qué orden y con qué criterios de
> aceptación.

**Principio rector aceptado:** el usuario no debe sentir que estudia turismo. Debe sentir
que juega y descubre cuánto conoce Santa Cruz. "Embajador" es el **premio al progreso**,
no la explicación de la app.

---

## 1. Diagnóstico: qué se mantiene, qué se rediseña

### No se toca
- Identidad de marca, nombre y logotipo.
- Concepto de temporadas (ya existe la Temporada 1 "Descubre Santa Cruz").
- Contenido base del manual como fuente de verdad.
- Idea de Embajador como meta narrativa.
- Sistema visual "Duolingo cruceño" (Baloo 2 / Nunito, paleta Selva vibrante).
- Constructor de avatar por capas (SPEC-32).

### Se rediseña
Game loop · tipos de desafío · XP · monedas · vidas · racha · niveles · insignias ·
colecciones · ranking · versus · reto diario · recompensas · misiones patrocinadas ·
temporadas · onboarding · analítica.

---

## 2. Análisis de brecha (prototipo actual vs. objetivo)

| Área | Hoy en el prototipo | Brecha | Acción |
| --- | --- | --- | --- |
| Entrada | Splash explicativo → registro largo → tutorial | Fricción alta antes de jugar | Rediseñar P-01 como pantalla-reto con CTA único **JUGAR** |
| Registro | Obligatorio antes de la primera partida | Bloquea retención | Mover a post-partida ("¿Guardás tus 320 XP?") |
| Game loop | Misión de 8 preguntas, ~5 min | Demasiado largo | Partida de 5 microdesafíos, 60–90 s |
| Mecánicas | multiple, verdadero-falso, imagen, caso, reto | Faltan 5 mecánicas | Añadir intruso, memoria, orden, asociación, velocidad |
| Progresión | Un solo contador `puntos` | Sin economía ni niveles reales | Separar **XP**, **monedas**, **insignias**; 30 niveles |
| Vidas | 5 vidas globales | Bloquea sin salida | 3 vidas por modo + recuperación siempre disponible |
| Ranking | Pantalla aparte, tardía | No aparece tras la 1ª partida | Mostrar posición en la pantalla de resultado |
| Versus | Ruta `/duelo` secundaria | No es CTA principal | Subirlo al menú principal + revancha |
| Reto diario | "Pregunta del día" (1 pregunta) | Poco evento | Reto de 60 s, 5 preguntas, 1 intento, ranking del día |
| Colecciones | No existe | Falta el álbum | Nuevo módulo Álbum con 6 colecciones |
| Avatar | Decorativo | Sin utilidad | Piezas gratis / desbloqueables por logro y monedas |
| Dificultad | Fija | Sin adaptación | 4 niveles y ajuste por desempeño |
| Contenido | Preguntas obvias, descartables | Calidad | Reescritura con distractores plausibles |
| Analítica | No existe | Sin métricas | Capa de eventos en memoria + panel de depuración |
| Comercial | Cupones y auspiciadores demo | Base correcta | Misiones patrocinadas + recompensa por nivel |

---

## 3. Nuevas especificaciones (SPEC-33 a SPEC-48)

| Spec | Nombre | Fase | Prioridad |
| --- | --- | --- | --- |
| SPEC-33 | Entrada game-first y CTA único | F1 | 🔴 P1 |
| SPEC-34 | Onboarding diferido (jugar → nombre/avatar → registro) | F1 | 🔴 P1 |
| SPEC-35 | Game loop de partida rápida (60–90 s) | F1 | 🔴 P1 |
| SPEC-36 | Motor de desafíos: 9 mecánicas | F1 | 🔴 P1 |
| SPEC-37 | Sistema XP y 30 niveles (Curioso → Embajador) | F1 | 🔴 P1 |
| SPEC-38 | Dificultad progresiva adaptativa | F1 | 🔴 P1 |
| SPEC-39 | Ranking temprano y multi-ámbito | F1 | 🔴 P1 |
| SPEC-40 | Versus 1v1 con revancha | F1 | 🔴 P1 |
| SPEC-41 | Reto del día global (60 s, 1 intento) | F1 | 🔴 P1 |
| SPEC-42 | Racha diaria reforzada | F1 | 🔴 P1 |
| SPEC-43 | Monedas y tienda de desbloqueos | F2 | 🟠 P2 |
| SPEC-44 | Álbum de colecciones cruceñas | F2 | 🟠 P2 |
| SPEC-45 | Avatar desbloqueable por logros | F2 | 🟠 P2 |
| SPEC-46 | Vidas por modo con recuperación | F2 | 🟠 P2 |
| SPEC-47 | Misiones patrocinadas y recompensas reales | F3 | 🟡 P3 |
| SPEC-48 | Capa de analítica de producto (eventos) | F1 | 🔴 P1 |

---

## 4. Detalle de las piezas clave

### 4.1 Game loop (SPEC-35)
```text
JUGAR → 5 microdesafíos (10–15 s c/u) → resultado
      → XP + monedas + posición en ranking
      → [REVANCHA] / [DESAFIAR AMIGO] / [SEGUIR JUGANDO]
```
- Cada desafío muestra temporizador visible y feedback inmediato.
- Al fallar: `💡 AHORA YA LO SABÉS` + explicación + **+20 XP por aprender**.
- Volver a jugar debe estar a **un toque** desde el resultado.

### 4.2 Mecánicas (SPEC-36)
`rapido` · `conocimiento` · `imagen` · `intruso` · `dato-falso` · `asociacion` ·
`orden` · `memoria` · `decision` · `recomendacion`.

Modelo de datos unificado (extiende `src/data/tipos.ts`):
```ts
type Mecanica =
  | "rapido" | "conocimiento" | "imagen" | "intruso"
  | "asociacion" | "orden" | "memoria" | "decision" | "recomendacion";

type Dificultad = "facil" | "media" | "dificil" | "experto";

type Desafio = {
  id: string;              // P001, R0021, I001…
  temporadaId: string;
  coleccionId?: string;    // alimenta el álbum
  categoriaId: string;
  mecanica: Mecanica;
  enunciado: string;
  opciones: Opcion[];
  respuestaCorrectaId: string | string[]; // array para orden/asociación
  explicacion: string;     // el "descubrimiento"
  dificultad: Dificultad;
  xp: number;
  segundos: number;
  imagen?: string;
  insigniaId?: string;
};
```

### 4.3 Economía (SPEC-37 / SPEC-43)
| Recurso | Se gana con | Se usa para |
| --- | --- | --- |
| ⭐ XP | acierto, error aprendido, victoria versus, reto diario | subir de nivel y ranking |
| 🪙 Monedas | completar partidas, misiones, colecciones | piezas de avatar, vidas, comodines |
| 🏅 Insignias | logros de comportamiento | perfil y colección |

Niveles: 1 Curioso · 5 Explorador · 10 Conocedor · 20 Anfitrión · 30 Embajador
(curva `xpNivel(n) = 100 * n * 1.15^(n-1)` redondeada).

### 4.4 Dificultad adaptativa (SPEC-38)
Se mantiene un índice de destreza por categoría (0–1). Con ≥70 % de aciertos en las
últimas 10 respuestas de una categoría, la siguiente tanda sube un escalón; con <40 %,
baja. Nunca dos preguntas `experto` seguidas para un jugador nuevo.

### 4.5 Álbum (SPEC-44)
6 colecciones: Patrimonio · Gastronomía · Naturaleza · Tradiciones · Personajes ·
Vida urbana. Cada acierto sobre un desafío con `coleccionId` revela su cromo.
Colección completa → +500 XP + monedas + pieza de avatar.

### 4.6 Analítica (SPEC-48)
Registro de eventos en memoria (`src/lib/analitica.ts`) con la firma
`registrar(evento, propiedades)`, listo para enchufar a un proveedor real:
`sesion_inicio`, `partida_inicio`, `partida_fin`, `desafio_respondido`,
`versus_enviado`, `versus_jugado`, `revancha`, `reto_diario`, `racha_mantenida`,
`nivel_subido`, `coleccion_completada`, `recompensa_canjeada`, `resultado_compartido`.
Pantalla interna `/debug/metricas` muestra DAU simulado, partidas por sesión y embudo.

---

## 5. Plan por sprints

### Sprint 7 — Núcleo jugable (Fase 1, parte A)
- SPEC-33 entrada game-first; SPEC-34 onboarding diferido.
- SPEC-35 game loop y pantalla de resultado con XP + ranking.
- SPEC-37 XP y niveles; SPEC-48 capa de eventos.
- Navegación inferior a 4 ítems: ⚡ JUGAR · ⚔️ VERSUS · 🗺️ DESCUBRIR · 🏆 RANKING.

### Sprint 8 — Mecánicas y competencia (Fase 1, parte B)
- SPEC-36 las 9 mecánicas con sus componentes de juego.
- SPEC-38 dificultad adaptativa.
- SPEC-39 ranking multi-ámbito (global, Santa Cruz, amigos).
- SPEC-40 versus con revancha; SPEC-41 reto del día; SPEC-42 racha.
- Banco MVP de 50 desafíos (distribución del §6).

### Sprint 9 — Engagement (Fase 2)
- SPEC-43 monedas y tienda; SPEC-44 álbum; SPEC-45 avatar desbloqueable;
  SPEC-46 vidas por modo; compartir resultado.
- Mapa/mundo de zonas desbloqueables sobre el mapa de temporadas actual.

### Sprint 10 — Monetización y escala (Fases 3–4)
- SPEC-47 misiones patrocinadas, recompensas por nivel, códigos.
- Rankings institucionales (colegios, universidades, empresas).
- Estructura de Temporadas 2–6 y "Descubre Bolivia".

---

## 6. Banco MVP de 50 desafíos

Distribución acordada: 20 partida rápida · 8 versus · 5 reto diario · 5 hospitalidad ·
5 imagen · 4 recomendación · 3 memoria.

Origen: el banco entregado por la cliente (P001–P020, R0021–R0025, R0031–R0034,
I001–I004, S001–S006, D001–D003, H001–H004, C001–C004, bloques versus, ruta y álbum).
Se carga en `src/data/desafios.ts` reemplazando progresivamente
`preguntas.ts` y `preguntas-rapidas.ts`.

Regla de contenido obligatoria: **las cuatro alternativas deben ser plausibles**. Se
prohíben distractores de otros departamentos (Cerro Rico, Casa de la Libertad) salvo en
la mecánica `intruso`, donde ese contraste es la mecánica misma.

---

## 7. Criterios de validación (Fase 0 de experiencia)

Probar con 30–50 personas de distintas edades y **observar**, no preguntar:
- ¿Juegan una segunda partida sin que se lo pidan?
- ¿Piden revancha?
- ¿Comparten su resultado?
- ¿Vuelven al día siguiente?

Metas de referencia: retención D1 ≥ 35 %, D7 ≥ 15 %, ≥ 2 partidas por sesión,
≥ 20 % de partidas con versus enviado.

---

## 8. Impacto técnico en el prototipo actual

| Archivo | Cambio |
| --- | --- |
| `src/data/tipos.ts` | Nuevos tipos `Desafio`, `Mecanica`, `Dificultad`, `Coleccion`, `Cromo`, economía en `UsuarioSesion` (`xp`, `monedas`, `nivel`, `album`, `destreza`) |
| `src/data/desafios.ts` | Nuevo banco unificado por mecánica |
| `src/data/colecciones.ts` | Nuevo: cromos del álbum |
| `src/lib/juego.ts` | Partida rápida, selección adaptativa, cálculo de XP |
| `src/lib/niveles.ts` | Nuevo: curva de XP y títulos |
| `src/lib/analitica.ts` | Nuevo: registro de eventos |
| `src/context/SessionContext.tsx` | Economía separada, álbum, destreza, historial |
| `src/components/BarraInferior.tsx` | 4 ítems: Jugar, Versus, Descubrir, Ranking |
| `src/routes/index.tsx` | Entrada game-first |
| `src/routes/partida.*` | Nuevo loop de partida rápida y resultado |
| `src/routes/album.tsx`, `tienda.tsx` | Nuevas pantallas de Fase 2 |

Se mantiene el guardarraíl vigente: **todo en memoria, sin backend ni persistencia**
(ver `05-guardarrailes.md`). La analítica se registra en memoria y se muestra en una
pantalla de depuración; la integración con un proveedor real es trabajo del MVP funcional.

---

## 9. Lo que explícitamente no haremos ahora

- No construir cientos de preguntas antes de validar el juego (tope: 50 desafíos).
- No vender membresías ni suscripciones.
- No publicidad invasiva ni banners.
- No exigir conocimientos de turismo para jugar.
- No hacer de la recomendación la mecánica central.
