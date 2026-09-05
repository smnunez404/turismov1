# ENTREGABLE 7: RESPUESTA TÉCNICA A LA REVISIÓN DEL CLIENTE Y ESPECIFICACIÓN DEL MOTOR GAME-FIRST
## Proyecto: Soy Embajador Bolivia (Fase 1: Descubre Santa Cruz)
**Cliente:** Alejandra Caballero (C.I. 3866326)  
**Prestador:** Adaptive Labs  
**Tipo de Documento:** Informe de Descargo Técnico, Aclaratoria Contractual y Especificación Matemática  
**Fecha:** Septiembre de 2026  
**Documento de Referencia Evaluado:** *"Revisión del MVP — Soy Embajador Bolivia (30 de agosto de 2026)"*  

---

## 1. ACLARATORIA CONTRACTUAL Y ENCUADRE DE ETAPA
Agradecemos el detallado informe remitido por la cliente. Es sumamente valioso confirmar que compartimos la visión estratégica: **convertir a Soy Embajador Bolivia en un videojuego social de descubrimiento cultural de alto engagement y no en una simple guía turística**.

No obstante, como aclaratoria profesional indispensable frente a las observaciones formuladas (muchas de las cuales provienen de consultas automatizadas a modelos de IA sin contexto del acuerdo suscrito), es imperativo remitirnos a las cláusulas contractuales firmadas:

1. **Naturaleza del Servicio (Cláusula Primera, Segunda y Tercera):**
   > *"El resultado esperado será un prototipo navegable que simule el funcionamiento del producto sin incorporar programación funcional... El prototipo constituye una simulación de la experiencia de usuario y no un producto funcional."*
2. **Servicios Excluidos (Cláusula Sexta):**
   > *"El presente contrato no comprende: Desarrollo Backend, Desarrollo Frontend funcional, Base de datos, Programación, Infraestructura en producción, ni Carga masiva de contenido."*
3. **Analítica de Eventos (DAU, D1, D7, D30) y Base de Datos:**
   Exigir métricas de retención D1/D7 o persistencia multiusuario en producción en esta fase inicial excede el alcance del prototipo navegable en memoria. Estas métricas pertenecen formalmente a la **Fase 2 (MVP Funcional en Producción)**.
4. **Propósito del Prototipo Web:**
   La aplicación final está concebida para **dispositivos móviles (Android / iOS)**. El prototipo se construyó en tecnología web interactiva de alta fidelidad precisamente para permitir a la cliente y a sus evaluadores auditar la ergonomía móvil (viewport 392px), el flujo de juego y la estética visual desde cualquier enlace sin requerir pasar por los filtros de aprobación de Google Play o App Store.

---

## 2. RESPUESTAS TÉCNICAS AL CHECKLIST DE REVISIÓN DEL CLIENTE

A continuación se responde punto por punto a las inquietudes funcionales y matemáticas planteadas en la revisión:

### Q1. ¿Cuánto dura una partida completa y cuántos desafíos contiene?
* **Estructura de Partida:** Toda partida en el motor (`PartidaCinco.tsx` / `engine.ts`) consta de **exactamente 5 desafíos** seleccionados de forma procedural según la semilla diaria o aleatoria.
* **Ritmo y Duración:** Cada desafío cuenta con un temporizador de 15 a 25 segundos según la complejidad. Una partida promedio dura entre **65 y 90 segundos**. Este ritmo garantiza el bucle adictivo de "una partida más" (*one more loop*) similar a Wordle o Preguntados.

---

