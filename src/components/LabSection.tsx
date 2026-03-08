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
    exploring?: string[];
    metrics?: { label: string; value: string }[];
    tools: string[];
    links?: { label: string; url: string }[];
  };
}

const experiments: ExperimentDetail[] = [
  {
    title: "Running Local LLMs on Consumer Hardware",
    description: "Running local language models day-to-day — testing usability, responsiveness and real-world limits on my own machine.",
    category: "AI",
    status: "in-progress",
    slug: "local-llms",
    report: {
      summary: "Less about benchmarks, more about what it actually feels like to run modern language models locally. I've been using and switching between models to understand their real-world usability: speed, responsiveness, and where they break down.",
      highlights: [
        "Running GLM 4.7 Flash Q4_K_M as a daily local model",
        "Tested several models to compare output quality and responsiveness",
        "Noticed that model usability degrades well before VRAM is fully saturated",
        "Found that prompt length matters as much as model size for perceived speed",
      ],
      exploring: [
        "How different models handle long context windows locally",
        "The gap between local and cloud model usability in practice",
        "Which model sizes are actually useful vs just technically runnable",
      ],
      tools: ["Local LLM runtimes", "GGUF / quantized models", "RTX 5080", "Ryzen 9 9950X3D"],
    },
  },
  {
    title: "GPU Memory & Quantization Notes",
    description: "An engineering notebook on quantization: how format choices affect memory, quality and practical usability on consumer GPUs.",
    category: "AI",
    status: "in-progress",
    slug: "quantization",
    report: {
      summary: "A running technical log rather than a finished study. I'm documenting what I observe about quantization formats, VRAM behavior and model quality as I actually use these models — not to publish results, but to build real intuition.",
      highlights: [
        "Compared Q4_K_M vs heavier quantizations in practice",
        "Observed when models start spilling outside VRAM under load",
        "Explored how context size impacts memory usage non-linearly",
        "Documented practical limits of consumer GPUs for different model sizes",
      ],
      exploring: [
        "How quantization affects usability, not just perplexity scores",
        "The point where VRAM becomes the real bottleneck",
        "Whether lighter quantizations are viable for real tasks",
      ],
      tools: ["Quantized GGUF models", "Local inference tools", "GPU monitoring tools"],
    },
  },
  {
    title: "TryHackMe — Security Learning",
    description: "Working through hands-on labs to improve my understanding of Linux, networking, enumeration and offensive security basics.",
    category: "Security",
    status: "in-progress",
    slug: "tryhackme",
    report: {
      summary: "I use TryHackMe as a practical way to explore cybersecurity. So far I've mainly focused on foundational content: Linux, networking, enumeration and early offensive security concepts.",
      highlights: [
        "Reached the top 9% on TryHackMe",
        "Completed 59 rooms",
        "Worked through most of the Pre Security path",
        "Used the platform to strengthen my Linux and network basics",
      ],
      metrics: [
        { label: "Rooms completed", value: "59" },
        { label: "Global rank", value: "Top 9%" },
      ],
      tools: ["Linux", "Networking basics", "TryHackMe", "Enumeration tools"],
      links: [{ label: "TryHackMe Profile", url: "https://tryhackme.com" }],
    },
  },
  {
    title: "High-End Workstation Build",
    description: "Building and optimizing my own machine for development, local AI experimentation and high-performance workloads.",
    category: "Hardware",
    status: "completed",
    slug: "workstation",
    report: {
      summary: "I built and tuned my own workstation around high-end consumer hardware, mainly for software work, local AI experiments and overall performance. Beyond the build itself, I'm interested in how hardware choices affect real usage.",
      highlights: [
        "Built a machine around Ryzen 9 9950X3D and RTX 5080",
        "Explored performance, cooling and component choices in detail",
        "Used the setup for local model experiments and heavy technical workflows",
        "Developed a stronger interest in the link between hardware and software performance",
      ],
      tools: ["RTX 5080", "Ryzen 9 9950X3D", "Custom PC building", "Performance tuning"],
    },
  },
  {
    title: "3D Printing & Digital Fabrication",
    description: "Using 3D printing and laser engraving to prototype ideas, create useful objects and explore digital fabrication.",
    category: "Hardware",
    status: "in-progress",
    slug: "3d-printing",
    report: {
      summary: "I'm interested in fabrication as a natural extension of software and systems thinking: taking an idea, prototyping it, iterating on it, and turning it into something real.",
      highlights: [
        "Regularly use a 3D printer for prototyping and experimentation",
        "Also use a LaserPecker LP2 for engraving-related projects",
        "Previously sold 2 digital 3D files on Cults",
        "Interested in the full loop from idea to usable object",
      ],
      metrics: [
        { label: "Files sold", value: "2" },
      ],
      tools: ["3D printer", "LaserPecker LP2", "3D modeling / slicing workflow"],
    },
  },
];

