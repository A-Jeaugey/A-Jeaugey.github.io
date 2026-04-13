import { useRef, useEffect, useState } from "react";

interface LabCardProps {
  title: string;
  description: string;
  category: string;
  visible?: boolean;
}

const LabCard = ({ title, description, category, visible = true }: LabCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const hasHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasHover) return;

    const el = cardRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    el.addEventListener("mousemove", handleMove);
    return () => el.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-lg border border-white/[0.06] bg-card/50 p-5 transition-all duration-300 ease-out hover:border-white/[0.12] hover:bg-card hover:-translate-y-1 active:border-white/[0.12] active:scale-[0.98] overflow-hidden"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)",
        transition: "opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      {/* Mouse-follow spotlight */}
      <div
        className="absolute pointer-events-none transition-opacity duration-500 rounded-full"
        style={{
          left: mousePos.x - 80,
          top: mousePos.y - 80,
          width: 160,
          height: 160,
          background: "radial-gradient(circle, hsla(210, 30%, 70%, 0.08) 0%, transparent 70%)",
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Hover shadow */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.3)" }}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <span className="font-mono text-[11px] text-muted-foreground/60 uppercase tracking-widest inline-block transition-all duration-300 group-hover:text-muted-foreground/80 group-hover:tracking-[0.2em]">
              {category}
            </span>
            <h3 className="text-sm font-medium text-foreground mt-2 mb-2 transition-colors duration-300">{title}</h3>
          </div>
          <span className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-all duration-300 group-hover:translate-x-1 mt-1 text-sm select-none">
            ›
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed transition-colors duration-300 group-hover:text-muted-foreground/90">{description}</p>
      </div>
    </div>
  );
};

export default LabCard;
