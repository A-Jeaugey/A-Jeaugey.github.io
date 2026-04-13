import { useState, useCallback, useRef, type ReactNode } from "react";

/* ═══════════════════════════════════════════════════════════
   PhoneSimulator — interactive mini-OS inside the portfolio
   Screens: home → ISU (iframe) | Play Store | Settings | Clock
   Settings are functional: dark/light mode, language FR/EN
   ═══════════════════════════════════════════════════════════ */

type Screen = "home" | "isu" | "playstore" | "settings" | "clock";

interface PhoneSettings {
  darkMode: boolean;
  lang: "fr" | "en";
}

interface PhoneSimulatorProps {
  className?: string;
  reflectionAngle?: number;
  /** Called when user starts/stops interacting with an app (to disable 3D tilt) */
  onInteracting?: (active: boolean) => void;
}

/* ── Theme helpers ── */
const bg = (dark: boolean) => dark ? "bg-[hsl(240,8%,9%)]" : "bg-[hsl(220,15%,95%)]";
const text = (dark: boolean) => dark ? "text-white/70" : "text-gray-800";
const textMuted = (dark: boolean) => dark ? "text-white/40" : "text-gray-500";
const textFaint = (dark: boolean) => dark ? "text-white/25" : "text-gray-400";
const cardBg = (dark: boolean) => dark ? "bg-white/[0.06] border-white/[0.07]" : "bg-white border-gray-200/80";
const subtleBg = (dark: boolean) => dark ? "bg-white/[0.04]" : "bg-gray-100";

/* ── Shared status bar — content hugs left/right of Dynamic Island ── */
const StatusBar = ({ dark }: { dark: boolean }) => (
  <div className="relative h-[30px] flex items-center justify-between px-5">
    <div className={`text-[7px] font-semibold tabular-nums ${dark ? "text-white/50" : "text-gray-600"}`}>9:41</div>
    <div className="flex gap-[3px] items-center">
      <svg className={`w-[8px] h-[8px] ${dark ? "text-white/40" : "text-gray-500"}`} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.24 4.24 0 00-6 0zm-4-4l2 2a7.07 7.07 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
      </svg>
      <div className="flex items-center gap-[1px]">
        {[1, 1.5, 2, 2.5].map((h, i) => (
          <div key={i} className={`w-[1.5px] rounded-full ${dark ? "bg-white/30" : "bg-gray-500"}`} style={{ height: `${h * 2.5}px` }} />
        ))}
      </div>
      <div className={`w-3 h-[6px] rounded-[1.5px] border relative ${dark ? "border-white/30" : "border-gray-500"}`}>
        <div className="absolute inset-[0.5px] right-[1px] rounded-[1px] bg-emerald-400/60" />
      </div>
    </div>
  </div>
);