const categoryColors: Record<string, string> = {
  AI: "210 60% 55%",
  Security: "0 60% 55%",
  Hardware: "150 50% 45%",
};

const categoryIcons: Record<string, string> = {
  AI: "🧠",
  Security: "🔐",
  Hardware: "⚙️",
};

const fileSystem: Record<string, string[] | string> = {
  "~": ["lab", "projects", ".bashrc", ".gitconfig"],
  "~/lab": ["experiments", "notes.md", "README.md"],
  "~/lab/experiments": experiments.map((e) => e.slug),
  ...Object.fromEntries(
    experiments.map((e) => [
      `~/lab/experiments/${e.slug}`,
      ["README.md", "results"],
    ])
  ),
};

const AVAILABLE_COMMANDS = ["ls", "cd", "cat", "pwd", "clear", "help", "whoami", "date", "tree"];
const QUICK_COMMANDS = ["help", "ls", "tree", "whoami"];

const LabSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(experiments.length + 1, 120);
  const { ref: parallaxRef, offset } = useParallax(0.06);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentDetail | null>(null);
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [currentDir, setCurrentDir] = useState("~/lab/experiments");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bootDone = useRef(false);

  const scrollTerminal = useCallback(() => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  // Boot sequence — short and fast
  const visible0 = visibleItems[0];
  useEffect(() => {
    if (!visible0 || bootDone.current) return;
    bootDone.current = true;

    const bootLines = [
      "  arthur@workstation  ·  Ubuntu 22.04  ·  RTX 5080  ·  zsh 5.9",
      "",
      "$ ls ~/lab/experiments",
      ...experiments.map(
        (e) => `${e.status === "in-progress" ? "⚡" : "✓"} ${e.slug.padEnd(20)} [${e.category}]`
      ),
      "",
      "Ready — type a command or click an experiment",
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        const line = bootLines[i];
        i++;
        setTerminalLines((prev) => [...prev, line]);
        scrollTerminal();
      } else {
        clearInterval(interval);
        setBootComplete(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }, 45);
  }, [visible0, scrollTerminal]);

  // Autocomplete suggestion
  useEffect(() => {
    if (!inputValue.trim()) { setSuggestion(""); return; }

    const parts = inputValue.split(" ");
    const cmd = parts[0];

    if (parts.length === 1) {
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(cmd) && c !== cmd);
      setSuggestion(match ? match.slice(cmd.length) : "");
    } else if (cmd === "cat" || cmd === "cd" || cmd === "ls") {
      const arg = parts.slice(1).join(" ");
      const dirContent = fileSystem[currentDir];
      if (Array.isArray(dirContent)) {
        const match = dirContent.find((f) => f.startsWith(arg) && f !== arg);
        setSuggestion(match ? match.slice(arg.length) : "");
      } else {
        setSuggestion("");
      }
    } else {
      setSuggestion("");
    }
  }, [inputValue, currentDir]);

  const resolvePath = (base: string, relative: string): string => {
    if (relative.startsWith("~/") || relative === "~") return relative;
    if (relative.startsWith("/")) return relative;
    return `${base}/${relative}`.replace(/\/+/g, "/");
  };

  const executeCommand = useCallback(
    (rawCmd: string) => {
      const cmd = rawCmd.trim();
      if (!cmd) return;

      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
      setTerminalLines((prev) => [...prev, `$ ${cmd}`]);

      const parts = cmd.split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1).join(" ");

      switch (command) {
        case "help": {
          setTerminalLines((prev) => [
            ...prev,
            "",
            "Available commands:",
            "  ls [path]    List directory contents",
            "  cd <path>    Change directory  (.. to go up)",
            "  cat <slug>   Open experiment report",
            "  pwd          Print working directory",
            "  tree         Show directory tree",
            "  whoami       Current user",
            "  date         Show date",
            "  clear        Clear terminal",
            "",
            `Experiments: ${experiments.map((e) => e.slug).join(", ")}`,
            "",
          ]);
          break;
        }
        case "clear": {
          setTerminalLines([]);
          break;
        }
        case "pwd": {
          setTerminalLines((prev) => [...prev, currentDir]);
          break;
        }
        case "whoami": {
          setTerminalLines((prev) => [...prev, "arthur"]);
          break;
        }
        case "date": {
          setTerminalLines((prev) => [...prev, new Date().toString()]);
          break;
        }
        case "tree": {
          setTerminalLines((prev) => [
            ...prev,
            "~/lab/experiments",
            ...experiments.flatMap((e, i) => {
              const isLast = i === experiments.length - 1;
              return [
                `${isLast ? "└──" : "├──"} ${e.slug}/`,
                `${isLast ? "   " : "│  "} ├── README.md`,
                `${isLast ? "   " : "│  "} └── results/`,
              ];
            }),
            "",
            `${experiments.length} experiments`,
          ]);
          break;
        }
        case "ls": {
          const targetDir = args ? resolvePath(currentDir, args) : currentDir;
          const content = fileSystem[targetDir];
          if (content && Array.isArray(content)) {
            content.forEach((f) => {
              const isDir = !!fileSystem[`${targetDir}/${f}`];
              setTerminalLines((prev) => [
                ...prev,
                isDir ? `DIR:${f}/` : `  ${f}`,
              ]);
            });
          } else {
            setTerminalLines((prev) => [
              ...prev,
              `ls: cannot access '${args}': No such file or directory`,
            ]);
          }
          break;
        }
        case "cd": {
          if (!args || args === "~") {
            setCurrentDir("~");
          } else if (args === "..") {
            const parent = currentDir.split("/").slice(0, -1).join("/") || "~";
            setCurrentDir(parent);
          } else {
            const newDir = resolvePath(currentDir, args);
            if (fileSystem[newDir]) {
              setCurrentDir(newDir);
            } else {
              setTerminalLines((prev) => [...prev, `cd: no such directory: ${args}`]);
            }
          }
          break;
        }
        case "cat": {
          const slug = args
            .replace(/\/?README\.md$/, "")
            .replace(/^experiments\//, "")
            .replace(/\/$/, "");
          const exp = experiments.find((e) => e.slug === slug);
          if (exp) {
            setTerminalLines((prev) => [
              ...prev,
              "",
              `  ${exp.title}`,
              `  [${exp.category}] — ${exp.status}`,
              `  ${exp.report.summary.slice(0, 80)}...`,
              `  → Opening report...`,
              "",
            ]);
            setTimeout(() => {
              setSelectedExperiment(exp);
              setTimeout(() => setIsDetailVisible(true), 50);
            }, 200);
          } else {
            setTerminalLines((prev) => [
              ...prev,
              `cat: ${args || "(no file)"}: No such file`,
              `Available: ${experiments.map((e) => e.slug).join(", ")}`,
            ]);
          }
          break;
        }
        default: {
          setTerminalLines((prev) => [
            ...prev,
            `zsh: command not found: ${command}`,
            `Type 'help' for available commands`,
          ]);
        }
      }

      scrollTerminal();
    },
    [currentDir, scrollTerminal]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        executeCommand(inputValue);
        setInputValue("");
        setSuggestion("");
      } else if (e.key === "Tab") {
        e.preventDefault();
        if (suggestion) {
          setInputValue((prev) => prev + suggestion);
          setSuggestion("");
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
          setHistoryIndex(newIndex);
          setInputValue(commandHistory[newIndex]);
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex >= 0) {
          const newIndex = historyIndex + 1;
          if (newIndex >= commandHistory.length) {
            setHistoryIndex(-1);
            setInputValue("");
          } else {
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
          }
        }
      } else if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setTerminalLines([]);
      }
    },
    [inputValue, suggestion, executeCommand, commandHistory, historyIndex]
  );

  // Card click → direct execution
  const handleCardClick = useCallback(
    (exp: ExperimentDetail) => {
      executeCommand(`cat ${exp.slug}`);
      inputRef.current?.focus();
      terminalRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
    [executeCommand]
  );

  const closeDetail = useCallback(() => {
    setIsDetailVisible(false);
    setTimeout(() => {
      setSelectedExperiment(null);
      scrollTerminal();
    }, 400);
  }, [scrollTerminal]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDetailVisible) closeDetail();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isDetailVisible, closeDetail]);

  const promptDir = currentDir
    .replace("~/lab/experiments", "~/lab/exp")
    .replace("~/lab", "~/lab");

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

      <div
        ref={parallaxRef}
        className="max-w-5xl mx-auto px-6 relative"
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div ref={containerRef}>
          {/* Header */}
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

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Lab</h2>
            <p className="text-muted-foreground text-sm max-w-md">
              Where I break things, benchmark stuff, and push hardware to its limits.{" "}
              <span className="text-muted-foreground/40">
                Click a card or type in the terminal to explore.
              </span>
            </p>
          </div>

          {/* Terminal + Cards */}
          <div className="grid lg:grid-cols-5 gap-6">
            {/* Terminal */}
            <div
              className="lg:col-span-2 flex flex-col rounded-xl overflow-hidden transition-all duration-700 self-start lg:sticky lg:top-24"
              style={{
                opacity: visibleItems[0] ? 1 : 0,
                transform: visibleItems[0] ? "translateX(0)" : "translateX(-30px)",
                border: isFocused
                  ? "1px solid hsl(var(--foreground) / 0.15)"
                  : "1px solid hsl(var(--border))",
                background: "hsl(var(--card) / 0.8)",
                transition:
                  "opacity 0.7s, transform 0.7s, border-color 0.2s, box-shadow 0.2s",
                boxShadow: isFocused
                  ? "0 0 0 1px hsl(var(--foreground) / 0.05), 0 8px 32px hsl(0 0% 0% / 0.3)"
                  : "none",
              }}
              onClick={() => inputRef.current?.focus()}
            >
              {/* Title bar */}
              <div className="px-4 py-2.5 border-b border-border flex items-center gap-2 flex-shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(45 80% 50% / 0.6)" }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: "hsl(140 60% 45% / 0.6)" }} />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground/50 ml-2">
                  arthur@lab:{promptDir}
                </span>
              </div>

              {/* Output area */}
              <div
                ref={terminalRef}
                className="p-4 h-[320px] overflow-y-auto font-mono text-[11px] leading-relaxed scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] flex-shrink-0"
              >
                {terminalLines.filter((line) => line != null).map((line, i) => (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${
                      line.startsWith("$")
                        ? "text-foreground/80"
                        : line.startsWith("  →")
                        ? "text-foreground/60"
                        : line.startsWith("DIR:")
                        ? ""
                        : line.includes("command not found") ||
                          line.includes("No such file") ||
                          line.includes("cannot access") ||
                          line.includes("no such dir")
                        ? ""
                        : line.startsWith("Available")
                        ? "text-muted-foreground/40 italic"
                        : line.startsWith("  ") && !line.startsWith("  →")
                        ? "text-muted-foreground/50"
                        : line.startsWith("├") ||
                          line.startsWith("│") ||
                          line.startsWith("└") ||
                          line.startsWith(".")
                        ? "text-muted-foreground/40"
                        : line.includes("⚡")
                        ? "text-muted-foreground"
                        : line.includes("✓")
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground/40"
                    }`}
                    style={
                      line.startsWith("DIR:")
                        ? { color: "hsl(210 60% 65%)" }
                        : line.includes("command not found") ||
                          line.includes("No such file") ||
                          line.includes("cannot access") ||
                          line.includes("no such dir")
                        ? { color: "hsl(0 60% 60%)" }
                        : undefined
                    }
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
                    ) : line.startsWith("DIR:") ? (
                      line.slice(4)
                    ) : (
                      line
                    )}
                  </div>
                ))}

                {/* Boot cursor */}
                {!bootComplete && (
                  <span
                    className="inline-block w-1.5 h-3 bg-foreground/50"
                    style={{ animation: "blink-cursor 1s step-end infinite" }}
                  />
                )}
              </div>

              {/* Input bar — always visible */}
              <div className="border-t border-border px-4 py-2.5 flex items-center gap-2 flex-shrink-0 bg-card/50">
                <span
                  className="font-mono text-[11px] flex-shrink-0"
                  style={{ color: "hsl(140 50% 55%)" }}
                >
                  $
                </span>
                <div className="relative flex-1 flex items-center font-mono text-[11px]">
                  <span className="text-foreground/80">{inputValue}</span>
                  <span className="text-muted-foreground/25">{suggestion}</span>
                  {bootComplete && (
                    <span
                      className="inline-block w-1.5 h-3.5 -mb-px ml-px bg-foreground/50"
                      style={{
                        animation: isFocused
                          ? "blink-cursor 1s step-end infinite"
                          : "none",
                        opacity: isFocused ? undefined : 0.3,
                      }}
                    />
                  )}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={!bootComplete}
                    aria-label="Terminal input"
                    className="absolute inset-0 w-full bg-transparent outline-none text-transparent caret-transparent"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                {suggestion && (
                  <span className="font-mono text-[9px] text-muted-foreground/25 flex-shrink-0">
                    Tab
                  </span>
                )}
              </div>

              {/* Quick commands */}
              <div className="px-4 py-2 flex gap-1.5 flex-wrap border-t border-border bg-card/30 flex-shrink-0">
                {QUICK_COMMANDS.map((cmd) => (
                  <button
                    key={cmd}
                    onClick={(e) => {
                      e.stopPropagation();
                      executeCommand(cmd);
                      inputRef.current?.focus();
                    }}
                    disabled={!bootComplete}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-border/60 text-muted-foreground/40 hover:text-foreground/70 hover:border-foreground/20 hover:bg-foreground/5 transition-all duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    {cmd}
                  </button>
                ))}
                <span className="font-mono text-[9px] text-muted-foreground/20 self-center ml-auto">
                  ↑↓ history · Tab complete
                </span>
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
                    onClick={() => handleCardClick(exp)}
                    className={`group relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? "border-foreground/20 bg-card"
                        : "border-border bg-card/50 hover:border-foreground/10 hover:bg-card/80"
                    }`}
                    style={{
                      opacity: visibleItems[i] ? 1 : 0,
                      transform: visibleItems[i]
                        ? isActive
                          ? "translateX(4px)"
                          : "translateX(0)"
                        : "translateY(20px)",
                      transition:
                        "opacity 0.5s ease-out, transform 0.3s ease-out, border-color 0.3s, background-color 0.3s",
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

                    <div className="px-5 py-4 pl-6 flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
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
                        <p className="text-xs text-muted-foreground/50 font-mono mb-1.5">
                          <span className="mr-1">{categoryIcons[exp.category]}</span>{exp.category}
                        </p>
                        <p className="text-xs text-muted-foreground/35 leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {/* Terminal hint on hover */}
                        <span
                          className="font-mono text-[9px] text-muted-foreground/0 group-hover:text-muted-foreground/35 transition-all duration-200"
                        >
                          $ cat {exp.slug}
                        </span>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/20 group-hover:text-muted-foreground/50 transition-all duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Helper note */}
              <p className="text-[11px] text-muted-foreground/25 font-mono pt-1 pl-1">
                › clicking a card runs{" "}
                <span className="text-muted-foreground/40">cat &lt;experiment&gt;</span> in the terminal
              </p>
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
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={closeDetail} />

          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border bg-card scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]"
            style={{
              transform: isDetailVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.96)",
              transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm border-b border-border px-6 py-4 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: `hsl(${categoryColors[selectedExperiment.category]})` }}
                  />
                  <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-widest">
                    <span className="mr-1">{categoryIcons[selectedExperiment.category]}</span>{selectedExperiment.category}
                  </span>
                  {selectedExperiment.status === "in-progress" && (
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider"
                      style={{
                        color: `hsl(${categoryColors[selectedExperiment.category]} / 0.7)`,
                      }}
                    >
                      · Active
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedExperiment.title}
                </h3>
              </div>
              <button
                onClick={closeDetail}
                className="p-2 -mr-2 -mt-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {selectedExperiment.report.summary}
              </p>

              {selectedExperiment.report.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedExperiment.report.metrics.map((m, i) => (
                    <div
                      key={m.label}
                      className="rounded-lg border border-border bg-secondary/30 p-3 text-center"
                      style={{ animation: `fade-in 0.3s ease-out ${i * 0.08}s both` }}
                    >
                      <div className="text-lg font-bold text-foreground font-mono">{m.value}</div>
                      <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div>
                <h4 className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">
                  Key Findings
                </h4>
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

              {selectedExperiment.report.exploring && (
                <div>
                  <h4 className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">
                    What I'm exploring
                  </h4>
                  <div className="space-y-2">
                    {selectedExperiment.report.exploring.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm text-muted-foreground/60 italic"
                        style={{ animation: `fade-in 0.3s ease-out ${i * 0.06}s both` }}
                      >
                        <span className="text-muted-foreground/30 mt-0.5 flex-shrink-0">→</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="font-mono text-[11px] text-muted-foreground/50 uppercase tracking-widest mb-3">
                  Stack
                </h4>
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

            <div className="px-6 py-3 border-t border-border bg-secondary/20">
              <span className="font-mono text-[10px] text-muted-foreground/30">
                experiments/{selectedExperiment.slug}/README.md —{" "}
                {selectedExperiment.report.highlights.length} findings ·{" "}
                {selectedExperiment.report.tools.length} tools
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default LabSection;
