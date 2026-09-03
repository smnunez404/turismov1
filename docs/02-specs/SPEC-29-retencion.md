# SPEC-29 — Plan de retención (conceptual)

Sprint: S-5 · Estado: Documentado (sin implementación en el prototipo)

## Objetivo

Definir los disparadores de retorno que se construirían con backend en producción.

## Disparadores previstos

| Momento          | Mensaje                                                | Objetivo                 |
| ---------------- | ------------------------------------------------------ | ------------------------ |
| 20:00 si no jugó | "Te falta la pregunta del día para no perder tu racha" | Racha                    |
| Vidas recargadas | "Ya tenés vidas: girá la ruleta"                       | Sesión extra             |
| Domingo 18:00    | "Cierra la liga: estás a X pts del top 3"              | Competencia              |
| Rival respondió  | "Te ganó por ahora, revanchá el duelo"                 | Social                   |
| Cupón por vencer | "Tu cupón vence en 3 días"                             | Canje y tráfico al local |

## Guardarraíl

No se implementan notificaciones en el prototipo: requieren backend, permisos y
consentimiento del usuario. Queda documentado como alcance de la etapa productiva.
