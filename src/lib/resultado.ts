import type { UsuarioSesion } from "@/data/tipos";

export type EstadoPrevioResultado = {
  xp: number;
  monedas: number;
  puntosLiga: number;
  rachaDias: number;
  album: string[];
  inventarioAvatar: string[];
  insignias: string[];
};

export function capturarEstadoResultado(usuario: UsuarioSesion): EstadoPrevioResultado {
  return {
    xp: usuario.xp,
    monedas: usuario.monedas,
    puntosLiga: usuario.puntosLiga,
    rachaDias: usuario.racha.dias,
    album: [...usuario.album],
    inventarioAvatar: [...usuario.inventarioAvatar],
    insignias: [...usuario.insignias],
  };
}
