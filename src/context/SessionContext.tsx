// Estado de sesión SOLO en memoria (SPEC-02..SPEC-07, guardarraíl §5).
// No usa localStorage ni backend: al recargar, el prototipo se reinicia.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AvatarPersonalizado, Cupon, UsuarioSesion } from "@/data/tipos";
import { avatarPorDefecto } from "@/data/avatar-piezas";

const sesionInicial: UsuarioSesion = {
  nombre: "",
  correo: "",
  avatarId: null,
  avatar: null,
  puntos: 0,
  insignias: [],
  progreso: {},
  tutorialVisto: false,
  vidas: 5,
  racha: { dias: 1, mejorRacha: 1, preguntaDelDiaHecha: false },
  puntosLiga: 0,
  medallas: {},
  equipoId: null,
  cupones: [],
  duelosGanados: 0,
};

// Perfil sintético para demostrar "usuario con progreso" (SPEC-03).
const sesionDemo: UsuarioSesion = {
  nombre: "Camila",
  correo: "camila.demo@soyembajador.bo",
  avatarId: "tipoy",
  avatar: {
    ...avatarPorDefecto,
    cabello: "pelo-largo",
    prenda: "prenda-tipoy",
    accesorio: "acc-aretes",
  },
  puntos: 145,
  insignias: ["i-origenes", "i-corazon"],
  progreso: {
    m1: { completada: true, puntos: 80, aciertos: 8 },
    m2: { completada: true, puntos: 65, aciertos: 7 },
  },
  tutorialVisto: true,
  vidas: 4,
  racha: { dias: 5, mejorRacha: 9, preguntaDelDiaHecha: false },
  puntosLiga: 180,
  medallas: { historia: 5, gastronomia: 3, naturaleza: 2 },
  equipoId: "e-centro",
  cupones: [],
  duelosGanados: 3,
};

type SessionContextValue = {
  usuario: UsuarioSesion;
  actualizar: (cambios: Partial<UsuarioSesion>) => void;
  actualizarAvatar: (cambios: Partial<AvatarPersonalizado>) => void;
  sumarPartida: (datos: {
    categoriaId: string;
    aciertos: number;
    puntos: number;
  }) => void;
  gastarVida: () => void;
  recargarVidas: (cantidad?: number) => void;
  guardarCupon: (cupon: Cupon, costoPuntos: number) => void;
  usarCupon: (cuponId: string) => void;
  cargarSesionDemo: () => void;
  reiniciar: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<UsuarioSesion>(sesionInicial);

  const value = useMemo<SessionContextValue>(
    () => ({
      usuario,
      actualizar: (cambios) => setUsuario((prev) => ({ ...prev, ...cambios })),
      actualizarAvatar: (cambios) =>
        setUsuario((prev) => ({
          ...prev,
          avatar: { ...(prev.avatar ?? avatarPorDefecto), ...cambios },
        })),
      sumarPartida: ({ categoriaId, aciertos, puntos }) =>
        setUsuario((prev) => ({
          ...prev,
          puntos: prev.puntos + puntos,
          puntosLiga: prev.puntosLiga + puntos,
          medallas: {
            ...prev.medallas,
            [categoriaId]: (prev.medallas[categoriaId] ?? 0) + aciertos,
          },
        })),
      gastarVida: () => setUsuario((prev) => ({ ...prev, vidas: Math.max(0, prev.vidas - 1) })),
      recargarVidas: (cantidad = 5) =>
        setUsuario((prev) => ({ ...prev, vidas: Math.min(5, prev.vidas + cantidad) })),
      guardarCupon: (cupon, costoPuntos) =>
        setUsuario((prev) => ({
          ...prev,
          puntos: Math.max(0, prev.puntos - costoPuntos),
          cupones: [...prev.cupones, cupon],
        })),
      usarCupon: (cuponId) =>
        setUsuario((prev) => ({
          ...prev,
          cupones: prev.cupones.map((c) => (c.id === cuponId ? { ...c, usado: true } : c)),
        })),
      cargarSesionDemo: () => setUsuario(sesionDemo),
      reiniciar: () => setUsuario(sesionInicial),
    }),
    [usuario],
  );

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSesion() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSesion debe usarse dentro de SessionProvider");
  return ctx;
}
