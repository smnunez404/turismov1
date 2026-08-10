// Navegación principal fija (menú inferior de 4 ítems).
import { Link } from "@tanstack/react-router";
import { Icono, type NombreIcono } from "@/components/Icono";

const items = [
  { to: "/temporadas", etiqueta: "Aprender", icono: "mapa" },
  { to: "/ranking", etiqueta: "Ranking", icono: "ranking" },
  { to: "/certificado", etiqueta: "Logros", icono: "medalla" },
  { to: "/perfil", etiqueta: "Perfil", icono: "perfil" },
] as const satisfies readonly { to: string; etiqueta: string; icono: NombreIcono }[];

export function BarraInferior() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-border bg-card pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4">
        {items.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-0.5 px-1 py-2.5 text-[11px] font-bold transition-colors"
            >
              <Icono nombre={item.icono} className="h-5.5 w-5.5" />
              {item.etiqueta}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
