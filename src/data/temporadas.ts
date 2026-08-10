import type { Temporada } from "./tipos";

// Contenido SINTÉTICO de muestra
export const temporadas: Temporada[] = [
  {
    id: "t1",
    nombre: "Descubre Santa Cruz",
    estado: "activa",
    orden: 1,
    descripcion: "Cinco misiones para conocer, sentir y contar tu ciudad.",
    icono: "ciudad",
  },
  {
    id: "t2",
    nombre: "Cultura",
    estado: "bloqueada",
    orden: 2,
    descripcion: "Fiestas, música y costumbres del oriente.",
    icono: "tambor",
  },
  {
    id: "t3",
    nombre: "Patrimonio",
    estado: "bloqueada",
    orden: 3,
    descripcion: "Misiones jesuíticas y memoria construida.",
    icono: "iglesia",
  },
  {
    id: "t4",
    nombre: "Gastronomía",
    estado: "bloqueada",
    orden: 4,
    descripcion: "Del majadito al sonso: sabor cruceño.",
    icono: "gastronomia",
  },
  {
    id: "t5",
    nombre: "Naturaleza",
    estado: "bloqueada",
    orden: 5,
    descripcion: "Amboró, Lomas de Arena y el verde infinito.",
    icono: "naturaleza",
  },
];