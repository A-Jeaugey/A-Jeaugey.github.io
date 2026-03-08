import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiquidBackground from "@/components/LiquidBackground";
import MagneticButton from "@/components/MagneticButton";
import { useEffect, useState, useRef } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [letters, setLetters] = useState<{ char: string; x: number; y: number }[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Split name into positioned letters for interactive effect
  const name = "Arthur Jeaugey";

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = nameRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <LiquidBackground />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Name with glow + interactive letters */}
        <div className="relative inline-block">
          {/* Glow layer */}
          <div
            className="absolute inset-0 blur-[80px] transition-all duration-[2s]"
            style={{
              background: "radial-gradient(ellipse, hsl(210 50% 55% / 0.3) 0%, hsl(220 60% 40% / 0.1) 50%, transparent 80%)",
              opacity: loaded ? (isHovering ? 0.8 : 0.5) : 0,
              transform: `scale(${isHovering ? 2.8 : 2.5}, 1.8)`,
            }}
          />
          <h1
            ref={nameRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            className="relative text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-foreground transition-all duration-[1.5s] ease-out cursor-default select-none"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              letterSpacing: loaded ? "-0.02em" : "0.1em",
            }}
          >
            {name.split("").map((char, i) => {
              // Calculate distance from mouse to this letter's approximate position
              const totalChars = name.length;
              const charFraction = i / totalChars;
              const approxX = charFraction * 100; // percentage across
              const mouseFraction = (mousePos.x / (nameRef.current?.offsetWidth || 1)) * 100;
              const dist = Math.abs(approxX - mouseFraction);
              const influence = isHovering ? Math.max(0, 1 - dist / 25) : 0;

              return (
                <span
                  key={i}
                  className="inline-block transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateY(${-influence * 8}px) scale(${1 + influence * 0.08})`,
                    color: influence > 0.3
                      ? `hsl(210 ${30 + influence * 40}% ${70 + influence * 20}%)`
                      : undefined,
                    transition: "transform 0.2s ease-out, color 0.3s ease-out",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </h1>
        </div>

        <p
          className="text-lg sm:text-xl text-foreground/90 font-light mb-4 leading-relaxed mt-6"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease-out 0.3s",
          }}
        >
          I build software, experiment with AI, and dig into complex systems.
        </p>

        <p
          className="text-base text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
            transition: "all 1.2s ease-out 0.5s",
          }}
        >
          Currently studying computer science in France. Interested in how things
          work under the hood — from neural networks to operating systems.
        </p>

        <div
          className="flex items-center justify-center gap-4"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(15px) scale(0.95)",
            transition: "all 1s ease-out 0.7s",
          }}
        >
          <MagneticButton strength={0.25}>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-6 border-foreground/20 text-foreground hover:bg-foreground/5 hover:border-foreground/40 transition-all duration-300"
            >
              <a href="#projects">See what I've built</a>
            </Button>
          </MagneticButton>
          <MagneticButton strength={0.4}>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full text-muted-foreground hover:text-foreground"
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
              </a>
            </Button>
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease-out 2s",
        }}
      >
        <div className="w-px h-10 overflow-hidden relative">
          <div
            className="absolute w-full h-full bg-gradient-to-b from-transparent via-foreground/30 to-transparent"
            style={{ animation: "scroll-line 2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
