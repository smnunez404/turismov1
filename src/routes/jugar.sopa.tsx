// SPEC: Sopa de Letras Cruceña (Minijuego Social / Educativo)
import { useState, useMemo } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Pantalla } from "@/components/Pantalla";
import { Icono, IconoPastilla } from "@/components/Icono";
import { useSesion } from "@/context/SessionContext";

export const Route = createFileRoute("/jugar/sopa")({
  head: () => ({
    meta: [
      { title: "Sopa de Letras Cruceña — Soy Embajador Bolivia" },
      {
        name: "description",
        content: "Encontrá las palabras típicas de Santa Cruz en la sopa de letras y ganá monedas y XP.",
      },
    ],
  }),
  component: SopaDeLetras,
});

type PalabraDef = {
  palabra: string;
  significado: string;
  encontrada: boolean;
};

const PALABRAS_DISPONIBLES: { palabra: string; significado: string }[] = [
  { palabra: "MAJADITO", significado: "Plato tradicional cruceño de arroz con charque y plátano" },
  { palabra: "TOBOROCHI", significado: "Árbol emblemático de flores rosadas de Santa Cruz" },
  { palabra: "PARABA", significado: "Ave emblemática y colorida de los bosques cruceños" },
  { palabra: "CUÑAPE", significado: "Horneado tradicional elaborado con almidón de yuca y queso" },
  { palabra: "SOMBRERO", significado: "Típico sombrero de saó, patrimonio artesanal cruceño" },
  { palabra: "BIOPARQUE", significado: "Reserva de fauna y flora representativa en la región" },
];

// Grilla fija 9x9 con palabras integradas horizontal/vertical
// M A J A D I T O P
// B T O B O R O C H
// I U P A R A B A I
// O C U Ñ A P E S S
// P E S O M B R E R
// A S T E R I S O O
// R C A N T A R O S
// Q U E B R A C H O
// U E N C A N T O S
const GRILLA_LETRAS = [
  ["M", "A", "J", "A", "D", "I", "T", "O", "P"],
  ["B", "T", "O", "B", "O", "R", "O", "C", "H"],
  ["I", "U", "P", "A", "R", "A", "B", "A", "I"],
  ["O", "C", "U", "Ñ", "A", "P", "E", "S", "Q"],
  ["P", "E", "S", "O", "M", "B", "R", "E", "R"],
  ["A", "X", "Y", "Z", "A", "B", "C", "O", "D"],
  ["R", "C", "A", "N", "T", "A", "R", "O", "S"],
  ["Q", "U", "E", "B", "R", "A", "C", "H", "O"],
  ["U", "E", "N", "C", "A", "N", "T", "O", "S"],
];

