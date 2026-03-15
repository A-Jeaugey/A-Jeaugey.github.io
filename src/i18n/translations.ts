export type Lang = "en" | "fr";

const translations = {
  en: {
    nav: {
      projects: "Projects",
      lab: "Lab",
      about: "About",
      navigation: "Navigation",
    },
    hero: {
      subtitle: "I build software, experiment with AI, and dig into complex systems.",
      description:
        "Currently studying computer science in France. Interested in how things work under the hood — from neural networks to operating systems.",
      cta: "See what I've built",
    },
    projects: {
      title: "Projects",
      description: "Things I've built — apps, tools, and experiments.",
      items: [
        {
          title: "ISU",
          description:
            "A mobile app that uses AI to generate study materials from course content. Built with React Native, integrating LLM APIs for summarization and quiz generation.",
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
          "I use TryHackMe as a practical way to explore cybersecurity. So far I've mainly focused on foundational content: Linux, networking, enumeration and early offensive security concepts.",
        highlights: [
          "Reached the top 9% on TryHackMe",
          "Completed 59 rooms",
          "Worked through most of the Pre Security path",
          "Used the platform to strengthen my Linux and network basics",
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
        "I'm Arthur, a computer science student based in France. I'm drawn to the intersection of software engineering and complex systems — the kind of problems where you have to understand what's happening several layers below the surface.",
        "Most of my time goes into building things: mobile apps, ML pipelines, tools that solve real problems. Outside of that, I explore AI infrastructure, cybersecurity, and low-level systems. I like understanding how technology works, not just how to use it.",
        "When I'm not coding, I'm probably tuning 3D printer settings, reading about systems design, or setting up another experiment on my workstation.",
      ],
    },
    notFound: {
      title: "404",
      message: "Oops! Page not found",
      link: "Return to Home",
    },
  },
  fr: {
    nav: {
      projects: "Projets",
      lab: "Labo",
      about: "A propos",
      navigation: "Navigation",
    },
    hero: {
      subtitle:
        "Je developpe des logiciels, j'experimente avec l'IA et j'explore des systemes complexes.",
      description:
        "Etudiant en informatique en France. Interesse par le fonctionnement en profondeur des technologies — des reseaux de neurones aux systemes d'exploitation.",
      cta: "Voir mes projets",
    },
    projects: {
      title: "Projets",
      description: "Ce que j'ai construit — applis, outils et experiences.",
      items: [
        {
          title: "ISU",
          description:
            "Une application mobile qui utilise l'IA pour generer des supports de revision a partir de cours. Developpee en React Native, avec des APIs de LLM pour le resume et la generation de quiz.",
        },
        {
          title: "π-thon",
          description:
            "Une application Python qui visualise differentes methodes mathematiques pour estimer π — Monte Carlo, serie de Leibniz, aiguille de Buffon — et compare leurs vitesses de convergence.",
        },
        {
          title: "Correction de biais des previsions meteo",
          description:
            "Un pipeline ML qui identifie et corrige les erreurs systematiques dans les previsions meteo numeriques. Utilise du gradient boosting sur des paires historiques prevision-observation.",
        },
      ],
    },
    lab: {
      title: "Labo",
      description:
        "Ou j'explore des systemes, je casse des choses et je documente ce que j'apprends.",
      descriptionHint: "Cliquez sur une carte ou tapez dans le terminal pour explorer.",
      ready: "Pret — tapez une commande ou cliquez sur une experience",
      helpTitle: "Commandes disponibles :",
      helpLs: "Lister le contenu d'un repertoire",
      helpCd: "Changer de repertoire  (.. pour remonter)",
      helpCat: "Ouvrir le rapport d'une experience",
      helpPwd: "Afficher le repertoire courant",
      helpTree: "Afficher l'arborescence",
      helpWhoami: "Utilisateur courant",
      helpDate: "Afficher la date",
      helpClear: "Effacer le terminal",
      experiments: "Experiences",
      openingReport: "Ouverture du rapport...",
      noSuchFile: "Fichier introuvable",
      available: "Disponibles",
      commandNotFound: "commande introuvable",
      typeHelp: "Tapez 'help' pour voir les commandes",
      cardHint: "cliquer une carte execute",
      inTerminal: "dans le terminal",
      keyFindings: "Resultats cles",
      exploring: "Ce que j'explore",
      stack: "Stack",
      active: "Actif",
      findings: "resultats",
      tools: "outils",
      experiments_count: "experiences",
    },
    experiment: {
      localLlms: {
        title: "LLMs locaux sur materiel grand public",
        description:
          "Utilisation quotidienne de modeles de langage en local — tests d'utilisabilite, de reactivite et des limites concretes sur ma propre machine.",
        summary:
          "Moins une question de benchmarks que de ressenti reel a l'usage de modeles de langage en local. J'alterne entre plusieurs modeles pour comprendre leur utilisabilite : vitesse, reactivite et limites.",
        highlights: [
          "Utilisation de GLM 4.7 Flash Q4_K_M comme modele local quotidien",
          "Test de plusieurs modeles pour comparer qualite et reactivite",
          "Constate que l'utilisabilite se degrade bien avant la saturation de la VRAM",
          "La longueur du prompt impacte autant que la taille du modele sur la vitesse percue",
        ],
        exploring: [
          "Comment differents modeles gerent les longs contextes en local",
          "L'ecart d'utilisabilite entre modeles locaux et cloud en pratique",
          "Quelles tailles de modeles sont reellement utiles vs juste executables",
        ],
      },
      quantization: {
        title: "Memoire GPU et notes sur la quantization",
        description:
          "Un carnet d'ingenieur sur la quantization : comment les choix de format affectent la memoire, la qualite et l'utilisabilite sur GPU grand public.",
        summary:
          "Un journal technique en cours plutot qu'une etude finalisee. Je documente ce que j'observe sur les formats de quantization, le comportement VRAM et la qualite des modeles en usage reel — pas pour publier, mais pour construire une intuition concrete.",
        highlights: [
          "Comparaison de Q4_K_M vs des quantizations plus lourdes en pratique",
          "Observation du moment ou les modeles debordent de la VRAM sous charge",
          "Exploration de l'impact non-lineaire de la taille du contexte sur la memoire",
          "Documentation des limites pratiques des GPU grand public selon la taille des modeles",
        ],
        exploring: [
          "Comment la quantization affecte l'utilisabilite, pas seulement la perplexite",
          "Le point ou la VRAM devient le vrai goulot d'etranglement",
          "Si les quantizations legeres sont viables pour des taches reelles",
        ],
      },
      tryhackme: {
        title: "TryHackMe — Apprentissage securite",
        description:
          "Travail sur des labs pratiques pour ameliorer ma comprehension de Linux, du reseau, de l'enumeration et des bases de la securite offensive.",
        summary:
          "J'utilise TryHackMe comme approche pratique de la cybersecurite. Je me suis principalement concentre sur les fondamentaux : Linux, reseau, enumeration et concepts de base de la securite offensive.",
        highlights: [
          "Atteint le top 9% sur TryHackMe",
          "59 rooms completees",
          "Parcouru l'essentiel du parcours Pre Security",
          "Utilise la plateforme pour renforcer mes bases Linux et reseau",
        ],
      },
      workstation: {
        title: "Montage PC — 4 builds et plus",
        description:
          "Montage de PCs from scratch et recuperation de prebuilds — choix des composants, resolution d'incompatibilites et comprehension concrete du hardware.",
        summary:
          "Ce qui a commence par le montage de ma propre machine est devenu une vraie passion pour le hardware PC. J'ai monte 4 PCs — d'un poste haut de gamme entierement custom a des machines Frankenstein assemblees a partir de restes de prebuilds. Chacun m'a appris quelque chose de different sur la compatibilite, les compromis et le fonctionnement reel du materiel.",
        highlights: [
          "Monte mon propre poste from scratch : R9 9950X3D, RTX 5080, 64Go RAM, Samsung 9100 Pro, X870E-E — chaque composant choisi et compare manuellement",
          "Reconstruit le PC de mon frere a partir d'un ancien prebuild ASUS ROG — nouvelle carte mere et alimentation pour un vrai upgrade GPU",
          "Upgrade du HP Omen de mon petit frere : identification des vrais goulots d'etranglement et remplacement uniquement de ce qui comptait",
          "Monte un PC Frankenstein pour la copine de mon frere a partir de 3 prebuilds et pieces detachees — flash BIOS manuel pour compatibilite CPU et reparation de pins tordus",
        ],
        exploring: [
          "Comment identifier les vrais bottlenecks vs le marketing dans le hardware prebuild",
          "Les cas limites de compatibilite que la documentation ne couvre pas",
          "L'ecart entre les specs sur papier et les performances reelles",
        ],
      },
      printing: {
        title: "Impression 3D et fabrication numerique",
        description:
          "Utilisation de l'impression 3D et de la gravure laser pour prototyper des idees, creer des objets utiles et explorer la fabrication numerique.",
        summary:
          "Je m'interesse a la fabrication comme extension naturelle du logiciel et de la pensee systeme : prendre une idee, la prototyper, iterer dessus et la transformer en quelque chose de reel.",
        highlights: [
          "Utilisation reguliere d'une imprimante 3D pour le prototypage et l'experimentation",
          "Utilisation d'un LaserPecker LP2 pour des projets de gravure",
          "Vente de 2 fichiers 3D numeriques sur Cults",
          "Interesse par la boucle complete de l'idee a l'objet utilisable",
        ],
      },
    },
    about: {
      title: "A propos",
      paragraphs: [
        "Je suis Arthur, etudiant en informatique en France. Je suis attire par l'intersection entre l'ingenierie logicielle et les systemes complexes — le type de problemes ou il faut comprendre ce qui se passe plusieurs couches en dessous de la surface.",
        "La plupart de mon temps est consacre a construire des choses : applications mobiles, pipelines ML, outils qui resolvent de vrais problemes. En dehors de ca, j'explore l'infrastructure IA, la cybersecurite et les systemes bas niveau. J'aime comprendre comment la technologie fonctionne, pas juste comment l'utiliser.",
        "Quand je ne code pas, je suis probablement en train de regler les parametres de mon imprimante 3D, de lire sur le design de systemes, ou de monter une nouvelle experience sur mon poste de travail.",
      ],
    },
    notFound: {
      title: "404",
      message: "Oups ! Page introuvable",
      link: "Retour a l'accueil",
    },
  },
} as const;

export type TranslationKeys = typeof translations.en;
export default translations;
