import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const SectionDivider = () => {
  const ref = useScrollFadeIn();

  return (
    <div ref={ref} className="fade-section flex items-center justify-center py-4">
      <div className="flex items-center gap-3">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-foreground/10" />
        <div className="w-1.5 h-1.5 rounded-full bg-foreground/10 animate-pulse" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-foreground/10" />
      </div>
    </div>
  );
};

export default SectionDivider;