/* ── Nav bar with back ── */
const AppNavBar = ({ title, onBack, dark }: { title: string; onBack: () => void; dark: boolean }) => (
  <div className="flex items-center gap-2 px-2 py-1.5">
    <button onClick={onBack} className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors">
      <svg className={`w-3 h-3 ${dark ? "text-white/60" : "text-gray-600"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
    <div className={`text-[9px] font-semibold ${text(dark)}`}>{title}</div>
  </div>
);

const HomeIndicator = ({ dark }: { dark: boolean }) => (
  <div className="flex justify-center py-1.5">
    <div className={`w-[36%] h-[3px] rounded-full ${dark ? "bg-white/20" : "bg-gray-400/40"}`} />
  </div>
);

/* ── Toggle switch ── */
const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
  <button
    onClick={onToggle}
    className={`w-7 h-4 rounded-full transition-colors duration-200 relative flex-shrink-0 ${on ? "bg-emerald-500" : "bg-white/20"}`}
  >
    <div
      className="absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-transform duration-200"
      style={{ transform: on ? "translateX(12px)" : "translateX(2px)" }}
    />
  </button>
);

/* ══════════════════════
   SCREEN: Home
   ══════════════════════ */
const HomeScreen = ({ onOpen, settings }: { onOpen: (s: Screen) => void; settings: PhoneSettings }) => {
  const isFr = settings.lang === "fr";
  const apps: { id: Screen; label: string; icon: ReactNode; color: string }[] = [
    {
      id: "isu",
      label: "ISU",
      icon: <img src="/logo_isu.png" alt="ISU" className="w-full h-full object-cover rounded-[10px]" />,
      color: "",
    },
    {
      id: "playstore",
      label: "Play Store",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
          <path d="M3.609 1.814 13.793 12 3.61 22.186a2.37 2.37 0 0 1-.497-.544 2.71 2.71 0 0 1-.39-1.457V3.815c0-.56.145-1.063.39-1.457a2.37 2.37 0 0 1 .497-.544zm.88-.64L15.545 7.22l-2.904 2.906zm11.057 5.049L18.9 8.295a1.5 1.5 0 0 1 0 2.41l-3.558 2.21-3.035-3.036zM4.49 22.826l11.057-6.046-2.904-2.906z" />
        </svg>
      ),
      color: "bg-gradient-to-br from-blue-500 via-green-400 to-yellow-400",
    },
    {
      id: "settings",
      label: isFr ? "Réglages" : "Settings",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      color: "bg-gradient-to-br from-zinc-500 to-zinc-700",
    },
    {
      id: "clock",
      label: isFr ? "Horloge" : "Clock",
      icon: (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      color: "bg-gradient-to-br from-slate-700 to-slate-900",
    },
  ];

  return (
    <div className={`absolute inset-0 flex flex-col ${settings.darkMode ? "phone-home-bg" : "phone-home-bg-light"}`}>
      <StatusBar dark={settings.darkMode} />

      {/* Date / time widget */}
      <div className="text-center mt-2 mb-3">
        <div className={`text-[7px] font-medium ${settings.darkMode ? "text-white/35" : "text-gray-500"}`}>
          {isFr ? "Dimanche 30 mars" : "Sunday, March 30"}
        </div>
        <div className={`text-[26px] font-extralight leading-tight tabular-nums ${settings.darkMode ? "text-white/80" : "text-gray-800"}`}>9:41</div>
      </div>

      {/* App grid */}
      <div className="flex-1 px-5">
        <div className="grid grid-cols-4 gap-x-3 gap-y-4 w-full justify-items-center">
          {apps.map((app) => (
            <button key={app.id} onClick={() => onOpen(app.id)} className="flex flex-col items-center gap-1 group/app">
              <div className={`w-9 h-9 rounded-[10px] ${app.color} flex items-center justify-center shadow-lg transition-transform duration-150 group-active/app:scale-90 overflow-hidden`}>
                {app.icon}
              </div>
              <span className={`text-[5px] font-medium leading-none text-center ${settings.darkMode ? "text-white/60" : "text-gray-600"}`}>{app.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dock */}
      <div className={`mx-4 mb-1.5 px-3 py-1.5 rounded-[16px] flex justify-center gap-3 ${settings.darkMode ? "bg-white/[0.10] backdrop-blur-md" : "bg-white/70 backdrop-blur-md"}`}>
        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
          </svg>
        </div>
        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
        <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
      </div>

      <HomeIndicator dark={settings.darkMode} />
    </div>
  );
};

/* ══════════════════════
   SCREEN: ISU App
   ══════════════════════ */
const ISUScreen = ({ onBack, dark }: { onBack: () => void; dark: boolean }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeFailed, setIframeFailed] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleLoad = () => {
    clearTimeout(timeoutRef.current);
    setIframeLoaded(true);
  };

  // Set a timeout — if iframe hasn't loaded in 5s, show fallback
  if (!iframeLoaded && !iframeFailed && !timeoutRef.current) {
    timeoutRef.current = setTimeout(() => setIframeFailed(true), 5000);
  }

  return (
    <div className={`absolute inset-0 flex flex-col ${bg(dark)}`}>
      <StatusBar dark={dark} />
      <AppNavBar title="ISU" onBack={onBack} dark={dark} />
      {!iframeFailed ? (
        <div className="flex-1 relative overflow-hidden">
          {!iframeLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`text-[8px] ${textMuted(dark)}`}>Chargement...</div>
            </div>
          )}
          <iframe
            src="https://app.isu.gg"
            loading="lazy"
            className="border-0 origin-top-left"
            style={{
              width: "390px",
              height: "690px",
              transform: "scale(0.49)",
              opacity: iframeLoaded ? 1 : 0,
            }}
            onLoad={handleLoad}
            onError={() => setIframeFailed(true)}
            allow="clipboard-write"
          />
        </div>
      ) : (
        <FallbackISU dark={dark} />
      )}
      <HomeIndicator dark={dark} />
    </div>
  );
};

/* Fallback if iframe is blocked by X-Frame-Options */
const FallbackISU = ({ dark }: { dark: boolean }) => (
  <div className="flex-1 flex flex-col px-3 gap-2 overflow-hidden py-1">
    <div className="px-1">
      <div className={`text-[8px] ${textMuted(dark)}`}>Welcome back,</div>
      <div className={`text-[11px] font-bold ${text(dark)}`}>Demo User</div>
    </div>
    <div className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg border ${cardBg(dark)}`}>
      <svg className={`w-2 h-2 ${textFaint(dark)}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span className={`text-[7px] ${textFaint(dark)}`}>Search courses...</span>
    </div>
    <div className="flex-1 flex flex-col gap-1.5 overflow-hidden">
      {[
        { name: "Mathématiques", color: "bg-blue-400/70", scoreBg: "bg-blue-500/15", scoreText: "text-blue-300/70", score: "85%", count: "3 cours" },
        { name: "Physique-Chimie", color: "bg-purple-400/70", scoreBg: "bg-purple-500/15", scoreText: "text-purple-300/70", score: "72%", count: "5 cours" },
        { name: "Histoire-Géo", color: "bg-amber-400/70", scoreBg: "bg-amber-500/15", scoreText: "text-amber-300/70", score: "91%", count: "4 cours" },
        { name: "NSI", color: "bg-emerald-400/70", scoreBg: "bg-emerald-500/15", scoreText: "text-emerald-300/70", score: "88%", count: "6 cours" },
      ].map((c, i) => (
        <div key={c.name} className={`rounded-xl border p-2 phone-card-shimmer ${cardBg(dark)}`} style={{ animationDelay: `${i * 1.2}s` }}>
          <div className="flex items-center gap-1.5 mb-1">
            <div className={`w-1.5 h-1.5 rounded-full ${c.color}`} />
            <div className={`text-[8px] font-semibold ${text(dark)}`}>{c.name}</div>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <div className={`px-1.5 py-0.5 rounded text-[6px] ${c.scoreBg} ${c.scoreText}`}>Quiz {c.score}</div>
            <div className={`px-1.5 py-0.5 rounded text-[6px] ${subtleBg(dark)} ${textMuted(dark)}`}>{c.count}</div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex justify-around items-center py-1.5 mx-1 border-t border-white/[0.06]">
      {["Cours", "Chat", "Quiz", "Profil"].map((l, i) => (
        <div key={l} className="flex flex-col items-center gap-0.5">
          <div className={`w-3 h-3 rounded ${i === 0 ? "bg-emerald-400/30" : dark ? "bg-white/10" : "bg-gray-300"}`} />
          <span className={`text-[5px] ${i === 0 ? "text-emerald-400/70" : textFaint(dark)}`}>{l}</span>
        </div>
      ))}
    </div>
  </div>
);

/* ══════════════════════
   SCREEN: Play Store
   ══════════════════════ */
const PlayStoreScreen = ({ onBack, dark, lang }: { onBack: () => void; dark: boolean; lang: "fr" | "en" }) => {
  const isFr = lang === "fr";
  return (
    <div className={`absolute inset-0 flex flex-col ${bg(dark)}`}>
      <StatusBar dark={dark} />
      <AppNavBar title="Google Play" onBack={onBack} dark={dark} />

      <div className="flex-1 px-3 flex flex-col gap-2 overflow-hidden">
        {/* App header */}
        <div className="flex items-start gap-2.5">
          <div className="w-12 h-12 rounded-2xl flex-shrink-0 shadow-lg overflow-hidden">
            <img src="/logo_isu.png" alt="ISU" className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className={`text-[10px] font-bold ${text(dark)}`}>ISU - {isFr ? "Révisions IA" : "AI Study"}</div>
            <div className="text-[7px] text-emerald-400/70 font-medium">Arthur Jeaugey</div>
            <div className="flex items-center gap-1 mt-0.5">
              <div className="flex gap-[1px]">
                {[1, 2, 3, 4].map((i) => (
                  <svg key={i} className="w-2 h-2 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
                <svg className="w-2 h-2 text-amber-400/40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <span className={`text-[6px] ${textMuted(dark)}`}>4.2</span>
            </div>
          </div>
        </div>

        {/* Install button */}
        <a
          href="https://play.google.com/store/apps/details?id=com.isu.gg"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-1.5 rounded-lg bg-emerald-500/80 hover:bg-emerald-500 text-[8px] font-bold text-white text-center shadow-md shadow-emerald-500/20 transition-colors"
        >
          {isFr ? "Installer" : "Install"}
        </a>

        {/* Stats row */}
        <div className={`flex justify-around py-1.5 border-y ${dark ? "border-white/[0.06]" : "border-gray-200"}`}>
          {[
            { val: "4.2★", label: "rating" },
            { val: "1K+", label: "downloads" },
            { val: "E", label: isFr ? "classé" : "rated" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className={`text-[8px] font-bold ${text(dark)}`}>{s.val}</div>
              <div className={`text-[5px] uppercase ${textMuted(dark)}`}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* What's new */}
        <div>
          <div className={`text-[7px] font-semibold mb-1 ${textMuted(dark)}`}>{isFr ? "Nouveautés" : "What's new"}</div>
          <div className={`text-[6px] leading-relaxed ${textFaint(dark)}`}>
            {isFr
              ? "v2.3.0 — Chatbot RAG amélioré, mode hors-ligne, partage de chapitres par QR code, corrections de bugs."
              : "v2.3.0 — Improved RAG chatbot, offline mode, chapter sharing via QR code, bug fixes."}
          </div>
        </div>

        {/* About */}
        <div>
          <div className={`text-[7px] font-semibold mb-1 ${textMuted(dark)}`}>{isFr ? "À propos" : "About this app"}</div>
          <p className={`text-[6px] leading-relaxed ${textFaint(dark)}`}>
            {isFr
              ? "ISU transforme vos notes manuscrites en cours structurés grâce à l'IA. Prenez une photo, obtenez résumés, quiz et flashcards. Chatbot RAG, apprentissage social et sync hors-ligne."
              : "ISU transforms your handwritten notes into structured courses using AI. Snap a photo, get summaries, quizzes, and flashcards. Features a RAG chatbot, social learning, and offline sync."}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {["Education", "AI", "Study", "Flutter"].map((tag) => (
            <span key={tag} className={`text-[6px] px-1.5 py-0.5 rounded-full ${dark ? "bg-white/[0.06] text-white/30" : "bg-gray-100 text-gray-500"}`}>{tag}</span>
          ))}
        </div>
      </div>
      <HomeIndicator dark={dark} />
    </div>
  );
};

/* ══════════════════════
   SCREEN: Settings (functional)
   ══════════════════════ */
const SettingsScreen = ({ onBack, settings, onUpdate }: {
  onBack: () => void;
  settings: PhoneSettings;
  onUpdate: (s: Partial<PhoneSettings>) => void;
}) => {
  const dark = settings.darkMode;
  const isFr = settings.lang === "fr";

  return (
    <div className={`absolute inset-0 flex flex-col ${bg(dark)}`}>
      <StatusBar dark={dark} />
      <AppNavBar title={isFr ? "Réglages" : "Settings"} onBack={onBack} dark={dark} />

      <div className="flex-1 px-2.5 flex flex-col gap-[3px] overflow-hidden">
        {/* Account */}
        <SettingsRow dark={dark} icon="👤" label={isFr ? "Compte" : "Account"} detail="demo@isu.gg" />

        {/* Dark mode toggle */}
        <div className={`flex items-center justify-between px-2.5 py-2 rounded-lg ${subtleBg(dark)}`}>
          <div className="flex items-center gap-2">
            <span className="text-[9px]">{dark ? "🌙" : "☀️"}</span>
            <span className={`text-[8px] ${text(dark)}`}>{isFr ? "Mode sombre" : "Dark Mode"}</span>
          </div>
          <Toggle on={dark} onToggle={() => onUpdate({ darkMode: !dark })} />
        </div>

        {/* Language toggle */}
        <div className={`flex items-center justify-between px-2.5 py-2 rounded-lg ${subtleBg(dark)}`}>
          <div className="flex items-center gap-2">
            <span className="text-[9px]">🌍</span>
            <span className={`text-[8px] ${text(dark)}`}>{isFr ? "Langue" : "Language"}</span>
          </div>
          <button
            onClick={() => onUpdate({ lang: isFr ? "en" : "fr" })}
            className={`text-[7px] font-semibold px-2 py-0.5 rounded ${dark ? "bg-white/10 text-white/60" : "bg-gray-200 text-gray-600"} transition-colors`}
          >
            {isFr ? "FR → EN" : "EN → FR"}
          </button>
        </div>

        {/* Other settings */}
        <SettingsRow dark={dark} icon="🔔" label="Notifications" detail="On" />
        <SettingsRow dark={dark} icon="📦" label={isFr ? "Stockage" : "Storage"} detail="24 MB" />
        <SettingsRow dark={dark} icon="🔒" label={isFr ? "Confidentialité" : "Privacy"} />
        <SettingsRow dark={dark} icon="ℹ️" label={isFr ? "À propos d'ISU" : "About ISU"} detail="v2.3.0" />
      </div>
      <HomeIndicator dark={dark} />
    </div>
  );
};

const SettingsRow = ({ dark, icon, label, detail }: { dark: boolean; icon: string; label: string; detail?: string }) => (
  <div className={`flex items-center justify-between px-2.5 py-2 rounded-lg ${subtleBg(dark)}`}>
    <div className="flex items-center gap-2">
      <span className="text-[9px]">{icon}</span>
      <span className={`text-[8px] ${text(dark)}`}>{label}</span>
    </div>
    <div className="flex items-center gap-1">
      {detail && <span className={`text-[7px] ${textMuted(dark)}`}>{detail}</span>}
      <svg className={`w-2 h-2 ${dark ? "text-white/20" : "text-gray-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    </div>
  </div>
);

/* ══════════════════════
   SCREEN: Clock
   ══════════════════════ */
const ClockScreen = ({ onBack, dark, lang }: { onBack: () => void; dark: boolean; lang: "fr" | "en" }) => (
  <div className={`absolute inset-0 flex flex-col ${bg(dark)}`}>
    <StatusBar dark={dark} />
    <AppNavBar title={lang === "fr" ? "Horloge" : "Clock"} onBack={onBack} dark={dark} />
    <div className="flex-1 flex flex-col items-center justify-center gap-2">
      <div className={`w-24 h-24 rounded-full border-2 flex items-center justify-center relative ${dark ? "border-white/10" : "border-gray-300"}`}>
        <div className={`absolute w-[1px] h-8 origin-bottom ${dark ? "bg-white/40" : "bg-gray-600"}`} style={{ transform: "rotate(120deg)", bottom: "50%", left: "calc(50% - 0.5px)" }} />
        <div className={`absolute w-[1.5px] h-6 origin-bottom ${dark ? "bg-white/60" : "bg-gray-800"}`} style={{ transform: "rotate(240deg)", bottom: "50%", left: "calc(50% - 0.75px)" }} />
        <div className="absolute w-[1px] h-9 bg-emerald-400/70 origin-bottom animate-[spin_60s_linear_infinite]" style={{ bottom: "50%", left: "calc(50% - 0.5px)" }} />
        <div className={`w-1.5 h-1.5 rounded-full z-10 ${dark ? "bg-white/60" : "bg-gray-800"}`} />
      </div>
      <div className={`text-[20px] font-light tabular-nums ${text(dark)}`}>9:41:23</div>
      <div className={`text-[7px] ${textMuted(dark)}`}>Paris, France</div>
    </div>
    <HomeIndicator dark={dark} />
  </div>
);

/* ══════════════════════
   MAIN: PhoneSimulator
   ══════════════════════ */
const PhoneSimulator = ({ className = "", reflectionAngle = 135, onInteracting }: PhoneSimulatorProps) => {
  const [screen, setScreen] = useState<Screen>("home");
  const [displayScreen, setDisplayScreen] = useState<Screen>("home");
  const [settings, setSettings] = useState<PhoneSettings>({ darkMode: true, lang: "fr" });

  const updateSettings = useCallback((partial: Partial<PhoneSettings>) => {
    setSettings((prev) => ({ ...prev, ...partial }));
  }, []);

  const openApp = useCallback((s: Screen) => {
    onInteracting?.(true);
    setDisplayScreen(s);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setScreen(s));
    });
  }, [onInteracting]);

  const goHome = useCallback(() => {
    onInteracting?.(false);
    setScreen("home");
    setTimeout(() => setDisplayScreen("home"), 350);
  }, [onInteracting]);

  const isHome = screen === "home";

  const renderApp = () => {
    const dark = settings.darkMode;
    switch (displayScreen) {
      case "isu": return <ISUScreen onBack={goHome} dark={dark} />;
      case "playstore": return <PlayStoreScreen onBack={goHome} dark={dark} lang={settings.lang} />;
      case "settings": return <SettingsScreen onBack={goHome} settings={settings} onUpdate={updateSettings} />;
      case "clock": return <ClockScreen onBack={goHome} dark={dark} lang={settings.lang} />;
      default: return null;
    }
  };

  return (
    <div
      className={`relative w-[200px] h-[410px] flex-shrink-0 ${className}`}
      onMouseEnter={() => !isHome && onInteracting?.(true)}
      onMouseLeave={() => onInteracting?.(false)}
    >
      <div className="absolute inset-0 rounded-[2.4rem] border-[2px] border-white/[0.10] bg-[hsl(240,6%,5%)] shadow-[0_0_60px_-15px_rgba(120,100,255,0.15),0_25px_50px_-12px_rgba(0,0,0,0.5)]">
        <div className="absolute -right-[3px] top-24 w-[3px] h-8 rounded-r-sm bg-white/[0.08]" />
        <div className="absolute -left-[3px] top-20 w-[3px] h-5 rounded-l-sm bg-white/[0.08]" />
        <div className="absolute -left-[3px] top-28 w-[3px] h-5 rounded-l-sm bg-white/[0.08]" />

        <div className={`absolute inset-[4px] rounded-[2.1rem] overflow-hidden ${bg(settings.darkMode)}`}>
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[72px] h-[22px] bg-black rounded-full z-30 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white/[0.04] ring-1 ring-white/[0.08]" />
          </div>

          {/* Home layer */}
          <div
            className="absolute inset-0 z-10 transition-all duration-300 ease-out"
            style={{
              transform: isHome ? "scale(1)" : "scale(0.88)",
              opacity: isHome ? 1 : 0,
              borderRadius: isHome ? "0" : "1rem",
              pointerEvents: isHome ? "auto" : "none",
            }}
          >
            <HomeScreen onOpen={openApp} settings={settings} />
          </div>

          {/* App layer */}
          {displayScreen !== "home" && (
            <div
              className="absolute inset-0 z-20 transition-all duration-300 ease-out"
              style={{
                transform: isHome ? "translateY(100%) scale(0.95)" : "translateY(0) scale(1)",
                opacity: isHome ? 0 : 1,
                pointerEvents: isHome ? "none" : "auto",
              }}
            >
              {renderApp()}
            </div>
          )}
        </div>

        <div
          className="absolute inset-[4px] rounded-[2.1rem] pointer-events-none opacity-[0.05] z-30"
          style={{ background: `linear-gradient(${reflectionAngle}deg, white 0%, transparent 45%)` }}
        />
      </div>
    </div>
  );
};

export default PhoneSimulator;
