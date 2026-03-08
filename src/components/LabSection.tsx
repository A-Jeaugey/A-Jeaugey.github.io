import { useStaggerReveal, useParallax } from "@/hooks/useScrollFadeIn";
import { useRef, useState, useEffect, useCallback } from "react";
import { X, ExternalLink, ChevronRight } from "lucide-react";

interface ExperimentDetail {
  title: string;
  description: string;
  category: string;
  status: string;
  slug: string;
  report: {
    summary: string;
    highlights: string[];
    metrics?: { label: string; value: string }[];
    tools: string[];
    links?: { label: string; url: string }[];
  };
}

const experiments: ExperimentDetail[] = [
  {
    title: "Running Local LLMs on Consumer GPUs",
    description: "Tested Mistral 7B and Llama 2 on consumer GPUs. Explored VRAM limits, quantization tradeoffs, and inference speed.",
    category: "AI",
    status: "completed",
    slug: "local-llms",
    report: {
      summary: "Comprehensive benchmarking of open-source LLMs on consumer-grade NVIDIA GPUs. Tested inference throughput, memory consumption, and output quality across different quantization levels.",
      highlights: [
        "Mistral 7B runs at ~25 tok/s on RTX 3060 12GB with 4-bit quantization",
        "8-bit models maintain 98.5% of full-precision quality",
        "VRAM is the primary bottleneck — not compute",
        "llama.cpp outperforms transformers library for inference speed",
      ],
      metrics: [
        { label: "Models tested", value: "6" },
        { label: "Avg. tok/s (4-bit)", value: "25.3" },
        { label: "VRAM peak", value: "11.2 GB" },
        { label: "Quality retention", value: "98.5%" },
      ],
      tools: ["llama.cpp", "CUDA 12.1", "Python", "NVIDIA 3060 12GB"],
    },
  },
  {
    title: "GPU Memory & Quantization Benchmarks",
    description: "Benchmarked 4-bit vs 8-bit quantization on a 3060 12GB. Measured perplexity degradation against memory savings.",
    category: "AI",
    status: "completed",
    slug: "quantization",
    report: {
      summary: "Systematic comparison of quantization methods (GPTQ, AWQ, GGUF) measuring the tradeoff between model size reduction and output quality degradation.",
      highlights: [
        "AWQ 4-bit achieves best quality-to-size ratio",
        "GGUF format enables CPU offloading for larger models",
        "Perplexity increase is <2% for most 4-bit methods",
        "8-bit is effectively lossless for instruction-following tasks",
      ],
      metrics: [
        { label: "Methods compared", value: "4" },
        { label: "Best compression", value: "4.2x" },
        { label: "Perplexity delta", value: "<2%" },
        { label: "Memory saved", value: "~60%" },
      ],
      tools: ["GPTQ", "AWQ", "GGUF", "lm-eval-harness"],
    },
  },
  {
    title: "TryHackMe — Offensive Security",
    description: "Working through offensive security challenges. Learning network enumeration, privilege escalation, and web exploitation.",
    category: "Security",
    status: "in-progress",
    slug: "tryhackme",
    report: {
      summary: "Hands-on offensive security training through structured CTF challenges. Covering the full kill chain from reconnaissance to post-exploitation.",
      highlights: [
        "Completed 40+ rooms across different difficulty levels",
        "Focused on Linux privilege escalation techniques",
        "Built custom enumeration scripts in Python",
        "Currently exploring Active Directory attack paths",
      ],
      metrics: [
        { label: "Rooms cleared", value: "42" },
        { label: "Current streak", value: "12 days" },
        { label: "Top category", value: "PrivEsc" },
      ],
      tools: ["Nmap", "Burp Suite", "Metasploit", "Python", "Gobuster"],
      links: [{ label: "TryHackMe Profile", url: "https://tryhackme.com" }],
    },
  },
  {
    title: "Development Workstation Build",
    description: "Built a workstation optimized for local ML inference. Documented component choices and thermal management.",
    category: "Hardware",
    status: "completed",
    slug: "workstation",
    report: {
      summary: "Custom-built development workstation designed for running local AI models, compiling large projects, and hosting dev environments. Optimized for sustained GPU loads.",
      highlights: [
        "Dual-fan GPU stays under 72°C at sustained load",
        "NVMe RAID-0 for fast dataset loading",
        "32GB RAM allows multiple models in memory",
        "Total build cost under €1200",
      ],
      metrics: [
        { label: "GPU temp (load)", value: "72°C" },
        { label: "Build cost", value: "€1,180" },
        { label: "Storage speed", value: "5.2 GB/s" },
        { label: "RAM", value: "32 GB" },
      ],
      tools: ["RTX 3060 12GB", "Ryzen 5 5600X", "NVMe Gen4", "Ubuntu 22.04"],
    },
  },
  {
    title: "3D Printing & Iterative Prototyping",
    description: "Designing and printing functional parts. Learning CAD modeling, slicer tuning, and material properties.",
    category: "Hardware",
    status: "in-progress",
    slug: "3d-printing",
    report: {
      summary: "Exploring additive manufacturing through iterative design cycles. From CAD modeling to final functional prints, optimizing for strength, precision, and material efficiency.",
      highlights: [
        "Achieved ±0.15mm dimensional accuracy on functional parts",
        "Tested PLA, PETG, and TPU for different use cases",
        "Custom cooling duct design improved overhang quality by 40%",
        "Built a library of reusable parametric components",
      ],
      metrics: [
        { label: "Parts printed", value: "80+" },
        { label: "Accuracy", value: "±0.15mm" },
        { label: "Materials", value: "3" },
        { label: "Print hours", value: "400+" },
      ],
      tools: ["Fusion 360", "PrusaSlicer", "Ender 3 V2", "Calipers"],
    },
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
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentDetail | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bootDone = useRef(false);

  const scrollTerminal = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  // Terminal boot sequence
  useEffect(() => {
    if (!visibleItems[0] || bootDone.current) return;
    bootDone.current = true;

    const lines = [
      "$ cd ~/lab",
      "$ ls -la experiments/",
      `total ${experiments.length}`,
      ...experiments.map(
        (e) => `drwxr-xr-x  ${e.status === "in-progress" ? "⚡" : "✓"} ${e.category.toLowerCase().padEnd(10)} ${e.title}`
      ),
      "",
      "Click an experiment to inspect →",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        const line = lines[i];
        i++;
        setTerminalLines((prev) => [...prev, line]);
        scrollTerminal();
      } else {
        clearInterval(interval);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [visibleItems, scrollTerminal]);

  // Handle card click → type command → show detail
  const handleCardClick = useCallback((exp: ExperimentDetail, index: number) => {
    if (isTyping) return;
    setIsTyping(true);

    // Close any open detail
    setIsDetailVisible(false);
    setSelectedExperiment(null);

    const command = `$ cat experiments/${exp.slug}/README.md`;
    const outputLines = [
      "",
      `───────────────────────────────────`,
      `  ${exp.title}`,
      `  [${exp.category}] — ${exp.status}`,
      `───────────────────────────────────`,
      "",
      `  ${exp.report.summary.slice(0, 80)}...`,
      "",
      `  → Opening full report...`,
    ];

    // Type the command character by character
    let charIndex = 0;
    const typingLine = { current: "" };

    // Add empty line for the command being typed
    setTerminalLines((prev) => [...prev, ""]);
    scrollTerminal();

    const typeInterval = setInterval(() => {
      if (charIndex < command.length) {
        typingLine.current += command[charIndex];
        charIndex++;
        setTerminalLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = typingLine.current;
          return next;
        });
        scrollTerminal();
      } else {
        clearInterval(typeInterval);

        // After command typed, output result lines
        let outIndex = 0;
        const outInterval = setInterval(() => {
          if (outIndex < outputLines.length) {
            const line = outputLines[outIndex];
            outIndex++;
            setTerminalLines((prev) => [...prev, line]);
            scrollTerminal();
          } else {
            clearInterval(outInterval);
            // Show the detail card
            setSelectedExperiment(exp);
            setTimeout(() => {
              setIsDetailVisible(true);
              setIsTyping(false);
            }, 100);
          }
        }, 60);
      }
    }, 35);
  }, [isTyping, scrollTerminal]);

  const closeDetail = useCallback(() => {
    setIsDetailVisible(false);
    setTimeout(() => {
      setSelectedExperiment(null);
      setTerminalLines((prev) => [...prev, "", "$ _"]);
      scrollTerminal();
    }, 400);
  }, [scrollTerminal]);

  return (
    <section id="lab" className="py-24 sm:py-32 relative">
      {/* Grid background */}
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
          {/* Header */}
          <div
            className="mb-12 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(20px)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="font-mono text-xs text-muted-foreground/40 tracking-wider">~/lab</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Lab</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Where I break things, benchmark stuff, and push hardware to its limits.
            </p>
          </div>

          {/* Terminal + Cards */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Terminal */}
            <div
              className="lg:col-span-2 rounded-xl border border-border bg-card/80 overflow-hidden transition-all duration-700 self-start lg:sticky lg:top-24"
              style={{
                opacity: visibleItems[0] ? 1 : 0,
                transform: visibleItems[0] ? "translateX(0)" : "translateX(-30px)",
              }}
            >
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(45 80% 50% / 0.6)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(140 60% 45% / 0.6)" }} />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/50 ml-2">arthur@lab:~/experiments</span>
                {isTyping && (
                  <span className="ml-auto font-mono text-[9px] text-muted-foreground/30 animate-pulse">running...</span>
                )}
              </div>
              <div
                ref={terminalRef}
                className="p-4 h-[360px] overflow-y-auto font-mono text-[11px] leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
              >
                {terminalLines.map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.startsWith("$")
                        ? "text-foreground/80"
                        : line.startsWith("─")
                        ? "text-muted-foreground/30"
                        : line.startsWith("  →")
                        ? "text-foreground/60"
                        : line.includes("⚡")
                        ? "text-muted-foreground"
                        : line.includes("✓")
                        ? "text-muted-foreground/60"
                        : line === "Click an experiment to inspect →"
                        ? "text-muted-foreground/30 italic"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {line.startsWith("$") ? (
                      <>
                        <span style={{ color: "hsl(140 50% 55%)" }}>$</span>
                        {line.slice(1)}
                      </>
                    ) : line.startsWith("  →") ? (
                      <>
                        <span style={{ color: "hsl(210 60% 60%)" }}>  →</span>
                        {line.slice(3)}
                      </>
                    ) : (
                      line
                    )}
                  </div>
                ))}
                {/* Blinking cursor when idle */}
                {!isTyping && (
                  <span
                    className="inline-block w-1.5 h-3 bg-foreground/50"
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
                const isSelected = selectedExperiment?.slug === exp.slug;

                return (
                  <div
                    key={exp.title}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                    onClick={() => handleCardClick(exp, i)}
                    className={`group relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-foreground/20 bg-card"
                        : "border-border bg-card/50 hover:border-foreground/10 hover:bg-card/80"
                    }`}
                    style={{
                      opacity: visibleItems[i] ? 1 : 0,
                      transform: visibleItems[i]
                        ? isActive ? "translateX(4px)" : "translateX(0)"
                        : "translateY(20px)",
                      transition: "opacity 0.5s ease-out, transform 0.3s ease-out, border-color 0.3s, background-color 0.3s",
                    }}
                  >
                    {/* Left accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
                      style={{
                        background: `hsl(${color})`,
                        opacity: isSelected ? 1 : isActive ? 0.8 : 0.2,
                      }}
                    />

                    <div className="px-5 py-4 pl-6 flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-0.5">
                          <h3 className="text-sm font-medium text-foreground">{exp.title}</h3>
                          {exp.status === "in-progress" && (
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                background: `hsl(${color})`,
                                animation: "pulse-dot 2s ease-in-out infinite",
                              }}
                            />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground/50 font-mono">{exp.category}</p>
                      </div>
                      <ChevronRight
                        className="h-4 w-4 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Detail overlay */}
      {selectedExperiment && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
          style={{
            opacity: isDetailVisible ? 1 : 0,
            transition: "opacity 0.4s ease-out",
            pointerEvents: isDetailVisible ? "auto" : "none",
          }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={closeDetail}
          />

          {/* Detail card */}
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
            style={{
              transform: isDetailVisible ? "translateY(0) scale(1)" : "translateY(30px) scale(0.96)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: `hsl(${categoryColors[selectedExperiment.category]})` }}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    {selectedExperiment.category}
                  </span>
                  {selectedExperiment.status === "in-progress" && (
                    <span className="font-mono text-[10px] uppercase tracking-wider" style={{ color: `hsl(${categoryColors[selectedExperiment.category]} / 0.7)` }}>
                      · Active
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground">{selectedExperiment.title}</h3>
              </div>
              <button
                onClick={closeDetail}
                className="p-2 -mr-2 -mt-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Summary */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedExperiment.report.summary}
              </p>

              {/* Metrics */}
              {selectedExperiment.report.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedExperiment.report.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-border bg-secondary/30 p-3 text-center"
                      style={{
                        animation: `fade-in 0.3s ease-out ${i * 0.08}s both`,
                      }}
                    >
                      <div className="text-lg font-bold text-foreground font-mono">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              <div>
                <h4 className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">Key Findings</h4>
                <div className="space-y-2">
                  {selectedExperiment.report.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                      style={{ animation: `fade-in 0.3s ease-out ${i * 0.06}s both` }}
                    >
                      <span
                        className="w-1 h-1 rounded-full mt-2 flex-shrink-0"
                        style={{ background: `hsl(${categoryColors[selectedExperiment.category]})` }}
                      />
                      {h}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExperiment.report.tools.map((tool) => (
                    <span
                      key={tool}
                      className="font-mono text-xs text-muted-foreground/70 bg-secondary px-2.5 py-1 rounded-md"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {selectedExperiment.report.links && (
                <div className="pt-2 border-t border-border">
                  {selectedExperiment.report.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors group"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span className="relative">
                        {link.label}
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-foreground/30 transition-all duration-300 group-hover:w-full" />
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Footer terminal hint */}
            <div className="px-6 py-3 border-t border-border bg-secondary/20">
              <span className="font-mono text-[10px] text-muted-foreground/30">
                experiments/{selectedExperiment.slug}/README.md — {selectedExperiment.report.highlights.length} findings · {selectedExperiment.report.tools.length} tools
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LabSection;
