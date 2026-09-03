# Fase 2 — Modo Preguntados, retención y modelo de negocio

Objetivo: pasar de un recorrido lineal de misiones (MVP actual, 18 pantallas) a un juego con motivo para volver todos los días, jugar con amigos y con marcas auspiciadoras que financien premios reales.

## 1. Cómo se juega "Preguntados cruceño"

Tres modos que conviven con las misiones actuales:

- **Ruleta de categorías (individual, rápido).** Giro de ruleta con 6 categorías cruceñas: Historia, Naturaleza, Gastronomía, Tradición y Fiesta, Personajes, Santa Cruz Hoy. Cada acierto suma; 3 fallos cierran la partida. Al dominar una categoría se gana su **medalla** (equivalente a las coronas).
- **Duelo 1v1 (con amigos o rival sugerido).** Partida de 5 rondas por turnos, misma pregunta para los dos, gana quien acierta más y más rápido. En prototipo el rival es un bot sintético con nombre y avatar de la comunidad.
- **Reto por equipos / barrios.** El jugador elige un equipo (por ejemplo por zona o distrito: Equipetrol, Villa 1ro de Mayo, Plan 3000, Centro...). Los puntos individuales suman al marcador del equipo en una **liga semanal**. Esto es lo que crea presión social sana: "mi barrio va perdiendo, entro a jugar".

Recomendación: los tres, pero por orden — ruleta primero (es el motor), luego equipos (retención), luego duelo (viralidad).

## 2. Qué hace que la gente vuelva

- **Racha diaria**: contador de días seguidos, con recompensa al día 3, 7, 14, 30. Es el mecanismo #1 de retención.
- **Pregunta del día**: una sola pregunta gratis cada día, con bonus si se responde antes del mediodía.
- **Vidas / energía**: 5 vidas, se recuperan con el tiempo, ver un aviso de auspiciador o completar una misión presencial.
- **Liga semanal**: cada lunes arranca una tabla nueva; los primeros suben de división. El ranking actual se convierte en liga con reinicio, para que nadie quede eliminado para siempre.
- **Temporada mensual con tema**: p. ej. mes de Carnaval, mes del Urubó, con preguntas y premios propios.
- **Notificaciones/recordatorios** (a simular ahora, real en producción).

## 3. Premios reales y modelo de negocio

Este es el enganche que buscás: jugar da **cupones canjeables**.

- **Billetera de recompensas** en el perfil: cupones con código, vigencia y marca (cine, mall, café, bar, tour). Se canjean mostrando el código en el local.
- **Cómo se ganan**: llegar al top de la liga semanal, completar una temporada, mantener racha de 7 días, ganar una medalla de categoría, completar un reto presencial en el local del auspiciador.
- **Formatos de auspicio** (esto es lo vendible):
  1. **Categoría patrocinada**: "Gastronomía presentada por X" — logo en la ruleta y en el feedback de sus preguntas.
  2. **Misión o reto presencial patrocinado**: el jugador va al local, hace check-in y gana cupón. Es tráfico medible al negocio.
  3. **Premio de liga**: la marca pone el premio semanal y aparece en el podio.
  4. **Banner discreto** al final de resultados y en pantalla de vidas ("continuar cortesía de X").
  5. **Panel para la marca** (en el admin conceptual): cuántos jugaron, cuántos canjearon, qué categoría.
- **Regla de tono**: nada de publicidad intrusiva. La marca aparece dando algo (vida, premio, cupón), nunca interrumpiendo la pregunta.

## 4. Multi-ciudad

Preparar desde ya el concepto de **ciudad activa**: Santa Cruz es la Temporada/Región 1; luego Cochabamba, La Paz, etc. El ranking y las ligas se filtran por ciudad, y hay un ranking nacional. Los equipos son barrios dentro de la ciudad.

## 5. Entregables por sprint

**Sprint 5 — Motor Preguntados (individual)**

- Pantallas nuevas: ruleta de categorías, partida rápida, resultado de partida con medallas.
- Banco de preguntas ampliado y etiquetado por categoría.
- Documentación: SPEC-19 a SPEC-22.

**Sprint 6 — Retención**

- Racha diaria, pregunta del día, vidas/energía, liga semanal con divisiones.
- Perfil ampliado con medallas por categoría y racha.
- SPEC-23 a SPEC-26.

**Sprint 7 — Social**

- Equipos/barrios con marcador colectivo, duelo 1v1 contra bots sintéticos, invitación a amigos ya existente conectada al duelo.
- SPEC-27 a SPEC-29.

**Sprint 8 — Marcas y recompensas**

- Billetera de cupones, catálogo de premios por auspiciador, categoría y reto patrocinados, panel de marca en el admin conceptual.
- Documento nuevo `docs/11-modelo-negocio-auspicios.md` con paquetes de auspicio y argumentos de venta.
- SPEC-30 a SPEC-33.

## 6. Detalles técnicos

- Todo sigue siendo prototipo con datos sintéticos en `src/data/` y estado en `SessionContext` (persistido en el navegador); sin backend, según los guardarraíles vigentes.
- Datos nuevos: `categorias.ts`, `equipos.ts`, `auspiciadores.ts`, `cupones.ts`, `liga.ts`; preguntas existentes se etiquetan con `categoriaId`.
- Lógica nueva en `src/lib/`: `ruleta.ts` (giro y selección), `racha.ts` (días consecutivos y recompensas), `vidas.ts` (regeneración por tiempo), `liga.ts` (puntaje semanal y divisiones), `cupones.ts` (emisión y canje simulado).
- Rutas nuevas bajo el estilo actual de TanStack Router: `/jugar`, `/jugar/ruleta`, `/jugar/partida`, `/duelo`, `/equipos`, `/liga`, `/recompensas`.
- La barra inferior pasa de 4 a 5 ítems: Aprender · Jugar · Liga · Premios · Perfil.
- Estilo visual: se mantiene el lenguaje "Duolingo cruceño" y la paleta Selva vibrante; la ruleta y los cupones usan las mismas utilidades `btn-duo` / `card-duo`.
- Cada sprint actualiza `docs/01-estado-del-proyecto.md`, `docs/03-pantallas.md`, la bitácora y el checklist de validación.

## 7. Decisiones que necesito de vos

1. ¿Arrancamos por el Sprint 5 (ruleta) o preferís ver primero el documento de modelo de negocio y auspicios?
2. ¿Los equipos son por barrio/zona de Santa Cruz o equipos libres creados por los usuarios?
3. ¿Tenés marcas concretas para usar como ejemplo (Cine Center, Ventura Mall, Casa del Camba) o uso nombres ficticios para no comprometer marcas reales en el prototipo?
