// SPEC-18 — Panel administrativo interactivo de gestión (P-18)
// Panel interactivo de demostración para el cliente con tabs, creación y edición simulada en memoria.
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { misiones as misionesIniciales } from "@/data/misiones";
import { preguntas as preguntasIniciales } from "@/data/preguntas";
import { temporadas } from "@/data/temporadas";
import { Icono, IconoPastilla } from "@/components/Icono";

export const Route = createFileRoute("/admin-conceptual")({
  head: () => ({
    meta: [
      { title: "Panel de Gestión Administrativa — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Dashboard interactivo para la administración de temporadas, misiones, preguntas, liguillas y premios.",
      },
    ],
  }),
  component: PanelConceptual,
});

type TabAdmin = "preguntas" | "misiones" | "liguillas" | "premios" | "metricas";

function PanelConceptual() {
  const [tabActiva, setTabActiva] = useState<TabAdmin>("preguntas");
  const [misionesLista, setMisionesLista] = useState(misionesIniciales);
  const [preguntasLista, setPreguntasLista] = useState(preguntasIniciales);

  // Estados para filtros
  const [filtroMision, setFiltroMision] = useState<string>("todas");
  const [busqueda, setBusqueda] = useState("");

  // Modales interactivos
  const [modalPregunta, setModalPregunta] = useState(false);
  const [preguntaForm, setPreguntaForm] = useState({
    enunciado: "",
    misionId: "m1",
    tipo: "multiple" as const,
    opcionA: "",
    opcionB: "",
    opcionC: "",
    opcionD: "",
    correcta: "a",
    retro: "",
    puntaje: 10,
  });

  const [modalMision, setModalMision] = useState(false);
  const [misionEdicion, setMisionEdicion] = useState<{ id: string; nombre: string; estado: string } | null>(null);

  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  function notificar(msg: string) {
    setMensajeExito(msg);
    setTimeout(() => setMensajeExito(null), 3500);
  }

  // Filtrado de preguntas
  const preguntasFiltradas = preguntasLista.filter((p) => {
    const coincideMision = filtroMision === "todas" || p.misionId === filtroMision;
    const coincideTexto = busqueda === "" || p.enunciado.toLowerCase().includes(busqueda.toLowerCase());
    return coincideMision && coincideTexto;
  });

  function guardarNuevaPregunta(e: React.FormEvent) {
    e.preventDefault();
    if (!preguntaForm.enunciado.trim() || !preguntaForm.opcionA.trim() || !preguntaForm.opcionB.trim()) return;

    const nueva = {
      id: `p_${Date.now()}`,
      misionId: preguntaForm.misionId,
      tipo: preguntaForm.tipo,
      enunciado: preguntaForm.enunciado,
      opciones: [
        { id: "a", texto: preguntaForm.opcionA },
        { id: "b", texto: preguntaForm.opcionB },
        ...(preguntaForm.opcionC ? [{ id: "c", texto: preguntaForm.opcionC }] : []),
        ...(preguntaForm.opcionD ? [{ id: "d", texto: preguntaForm.opcionD }] : []),
      ],
      respuestaCorrectaId: preguntaForm.correcta,
      retroalimentacion: preguntaForm.retro || "¡Respuesta registrada con éxito!",
      puntaje: Number(preguntaForm.puntaje) || 10,
    };

    setPreguntasLista([nueva, ...preguntasLista]);
    setModalPregunta(false);
    setPreguntaForm({
      enunciado: "",
      misionId: "m1",
      tipo: "multiple",
      opcionA: "",
      opcionB: "",
      opcionC: "",
      opcionD: "",
      correcta: "a",
      retro: "",
      puntaje: 10,
    });
    notificar("Pregunta añadida al banco oficial");
  }

  function eliminarPregunta(id: string) {
    setPreguntasLista(preguntasLista.filter((p) => p.id !== id));
    notificar("Pregunta eliminada del catálogo");
  }

  return (
    <div className="min-h-screen bg-muted/20 text-foreground flex flex-col md:flex-row">
      {/* ── Notificación Flotante ── */}
      {mensajeExito && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl border-2 border-primary bg-card px-4 py-3 shadow-2xl flex items-center gap-2.5 text-xs font-black text-foreground animate-in slide-in-from-top-4">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary">✓</span>
          <span>{mensajeExito}</span>
        </div>
      )}

      {/* ── SIDEBAR DE CONTROL (Navegación estilo Dashboard) ── */}
      <aside className="w-full md:w-64 bg-card border-b md:border-b-0 md:border-r border-border p-4 flex flex-col justify-between shrink-0">
        <div>
          {/* Cabecera del Panel */}
          <div className="flex items-center gap-2.5 px-2 py-1 mb-6">
            <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black text-sm">
              <Icono nombre="bloqueado" className="h-4 w-4" />
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest text-primary uppercase leading-none">
                Consola Admin
              </p>
              <h2 className="text-sm font-extrabold text-foreground">Embajador Bolivia</h2>
            </div>
          </div>

          {/* Menú de Módulos */}
          <nav className="flex flex-col gap-1">
            <BotonSidebar
              icono="preguntas"
              etiqueta="Banco de Preguntas"
              activo={tabActiva === "preguntas"}
              badge={preguntasLista.length}
              onClick={() => setTabActiva("preguntas")}
            />
            <BotonSidebar
              icono="mapa"
              etiqueta="Misiones y Camino"
              activo={tabActiva === "misiones"}
              badge={misionesLista.length}
              onClick={() => setTabActiva("misiones")}
            />
            <BotonSidebar
              icono="ranking"
              etiqueta="Liguillas (PIN)"
              activo={tabActiva === "liguillas"}
              badge="Activo"
              onClick={() => setTabActiva("liguillas")}
            />
            <BotonSidebar
              icono="regalo"
              etiqueta="Premios y Convenios"
              activo={tabActiva === "premios"}
              badge="4 rubros"
              onClick={() => setTabActiva("premios")}
            />
            <BotonSidebar
              icono="metricas"
              etiqueta="Reportes y Analítica"
              activo={tabActiva === "metricas"}
              onClick={() => setTabActiva("metricas")}
            />
          </nav>
        </div>

        {/* Pie del Sidebar: volver a la app */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col gap-2">
          <Link
            to="/perfil"
            className="btn-duo btn-duo-ghost !py-2 !text-xs flex items-center justify-center gap-1.5"
          >
            <Icono nombre="volver" className="h-3.5 w-3.5" />
            <span>Volver a la App</span>
          </Link>
          <p className="text-[10px] text-center text-muted-foreground">
            Sesión: <strong>admin</strong> · Modo interactivo
          </p>
        </div>
      </aside>

      {/* ── ÁREA DE TRABAJO PRINCIPAL ── */}
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto w-full overflow-y-auto">
        {/* 1. PESTAÑA: BANCO DE PREGUNTAS */}
        {tabActiva === "preguntas" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground">
                  Banco Central de Preguntas
                </h1>
                <p className="text-xs text-muted-foreground">
                  Administrá el catálogo de preguntas para Ruleta, Partidas Rápidas y Liguillas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalPregunta(true)}
                className="btn-duo btn-duo-primary !py-2 !px-4 !text-xs !w-auto flex items-center gap-1.5 cursor-pointer"
              >
                <span>+ Nueva Pregunta</span>
              </button>
            </div>

            {/* Barra de Filtros y Búsqueda */}
            <div className="card-duo p-3 flex flex-wrap gap-3 items-center justify-between">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <input
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar por enunciado o palabra clave..."
                  className="w-full rounded-xl border border-input bg-card px-3 py-1.5 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-muted-foreground">Misión:</span>
                <select
                  value={filtroMision}
                  onChange={(e) => setFiltroMision(e.target.value)}
                  className="rounded-xl border border-input bg-card px-3 py-1.5 font-bold outline-none cursor-pointer"
                >
                  <option value="todas">Todas las misiones</option>
                  <option value="m1">M1: Los Orígenes</option>
                  <option value="m2">M2: El Corazón</option>
                  <option value="m3">M3: Naturaleza</option>
                  <option value="m4">M4: Buen Anfitrión</option>
                  <option value="m5">M5: Aventura</option>
                </select>
              </div>
            </div>

            {/* Tabla Interactiva de Preguntas */}
            <div className="overflow-hidden rounded-2xl border-2 border-border bg-card shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-border bg-muted/40 uppercase tracking-wider text-muted-foreground font-black">
                    <tr>
                      <th className="p-3">Enunciado</th>
                      <th className="p-3">Misión</th>
                      <th className="p-3">Tipo</th>
                      <th className="p-3">Opciones</th>
                      <th className="p-3">Puntaje</th>
                      <th className="p-3 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {preguntasFiltradas.slice(0, 8).map((p) => (
                      <tr key={p.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-3 font-extrabold text-foreground max-w-xs truncate">
                          {p.enunciado}
                        </td>
                        <td className="p-3">
                          <span className="rounded-md bg-primary/10 px-2 py-0.5 font-black text-primary uppercase text-[10px]">
                            {p.misionId}
                          </span>
                        </td>
                        <td className="p-3 text-muted-foreground font-semibold">
                          {p.tipo}
                        </td>
                        <td className="p-3 text-muted-foreground">
                          {p.opciones.length} alternativas
                        </td>
                        <td className="p-3 font-bold text-foreground">
                          +{p.puntaje} XP
                        </td>
                        <td className="p-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => notificar(`Editando pregunta: ${p.enunciado}`)}
                              className="rounded-lg border border-border px-2 py-1 text-[11px] font-bold text-foreground hover:border-primary transition-colors cursor-pointer"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => eliminarPregunta(p.id)}
                              className="rounded-lg border border-destructive/40 px-2 py-1 text-[11px] font-bold text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-3 border-t border-border text-center text-[11px] text-muted-foreground font-semibold">
                Mostrando {Math.min(8, preguntasFiltradas.length)} de {preguntasFiltradas.length} preguntas disponibles
              </div>
            </div>
          </div>
        )}

        {/* 2. PESTAÑA: MISIONES Y CAMINO */}
        {tabActiva === "misiones" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground">
                  Misiones y Pase de Temporada
                </h1>
                <p className="text-xs text-muted-foreground">
                  Configurá el orden de aprendizaje, cantidad de preguntas y requisitos de cofres.
                </p>
              </div>
              <button
                type="button"
                onClick={() => notificar("Abriendo creador de nueva misión")}
                className="btn-duo btn-duo-primary !py-2 !px-4 !text-xs !w-auto cursor-pointer"
              >
                + Nueva Misión
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {misionesLista.map((m) => (
                <div
                  key={m.id}
                  className="card-duo p-4 flex flex-col justify-between border-2 border-border/80 hover:border-primary transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-black uppercase text-primary">
                        Orden #{m.orden}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground">
                        {m.cantidadPreguntas} preguntas
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-foreground mt-2">
                      {m.nombre}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                      {m.descripcion}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <span className="text-[11px] font-bold text-secondary">
                      Premio: {m.insigniaId}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMisionEdicion({ id: m.id, nombre: m.nombre, estado: "Publicada" });
                        setModalMision(true);
                      }}
                      className="rounded-lg border border-border px-2.5 py-1 text-xs font-bold hover:border-primary transition-colors cursor-pointer"
                    >
                      Ajustar misión
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. PESTAÑA: LIGUILLAS PRIVADAS */}
        {tabActiva === "liguillas" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground">
                  Liguillas y Torneos Escolares
                </h1>
                <p className="text-xs text-muted-foreground">
                  Monitoreá las salas privadas creadas por profesores y grupos con código PIN.
                </p>
              </div>
              <button
                type="button"
                onClick={() => notificar("Liguilla institucional generada con PIN SCZ-2026")}
                className="btn-duo btn-duo-primary !py-2 !px-4 !text-xs !w-auto cursor-pointer"
              >
                + Generar Torneo Institucional
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="card-duo p-3.5 border-l-4 border-l-primary">
                <span className="text-[10px] font-black uppercase text-muted-foreground">Salas Creadas</span>
                <p className="text-2xl font-black text-foreground mt-1">14</p>
                <p className="text-[11px] text-muted-foreground">Esta semana</p>
              </div>
              <div className="card-duo p-3.5 border-l-4 border-l-accent">
                <span className="text-[10px] font-black uppercase text-muted-foreground">Participantes Activos</span>
                <p className="text-2xl font-black text-foreground mt-1">280</p>
                <p className="text-[11px] text-muted-foreground">Estudiantes y amigos</p>
              </div>
              <div className="card-duo p-3.5 border-l-4 border-l-secondary">
                <span className="text-[10px] font-black uppercase text-muted-foreground">Tasa de Finalización</span>
                <p className="text-2xl font-black text-foreground mt-1">94%</p>
                <p className="text-[11px] text-muted-foreground">Sin abandono</p>
              </div>
            </div>

            <div className="card-duo p-4">
              <h3 className="text-sm font-extrabold text-foreground mb-2">Salas Activas de Muestra</h3>
              <div className="divide-y divide-border">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md text-xs">
                      SCZ26
                    </span>
                    <span className="ml-2 font-bold text-xs text-foreground">Promo 2026 - Copa Cruceña</span>
                  </div>
                  <span className="text-xs text-muted-foreground">8 participantes · Finalizada</span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <span className="font-mono font-black text-primary bg-primary/10 px-2 py-0.5 rounded-md text-xs">
                      CB-4821
                    </span>
                    <span className="ml-2 font-bold text-xs text-foreground">Colegio La Salle 5to B</span>
                  </div>
                  <span className="text-xs text-primary font-extrabold">En juego ahora</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. PESTAÑA: PREMIOS Y CONVENIOS */}
        {tabActiva === "premios" && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl md:text-2xl font-black text-foreground">
                  Premios y Convenios Reales
                </h1>
                <p className="text-xs text-muted-foreground">
                  Convenios con comercios cruceños para el canje de cupones con monedas acumuladas.
                </p>
              </div>
              <button
                type="button"
                onClick={() => notificar("Formulario de nuevo convenio abierto")}
                className="btn-duo btn-duo-primary !py-2 !px-4 !text-xs !w-auto cursor-pointer"
              >
                + Nuevo Convenio
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              <div className="card-duo p-4 flex items-start gap-3">
                <IconoPastilla nombre="cine" tono="accent" className="h-10 w-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-foreground">Cine Center / Multicine</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Beneficio: 2x1 en entradas todos los miércoles con 50 monedas.
                  </p>
                  <p className="text-[11px] font-semibold text-secondary mt-1.5">
                    Stock restante: 420 cupones
                  </p>
                </div>
              </div>

              <div className="card-duo p-4 flex items-start gap-3">
                <IconoPastilla nombre="gastronomia" tono="secondary" className="h-10 w-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-foreground">Cafeterías & Comida Típica</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Beneficio: Combo cuñapé + café con 20% de descuento.
                  </p>
                  <p className="text-[11px] font-semibold text-secondary mt-1.5">
                    Stock restante: 680 cupones
                  </p>
                </div>
              </div>

              <div className="card-duo p-4 flex items-start gap-3">
                <IconoPastilla nombre="tour" tono="primary" className="h-10 w-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-foreground">Tours Chiquitanos</h3>
                    <span className="text-[10px] font-bold text-accent-foreground bg-accent/20 px-2 py-0.5 rounded-md">
                      Temporada Alta
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Beneficio: Cupón de Bs 50 en paquetes a San Javier y Concepción.
                  </p>
                  <p className="text-[11px] font-semibold text-secondary mt-1.5">
                    Stock restante: 95 cupones
                  </p>
                </div>
              </div>

              <div className="card-duo p-4 flex items-start gap-3">
                <IconoPastilla nombre="certificado" tono="muted" className="h-10 w-10 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-extrabold text-foreground">Talleres Culturales</h3>
                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                      Activo
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Beneficio: Acceso gratuito a conferencias y guías patrimoniales.
                  </p>
                  <p className="text-[11px] font-semibold text-secondary mt-1.5">
                    Stock restante: Ilimitado
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PESTAÑA: REPORTES Y ANALÍTICA */}
        {tabActiva === "metricas" && (
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="text-xl md:text-2xl font-black text-foreground">
                Reportes y Analítica de Aprendizaje
              </h1>
              <p className="text-xs text-muted-foreground">
                Métricas de retención y efectividad del aprendizaje turístico.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="card-duo p-4 text-center">
                <p className="text-xs font-bold text-muted-foreground">Jugadores Totales</p>
                <p className="text-2xl font-black text-primary mt-1">1,420</p>
                <p className="text-[10px] text-muted-foreground">+18% esta semana</p>
              </div>
              <div className="card-duo p-4 text-center">
                <p className="text-xs font-bold text-muted-foreground">Aciertos Promedio</p>
                <p className="text-2xl font-black text-foreground mt-1">78%</p>
                <p className="text-[10px] text-primary font-bold">Nivel satisfactorio</p>
              </div>
              <div className="card-duo p-4 text-center">
                <p className="text-xs font-bold text-muted-foreground">Cofres Abiertos</p>
                <p className="text-2xl font-black text-secondary mt-1">940</p>
                <p className="text-[10px] text-muted-foreground">En camino de temp.</p>
              </div>
              <div className="card-duo p-4 text-center">
                <p className="text-xs font-bold text-muted-foreground">Certificados Emitidos</p>
                <p className="text-2xl font-black text-accent-foreground mt-1">315</p>
                <p className="text-[10px] text-muted-foreground">Embajadores activos</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL INTERACTIVO: CREAR NUEVA PREGUNTA ── */}
      {modalPregunta && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-md rounded-3xl border-2 border-border bg-card p-5 text-foreground shadow-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-black text-foreground">Crear Pregunta en el Catálogo</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Completá los datos y la respuesta correcta para publicarla en el juego.
            </p>

            <form onSubmit={guardarNuevaPregunta} className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-extrabold uppercase text-muted-foreground">
                  Misión asignada
                </label>
                <select
                  value={preguntaForm.misionId}
                  onChange={(e) => setPreguntaForm({ ...preguntaForm, misionId: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-bold outline-none"
                >
                  <option value="m1">Misión 1: Los Orígenes</option>
                  <option value="m2">Misión 2: El Corazón</option>
                  <option value="m3">Misión 3: Naturaleza</option>
                  <option value="m4">Misión 4: Buen Anfitrión</option>
                  <option value="m5">Misión 5: Primera Aventura</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase text-muted-foreground">
                  Enunciado de la Pregunta
                </label>
                <textarea
                  value={preguntaForm.enunciado}
                  onChange={(e) => setPreguntaForm({ ...preguntaForm, enunciado: e.target.value })}
                  placeholder="Ej: ¿Qué flor típica adorna las plazas de Santa Cruz en primavera?"
                  required
                  rows={2}
                  className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Opción A</label>
                  <input
                    type="text"
                    value={preguntaForm.opcionA}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, opcionA: e.target.value })}
                    placeholder="Opción A"
                    required
                    className="mt-0.5 w-full rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Opción B</label>
                  <input
                    type="text"
                    value={preguntaForm.opcionB}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, opcionB: e.target.value })}
                    placeholder="Opción B"
                    required
                    className="mt-0.5 w-full rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Opción C (Opcional)</label>
                  <input
                    type="text"
                    value={preguntaForm.opcionC}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, opcionC: e.target.value })}
                    placeholder="Opción C"
                    className="mt-0.5 w-full rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-muted-foreground uppercase">Opción D (Opcional)</label>
                  <input
                    type="text"
                    value={preguntaForm.opcionD}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, opcionD: e.target.value })}
                    placeholder="Opción D"
                    className="mt-0.5 w-full rounded-xl border border-input bg-card px-3 py-1.5 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-muted-foreground">
                    Respuesta Correcta
                  </label>
                  <select
                    value={preguntaForm.correcta}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, correcta: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-bold outline-none"
                  >
                    <option value="a">Opción A</option>
                    <option value="b">Opción B</option>
                    <option value="c">Opción C</option>
                    <option value="d">Opción D</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-extrabold uppercase text-muted-foreground">
                    Puntaje Recompensa
                  </label>
                  <input
                    type="number"
                    value={preguntaForm.puntaje}
                    onChange={(e) => setPreguntaForm({ ...preguntaForm, puntaje: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-extrabold uppercase text-muted-foreground">
                  Dato Curioso / Retroalimentación
                </label>
                <input
                  type="text"
                  value={preguntaForm.retro}
                  onChange={(e) => setPreguntaForm({ ...preguntaForm, retro: e.target.value })}
                  placeholder="Explicación formativa al responder..."
                  className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs outline-none"
                />
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalPregunta(false)}
                  className="btn-duo btn-duo-ghost !py-2.5 !text-xs flex-1 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-duo btn-duo-primary !py-2.5 !text-xs flex-1 cursor-pointer"
                >
                  Guardar en Catálogo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL INTERACTIVO: AJUSTAR MISIÓN ── */}
      {modalMision && misionEdicion && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-sm rounded-3xl border-2 border-border bg-card p-5 text-foreground shadow-2xl">
            <h3 className="text-base font-black text-foreground">Ajustar Misión</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Modificá el estado y parámetros de la misión.
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase">Título</label>
                <input
                  type="text"
                  value={misionEdicion.nombre}
                  onChange={(e) => setMisionEdicion({ ...misionEdicion, nombre: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase">Estado de Publicación</label>
                <select
                  value={misionEdicion.estado}
                  onChange={(e) => setMisionEdicion({ ...misionEdicion, estado: e.target.value })}
                  className="mt-1 w-full rounded-xl border border-input bg-card px-3 py-2 text-xs font-bold outline-none"
                >
                  <option value="Publicada">Publicada (Visible)</option>
                  <option value="En revisión">En revisión</option>
                  <option value="Borrador">Borrador (Oculta)</option>
                </select>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalMision(false)}
                  className="btn-duo btn-duo-ghost !py-2 !text-xs flex-1 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMisionesLista(
                      misionesLista.map((m) =>
                        m.id === misionEdicion.id ? { ...m, nombre: misionEdicion.nombre } : m
                      )
                    );
                    setModalMision(false);
                    notificar(`Misión "${misionEdicion.nombre}" actualizada`);
                  }}
                  className="btn-duo btn-duo-primary !py-2 !text-xs flex-1 cursor-pointer"
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BotonSidebar({
  icono,
  etiqueta,
  activo,
  badge,
  onClick,
}: {
  icono: string;
  etiqueta: string;
  activo: boolean;
  badge?: string | number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
        activo
          ? "bg-primary text-primary-foreground shadow-xs font-black"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icono nombre={icono} className="h-4 w-4 shrink-0" />
        <span>{etiqueta}</span>
      </div>
      {badge !== undefined && (
        <span
          className={`px-1.5 py-0.2 text-[10px] font-black rounded-md ${
            activo ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}
