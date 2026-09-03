# SPEC-30 — Recompensas y cupones de demostración (P-26)

Ruta: `/recompensas` · Estado: actualizado por rediseño social

## Objetivo

Demostrar un inventario y gasto de moneda virtual sin presentar beneficios comerciales reales.

## Reglas vigentes

- Todo premio, marca, código, vigencia y condición es ficticio y se rotula como `demo`.
- El canje usa exclusivamente monedas; nunca reduce XP ni puntos de liga.
- Una recompensa ya adquirida no puede comprarse de nuevo.
- No existe validación en local, integración externa, emisión real ni persistencia.
- Recargar reinicia billetera, monedas y cupones.

## Criterios

- [x] El saldo visible es de monedas.
- [x] XP y liga no cambian al canjear.
- [x] No hay duplicados de un mismo premio.
- [x] Los códigos indican que son ficticios.
- [x] No se declara valor tangible ni tráfico medible.
