// Estado de sesión exclusivamente en memoria. Un reducer aplica las reglas de dominio e idempotencia.
import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import type { AvatarPersonalizado, Cupon, ResumenPartida, UsuarioSesion } from "@/data/tipos";
import { avatarPorDefecto, normalizarAvatar, piezasAvatar } from "@/data/avatar-piezas";
import {
  ALBUM_RECOMPENSA_ID,
  INSIGNIA_PRIMERA_PARTIDA,
  albumSantaCruz,
  obtenerCosmeticoAvatar,
} from "@/data/coleccion";
import { limpiarEventosDeSesion, registrarEvento } from "@/features/analytics/memory";

const base: UsuarioSesion = {
  nombre: "",
  correo: "",
  avatarId: null,
  avatar: null,
  puntos: 0,
  xp: 0,
  monedas: 25,
  esInvitado: true,
  insignias: [],
  progreso: {},
  progresoJuego: { desafios: {}, partidas: 0, versus: 0, retoDiarioFecha: null },
  album: [],
  inventarioAvatar: [],
  recompensasAplicadas: [],
  partidasIniciadas: [],
  tutorialVisto: false,
  vidas: 3,
  racha: { dias: 0, mejorRacha: 0, preguntaDelDiaHecha: false },
  puntosLiga: 0,
  medallas: {},
  equipoId: null,
  cupones: [],
  duelosGanados: 0,
};

const sesionDemo: UsuarioSesion = {
  ...base,
  nombre: "Camila",
  correo: "camila@soyembajador.bo",
  esInvitado: false,
  avatarId: "tipoy",
  avatar: {
    ...avatarPorDefecto,
    cabello: "pelo-largo",
    prenda: "prenda-tipoy",
    accesorio: "acc-aretes",
  },
  puntos: 145,
  xp: 145,
  monedas: 110,
  insignias: ["i-origenes", "i-corazon", INSIGNIA_PRIMERA_PARTIDA],
  progreso: {
    m1: { completada: true, puntos: 80, aciertos: 8, ultimoDelta: 80 },
    m2: { completada: true, puntos: 65, aciertos: 7, ultimoDelta: 65 },
  },
  progresoJuego: { desafios: {}, partidas: 4, versus: 1, retoDiarioFecha: null },
  album: ["album-anillos", "album-toborochi"],
  inventarioAvatar: ["fondo-rayos", "prenda-guayabera", "sombrero-camba"],
  tutorialVisto: true,
  racha: { dias: 5, mejorRacha: 9, preguntaDelDiaHecha: false },
  puntosLiga: 180,
  medallas: { historia: 5, gastronomia: 3, naturaleza: 2 },
  equipoId: "e-centro",
  duelosGanados: 3,
};

type Accion =
  | { tipo: "ACTUALIZAR"; cambios: Partial<UsuarioSesion> }
  | { tipo: "AVATAR"; cambios: Partial<AvatarPersonalizado> }
  | { tipo: "CONFIGURAR_INVITADO"; nombre: string; avatar: AvatarPersonalizado }
  | { tipo: "INICIAR_PARTIDA"; id: string; riesgo: boolean }
  | { tipo: "FINALIZAR_PARTIDA"; resumen: ResumenPartida }
  | { tipo: "LEGACY_PARTIDA"; id: string; categoriaId: string; aciertos: number; puntos: number }
  | { tipo: "RECARGAR_VIDAS"; cantidad: number }
  | { tipo: "COMPRAR_COSMETICO"; id: string }
  | { tipo: "CANJEAR"; cupon: Cupon; costo: number }
  | { tipo: "USAR_CUPON"; id: string }
  | { tipo: "DEMO" }
  | { tipo: "REINICIAR" };

function recompensasDeProgreso(usuario: UsuarioSesion) {
  const inventario = new Set(usuario.inventarioAvatar);
  if (usuario.progresoJuego.partidas >= 1) inventario.add("fondo-rayos");
  if (usuario.xp >= 60) inventario.add("prenda-guayabera");
  if (usuario.progresoJuego.retoDiarioFecha) inventario.add("pelo-trenzas");
  if (usuario.progresoJuego.versus >= 1) inventario.add("sombrero-camba");
  if (usuario.album.length === albumSantaCruz.length) inventario.add("acc-guitarra");
  return [...inventario];
}

