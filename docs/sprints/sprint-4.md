# Sprint 4 — Cierre, certificado y consolidación

- **Estado:** Construido el 10 de agosto de 2026 — pendiente la validación con el cliente
- **Specs:** SPEC-16, SPEC-17, SPEC-18 · **Pantallas:** P-16 a P-18

**Objetivo.** Cerrar el ciclo emocional y dejar el prototipo listo para validar.

## Checklist

- [x] Certificado digital con nombre, temporada, puntaje y fecha.
- [x] Compartir logros e invitar amigos (simulado).
- [x] Panel administrativo conceptual estático.
- [ ] Validación conjunta con el cliente.
- [ ] Incorporación de la ronda única consolidada de observaciones.
- [x] Pulido visual y de consistencia.
- [ ] Documentos entregables preparados (§13).

## Entregable

Prototipo completo navegable + documentación de cierre.
## Cierre de construcción

Construido: `/certificado`, `/compartir` y `/admin-conceptual`.

### Reglas de desbloqueo del cierre

| Pantalla | Condición de acceso | Si no se cumple |
| --- | --- | --- |
| P-16 Certificado | Las 5 misiones de la Temporada 1 completadas. | Estado "en preparación" con barra de avance y acceso al mapa. |
| P-17 Compartir | Al menos 1 misión completada (hay algo que mostrar). | Estado vacío que invita a jugar la primera misión. |
| P-18 Panel conceptual | Siempre accesible desde el pie del mapa de temporadas. | — |

### Detalles

- El certificado muestra nombre real, temporada, puntaje, insignias, nivel, fecha de
  emisión y un código de verificación simulado (`SEB-T1-XX-0000`). No genera archivo:
  el usuario captura la pantalla.
- La fecha se calcula después de hidratar para evitar diferencias con el render inicial.
- Compartir arma una vista previa del mensaje con las insignias obtenidas y cuatro
  canales simulados (WhatsApp, Instagram, Facebook, copiar enlace); confirma con un aviso
  explícito de que no se publica nada real.
- Invitar amigos (lista sugerida o nombre libre) otorga la insignia "Promotor Cruceño";
  la lista de amigos ahora vive en `src/data/comunidad.ts`, compartida con el reto presencial.
- El panel administrativo es una maqueta estática de escritorio: métricas del contenido
  actual, seis áreas de gestión y una tabla de misiones con acciones deshabilitadas.

### Verificado en navegador

Recorrido completo M1→M5, certificado emitido con 350 pts y 8 insignias, compartir
simulado en WhatsApp, invitación registrada, panel conceptual y estado bloqueado del
certificado tras reiniciar la sesión. Sin errores de consola.

## Pendiente (no depende del código)

- [ ] Validación conjunta con el cliente.
- [ ] Ronda única consolidada de observaciones.
- [ ] Entrega final de documentos (§13).
