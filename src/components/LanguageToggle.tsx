import { useLanguage } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "fr" : "en")}
      className="font-mono text-xs flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-all duration-300 px-2 py-1 rounded-md hover:bg-white/[0.04]"
    >
      <span className={`transition-all duration-300 ${lang === "fr" ? "text-foreground" : "text-muted-foreground/40"}`}>FR</span>
      <span className="text-muted-foreground/20">/</span>
      <span className={`transition-all duration-300 ${lang === "en" ? "text-foreground" : "text-muted-foreground/40"}`}>EN</span>
    </button>
  );
};

export default LanguageToggle;
