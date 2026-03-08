import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";
import { useRef, useState, useEffect } from "react";

const experiments = [
  {
    title: "Running Local LLMs on Consumer GPUs",
    description:
      "Tested Mistral 7B and Llama 2 on consumer GPUs. Explored VRAM limits, quantization tradeoffs, and inference speed at different precision levels.",
    category: "AI",
    status: "completed",
  },
  {
    title: "GPU Memory & Quantization Benchmarks",
    description:
      "Benchmarked 4-bit vs 8-bit quantization on a 3060 12GB. Measured perplexity degradation against memory savings.",
    category: "AI",
    status: "completed",
  },
  {
    title: "TryHackMe — Offensive Security",
    description:
      "Working through offensive security challenges. Learning network enumeration, privilege escalation, and web exploitation techniques.",
    category: "Security",
    status: "in-progress",
  },
  {
    title: "Development Workstation Build",
    description:
      "Built a development workstation optimized for local ML inference. Documented component choices, thermal management, and cost-performance tradeoffs.",
    category: "Hardware",
    status: "completed",
  },
  {
    title: "3D Printing & Iterative Prototyping",
    description:
      "Designing and printing functional parts. Learning CAD modeling, slicer tuning, and material properties through iterative prototyping.",
    category: "Hardware",
    status: "in-progress",
  },
];

const categoryColors: Record<string, string> = {
  AI: "210 60% 55%",
  Security: "0 60% 55%",
  Hardware: "150 50% 45%",
};

const LabSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(experiments.length + 1, 120);
  const { ref: parallaxRef, offset } = useParallax(0.06);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Terminal boot sequence on section visible
  useEffect(() => {
    if (!visibleItems[0]) return;

    const lines = [
      "$ cd ~/lab",
      "$ ls -la experiments/",
      `total ${experiments.length}`,
      ...experiments.map(
        (e) => `drwxr-xr-x  ${e.status === "in-progress" ? "⚡" : "✓"} ${e.category.toLowerCase().padEnd(10)} ${e.title}`
      ),
      "$ _",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        const line = lines[i];
        i++;
        setTerminalLines((prev) => [...prev, line]);
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [visibleItems[0]]);

  return (
    <section id="lab" className="py-24 sm:py-32 relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div ref={parallaxRef} className="max-w-5xl mx-auto px-6 relative" style={{ transform: `translateY(${offset}px)` }}>
        <div ref={containerRef}>
          {/* Section header with terminal aesthetic */}
          <div
            className="mb-12 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(45 80% 50% / 0.6)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(140 60% 45% / 0.6)" }} />
              </div>
              <span className="font-mono text-xs text-muted-foreground/50">~/lab</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Lab
            </h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Where I break things, benchmark stuff, and push hardware to its limits.
            </p>
          </div>

          {/* Terminal + Cards layout */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Mini terminal */}
            <div
              className="lg:col-span-2 rounded-xl border border-border bg-card/80 overflow-hidden transition-all duration-700 self-start lg:sticky lg:top-24"
              style={{
                opacity: visibleItems[0] ? 1 : 0,
                transform: visibleItems[0] ? "translateX(0)" : "translateX(-30px)",
              }}
            >
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-foreground/10" />
                <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-wider">Terminal</span>
              </div>
              <div
                ref={terminalRef}
                className="p-4 h-[320px] overflow-y-auto font-mono text-xs leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
              >
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`${
                      line.startsWith("$")
                        ? "text-foreground/80"
                        : line.includes("⚡")
                        ? "text-muted-foreground"
                        : line.includes("✓")
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/40"
                    }`}
                    style={{
                      animation: "fade-in 0.2s ease-out",
                    }}
                  >
                    {line.startsWith("$") ? (
                      <>
                        <span style={{ color: "hsl(140 50% 55%)" }}>$</span>
                        {line.slice(1)}
                      </>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                {/* Blinking cursor */}
                {terminalLines.length > 0 && terminalLines[terminalLines.length - 1] === "$ _" && (
                  <span
                    className="inline-block w-2 h-3.5 bg-foreground/60 ml-0.5 -mb-0.5"
                    style={{ animation: "blink-cursor 1s step-end infinite" }}
                  />
                )}
              </div>
            </div>

            {/* Experiment cards */}
            <div className="lg:col-span-3 space-y-3">
              {experiments.map((exp, i) => {
                const color = categoryColors[exp.category] || "210 50% 50%";
                const isActive = activeIndex === i;

                return (
                  <div
                    key={exp.title}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    className="group relative rounded-lg border border-border bg-card/50 overflow-hidden cursor-default transition-all duration-400 hover:border-foreground/10 hover:bg-card/80"
                    style={{
                      opacity: visibleItems[i] ? 1 : 0,
                      transform: visibleItems[i]
                        ? isActive
                          ? "translateX(4px)"
                          : "translateX(0)"
                        : "translateY(20px)",
                      transition: "opacity 0.5s ease-out, transform 0.3s ease-out, border-color 0.3s, background-color 0.3s",
                    }}
                  >
                    {/* Left accent bar */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                      style={{
                        background: `hsl(${color})`,
                        opacity: isActive ? 0.8 : 0.2,
                      }}
                    />

                    <div className="px-5 py-4 pl-6">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-3">
                          <h3 className="text-sm font-medium text-foreground transition-colors duration-300">
                            {exp.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {exp.status === "in-progress" && (
                            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
                              style={{ color: `hsl(${color} / 0.7)` }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{
                                  background: `hsl(${color})`,
                                  animation: "pulse-dot 2s ease-in-out infinite",
                                }}
                              />
                              Active
                            </span>
                          )}
                          <span
                            className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-widest px-2 py-0.5 rounded border border-border/50"
                          >
                            {exp.category}
                          </span>
                        </div>
                      </div>

                      <div
                        className="overflow-hidden transition-all duration-400 ease-out"
                        style={{
                          maxHeight: isActive ? "80px" : "0px",
                          opacity: isActive ? 1 : 0,
                        }}
                      >
                        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabSection;
