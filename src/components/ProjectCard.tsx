import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
}

const ProjectCard = ({ title, description, techStack, link }: ProjectCardProps) => {
  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground/10 hover:shadow-[0_0_40px_-12px_hsl(260_50%_50%/0.15)]">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors mt-0.5"
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
            className="font-mono text-xs text-muted-foreground/70 bg-secondary px-2.5 py-1 rounded-md"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProjectCard;
