import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AvatarLienzo } from "@/components/AvatarLienzo";
import { normalizarAvatar } from "@/data/avatar-piezas";
import { Icono, IconoPastilla } from "@/components/Icono";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { albumSantaCruz, cosmeticosAvatar } from "@/data/coleccion";
import { ilustracionAlbum } from "@/data/ilustraciones";
import { insignias } from "@/data/insignias";
import { avanceTemporada, nivelDe, temporadaCompletada } from "@/lib/progreso";

export const Route = createFileRoute("/perfil")({
  head: () => ({ meta: [{ title: "Mi perfil — Soy Embajador Bolivia" }] }),
  component: Perfil,
});

type PestanaPerfil = "coleccion" | "insignias" | "tienda";

function Perfil() {
  const { usuario } = useSesion();
  const [pestana, setPestana] = useState<PestanaPerfil>("coleccion");
  const [modalAdminAbierto, setModalAdminAbierto] = useState(false);
  const [usuarioAdmin, setUsuarioAdmin] = useState("");
  const [claveAdmin, setClaveAdmin] = useState("");
  const [errorAdmin, setErrorAdmin] = useState("");

  const nivel = nivelDe(usuario.xp);
  const avance = avanceTemporada("t1", usuario);
  const certificado = temporadaCompletada("t1", usuario);

  return (
    <Pantalla conNav className="gap-4">
      {/* ── Header de Usuario ── */}
      <header className="game-panel relative overflow-hidden p-4">
        <div className="absolute inset-x-0 top-0 h-20 bg-primary/10" aria-hidden="true" />
        <div className="relative flex items-center gap-3.5">
          <AvatarLienzo
            avatar={normalizarAvatar(usuario.avatar)}
            tamano="md"
            encuadre="cuerpo"
            className="shadow-md"
          />
          <div className="min-w-0 flex-1">
            <p className="chapter-label">Explorador de Santa Cruz</p>
            <h1 className="truncate text-xl font-extrabold text-foreground">
              {usuario.nombre || "Curioso"}
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              {usuario.esInvitado
                ? "Invitado · progreso de sesión"
                : usuario.correo || "Perfil activo"}
            </p>
            <div className="mt-2 flex gap-2">
              <Link
                to="/avatar"
                search={{ origen: undefined }}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-primary shadow-sm hover:border-primary transition-colors"
              >
                <Icono nombre="editar" className="h-3.5 w-3.5" />
                Editar avatar
              </Link>
              <Link
                to="/compartir"
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-bold text-muted-foreground shadow-sm hover:text-foreground transition-colors"
              >
                <Icono nombre="compartir" className="h-3.5 w-3.5" />
                Tarjeta
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Métricas y Nivel ── */}
      <section className="card-duo p-3">
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <Dato icono="destello" valor={usuario.xp} etiqueta="XP acumulados" />
          <Dato icono="cupon" valor={usuario.monedas} etiqueta="Monedas" />
          <Dato icono="ranking" valor={usuario.puntosLiga} etiqueta="Puntos liga" />
        </div>

        <hr className="my-2.5 border-border" />

        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-foreground">Nivel {nivel.nombre}</span>
          <span className="text-muted-foreground text-[11px]">
            {nivel.siguiente ? `${nivel.faltan} XP para ${nivel.siguiente.nombre}` : "Nivel máximo"}
          </span>
        </div>
        <div className="barra-duo mt-1.5 h-2">
          <span className="barra-duo-fill" style={{ width: `${nivel.porcentaje}%` }} />
        </div>
      </section>

      {/* ── Pestañas Segmentadas (Estilo Referencia Mobile) ── */}
      <nav
        aria-label="Secciones de perfil"
        className="grid grid-cols-3 rounded-2xl bg-muted p-1 text-xs"
      >
        <button
          type="button"
          onClick={() => setPestana("coleccion")}
          className={`rounded-xl py-2 text-center font-extrabold transition-all ${
            pestana === "coleccion"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Colección
        </button>
        <button
          type="button"
          onClick={() => setPestana("insignias")}
          className={`rounded-xl py-2 text-center font-extrabold transition-all ${
            pestana === "insignias"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Insignias ({usuario.insignias.length})
        </button>
        <button
          type="button"
          onClick={() => setPestana("tienda")}
          className={`rounded-xl py-2 text-center font-extrabold transition-all ${
            pestana === "tienda"
              ? "bg-card text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Tienda ({usuario.inventarioAvatar.length}/{cosmeticosAvatar.length})
        </button>
      </nav>

      {/* ── CONTENIDO PESTAÑA 1: COLECCIÓN / ÁLBUM ── */}
      {pestana === "coleccion" && (
        <section className="flex flex-col gap-3">
          <div className="card-duo p-3.5">
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  Álbum Santa Cruz
                </p>
                <h2 className="text-sm font-extrabold text-foreground">Descubrimientos</h2>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                {usuario.album.length}/{albumSantaCruz.length}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {albumSantaCruz.map((item) => {
                const tiene = usuario.album.includes(item.id);
                return (
                  <div
                    key={item.id}
                    title={tiene ? item.nombre : item.requisito}
                    className={`flex flex-col items-center rounded-lg border p-1 ${
                      tiene ? "border-accent bg-accent/10" : "border-border bg-muted/40 opacity-60"
                    }`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded">
                      <img
                        src={ilustracionAlbum[item.id]}
                        alt={tiene ? item.nombre : ""}
                        loading="lazy"
                        width={640}
                        height={640}
                        className={`h-full w-full object-cover ${
                          tiene ? "" : "scale-110 blur-[1px] grayscale opacity-40"
                        }`}
                      />
                      {!tiene && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <Icono nombre="bloqueado" className="h-3.5 w-3.5 text-muted-foreground" />
                        </span>
                      )}
                    </div>
                    <span className="mt-1 truncate max-w-full text-[9px] font-bold text-foreground">
                      {tiene ? item.nombre : "Oculta"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-duo flex items-center justify-between p-3.5">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-foreground">Misiones de temporada</p>
              <p className="text-[11px] text-muted-foreground">
                Capítulo en curso: {avance.completadas} de {avance.total} completadas
              </p>
            </div>
            <Link
              to="/temporadas"
              className="shrink-0 rounded-xl bg-primary px-3 py-1.5 text-xs font-extrabold text-primary-foreground uppercase shadow-sm"
            >
              Explorar
            </Link>
          </div>
        </section>
      )}

      {/* ── CONTENIDO PESTAÑA 2: INSIGNIAS ── */}
      {pestana === "insignias" && (
        <section className="card-duo p-3.5">
          <div className="mb-2.5 flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
              Medallas y logros
            </h2>
            <span className="text-xs text-muted-foreground">
              {usuario.insignias.length} desbloqueadas
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {insignias.map((item) => {
              const tiene = usuario.insignias.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-2 rounded-xl border p-2 transition-all ${
                    tiene
                      ? "border-primary/40 bg-primary/5 shadow-xs"
                      : "border-border bg-muted/30 opacity-40"
                  }`}
                >
                  <Icono
                    nombre={tiene ? item.icono : "bloqueado"}
                    className={`h-4 w-4 shrink-0 ${tiene ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="min-w-0 flex-1 truncate text-xs font-bold text-foreground">
                    {item.nombre}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── CONTENIDO PESTAÑA 3: TIENDA Y COSMÉTICOS ── */}
      {pestana === "tienda" && (
        <section className="flex flex-col gap-2.5">
          <div className="card-duo p-3">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-extrabold text-foreground uppercase tracking-wider">
                Prendas del explorador
              </h2>
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[11px] font-extrabold text-accent-foreground">
                {usuario.monedas} monedas
              </span>
            </div>

            <ul className="flex flex-col gap-1.5">
              {cosmeticosAvatar.map((item) => {
                const tiene = usuario.inventarioAvatar.includes(item.id);
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-2.5 rounded-xl border border-border bg-card p-2 text-xs"
                  >
                    <IconoPastilla
                      nombre={tiene ? "check" : "bloqueado"}
                      tono={tiene ? "primary" : "muted"}
                      className="h-6 w-6 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <strong className="block truncate font-bold text-foreground">
                        {item.nombre}
                      </strong>
                      <span className="block truncate text-[10px] text-muted-foreground">
                        {tiene ? "En tu inventario" : `${item.precioMonedas} monedas`}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <Link
            to="/avatar"
            search={{ origen: undefined }}
            className="btn-duo btn-duo-secondary text-xs py-2.5"
          >
            Abrir tienda del explorador
          </Link>
        </section>
      )}

      {/* ── Enlaces secundarios compactos ── */}
      <footer className="mt-1 flex flex-col gap-2">
        {certificado && (
          <Link to="/certificado" className="btn-duo btn-duo-accent text-xs py-2.5">
            Mi certificado oficial
          </Link>
        )}
        <div className="flex gap-2">
          <Link
            to="/recompensas"
            className="flex-1 rounded-xl border border-border bg-card py-2 text-center text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Recompensas
          </Link>
          <Link
            to="/equipos"
            className="flex-1 rounded-xl border border-border bg-card py-2 text-center text-xs font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            Equipo y liga
          </Link>
        </div>

        {/* Acceso discreto para Administrador */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={() => setModalAdminAbierto(true)}
            className="text-[11px] font-medium text-muted-foreground/60 hover:text-muted-foreground underline underline-offset-2 transition-colors cursor-pointer"
          >
            Gestión administrativa
          </button>
        </div>
      </footer>

      {/* ── Modal de Inicio de Sesión Admin (Usuario: admin, Contraseña: admin) ── */}
      {modalAdminAbierto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-in fade-in"
        >
          <div className="relative w-full max-w-xs rounded-3xl border-2 border-border bg-card p-5 text-foreground shadow-2xl">
            <div className="text-center">
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icono nombre="bloqueado" className="h-5 w-5" />
              </div>
              <h3 className="text-base font-extrabold text-foreground">Acceso de Gestión</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Ingresá tus credenciales de administrador.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (usuarioAdmin.trim() === "admin" && claveAdmin === "admin") {
                  setErrorAdmin("");
                  setModalAdminAbierto(false);
                  window.location.href = "/admin-conceptual";
                } else {
                  setErrorAdmin("Usuario o contraseña incorrectos");
                }
              }}
              className="mt-4 flex flex-col gap-3"
            >
              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase">Usuario</label>
                <input
                  type="text"
                  value={usuarioAdmin}
                  onChange={(e) => setUsuarioAdmin(e.target.value)}
                  placeholder="admin"
                  required
                  autoFocus
                  className="mt-1 w-full rounded-xl border border-input bg-muted/40 px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-muted-foreground uppercase">Contraseña</label>
                <input
                  type="password"
                  value={claveAdmin}
                  onChange={(e) => setClaveAdmin(e.target.value)}
                  placeholder="•••••"
                  required
                  className="mt-1 w-full rounded-xl border border-input bg-muted/40 px-3 py-2 text-xs font-semibold outline-none focus:border-primary"
                />
              </div>

              {errorAdmin && (
                <p className="text-center text-[11px] font-bold text-destructive animate-in fade-in">
                  {errorAdmin}
                </p>
              )}

              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setModalAdminAbierto(false);
                    setErrorAdmin("");
                  }}
                  className="btn-duo btn-duo-ghost !py-2 !text-xs flex-1"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn-duo btn-duo-primary !py-2 !text-xs flex-1"
                >
                  Ingresar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Pantalla>
  );
}

function Dato({ icono, valor, etiqueta }: { icono: string; valor: number; etiqueta: string }) {
  return (
    <div className="rounded-xl bg-muted/40 p-1.5 text-center">
      <Icono nombre={icono} className="mx-auto h-3.5 w-3.5 text-primary" />
      <p className="text-sm font-extrabold text-foreground">{valor}</p>
      <p className="text-[10px] text-muted-foreground">{etiqueta}</p>
    </div>
  );
}
