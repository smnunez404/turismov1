import type { CSSProperties } from "react";
import type { AvatarPersonalizado, CategoriaPieza } from "@/data/tipos";

export type EncuadreAvatar = "retrato" | "cuerpo";

const tamanos = {
  retrato: { sm: "size-10", md: "size-16", lg: "size-24", xl: "size-40" },
  cuerpo: { sm: "h-14 w-11", md: "h-24 w-[4.75rem]", lg: "h-36 w-28", xl: "h-56 w-44" },
} as const;

const fondos: Record<string, CSSProperties> = {
  "fondo-liso": { background: "linear-gradient(155deg, #26361a, #3f542c)" },
  "fondo-sol": {
    background: "radial-gradient(circle at 50% 37%, #8a8538 0, #596126 38%, #26361a 78%)",
  },
  "fondo-selva": {
    background: "radial-gradient(circle at 50% 35%, #39805c 0, #245b45 36%, #183e30 78%)",
  },
  "fondo-rayos": {
    background: "radial-gradient(circle at 50% 35%, #84a451 0, #405f2b 38%, #24371c 76%)",
  },
};

const prendas: Record<string, string> = {
  "prenda-tipoy": "/avatars/2-5d/prenda/prenda-tipoy-femenino.png",
  "prenda-lino": "/avatars/2-5d/prenda/prenda-lino-ajustada.png",
  "prenda-bordada": "/avatars/2-5d/prenda/prenda-blusa-campo.png",
  "prenda-polera": "/avatars/2-5d/prenda/prenda-polera-ajustada.png",
  "prenda-guayabera": "/avatars/2-5d/prenda/prenda-guayabera-ajustada.png",
  "prenda-chaqueta-femenina": "/avatars/2-5d/prenda/prenda-chaqueta-femenina.png?v=2",
  "prenda-blusa-campo": "/avatars/2-5d/prenda/prenda-blusa-campo.png",
  "prenda-chaqueta-campo": "/avatars/2-5d/prenda/prenda-chaqueta-campo.png",
  "prenda-camiseta-ruta": "/avatars/2-5d/prenda/prenda-camiseta-ruta.png",
  "prenda-camisa-verde-femenina": "/avatars/2-5d/prenda/prenda-camisa-verde-femenina.png",
};

const prendasFemeninasGeneradas = new Set([
  "prenda-tipoy",
  "prenda-bordada",
  "prenda-chaqueta-femenina",
  "prenda-blusa-campo",
]);

const ajustesPrenda: Record<string, string> = {
  "prenda-tipoy": "scale-x-[0.5] scale-y-[0.48] -translate-y-[7%]",
  "prenda-bordada": "scale-x-[0.5] scale-y-[0.44] -translate-y-[11%]",
  "prenda-chaqueta-femenina": "scale-x-[0.62] scale-y-[0.58] -translate-y-[8%]",
  "prenda-blusa-campo": "scale-x-[0.5] scale-y-[0.44] -translate-y-[11%]",
  "prenda-lino": "scale-[0.46] -translate-y-[5%]",
  "prenda-polera": "scale-[0.46] -translate-y-[5%]",
  "prenda-guayabera": "scale-[0.46] -translate-y-[5%]",
  "prenda-chaqueta-campo": "scale-[0.43] -translate-y-[3%]",
  "prenda-camiseta-ruta": "scale-[0.44] -translate-y-[4%]",
  "prenda-camisa-verde-femenina": "scale-[0.45] -translate-y-[3%]",
};

const cabellos: Record<string, string | undefined> = {
  "pelo-ninguno": undefined,
  "pelo-corto": "/avatars/2-5d/cabello/pelo-corto.png",
  "pelo-ondulado": "/avatars/2-5d/cabello/pelo-ondulado.png",
  "pelo-largo": "/avatars/2-5d/cabello/pelo-largo.png",
  "pelo-recogido": "/avatars/2-5d/cabello/pelo-recogido.png",
  "pelo-rizado": "/avatars/2-5d/cabello/pelo-rizado.png",
  "pelo-trenzas": "/avatars/2-5d/cabello/pelo-trenzas.png",
  "pelo-degradado": "/avatars/2-5d/cabello/pelo-degradado-v3.png",
  "pelo-ondulado-corto": "/avatars/2-5d/cabello/pelo-ondulado-corto-v3.png",
  "pelo-rizado-corto": "/avatars/2-5d/cabello/pelo-rizado-corto-v3.png",
};

