import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// French road-sign palette
export const SIGN_RED = "#c8102e";
export const SIGN_BLUE = "#1d4f91";
const SIGN_WHITE = "#f4f3ef";

interface TownSignProps {
  value: string;
  caption: string;
  /** Town-exit sign: same panel, crossed out with a red bar. */
  exit?: boolean;
  /** Caught by the headlights: retroreflective white instead of a dark shape. */
  lit: boolean;
  srLabel?: string;
  large?: boolean;
}

/** Entry/exit sign of a French town ("panneau d'agglomération"), used for before/after values. */
export const TownSign = ({ value, caption, exit, lit, srLabel, large }: TownSignProps) => (
  <div className="flex flex-col items-center">
    <div
      className={cn(
        "relative rounded-[6px] border-[3px] text-center transition-[background-color,border-color,color,box-shadow] duration-500",
        large ? "px-6 py-3 min-w-[9rem]" : "px-3 sm:px-4 py-2 min-w-[6.25rem] sm:min-w-[7rem]",
        lit ? "text-[#111]" : "text-muted-foreground/45 bg-white/[0.03] border-white/[0.12]"
      )}
      style={
        lit
          ? { backgroundColor: SIGN_WHITE, borderColor: SIGN_RED, boxShadow: "0 0 32px rgba(255, 236, 190, 0.16)" }
          : undefined
      }
    >
      {srLabel && <span className="sr-only">{srLabel} </span>}
      <span
        className={cn(
          "block font-bold tracking-tight whitespace-nowrap leading-tight",
          large ? "text-2xl sm:text-3xl uppercase" : "text-lg sm:text-xl"
        )}
      >
        {value}
      </span>
      <span className="block font-mono text-[9px] uppercase tracking-[0.18em] mt-0.5 opacity-70 whitespace-nowrap">
        {caption}
      </span>
      {exit && (
        <svg
          aria-hidden
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="3"
            y1="97"
            x2="97"
            y2="3"
            stroke={lit ? SIGN_RED : "rgba(255, 255, 255, 0.14)"}
            strokeWidth="4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            className="transition-[stroke] duration-500"
          />
        </svg>
      )}
    </div>
    {/* Post */}
    <div className={cn("w-[3px] h-3 transition-colors duration-500", lit ? "bg-white/30" : "bg-white/10")} />
  </div>
);

/** Blue direction sign, used as the link to the live site. */
export const DirectionSign = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group inline-flex items-center gap-3 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
    style={{
      backgroundColor: SIGN_BLUE,
      boxShadow: `inset 0 0 0 3px ${SIGN_BLUE}, inset 0 0 0 4.5px rgba(255, 255, 255, 0.9), 0 8px 30px -10px ${SIGN_BLUE}`,
    }}
  >
    {label}
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
  </a>
);

export type SignKind = "mandatory" | "info" | "danger" | "noEntry";

/** Small road-sign icon heading each story card. */
export const SignIcon = ({ kind, className }: { kind: SignKind; className?: string }) => (
  <svg viewBox="0 0 40 40" className={cn("w-9 h-9 shrink-0", className)} aria-hidden>
    {kind === "mandatory" && (
      <>
        <circle cx="20" cy="20" r="18" fill={SIGN_BLUE} stroke={SIGN_WHITE} strokeWidth="1.5" />
        <text x="20" y="26.5" textAnchor="middle" fontSize="18" fontWeight="700" fill={SIGN_WHITE}>
          §
        </text>
      </>
    )}
    {kind === "info" && (
      <>
        <rect x="3" y="3" width="34" height="34" rx="5" fill={SIGN_BLUE} stroke={SIGN_WHITE} strokeWidth="1.5" />
        <text x="20" y="27.5" textAnchor="middle" fontSize="20" fontWeight="700" fill={SIGN_WHITE}>
          i
        </text>
      </>
    )}
    {kind === "danger" && (
      <>
        <path
          d="M20 5 L36 34 L4 34 Z"
          fill={SIGN_WHITE}
          stroke={SIGN_RED}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <text x="20" y="31" textAnchor="middle" fontSize="15" fontWeight="800" fill="#111">
          !
        </text>
      </>
    )}
    {kind === "noEntry" && (
      <>
        <circle cx="20" cy="20" r="18" fill={SIGN_RED} />
        <rect x="9" y="17" width="22" height="6" rx="1" fill={SIGN_WHITE} />
      </>
    )}
  </svg>
);