function SopaDeLetras() {
  const { usuario, actualizar } = useSesion();
  const [palabras, setPalabras] = useState<PalabraDef[]>(
    PALABRAS_DISPONIBLES.map((p) => ({ ...p, encontrada: false }))
  );
  const [celdasSeleccionadas, setCeldasSeleccionadas] = useState<string[]>([]);
  const [palabraActual, setPalabraActual] = useState("");
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const totalEncontradas = useMemo(
    () => palabras.filter((p) => p.encontrada).length,
    [palabras]
  );

  const tocarCelda = (fila: number, col: number, letra: string) => {
    const key = `${fila}-${col}`;
    if (celdasSeleccionadas.includes(key)) {
      // Deseleccionar si ya estaba
      const nuevasCeldas = celdasSeleccionadas.filter((c) => c !== key);
      setCeldasSeleccionadas(nuevasCeldas);
      setPalabraActual((prev) => prev.replace(letra, ""));
      return;
    }

    const nuevasCeldas = [...celdasSeleccionadas, key];
    const nuevaPalabra = palabraActual + letra;
    setCeldasSeleccionadas(nuevasCeldas);
    setPalabraActual(nuevaPalabra);

    // Verificar si la combinación coincide con alguna palabra no encontrada
    const encontrada = palabras.find(
      (p) => !p.encontrada && (p.palabra === nuevaPalabra || p.palabra === nuevaPalabra.split("").reverse().join(""))
    );

    if (encontrada) {
      setPalabras((prev) =>
        prev.map((p) => (p.palabra === encontrada.palabra ? { ...p, encontrada: true } : p))
      );
      setMensajeExito(`¡Excelente! Encontraste: ${encontrada.palabra}`);
      setCeldasSeleccionadas([]);
      setPalabraActual("");

      // Recompensa al usuario
      actualizar({ monedas: usuario.monedas + 15, xp: usuario.xp + 25 });

      if (totalEncontradas + 1 === palabras.length) {
        setJuegoTerminado(true);
      }

      setTimeout(() => setMensajeExito(null), 3000);
    }
  };

  const limpiarSeleccion = () => {
    setCeldasSeleccionadas([]);
    setPalabraActual("");
  };

  return (
    <Pantalla conNav className="gap-3 sm:gap-4">
      {/* Header */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Link
            to="/jugar"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted"
            aria-label="Volver a Jugar"
          >
            <Icono nombre="flecha-izquierda" className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-secondary">
              Minijuego Cultural
            </span>
            <h1 className="text-xl font-extrabold text-foreground leading-tight">
              Sopa de Letras
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-black text-accent-foreground">
            {totalEncontradas}/{palabras.length} Palabras
          </span>
        </div>
      </header>

      {/* Banner con imagen temática */}
      <section className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-card p-3 shadow-sm flex items-center gap-3">
        <img
          src="/camino/sopa_letras.jpg"
          alt="Sopa de Letras Cruceña"
          width={70}
          height={70}
          className="h-14 w-14 rounded-xl object-cover shadow-xs border border-primary/20 shrink-0"
        />
        <div className="min-w-0">
          <p className="text-xs font-bold text-foreground">
            Buscá tesoros de Santa Cruz
          </p>
          <p className="text-[11px] text-muted-foreground leading-snug">
            Tocá las letras en orden para formar las palabras del vocabulario cruceño.
          </p>
          {palabraActual && (
            <div className="mt-1 flex items-center gap-2">
              <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-mono font-black text-primary">
                {palabraActual}
              </span>
              <button
                type="button"
                onClick={limpiarSeleccion}
                className="text-[10px] font-bold text-muted-foreground hover:text-foreground underline cursor-pointer"
              >
                Borrar selección
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Mensaje de feedback exitoso */}
      {mensajeExito && (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/15 p-2 text-center text-xs font-extrabold text-emerald-800 dark:text-emerald-300 animate-in fade-in">
          {mensajeExito} (+15 monedas, +25 XP)
        </div>
      )}

      {/* Grilla interactiva */}
      <section className="rounded-2xl border-2 border-border bg-card p-2 sm:p-3 shadow-sm flex flex-col items-center">
        <div className="grid grid-cols-9 gap-1 sm:gap-1.5 w-full max-w-sm">
          {GRILLA_LETRAS.map((fila, i) =>
            fila.map((letra, j) => {
              const key = `${i}-${j}`;
              const seleccionada = celdasSeleccionadas.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => tocarCelda(i, j, letra)}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm sm:text-base font-extrabold transition-all cursor-pointer select-none ${
                    seleccionada
                      ? "bg-primary text-white scale-95 shadow-xs"
                      : "bg-muted/40 hover:bg-muted/70 text-foreground"
                  }`}
                >
                  {letra}
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Lista de palabras a encontrar */}
      <section className="rounded-2xl border-2 border-border bg-card p-3 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2">
          Palabras por descubrir
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {palabras.map((p) => (
            <div
              key={p.palabra}
              className={`rounded-xl border p-2 transition-all ${
                p.encontrada
                  ? "border-emerald-500/40 bg-emerald-500/10 opacity-75"
                  : "border-border bg-muted/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-extrabold ${
                    p.encontrada ? "line-through text-emerald-700 dark:text-emerald-400" : "text-foreground"
                  }`}
                >
                  {p.palabra}
                </span>
                {p.encontrada ? (
                  <span className="text-[10px] font-black text-emerald-600">✓</span>
                ) : (
                  <span className="text-[10px] font-bold text-muted-foreground">+25 XP</span>
                )}
              </div>
              <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-1">
                {p.significado}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modal de felicitación */}
      {juegoTerminado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-3xl border-3 border-amber-400 bg-card p-5 text-center shadow-2xl animate-in zoom-in-95">
            <span className="text-4xl">🎉</span>
            <h3 className="mt-2 text-xl font-black text-foreground">
              ¡Sopa Completada!
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Descubriste todas las palabras de Santa Cruz. Demostraste un gran vocabulario cruceño.
            </p>
            <div className="my-4 rounded-2xl bg-accent/20 p-3 text-accent-foreground font-black text-sm">
              +150 XP & +90 Monedas sumadas a tu perfil
            </div>
            <Link
              to="/jugar"
              className="btn-duo btn-duo-primary w-full py-2.5 text-sm font-black"
            >
              Volver a Jugar
            </Link>
          </div>
        </div>
      )}
    </Pantalla>
  );
}
