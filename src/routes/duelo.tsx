import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AvatarInsignia } from "@/components/AvatarInsignia";
import { Pantalla } from "@/components/Pantalla";
import { PartidaCinco } from "@/components/PartidaCinco";
import { ResultadoPartida } from "@/components/ResultadoPartida";
import { useSesion } from "@/context/SessionContext";
import type { ResumenPartida } from "@/data/tipos";
import { useSalidaProtegida } from "@/hooks/useSalidaProtegida";
import { capturarEstadoResultado, type EstadoPrevioResultado } from "@/lib/resultado";

export const Route = createFileRoute("/duelo")({
  head: () => ({ meta: [{ title: "Versus — Soy Embajador Bolivia" }] }),
  component: Versus,
});

function Versus() {
  const { usuario, iniciarPartida, finalizarPartida } = useSesion();
  const [jugando, setJugando] = useState(false);
  const [revancha, setRevancha] = useState(0);
  const [resultado, setResultado] = useState<ResumenPartida | null>(null);
  const [previo, setPrevio] = useState<EstadoPrevioResultado | null>(null);
  const [botAciertos, setBotAciertos] = useState(0);
  const [partidaId, setPartidaId] = useState("versus-preparando");
  const nombreJugador = usuario.nombre || "Vos";
  const nombreRival = "Cambita Curioso";
  const { confirmarSalida } = useSalidaProtegida(
    jugando && !resultado,
    "¿Querés salir del versus? Perderás el progreso y la vida utilizada no se recuperará.",
  );

  const iniciarIntento = (numeroRevancha: number) => {
    if (!usuario.vidas) return;
    const nuevoId = `versus-${usuario.partidasIniciadas.length + 1}`;
    iniciarPartida(nuevoId, true);
    setPartidaId(nuevoId);
    setRevancha(numeroRevancha);
    setResultado(null);
    setPrevio(null);
    setJugando(true);
  };
  const comenzar = () => iniciarIntento(revancha);

  if (!jugando && !resultado) {
    return (
      <Pantalla conNav className="gap-5">
        <header>
          <p className="text-xs font-bold tracking-widest text-secondary uppercase">
            Desafío individual
          </p>
          <h1 className="text-3xl font-extrabold">Versus</h1>
          <p className="text-sm text-muted-foreground">
            Enfrentá a {nombreRival} y buscá superar su marcador en cinco desafíos.
          </p>
        </header>
        <section className="game-panel p-5">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
            <div className="flex min-w-0 flex-col items-center gap-2">
              <AvatarInsignia avatar={usuario.avatar} tamano="md" />
              <span className="max-w-full truncate text-sm font-extrabold">{nombreJugador}</span>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-black text-secondary-foreground">
              VS
            </span>
            <div className="flex min-w-0 flex-col items-center gap-2">
              <AvatarInsignia semilla={nombreRival} tamano="md" />
              <span className="max-w-full truncate text-sm font-extrabold">{nombreRival}</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-bold text-muted-foreground">
                Rival de práctica
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            5 desafíos compartidos · consume 1 de tus 3 vidas
          </p>
        </section>
        {usuario.vidas > 0 ? (
          <button type="button" className="btn-duo btn-duo-secondary" onClick={comenzar}>
            JUGAR VERSUS · {usuario.vidas} {usuario.vidas === 1 ? "VIDA" : "VIDAS"}
          </button>
        ) : (
          <div className="card-duo p-4 text-center">
            <p className="font-extrabold text-foreground">Te quedaste sin vidas</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Las vidas se recargan con el tiempo o podés practicar en la sección Jugar.
            </p>
            <Link to="/jugar" className="btn-duo btn-duo-primary mt-3 text-xs py-2.5">
              Ir a modos gratuitos
            </Link>
          </div>
        )}
      </Pantalla>
    );
  }

  if (resultado && previo) {
    const gane = resultado.aciertos > botAciertos;
    const empate = resultado.aciertos === botAciertos;
    return (
      <Pantalla conNav>
        <ResultadoPartida
          usuario={usuario}
          resumen={resultado}
          previo={previo}
          ceja="Duelo de conocimiento"
          titulo={gane ? "¡Ganaste el versus!" : empate ? "¡Empate!" : "Casi, pedí revancha"}
          descripcion={`Vos ${resultado.aciertos} · ${botAciertos} ${nombreRival}.`}
          icono={gane ? "corona" : "duelo"}
          tono={gane ? "accent" : "secondary"}
          detalle={
            <section className="card-duo p-4">
              <p className="font-extrabold">Rival de práctica</p>
              <p className="text-sm text-muted-foreground">
                Su marcador cambia en cada revancha para mantener el desafío interesante.
              </p>
            </section>
          }
          acciones={
            <>
              {usuario.vidas > 0 && (
                <button
                  type="button"
                  className="btn-duo btn-duo-primary"
                  onClick={() => iniciarIntento(revancha + 1)}
                >
                  Pedir revancha
                </button>
              )}
              <Link to="/compartir" className="btn-duo btn-duo-secondary">
                Preparar tarjeta para compartir
              </Link>
              <Link to="/jugar" className="btn-duo btn-duo-ghost">
                Volver a jugar
              </Link>
            </>
          }
        />
      </Pantalla>
    );
  }

  return (
    <Pantalla className="gap-4">
      <div className="game-hud p-3">
        <p className="text-center text-xs font-bold tracking-widest text-secondary uppercase">
          Duelo en curso
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <span className="flex min-w-0 items-center gap-2">
            <AvatarInsignia avatar={usuario.avatar} tamano="sm" />
            <span className="max-w-24 truncate text-xs font-extrabold">{nombreJugador}</span>
          </span>
          <span aria-hidden="true" className="text-xs font-black text-muted-foreground">
            VS
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <AvatarInsignia semilla={nombreRival} tamano="sm" />
            <span className="max-w-24 truncate text-xs font-extrabold">{nombreRival}</span>
          </span>
        </div>
      </div>
      <PartidaCinco
        id={partidaId}
        modo="versus"
        semilla={usuario.progresoJuego.partidas + revancha + 91}
        onExit={() => {
          if (confirmarSalida()) setJugando(false);
        }}
        onComplete={(resumen, bot) => {
          setPrevio(capturarEstadoResultado(usuario));
          finalizarPartida(resumen);
          setBotAciertos(bot ?? 0);
          setResultado(resumen);
          setJugando(false);
        }}
      />
    </Pantalla>
  );
}
