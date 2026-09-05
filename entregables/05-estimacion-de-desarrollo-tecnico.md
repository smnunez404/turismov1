# ENTREGABLE 5: ESTIMACIÓN DE DESARROLLO TÉCNICO, ARQUITECTURA MÓVIL Y PRESUPUESTO INTEGRAL
## Proyecto: Soy Embajador Bolivia (Fase 1: Descubre Santa Cruz)
**Cliente:** Alejandra Caballero (C.I. 3866326)  
**Prestador:** Adaptive Labs  
**Versión:** Análisis Técnico, Arquitectura Móvil y Honorarios v2.0  
**Fecha:** Septiembre de 2026  

---

## 1. NATURALEZA DEL PRODUCTO: ENFOQUE MOBILE-FIRST
El prototipo interactivo desarrollado en la fase actual fue construido en tecnología web para facilitar su inspección ágil en cualquier navegador. Sin embargo, el producto final contratado para producción es una **Aplicación Móvil para Celulares (iOS y Android)**.

La transición de una maqueta interactiva web a una aplicación móvil conectada a backend requiere:
1. Empaquetado móvil nativo/híbrido optimizado para pantallas táctiles y consumo eficiente de batería.
2. Gestión de estado offline (para que el turista pueda jugar sin conexión en zonas remotas de Santa Cruz o la Chiquitania).
3. Uso de APIs nativas del dispositivo: GPS de alta precisión (para el Reto Presencial), Cámara nativa (para capturar evidencias en monumentos) y Notificaciones Push (para recordar el Reto Diario y mantener la racha).
4. Proceso de homologación y publicación formal en las tiendas **Google Play Store** y **Apple App Store**.

---

## 2. COMPARATIVA DE STACKS TECNOLÓGICOS PARA APP MÓVIL

A continuación se analizan los dos enfoques arquitectónicos solicitados:

| Componente | Opción A: Stack Móvil Híbrido Managed (Herramientas de Pago BaaS) | Opción B: Stack Móvil 100% Open Source (Infraestructura Self-Hosted) |
|---|---|---|
| **Tecnología Móvil** | **React Native (Expo) o Capacitor + React 19** | **React Native CLI o Flutter** |
| **Backend & Base de Datos** | **Supabase Managed** (PostgreSQL cloud, Auth, Realtime, Storage S3) | **Node.js (NestJS) + PostgreSQL 16 + Docker** en servidor propio |
| **Autenticación** | Supabase Auth (Google, Apple Sign-in y WhatsApp OTP) | Lucia Auth / Keycloak autoalojado + Pasarela SMS |
| **Almacenamiento Fotos** | Supabase Storage (CDN global integrado) | MinIO (Servidor S3 Open Source en VPS) |
| **Tiempo Real (Liguillas)** | Supabase Realtime (WebSockets gestionados) | Redis + Socket.io Server dedicado |
| **Notificaciones Push** | OneSignal / Expo Push Service | Firebase Cloud Messaging (FCM) + APNs configurado manual |
| **Costo Fijo Mensual Servidores** | **$25 - $40 USD / mes** (Planes Pro gestionados) | **$15 - $25 USD / mes** (Costo básico de VPS Linux) |
| **Mantenimiento DevOps Requerido** | Mínimo (Backups automáticos y escalabilidad cloud) | Alto (Configuración manual de SSL, parches y balanceo) |

---

## 3. PLAN DE TRABAJO: FASES Y CRONOGRAMA DE INGENIERÍA (8 A 10 SEMANAS)

El desarrollo del MVP móvil funcional se divide en **4 Sprints de 2 semanas de trabajo efectivo**:

```
Sprint 1: Arquitectura Móvil, Base de Datos y Auth (Semanas 1 - 2)
  ├── Configuración del proyecto móvil (Capacitor/React Native).
  ├── Modelado del esquema relacional en PostgreSQL (Usuarios, Misiones, Respuestas, Inventario).
  └── Implementación del inicio de sesión con Google, Apple y acceso como invitado con sincronización posterior.

Sprint 2: Motor de Misiones, Pase del Embajador y Backend de XP (Semanas 3 - 4)
  ├── Lógica de juego segura en servidor (cálculo inviolable de XP, monedas y niveles).
  ├── Persistencia del Pase del Embajador y apertura de cofres con recompensas reales guardadas.
  └── Carga del banco de preguntas validado (20 a 50 desafíos iniciales) con explicaciones culturales.

Sprint 3: Reto Presencial (GPS/Cámara), Minijuegos y Liguillas (Semanas 5 - 6)
  ├── Integración de GPS nativo y cámara del celular para el Reto Presencial en el Casco Viejo.
  ├── Almacenamiento y compresión automática de fotografías en el bucket cloud.
  ├── Sincronización en tiempo real de salas de Liguillas Privadas con código PIN para colegios.
  └── Backoffice web administrativo para que el cliente gestione preguntas y apruebe fotos del reto.

Sprint 4: Certificación, Optimización y Publicación en Tiendas (Semanas 7 - 8)
  ├── Generación de diplomas descargables en PDF/PNG de alta definición con hash criptográfico verificable.
  ├── Generación de tarjetas sociales con avatar 3D para compartir en Instagram Stories y WhatsApp.
  ├── Pruebas de rendimiento, optimización offline y preparación de bundles (.aab para Android y .ipa para iOS).
  └── Envío a revisión en Google Play Console y Apple Developer.
```