### Q2. ¿Qué mecánicas están realmente implementadas en el código?
El motor `engine.ts` implementa 5 familias mecánicas activas, no solo selección múltiple:
1. **Familia Rápido (Trivia Dinámica):** Opción única cronometrada bajo presión.
2. **Familia Detective (Casos y Dilemas):** Situaciones hipotéticas sobre patrimonio o conducta turística responsable donde se evalúa el criterio ciudadano.
3. **Familia Reconocimiento Visual (Imagen):** Identificación de monumentos, flora (Toborochi), fauna o platos típicos mediante imágenes reales.
4. **Familia Asociación / Orden:** Selección de conjuntos de elementos correctos y ordenamiento cronológico de sucesos (ej. fundación de Santa Cruz y sus traslados).
5. **Familia Reto Presencial:** Simulación de geolocalización, captura fotográfica y redacción de anécdota ciudadana.
* *Minijuegos Adicionales Implementados:* Sopa de Letras táctil (`/jugar/sopa`), Verdad o Reto grupal (`/jugar/retos`) y Ruleta Cruceña (`/jugar/ruleta`).

---

### Q3. ¿Cómo es el modelo matemático de cálculo de XP y Monedas?
El otorgamiento de experiencia está calibrado en `engine.ts` bajo la siguiente fórmula determinista:

$$\text{XP Ganado} = \sum_{i=1}^{5} \text{XP\_Base}_i + \text{Bonus\_Modo} + \text{Bonus\_Racha}$$

* **Por Desafío Individual:**
  * **Respuesta Correcta:** $+20\text{ XP}$ y $+5\text{ Monedas}$.
  * **Respuesta Incorrecta (Aprendizaje):** $+5\text{ XP}$ y $+0\text{ Monedas}$. *(Principio de diseño: nunca castigar con 0 XP; premiar la curiosidad y la lectura del feedback educativo).*
* **Bonificaciones por Modo de Juego (`bonusXp`):**
  * **Modo Libre / Práctica:** $+10\text{ XP}$ al completar los 5 desafíos.
  * **Modo Reto Diario:** $+15\text{ XP}$ y $+8\text{ Monedas}$ adicionales.
  * **Modo Versus (Duelo):** $+20\text{ XP}$ si gana el duelo; $+5\text{ XP}$ si empata o pierde.
* **Partida Perfecta (5 de 5 aciertos):** Otorga insignia conmemorativa especial (*"Memoria de Elefante"*) y $+25\text{ XP}$ extra.

---

### Q4. ¿Cómo funciona la progresión de Niveles y Rangos?
La progresión se gestiona mediante umbrales en curva exponencial suave (`progreso.ts`), diseñada para que el usuario suba rápido en los primeros 15 minutos y requiera constancia para el rango supremo:

| Nivel | Rango | XP Requerido | Partidas Estimadas | Beneficio Desbloqueado |
|:---:|:---|:---:|:---:|:---|
| **1** | **Curioso** | $0\text{ XP}$ | 0 | Acceso al juego, avatar básico. |
| **2** | **Explorador** | $100\text{ XP}$ | ~2 partidas | Desbloqueo de Misión 2 y Ruleta Diaria. |
| **3** | **Conocedor** | $240\text{ XP}$ | ~4 partidas | Acceso a Liguillas Privadas y prendas de tienda. |
| **4** | **Anfitrión** | $450\text{ XP}$ | ~8 partidas | Desbloqueo de Misión 5 (Reto Presencial). |
| **5** | **Embajador de Oro** | $750\text{ XP}$ | ~14 partidas | **Emisión del Certificado Oficial de Embajador**. |

---

### Q5. ¿Cómo funciona la Racha y el Reto Diario?
* **Reto Diario (`/jugar/dia`):** Utiliza una función determinista de fecha basada en la zona horaria boliviana (`America/La_Paz`). Todos los usuarios que ingresan en una misma fecha calendario juegan exactamente la misma combinación de 5 preguntas generada por una semilla matemática (`semillaTexto("YYYY-MM-DD")`).
* **Regla de Racha:** Si el usuario completa el reto diario en días consecutivos, su contador de racha se incrementa $+1$. Si pasa un día calendario sin jugar, la racha se reinicia a 1. Cumplir 3 y 7 días de racha desbloquea cofres especiales en el Pase del Embajador.

---

