import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const AboutSection = () => {
  const ref = useScrollFadeIn();

  return (
    <section id="about" className="py-24 sm:py-32">
      <div ref={ref} className="fade-section max-w-2xl mx-auto px-6">
        <div className="w-12 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent mb-10" />
        <h2 className="text-sm font-mono text-muted-foreground mb-8 tracking-wider uppercase">
          About
        </h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm Arthur, a computer science student based in France. I'm drawn to
            the intersection of software engineering and complex systems — the kind
            of problems where you have to understand what's happening several layers
            below the surface.
          </p>
          <p>
            Most of my time goes into building things: mobile apps, ML pipelines,
            tools that solve real problems. Outside of that, I explore AI
            infrastructure, cybersecurity, and low-level systems. I like
            understanding how technology works, not just how to use it.
          </p>
          <p>
            When I'm not coding, I'm probably tuning 3D printer settings,
            reading about systems design, or setting up another experiment on
            my workstation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
