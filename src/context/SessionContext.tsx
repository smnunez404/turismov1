// Estado de sesión SOLO en memoria (SPEC-02..SPEC-07, guardarraíl §5).
// No usa localStorage ni backend: al recargar, el prototipo se reinicia.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { UsuarioSesion } from "@/data/tipos";

const sesionInicial: UsuarioSesion = {
  nombre: "",
  correo: "",
  avatarId: null,
  puntos: 0,
  insignias: [],
  progreso: {},
  tutorialVisto: false,
};

// Perfil sintético para demostrar "usuario con progreso" (SPEC-03).
const sesionDemo: UsuarioSesion = {
  nombre: "Camila",
  correo: "camila.demo@soyembajador.bo",
  avatarId: "tipoy",
  puntos: 145,
  insignias: ["i-origenes", "i-corazon"],
  progreso: {
    m1: { completada: true, puntos: 80, aciertos: 8 },
    m2: { completada: true, puntos: 65, aciertos: 7 },
  },
  tutorialVisto: true,
};

type SessionContextValue = {
  usuario: UsuarioSesion;
  actualizar: (cambios: Partial<UsuarioSesion>) => void;
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
