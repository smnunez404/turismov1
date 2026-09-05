import { Link, useRouterState } from "@tanstack/react-router";
import { Icono, type NombreIcono } from "@/components/Icono";

const items = [
  {
    to: "/jugar",
    etiqueta: "Jugar",
    icono: "rayo",
    rutas: ["/jugar", "/partida"],
  },
  { to: "/duelo", etiqueta: "Versus", icono: "duelo", rutas: ["/duelo"] },
  {
    to: "/temporadas",
    etiqueta: "Descubrir",
    icono: "mapa",
    rutas: ["/temporadas", "/mision", "/certificado"],
  },
  {
    to: "/ranking",
    etiqueta: "Ranking",
    icono: "ranking",
    rutas: ["/ranking", "/liga", "/equipos"],
  },
  {
    to: "/perfil",
    etiqueta: "Perfil",
    icono: "perfil",
    rutas: ["/perfil", "/avatar", "/recompensas", "/compartir"],
  },
] as const satisfies readonly {
  to: string;
  etiqueta: string;
  icono: NombreIcono;
  rutas: readonly string[];
}[];

export function BarraInferior() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-card pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-md sm:max-w-xl md:max-w-2xl lg:max-w-3xl grid-cols-5 px-2">
        {items.map((item) => {
          const activa = item.rutas.some(
            (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`),
          );
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={activa ? "page" : undefined}
                className={`flex min-h-14 flex-col sm:flex-row items-center justify-center gap-0.5 sm:gap-2 px-1 sm:px-3 text-[11px] sm:text-xs font-extrabold rounded-xl hover:bg-muted/60 transition-all ${
                  activa ? "text-primary font-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className={`rounded-xl p-1 sm:px-2 sm:py-1 transition-colors ${activa ? "bg-primary/15 text-primary" : ""}`}>
                  <Icono nombre={item.icono} className="h-5 w-5 shrink-0" />
                </span>
                <span className="truncate">{item.etiqueta}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
