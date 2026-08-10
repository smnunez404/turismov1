// Avatar por capas dibujado en SVG (SPEC-32). Recolorable y nítido en cualquier tamaño.
import type { AvatarPersonalizado } from "@/data/tipos";

const tamanos = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-24 w-24",
  xl: "h-40 w-40",
} as const;

const TRAZO = "#241a12";

function Fondo({ id }: { id: string }) {
  if (id === "fondo-sol")
    return (
      <g>
        <circle cx="50" cy="50" r="50" fill="#FFE9A8" />
        <circle cx="50" cy="46" r="30" fill="#FFD35C" />
      </g>
    );
  if (id === "fondo-selva")
    return (
      <g>
        <circle cx="50" cy="50" r="50" fill="#CBEFC0" />
        <path d="M0 78 Q25 58 50 78 Q75 58 100 78 L100 100 L0 100Z" fill="#8FD98A" />
      </g>
    );
  if (id === "fondo-rayos")
    return (
      <g>
        <circle cx="50" cy="50" r="50" fill="#DCF3D2" />
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d="M50 50 L44 0 L56 0 Z"
            fill="#B7E6A6"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </g>
    );
  return <circle cx="50" cy="50" r="50" fill="#E9F5E2" />;
}

function Cuerpo({ id, piel }: { id: string; piel: string }) {
  const ancho = id === "cuerpo-delgado" ? 22 : id === "cuerpo-ancho" ? 34 : 28;
  return (
    <g>
      <rect x={50 - 7} y="54" width="14" height="12" rx="6" fill={piel} />
      <path
        d={`M${50 - ancho} 100 Q50 64 ${50 + ancho} 100 Z`}
        fill={piel}
        stroke={TRAZO}
        strokeWidth="2"
      />
    </g>
  );
}

function Prenda({ id, cuerpo }: { id: string; cuerpo: string }) {
  const ancho = cuerpo === "cuerpo-delgado" ? 22 : cuerpo === "cuerpo-ancho" ? 34 : 28;
  const base = `M${50 - ancho} 100 Q50 66 ${50 + ancho} 100 Z`;
  const colores: Record<string, string> = {
    "prenda-tipoy": "#FFFFFF",
    "prenda-lino": "#EAF2FF",
    "prenda-bordada": "#FFF3D6",
    "prenda-polera": "#2FA84F",
    "prenda-guayabera": "#F5F0E1",
    "prenda-aguayo": "#C2402F",
    "prenda-pollera": "#E56B9F",
  };
  const color = colores[id] ?? "#FFFFFF";
  return (
    <g>
      <path d={base} fill={color} stroke={TRAZO} strokeWidth="2" />
      {id === "prenda-tipoy" && (
        <g stroke="#E0554E" strokeWidth="2" fill="none">
          <path d={`M${50 - ancho + 6} 94 Q50 78 ${50 + ancho - 6} 96`} />
          <path d={`M${50 - ancho + 10} 98 Q50 84 ${50 + ancho - 10} 100`} stroke="#F2A93B" />
        </g>
      )}
      {id === "prenda-bordada" && (
        <g fill="#E0554E">
          <circle cx="42" cy="84" r="2" />
          <circle cx="50" cy="81" r="2" />
          <circle cx="58" cy="84" r="2" />
        </g>
      )}
      {id === "prenda-lino" && (
        <path d="M50 68 L50 100" stroke={TRAZO} strokeWidth="1.5" opacity="0.5" />
      )}
      {id === "prenda-guayabera" && (
        <g stroke={TRAZO} strokeWidth="1.2" opacity="0.6" fill="none">
          <path d="M44 72 L44 100" />
          <path d="M56 72 L56 100" />
        </g>
      )}
    </g>
  );
}

function Cabeza({ piel }: { piel: string }) {
  return (
    <g>
      <ellipse cx="50" cy="38" rx="22" ry="24" fill={piel} stroke={TRAZO} strokeWidth="2" />
      <ellipse cx="28" cy="40" rx="4" ry="5" fill={piel} stroke={TRAZO} strokeWidth="2" />
      <ellipse cx="72" cy="40" rx="4" ry="5" fill={piel} stroke={TRAZO} strokeWidth="2" />
    </g>
  );
}