---

## 4. PRESUPUESTO INTEGRAL: HONORARIOS PROFESIONALES Y COSTOS DE SERVICIOS

A diferencia de estimaciones genéricas que omiten el costo de mano de obra, a continuación se desglosa el **presupuesto total y transparente**, distinguiendo los honorarios profesionales de desarrollo de los costos de plataformas:

### A. Escenario 1: Stack Móvil Híbrido Managed (Opción A - Recomendada)
*Aprovecha el prototipo actual mediante Capacitor/React Native, reduciendo semanas de trabajo y eliminando costos de mantenimiento de servidores complejos.*

| Rubro | Descripción | Monto Estimado (USD) |
|---|---|:---:|
| **Honorarios Profesionales de Desarrollo:** | Arquitectura móvil, frontend app, integración de backend cloud, lógica de gamificación, panel administrativo y homologación en tiendas (8 semanas de dedicación). | **$3,600 – $4,400 USD** |
| **Cuentas de Desarrollador en Tiendas (Pago único):** | Google Play Developer ($25) + Apple Developer Program ($99/año). | **$124 USD** |
| **Infraestructura Cloud Inicial (Mensual):** | Supabase Pro + CDN Cloudflare (~$25 - $35/mes durante operación). | Incluido primeros meses |
| **INVERSIÓN TOTAL ESTIMADA (OPCIÓN A)** | **Servicio Llave en Mano para Lanzamiento en Tiendas** | **$3,724 – $4,524 USD** |

---

### B. Escenario 2: Stack Móvil 100% Open Source Self-Hosted (Opción B)
*Desarrollo de backend a medida desde cero en Node.js, configuración de servidor VPS propio, base de datos local y almacenamiento MinIO.*

| Rubro | Descripción | Monto Estimado (USD) |
|---|---|:---:|
| **Honorarios Profesionales de Desarrollo:** | Programación de backend a medida, APIs REST, websockets para liguillas, infraestructura Linux Docker, frontend móvil y panel admin (10 semanas). | **$4,400 – $5,200 USD** |
| **Cuentas de Desarrollador en Tiendas (Pago único):** | Google Play Developer ($25) + Apple Developer ($99). | **$124 USD** |
| **Servidor VPS Linux y Dominio:** | VPS dedicado en Hetzner / DigitalOcean (~$15 - $20/mes). | ~$50 USD trimestral |
| **INVERSIÓN TOTAL ESTIMADA (OPCIÓN B)** | **Servicio Completo con Infraestructura Propia** | **$4,574 – $5,374 USD** |

---

## 5. FORMA DE PAGO Y CONDICIONES RECOMENDADAS PARA LA FASE 2
Para brindar total seguridad financiera a la cliente y asegurar el avance continuo:
* **30% al inicio:** Para configuración de arquitectura móvil y base de datos.
* **30% a la entrega del Sprint 2:** Con el motor de juego móvil y las misiones funcionando con datos reales.
* **20% a la entrega del Sprint 3:** Con el reto presencial GPS, liguillas y panel administrativo listos.
* **20% contra publicación final:** Una vez aprobada la app en las tiendas móviles (Google Play / App Store).

---

## 6. RECOMENDACIÓN FINAL DE ADAPTIVE LABS
Recomendamos formalmente a **Alejandra Caballero** la **Opción A (Stack Móvil Híbrido con Supabase y Capacitor)**:
1. **Velocidad:** Permite tener la app lista para pruebas de campo en **8 semanas**.
2. **Eficiencia Financiera:** Ahorra aproximadamente $800 a $1,000 USD en honorarios de ingeniería al evitar programar desde cero componentes que ya están resueltos y probados en la nube.
3. **Control Total:** La cliente es dueña del 100% de su código y base de datos, con la tranquilidad de contar con servidores de nivel bancario respaldados automáticamente.
