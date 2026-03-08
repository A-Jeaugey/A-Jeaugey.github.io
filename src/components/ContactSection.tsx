import { Github, Mail, Linkedin } from "lucide-react";
import { useStaggerReveal } from "@/hooks/useScrollFadeIn";

const contacts = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Mail, label: "Email", href: "mailto:arthur@example.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const ContactSection = () => {
  const { containerRef, visibleItems } = useStaggerReveal(contacts.length + 1, 150);

  return (
    <footer id="contact" className="py-24 sm:py-32">
      <div ref={containerRef} className="max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-8 mb-16">
          {contacts.map(({ icon: Icon, label, href }, i) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300"
              style={{
                opacity: visibleItems[i] ? 1 : 0,
                transform: visibleItems[i] ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
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
          className="text-xs text-muted-foreground/40 font-mono transition-all duration-700"
          style={{
            opacity: visibleItems[contacts.length] ? 1 : 0,
          }}
        >
          © {new Date().getFullYear()} Arthur Jeaugey
        </p>
      </div>
    </footer>
  );
};

export default ContactSection;
