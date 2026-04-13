import { ExternalLink } from "lucide-react";
import { useMouseTilt } from "@/hooks/useScrollFadeIn";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  link?: string;
  visible?: boolean;
  index?: number;
  badge?: string;
  badgeColor?: string;
}

const ProjectCard = ({ title, description, techStack, link, visible = true, index = 0, badge, badgeColor }: ProjectCardProps) => {
  const { ref, transform } = useMouseTilt(6);

  return (
    <div
      ref={ref}
      className="group relative rounded-xl border border-white/[0.06] bg-card p-6 transition-all duration-300 ease-out hover:border-white/[0.12] hover:-translate-y-1 active:border-white/[0.12] active:scale-[0.98]"
      style={{
        transform: visible ? transform : "perspective(600px) translateY(40px) scale(0.95)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
        willChange: "transform, opacity",
        ...(badgeColor ? { borderColor: `${badgeColor}20` } : {}),
      }}
    >
      {/* Hover glow + shadow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: badgeColor
          ? `0 8px 32px rgba(0,0,0,0.4), 0 0 50px -12px ${badgeColor}30, inset 0 1px 0 ${badgeColor}10`
          : "0 8px 32px rgba(0,0,0,0.4), 0 0 50px -12px hsla(210, 40%, 60%, 0.15), inset 0 1px 0 hsla(210, 40%, 80%, 0.06)"
        }}
      />
      {/* Subtle bg lighten on hover */}
      <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/[0.02] transition-colors duration-300 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-foreground transition-colors">{title}</h3>
            {badge && (
              <span
                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full animate-pulse"
                style={{ color: badgeColor, backgroundColor: `${badgeColor}15`, border: `1px solid ${badgeColor}30` }}
              >
                {badge}
              </span>
            )}
          </div>
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
              className="font-mono text-xs text-muted-foreground/70 bg-white/[0.06] px-2.5 py-1 rounded-md transition-colors duration-300 group-hover:text-muted-foreground group-hover:bg-white/[0.08]"
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
