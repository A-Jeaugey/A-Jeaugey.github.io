import { Github, Mail, Linkedin } from "lucide-react";
import { useStaggerReveal } from "@/hooks/useScrollFadeIn";
import { useLanguage } from "@/i18n/LanguageContext";

const contacts = [
  { icon: Github, label: "GitHub", href: "https://github.com/A-Jeaugey" },
  { icon: Mail, label: "Email", href: "mailto:jeaugeyarthur@gmail.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/arthur-jeaugey/" },
];

const ContactSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(contacts.length + 2, 150);
  const { t } = useLanguage();

  return (
    <footer id="contact" className="pt-8 pb-12">
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-white/[0.06] pt-12" />
        <div ref={containerRef} className="text-center">
          <p
            className="text-sm text-muted-foreground mb-8 transition-all duration-700"
            style={{
              opacity: visibleItems[0] ? 1 : 0,
              transform: visibleItems[0] ? "translateY(0)" : "translateY(12px)",
            }}
          >
            {t("contact.tagline")}
          </p>

          <div className="flex items-center justify-center gap-8 mb-10">
            {contacts.map(({ icon: Icon, label, href }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
                style={{
                  opacity: visibleItems[i + 1] ? 1 : 0,
                  transform: visibleItems[i + 1] ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out, color 0.3s",
                }}
              >
                <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline relative">
                  {label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-foreground/40 transition-all duration-300 group-hover:w-full" />
                </span>
              </a>
            ))}
          </div>

          <p
            className="text-[11px] text-muted-foreground/30 font-mono transition-all duration-700"
            style={{
              opacity: visibleItems[contacts.length + 1] ? 1 : 0,
            }}
          >
            © {new Date().getFullYear()} Arthur Jeaugey
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ContactSection;