function Rostro({ id }: { id: string }) {
  const ojos =
    id === "cara-picara" ? (
      <g stroke={TRAZO} strokeWidth="2.5" strokeLinecap="round" fill="none">
        <path d="M37 40 Q41 36 45 40" />
        <circle cx="60" cy="40" r="2.6" fill={TRAZO} stroke="none" />
      </g>
    ) : id === "cara-sorprendida" ? (
      <g fill="#fff" stroke={TRAZO} strokeWidth="2">
        <circle cx="41" cy="40" r="4" />
        <circle cx="59" cy="40" r="4" />
        <circle cx="41" cy="40" r="1.6" fill={TRAZO} stroke="none" />
        <circle cx="59" cy="40" r="1.6" fill={TRAZO} stroke="none" />
      </g>
    ) : id === "cara-decidida" ? (
      <g stroke={TRAZO} strokeWidth="2.5" strokeLinecap="round">
        <path d="M35 34 L46 37" />
        <path d="M65 34 L54 37" />
        <circle cx="41" cy="41" r="2.6" fill={TRAZO} stroke="none" />
        <circle cx="59" cy="41" r="2.6" fill={TRAZO} stroke="none" />
      </g>
    ) : (
      <g fill={TRAZO}>
        <circle cx="41" cy="40" r="2.8" />
        <circle cx="59" cy="40" r="2.8" />
      </g>
    );

  const boca =
    id === "cara-serena" ? (
      <path d="M44 52 L56 52" stroke={TRAZO} strokeWidth="2.5" strokeLinecap="round" />
    ) : id === "cara-sorprendida" ? (
      <ellipse cx="50" cy="53" rx="4" ry="5" fill={TRAZO} />
    ) : id === "cara-picara" ? (
      <path d="M43 51 Q50 58 58 50" stroke={TRAZO} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    ) : (
      <path d="M42 50 Q50 59 58 50" stroke={TRAZO} strokeWidth="2.5" fill="none" strokeLinecap="round" />
    );

  return (
    <g>
      {ojos}
      {boca}
      {(id === "cara-alegre" || id === "cara-picara") && (
        <g fill="#F2867B" opacity="0.6">
          <circle cx="33" cy="49" r="4" />
          <circle cx="67" cy="49" r="4" />
        </g>
      )}
    </g>
  );
}

function Cabello({ id, color }: { id: string; color: string }) {
  if (id === "pelo-ninguno") return null;
  const comun = { fill: color, stroke: TRAZO, strokeWidth: 2 };
  if (id === "pelo-corto")
    return <path d="M27 40 Q28 17 50 17 Q72 17 73 40 Q68 27 50 27 Q32 27 27 40 Z" {...comun} />;
  if (id === "pelo-ondulado")
    return (
      <path
        d="M27 42 Q26 16 50 16 Q74 16 73 42 Q70 30 62 31 Q55 24 46 30 Q35 27 27 42 Z"
        {...comun}
      />
    );
  if (id === "pelo-largo")
    return (
      <path
        d="M26 44 Q24 15 50 15 Q76 15 74 44 L74 72 Q68 60 68 40 Q60 28 50 28 Q40 28 32 40 Q32 60 26 72 Z"
        {...comun}
      />
    );
  if (id === "pelo-recogido")
    return (
      <g {...comun}>
        <path d="M27 40 Q28 16 50 16 Q72 16 73 40 Q66 26 50 26 Q34 26 27 40 Z" />
        <circle cx="50" cy="13" r="8" />
      </g>
    );
  if (id === "pelo-rizado")
    return (
      <g {...comun}>
        <circle cx="34" cy="26" r="9" />
        <circle cx="50" cy="19" r="10" />
        <circle cx="66" cy="26" r="9" />
      </g>
    );
  if (id === "pelo-trenzas")
    return (
      <g {...comun}>
        <path d="M27 40 Q28 16 50 16 Q72 16 73 40 Q66 26 50 26 Q34 26 27 40 Z" />
        <rect x="20" y="42" width="8" height="30" rx="4" />
        <rect x="72" y="42" width="8" height="30" rx="4" />
      </g>
    );
  return null;
}

function Vello({ id, color }: { id: string; color: string }) {
  if (id === "vello-bigote")
    return <path d="M41 48 Q50 44 59 48 Q50 51 41 48 Z" fill={color} stroke={TRAZO} strokeWidth="1.5" />;
  if (id === "vello-candado")
    return (
      <g fill={color} stroke={TRAZO} strokeWidth="1.5">
        <path d="M41 47 Q50 43 59 47 Q50 50 41 47 Z" />
        <rect x="46" y="56" width="8" height="7" rx="3" />
      </g>
    );
  if (id === "vello-barba")
    return (
      <path
        d="M28 45 Q30 68 50 68 Q70 68 72 45 Q66 60 50 60 Q34 60 28 45 Z"
        fill={color}
        stroke={TRAZO}
        strokeWidth="2"
      />
    );
  return null;
}

