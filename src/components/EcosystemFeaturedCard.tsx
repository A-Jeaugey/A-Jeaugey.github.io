import { ArrowUpRight, MountainSnow, Wand2, GraduationCap, Sparkles, type LucideIcon } from "lucide-react";
import { useMouseTilt } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

const COLOR = "192 82% 56%";
const URL = "https://www.les-maths-au-sommet.org";
const DOMAIN = "les-maths-au-sommet.org";

const highlightIcons: LucideIcon[] = [Wand2, GraduationCap, Sparkles, MountainSnow];

interface EcosystemFeaturedCardProps {
  visible: boolean;
}

const EcosystemFeaturedCard = ({ visible }: EcosystemFeaturedCardProps) => {
  const { ref, transform } = useMouseTilt(3);
  const { t } = useLanguage();

  const data = t("ecosystem.featured") as {
    label: string;
    tag: string;
    title: string;
    description: string;
    cta: string;
    highlights: { label: string; detail: string }[];
  };

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={URL}
      target="_blank"
      rel="noopener noreferrer"
      className="ecosystem-card group relative block rounded-2xl overflow-hidden border border-white/[0.07] bg-card mb-5 transition-all duration-500 ease-out hover:border-white/[0.16] active:scale-[0.99]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? transform
          : "perspective(900px) translateY(40px) scale(0.97)",
        transition:
          "opacity 0.7s ease-out, transform 0.7s ease-out, border-color 0.3s, box-shadow 0.4s, background-color 0.3s",
        willChange: "transform, opacity",
        // @ts-expect-error css custom property
        "--site-color": COLOR,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, hsl(${COLOR}) 50%, transparent 100%)`,
        }}
      />

      {/* Ambient summit glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 75% 0%, hsl(${COLOR} / 0.12), transparent 60%)`,
        }}
      />
      <div
        className="absolute -top-24 -right-16 w-80 h-80 pointer-events-none opacity-50"
        style={{
          background: `radial-gradient(circle, hsl(${COLOR} / 0.08), transparent 70%)`,
          filter: "blur(50px)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-7 lg:gap-9 p-6 sm:p-8 md:p-9">
        {/* LEFT: content */}
        <div className="flex flex-col min-w-0">
          {/* Label + visit row */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3">
              <div
                className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, hsl(${COLOR} / 0.2), hsl(${COLOR} / 0.04))`,
                  border: `1px solid hsl(${COLOR} / 0.24)`,
                  boxShadow: `inset 0 1px 0 hsl(${COLOR} / 0.12)`,
                }}
              >
                <MountainSnow
                  className="w-6 h-6 transition-transform duration-500 group-hover:scale-110"
                  style={{ color: `hsl(${COLOR})` }}
                  strokeWidth={1.6}
                />
              </div>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                style={{
                  color: `hsl(${COLOR})`,
                  background: `hsl(${COLOR} / 0.08)`,
                  border: `1px solid hsl(${COLOR} / 0.18)`,
                }}
              >
                <span
                  className="w-1 h-1 rounded-full"
                  style={{
                    background: `hsl(${COLOR})`,
                    boxShadow: `0 0 8px hsl(${COLOR} / 0.7)`,
                  }}
                />
                {data.label}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1.5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-300 -translate-x-1 group-hover:translate-x-0 hidden sm:inline">
                {t("ecosystem.visit")}
              </span>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/80" />
            </div>
          </div>

          {/* Tag */}
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60 mb-2">
            {data.tag}
          </span>

          {/* Title */}
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 tracking-tight">
            {data.title}
          </h3>

          {/* Description */}
          <p className="text-[13px] sm:text-sm text-muted-foreground/80 leading-relaxed mb-6 max-w-2xl">
            {data.description}
          </p>

          {/* CTA + domain */}
          <div className="mt-auto flex flex-wrap items-center gap-4">
            <span
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group-hover:-translate-y-0.5"
              style={{
                color: `hsl(${COLOR})`,
                background: `hsl(${COLOR} / 0.1)`,
                border: `1px solid hsl(${COLOR} / 0.22)`,
              }}
            >
              {data.cta}
              <ArrowUpRight className="w-4 h-4" />
            </span>
            <span className="font-mono text-[11px] text-muted-foreground/40 group-hover:text-foreground/60 transition-colors duration-300">
              ↗ {DOMAIN}
            </span>
          </div>
        </div>

        {/* RIGHT: highlight pills */}
        <div className="grid grid-cols-2 gap-2.5 self-center w-full">
          {data.highlights.map((h, i) => {
            const Icon = highlightIcons[i];
            return (
              <div
                key={h.label}
                className="relative rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1]"
              >
                <Icon
                  className="w-4 h-4 mb-2"
                  style={{ color: `hsl(${COLOR} / 0.85)` }}
                  strokeWidth={1.75}
                />
                <p className="text-[12px] font-medium text-foreground/85 leading-tight">
                  {h.label}
                </p>
                <p className="text-[10px] text-muted-foreground/55 leading-tight mt-0.5">
                  {h.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </a>
  );
};

export default EcosystemFeaturedCard;
