// Sistema de iconos del prototipo — reemplaza los emojis por SVG consistentes (lucide-react).
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Banana,
  BarChart3,
  Bird,
  BookOpenText,
  Building,
  Building2,
  Bus,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Church,
  Clapperboard,
  Coffee,
  Compass,
  Copy,
  Crown,
  Disc3,
  Droplets,
  Drum,
  Eye,
  Facebook,
  Flag,
  Flame,
  Gift,
  Hand,
  Handshake,
  Heart,
  HelpCircle,
  Hourglass,
  Image as ImageIcon,
  Instagram,
  Landmark,
  LayoutGrid,
  Leaf,
  Lock,
  Map,
  Martini,
  Megaphone,
  MessageCircle,
  Mountain,
  MountainSnow,
  Palette,
  PartyPopper,
  PawPrint,
  ScrollText,
  Share2,
  Shield,
  Shirt,
  ShoppingBag,
  Snowflake,
  Sparkles,
  Sprout,
  Store,
  Sun,
  Swords,
  Target,
  Ticket,
  Timer,
  TreeDeciduous,
  TreePalm,
  Trophy,
  Turtle,
  User,
  Users,
  UtensilsCrossed,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const iconos = {
  // Navegación / general
  perfil: User,
  ranking: Trophy,
  certificado: Award,
  compartir: Megaphone,
  mapa: Map,
  check: Check,
  bloqueado: Lock,
  destello: Sparkles,
  siguiente: ChevronRight,
  volver: ArrowLeft,
  arriba: ChevronUp,
  abajo: ChevronDown,
  objetivo: Target,
  celebrar: PartyPopper,
  insignia: BadgeCheck,
  ojo: Eye,
  enlace: Copy,
  difundir: Share2,
  amigos: Users,
  // Temporadas
  ciudad: Building2,
  tambor: Drum,
  iglesia: Church,
  gastronomia: UtensilsCrossed,
  naturaleza: Leaf,
  // Insignias
  pergamino: ScrollText,
  reloj: Hourglass,
  plaza: Landmark,
  brujula: Compass,
  anfitrion: Handshake,
  camara: Camera,
  medalla: Award,
  bandera: Flag,
  // Reto presencial
  desierto: Mountain,
  arte: Palette,
  imagen: ImageIcon,
  // Redes
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  // Admin
  contenido: LayoutGrid,
  preguntas: HelpCircle,
  metricas: BarChart3,
  guia: BookOpenText,
  // Pictogramas de preguntas
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
  // Juego, retención y auspicios
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
  // Aliases semánticos del sistema visual evolucionado
  jugar: Zap,
  xp: Sparkles,
  moneda: Ticket,
  liga: Shield,
  nivel: Crown,
  desbloqueo: Gift,
  tiempo: Timer,
  acierto: CheckCircle2,
  error: XCircle,
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
