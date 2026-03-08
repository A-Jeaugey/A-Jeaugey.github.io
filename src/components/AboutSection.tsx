import { useScrollFadeIn, useParallax } from "@/hooks/useScrollFadeIn";
import { useRef, useEffect, useState } from "react";

const AboutSection = () => {
  const ref = useScrollFadeIn();
  const { ref: parallaxRef, offset } = useParallax(0.05);

  // Reveal paragraphs one by one
  const [visibleP, setVisibleP] = useState([false, false, false]);
  const pContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [0, 1, 2].forEach((i) => {
            setTimeout(() => {
              setVisibleP((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 200);
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paragraphs = [
    "I'm Arthur, a computer science student based in France. I'm drawn to the intersection of software engineering and complex systems — the kind of problems where you have to understand what's happening several layers below the surface.",
    "Most of my time goes into building things: mobile apps, ML pipelines, tools that solve real problems. Outside of that, I explore AI infrastructure, cybersecurity, and low-level systems. I like understanding how technology works, not just how to use it.",
    "When I'm not coding, I'm probably tuning 3D printer settings, reading about systems design, or setting up another experiment on my workstation.",
  ];

  return (
    <section id="about" className="py-24 sm:py-32">
      <div ref={parallaxRef} style={{ transform: `translateY(${offset}px)` }}>
        <div ref={ref} className="fade-section max-w-2xl mx-auto px-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent mb-10" />
          <h2 className="text-sm font-mono text-muted-foreground mb-8 tracking-wider uppercase">
            About
          </h2>
          <div ref={pContainerRef} className="space-y-4">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="text-muted-foreground leading-relaxed transition-all duration-700 ease-out"
                style={{
                  opacity: visibleP[i] ? 1 : 0,
                  transform: visibleP[i] ? "translateY(0)" : "translateY(16px)",
                }}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