const vellos: Record<string, string | undefined> = {
  "vello-ninguno": undefined,
  "vello-barba": "/avatars/2-5d/vello/vello-barba-v3.png",
  "vello-bigote": "/avatars/2-5d/vello/vello-bigote-v3.png",
  "vello-candado": "/avatars/2-5d/vello/vello-candado-v3.png",
};

const sombreros: Record<string, string | undefined> = {
  "sombrero-ninguno": undefined,
  "sombrero-sao": "/avatars/2-5d/sombrero/sombrero-sao.png",
  "sombrero-camba": "/avatars/2-5d/sombrero/sombrero-sao.png",
  "sombrero-gorra": "/avatars/2-5d/sombrero/sombrero-gorra.png",
  "sombrero-safari": "/avatars/2-5d/sombrero/sombrero-safari.png",
  "sombrero-tejido": "/avatars/2-5d/sombrero/sombrero-tejido.png",
  "sombrero-bucket": "/avatars/2-5d/sombrero/sombrero-bucket.png",
};

const accesorios: Record<string, string | undefined> = {
  "acc-ninguno": undefined,
  "acc-lentes": "/avatars/2-5d/accesorio/acc-lentes.png",
  "acc-aretes": "/avatars/2-5d/accesorio/acc-aretes-femeninos.png",
  "acc-panuelo": "/avatars/2-5d/accesorio/acc-panuelo.png",
  "acc-brujula": "/avatars/2-5d/accesorio/acc-brujula.png",
  "acc-panuelo-verde": "/avatars/2-5d/accesorio/acc-panuelo-verde.png",
  "acc-camara": "/avatars/2-5d/accesorio/acc-camara.png",
};

const mochilas: Record<string, string | undefined> = {
  "mochila-ninguna": undefined,
  "mochila-coral": "/avatars/2-5d/mochila/mochila-coral.png",
  "mochila-verde": "/avatars/2-5d/mochila/mochila-coral.png",
  "mochila-mostaza": "/avatars/2-5d/mochila/mochila-coral.png",
};

const filtroMochila: Record<string, string> = {
  "mochila-verde": "hue-rotate-[75deg] saturate-75",
  "mochila-mostaza": "hue-rotate-[315deg] saturate-125",
};

const ajustesCabelloMasculino: Record<string, string> = {
  "pelo-degradado": "scale-[0.42] -translate-y-[29%]",
  "pelo-ondulado-corto": "scale-[0.42] -translate-y-[29%]",
  "pelo-rizado-corto": "scale-[0.42] -translate-y-[29%]",
};

const ajustesCabelloFemenino: Record<string, string> = {
  "pelo-ondulado": "scale-[0.3] -translate-y-[35%]",
  "pelo-largo": "scale-[0.3] -translate-y-[35%]",
  "pelo-recogido": "scale-[0.3] -translate-y-[35%]",
  "pelo-rizado": "scale-[0.3] -translate-y-[35%]",
  "pelo-trenzas": "scale-[0.3] -translate-y-[35%]",
};

const ajustesVello: Record<string, string> = {
  "vello-bigote": "scale-[0.055] -translate-y-[26%]",
  "vello-candado": "scale-[0.12] -translate-y-[24%]",
  "vello-barba": "scale-[0.13] -translate-y-[24%]",
};

const ajustesSombreroMasculino: Record<string, string> = {
  "sombrero-safari": "scale-[0.34] -translate-y-[34%]",
  "sombrero-tejido": "scale-[0.34] -translate-y-[34%]",
  "sombrero-bucket": "scale-[0.33] -translate-y-[35%]",
};

