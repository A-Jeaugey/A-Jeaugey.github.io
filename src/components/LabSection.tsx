import LabCard from "./LabCard";
import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";

const experiments = [
  {
    title: "Running Local LLMs on Consumer GPUs",
    description:
      "Tested Mistral 7B and Llama 2 on consumer GPUs. Explored VRAM limits, quantization tradeoffs, and inference speed at different precision levels.",
    category: "AI",
  },
  {
    title: "GPU Memory & Quantization Benchmarks",
    description:
      "Benchmarked 4-bit vs 8-bit quantization on a 3060 12GB. Measured perplexity degradation against memory savings.",
    category: "AI",
  },
  {
    title: "TryHackMe — Offensive Security",
    description:
      "Working through offensive security challenges. Learning network enumeration, privilege escalation, and web exploitation techniques.",
    category: "Security",
  },
  {
    title: "Development Workstation Build",
    description:
      "Built a development workstation optimized for local ML inference. Documented component choices, thermal management, and cost-performance tradeoffs.",
    category: "Hardware",
  },
  {
    title: "3D Printing & Iterative Prototyping",
    description:
      "Designing and printing functional parts. Learning CAD modeling, slicer tuning, and material properties through iterative prototyping.",
    category: "Hardware",
  },
];

const LabSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(experiments.length, 100);
  const { ref: parallaxRef, offset } = useParallax(0.06);

  return (
    <section id="lab" className="py-24 sm:py-32">
      <div ref={parallaxRef} className="max-w-5xl mx-auto px-6" style={{ transform: `translateY(${offset}px)` }}>
        <div ref={containerRef}>
          <h2
            className="text-sm font-mono text-muted-foreground mb-10 tracking-wider uppercase transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateX(0)" : "translateX(-20px)",
            }}
          >
            Lab
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {experiments.map((exp, i) => (
              <LabCard key={exp.title} {...exp} visible={visibleItems[i]} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabSection;
