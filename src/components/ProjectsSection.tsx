import ProjectCard from "./ProjectCard";
import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

const techStacks = [
  ["React Native", "TypeScript", "LLM APIs", "Node.js"],
  ["Python", "Matplotlib", "NumPy"],
  ["Python", "scikit-learn", "XGBoost", "Pandas"],
];

const links = ["https://app.isu.gg", "https://github.com/A-Jeaugey/PI-THON", "https://github.com/A-Jeaugey/bias-corrector-weather"];

const ProjectsSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(techStacks.length + 1, 150);
  const { ref: parallaxRef, offset } = useParallax(0.08);
  const { t } = useLanguage();

  const items: { title: string; description: string }[] = t("projects.items");

  const projects = items.map((item, i) => ({
    title: item.title,
    description: item.description,
    techStack: techStacks[i],
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
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} visible={visibleItems[i + 1]} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
