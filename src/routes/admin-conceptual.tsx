// SPEC-18 — Panel administrativo conceptual (P-18)
// Vista ESTÁTICA de demostración: ningún control ejecuta operaciones reales.
import { createFileRoute, Link } from "@tanstack/react-router";
import { misiones } from "@/data/misiones";
import { preguntas } from "@/data/preguntas";
import { temporadas } from "@/data/temporadas";
import { insignias } from "@/data/insignias";
import { IconoPastilla } from "@/components/Icono";

export const Route = createFileRoute("/admin-conceptual")({
  head: () => ({
    meta: [
      { title: "Panel administrativo conceptual — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Maqueta estática de cómo se gestionarían temporadas, misiones, preguntas e insignias en la versión final.",
      },
      { property: "og:title", content: "Panel administrativo conceptual" },
      {
        property: "og:description",
        content: "Demostración visual de la futura gestión de contenido. No es funcional.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PanelConceptual,
});

const metricas = [
  { etiqueta: "Temporadas", valor: temporadas.length, nota: "1 activa · 4 planificadas" },
  { etiqueta: "Misiones", valor: misiones.length, nota: "Temporada 1" },
  { etiqueta: "Preguntas", valor: preguntas.length, nota: "Banco de muestra" },
  { etiqueta: "Insignias", valor: insignias.length, nota: "Reglas configurables" },
];

const secciones = [
  {
    icono: "contenido",
    titulo: "Temporadas y misiones",
    detalle:
      "Crear temporadas, ordenar misiones, definir cuántas preguntas trae cada una y cuándo se publica.",
  },
  {
    icono: "preguntas",
    titulo: "Banco de preguntas",
    detalle:
      "Alta y edición por tipo (múltiple, verdadero/falso, imagen, caso práctico y reto presencial), con su retroalimentación.",
  },
  {
    icono: "imagen",
    titulo: "Imágenes y contenido",
    detalle:
      "Carga de fotografías de lugares, pictogramas y textos culturales revisados por el equipo de turismo.",
  },
  {
    icono: "objetivo",
    titulo: "Puntajes y niveles",
    detalle:
      "Ajuste del puntaje por respuesta, del máximo por misión y de los umbrales de cada nivel.",
  },
  {
    icono: "medalla",
    titulo: "Insignias y reglas",
    detalle:
      "Definición de criterios de desbloqueo: completar misión, misión perfecta, invitar o cerrar temporada.",
  },
  {
    icono: "metricas",
    titulo: "Reportes de participación",
    detalle:
      "Vista futura de usuarios activos, misiones completadas y retos presenciales validados.",
  },
];

const filas = misiones.slice(0, 5).map((m) => ({
  id: m.id,
  nombre: m.nombre,
  preguntas: m.cantidadPreguntas,
  puntaje: m.puntajeMaximo,
  estado: m.orden <= 4 ? "Publicada" : "En revisión",
}));

function PanelConceptual() {
  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="rounded-xl border border-secondary bg-secondary/10 p-3 text-center text-sm font-semibold text-secondary">
          Vista conceptual y estática · ninguna acción de esta pantalla modifica datos
        </div>

        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
              Soy Embajador Bolivia · Backoffice (demostración)
            </p>
            <h1 className="text-3xl font-bold text-foreground">Así se administrará el contenido</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Referencia visual para el cliente: muestra qué se podrá gestionar en la versión
              desarrollada, sin construir el módulo en esta etapa.
            </p>
          </div>
          <Link to="/temporadas" className="btn-duo btn-duo-ghost">
            Volver al prototipo
          </Link>
        </header>

        <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {metricas.map((m) => (
            <div key={m.etiqueta} className="card-duo p-4">
              <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
                {m.etiqueta}
              </p>
              <p className="text-3xl font-bold text-primary">{m.valor}</p>
              <p className="text-xs text-muted-foreground">{m.nota}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-3 md:grid-cols-3">
          {secciones.map((s) => (
            <article key={s.titulo} className="card-duo p-5">
              <IconoPastilla nombre={s.icono} tono="primary" />
              <h2 className="mt-1 text-base font-bold text-foreground">{s.titulo}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{s.detalle}</p>
            </article>
          ))}
        </section>

        <section className="overflow-hidden rounded-2xl bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border p-4">
            <h2 className="text-base font-bold text-foreground">Misiones de la Temporada 1</h2>
            <span
              aria-disabled="true"
              className="cursor-not-allowed rounded-lg bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground"
            >
              + Nueva misión (deshabilitado)
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/60 text-xs tracking-wider text-muted-foreground uppercase">
                <tr>
                  <th className="p-3">Misión</th>
                  <th className="p-3">Preguntas</th>
                  <th className="p-3">Puntaje máx.</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((f) => (
                  <tr key={f.id} className="border-t border-border">
                    <td className="p-3 font-semibold text-foreground">{f.nombre}</td>
                    <td className="p-3 text-muted-foreground">{f.preguntas}</td>
                    <td className="p-3 text-muted-foreground">{f.puntaje}</td>
                    <td className="p-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          f.estado === "Publicada"
                            ? "bg-primary/10 text-primary"
                            : "bg-accent/25 text-accent-foreground"
                        }`}
                      >
                        {f.estado}
                      </span>
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">
                      Editar · Duplicar · Archivar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="pb-6 text-center text-xs text-muted-foreground">
          El desarrollo de este panel no forma parte del alcance del prototipo
          (docs/05-guardarrailes.md).
        </p>
      </div>
    </main>
  );
}