function finalizar(usuario: UsuarioSesion, resumen: ResumenPartida): UsuarioSesion {
  const recompensaId = `partida:${resumen.id}`;
  if (usuario.recompensasAplicadas.includes(recompensaId)) return usuario;
  const album = [
    ...new Set([...usuario.album, ...resumen.coleccionables, "album-hospitalidad"]),
  ].filter((id) => albumSantaCruz.some((item) => item.id === id));
  const completaAlbum = album.length === albumSantaCruz.length;
  const premioAlbum = completaAlbum && !usuario.recompensasAplicadas.includes(ALBUM_RECOMPENSA_ID);
  const xp = usuario.xp + resumen.xp + (premioAlbum ? 40 : 0);
  const monedas = usuario.monedas + resumen.monedas + (premioAlbum ? 25 : 0);
  const retoNuevo =
    resumen.modo === "diario" && usuario.progresoJuego.retoDiarioFecha !== resumen.fechaDiaria;
  const dias = retoNuevo ? usuario.racha.dias + 1 : usuario.racha.dias;
  const desafios = { ...usuario.progresoJuego.desafios, ...resumen.resultados };
  const siguiente: UsuarioSesion = {
    ...usuario,
    xp,
    puntos: xp,
    monedas,
    album,
    insignias: [...new Set([...usuario.insignias, INSIGNIA_PRIMERA_PARTIDA])],
    recompensasAplicadas: [
      ...usuario.recompensasAplicadas,
      recompensaId,
      ...(premioAlbum ? [ALBUM_RECOMPENSA_ID] : []),
    ],
    puntosLiga: usuario.puntosLiga + resumen.puntosLiga,
    duelosGanados: usuario.duelosGanados + (resumen.ganoVersus ? 1 : 0),
    progresoJuego: {
      desafios,
      partidas: usuario.progresoJuego.partidas + 1,
      versus: usuario.progresoJuego.versus + (resumen.modo === "versus" ? 1 : 0),
      retoDiarioFecha:
        resumen.modo === "diario"
          ? (resumen.fechaDiaria ?? null)
          : usuario.progresoJuego.retoDiarioFecha,
    },
    racha: retoNuevo
      ? { dias, mejorRacha: Math.max(usuario.racha.mejorRacha, dias), preguntaDelDiaHecha: true }
      : usuario.racha,
  };
  return { ...siguiente, inventarioAvatar: recompensasDeProgreso(siguiente) };
}

function finalizarRuleta(
  usuario: UsuarioSesion,
  accion: Extract<Accion, { tipo: "LEGACY_PARTIDA" }>,
): UsuarioSesion {
  const recompensaId = `partida:${accion.id}`;
  if (usuario.recompensasAplicadas.includes(recompensaId)) return usuario;
  const xp = usuario.xp + accion.puntos;
  const album = [...new Set([...usuario.album, "album-hospitalidad"])];
  const siguiente: UsuarioSesion = {
    ...usuario,
    xp,
    puntos: xp,
    monedas: usuario.monedas + 5 + accion.aciertos,
    album,
    insignias: [...new Set([...usuario.insignias, INSIGNIA_PRIMERA_PARTIDA])],
    recompensasAplicadas: [...usuario.recompensasAplicadas, recompensaId],
    puntosLiga: usuario.puntosLiga + accion.puntos,
    progresoJuego: {
      ...usuario.progresoJuego,
      partidas: usuario.progresoJuego.partidas + 1,
    },
    medallas: {
      ...usuario.medallas,
      [accion.categoriaId]: (usuario.medallas[accion.categoriaId] ?? 0) + accion.aciertos,
    },
  };
  return { ...siguiente, inventarioAvatar: recompensasDeProgreso(siguiente) };
}

function compraCosmeticoDisponible(usuario: UsuarioSesion, id: string) {
  const cosmetico = obtenerCosmeticoAvatar(id);
  const pieza = piezasAvatar.find((item) => item.id === id);
  if (
    !cosmetico ||
    !pieza ||
    pieza.bloqueada ||
    usuario.inventarioAvatar.includes(cosmetico.id) ||
    usuario.monedas < cosmetico.precioMonedas
  )
    return null;
  return cosmetico;
}

