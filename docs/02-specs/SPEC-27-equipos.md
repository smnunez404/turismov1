# SPEC-27 — Equipos por zona sintéticos (P-25)

Ruta: `/equipos` · Sprint: S-5 · Estado: Hecho como simulación local — verificado 28-08-2026

## Objetivo

Representar cómo la identidad de barrio podría funcionar como motor social del juego.

## Reglas

- 6 equipos ilustrativos: Centro Histórico, Equipetrol, Plan 3000, Villa 1ro de Mayo, Urubó y
  Pampa de la Isla.
- Elegir o cambiar equipo modifica sólo el estado local.
- Los puntos del jugador se reflejan en el marcador sintético de su zona.
- Integrantes, clasificación semanal y posible premio son datos ficticios; no hay personas
  conectadas, sincronización ni entrega de beneficios.

## Criterios de aceptación

- [x] La tabla ordena por puntos e identifica el equipo del jugador.
- [x] Elegir o cambiar equipo actualiza la representación inmediatamente.
- [x] Zona e integrantes se muestran como datos sintéticos.
- [x] La UI no afirma que el equipo ganador recibe un premio real.
