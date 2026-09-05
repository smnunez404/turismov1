import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PartidaCinco } from "@/components/PartidaCinco";
import { ResultadoPartida } from "@/components/ResultadoPartida";
import { Pantalla } from "@/components/Pantalla";
import { Icono } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import type { ResumenPartida } from "@/data/tipos";
import { fechaBolivia, semillaTexto } from "@/features/game/engine";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";
import { capturarEstadoResultado, type EstadoPrevioResultado } from "@/lib/resultado";

export const Route = createFileRoute("/jugar/dia")({
  head: () => ({ meta: [{ title: "Reto diario — Soy Embajador Bolivia" }] }),
  component: RetoDiario,
});

function RetoDiario() {
  const { usuario, finalizarPartida } = useSesion();
  const [fecha] = useState(() => fechaBolivia());
  const [resultado, setResultado] = useState<ResumenPartida | null>(null);
  const [previo, setPrevio] = useState<EstadoPrevioResultado | null>(null);
  const [intento, setIntento] = useState(0);
  const yaPremiado = usuario.progresoJuego.retoDiarioFecha === fecha;
  const { salir } = useSalidaProtegida(!resultado);

  if (resultado && previo) {
    const aplicoRecompensa = usuario.xp > previo.xp || usuario.monedas > previo.monedas;
    return (
      <Pantalla conNav>
        <ResultadoPartida
          usuario={usuario}
          resumen={resultado}
          previo={previo}
          ceja={`Reto de ${fecha}`}
          titulo={aplicoRecompensa ? "¡Ritual cumplido!" : "¡Práctica completada!"}
          descripcion={
            aplicoRecompensa
              ? "Tu recompensa y el día de racha ya fueron aplicados en esta sesión."
              : "La recompensa de hoy ya estaba aplicada; este intento cuenta como práctica."
          }
          icono="calendario"
          mostrarRacha
          detalle={
            <section className="card-duo p-4">
              <p className="font-extrabold">Una selección nueva cada día</p>
              <p className="text-sm text-muted-foreground">
                Volvé mañana para encontrar cinco desafíos distintos. No mostramos una posición
                diaria porque este prototipo no registra una clasificación real.
              </p>
            </section>
          }
          acciones={
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="btn-duo btn-duo-primary flex items-center justify-center gap-2"
                onClick={() => {
                  setResultado(null);
                  setPrevio(null);
                  setIntento((x) => x + 1);
                }}
              >
                <Icono nombre="jugar" className="h-5 w-5 shrink-0" />
                <span>Practicar otra vez</span>
              </button>
              <Link
                to="/jugar"
                className="btn-duo btn-duo-ghost flex items-center justify-center gap-2"
              >
                <Icono nombre="rayo" className="h-5 w-5 shrink-0 text-primary" />
                <span>Elegir otro modo</span>
              </Link>
            </div>
          }
        />
      </Pantalla>
    );
  }

  return (
    <Pantalla className="gap-4">
      <div className="rounded-2xl bg-accent/20 p-3 text-center text-xs text-accent-foreground">
        <strong>{yaPremiado ? "Modo práctica gratuito" : "Recompensa disponible"}</strong> · una
        sola recompensa por fecha dentro de esta sesión.
      </div>
      <PartidaCinco
        key={intento}
        id={`diario:${fecha}`}
        modo="diario"
        fechaDiaria={fecha}
        semilla={semillaTexto(fecha)}
        recompensaAplicable={!yaPremiado}
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