function Sombrero({ id }: { id: string }) {
  if (id === "sombrero-sao")
    return (
      <g stroke={TRAZO} strokeWidth="2">
        <ellipse cx="50" cy="22" rx="36" ry="8" fill="#F0D08A" />
        <path d="M34 22 Q34 6 50 6 Q66 6 66 22 Z" fill="#E8C273" />
        <path d="M34 20 Q50 25 66 20" fill="none" stroke="#B98E3F" />
      </g>
    );
  if (id === "sombrero-camba")
    return (
      <g stroke={TRAZO} strokeWidth="2">
        <ellipse cx="50" cy="23" rx="33" ry="7" fill="#F7EFE0" />
        <path d="M35 23 Q35 8 50 8 Q65 8 65 23 Z" fill="#F2E5CE" />
        <path d="M35 21 Q50 26 65 21" fill="none" stroke="#2FA84F" strokeWidth="3" />
      </g>
    );
  if (id === "sombrero-gorra")
    return (
      <g stroke={TRAZO} strokeWidth="2">
        <path d="M28 26 Q28 8 50 8 Q72 8 72 26 Z" fill="#2FA84F" />
        <path d="M28 26 L14 30 Q26 34 44 30 Z" fill="#238A3F" />
      </g>
    );
  if (id === "sombrero-panuelo")
    return (
      <path
        d="M36 66 Q50 78 64 66 Q50 74 36 66 Z"
        fill="#E0554E"
        stroke={TRAZO}
        strokeWidth="2"
      />
    );
  return null;
}

function Accesorio({ id }: { id: string }) {
  if (id === "acc-semillas")
    return (
      <g fill="#8A5A2B" stroke={TRAZO} strokeWidth="1">
        {[38, 44, 50, 56, 62].map((x, i) => (
          <circle key={x} cx={x} cy={72 + (i === 2 ? 3 : i === 1 || i === 3 ? 2 : 0)} r="2.6" />
        ))}
      </g>
    );
  if (id === "acc-lentes")
    return (
      <g stroke={TRAZO} strokeWidth="2" fill="#2B3440">
        <rect x="33" y="35" width="14" height="10" rx="4" />
        <rect x="53" y="35" width="14" height="10" rx="4" />
        <path d="M47 40 L53 40" fill="none" />
      </g>
    );
  if (id === "acc-aretes")
    return (
      <g fill="#F2A93B" stroke={TRAZO} strokeWidth="1.2">
        <circle cx="27" cy="52" r="3.4" />
        <circle cx="73" cy="52" r="3.4" />
      </g>
    );
  if (id === "acc-guitarra")
    return (
      <g stroke={TRAZO} strokeWidth="2">
        <ellipse cx="72" cy="86" rx="12" ry="14" fill="#C97B36" />
        <circle cx="72" cy="86" r="4" fill="#7A4A1C" />
        <rect x="69" y="58" width="6" height="18" rx="2" fill="#7A4A1C" />
      </g>
    );
  return null;
}

export function AvatarLienzo({
  avatar,
  tamano = "md",
  className = "",
}: {
  avatar: AvatarPersonalizado;
  tamano?: keyof typeof tamanos;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label="Avatar personalizado"
      className={`${tamanos[tamano]} shrink-0 overflow-hidden rounded-full ring-1 ring-border ${className}`}
    >
      <Fondo id={avatar.fondo} />
      <Cuerpo id={avatar.cuerpo} piel={avatar.tonoPiel} />
      <Prenda id={avatar.prenda} cuerpo={avatar.cuerpo} />
      <Accesorio id={avatar.accesorio === "acc-semillas" ? "acc-semillas" : ""} />
      <Cabeza piel={avatar.tonoPiel} />
      <Cabello id={avatar.cabello} color={avatar.colorPelo} />
      <Rostro id={avatar.cara} />
      <Vello id={avatar.vello} color={avatar.colorPelo} />
      {avatar.accesorio !== "acc-semillas" && <Accesorio id={avatar.accesorio} />}
      <Sombrero id={avatar.sombrero} />
    </svg>
  );
}
