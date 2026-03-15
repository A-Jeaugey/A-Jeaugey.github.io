import { useScrollFadeIn, useParallax } from "@/hooks/useScrollFadeIn";
import { useRef, useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const ref = useScrollFadeIn();
  const { ref: parallaxRef, offset } = useParallax(0.05);
  const { t } = useLanguage();

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

  const paragraphs: string[] = t("about.paragraphs");

  return (
    <section id="about" className="py-24 sm:py-32">
      <div ref={parallaxRef} style={{ transform: `translateY(${offset}px)` }}>
        <div ref={ref} className="fade-section max-w-2xl mx-auto px-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent mb-10" />
          <h2 className="text-sm font-mono text-muted-foreground mb-8 tracking-wider uppercase">
            {t("about.title")}
          </h2>
          <div ref={pContainerRef} className="space-y-5">
            {paragraphs.map((text, i) => (
              <p
                key={i}
                className="leading-relaxed transition-all duration-700 ease-out"
                style={{
                  opacity: visibleP[i] ? 1 : 0,
                  transform: visibleP[i] ? "translateY(0)" : "translateY(16px)",
                  color: i === 0 ? "hsl(0 0% 80%)" : "hsl(240 5% 50%)",
                  fontSize: i === 0 ? "1rem" : "0.9375rem",
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
