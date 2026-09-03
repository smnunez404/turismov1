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
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {items.map((item) => {
          const activa = item.rutas.some(
            (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`),
          );
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                aria-current={activa ? "page" : undefined}
                className={`flex min-h-14 flex-col items-center justify-center gap-0.5 px-1 text-[11px] font-bold transition-colors ${activa ? "text-primary" : "text-muted-foreground"}`}
              >
                <span className={`rounded-xl px-3 py-0.5 ${activa ? "bg-primary/12" : ""}`}>
                  <Icono nombre={item.icono} className="h-5 w-5" />
                </span>
                {item.etiqueta}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
