import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/LanguageContext";

const PUBLISHER = {
  name: "Arthur Jeaugey",
  email: "jeaugeyarthur@gmail.com",
};

const HOST = {
  name: "GitHub, Inc.",
  address: "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107",
  phone: "+1 (877) 448-4820",
  website: "https://github.com",
};

interface LegalSection {
  title: string;
  paragraphs: string[];
  links?: { label: string; url: string }[];
}

const linkClass = "text-foreground/80 underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground/60 transition-colors";

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col sm:flex-row sm:gap-4">
    <dt className="sm:w-48 shrink-0 text-muted-foreground">{label}</dt>
    <dd className="text-foreground/90">{children}</dd>
  </div>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-sm font-mono text-muted-foreground mb-5 tracking-wider uppercase">{children}</h2>
);

const LegalNotice = () => {
  const { t } = useLanguage();
  const sections: LegalSection[] = t("legal.sections");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${t("legal.title")} — Arthur Jeaugey`;
    return () => {
      document.title = previousTitle;
    };
  }, [t]);

  return (
    <div className="min-h-screen bg-background">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("legal.back")}
        </Link>
        <LanguageToggle />
      </nav>

      <main className="max-w-2xl mx-auto px-6 pt-10 pb-24">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">{t("legal.title")}</h1>
        <p className="text-xs font-mono text-muted-foreground/60 mb-16">{t("legal.updated")}</p>

        <div className="space-y-14 text-sm leading-relaxed">
          <section>
            <SectionTitle>{t("legal.publisher.title")}</SectionTitle>
            <p className="text-muted-foreground mb-5">{t("legal.publisher.intro")}</p>
            <dl className="space-y-2 border-l-2 border-white/[0.08] pl-5 mb-5">
              <Row label={t("legal.publisher.name")}>{PUBLISHER.name}</Row>
              <Row label={t("legal.publisher.contact")}>
                <a href={`mailto:${PUBLISHER.email}`} className={linkClass}>
                  {PUBLISHER.email}
                </a>
              </Row>
              <Row label={t("legal.publisher.director")}>{PUBLISHER.name}</Row>
            </dl>
            <p className="text-muted-foreground">{t("legal.publisher.note")}</p>
          </section>

          <section>
            <SectionTitle>{t("legal.host.title")}</SectionTitle>
            <p className="text-muted-foreground mb-5">{t("legal.host.intro")}</p>
            <dl className="space-y-2 border-l-2 border-white/[0.08] pl-5">
              <Row label={t("legal.host.company")}>{HOST.name}</Row>
              <Row label={t("legal.host.address")}>
                {HOST.address}, {t("legal.host.country")}
              </Row>
              <Row label={t("legal.host.phone")}>{HOST.phone}</Row>
              <Row label={t("legal.host.website")}>
                <a href={HOST.website} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  github.com
                </a>
              </Row>
            </dl>
          </section>

          {sections.map((section) => (
            <section key={section.title}>
              <SectionTitle>{section.title}</SectionTitle>
              <div className="space-y-4 text-muted-foreground">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.links && (
                <ul className="mt-5 space-y-1.5">
                  {section.links.map((link) => (
                    <li key={link.url}>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default LegalNotice;
