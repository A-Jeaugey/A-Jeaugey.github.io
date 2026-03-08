import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiquidBackground from "@/components/LiquidBackground";
import MagneticButton from "@/components/MagneticButton";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <LiquidBackground />

      {/* Autonomous rotating ring */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full border border-foreground/[0.03] pointer-events-none"
        style={{ animation: "spin-slow 60s linear infinite" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-foreground/10" />
      </div>
      <div
        className="absolute w-[450px] h-[450px] rounded-full border border-foreground/[0.02] pointer-events-none"
        style={{ animation: "spin-slow 45s linear infinite reverse" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-foreground/10" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Name with glow */}
        <div className="relative inline-block">
          {/* Glow layer */}
          <div
            className="absolute inset-0 blur-[80px] opacity-0 transition-opacity duration-[2s]"
            style={{
              background: "radial-gradient(ellipse, hsl(210 50% 55% / 0.3) 0%, hsl(220 60% 40% / 0.1) 50%, transparent 80%)",
              opacity: loaded ? 0.6 : 0,
              transform: "scale(2.5, 1.8)",
            }}
          />
          <h1
            className="relative text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-foreground transition-all duration-[1.5s] ease-out"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? "translateY(0)" : "translateY(30px)",
              letterSpacing: loaded ? "-0.02em" : "0.1em",
            }}
          >
            Arthur Jeaugey
          </h1>
        </div>

        <p
          className="text-lg sm:text-xl text-foreground/90 font-light mb-4 leading-relaxed transition-all duration-[1.2s] ease-out delay-300"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          I build software, experiment with AI, and dig into complex systems.
        </p>

        <p
          className="text-base text-muted-foreground max-w-xl mx-auto mb-12 leading-relaxed transition-all duration-[1.2s] ease-out delay-500"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(20px)",
          }}
        >
          Currently studying computer science in France. Interested in how things
          work under the hood — from neural networks to operating systems.
        </p>

        <div
          className="flex items-center justify-center gap-4 transition-all duration-[1s] ease-out delay-700"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0) scale(1)" : "translateY(15px) scale(0.95)",
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

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-[1s] delay-[1.2s]"
          style={{ opacity: loaded ? 1 : 0 }}
        >
          <span className="font-mono text-[10px] text-muted-foreground/40 uppercase tracking-[0.3em]">
            Scroll
          </span>
          <div className="w-px h-8 overflow-hidden">
            <div
              className="w-full h-full bg-gradient-to-b from-foreground/30 to-transparent"
              style={{ animation: "scroll-line 2s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
