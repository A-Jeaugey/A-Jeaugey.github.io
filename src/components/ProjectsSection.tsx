import ProjectCard from "./ProjectCard";
import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";

const projects = [
  {
    title: "ISU",
    description:
      "A mobile app that uses AI to generate study materials from course content. Built with React Native, integrating LLM APIs for summarization and quiz generation.",
    techStack: ["React Native", "TypeScript", "LLM APIs", "Node.js"],
    link: "https://github.com",
  },
  {
    title: "π-thon",
    description:
      "A Python application that visualizes different mathematical methods for estimating π — Monte Carlo, Leibniz series, Buffon's needle — and compares their convergence rates.",
    techStack: ["Python", "Matplotlib", "NumPy"],
    link: "https://github.com",
  },
  {
    title: "Weather Forecast Bias Correction",
    description:
      "An ML pipeline that identifies and corrects systematic errors in numerical weather forecasts. Uses gradient boosting on historical forecast-observation pairs.",
    techStack: ["Python", "scikit-learn", "XGBoost", "Pandas"],
    link: "https://github.com",
  },
];

const ProjectsSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(projects.length + 1, 150);
  const { ref: parallaxRef, offset } = useParallax(0.08);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div ref={parallaxRef} className="max-w-5xl mx-auto px-6" style={{ transform: `translateY(${offset}px)` }}>
        <div ref={containerRef}>
          <div
            className="mb-12 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Projects</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Things I've built — apps, tools, and experiments.
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
