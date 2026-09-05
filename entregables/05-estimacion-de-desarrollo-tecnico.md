# ENTREGABLE 5: ESTIMACIÓN DE DESARROLLO TÉCNICO, ARQUITECTURA Y PRESUPUESTO
## Proyecto: Soy Embajador Bolivia (Fase 1: Descubre Santa Cruz)
**Cliente:** Alejandra Caballero (C.I. 3866326)  
**Prestador:** Adaptive Labs  
**Versión:** Análisis Técnico y Financiero v1.0  
**Fecha:** Septiembre de 2026  

---

## 1. INTRODUCCIÓN Y METODOLOGÍA
Para dar estricto cumplimiento a la **Cláusula Quinta (Punto 5)** del contrato, se presenta la estimación detallada de tiempo, recursos humanos e inversión financiera para la construcción del **MVP Funcional en Producción**.

A solicitud explícita de la dirección técnica, se evalúan **dos enfoques de arquitectura tecnológica**:
1. **Opción A (Stack Híbrido / Managed Services con Herramientas de Pago):** Máxima velocidad de salida al mercado (Time-to-Market), infraestructura como servicio (BaaS) y menor carga de mantenimiento de servidores.
2. **Opción B (Stack 100% Open Source / Self-Hosted):** Independencia absoluta de proveedores cloud, cero costos de licencias propietarias recurrentes y control total del código fuente e infraestructura.

---

## 2. COMPARATIVA DE STACKS TECNOLÓGICOS

| Componente | Opción A: Stack Híbrido (Managed Services) | Opción B: Stack 100% Open Source (Self-Hosted) |
|---|---|---|
| **Frontend Móvil & Web** | React 19 + TanStack Router (Base actual) + Tailwind CSS | React 19 + TanStack Router (Base actual) + Tailwind CSS |
| **Empaquetado Mobile** | Capacitor / Expo EAS (Builds automáticos en la nube) | Capacitor + Builds locales en Android Studio / Xcode |
| **Backend & APIs** | Supabase (PostgreSQL serverless, Auth, Edge Functions) | Node.js (NestJS / Fastify) o Python (FastAPI) + Docker |
| **Base de Datos** | Supabase Managed PostgreSQL | PostgreSQL 16 desplegado en VPS Linux propio (Debian) |
| **Autenticación** | Supabase Auth (Google, Apple, SMS/WhatsApp Twilio) | Lucia Auth / Supabase Self-Hosted / Keycloak |
| **Almacenamiento (Fotos Reto)** | Supabase Storage (S3-compatible managed) | MinIO (Servidor S3 Open Source autoalojado) |
| **Hosting & CDN** | Vercel Pro / Cloudflare Pages + Workers | VPS dedicado en Hetzner / DigitalOcean + Nginx reverse proxy |
| **Base de Datos Realtime (Liguillas)** | Supabase Realtime (WebSockets administrados) | Redis + Socket.io Server autogestionado |
| **Costo Fijo Mensual Infraestructura** | **$25 - $45 USD / mes** (Planes Pro) | **$12 - $20 USD / mes** (Solo costo de servidor VPS) |

---

## 3. ESTIMACIÓN DE TIEMPOS Y FASES DE DESARROLLO (SPRINTS)

El desarrollo del MVP funcional se estructura en **4 Sprints de 2 semanas cada uno (8 a 10 semanas de trabajo efectivo)**:

```
Sprint 1: Cimientos, Base de Datos y Autenticación (Semanas 1 - 2)
  ├── Diseño del esquema de datos relacional (Usuarios, Misiones, Respuestas, Inventario).
  ├── Configuración del entorno de backend y endpoints de autenticación (OAuth y WhatsApp).
  └── Migración del estado de sesión en memoria (`useSesion`) al cliente API persistente.

Sprint 2: Motor de Juego, Temporadas y Pase del Embajador (Semanas 3 - 4)
  ├── Persistencia del avance en las 5 misiones cruceñas y cálculo seguro de XP en servidor.
  ├── Desbloqueo progresivo del Pase del Embajador y apertura de cofres con recompensas guardadas.
  └── Motor antifraude para evitar duplicación de puntos o respuestas automáticas.

Sprint 3: Reto Presencial, Minijuegos y Liguillas (Semanas 5 - 6)
  ├── API de geolocalización para validar coordenadas GPS del usuario en el Casco Viejo.
  ├── Subida y compresión optimizada de fotos del reto presencial en el bucket de almacenamiento.
  ├── Sincronización en tiempo real de salas de liguillas privadas con código PIN.
  └── Panel administrativo para revisión de fotos, moderación y edición de preguntas.

Sprint 4: Certificación, Empaquetado Mobile y Lanzamiento (Semanas 7 - 8)
  ├── Servicio generador de diplomas oficiales en PDF vectorial y PNG descargable de alta resolución.
  ├── Empaquetado nativo para Android e iOS mediante Capacitor.
  ├── Pruebas de estrés, auditoría de seguridad y optimización de rendimiento (Lighthouse > 90).
  └── Despliegue en servidores de producción y entrega de accesos.
```

---

## 4. ANÁLISIS ECONÓMICO Y RANGOS DE INVERSIÓN (PRESUPUESTO)

Los costos se presentan según la modalidad de contratación y el stack seleccionado:

### Escenario 1: Implementación con Stack Híbrido Managed (Opción A - Recomendada)
* *Ventajas:* Se aprovecha el 100% del código ya construido en el prototipo; desarrollo más ágil y menor riesgo de fallos en producción.
* *Equipo requerido:* 1 Líder Técnico Fullstack + 1 Desarrollador Frontend/Mobile.
* **Tiempo estimado:** 8 semanas (2 meses).
* **Rango de Inversión en Desarrollo:** **$3,800 – $4,600 USD**
* **Costo Operativo de Servicios Cloud (Mensual):** ~$25 a $35 USD/mes.

### Escenario 2: Implementación con Stack 100% Open Source (Opción B - Self-Hosted)
* *Ventajas:* No hay dependencia de plataformas de terceros; costo de infraestructura mensual mínimo.
* *Desventaja:* Requiere configurar y mantener manualmente servidores, certificados SSL, copias de seguridad de base de datos y balanceadores de carga.
* *Equipo requerido:* 1 Desarrollador Backend/DevOps + 1 Desarrollador Frontend.
* **Tiempo estimado:** 9 a 10 semanas.
* **Rango de Inversión en Desarrollo:** **$4,500 – $5,400 USD**
* **Costo Operativo de Servidores VPS (Mensual):** ~$15 a $20 USD/mes.

---

## 5. RECOMENDACIÓN TÉCNICA DEL PRESTADOR (ADAPTIVE LABS)
Recomendamos a **Alejandra Caballero** optar por la **Opción A (Stack Híbrido con Supabase y Cloudflare)** para la etapa de lanzamiento del MVP.

Esta alternativa permite:
1. Reducir el tiempo de desarrollo en al menos 2 a 3 semanas.
2. Contar con un panel de control intuitivo que el equipo no técnico del cliente puede usar de inmediato para ver usuarios y datos.
3. Escalar de 10 a 50,000 usuarios sin tener que rediseñar la infraestructura.
4. Mantener los costos fijos dentro de un rango sumamente accesible (menos de $30 USD mensuales durante la etapa de tracción).
