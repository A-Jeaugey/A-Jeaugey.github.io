import { ArrowRight } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";
import NightRoad from "./vanadvisor/NightRoad";
import { DirectionSign, SignIcon, TownSign, type SignKind } from "./vanadvisor/signs";

const SITE_URL = "https://vanadvisor.fr";

const storyIcons: SignKind[] = ["mandatory", "info", "danger", "noEntry"];

const stack = [
  "Astro",
  "JavaScript",
  "SVG",
  "Cloudflare Workers",
  "Cloudflare D1",
  "Resend",
  "Gemini",
  "Playwright",
  "GitHub Actions",
];

interface Milestone {
  label: string;
  before: string;
  after: string;
  detail: string;
}

interface Story {
  title: string;
  body: string;
}

const SubTitle = ({ children }: { children: string }) => (
  <h3 className="text-sm font-mono text-muted-foreground mb-6 tracking-wider uppercase">{children}</h3>
);

const VanAdvisorSection = () => {
  const { t } = useLanguage();
  const headerRef = useScrollFadeIn();
  const roadIntroRef = useScrollFadeIn();
  const storiesRef = useScrollFadeIn();
  const roleRef = useScrollFadeIn();

  const meta: string[] = t("vanadvisor.meta");
  const milestones: Milestone[] = t("vanadvisor.road.milestones");
  const stories: Story[] = t("vanadvisor.stories.items");

  return (
    <section id="vanadvisor" className="py-16 sm:py-24 md:py-28 relative overflow-hidden">
      {/* Night sky */}
      <div
        className="absolute inset-x-0 top-0 h-[70%] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(220 60% 45% / 0.07), transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div ref={headerRef} className="fade-section max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-px bg-foreground/20" />
            <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-[0.25em]">
              {t("vanadvisor.label")}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {t("vanadvisor.title")}
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">{t("vanadvisor.lede")}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 mb-8 font-mono text-[11px] text-muted-foreground/60">
            {meta.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#f5c542]/70" />
                {item}
              </li>
            ))}
          </ul>
          <DirectionSign href={SITE_URL} label="vanadvisor.fr" />
        </div>

        <div ref={roadIntroRef} className="fade-section mt-20 sm:mt-24 sm:text-center">
          <SubTitle>{t("vanadvisor.road.title")}</SubTitle>
          <p className="-mt-3 text-sm text-muted-foreground/80 max-w-md sm:mx-auto leading-relaxed">
            {t("vanadvisor.road.description")}
          </p>
        </div>

        <NightRoad
          count={milestones.length}
          renderRow={(i, lit, side) => {
            const milestone = milestones[i];
            return (
              <div
                className={cn(
                  "flex flex-col transition-opacity duration-500",
                  side === "left" && "sm:items-end sm:text-right",
                  lit ? "opacity-100" : "opacity-60"
                )}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-3">
                  <span className="text-[#f5c542]/80">{String(i + 1).padStart(2, "0")}</span> · {milestone.label}
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <TownSign
                    exit
                    value={milestone.before}
                    caption={t("vanadvisor.road.from")}
                    srLabel={t("vanadvisor.road.before")}
                    lit={lit}
                  />
                  <ArrowRight className="mb-3 h-4 w-4 shrink-0 text-muted-foreground/40" />
                  <TownSign
                    value={milestone.after}
                    caption={t("vanadvisor.road.to")}
                    srLabel={t("vanadvisor.road.after")}
                    lit={lit}
                  />
                </div>
                <p className="mt-3 text-xs text-muted-foreground/80 max-w-[19rem] leading-relaxed">
                  {milestone.detail}
                </p>
              </div>
            );
          }}
          renderFinale={(lit) => (
            <div className="flex flex-col sm:items-center sm:text-center">
              <TownSign
                large
                value={t("vanadvisor.road.finale.value")}
                caption={t("vanadvisor.road.finale.caption")}
                lit={lit}
              />
              <p className="mt-4 text-sm text-muted-foreground max-w-sm leading-relaxed">
                {t("vanadvisor.road.finale.detail")}
              </p>
            </div>
          )}
        />

        <div ref={storiesRef} className="fade-section mt-24 sm:mt-32">
          <SubTitle>{t("vanadvisor.stories.title")}</SubTitle>
          <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
            {stories.map((story, i) => (
              <article
                key={story.title}
                className="group rounded-2xl border border-white/[0.06] bg-card p-5 sm:p-6 transition-colors duration-300 hover:border-white/[0.12]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <SignIcon
                    kind={storyIcons[i]}
                    className="transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
                  />
                  <h4 className="text-base font-semibold text-foreground tracking-tight">{story.title}</h4>
                </div>
                <p className="text-[13px] text-muted-foreground/80 leading-relaxed">{story.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div ref={roleRef} className="fade-section mt-16 sm:mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <SubTitle>{t("vanadvisor.role.title")}</SubTitle>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{t("vanadvisor.role.body")}</p>
          </div>
          <div>
            <SubTitle>{t("vanadvisor.method.title")}</SubTitle>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">{t("vanadvisor.method.body")}</p>
          </div>
          <div className="md:col-span-2">
            <SubTitle>{t("vanadvisor.stackTitle")}</SubTitle>
            <div className="flex flex-wrap gap-2">
              {stack.map((tool) => (
                <span
                  key={tool}
                  className="font-mono text-xs text-muted-foreground/70 bg-secondary px-2.5 py-1 rounded-md"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VanAdvisorSection;
