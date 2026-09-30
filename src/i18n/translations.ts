export type Lang = "en" | "fr";

const translations = {
  en: {
    nav: {
      projects: "Projects",
      lab: "Lab",
      about: "About",
      ecosystem: "Sites",
      vanadvisor: "VanAdvisor",
      navigation: "Navigation",
    },
    hero: {
      subtitle: "Developer, tinkerer, pentester, PC builder, LLM wrangler... Currently building things that probably don't need to exist yet.",
      description: "EPITA — Info Sup (CS engineering prep) · France",
      cta: "See what I've built",
    },
    ecosystem: {
      label: "Ecosystem",
      title: "More from arthurjeaugey.com",
      description:
        "A small constellation of sites I've built — three study hubs for high school finals, a multiplayer game, and a site for an educational project.",
      visit: "Visit",
      sites: {
        game: {
          title: "Blades",
          tag: "Multiplayer game",
          description:
            "A fast-paced multiplayer browser game. Jump in, pick a blade, and play.",
        },
        nsi: {
          title: "NSI Revisions",
          tag: "Computer Science",
          description:
            "Structured study notes covering the French NSI Terminale curriculum — algorithms, networks, databases.",
        },
        maths: {
          title: "Maths Revisions",
          tag: "Mathematics",
          description:
            "Lessons, formulas and worked examples for the Terminale maths program.",
        },
        philo: {
          title: "Philo Revisions",
          tag: "Philosophy",
          description:
            "Notions, authors and essay frameworks for the French Bac philosophy exam.",
        },
        sommet: {
          title: "Les Maths au Sommet",
          tag: "Custom site",
          description:
            "Custom-built site and its admin CMS, for an educational project pairing mathematics with mountaineering.",
        },
      },
    },
    projects: {
      title: "Projects",
      description: "Things I've built — apps, tools, and experiments.",
      featured: {
        title: "ISU",
        description:
          "An AI-powered learning platform that turns handwritten notes into structured courses, quizzes and flashcards. Snap a photo of your notes and Gemini digitizes them with LaTeX support — then generates summaries, MCQs and study materials. Features a RAG chatbot that understands your courses, social learning with friends and groups, offline-first sync, and spaced repetition with score degradation.",
        badge: "New",
        playStore: "Available on Google Play",
        visitApp: "Open web app",
        features: [
          { label: "OCR + AI", detail: "Photo to notes" },
          { label: "RAG Chat", detail: "Ask your courses" },
          { label: "Social", detail: "Friends & groups" },
          { label: "Offline", detail: "Sync anywhere" },
        ],
      },
      items: [
        {
          title: "Emergency Crew",
          description:
            "A multiplayer co-op game (3–6 players) in 2D isometric view. Repair a failing space station together while competing to become Employee of the Month. Features cascading system failures, a combat system, and escalating phases.",
          badge: "In development",
        },
        {
          title: "π-thon",
          description:
            "A Python application that visualizes different mathematical methods for estimating π — Monte Carlo, Leibniz series, Buffon's needle — and compares their convergence rates.",
        },
        {
          title: "Weather Forecast Bias Correction",
          description:
            "An ML pipeline that identifies and corrects systematic errors in numerical weather forecasts. Uses gradient boosting on historical forecast-observation pairs.",
        },
      ],
    },
    lab: {
      title: "Lab",
      description: "Where I explore systems, break things, and document what I learn.",
      descriptionHint: "Click a card or type in the terminal to explore.",
      ready: "Ready — type a command or click an experiment",
      helpTitle: "Available commands:",
      helpLs: "List directory contents",
      helpCd: "Change directory  (.. to go up)",
      helpCat: "Open experiment report",
      helpPwd: "Print working directory",
      helpTree: "Show directory tree",
      helpWhoami: "Current user",
      helpDate: "Show date",
      helpClear: "Clear terminal",
      experiments: "Experiments",
      openingReport: "Opening report...",
      noSuchFile: "No such file",
      available: "Available",
      commandNotFound: "command not found",
      typeHelp: "Type 'help' for available commands",
      cardHint: "clicking a card runs",
      inTerminal: "in the terminal",
      keyFindings: "Key Findings",
      exploring: "What I'm exploring",
      stack: "Stack",
      active: "Active",
      findings: "findings",
      tools: "tools",
      experiments_count: "experiments",
    },
    experiment: {
      localLlms: {
        title: "Running Local LLMs on Consumer Hardware",
        description:
          "Running local language models day-to-day — testing usability, responsiveness and real-world limits on my own machine.",
        summary:
          "Less about benchmarks, more about what it actually feels like to run modern language models locally. I've been using and switching between models to understand their real-world usability: speed, responsiveness, and where they break down.",
        highlights: [
          "Running GLM 4.7 Flash Q4_K_M as a daily local model",
          "Tested several models to compare output quality and responsiveness",
          "Noticed that model usability degrades well before VRAM is fully saturated",
          "Found that prompt length matters as much as model size for perceived speed",
        ],
        exploring: [
          "How different models handle long context windows locally",
          "The gap between local and cloud model usability in practice",
          "Which model sizes are actually useful vs just technically runnable",
        ],
      },
      quantization: {
        title: "GPU Memory & Quantization Notes",
        description:
          "An engineering notebook on quantization: how format choices affect memory, quality and practical usability on consumer GPUs.",
        summary:
          "A running technical log rather than a finished study. I'm documenting what I observe about quantization formats, VRAM behavior and model quality as I actually use these models — not to publish results, but to build real intuition.",
        highlights: [
          "Compared Q4_K_M vs heavier quantizations in practice",
          "Observed when models start spilling outside VRAM under load",
          "Explored how context size impacts memory usage non-linearly",
          "Documented practical limits of consumer GPUs for different model sizes",
        ],
        exploring: [
          "How quantization affects usability, not just perplexity scores",
          "The point where VRAM becomes the real bottleneck",
          "Whether lighter quantizations are viable for real tasks",
        ],
      },
      tryhackme: {
        title: "TryHackMe — Security Learning",
        description:
          "Working through hands-on labs to improve my understanding of Linux, networking, enumeration and offensive security basics.",
        summary:
          "I use TryHackMe as a practical way to explore cybersecurity. I worked through the foundations — Linux, networking, enumeration and early offensive security concepts — completed the Cyber Security 101 path, and I'm now working through the Jr Penetration Tester path.",
        highlights: [
          "Reached the top 5% on TryHackMe",
          "Completed 97 rooms",
          "Completed the Cyber Security 101 path",
          "Now working through the Jr Penetration Tester path",
        ],
      },
      workstation: {
        title: "PC Building — 4 Builds & Counting",
        description:
          "Building PCs from scratch and salvaging prebuilds — choosing components, fixing incompatibilities, and learning how the hardware actually works.",
        summary:
          "What started as building my own machine turned into a real passion for PC hardware. I've built 4 PCs so far — from a fully custom high-end workstation to Frankenstein machines assembled from prebuild leftovers. Each one taught me something different about compatibility, trade-offs and how the hardware really works.",
        highlights: [
          "Built my own workstation from scratch: R9 9950X3D, RTX 5080, 64GB RAM, Samsung 9100 Pro, X870E-E — every component chosen and compared manually",
          "Rebuilt my brother's PC from an old ASUS ROG prebuild — new motherboard and PSU to support a proper GPU upgrade",
          "Upgraded my little brother's HP Omen: identified the performance bottlenecks and replaced only what actually mattered",
          "Built a Frankenstein PC for my brother's girlfriend from 3 prebuilds and spare parts — manually flashed BIOS for CPU compatibility and repaired bent CPU pins",
        ],
        exploring: [
          "How to identify real bottlenecks vs. marketing noise in prebuild hardware",
          "Component compatibility edge cases that documentation doesn't cover",
          "The gap between spec sheet numbers and actual real-world performance",
        ],
      },
      printing: {
        title: "3D Printing & Digital Fabrication",
        description:
          "Using 3D printing and laser engraving to prototype ideas, create useful objects and explore digital fabrication.",
        summary:
          "I'm interested in fabrication as a natural extension of software and systems thinking: taking an idea, prototyping it, iterating on it, and turning it into something real.",
        highlights: [
          "Regularly use a 3D printer for prototyping and experimentation",
          "Also use a LaserPecker LP2 for engraving-related projects",
          "Previously sold 2 digital 3D files on Cults",
          "Interested in the full loop from idea to usable object",
        ],
      },
    },
    about: {
      title: "About",
      paragraphs: [
        "I'm Arthur, a computer science student at EPITA in France, currently in the first year of the integrated preparatory program (Info Sup). I'm drawn to the intersection of software engineering and complex systems — the kind of problems where you have to understand what's happening several layers below the surface.",
        "Most of my time goes into building things: mobile apps, ML pipelines, tools that solve real problems. Outside of that, I explore AI infrastructure, cybersecurity, and low-level systems. I like understanding how technology works, not just how to use it.",
        "When I'm not coding, I'm probably tuning 3D printer settings, reading about systems design, or setting up another experiment on my workstation.",
      ],
      stats: ["EPITA — Info Sup", "Top 5% TryHackMe", "4+ PC builds", "ISU on Play Store"],
    },
    contact: {
      tagline: "Want to chat? I'm open to opportunities and interesting projects.",
    },
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      link: "Return to Home",
    },
    vanadvisor: {
      label: "Case study",
      title: "VanAdvisor",
      lede: "VanAdvisor helps future motorhome buyers find the right model, for free: a 14-question quiz compares the 1,800 models in the catalogue and recommends 12. I led the full rebuild of the site for a client, from audit to production.",
      meta: ["Client project, end to end", "Audit in late August 2026", "Rebuilt 15–27 September 2026"],
      road: {
        title: "The route",
        description: "Late August to 27 September 2026. At each sign, what the site left behind and what it found on arrival.",
        from: "late Aug.",
        to: "27 Sept.",
        before: "Before:",
        after: "After:",
        milestones: [
          {
            label: "Homepage first display",
            before: "13\u00a0s",
            after: "0.7\u00a0s",
            detail: "On a phone over slow 4G. The vehicle database now loads only when the quiz starts, and off-screen animations pause.",
          },
          {
            label: "Vehicle listings",
            before: "1,260",
            after: "1,800",
            detail: "250 made-up models removed, 78 duplicates merged, every listing sourced.",
          },
          {
            label: "Photos",
            before: "0",
            after: "1,800",
            detail: "One per listing, 1,454 of them official manufacturer photos, each checked by hand.",
          },
          {
            label: "Known defects",
            before: "72",
            after: "0",
            detail: "3 of them broke entire user flows. None left open after a full 92-point audit.",
          },
          {
            label: "Automated tests",
            before: "0",
            after: "1,171",
            detail: "Assertions across 21 suites, including full journeys in a real browser, run on every change.",
          },
          {
            label: "Hosting",
            before: "Netlify",
            after: "Cloudflare",
            detail: "From blocked deployments to hosting and a database at €0 a month.",
          },
        ],
        finale: {
          value: "Delivered",
          caption: "27.09.2026",
          detail: "Handed over to the client with a 13-page delivery report and a jargon-free handover guide.",
        },
      },
      stories: {
        title: "Under the hood",
        items: [
          {
            title: "Law before design",
            body: "A French law on telephone canvassing came into force on 11 August 2026, and the site's contact form did not comply. It was redesigned around an optional consent box, never pre-ticked: the phone number is only requested once consent is given, and the proof is kept for three years.",
          },
          {
            title: "Data you can trust",
            body: "250 models that didn't exist, 78 duplicates, no sources. Every listing now cites its own, photos come from the manufacturers, and the 18-page table of Camping-Car Magazine's 2027 Panorama was transcribed and checked line by line: 1,394 rows, five misprints corrected with evidence.",
          },
          {
            title: "A production incident, handled",
            body: "After a deployment, a Cloudflare routing rule cut every API route for 13 minutes. Root cause found, fix shipped, a guard test added so it cannot happen again, and a written post-mortem.",
          },
          {
            title: "Back office: no entry",
            body: "Invisible to everyone else (it answers with a 404), every call re-checked server-side, a nonce-based security policy, and no visitor text can execute. Inside, a map of buyers and dealers by département in Lambert-93 projection: 96 départements in 44\u00a0KB, borders still seamless after simplification.",
          },
        ],
      },
      role: {
        title: "My role",
        body: "End-to-end engagement for a client: audit of the existing site and rebuild plan; product, design, data and legal decisions; full-stack development (front end, serverless API, database, emails, AI assistant, back office); tests, continuous integration, deployment and a delivery report.",
      },
      method: {
        title: "Method",
        body: "Development was carried out with AI coding agents (Claude Code). I scoped and split the work, made the calls, had every delivery verified (tests, on-screen review on phone and desktop, audits) and ran the production rollout.",
      },
      stackTitle: "Stack",
    },
    legal: {
      title: "Legal notice",
      updated: "Last updated: September 30, 2026",
      back: "Back to home",
      publisher: {
        title: "Publisher",
        intro: "This website is a personal portfolio, published on a non-professional basis by:",
        name: "Name",
        contact: "Contact",
        director: "Publication director",
        note: "In accordance with French law no. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), the publisher, acting on a non-professional basis, does not disclose a personal postal address. Identification details have been provided to the hosting provider.",
      },
      host: {
        title: "Hosting",
        intro: "This website is hosted on GitHub Pages, a service provided by:",
        company: "Company",
        address: "Address",
        phone: "Phone",
        website: "Website",
        country: "United States",
      },
      sections: [
        {
          title: "Intellectual property",
          paragraphs: [
            "Unless otherwise stated, the texts, visuals and graphic elements of this website are the property of Arthur Jeaugey. Any reproduction, representation or reuse, in whole or in part, without prior written permission is prohibited.",
            "Third-party names, trademarks and logos mentioned on this website remain the property of their respective owners.",
          ],
        },
        {
          title: "Personal data",
          paragraphs: [
            "This website has no forms, no user accounts and no analytics: the publisher does not collect any personal data during your visit.",
            "As the hosting provider, GitHub logs visitors' IP addresses for security purposes. This processing is carried out by GitHub under its own privacy statement.",
            "If you contact the publisher by email, your address and the content of your message are used solely to reply to you and are not shared with any third party.",
            "Under the General Data Protection Regulation (GDPR) and the French Data Protection Act, you have the right to access, rectify and erase data concerning you, which you can exercise by writing to the contact address above. You may also lodge a complaint with the CNIL, the French data protection authority.",
          ],
          links: [
            {
              label: "GitHub Privacy Statement",
              url: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
            },
            { label: "CNIL", url: "https://www.cnil.fr" },
          ],
        },
        {
          title: "Cookies and local storage",
          paragraphs: [
            "This website does not set any cookies. Only your language preference (FR/EN) is saved in your browser's local storage so that it is remembered between visits. This information stays on your device and is not sent to anyone; you can delete it at any time from your browser settings.",
          ],
        },
        {
          title: "Third-party content",
          paragraphs: [
            "Some resources are loaded from third-party services, which receive your IP address when doing so: fonts (Google Fonts) and, when you open them, the TryHackMe badge and the preview of the ISU app (app.isu.gg), embedded in frames. These services are subject to their own privacy policies.",
          ],
        },
        {
          title: "External links",
          paragraphs: [
            "This website contains links to third-party websites. The publisher has no control over their content and cannot be held responsible for it.",
          ],
        },
      ],
    },
  },
  fr: {
    nav: {
      projects: "Projets",
      lab: "Labo",
      about: "À propos",
      ecosystem: "Sites",
      vanadvisor: "VanAdvisor",
      navigation: "Navigation",
    },
    hero: {
      subtitle: "Développeur, bidouilleur, pentesteur, monteur de PC, dresseur de LLMs... Passe plus de temps à essayer de comprendre les choses qu'à les utiliser.",
      description: "EPITA — Info Sup (prépa intégrée) · France",
      cta: "Voir mes projets",
    },
    ecosystem: {
      label: "Écosystème",
      title: "Mes autres sites",
      description:
        "Une petite constellation de sites que j'ai construits — trois espaces de révisions pour le bac, un jeu multijoueur, et un site pour un projet pédagogique.",
      visit: "Visiter",
      sites: {
        game: {
          title: "Blades",
          tag: "Jeu multijoueur",
          description:
            "Un jeu multijoueur nerveux dans le navigateur. Tu choisis ta lame et tu joues, c'est tout.",
        },
        nsi: {
          title: "Révisions NSI",
          tag: "Informatique",
          description:
            "Fiches structurées du programme de NSI Terminale — algorithmes, réseaux, bases de données.",
        },
        maths: {
          title: "Révisions Maths",
          tag: "Mathématiques",
          description:
            "Cours, formules et exemples corrigés du programme de maths Terminale.",
        },
        philo: {
          title: "Révisions Philo",
          tag: "Philosophie",
          description:
            "Notions, auteurs et méthodes de dissertation pour l'épreuve de philo du Bac.",
        },
        sommet: {
          title: "Les Maths au Sommet",
          tag: "Site sur-mesure",
          description:
            "Site développé sur-mesure et son CMS d'administration, pour un projet pédagogique alliant mathématiques et alpinisme.",
        },
      },
    },
    projects: {
      title: "Projets",
      description: "Ce que j'ai construit — applis, outils et expériences.",
      featured: {
        title: "ISU",
        description:
          "Une plateforme d'apprentissage augmentée par l'IA qui transforme vos notes manuscrites en cours structurés, quiz et flashcards. Prenez une photo de vos notes et Gemini les numérise avec support LaTeX — puis génère résumés, QCM et supports de révision. Inclut un chatbot RAG qui comprend vos cours, l'apprentissage social avec amis et groupes, la synchronisation offline-first, et la répétition espacée avec dégradation des scores.",
        badge: "Nouveau",
        playStore: "Disponible sur Google Play",
        visitApp: "Ouvrir l'appli web",
        features: [
          { label: "OCR + IA", detail: "Photo vers notes" },
          { label: "Chat RAG", detail: "Interroge tes cours" },
          { label: "Social", detail: "Amis et groupes" },
          { label: "Hors-ligne", detail: "Sync partout" },
        ],
      },
      items: [
        {
          title: "Emergency Crew",
          description:
            "Un jeu multijoueur coopératif (3–6 joueurs) en vue isométrique 2D. Réparez une station spatiale défaillante ensemble tout en rivalisant pour devenir l'Employé du Mois. Pannes en cascade, système de combat et phases d'escalade.",
          badge: "En développement",
        },
        {
          title: "π-thon",
          description:
            "Une application Python qui visualise différentes méthodes mathématiques pour estimer π — Monte Carlo, série de Leibniz, aiguille de Buffon — et compare leurs vitesses de convergence.",
        },
        {
          title: "Correction de biais des prévisions météo",
          description:
            "Un pipeline ML qui identifie et corrige les erreurs systématiques dans les prévisions météo numériques. Utilise du gradient boosting sur des paires historiques prévision-observation.",
        },
      ],
    },
    lab: {
      title: "Labo",
      description:
        "Où j'explore des systèmes, je casse des choses et je documente ce que j'apprends.",
      descriptionHint: "Cliquez sur une carte ou tapez dans le terminal pour explorer.",
      ready: "Prêt — tapez une commande ou cliquez sur une expérience",
      helpTitle: "Commandes disponibles :",
      helpLs: "Lister le contenu d'un répertoire",
      helpCd: "Changer de répertoire  (.. pour remonter)",
      helpCat: "Ouvrir le rapport d'une expérience",
      helpPwd: "Afficher le répertoire courant",
      helpTree: "Afficher l'arborescence",
      helpWhoami: "Utilisateur courant",
      helpDate: "Afficher la date",
      helpClear: "Effacer le terminal",
      experiments: "Expériences",
      openingReport: "Ouverture du rapport...",
      noSuchFile: "Fichier introuvable",
      available: "Disponibles",
      commandNotFound: "commande introuvable",
      typeHelp: "Tapez 'help' pour voir les commandes",
      cardHint: "cliquer une carte exécute",
      inTerminal: "dans le terminal",
      keyFindings: "Résultats clés",
      exploring: "Ce que j'explore",
      stack: "Stack",
      active: "Actif",
      findings: "résultats",
      tools: "outils",
      experiments_count: "expériences",
    },
    experiment: {
      localLlms: {
        title: "LLMs locaux sur matériel grand public",
        description:
          "Utilisation quotidienne de modèles de langage en local — tests d'utilisabilité, de réactivité et des limites concrètes sur ma propre machine.",
        summary:
          "Moins une question de benchmarks que de ressenti réel à l'usage de modèles de langage en local. J'alterne entre plusieurs modèles pour comprendre leur utilisabilité : vitesse, réactivité et limites.",
        highlights: [
          "Utilisation de GLM 4.7 Flash Q4_K_M comme modèle local quotidien",
          "Test de plusieurs modèles pour comparer qualité et réactivité",
          "Constaté que l'utilisabilité se dégrade bien avant la saturation de la VRAM",
          "La longueur du prompt impacte autant que la taille du modèle sur la vitesse perçue",
        ],
        exploring: [
          "Comment différents modèles gèrent les longs contextes en local",
          "L'écart d'utilisabilité entre modèles locaux et cloud en pratique",
          "Quelles tailles de modèles sont réellement utiles vs juste exécutables",
        ],
      },
      quantization: {
        title: "Mémoire GPU et notes sur la quantization",
        description:
          "Un carnet d'ingénieur sur la quantization : comment les choix de format affectent la mémoire, la qualité et l'utilisabilité sur GPU grand public.",
        summary:
          "Un journal technique en cours plutôt qu'une étude finalisée. Je documente ce que j'observe sur les formats de quantization, le comportement VRAM et la qualité des modèles en usage réel — pas pour publier, mais pour construire une intuition concrète.",
        highlights: [
          "Comparaison de Q4_K_M vs des quantizations plus lourdes en pratique",
          "Observation du moment où les modèles débordent de la VRAM sous charge",
          "Exploration de l'impact non-linéaire de la taille du contexte sur la mémoire",
          "Documentation des limites pratiques des GPU grand public selon la taille des modèles",
        ],
        exploring: [
          "Comment la quantization affecte l'utilisabilité, pas seulement la perplexité",
          "Le point où la VRAM devient le vrai goulot d'étranglement",
          "Si les quantizations légères sont viables pour des tâches réelles",
        ],
      },
      tryhackme: {
        title: "TryHackMe — Apprentissage sécurité",
        description:
          "Travail sur des labs pratiques pour améliorer ma compréhension de Linux, du réseau, de l'énumération et des bases de la sécurité offensive.",
        summary:
          "J'utilise TryHackMe comme approche pratique de la cybersécurité. J'ai travaillé les fondamentaux — Linux, réseau, énumération et concepts de base de la sécurité offensive — terminé le parcours Cyber Security 101, et j'attaque maintenant le parcours Jr Penetration Tester.",
        highlights: [
          "Atteint le top 5% sur TryHackMe",
          "97 rooms complétées",
          "Parcours Cyber Security 101 terminé",
          "Parcours Jr Penetration Tester en cours",
        ],
      },
      workstation: {
        title: "Montage PC — 4 builds et plus",
        description:
          "Montage de PCs from scratch et récupération de prebuilds — choix des composants, résolution d'incompatibilités et compréhension concrète du hardware.",
        summary:
          "Ce qui a commencé par le montage de ma propre machine est devenu une vraie passion pour le hardware PC. J'ai monté 4 PCs — d'un poste haut de gamme entièrement custom à des machines Frankenstein assemblées à partir de restes de prebuilds. Chacun m'a appris quelque chose de différent sur la compatibilité, les compromis et le fonctionnement réel du matériel.",
        highlights: [
          "Monté mon propre poste from scratch : R9 9950X3D, RTX 5080, 64Go RAM, Samsung 9100 Pro, X870E-E — chaque composant choisi et comparé manuellement",
          "Reconstruit le PC de mon frère à partir d'un ancien prebuild ASUS ROG — nouvelle carte mère et alimentation pour un vrai upgrade GPU",
          "Upgrade du HP Omen de mon petit frère : identification des vrais goulots d'étranglement et remplacement uniquement de ce qui comptait",
          "Monté un PC Frankenstein pour la copine de mon frère à partir de 3 prebuilds et pièces détachées — flash BIOS manuel pour compatibilité CPU et réparation de pins tordus",
        ],
        exploring: [
          "Comment identifier les vrais bottlenecks vs le marketing dans le hardware prebuild",
          "Les cas limites de compatibilité que la documentation ne couvre pas",
          "L'écart entre les specs sur papier et les performances réelles",
        ],
      },
      printing: {
        title: "Impression 3D et fabrication numérique",
        description:
          "Utilisation de l'impression 3D et de la gravure laser pour prototyper des idées, créer des objets utiles et explorer la fabrication numérique.",
        summary:
          "Je m'intéresse à la fabrication comme extension naturelle du logiciel et de la pensée système : prendre une idée, la prototyper, itérer dessus et la transformer en quelque chose de réel.",
        highlights: [
          "Utilisation régulière d'une imprimante 3D pour le prototypage et l'expérimentation",
          "Utilisation d'un LaserPecker LP2 pour des projets de gravure",
          "Vente de 2 fichiers 3D numériques sur Cults",
          "Intéressé par la boucle complète de l'idée à l'objet utilisable",
        ],
      },
    },
    about: {
      title: "À propos",
      paragraphs: [
        "Je suis Arthur, étudiant en informatique à l'EPITA, en première année de prépa intégrée (Info Sup). Je suis attiré par l'intersection entre l'ingénierie logicielle et les systèmes complexes — le type de problèmes où il faut comprendre ce qui se passe plusieurs couches en dessous de la surface.",
        "La plupart de mon temps est consacré à construire des choses : applications mobiles, pipelines ML, outils qui résolvent de vrais problèmes. En dehors de ça, j'explore l'infrastructure IA, la cybersécurité et les systèmes bas niveau. J'aime comprendre comment la technologie fonctionne, pas juste comment l'utiliser.",
        "Quand je ne code pas, je suis probablement en train de régler les paramètres de mon imprimante 3D, de lire sur le design de systèmes, ou de monter une nouvelle expérience sur mon poste de travail.",
      ],
      stats: ["EPITA — Info Sup", "Top 5% TryHackMe", "4+ PC builds", "ISU sur le Play Store"],
    },
    contact: {
      tagline: "Envie de discuter ? Je suis ouvert aux opportunités et aux projets intéressants.",
    },
    notFound: {
      title: "404",
      message: "Oups ! Page introuvable",
      link: "Retour à l'accueil",
    },
    vanadvisor: {
      label: "Étude de cas",
      title: "VanAdvisor",
      lede: "VanAdvisor aide les futurs acheteurs de camping-car à trouver le bon modèle, gratuitement : un questionnaire de 14 questions compare les 1\u00a0800 modèles du catalogue et en recommande 12. J'ai mené la refonte complète du site pour un client, de l'audit à la mise en production.",
      meta: ["Mission client, de bout en bout", "Audit fin août 2026", "Refonte du 15 au 27 septembre 2026"],
      road: {
        title: "Le trajet",
        description: "De fin août au 27 septembre 2026. À chaque panneau, ce que le site laisse derrière lui et ce qu'il trouve en arrivant.",
        from: "fin août",
        to: "27 sept.",
        before: "Avant :",
        after: "Après :",
        milestones: [
          {
            label: "Premier affichage de l'accueil",
            before: "13\u00a0s",
            after: "0,7\u00a0s",
            detail: "Sur un téléphone en 4G lente. La base de véhicules n'est plus chargée qu'au démarrage du questionnaire, et les animations hors de l'écran se figent.",
          },
          {
            label: "Fiches véhicules",
            before: "1\u00a0260",
            after: "1\u00a0800",
            detail: "250 modèles inventés retirés, 78 doublons fusionnés, 100\u00a0% des fiches sourcées.",
          },
          {
            label: "Photos",
            before: "0",
            after: "1\u00a0800",
            detail: "Une par fiche, dont 1\u00a0454 officielles du constructeur, relues une à une.",
          },
          {
            label: "Défauts connus",
            before: "72",
            after: "0",
            detail: "Dont 3 qui cassaient des parcours entiers. Plus aucun d'ouvert après un audit complet de 92 points.",
          },
          {
            label: "Tests automatiques",
            before: "0",
            after: "1\u00a0171",
            detail: "Assertions réparties en 21 suites, dont des parcours complets dans un vrai navigateur, lancées à chaque modification.",
          },
          {
            label: "Hébergement",
            before: "Netlify",
            after: "Cloudflare",
            detail: "Des déploiements bloqués à un hébergement et une base de données à 0\u00a0€ par mois.",
          },
        ],
        finale: {
          value: "Livré",
          caption: "27.09.2026",
          detail: "Remis au client avec un rapport de livraison de 13 pages et un guide de prise en main sans jargon.",
        },
      },
      stories: {
        title: "Sous le capot",
        items: [
          {
            title: "La loi avant le design",
            body: "Une loi sur le démarchage téléphonique entrait en vigueur le 11 août 2026, et le formulaire de contact n'y était pas conforme. Il a été repensé autour d'un accord facultatif, jamais coché d'avance : le téléphone n'est demandé que si l'accord est donné, et la preuve est conservée trois ans.",
          },
          {
            title: "Des données qu'on peut croire",
            body: "250 modèles qui n'existaient pas, 78 doublons, aucune source. Chaque fiche cite désormais la sienne, les photos viennent des constructeurs, et les 18 pages de tableau du Panorama 2027 de Camping-Car Magazine ont été transcrites puis contrôlées ligne à ligne : 1\u00a0394 lignes, cinq coquilles corrigées preuves à l'appui.",
          },
          {
            title: "Un incident de production, géré",
            body: "Après un déploiement, une règle de routage Cloudflare a coupé toutes les routes d'API pendant 13 minutes. Cause trouvée, correctif en ligne, test garde-fou ajouté pour que ça ne se reproduise pas, compte rendu écrit.",
          },
          {
            title: "Back-office : accès interdit",
            body: "Invisible pour les autres (il répond par une page 404), chaque appel revérifié côté serveur, une politique de sécurité à nonce, et aucun texte de visiteur ne peut s'exécuter. Dedans, une carte des acheteurs et des concessionnaires par département en projection Lambert-93 : 96 départements en 44\u00a0Ko, frontières jointives après simplification.",
          },
        ],
      },
      role: {
        title: "Mon rôle",
        body: "Mission menée de bout en bout pour un client : audit du site existant et plan de refonte ; arbitrage des décisions produit, design, données et juridiques ; développement full-stack (front, API serverless, base de données, emails, assistant IA, back-office) ; tests, intégration continue, mise en production et rapport de livraison.",
      },
      method: {
        title: "Méthode",
        body: "Le développement a été mené avec des agents de code IA (Claude Code). Je cadrais, découpais le travail, tranchais les décisions, faisais vérifier chaque livraison (tests, relecture à l'écran sur téléphone et ordinateur, audits) et gérais la mise en production.",
      },
      stackTitle: "Stack",
    },
    legal: {
      title: "Mentions légales",
      updated: "Dernière mise à jour : 30 septembre 2026",
      back: "Retour à l'accueil",
      publisher: {
        title: "Éditeur du site",
        intro: "Ce site est un portfolio personnel, édité à titre non professionnel par :",
        name: "Nom",
        contact: "Contact",
        director: "Directeur de la publication",
        note: "Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), l'éditeur, agissant à titre non professionnel, ne rend pas publique son adresse personnelle. Ses éléments d'identification ont été communiqués à l'hébergeur.",
      },
      host: {
        title: "Hébergement",
        intro: "Le site est hébergé sur GitHub Pages, un service fourni par :",
        company: "Raison sociale",
        address: "Adresse",
        phone: "Téléphone",
        website: "Site web",
        country: "États-Unis",
      },
      sections: [
        {
          title: "Propriété intellectuelle",
          paragraphs: [
            "Sauf mention contraire, les textes, visuels et éléments graphiques de ce site sont la propriété d'Arthur Jeaugey. Toute reproduction, représentation ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.",
            "Les noms, marques et logos de tiers mentionnés sur ce site restent la propriété de leurs détenteurs respectifs.",
          ],
        },
        {
          title: "Données personnelles",
          paragraphs: [
            "Ce site ne comporte ni formulaire, ni espace membre, ni outil de mesure d'audience : l'éditeur ne collecte aucune donnée personnelle lors de votre visite.",
            "En tant qu'hébergeur, GitHub enregistre l'adresse IP des visiteurs à des fins de sécurité. Ce traitement est effectué par GitHub, conformément à sa propre déclaration de confidentialité.",
            "Si vous contactez l'éditeur par e-mail, votre adresse et le contenu de votre message sont utilisés uniquement pour vous répondre et ne sont transmis à aucun tiers.",
            "Conformément au Règlement général sur la protection des données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification et d'effacement des données vous concernant, que vous pouvez exercer en écrivant à l'adresse de contact ci-dessus. Vous pouvez également adresser une réclamation à la CNIL.",
          ],
          links: [
            {
              label: "Déclaration de confidentialité de GitHub",
              url: "https://docs.github.com/fr/site-policy/privacy-policies/github-general-privacy-statement",
            },
            { label: "CNIL", url: "https://www.cnil.fr" },
          ],
        },
        {
          title: "Cookies et stockage local",
          paragraphs: [
            "Ce site ne dépose aucun cookie. Seule votre préférence de langue (FR/EN) est enregistrée dans le stockage local de votre navigateur afin d'être conservée d'une visite à l'autre. Cette information reste sur votre appareil et n'est transmise à personne ; vous pouvez la supprimer à tout moment depuis les paramètres de votre navigateur.",
          ],
        },
        {
          title: "Contenus tiers",
          paragraphs: [
            "Certaines ressources sont chargées depuis des services tiers, qui reçoivent à cette occasion votre adresse IP : les polices de caractères (Google Fonts) et, lorsque vous les affichez, le badge TryHackMe et l'aperçu de l'application ISU (app.isu.gg), intégrés dans des cadres. Ces services sont soumis à leurs propres politiques de confidentialité.",
          ],
        },
        {
          title: "Liens externes",
          paragraphs: [
            "Ce site contient des liens vers des sites tiers. L'éditeur n'exerce aucun contrôle sur leur contenu et ne saurait être tenu responsable de celui-ci.",
          ],
        },
      ],
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
export default translations;