const ajustesSombreroFemenino: Record<string, string> = {
  "sombrero-sao": "scale-[0.25] -translate-y-[39%]",
  "sombrero-gorra": "scale-[0.23] -translate-y-[39%]",
  "sombrero-safari": "scale-[0.3] -translate-y-[36%]",
  "sombrero-tejido": "scale-[0.3] -translate-y-[36%]",
  "sombrero-bucket": "scale-[0.29] -translate-y-[37%]",
};

const ajustesAccesorioMasculino: Record<string, string> = {
  "acc-lentes": "scale-[0.18] -translate-y-[28%]",
  "acc-panuelo": "scale-[0.18] -translate-y-[12%]",
  "acc-brujula": "scale-[0.2] -translate-y-[5%]",
  "acc-panuelo-verde": "scale-[0.21] -translate-y-[12%]",
  "acc-camara": "scale-[0.22] translate-y-[1%]",
};

const ajustesAccesorioFemenino: Record<string, string> = {
  "acc-aretes": "scale-[0.065] -translate-y-[30%]",
};

function Capa({
  src,
  className,
  style,
}: {
  src: string | undefined;
  className: string;
  style?: CSSProperties;
}) {
  if (!src) return null;
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={className}
      style={style}
    />
  );
}

function MascaraColor({
  src,
  color,
  className,
}: {
  src: string | undefined;
  color: string;
  className: string;
}) {
  if (!src) return null;
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 size-full ${className}`}
      style={{
        backgroundColor: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

export function AvatarPiezaMiniatura({
  avatar,
  categoria,
  piezaId,
}: {
  avatar: AvatarPersonalizado;
  categoria: CategoriaPieza;
  piezaId: string;
}) {
  if (categoria === "fondo") {
    return (
      <span
        aria-hidden="true"
        className="block size-full"
        style={fondos[piezaId] ?? fondos["fondo-liso"]}
      />
    );
  }

  const avatarConPieza = { ...avatar, [categoria]: piezaId };

  return (
    <span className="relative block size-full overflow-hidden" aria-hidden="true">
      <AvatarLienzo
        avatar={avatarConPieza}
        encuadre="cuerpo"
        tamano="xl"
        className="size-full rounded-none border-0 ring-0"
      />
    </span>
  );
}

export function AvatarLienzo({
  avatar,
  tamano = "md",
  encuadre = "retrato",
  className = "",
}: {
  avatar: AvatarPersonalizado;
  tamano?: keyof typeof tamanos.retrato;
  encuadre?: EncuadreAvatar;
  className?: string;
}) {
  const cuerpo = encuadre === "cuerpo";
  const femenina = avatar.presentacion === "femenina";
  const cuerpoSrc = femenina
    ? "/avatars/2-5d/base/cuerpo-femenino.png"
    : "/avatars/2-5d/base/cuerpo-medio.png";
  const cabelloSrc = cabellos[avatar.cabello];
  const ajustePrenda = ajustesPrenda[avatar.prenda] ?? "scale-[0.4] -translate-y-[4%]";
  const ajusteCabello = femenina
    ? (ajustesCabelloFemenino[avatar.cabello] ?? "scale-[0.4] -translate-y-[28%]")
    : (ajustesCabelloMasculino[avatar.cabello] ?? "scale-[0.34] -translate-y-[29%]");
  const ajusteVello = ajustesVello[avatar.vello] ?? "scale-[0.17] -translate-y-[25%]";
  const ajusteMochila = femenina
    ? "scale-[0.28] translate-y-[4%]"
    : "scale-[0.32] translate-y-[5%]";
  const ajusteSombrero = femenina
    ? (ajustesSombreroFemenino[avatar.sombrero] ?? "scale-[0.23] -translate-y-[39%]")
    : (ajustesSombreroMasculino[avatar.sombrero] ?? "scale-[0.25] -translate-y-[40%]");
  const ajusteAccesorio = femenina
    ? (ajustesAccesorioFemenino[avatar.accesorio] ?? "scale-[0.16] -translate-y-[28%]")
    : (ajustesAccesorioMasculino[avatar.accesorio] ?? "scale-[0.18] -translate-y-[28%]");
  const pielBase = "#DDA671";
  const cambiaPiel = avatar.tonoPiel !== pielBase;
  const cambiaCabello = avatar.colorPelo !== "#1E1913";

  return (
    <div
      role="img"
      aria-label="Explorador personalizable con acabado 2.5D cinematográfico"
      className={`${tamanos[encuadre][tamano]} relative shrink-0 overflow-hidden ${cuerpo ? "rounded-[1.75rem]" : "rounded-full"} ring-1 ring-border ${className}`}
      style={fondos[avatar.fondo] ?? fondos["fondo-liso"]}
    >
      <div
        className={`absolute aspect-square ${cuerpo ? "left-1/2 bottom-0 h-full w-auto -translate-x-1/2 origin-bottom" : "left-1/2 top-0 w-[280%] -translate-x-1/2 translate-y-[-2%]"}`}
      >
        <Capa
          src={mochilas[avatar.mochila]}
          className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-xl ${ajusteMochila} ${filtroMochila[avatar.mochila] ?? ""}`}
        />
        {femenina && (
          <>
            <Capa
              src={cabelloSrc}
              className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-lg ${ajusteCabello}`}
            />
            {cambiaCabello && (
              <MascaraColor
                src={cabelloSrc}
                color={avatar.colorPelo}
                className={`${ajusteCabello} mix-blend-color opacity-80`}
              />
            )}
          </>
        )}
        <Capa
          src={cuerpoSrc}
          className={`pointer-events-none absolute inset-0 size-full origin-bottom object-contain drop-shadow-xl ${femenina ? "scale-[1.055]" : ""}`}
        />
        {cambiaPiel && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 origin-bottom mix-blend-color ${femenina ? "scale-[1.055]" : ""}`}
          >
            <span
              className="absolute left-[40.5%] top-[15.5%] h-[20%] w-[19%] rounded-[45%]"
              style={{ backgroundColor: avatar.tonoPiel }}
            />
            <span
              className="absolute left-[34.5%] top-[39%] h-[29%] w-[7%] rotate-6 rounded-full"
              style={{ backgroundColor: avatar.tonoPiel }}
            />
            <span
              className="absolute right-[34.5%] top-[39%] h-[29%] w-[7%] -rotate-6 rounded-full"
              style={{ backgroundColor: avatar.tonoPiel }}
            />
          </div>
        )}
        <Capa
          src={prendas[avatar.prenda]}
          className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-lg ${ajustePrenda} ${femenina && !prendasFemeninasGeneradas.has(avatar.prenda) ? "scale-x-[0.9]" : ""}`}
        />
        {!femenina && (
          <Capa
            src={cabelloSrc}
            className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-lg ${ajusteCabello}`}
          />
        )}
        {femenina && (
          <Capa
            src={cabelloSrc}
            className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-lg [clip-path:inset(0_0_67%_0)] ${ajusteCabello}`}
          />
        )}
        {cambiaCabello && !femenina && (
          <MascaraColor
            src={cabelloSrc}
            color={avatar.colorPelo}
            className={`${ajusteCabello} mix-blend-color opacity-80`}
          />
        )}
        {cambiaCabello && femenina && (
          <MascaraColor
            src={cabelloSrc}
            color={avatar.colorPelo}
            className={`${ajusteCabello} [clip-path:inset(0_0_67%_0)] mix-blend-color opacity-80`}
          />
        )}
        <Capa
          src={vellos[avatar.vello]}
          className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-md ${ajusteVello}`}
        />
        <Capa
          src={accesorios[avatar.accesorio]}
          className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-md ${ajusteAccesorio}`}
        />
        <Capa
          src={sombreros[avatar.sombrero]}
          className={`pointer-events-none absolute inset-0 size-full object-contain drop-shadow-lg ${ajusteSombrero}`}
        />
      </div>
    </div>
  );
}
