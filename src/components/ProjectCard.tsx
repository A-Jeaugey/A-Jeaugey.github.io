import { ExternalLink } from "lucide-react";
import { useMouseTilt } from "@/hooks/useScrollFadeIn";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  visible?: boolean;
  index?: number;
}

const ProjectCard = ({ title, description, techStack, link, visible = true, index = 0 }: ProjectCardProps) => {
  const { ref, transform } = useMouseTilt(6);

  return (
    <div
      ref={ref}
      className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-500 ease-out hover:border-foreground/15"
      style={{
        transform: visible ? transform : "perspective(600px) translateY(40px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        willChange: "transform, opacity",
      }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: "0 0 50px -12px hsla(210, 40%, 60%, 0.15), inset 0 1px 0 hsla(210, 40%, 80%, 0.06)" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground transition-colors">{title}</h3>
          {link && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-all duration-300 mt-0.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-xs text-muted-foreground/70 bg-secondary px-2.5 py-1 rounded-md transition-colors duration-300 group-hover:text-muted-foreground group-hover:bg-secondary/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
