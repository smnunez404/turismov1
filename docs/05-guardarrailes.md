# Guardarraíles de alcance (operativo)

> Traducción práctica de la sección 5 del documento maestro. Se revisa antes de cada
> construcción.

## Prohibido en esta etapa

- Base de datos, Lovable Cloud o cualquier backend.
- Autenticación real (OAuth, magic link, recuperación de contraseña).
- Llamadas a APIs externas o integraciones con terceros.
- Funciones de IA en tiempo de ejecución dentro del producto.
- Deploy a producción, dominio propio, publicación en tiendas.
- Panel administrativo funcional con CRUD real.
- Persistencia entre recargas: `localStorage`, `sessionStorage`, cookies, servidor.
- Carga masiva de contenido definitivo.

## Obligatorio en esta etapa

- Estado exclusivamente en memoria de React (contexto de sesión).
- Contenido desde estructuras de datos locales en `src/data/`.
- Datos sintéticos verosímiles: nombres, puntajes, ranking, preguntas de muestra.
- Cada construcción referencia su `SPEC-XX`.
- Cada pantalla nueva se registra en el inventario de pantallas y en el tablero de estado.

## Checklist antes de dar por terminada una spec

- [ ] Cumple todos sus criterios de aceptación.
- [ ] Es navegable desde y hacia las pantallas contiguas del flujo.
- [ ] Respeta los principios de diseño (§6).
- [ ] No introduce ninguna capacidad de la lista prohibida.
- [ ] El estado simulado es coherente con el resto del prototipo.
- [ ] Queda registrada en la bitácora si hubo definición nueva.

## Frases gatillo del cliente y respuesta correcta

| Solicitud                           | Respuesta                                                                                |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| "¿Se puede guardar mi progreso?"    | En el prototipo no; se reinicia al recargar. La persistencia es parte del MVP funcional. |
| "Que el ranking muestre gente real" | Requiere backend: cambio de alcance, nueva propuesta.                                    |
| "Agreguemos una misión más"         | Cambio de alcance: nueva propuesta y cronograma.                                         |
| "Cambiemos este color / este texto" | Ajuste menor: se aplica y se registra.                                                   |
| "Subamos la app a la tienda"        | Fuera de alcance; corresponde a etapa posterior.                                         |

## Fase 2 (modo Preguntados)

- No hay multijugador real: el rival del duelo es simulado con una probabilidad de acierto.
- No hay canje real de cupones ni integración con puntos de venta; el código es decorativo.
- No hay pagos, suscripciones ni facturación a auspiciadores.
- No hay notificaciones push: el plan de retención (SPEC-29) queda documentado, no construido.
- Vidas, racha, medallas, liga y cupones viven en memoria; al recargar se reinician.
- Los auspiciadores, premios y marcadores de equipos son datos sintéticos de demostración.
