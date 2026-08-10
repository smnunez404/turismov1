# Modelo de datos simulado

No es una base de datos: es la estructura de los datos locales que alimentan el prototipo.
Sirve además como insumo para diseñar el esquema real en la etapa de desarrollo posterior.

Implementación: `src/data/tipos.ts` y los archivos de datos sintéticos de `src/data/`.

## Usuario (sesión)

```ts
type UsuarioSesion = {
  nombre: string;
  correo: string;            // simulado, sin validación de servidor
  avatarId: string;
  puntos: number;
  insignias: string[];       // ids obtenidos
  progreso: Record<string, ProgresoMision>;
};
```

## Temporada

```ts
type Temporada = {
  id: string;
  nombre: string;
  estado: "activa" | "bloqueada";
  orden: number;
  descripcion: string;
  icono: string;
};
```

## Misión

```ts
type Mision = {
  id: string;
  temporadaId: string;
  nombre: string;
  orden: number;
  descripcion: string;
  cantidadPreguntas: number;
  puntajeMaximo: number;
};
```

El estado (`bloqueada` / `disponible` / `completada`) se deriva del progreso de la sesión.

## Pregunta

```ts
type TipoPregunta = "multiple" | "verdadero-falso" | "imagen" | "caso" | "reto";

type Pregunta = {
  id: string;
  misionId: string;
  tipo: TipoPregunta;
  enunciado: string;
  opciones: Opcion[];
  respuestaCorrectaId: string;
  retroalimentacion: string;  // explicación corta, siempre presente
  imagen?: string;
  puntaje: number;
};
```

## Insignia

```ts
type Insignia = {
  id: string;
  nombre: string;
  descripcion: string;
  criterio: string;
  icono: string;
};
```

## Certificado

Nombre del usuario, temporada completada, puntaje final, fecha de emisión simulada,
diseño visual compartible. No genera archivo descargable real.

## Ranking

Lista de participantes ficticios con nombre, avatar y puntaje, más la posición destacada
del usuario actual, recalculada con el puntaje de la sesión.