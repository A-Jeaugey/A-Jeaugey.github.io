import { Github, Mail, Linkedin } from "lucide-react";
import { useScrollFadeIn } from "@/hooks/useScrollFadeIn";

const contacts = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:arthur@example.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

const ContactSection = () => {
  const ref = useScrollFadeIn();

  return (
    <footer id="contact" className="py-24 sm:py-32">
      <div ref={ref} className="fade-section max-w-5xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-6 mb-16">
          {contacts.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>

        <p className="text-xs text-muted-foreground/40 font-mono">
          © {new Date().getFullYear()} Arthur Jeaugey
        </p>
      </div>
    </footer>
  );
};

export default ContactSection;
