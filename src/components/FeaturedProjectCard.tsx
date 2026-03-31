import { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink, Camera, Brain, Users, Wifi } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import PhoneSimulator from "./PhoneSimulator";

interface FeaturedProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  appLink: string;
  playStoreLink: string;
  visible?: boolean;
}

/* ── phone parallax hook — disabled when user interacts with an app ── */
function usePhoneParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ rx: 0, ry: 0, mx: 0, my: 0 });
  const [locked, setLocked] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    if (locked) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPos({ rx: y * -14, ry: x * 14, mx: x * 12, my: y * 12 });
  }, [locked]);

  const handleLeave = useCallback(() => {
    setPos({ rx: 0, ry: 0, mx: 0, my: 0 });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [handleMove, handleLeave]);

  const setInteracting = useCallback((active: boolean) => {
    setLocked(active);
    if (active) setPos({ rx: 0, ry: 0, mx: 0, my: 0 });
  }, []);

  return { containerRef, pos, setInteracting };
}

/* ── feature icons ── */
const featureIcons = [Camera, Brain, Users, Wifi] as const;

const FeaturedProjectCard = ({
  title,
  description,
  techStack,
  appLink,
  playStoreLink,
  visible = true,
}: FeaturedProjectCardProps) => {
  const { containerRef, pos, setInteracting } = usePhoneParallax();
  const { t } = useLanguage();

  const features: { label: string; detail: string }[] = t("projects.featured.features");

  return (
    <div
      ref={containerRef}
      className="group relative rounded-2xl p-[1px] mb-8 featured-card-glow"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px) scale(0.97)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        willChange: "transform, opacity",
      }}
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 rounded-2xl featured-gradient-border opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card body */}
      <div className="relative rounded-2xl bg-card overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[40%] h-64 bg-[hsl(250,60%,50%)] opacity-[0.03] blur-[100px] group-hover:opacity-[0.07] transition-opacity duration-700" />
          <div className="absolute -bottom-32 right-1/4 w-[35%] h-64 bg-[hsl(200,60%,50%)] opacity-[0.02] blur-[100px] group-hover:opacity-[0.05] transition-opacity duration-700" />
        </div>

        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          {/* ── BENTO GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-10">

            {/* LEFT: content */}
            <div className="flex flex-col justify-between min-w-0">
              {/* Badges */}
              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-6">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-[pulse-dot_2s_ease-in-out_infinite]" />
                    {t("projects.featured.badge")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide bg-white/[0.06] text-muted-foreground border border-white/[0.06]">
                    {t("projects.featured.playStore")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
                  {title}
                </h3>

                {/* Description */}
                <p className="text-[15px] text-muted-foreground leading-relaxed mb-6">
                  {description}
                </p>
              </div>

              {/* Tech + CTAs */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-muted-foreground/70 bg-white/[0.05] px-2.5 py-1 rounded-md border border-white/[0.04] transition-colors duration-300 group-hover:text-muted-foreground group-hover:bg-white/[0.07]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={playStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] text-foreground text-sm font-medium border border-white/[0.08] hover:bg-white/[0.14] hover:border-white/[0.16] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                      <path d="M3.609 1.814 13.793 12 3.61 22.186a2.37 2.37 0 0 1-.497-.544 2.71 2.71 0 0 1-.39-1.457V3.815c0-.56.145-1.063.39-1.457a2.37 2.37 0 0 1 .497-.544zm.88-.64L15.545 7.22l-2.904 2.906zm11.057 5.049L18.9 8.295a1.5 1.5 0 0 1 0 2.41l-3.558 2.21-3.035-3.036zM4.49 22.826l11.057-6.046-2.904-2.906z" />
                    </svg>
                    Google Play
                  </a>
                  <a
                    href={appLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-muted-foreground text-sm font-medium hover:text-foreground transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {t("projects.featured.visitApp")}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: Interactive Phone + feature grid */}
            <div className="flex flex-col gap-4 items-center lg:items-end">
              {/* ── Interactive Phone ── */}
              <div
                style={{ perspective: "800px" }}
              >
                <div
                  className="transition-transform duration-300 ease-out relative"
                  style={{
                    transform: `rotateX(${pos.rx}deg) rotateY(${pos.ry}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <PhoneSimulator reflectionAngle={135 + pos.ry * 2} onInteracting={setInteracting} />
                  {/* Floating glow behind phone */}
                  <div className="absolute -inset-8 rounded-[3rem] bg-[hsl(250,50%,50%)] opacity-[0.04] blur-[40px] group-hover:opacity-[0.08] transition-opacity duration-700 -z-10" />
                </div>
              </div>

              {/* ── Feature pills (2x2 grid) ── */}
              <div className="grid grid-cols-2 gap-2 w-full max-w-[260px]">
                {features.map((feat, i) => {
                  const Icon = featureIcons[i];
                  return (
                    <div
                      key={feat.label}
                      className="relative rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 transition-all duration-300 hover:bg-white/[0.06] hover:border-white/[0.1] group/feat"
                      style={{
                        transform: `translate(${pos.mx * (0.3 + i * 0.15)}px, ${pos.my * (0.3 + i * 0.15)}px)`,
                        transition: "transform 0.3s ease-out, background-color 0.3s, border-color 0.3s",
                      }}
                    >
                      <Icon className="w-3.5 h-3.5 text-muted-foreground/60 mb-1.5 group-hover/feat:text-muted-foreground transition-colors" />
                      <p className="text-[11px] font-medium text-foreground/80 leading-tight">{feat.label}</p>
                      <p className="text-[10px] text-muted-foreground/50 leading-tight mt-0.5">{feat.detail}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
