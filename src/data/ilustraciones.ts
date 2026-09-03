// Manifiesto tipado de ilustraciones locales. Permite reemplazar assets sin reescribir pantallas.
import t1 from "@/assets/temporadas/t1.jpg";
import t2 from "@/assets/temporadas/t2.jpg";
import t3 from "@/assets/temporadas/t3.jpg";
import t4 from "@/assets/temporadas/t4.jpg";
import t5 from "@/assets/temporadas/t5.jpg";
import m1 from "@/assets/misiones/m1.jpg";
import m2 from "@/assets/misiones/m2.jpg";
import m3 from "@/assets/misiones/m3.jpg";
import m4 from "@/assets/misiones/m4.jpg";
import m5 from "@/assets/misiones/m5.jpg";
import anillos from "@/assets/album/anillos.svg";
import hospitalidad from "@/assets/album/hospitalidad.svg";
import majadito from "@/assets/album/majadito.svg";
import plaza from "@/assets/album/plaza.svg";
import toborochi from "@/assets/album/toborochi.svg";

export type RelacionIlustracion = "square" | "portrait" | "landscape";
export type TipoIlustracion = "hero" | "season" | "mission" | "album" | "scene" | "character";

export type Ilustracion = {
  src: string;
  alt: string;
  width: number;
  height: number;
  aspect: RelacionIlustracion;
  focalPoint: { x: number; y: number };
  kind: TipoIlustracion;
  decorative: boolean;
};

function ilustracion(
  src: string,
  alt: string,
  kind: TipoIlustracion,
  options: Partial<Omit<Ilustracion, "src" | "alt" | "kind">> = {},
): Ilustracion {
  return {
    src,
    alt,
    kind,
    width: options.width ?? 1024,
    height: options.height ?? 1024,
    aspect: options.aspect ?? "square",
    focalPoint: options.focalPoint ?? { x: 50, y: 50 },
    decorative: options.decorative ?? false,
  };
}

export const manifiestoIlustraciones = {
  temporadas: {
    t1: ilustracion(t1, "Santa Cruz tropical y su centro urbano", "season", {
      width: 1024,
      height: 576,
      aspect: "landscape",
      focalPoint: { x: 52, y: 45 },
    }),
    t2: ilustracion(t2, "Centro histórico y arquitectura cruceña", "season", {
      width: 1024,
      height: 576,
      aspect: "landscape",
    }),
    t3: ilustracion(t3, "Sabores e ingredientes de Santa Cruz", "season", {
      width: 1024,
      height: 576,
      aspect: "landscape",
    }),
    t4: ilustracion(t4, "Naturaleza y biodiversidad cruceña", "season", {
      width: 1024,
      height: 576,
      aspect: "landscape",
    }),
    t5: ilustracion(t5, "Tradiciones, carnaval y patrimonio cultural", "season", {
      width: 1024,
      height: 576,
      aspect: "landscape",
    }),
  },
  misiones: {
    m1: ilustracion(m1, "Escenario ilustrado de la misión uno", "mission", {
      width: 1024,
      height: 512,
      aspect: "landscape",
    }),
    m2: ilustracion(m2, "Escenario ilustrado de la misión dos", "mission", {
      width: 1024,
      height: 512,
      aspect: "landscape",
    }),
    m3: ilustracion(m3, "Escenario ilustrado de la misión tres", "mission", {
      width: 1024,
      height: 512,
      aspect: "landscape",
    }),
    m4: ilustracion(m4, "Escenario ilustrado de la misión cuatro", "mission", {
      width: 1024,
      height: 512,
      aspect: "landscape",
    }),
    m5: ilustracion(m5, "Escenario ilustrado de la misión cinco", "mission", {
      width: 1024,
      height: 512,
      aspect: "landscape",
    }),
  },
  album: {
    "album-anillos": ilustracion(anillos, "Estampa de los anillos cruceños", "album", {
      width: 640,
      height: 640,
    }),
    "album-toborochi": ilustracion(toborochi, "Estampa del toborochi", "album", {
      width: 640,
      height: 640,
    }),
    "album-majadito": ilustracion(majadito, "Estampa del majadito", "album", {
      width: 640,
      height: 640,
    }),
    "album-plaza": ilustracion(plaza, "Estampa de la plaza cruceña", "album", {
      width: 640,
      height: 640,
    }),
    "album-hospitalidad": ilustracion(hospitalidad, "Estampa de la hospitalidad cruceña", "album", {
      width: 640,
      height: 640,
    }),
  },
} as const;

// Adaptadores compatibles con las rutas vigentes. Las nuevas pantallas deben preferir el manifiesto.
export const ilustracionTemporada: Record<string, string> = Object.fromEntries(
  Object.entries(manifiestoIlustraciones.temporadas).map(([id, asset]) => [id, asset.src]),
);
export const ilustracionMision: Record<string, string> = Object.fromEntries(
  Object.entries(manifiestoIlustraciones.misiones).map(([id, asset]) => [id, asset.src]),
);
export const ilustracionAlbum: Record<string, string> = Object.fromEntries(
  Object.entries(manifiestoIlustraciones.album).map(([id, asset]) => [id, asset.src]),
);
