# ENTREGABLE 3: DOCUMENTO DE ALCANCE VALIDADO DEL MVP
## Proyecto: Soy Embajador Bolivia (Fase 1: Descubre Santa Cruz)
**Cliente:** Alejandra Caballero (C.I. 3866326)  
**Prestador:** Adaptive Labs  
**Versión:** Especificación de Alcance Validado v1.0  
**Fecha:** Septiembre de 2026  

---

## 1. PROPÓSITO DEL DOCUMENTO
Conforme a la **Cláusula Tercera y Quinta (Punto 3)** del contrato, este documento define formalmente el perímetro de funcionalidades aprobadas y validadas que constituirán la base para la fase de desarrollo del Producto Mínimo Viable (MVP).

El proceso de prototipado interactivo permitió contrastar los supuestos funcionales iniciales con la interacción real de la interfaz, identificando los elementos con mayor valor para el usuario final y consolidando las decisiones de diseño.

---

## 2. INVENTARIO DE FUNCIONALIDADES VALIDADAS PARA EL MVP

### A. Módulo de Identidad y Acceso
* **F-01 Autenticación Híbrida:** Inicio de sesión rápido con Google/Apple (OAuth 2.0) y acceso opcional mediante número de teléfono celular (WhatsApp OTP para el mercado boliviano).
* **F-02 Constructor de Avatar Cruceño:** Personalización inicial con 6 tonos de piel, peinados y prendas regionales básicas gratuitas. Accesorios de prestigio (sombrero fino de saó, tipoy bordado, guitarra) desbloqueables mediante progreso y monedas virtuales.
* **F-03 Perfil del Explorador:** Registro de XP total, nivel alcanzado (desde *Curioso* hasta *Embajador de Oro*), historial de medallas y álbum de descubrimientos conmemorativos.

### B. Módulo de Temporadas y Gamificación
* **F-04 Temporada 1 "Descubre Santa Cruz":** 5 misiones completas con contenido validado:
  1. *Fundación de Santa Cruz de la Sierra:* Historia de Ñuflo de Chaves, fundación en 1561 y traslados históricos.
  2. *Catedral y Casco Viejo:* Arquitectura colonial, ladrillo visto, mirador de la torre y Plaza 24 de Septiembre.
  3. *Naturaleza y Chiquitania:* Flora autóctona (Toborochi), fauna de los llanos y riqueza de los pueblos misionales.
  4. *Gastronomía y Tradiciones:* Majadito, cuñapé, sonso de yuca y leyendas del oriente boliviano.
  5. *Reto Presencial Ciudadano:* Misión de campo con verificación por geolocalización o reporte fotográfico.
* **F-05 Pase del Embajador (Pista de Recompensas):** Sistema de 5 hitos progresivos con cofres de madera chiquitana que entregan monedas, fragmentos de historia y prendas de avatar.
* **F-06 Motor de Preguntas Interactivas:** Selección simple, verdadero/falso y dilemas con límite de tiempo de 20 a 30 segundos y feedback cultural pedagógico inmediato.

### C. Módulo Social y de Retención
* **F-07 Liguillas Privadas con Código PIN:** Creación de salas de juego temporal para aulas escolares, grupos familiares o amigos, con ranking interno independiente.
* **F-08 Hub de Minijuegos Culturales:** Sopa de Letras regional y dinámicas grupales de Verdad o Reto para incentivar el uso offline/presencial de la aplicación en reuniones.
* **F-09 Ruleta de Premios Diaria:** Un giro gratuito cada 24 horas con premios de XP, monedas virtuales y tickets para sorteos de auspiciadores.

### D. Módulo de Consagración y Difusión
* **F-10 Certificado Digital Oficial:** Generación automática de diploma en formato descargable (PDF y PNG de alta resolución) con código de validación verificable en línea (`bolivia.embajador.app/verificar/:hash`).
* **F-11 Tarjeta Social Compartible:** Generación de imagen estilizada con el avatar del usuario y sus estadísticas para difusión directa en Instagram Stories, WhatsApp y TikTok.

---

## 3. LÍMITES DEL ALCANCE Y GUARDARRAÍLES PARA EL MVP
Para evitar sobrecostos, retrasos en el lanzamiento y complejidad técnica innecesaria en la primera versión en producción, se establecen los siguientes **guardarraíles estrictos**:

1. **Sin Streaming de Video en Vivo:** Todo el contenido multimedia se basará en ilustraciones optimizadas en WebP/SVG y audio comprimido para garantizar tiempos de carga ultrarrápidos incluso con conexiones 3G/4G inestables.
2. **Sin Pagos Reales Iniciales (IAP):** La tienda del avatar funcionará exclusivamente con monedas virtuales ganadas jugando (fórmula Play-to-Earn educativa), evitando comisiones del 30% de Google y Apple en la fase piloto.
3. **Validación Semi-Automatizada del Reto Presencial:** El reto presencial validará la proximidad mediante las coordenadas del navegador/GPS del dispositivo móvil, evitando la necesidad inicial de visión por computadora compleja para reconocimiento de imágenes.
4. **Capacidad de Temporada Única:** La versión 1.0 se lanzará exclusivamente con la Temporada 1 (Santa Cruz). Las temporadas de La Paz, Cochabamba y Beni quedarán bloqueadas visualmente como "Próximamente" para capitalizar la expectativa.

---

## 4. CRITERIOS DE ÉXITO PARA EL LANZAMIENTO
* **Tasa de Completitud de Onboarding:** > 75% de los usuarios que instalan la app completan el tutorial y configuran su avatar.
* **Engagement con Misiones:** > 50% de los usuarios registrados completan al menos las primeras 3 misiones durante su primera semana.
* **Factor de Difusión K:** Al menos 1 de cada 4 usuarios que completan la Temporada 1 comparte su Certificado Digital o su Tarjeta Social en redes.
