import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.07] animate-mesh-float"
          style={{
            background: "radial-gradient(circle, hsl(260 60% 55%) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.05] animate-mesh-float-reverse"
          style={{
            background: "radial-gradient(circle, hsl(220 70% 50%) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
          Arthur Jeaugey
        </h1>

        <p className="text-lg sm:text-xl text-foreground/90 font-light mb-4 leading-relaxed">
          I build software, experiment with AI, and dig into complex systems.
        </p>

        <p className="text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
          Currently studying computer science in France. Interested in how things
          work under the hood — from neural networks to operating systems.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-6 border-foreground/20 text-foreground hover:bg-foreground/5"
          >
            <a href="#projects">See what I've built</a>
          </Button>
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
