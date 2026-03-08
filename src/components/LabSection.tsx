import LabCard from "./LabCard";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

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
  const ref = useScrollFadeIn();

  return (
    <section id="lab" className="py-24 sm:py-32">
      <div ref={ref} className="fade-section max-w-5xl mx-auto px-6">
        <h2 className="text-sm font-mono text-muted-foreground mb-10 tracking-wider uppercase">
          Lab
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp) => (
            <LabCard key={exp.title} {...exp} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LabSection;
