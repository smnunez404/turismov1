# SPEC-26 — Liga semanal sintética (P-24)

Ruta: `/liga` · Sprint: S-5 · Estado: Hecho como simulación local — verificado 28-08-2026

## Objetivo

Representar una competencia acotada y renovable sin usuarios conectados ni calendario de
servidor.

## Reglas

- 4 divisiones: Cuñapé (0), Tajibo (150), Toborochi (350) y Jaguar (600) puntos de liga.
- Los puntos del jugador provienen del estado local de la sesión.
- Participantes, reinicio de lunes, top 3 y premio semanal son datos o mensajes ilustrativos.
- No hay reinicio programado, clasificación compartida ni entrega real de premios.

## Criterios de aceptación

- [x] La cabecera indica división y puntos faltantes para ascender.
- [x] El jugador aparece resaltado; los demás participantes son sintéticos.
- [x] La zona de premio se distingue y se rotula como clasificación ilustrativa.
- [x] Ranking XP y Liga semanal se presentan como vistas hermanas.
