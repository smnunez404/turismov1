# SPEC-30 — Premios y billetera de cupones (P-26)

Ruta: `/recompensas` · Sprint: S-5 · Estado: Hecho

## Objetivo
Convertir el juego en beneficio tangible y en tráfico medible para los auspiciadores.

## Reglas
- Catálogo de premios con costo en puntos, vigencia y condición.
- Canjear descuenta los puntos y emite un cupón con código `SEB-<iniciales>-<azar>`.
- La billetera lista cupones activos y usados; el usuario marca el cupón al usarlo en el local.
- Los premios con puntos insuficientes se muestran, pero deshabilitados con el faltante.

## Criterios de aceptación
- [x] El saldo de puntos es visible en la cabecera.
- [x] El código del cupón se muestra en monoespaciada, legible a distancia de mostrador.
- [x] Un cupón usado no se puede volver a marcar.
- [x] Aviso explícito de que los auspiciadores son de demostración.