function reducer(usuario: UsuarioSesion, accion: Accion): UsuarioSesion {
  switch (accion.tipo) {
    case "ACTUALIZAR": {
      const cambios = accion.cambios;
      const xp = cambios.xp ?? cambios.puntos ?? usuario.xp;
      return { ...usuario, ...cambios, xp, puntos: xp };
    }
    case "AVATAR":
      return { ...usuario, avatar: normalizarAvatar({ ...usuario.avatar, ...accion.cambios }) };
    case "CONFIGURAR_INVITADO":
      return {
        ...usuario,
        nombre: accion.nombre || "Curioso",
        avatar: normalizarAvatar(accion.avatar),
        esInvitado: true,
      };
    case "INICIAR_PARTIDA":
      if (usuario.partidasIniciadas.includes(accion.id)) return usuario;
      return {
        ...usuario,
        vidas: accion.riesgo ? Math.max(0, usuario.vidas - 1) : usuario.vidas,
        partidasIniciadas: [...usuario.partidasIniciadas, accion.id],
      };
    case "FINALIZAR_PARTIDA":
      return finalizar(usuario, accion.resumen);
    case "LEGACY_PARTIDA":
      return finalizarRuleta(usuario, accion);
    case "RECARGAR_VIDAS":
      return { ...usuario, vidas: Math.min(3, usuario.vidas + accion.cantidad) };
    case "COMPRAR_COSMETICO": {
      const cosmetico = compraCosmeticoDisponible(usuario, accion.id);
      if (!cosmetico) return usuario;
      return {
        ...usuario,
        monedas: usuario.monedas - cosmetico.precioMonedas,
        inventarioAvatar: [...usuario.inventarioAvatar, cosmetico.id],
      };
    }
    case "CANJEAR":
      if (
        usuario.monedas < accion.costo ||
        usuario.cupones.some((c) => c.premioId === accion.cupon.premioId)
      )
        return usuario;
      return {
        ...usuario,
        monedas: usuario.monedas - accion.costo,
        cupones: [...usuario.cupones, accion.cupon],
      };
    case "USAR_CUPON":
      return {
        ...usuario,
        cupones: usuario.cupones.map((c) => (c.id === accion.id ? { ...c, usado: true } : c)),
      };
    case "DEMO":
      return sesionDemo;
    case "REINICIAR":
      return base;
  }
}

type SessionContextValue = {
  usuario: UsuarioSesion;
  actualizar: (cambios: Partial<UsuarioSesion>) => void;
  actualizarAvatar: (cambios: Partial<AvatarPersonalizado>) => void;
  configurarInvitado: (nombre: string, avatar: AvatarPersonalizado) => void;
  iniciarPartida: (id: string, riesgo?: boolean) => void;
  finalizarPartida: (resumen: ResumenPartida) => void;
  sumarPartida: (datos: { categoriaId: string; aciertos: number; puntos: number }) => void;
  gastarVida: () => void;
  recargarVidas: (cantidad?: number) => void;
  comprarCosmeticoAvatar: (id: string) => boolean;
  guardarCupon: (cupon: Cupon, costoMonedas: number) => void;
  usarCupon: (cuponId: string) => void;
  cargarSesionDemo: () => void;
  reiniciar: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [usuario, dispatch] = useReducer(reducer, base);
  const value = useMemo<SessionContextValue>(
    () => ({
      usuario,
      actualizar: (cambios) => dispatch({ tipo: "ACTUALIZAR", cambios }),
      actualizarAvatar: (cambios) => dispatch({ tipo: "AVATAR", cambios }),
      configurarInvitado: (nombre, avatar) => {
        registrarEvento({ tipo: "invitado_configurado" });
        dispatch({ tipo: "CONFIGURAR_INVITADO", nombre, avatar });
      },
      iniciarPartida: (id, riesgo = false) => dispatch({ tipo: "INICIAR_PARTIDA", id, riesgo }),
      finalizarPartida: (resumen) => {
        registrarEvento({
          tipo: "partida_completada",
          id: resumen.id,
          modo: resumen.modo,
          aciertos: resumen.aciertos,
        });
        dispatch({ tipo: "FINALIZAR_PARTIDA", resumen });
      },
      sumarPartida: ({ categoriaId, aciertos, puntos }) =>
        dispatch({
          tipo: "LEGACY_PARTIDA",
          id: `ruleta-${usuario.progresoJuego.partidas + 1}`,
          categoriaId,
          aciertos,
          puntos,
        }),
      gastarVida: () =>
        dispatch({
          tipo: "INICIAR_PARTIDA",
          id: `legacy-${usuario.partidasIniciadas.length}`,
          riesgo: true,
        }),
      recargarVidas: (cantidad = 3) => dispatch({ tipo: "RECARGAR_VIDAS", cantidad }),
      comprarCosmeticoAvatar: (id) => {
        if (!compraCosmeticoDisponible(usuario, id)) return false;
        dispatch({ tipo: "COMPRAR_COSMETICO", id });
        return true;
      },
      guardarCupon: (cupon, costo) => {
        registrarEvento({ tipo: "canje_demo", premioId: cupon.premioId });
        dispatch({ tipo: "CANJEAR", cupon, costo });
      },
      usarCupon: (id) => dispatch({ tipo: "USAR_CUPON", id }),
      cargarSesionDemo: () => dispatch({ tipo: "DEMO" }),
      reiniciar: () => {
        limpiarEventosDeSesion();
        dispatch({ tipo: "REINICIAR" });
      },
    }),
    [usuario],
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSesion() {
  const contexto = useContext(SessionContext);
  if (!contexto) throw new Error("useSesion debe usarse dentro de SessionProvider");
  return contexto;
}
