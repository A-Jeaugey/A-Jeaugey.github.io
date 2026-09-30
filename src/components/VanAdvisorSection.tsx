import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const SITE_URL = "https://vanadvisor.fr";
const SLIDE_MS = 5000;

// VanAdvisor's own palette, used to light up the showcase
const VA_ORANGE = "#ec7c0e";
const VA_GREEN = "#1b3a26";

const screens = [
  { key: "home", path: "/" },
  { key: "quiz", path: "/#q1" },
  { key: "fiche", path: "/camping-car/pilote-pacific-p740fc/" },
  { key: "catalogue", path: "/catalogue/" },
];

const stack = ["Astro", "Cloudflare Workers", "Cloudflare D1", "Gemini", "Resend"];

interface ScreenText {
  title: string;
  caption: string;
  alt: string;
}

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

const VanAdvisorSection = () => {
  const { t } = useLanguage();
  const headerRef = useScrollFadeIn();
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  const texts: ScreenText[] = t("vanadvisor.screens");
  const running = inView && !hovered && !reducedMotion;
  const next = () => setActive((i) => (i + 1) % screens.length);

  // Only cycle through the screens while the showcase is on screen
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // The browser window arrives tilted back and straightens up as it scrolls into view,
  // while the phone slides up into place.
  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    const phone = phoneRef.current;
    if (!stage || !frame || !phone || reducedMotion) return;
    let raf = 0;

    const update = () => {
      raf = 0;
      const { top } = stage.getBoundingClientRect();
      const progress = clamp01((window.innerHeight - top) / (window.innerHeight * 0.75));
      const eased = 1 - Math.pow(1 - progress, 3);
      frame.style.transform = `perspective(1600px) rotateX(${((1 - eased) * 22).toFixed(2)}deg) scale(${(0.9 + 0.1 * eased).toFixed(3)})`;
      phone.style.transform = `translateY(${((1 - eased) * 80).toFixed(1)}px)`;
      phone.style.opacity = String(clamp01(eased * 1.4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const target = (active + step + screens.length) % screens.length;
    setActive(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <section id="vanadvisor" className="py-16 sm:py-24 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div ref={headerRef} className="fade-section flex flex-col items-center text-center">
          <div className="max-w-xl">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="w-6 h-px bg-foreground/20" />
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.25em]">
                {t("vanadvisor.label")}
              </span>
              <span className="w-6 h-px bg-foreground/20" />
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 tracking-tight">
              {t("vanadvisor.title")}
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{t("vanadvisor.tagline")}</p>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground/50">{t("vanadvisor.credit")}</p>
          </div>
          <a
            href={SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
            style={{ backgroundColor: VA_ORANGE, color: "#10231a", boxShadow: `0 10px 40px -12px ${VA_ORANGE}` }}
          >
            {t("vanadvisor.visit")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="max-w-4xl mx-auto" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
          <div
            ref={stageRef}
            id="vanadvisor-screen"
            role="tabpanel"
            aria-labelledby={`vanadvisor-tab-${active}`}
            className="relative mt-12 sm:mt-16 mb-10 sm:mb-14"
          >
            {/* The product's colours spilling out behind the screens */}
            <div
              aria-hidden
              className="absolute -inset-x-8 -top-8 -bottom-16 pointer-events-none"
              style={{
                background: `radial-gradient(55% 55% at 40% 45%, ${VA_GREEN}, transparent 70%), radial-gradient(35% 40% at 78% 70%, ${VA_ORANGE}40, transparent 70%)`,
                filter: "blur(48px)",
                opacity: 0.9,
              }}
            />

            <div ref={frameRef} className="relative origin-bottom will-change-transform">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#141416] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.85)]">
                <div className="flex items-center gap-3 px-3 sm:px-4 h-8 sm:h-10 border-b border-white/[0.06] bg-[#1a1a1d]">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <span key={dot} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white/15" />
                    ))}
                  </div>
                  <div className="flex-1 flex justify-center min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0 max-w-xs rounded-md bg-white/[0.05] px-3 py-0.5 sm:py-1 font-mono text-[9px] sm:text-[11px] text-muted-foreground/70">
                      <Lock className="h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0" />
                      <span className="truncate">vanadvisor.fr{screens[active].path}</span>
                    </div>
                  </div>
                  <div className="w-8 sm:w-12" />
                </div>
                <div className="relative aspect-[16/10] bg-[#f7f3ea]">
                  {screens.map((screen, i) => (
                    <img
                      key={screen.key}
                      src={`/vanadvisor/${screen.key}-desktop.webp`}
                      alt={i === active ? texts[i].alt : ""}
                      aria-hidden={i !== active}
                      width={1920}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700",
                        i === active ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div
              ref={phoneRef}
              aria-hidden
              className="absolute right-3 sm:-right-6 -bottom-8 sm:-bottom-12 w-[26%] min-w-[84px] max-w-[200px] will-change-transform"
            >
              <div className="rounded-[1.1rem] sm:rounded-[1.9rem] p-1 sm:p-[7px] bg-[#0e0e10] border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                <div className="relative overflow-hidden rounded-[0.8rem] sm:rounded-[1.45rem] aspect-[390/844] bg-[#f7f3ea]">
                  {screens.map((screen, i) => (
                    <img
                      key={screen.key}
                      src={`/vanadvisor/${screen.key}-mobile.webp`}
                      alt=""
                      width={450}
                      height={974}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700",
                        i === active ? "opacity-100" : "opacity-0"
                      )}
                    />
                  ))}
                  <span className="absolute top-1 sm:top-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1.5 sm:h-3 rounded-full bg-black/90" />
                </div>
              </div>
            </div>
          </div>

          <div
            role="tablist"
            aria-label={t("vanadvisor.screensLabel")}
            onKeyDown={onTabKeyDown}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6 pt-6"
          >
            {screens.map((screen, i) => {
              const selected = i === active;
              return (
                <button
                  key={screen.key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`vanadvisor-tab-${i}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="vanadvisor-screen"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className="group text-left rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/30 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <div className="h-px bg-white/10 overflow-hidden mb-4">
                    {selected && (
                      <div
                        key={active}
                        className="h-full origin-left"
                        style={{
                          backgroundColor: VA_ORANGE,
                          ...(reducedMotion
                            ? {}
                            : {
                                animation: `showcase-progress ${SLIDE_MS}ms linear forwards`,
                                animationPlayState: running ? "running" : "paused",
                              }),
                        }}
                        onAnimationEnd={next}
                      />
                    )}
                  </div>
                  <p
                    className={cn(
                      "text-sm font-medium transition-colors duration-300",
                      selected ? "text-foreground" : "text-muted-foreground group-hover:text-foreground/80"
                    )}
                  >
                    {texts[i].title}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xs leading-relaxed transition-colors duration-300",
                      selected ? "text-muted-foreground" : "text-muted-foreground/50"
                    )}
                  >
                    {texts[i].caption}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <p className="mt-10 text-center font-mono text-[11px] text-muted-foreground/40">{stack.join(" · ")}</p>
      </div>
    </section>
  );
};

export default VanAdvisorSection;
