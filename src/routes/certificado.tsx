// SPEC-16 — Certificado digital (P-16)
import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { useSesion } from "@/context/SessionContext";
import { temporadas } from "@/data/temporadas";
import { avanceTemporada, nivelDe, temporadaCompletada } from "@/lib/progreso";
import { codigoCertificado, fechaLarga } from "@/lib/formato";
import { Icono } from "@/components/Icono";
import marca from "@/assets/marca-embajador.png";

export const Route = createFileRoute("/certificado")({
  head: () => ({
    meta: [
      { title: "Mi certificado de Embajador — Soy Embajador Bolivia" },
      {
        name: "description",
        content:
          "Certificado simulado que acredita haber completado la Temporada 1: Descubre Santa Cruz.",
      },
      { property: "og:title", content: "Certificado de Embajador de Santa Cruz" },
      {
        property: "og:description",
        content: "Completé las cinco misiones de la Temporada 1 Descubre Santa Cruz.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Certificado,
});

function Certificado() {
  const { usuario } = useSesion();
  const temporada = temporadas.find((t) => t.id === "t1")!;
  const habilitado = temporadaCompletada("t1", usuario);
  const avance = avanceTemporada("t1", usuario);
  const nivel = nivelDe(usuario.puntos);
  // La fecha se calcula tras hidratar para no desincronizar el render del servidor.
  const [fecha, setFecha] = useState<string | null>(null);
  useEffect(() => setFecha(fechaLarga(new Date())), []);

  if (!habilitado) {
    return (
      <Pantalla className="justify-center gap-4 text-center">
        <span className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground ring-1 ring-border">
          <Icono nombre="bloqueado" className="h-9 w-9" />
        </span>
        <h1 className="text-2xl font-bold text-foreground">
          Tu certificado todavía está en preparación
        </h1>
        <p className="text-sm text-muted-foreground">
          Se emite al completar las 5 misiones de la Temporada 1. Llevás {avance.completadas} de{" "}
          {avance.total}.
        </p>
        <div className="barra-duo mx-auto w-full max-w-xs">
          <span className="barra-duo-fill" style={{ width: `${avance.porcentaje}%` }} />
        </div>
        <Link to="/temporadas" className="mt-2 btn-duo btn-duo-primary">
          Seguir con mis misiones
        </Link>
      </Pantalla>
    );
  }

  return (
    <Pantalla className="gap-6 pb-12">
      <header className="text-center">
        <p className="text-xs font-semibold tracking-widest text-secondary uppercase">
          Lo lograste
        </p>
        <h1 className="text-2xl font-bold text-foreground">Tu certificado digital</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Capturá la pantalla y compartilo con orgullo cruceño.
        </p>
      </header>

      <article className="relative overflow-hidden rounded-3xl border-4 border-accent bg-card p-6 text-center shadow-sm">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-accent/20"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-primary/10"
        />
        <div className="relative flex flex-col items-center gap-1">
          <img
            src={marca}
            alt=""
            loading="lazy"
            width={512}
            height={512}
            className="h-16 w-16 object-contain"
          />
          <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
            Soy Embajador Bolivia
          </p>
          <p className="text-xs text-muted-foreground">Certifica que</p>
          <h2 className="font-serif text-3xl leading-tight font-bold text-primary">
            {usuario.nombre || "Embajador"}
          </h2>
          <p className="max-w-xs text-sm text-foreground">
            completó la{" "}
            <strong>
              Temporada {temporada.orden}: {temporada.nombre}
            </strong>{" "}
            y hoy conoce, siente y cuenta la historia de Santa Cruz.
          </p>

          <dl className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-accent/20 p-3">
              <dt className="text-[10px] text-muted-foreground uppercase">Puntaje</dt>
              <dd className="text-lg font-bold text-foreground">{usuario.puntos}</dd>
            </div>
            <div className="rounded-xl bg-accent/20 p-3">
              <dt className="text-[10px] text-muted-foreground uppercase">Insignias</dt>
              <dd className="text-lg font-bold text-foreground">{usuario.insignias.length}</dd>
            </div>
            <div className="rounded-xl bg-accent/20 p-3">
              <dt className="text-[10px] text-muted-foreground uppercase">Nivel</dt>
              <dd className="text-sm font-bold text-foreground">{nivel.nombre}</dd>
            </div>
          </dl>

          <div className="mt-5 w-full border-t border-dashed border-border pt-3 text-[11px] text-muted-foreground">
            <p>Emitido el {fecha ?? "—"} · Santa Cruz de la Sierra, Bolivia</p>
            <p className="mt-1 font-mono tracking-wider">
              {codigoCertificado(usuario.nombre, usuario.puntos)}
            </p>
          </div>
        </div>
      </article>

      <p className="text-center text-xs text-muted-foreground">
        Certificado simulado para la validación del prototipo: no se genera archivo descargable ni
        registro oficial.
      </p>

      <div className="flex flex-col gap-2 text-center">
        <Link to="/compartir" className="btn-duo btn-duo-primary">
          Compartir mi logro
        </Link>
        <Link to="/perfil" className="btn-duo btn-duo-ghost">
          Ver mi perfil
        </Link>
        <Link
          to="/temporadas"
          className="text-sm text-muted-foreground underline underline-offset-4"
        >
          Volver al mapa
        </Link>
      </div>
    </Pantalla>
  );
}
