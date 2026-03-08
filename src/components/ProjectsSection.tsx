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
  const { containerRef, visibleItems } = useStaggerReveal(projects.length, 150);
  const { ref: parallaxRef, offset } = useParallax(0.08);

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div ref={parallaxRef} className="max-w-5xl mx-auto px-6" style={{ transform: `translateY(${offset}px)` }}>
        <div ref={containerRef}>
          <h2
            className="text-sm font-mono text-muted-foreground mb-10 tracking-wider uppercase transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            Projects
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} {...project} visible={visibleItems[i]} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
