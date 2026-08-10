# Sprint 3 — Gamificación, reto y progreso

- **Estado:** Hecho — cerrado el 10 de agosto de 2026
- **Specs:** SPEC-12, SPEC-13, SPEC-14, SPEC-15 + reglas de gamificación (§10)
- **Pantallas:** P-12 a P-15

**Objetivo.** Que el avance se sienta y se vea.

## Checklist

- [x] Resultados de misión con puntaje, aciertos e insignia.
- [x] Reto presencial de la Misión 5 con carga de foto simulada.
- [x] Perfil con nivel, puntos, insignias obtenidas y bloqueadas.
- [x] Ranking con datos ficticios y posición destacada del usuario.
- [x] Barra de progreso en los dos niveles: misión y temporada.

## Entregable

Puntos, insignias, progreso, perfil, ranking y reto presencial integrados.
## Cierre

Construido: `/mision/$misionId/resultados`, `/mision/$misionId/reto`, `/perfil` y `/ranking`.

Reglas de desbloqueo y gamificación implementadas (§10):

| Regla | Implementación |
| --- | --- |
| Desbloqueo secuencial | `estadoDeMision()` en `src/lib/progreso.ts`; la misión N+1 exige la N completada. |
| Reto presencial (M5) | Requiere las misiones 1 a 4 completadas; se valida lugar + foto simulada + relato. |
| Puntos | Se acumulan por misión; repetir conserva el mejor puntaje (no descuenta). |
| Nivel | 5 niveles derivados de puntos: Curioso (0), Explorador (80), Anfitrión (160), Embajador (240), Embajador de Oro (320). |
| Insignias | Una por misión, más Memoria de Elefante (misión perfecta), Promotor Cruceño (invitar) y Embajador de Santa Cruz (temporada completa). |
| Ranking | 12 participantes ficticios + el usuario, reordenado con el puntaje de la sesión. |
| Certificado | Se habilita al completar las 5 misiones; la pantalla se construye en el Sprint 4. |

Verificado en navegador: recorrido completo de M1 a M5, 350 puntos, 8/8 insignias y
posición #2 del ranking.
