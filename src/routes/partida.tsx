import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PartidaCinco } from "@/components/PartidaCinco";
import { ResultadoPartida } from "@/components/ResultadoPartida";
import { Pantalla } from "@/components/Pantalla";
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
              <button
                type="button"
                className="btn-duo btn-duo-primary"
                onClick={() => {
                  setResultado(null);
                  setPrevio(null);
                  setRonda((x) => x + 1);
                }}
              >
                JUGAR OTRA
              </button>
              <Link to="/duelo" className="btn-duo btn-duo-secondary">
                DESAFIAR A CAMBITA CURIOSO
              </Link>
              <div className="flex items-center justify-center gap-4 pt-1">
                <Link
                  to="/jugar"
                  className="text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Volver al inicio
                </Link>
                <span className="text-muted-foreground/40">·</span>
                <Link
                  to="/ranking"
                  className="text-xs font-bold text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Ver ranking
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
