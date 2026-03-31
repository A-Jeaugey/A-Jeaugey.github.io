import ProjectCard from "./ProjectCard";
import FeaturedProjectCard from "./FeaturedProjectCard";
import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

const techStacks = [
  ["Flutter", "Dart", "FastAPI", "Gemini", "Supabase", "pgvector"],
  ["Python", "Matplotlib", "NumPy"],
  ["Python", "scikit-learn", "XGBoost", "Pandas"],
];

const links = ["https://github.com/A-Jeaugey/PI-THON", "https://github.com/A-Jeaugey/bias-corrector-weather"];

const ProjectsSection = () => {
  // +1 for heading, +1 for featured card, +2 for regular projects = 4
  const { containerRef, visibleItems } = useStaggerReveal(4, 150);
  const { ref: parallaxRef, offset } = useParallax(0.08);
  const { t } = useLanguage();

  const items: { title: string; description: string }[] = t("projects.items");
  const featured = t("projects.featured") as { title: string; description: string };

  const otherProjects = items.map((item, i) => ({
    title: item.title,
    description: item.description,
    techStack: techStacks[i + 1],
    link: links[i],
  }));

  return (
    <section id="projects" className="py-28 sm:py-32">
      <div ref={parallaxRef} className="max-w-5xl mx-auto px-6" style={{ transform: `translateY(${offset}px)` }}>
        <div ref={containerRef}>
          <div
            className="mb-12 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{t("projects.title")}</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              {t("projects.description")}
            </p>
          </div>

          {/* Featured: ISU */}
          <FeaturedProjectCard
            title={featured.title}
            description={featured.description}
            techStack={techStacks[0]}
            appLink="https://app.isu.gg"
            playStoreLink="https://play.google.com/store/apps/details?id=com.isu.gg"
            visible={visibleItems[1]}
          />

          {/* Other projects */}
          <div className="grid gap-5 md:grid-cols-2">
            {otherProjects.map((project, i) => (
              <ProjectCard key={project.title} {...project} visible={visibleItems[i + 2]} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
