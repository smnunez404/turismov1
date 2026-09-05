import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PartidaCinco } from "@/components/PartidaCinco";
import { ResultadoPartida } from "@/components/ResultadoPartida";
import { Pantalla } from "@/components/Pantalla";
import { Icono } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import type { ResumenPartida } from "@/data/tipos";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";
import { capturarEstadoResultado, type EstadoPrevioResultado } from "@/lib/resultado";

export const Route = createFileRoute("/partida")({
  head: () => ({ meta: [{ title: "Partida rápida — Soy Embajador Bolivia" }] }),
  component: PartidaLibre,
});

function PartidaLibre() {
  const { usuario, finalizarPartida } = useSesion();
  const [resultado, setResultado] = useState<ResumenPartida | null>(null);
  const [previo, setPrevio] = useState<EstadoPrevioResultado | null>(null);
  const [ronda, setRonda] = useState(0);
  const id = `libre-${usuario.progresoJuego.partidas + ronda + 1}`;
  const { salir } = useSalidaProtegida(!resultado);

  if (resultado && previo) {
    const invitacion = usuario.esInvitado ? (
      <section className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-extrabold">¿Querés guardar tu progreso?</p>
          <p className="text-xs text-muted-foreground">Creá tu perfil y continuá tu recorrido.</p>
        </div>
        <Link
          to="/registro"
          className="shrink-0 rounded-xl border-2 border-b-4 border-primary bg-card px-3 py-2 text-xs font-extrabold text-primary"
        >
          Guardar
        </Link>
      </section>
    ) : undefined;

    return (
      <Pantalla conNav>
        <ResultadoPartida
          usuario={usuario}
          resumen={resultado}
          previo={previo}
          ceja="5 de 5 completados"
          titulo="¡La curiosidad suma!"
          descripcion={`Acertaste ${resultado.aciertos} desafíos. Lo que falló ya es un descubrimiento nuevo.`}
          icono="corona"
          detalle={invitacion}
          acciones={
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  className="btn-duo btn-duo-primary flex items-center justify-center gap-2"
                  onClick={() => {
                    setResultado(null);
                    setPrevio(null);
                    setRonda((x) => x + 1);
                  }}
                >
                  <Icono nombre="jugar" className="h-5 w-5 shrink-0" />
                  <span>JUGAR OTRA</span>
                </button>
                <Link
                  to="/duelo"
                  className="btn-duo btn-duo-secondary flex items-center justify-center gap-2"
                >
                  <Icono nombre="duelo" className="h-5 w-5 shrink-0" />
                  <span>DESAFIAR A CAMBITA</span>
                </Link>
              </div>
              <div className="flex items-center justify-center gap-4 pt-1">
                <Link
                  to="/jugar"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  <Icono nombre="volver" className="h-3.5 w-3.5" />
                  <span>Volver al inicio</span>
                </Link>
                <span className="text-muted-foreground/40">·</span>
                <Link
                  to="/ranking"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  <Icono nombre="ranking" className="h-3.5 w-3.5" />
                  <span>Ver ranking</span>
                </Link>
              </div>
            </>
          }
        />
      </Pantalla>
    );
  }

  return (
    <Pantalla className="gap-5">
      <PartidaCinco
        key={id}
        id={id}
        modo="libre"
        semilla={usuario.progresoJuego.partidas + ronda + 17}
        onExit={() => salir("/jugar")}
        onComplete={(resumen) => {
          setPrevio(capturarEstadoResultado(usuario));
          finalizarPartida(resumen);
          setResultado(resumen);
        }}
      />
    </Pantalla>
  );
}
