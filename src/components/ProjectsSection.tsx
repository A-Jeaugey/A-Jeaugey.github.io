import ProjectCard from "./ProjectCard";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

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
  const ref = useScrollFadeIn();

  return (
    <section id="projects" className="py-24 sm:py-32">
      <div ref={ref} className="fade-section max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-mono text-muted-foreground mb-10 tracking-wider uppercase">
          Projects
        </h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
