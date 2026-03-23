import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import MagneticButton from "@/components/MagneticButton";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const links = [
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.lab"), href: "#lab" },
    { label: t("nav.about"), href: "#about" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(() => setVisible(true), 800);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  const LanguageToggle = () => (
    <button
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      className="font-mono text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-300 px-2 py-1 rounded-md hover:bg-white/[0.04]"
    >
      <span className={`transition-all duration-300 ${lang === "fr" ? "text-foreground" : "text-muted-foreground/40"}`}>FR</span>
      <span className="text-muted-foreground/20">/</span>
      <span className={`transition-all duration-300 ${lang === "en" ? "text-foreground" : "text-muted-foreground/40"}`}>EN</span>
    </button>
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/60 backdrop-blur-xl" : "bg-transparent"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-10px)",
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out, background-color 0.3s",
      }}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <MagneticButton strength={0.3}>
          <a
            href="#"
            className="font-mono text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            AJ
          </a>
        </MagneticButton>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link, i) => (
            <MagneticButton key={link.href} strength={0.2}>
              <a
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                style={{
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                {link.label}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-foreground/30 transition-all duration-300 group-hover:w-full" />
              </a>
            </MagneticButton>
          ))}
          <div className="w-px h-4 bg-border" />
          <MagneticButton strength={0.2}>
            <LanguageToggle />
          </MagneticButton>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-4">
          <LanguageToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-background border-border">
              <SheetTitle className="sr-only">{t("nav.navigation")}</SheetTitle>
              <div className="flex flex-col gap-6 pt-12">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
