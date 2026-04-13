import { useRef, useState, ReactNode } from "react";
import { useHasHover } from "@/hooks/use-mobile";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  strength?: number;
}

const MagneticButton = ({ children, className = "", href, strength = 0.3 }: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hasHover = useHasHover();

  const handleMove = (e: React.MouseEvent) => {
    if (!hasHover) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  const content = (
    <div
      ref={ref}
      onMouseMove={hasHover ? handleMove : undefined}
      onMouseLeave={hasHover ? handleLeave : undefined}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      style={{ transform: hasHover ? `translate(${pos.x}px, ${pos.y}px)` : undefined }}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
};

export default MagneticButton;
