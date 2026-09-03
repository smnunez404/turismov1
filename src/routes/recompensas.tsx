import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { BotonVolver } from "@/components/BotonVolver";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";
import { obtenerAuspiciador, obtenerPremio, premios } from "@/data/auspiciadores";
import { emitirCupon, tablaLiga } from "@/lib/juego";
import { avanceTemporada, nivelDe, temporadaCompletada } from "@/lib/progreso";
import { ACIERTOS_PARA_MEDALLA } from "@/data/categorias";
import type { Premio, UsuarioSesion } from "@/data/tipos";

export const Route = createFileRoute("/recompensas")({
  head: () => ({ meta: [{ title: "Recompensas — Soy Embajador Bolivia" }] }),
  component: Recompensas,
});

function cumpleCondicion(premio: Premio, usuario: UsuarioSesion) {
  switch (premio.id) {
    case "pr-cine":
      return usuario.xp >= 100;
    case "pr-mall":
      return usuario.racha.dias >= 3;
    case "pr-sabor":
      return (usuario.medallas["gastronomia"] ?? 0) >= ACIERTOS_PARA_MEDALLA;
    case "pr-cafe":
      return Boolean(usuario.progreso["m5"]?.completada);
    case "pr-bar":
      return tablaLiga(usuario).findIndex((participante) => participante.esUsuario) < 10;
    case "pr-tour":
      return temporadaCompletada("t1", usuario);
    default:
      return false;
  }
}

function progresoCondicion(premio: Premio, usuario: UsuarioSesion) {
  switch (premio.id) {
    case "pr-cine":
      return {
        texto: `${Math.min(usuario.xp, 100)}/100 XP para nivel Explorador`,
        porcentaje: Math.min(100, usuario.xp),
      };
    case "pr-mall":
      return {
        texto: `${Math.min(usuario.racha.dias, 3)}/3 días de racha`,
        porcentaje: Math.min(100, Math.round((usuario.racha.dias / 3) * 100)),
      };
    case "pr-sabor": {
      const actual = usuario.medallas["gastronomia"] ?? 0;
      return {
        texto: `${Math.min(actual, ACIERTOS_PARA_MEDALLA)}/${ACIERTOS_PARA_MEDALLA} aciertos de Gastronomía`,
        porcentaje: Math.min(100, Math.round((actual / ACIERTOS_PARA_MEDALLA) * 100)),
      };
    }
    case "pr-cafe": {
      const completo = Boolean(usuario.progreso["m5"]?.completada);
      return {
        texto: completo ? "Reto presencial completado" : "Reto presencial pendiente",
        porcentaje: completo ? 100 : 0,
      };
    }
    case "pr-bar": {
      const posicion = tablaLiga(usuario).findIndex((participante) => participante.esUsuario) + 1;
      return {
        texto: `Puesto #${posicion} · objetivo top 10`,
        porcentaje: posicion <= 10 ? 100 : Math.max(10, 100 - (posicion - 10) * 12),
      };
    }
    case "pr-tour": {
      const avance = avanceTemporada("t1", usuario);
      return {
        texto: `${avance.completadas}/${avance.total} misiones de temporada`,
        porcentaje: avance.porcentaje,
      };
    }
    default:
      return { texto: premio.condicion, porcentaje: 0 };
  }
}

function Recompensas() {
  const { usuario, guardarCupon, usarCupon } = useSesion();
  return (
    <Pantalla conNav className="gap-5">
      <BotonVolver fallback="/perfil" preferirHistorial={false} />
      <header className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-secondary uppercase">Beneficios</p>
          <h1 className="text-3xl font-extrabold">Recompensas</h1>
        </div>
        <span className="rounded-full bg-accent/25 px-3 py-1 font-extrabold">
          {usuario.monedas} monedas
        </span>
      </header>
      <p className="rounded-2xl bg-muted p-3 text-xs text-muted-foreground">
        Beneficios ilustrativos sujetos a futuros acuerdos comerciales.
      </p>
      <section>
        <h2 className="mb-2 font-extrabold">Mis beneficios</h2>
        {usuario.cupones.length > 0 ? (
          <ul className="grid gap-3">
            {usuario.cupones.map((cupon) => {
              const premio = obtenerPremio(cupon.premioId);
              return (
                <li key={cupon.id} className="card-duo p-4">
                  <p className="font-extrabold">{premio?.titulo}</p>
                  <p className="text-xs text-muted-foreground">
                    Código de beneficio · {cupon.usado ? "marcado como utilizado" : "disponible"}
                  </p>
                  <p className="mt-2 rounded-xl bg-muted p-2 text-center font-mono font-bold">
                    {cupon.codigo}
                  </p>
                  {!cupon.usado && (
                    <button
                      type="button"
                      className="btn-duo btn-duo-ghost mt-2"
                      onClick={() => usarCupon(cupon.id)}
                    >
                      Marcar como utilizado
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="card-duo p-5 text-center">
            <IconoPastilla nombre="regalo" tono="muted" className="mx-auto" />
            <p className="mt-2 font-extrabold">Tu vitrina está lista</p>
            <p className="text-sm text-muted-foreground">
              Jugá, completá requisitos y usá tus monedas para sumar tu primer beneficio.
            </p>
            <div className="mt-3 flex flex-col gap-2">
              <Link to="/jugar" className="btn-duo btn-duo-primary text-xs py-2.5">
                Ir a jugar para ganar monedas
              </Link>
            </div>
          </div>
        )}
      </section>
      <section>
        <h2 className="mb-2 font-extrabold">Catálogo pagado con monedas</h2>
        <ul className="grid gap-3">
          {premios.map((premio) => {
            const costo = premio.costoMonedas ?? premio.costoPuntos;
            const obtenido = usuario.cupones.some((c) => c.premioId === premio.id);
            const condicionCumplida = cumpleCondicion(premio, usuario);
            const alcanza = usuario.monedas >= costo && condicionCumplida;
            const auspiciador = obtenerAuspiciador(premio.auspiciadorId);
            const progreso = progresoCondicion(premio, usuario);
            return (
              <li key={premio.id} className="card-duo p-4">
                <div className="flex gap-3">
                  <IconoPastilla
                    nombre={auspiciador?.icono ?? "regalo"}
                    tono={alcanza ? "primary" : "muted"}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold">{premio.titulo}</p>
                    <p className="text-xs text-muted-foreground">
                      {auspiciador?.nombre} · {premio.detalle}
                    </p>
                    <p
                      className={`mt-1 text-xs font-bold ${condicionCumplida ? "text-primary" : "text-muted-foreground"}`}
                    >
                      {condicionCumplida ? "Requisito cumplido" : progreso.texto}
                    </p>
                    <div className="barra-duo mt-2 h-1.5">
                      <span
                        className="barra-duo-fill"
                        style={{ width: `${progreso.porcentaje}%` }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={!alcanza || obtenido}
                  onClick={() => guardarCupon(emitirCupon(premio, usuario.nombre), costo)}
                  className="btn-duo btn-duo-primary mt-3 disabled:opacity-50"
                >
                  {obtenido
                    ? "Ya está en tu inventario"
                    : !condicionCumplida
                      ? "Completá el requisito"
                      : alcanza
                        ? `Canjear por ${costo} monedas`
                        : `Faltan ${costo - usuario.monedas} monedas`}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
      <Link to="/partida" className="btn-duo btn-duo-ghost">
        <Icono nombre="rayo" />
        Ganar monedas jugando
      </Link>
    </Pantalla>
  );
}