### Q6. ¿Cómo funciona el Modo Versus (1 vs 1) y la Revancha?
* **Ruta Activa:** [`/duelo`](http://localhost:8080/duelo).
* **Mecánica:** El usuario enfrenta a un competidor (en el prototipo, "Cambita Curioso" con IA sintética que simula 2 a 5 aciertos probabilísticos según la dificultad).
* **Consumo de Vidas:** Jugar un versus consume 1 de las 3 vidas del jugador. Las vidas se recargan cada 20 minutos o mediante giros en la Ruleta.
* **Flujo de Revancha:** Al terminar el duelo, la pantalla de resultados compara ambos puntajes y habilita el botón inmediato **"Pedir revancha"**, el cual recalcula una nueva partida manteniendo el historial de victorias del duelo.

---

### Q7. ¿Cómo funciona el Ranking Comunitario?
* **Ruta Activa:** [`/ranking`](http://localhost:8080/ranking).
* **Estructura:** Tabla de posiciones con podio para los 3 primeros lugares y lista de exploradores de Santa Cruz. En el prototipo actual se alimenta de competidores sintéticos equilibrados donde el usuario ve cómo sus partidas lo hacen escalar puestos en tiempo real tras ganar XP.

---

### Q8. ¿Qué ocurre cuando el usuario termina una partida? (El "One More Loop")
La pantalla de resultados (`ResultadoPartida.tsx`) está diseñada como el eje de retención:
1. **Feedback Inmediato:** Gráfico de aciertos (ej. "4 de 5"), desglose de XP ganado y barra de progreso animada hacia el siguiente nivel.
2. **Acciones Inmediatas (CTA Primarios):**
   * Botón destacado **"JUGAR OTRA"** (inicia una nueva serie de 5 preguntas en menos de 1 segundo).
   * Botón secundario **"DESAFIAR A CAMBITA"** (conduce al duelo 1 vs 1).
   * Botón **"Compartir logro"** o **"Ver ranking"**.

---

## 3. ADOPCIÓN DE LAS RECOMENDACIONES DE DIRECCIÓN VISUAL
El equipo de diseño aprueba y adopta íntegramente las directrices estéticas sugeridas:

1. **El Tucán como Mascota Oficial:** Se incorpora formalmente al tucán como personaje guía y anfitrión lúdico. Aparecerá celebrando respuestas correctas, guiando el onboarding y acompañando al avatar del jugador.
2. **Jerarquía Cromática Rigurosa:**
   * **Verde (#12824C):** Marca institucional, progreso de nivel y estados positivos.
   * **Amarillo / Oro (#F3B344):** Energía, monedas, XP y recompensas.
   * **Naranja (#E05A1B):** Llamados a la acción prioritarios (Botón JUGAR, Desafíos).
   * **Neutros:** Tarjetas de lectura y fondos de descanso.
3. **Profundidad de Escenarios:** Transición de "postales turísticas planas" a capas de profundidad (primer plano, elementos interactivos, arquitectura icónica y fondos atmosféricos).
4. **Integración Total del Avatar:** El avatar ya no vive aislado; aparece en la tarjeta de redes, en los duelos Versus cara a cara y en el podio de Liguillas.

---

## 4. CONCLUSIÓN Y HOJA DE RUTA PARA LA REUNIÓN DE CIERRE
El prototipo actual **cumple al 100% con los entregables del contrato de definición y prototipado**.

La recomendación del cliente de realizar una **semana de validación de experiencia con usuarios reales antes de programar el backend** es absolutamente acertada y coincide con nuestra metodología. Para ello, hemos elaborado la **Guía de Validación con Usuarios e Investigación UX (`entregables/06-guia-validacion-usuarios-investigacion-ux.md`)**, la cual proporciona a Alejandra Caballero las herramientas para ejecutar las 20 entrevistas guiadas en Santa Cruz.

Con este documento y el paquete completo en `entregables/`, el servicio contratado queda plenamente justificado, respaldado y listo para su aprobación final.
