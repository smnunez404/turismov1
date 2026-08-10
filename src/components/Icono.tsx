// Sistema de iconos del prototipo — reemplaza los emojis por SVG consistentes (lucide-react).
import {
  Award,
  BadgeCheck,
  BookOpenText,
  Building2,
  Camera,
  Check,
  ChevronRight,
  Church,
  Compass,
  Copy,
  Drum,
  Facebook,
  Flag,
  Handshake,
  Hourglass,
  Landmark,
  Image as ImageIcon,
  Instagram,
  Leaf,
  Lock,
  Map,
  MessageCircle,
  Megaphone,
  Mountain,
  Palette,
  PartyPopper,
  ScrollText,
  Share2,
  Sparkles,
  Target,
  Trophy,
  User,
  UtensilsCrossed,
  Users,
  BarChart3,
  HelpCircle,
  LayoutGrid,
  Eye,
  Sprout,
  TreeDeciduous,
  TreePalm,
  Bird,
  Turtle,
  Banana,
  PawPrint,
  MountainSnow,
  Snowflake,
  Waves,
  Droplets,
  Hand,
  Shirt,
  Sun,
  Disc3,
  Flame,
  Heart,
  Ticket,
  Gift,
  Swords,
  Timer,
  Clapperboard,
  ShoppingBag,
  Coffee,
  Martini,
  Bus,
  CalendarDays,
  Zap,
  Crown,
  Shield,
  Store,
  Building,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconos = {
  // navegación / general
  perfil: User,
  ranking: Trophy,
  certificado: Award,
  compartir: Megaphone,
  mapa: Map,
  check: Check,
  bloqueado: Lock,
  destello: Sparkles,
  siguiente: ChevronRight,
  objetivo: Target,
  celebrar: PartyPopper,
  insignia: BadgeCheck,
  ojo: Eye,
  enlace: Copy,
  difundir: Share2,
  amigos: Users,
  // temporadas
  ciudad: Building2,
  tambor: Drum,
  iglesia: Church,
  gastronomia: UtensilsCrossed,
  naturaleza: Leaf,
  // insignias
  pergamino: ScrollText,
  reloj: Hourglass,
  plaza: Landmark,
  brujula: Compass,
  anfitrion: Handshake,
  camara: Camera,
  medalla: Award,
  bandera: Flag,
  // reto presencial
  desierto: Mountain,
  arte: Palette,
  imagen: ImageIcon,
  // redes
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  // admin
  contenido: LayoutGrid,
  preguntas: HelpCircle,
  metricas: BarChart3,
  guia: BookOpenText,
  // pictogramas de preguntas
  cactus: Sprout,
  arbol: TreeDeciduous,
  palmera: TreePalm,
  hoja: Leaf,
  huella: PawPrint,
  banana: Banana,
  ave: Bird,
  tortuga: Turtle,
  montana: MountainSnow,
  nieve: Snowflake,
  ola: Waves,
  agua: Droplets,
  mano: Hand,
  abrigo: Shirt,
  sol: Sun,
  // Fase 2 — Preguntados, retención y auspicios
  ruleta: Disc3,
  racha: Flame,
  vida: Heart,
  cupon: Ticket,
  regalo: Gift,
  duelo: Swords,
  cronometro: Timer,
  cine: Clapperboard,
  mall: ShoppingBag,
  cafe: Coffee,
  bar: Martini,
  tour: Bus,
  calendario: CalendarDays,
  rayo: Zap,
  corona: Crown,
  escudo: Shield,
  tienda: Store,
  edificio: Building,
} satisfies Record<string, LucideIcon>;

export type NombreIcono = keyof typeof iconos;

export function Icono({
  nombre,
  className = "h-5 w-5",
  strokeWidth = 1.75,
}: {
  nombre: NombreIcono | string;
  className?: string;
  strokeWidth?: number;
}) {
  const Componente = (iconos as Record<string, LucideIcon>)[nombre] ?? Sparkles;
  return <Componente className={className} strokeWidth={strokeWidth} aria-hidden="true" />;
}

/** Icono dentro de una pastilla circular, para encabezados y tarjetas. */
export function IconoPastilla({
  nombre,
  tono = "primary",
  className = "",
}: {
  nombre: NombreIcono | string;
  tono?: "primary" | "accent" | "secondary" | "muted";
  className?: string;
}) {
  const tonos = {
    primary: "bg-primary/12 text-primary ring-primary/20",
    accent: "bg-accent/20 text-accent-foreground ring-accent/30",
    secondary: "bg-secondary/12 text-secondary ring-secondary/20",
    muted: "bg-muted text-muted-foreground ring-border",
  } as const;
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ring-1 ${tonos[tono]} ${className}`}
    >
      <Icono nombre={nombre} className="h-5.5 w-5.5" />
    </span>
  );
}
