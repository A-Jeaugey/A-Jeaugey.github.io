import { ArrowUpRight, Gamepad2, Code2, Sigma, BookOpen, Mountain, LucideIcon } from "lucide-react";
import { useStaggerReveal, useParallax, useMouseTilt } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

type SiteMeta = {
  key: "game" | "nsi" | "maths" | "philo" | "sommet";
  icon: LucideIcon;
  url: string;
  domain: string;
  color: string;
};

const sites: SiteMeta[] = [
  {
    key: "nsi",
    icon: Code2,
    url: "https://arthurjeaugey.com/revisions-nsi",
    domain: "arthurjeaugey.com/revisions-nsi",
    color: "210 80% 62%",
  },
  {
    key: "maths",
    icon: Sigma,
    url: "https://arthurjeaugey.com/revisions-maths",
    domain: "arthurjeaugey.com/revisions-maths",
    color: "150 60% 52%",
  },
  {
    key: "philo",
    icon: BookOpen,
    url: "https://arthurjeaugey.com/revisions-philo",
    domain: "arthurjeaugey.com/revisions-philo",
    color: "30 85% 62%",
  },
  {
    key: "game",
    icon: Gamepad2,
    url: "https://game.arthurjeaugey.com",
    domain: "game.arthurjeaugey.com",
    color: "265 75% 65%",
  },
  {
    key: "sommet",
    icon: Mountain,
    url: "https://www.les-maths-au-sommet.org",
    domain: "les-maths-au-sommet.org",
    color: "192 80% 55%",
  },
];

interface SiteCardProps {
  site: SiteMeta;
  visible: boolean;
  index: number;
}

const SiteCard = ({ site, visible, index }: SiteCardProps) => {
  const { ref, transform } = useMouseTilt(5);
  const { t } = useLanguage();
  const Icon = site.icon;
  const data = t(`ecosystem.sites.${site.key}`) as { title: string; tag: string; description: string };

  return (
    <a
      ref={ref as unknown as React.RefObject<HTMLAnchorElement>}
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="ecosystem-card group relative rounded-2xl block overflow-hidden border border-white/[0.06] bg-card transition-all duration-500 ease-out hover:border-white/[0.14] active:scale-[0.98]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? transform
          : "perspective(600px) translateY(40px) scale(0.95)",
        transition:
          "opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s, box-shadow 0.4s, background-color 0.3s",
        willChange: "transform, opacity",
        // @ts-expect-error css custom property
        "--site-color": site.color,
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent 0%, hsl(${site.color}) 50%, transparent 100%)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, hsl(${site.color} / 0.10), transparent 65%)`,
        }}
      />

      {/* Subtle bg shift on hover */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.015] transition-colors duration-300 pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-6 flex flex-col h-full">
        {/* Icon + arrow row */}
        <div className="flex items-start justify-between mb-5">
          <div className="relative">
            <div
              className="relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(135deg, hsl(${site.color} / 0.18), hsl(${site.color} / 0.04))`,
                border: `1px solid hsl(${site.color} / 0.22)`,
                boxShadow: `inset 0 1px 0 hsl(${site.color} / 0.10)`,
              }}
            >
              <Icon
                className="w-5 h-5 transition-transform duration-500 group-hover:scale-110"
                style={{ color: `hsl(${site.color})` }}
                strokeWidth={1.75}
              />
            </div>

            {/* Pulsing ring on hover */}
            <span
              aria-hidden
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                border: `1px solid hsl(${site.color} / 0.4)`,
                animation: "ecosystem-pulse-ring 1.6s ease-out infinite",
                animationDelay: `${index * 0.2}s`,
              }}
            />
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span
              className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/0 group-hover:text-muted-foreground/50 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
            >
              {t("ecosystem.visit")}
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground/80"
            />
          </div>
        </div>

        {/* Tag */}
        <span
          className="font-mono text-[10px] uppercase tracking-[0.18em] mb-2 inline-flex items-center gap-1.5"
          style={{ color: `hsl(${site.color})` }}
        >
          <span
            className="w-1 h-1 rounded-full"
            style={{
              background: `hsl(${site.color})`,
              boxShadow: `0 0 8px hsl(${site.color} / 0.6)`,
            }}
          />
          {data.tag}
        </span>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 tracking-tight">
          {data.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13px] text-muted-foreground/70 leading-relaxed mb-5 flex-1">
          {data.description}
        </p>

        {/* URL line */}
        <div
          className="flex items-center gap-2 pt-3 border-t border-white/[0.05] group-hover:border-white/[0.1] transition-colors duration-300"
        >
          <span
            className="font-mono text-[10px] text-muted-foreground/30 group-hover:text-muted-foreground/35 transition-colors flex-shrink-0"
          >
            ↗
          </span>
          <span className="font-mono text-[10px] sm:text-[11px] text-muted-foreground/45 truncate group-hover:text-foreground/70 transition-colors duration-300">
            {site.domain}
          </span>
        </div>
      </div>
    </a>
  );
};

const EcosystemSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(sites.length + 1, 110);
  const { ref: parallaxRef, offset } = useParallax(0.05);
  const { t } = useLanguage();

  return (
    <section
      id="ecosystem"
      className="py-16 sm:py-24 md:py-28 relative overflow-hidden"
    >
      {/* Subtle dotted background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Soft ambient glows */}
      <div
        className="absolute top-1/4 left-[10%] w-[40%] h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(265 60% 50% / 0.04), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-[10%] w-[40%] h-64 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, hsl(210 60% 50% / 0.04), transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div
        ref={parallaxRef}
        className="max-w-5xl mx-auto px-6 relative"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div ref={containerRef}>
          {/* Header */}
          <div
            className="mb-10 sm:mb-12 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-px bg-foreground/20" />
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.25em]">
                {t("ecosystem.label")}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 tracking-tight">
              {t("ecosystem.title")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
              {t("ecosystem.description")}
            </p>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {sites.map((site, i) => (
              <SiteCard
                key={site.key}
                site={site}
                visible={visibleItems[i + 1] ?? false}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcosystemSection;
