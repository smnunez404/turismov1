# Fase 2 — Modo Preguntados, retención y modelo de negocio

> Estado: en construcción (Sprint 5). Todo con datos sintéticos, sin backend.
> Marcas y premios son de DEMOSTRACIÓN con nombres ficticios.

## 1. Problema que resuelve

El MVP (Fase 1) enseña Santa Cruz en 5 misiones, pero se agota: cuando el usuario
termina la temporada, no tiene motivo para volver. La Fase 2 agrega **razones diarias
para abrir la app** y **beneficios reales** que sostienen el uso y financian el proyecto.

## 2. Tres capas de la Fase 2

| Capa                | Qué hace                                                 | Frecuencia esperada     |
| ------------------- | -------------------------------------------------------- | ----------------------- |
| Aprender (Fase 1)   | Misiones y temporadas con contenido curado               | 1–2 veces por semana    |
| Jugar (Preguntados) | Ruleta, pregunta del día, duelos                         | Diario                  |
| Ganar               | Liga semanal, equipos por zona, cupones de auspiciadores | Semanal + canje puntual |

## 3. Mecánicas tomadas de Preguntados

1. **Ruleta de 6 categorías cruceñas**: Historia, Naturaleza, Gastronomía, Tradición,
   Personajes y Santa Cruz hoy. Cada giro cuesta 1 vida y la partida termina a los 3 fallos.
2. **Medallas por categoría** (equivalente a las coronas): se ganan acumulando aciertos
   en la misma categoría. Completar las 6 da el título de Embajador Completo.
3. **Duelo 1v1**: 5 rondas, las mismas preguntas para los dos jugadores. En el prototipo
   el rival es simulado con una destreza fija; en producción sería asíncrono contra amigos.
4. **Pregunta del día**: una pregunta gratis diaria que alimenta la racha.

## 4. Retención

- **Racha diaria** con premios en el día 3, 7, 14 y 30.
- **Vidas** (5 máximo) que limitan el atracón y crean el hábito de volver.
- **Liga semanal** con 4 divisiones cruceñas: Cuñapé, Tajibo, Toborochi y Jaguar.
  Se reinicia cada lunes, así nadie queda descolgado para siempre.
- **Equipos por zona** (Centro, Equipetrol, Plan 3000, Villa 1ro de Mayo, Urubó,
  Pampa de la Isla): la identidad de barrio es el motor social más fuerte en Santa Cruz.
  El usuario juega para su zona, no solo para sí mismo.

## 5. Modelo de negocio

| Formato                     | Cómo se ve en la app                                       | Qué gana la marca                           |
| --------------------------- | ---------------------------------------------------------- | ------------------------------------------- |
| Categoría patrocinada       | "Gastronomía · Presenta Sabor Camba" en la ruleta          | Presencia recurrente y contextual           |
| Premio de liga              | El top 3 semanal recibe un cupón del auspiciador principal | Asociación con el logro y el prestigio      |
| Cupón canjeable             | Catálogo de premios por puntos en la pantalla Premios      | Tráfico medible al local                    |
| Reto presencial patrocinado | Misión que exige visitar el local y subir una foto         | Visitas físicas verificables                |
| Vidas invitadas             | "Bar Piraí te invita una vida extra"                       | Recuerdo de marca en el momento de fricción |

Principio comercial: **la marca nunca interrumpe el juego**. Aparece como quien regala
algo (vida, premio, categoría), nunca como banner intrusivo.

## 6. Escalabilidad multi-ciudad

Santa Cruz es la Región 1. El modelo de datos ya separa categorías, equipos y
auspiciadores por región, de modo que sumar Cochabamba, La Paz o Sucre implica cargar
contenido nuevo, no reescribir la lógica.

## 7. Guardarraíles de la Fase 2

- No hay pagos, ni canje real, ni validación de cupones en el prototipo.
- Los auspiciadores son ficticios; se sustituyen al firmar acuerdos.
- El duelo no es multijugador real: el rival es un algoritmo con probabilidad de acierto.
- La racha y las vidas no persisten al recargar (estado en memoria).
