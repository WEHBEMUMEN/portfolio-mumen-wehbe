export const cvData = {
  en: {
    meta: {
      title: "Mumen Wehbe | Portfolio",
      description: "Professional Portfolio of Mumen Wehbe - Mechatronics Engineer & M.Sc. Student in Structural Mechanics",
    },
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      contact: "Contact",
      downloadCv: "View CV",
      cvLanguage: "English CV",
    },
    hero: {
      greeting: "Hello, I'm",
      name: "Mumen Wehbe",
      title: "Mechatronics Engineer",
      subtitle: "M.Sc. Student in Structural Mechanics at Le CNAM Paris. Creating interactive Digital Twins, high-performance computational systems, and advanced robotics architectures.",
      ctaPrimary: "View Projects",
      ctaSecondary: "Contact Me",
    },
    about: {
      title: "About Me",
      subtitle: "My Journey",
      text1: "Graduated in mechatronics engineering and currently pursuing a Master 2 in Mechanics in Paris, I possess solid practical experience. Passionate and rigorous, I leverage my skills in Python, SolidWorks, Three.js, and systems design to solve concrete engineering challenges.",
      text2: "My background includes designing advanced robotics curricula, coaching award-winning student teams in international competitions, and engineering on-grid and off-grid connected solar systems. I excel at bridging the gap between hardware systems and physical simulations with real-time web-based interactive dashboards.",
      stats: [
        { value: "B.Sc.", label: "Mechatronics Eng." },
        { value: "M.Sc.", label: "Structural Mechanics" },
        { value: "High", label: "Technical Expertise" }
      ]
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "My Technical Stack",
      categories: {
        frontend: "Engineering Programming",
        backend: "FEA & Simulation Tools",
        tools: "CAD, Hardware & Design"
      },
      list: [
        { name: "Python", category: "frontend", level: 95 },
        { name: "C++", category: "frontend", level: 85 },
        { name: "JavaScript / Three.js", category: "frontend", level: 90 },
        { name: "Matlab", category: "frontend", level: 80 },
        { name: "Abaqus FEA", category: "backend", level: 85 },
        { name: "MSC PATRAN/NASTRAN", category: "backend", level: 75 },
        { name: "COMSOL Multiphysics", category: "backend", level: 70 },
        { name: "SAM Modeling", category: "backend", level: 80 },
        { name: "SolidWorks", category: "tools", level: 90 },
        { name: "Robotics & Hardware Control", category: "tools", level: 85 },
        { name: "Web Design & Dashboards", category: "tools", level: 80 }
      ]
    },
    experience: {
      title: "Professional Experience",
      subtitle: "Where I've Worked",
      jobs: [
        {
          role: "R&D Intern – Digital Twin & Isogeometric Analysis (IGA)",
          company: "Le CNAM (EPN04 Laboratory) – Paris, France",
          period: "04/2026 – Present",
          bullets: [
            "Reduced Order Modeling (ROM) via Isogeometric Analysis (IGA) and hyper-reduction (ECSW, DEIM, Gappy POD) of structures in large displacements.",
            "Development of a native JS 2D IGA computational core for real-time online resolution (< 10 ms, 80x–120x speedup).",
            "Design of an interactive Digital Twin (web 3D Three.js, real-time multiphysics parameters) coupled with a 3D-printed physical demonstrator.",
            "Metrological validation and convergence of solvers on reference test cases (Kirsch, non-linear structural beam bending)."
          ]
        },
        {
          role: "Robotics & STEM Instructor",
          company: "STEMA & FUN ROBOTICS – Dubai, United Arab Emirates",
          period: "11/2022 – 02/2023",
          bullets: [
            "Designed and implemented advanced robotics curricula (Vex IQ, Python) and led interactive workshops at the Sharjah International Book Fair.",
            "Coached student teams for the Vex V5 competition (achieving prestigious awards in 'Excellence' and 'Design' categories) and provided custom training sessions."
          ]
        },
        {
          role: "Solar Engineer",
          company: "ALEMDAR TEKNIK – Nicosia, Cyprus",
          period: "07/2022 – 08/2022",
          bullets: [
            "Designed and supervised residential solar PV installations for on-grid and off-grid systems, utilizing SAM modeling for performance analysis.",
            "Diagnosed and resolved complex technical issues in photovoltaic systems (inverters, batteries, and panels), ensuring optimal energy yield."
          ]
        }
      ]
    },
    education: {
      title: "Education",
      subtitle: "Academic Background",
      degrees: [
        {
          degree: "Master's Degree in Mechanical Engineering (M2)",
          institution: "Le CNAM – Paris, France",
          period: "2024 – Present",
          details: "Focused on Structural Mechanics. Outstanding Grade: A-"
        },
        {
          degree: "Bachelor of Science in Mechatronics Engineering (B.Sc.)",
          institution: "Cyprus International University – Nicosia, Cyprus",
          period: "2018 – 2022",
          details: "Comprehensive training in mechanical, electrical, and control systems. Graduated with Honors. Grade: A"
        }
      ]
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Engineering and R&D Works",
      filterAll: "All",
      filterFrontend: "Programming",
      filterFullstack: "Simulation & CAD",
      filterAcademic: "Academic",
      list: [
        {
          title: "CNAM interactive 3D Digital Twin",
          category: "frontend",
          description: "An interactive Digital Twin with Three.js involving real-time multiphysics simulation parameters and a custom real-time 2D IGA computational core written in native JavaScript.",
          tags: ["Three.js", "Isogeometric Analysis", "Web 3D", "Solver Core"],
          image: "images/project-twin.png",
          link: "https://github.com/WEHBEMUMEN",
          linkText: "View GitHub",
          challenge: "Visualizing highly complex Isogeometric Analysis (IGA) simulation data involving high-dimensional physical variables in real-time. Traditional finite element (FEA) software requires massive computation time and lacks interactive web-based dashboarding for immediate structural feedback.",
          solution: "Developed a mathematical order reduction framework (ECSW, DEIM, Gappy POD) and integrated it into a native, high-performance JS 2D computational core. Coupled this core with a fully interactive web 3D Three.js digital twin visualization, rendering stress color heatmaps in under 10 milliseconds directly inside the web browser.",
          achievements: [
            "Designed and coded a native JS 2D IGA numerical solver executing in less than 10 ms (an 80x to 120x solver speedup).",
            "Created a sleek web-based 3D digital twin visualization using Three.js with real-time physical behavior displays.",
            "Successfully calibrated and metrologically validated the solver on standard Kirsch reference stress benchmarks."
          ]
        },
        {
          title: "Structural CNAM Engineering Project",
          category: "academic",
          description: "Isogeometric Analysis (IGA) and Order Reduction project validating numerical simulation accuracy against standard stress test cases.",
          tags: ["Le CNAM", "IGA", "Numerical Analysis"],
          image: "images/project-structural.png",
          pdfLink: "pdfs/project-cnam.pdf",
          linkText: "Read Project Sheet",
          challenge: "Validating structural mechanics simulations using advanced numerical methods like Isogeometric Analysis (IGA) and Order Reduction. Accurate finite element calculations under large displacement and nonlinear structural bending require extremely precise mathematical solver cores.",
          solution: "Engineered an IGA solver validation suite comparing structural mechanics outcomes against traditional FEA results. Built custom mesh refinement modules and convergence stress heatmaps to verify solver correctness on reference structural mechanics test cases.",
          achievements: [
            "Successfully validated stress results on standard Kirsch benchmarks with high convergence rates.",
            "Developed order reduction mathematical cores to accelerate large displacement calculations.",
            "Compiled a comprehensive academic report and technical project sheets outlining mathematical modeling."
          ]
        },
        {
          title: "VEX V5 Competitive Robotics",
          category: "fullstack",
          description: "Curriculum engineering, electronics wiring, and Python controls design for award-winning VEX V5 teams in international robotics competitions.",
          tags: ["Robotics", "Python Control", "Vex V5", "STEM"],
          image: "images/project-robotics.png",
          link: "https://github.com/WEHBEMUMEN",
          linkText: "Details",
          challenge: "Engineering advanced STEM robotics curricula, configuring microcontrollers, and designing high-reliability Python hardware control scripts for competitive, international VEX V5 robotics environments where precision and speed are critical.",
          solution: "Engineered custom electrical wiring schemes, sensor integration modules (inertial sensors, optical encoders), and proportional-integral-derivative (PID) feedback loop scripts in Python for real-time robotic navigation. Instructed, managed, and coached multiple award-winning student teams.",
          achievements: [
            "Led high school and university student teams to win 'Excellence' and 'Design' awards in VEX V5 competitions.",
            "Designed and implemented high-reliability PID path-planning and navigation controls in Python.",
            "Designed advanced mechatronics and sensors integration curricula for training sessions."
          ]
        }
      ]
    },
    contact: {
      title: "Get In Touch",
      subtitle: "Let's Collaborate",
      emailLabel: "Email",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      locationLabel: "Location",
      cardTitle: "Let's work together!",
      cardText: "My inbox is always open. Whether you have a project idea, a structural mechanics research inquiry, or just want to connect, feel free to send me a direct email!",
      cardBtnText: "Send an Email"
    }
  },
  fr: {
    meta: {
      title: "Mumen Wehbe | Portfolio",
      description: "Portfolio Professionnel de Mumen Wehbe - Ingénieur en Mécatronique et Étudiant en M2 Mécanique des Structures",
    },
    nav: {
      home: "Accueil",
      about: "À Propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      contact: "Contact",
      downloadCv: "Voir mon CV",
      cvLanguage: "CV Français",
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Mumen Wehbe",
      title: "Ingénieur en Mécatronique",
      subtitle: "Étudiant en Master 2 Mécanique des Structures au CNAM Paris. Concepteur de Jumeaux Numériques interactifs, de solveurs haute performance et d'architectures robotiques avancées.",
      ctaPrimary: "Voir mes projets",
      ctaSecondary: "Me contacter",
    },
    about: {
      title: "À Propos de Moi",
      subtitle: "Mon Parcours",
      text1: "Diplômé en génie mécatronique et actuellement en Master 2 de Mécanique à Paris, je possède une solide expérience pratique. Passionné et rigoureux, je mobilise mes compétences en Python, SolidWorks, Three.js et conception système pour résoudre des défis d'ingénierie concrets.",
      text2: "Mon parcours inclut la conception de programmes de robotique avancée, l'encadrement d'équipes étudiantes lauréates dans des compétitions internationales, ainsi que l'ingénierie de systèmes solaires photovoltaïques connectés et isolés. J'excelle dans l'interfaçage de modélisations physiques avec des tableaux de bord web 3D interactifs en temps réel.",
      stats: [
        { value: "B.Sc.", label: "Ing. Mécatronique" },
        { value: "M.Sc.", label: "Mécanique Structures" },
        { value: "Forte", label: "Expertise Technique" }
      ]
    },
    skills: {
      title: "Compétences",
      subtitle: "Mon Stack Technique",
      categories: {
        frontend: "Programmation Technique",
        backend: "Outils FEA & Simulation",
        tools: "CAO, Matériel & Modélisation"
      },
      list: [
        { name: "Python", category: "frontend", level: 95 },
        { name: "C++", category: "frontend", level: 85 },
        { name: "JavaScript / Three.js", category: "frontend", level: 90 },
        { name: "Matlab", category: "frontend", level: 80 },
        { name: "Abaqus FEA", category: "backend", level: 85 },
        { name: "MSC PATRAN/NASTRAN", category: "backend", level: 75 },
        { name: "COMSOL Multiphysics", category: "backend", level: 70 },
        { name: "Modélisation SAM", category: "backend", level: 80 },
        { name: "SolidWorks", category: "tools", level: 90 },
        { name: "Contrôle Robotique & Hardware", category: "tools", level: 85 },
        { name: "Design Web & Tableaux de bord", category: "tools", level: 80 }
      ]
    },
    experience: {
      title: "Expérience Professionnelle",
      subtitle: "Mon Parcours",
      jobs: [
        {
          role: "Stagiaire R&D – Jumeau Numérique & Analyse Isogéométrique (IGA)",
          company: "Le CNAM (Laboratoire EPN04) – Paris, France",
          period: "04/2026 – Présent",
          bullets: [
            "Modélisation d'Ordre Réduit (ROM) via Analyse Isogéométrique (IGA) et hyper-réduction (ECSW, DEIM, Gappy POD) de structures en grands déplacements.",
            "Développement d'un noyau de calcul IGA 2D natif en JS pour la résolution temps réel en ligne (< 10 ms, accélération de 80x à 120x).",
            "Conception d'un Jumeau Numérique interactif (web 3D Three.js, variables multiphysiques temps réel) couplé à un démonstrateur physique imprimé en 3D.",
            "Validation métrologique et convergence des solveurs sur cas tests de référence (Kirsch, flexion de poutres en grands déplacements)."
          ]
        },
        {
          role: "Instructeur en Robotique & STEM",
          company: "STEMA & FUN ROBOTICS – Dubaï, Émirats Arabes Unis",
          period: "11/2022 – 02/2023",
          bullets: [
            "Élaboration et mise en œuvre de programmes pédagogiques de robotique avancée (Vex IQ, Python) et animation d'ateliers interactifs à la Foire internationale du livre de Sharjah.",
            "Coaching d'équipes d'étudiants pour la compétition Vex V5 (obtention de prix prestigieux dans les catégories 'Excellence' et 'Design') et dispense de formations personnalisées."
          ]
        },
        {
          role: "Ingénieur Solaire",
          company: "ALEMDAR TEKNIK – Nicosie, Chypre",
          period: "07/2022 – 08/2022",
          bullets: [
            "Conception et supervision de l'installation de systèmes solaires photovoltaïques résidentiels raccordés (on-grid) et isolés (off-grid), avec modélisation SAM pour l'analyse de performance.",
            "Diagnostic et résolution de pannes techniques complexes des installations photovoltaïques (onduleurs, batteries et panneaux), garantissant un rendement énergétique optimal."
          ]
        }
      ]
    },
    education: {
      title: "Formation",
      subtitle: "Cursus Scolaire",
      degrees: [
        {
          degree: "Master en Ingénierie Mécanique (M2)",
          institution: "Le CNAM – Paris, France",
          period: "2024 – Présent",
          details: "Spécialisation en Mécanique des Structures. Note remarquable : A-"
        },
        {
          degree: "Licence en Génie Mécatronique (B.Sc.)",
          institution: "Cyprus International University – Nicosie, Chypre",
          period: "2018 – 2022",
          details: "Formation complète en systèmes mécaniques, électroniques et d'asservissement. Gradué avec mention très bien. Note : A"
        }
      ]
    },
    projects: {
      title: "Projets Vedettes",
      subtitle: "Travaux de R&D et d'Ingénierie",
      filterAll: "Tous",
      filterFrontend: "Programmation",
      filterFullstack: "Simulation & CAO",
      filterAcademic: "Académique",
      list: [
        {
          title: "Jumeau Numérique 3D Interactif CNAM",
          category: "frontend",
          description: "Développement d'un jumeau numérique 3D complet avec Three.js embarquant des variables multiphysiques interactives et un noyau de calcul IGA 2D temps réel codé en JS natif.",
          tags: ["Three.js", "Analyse Isogéométrique", "Web 3D", "Noyau de calcul"],
          image: "images/project-twin.png",
          link: "https://github.com/WEHBEMUMEN",
          linkText: "Voir sur GitHub",
          challenge: "Visualiser des données complexes de simulation par Analyse Isogéométrique (IGA) impliquant des variables physiques multidimensionnelles en temps réel. Les outils FEA traditionnels nécessitent des temps de calcul élevés et manquent d'interactivité web pour un retour d'information immédiat.",
          solution: "Développement d'un cadre d'hyper-réduction mathématique (ECSW, DEIM, Gappy POD) intégré à un noyau de calcul IGA 2D haute performance codé en JS natif. Interfaçage avec un Jumeau Numérique 3D web interactif en Three.js résolvant les champs de contraintes en moins de 10 ms directement dans le navigateur.",
          achievements: [
            "Conception et codage d'un noyau de calcul IGA 2D natif s'exécutant en moins de 10 ms (accélération de 80x à 120x).",
            "Création d'une interface 3D Three.js haut de gamme gérant des affichages physiques interactifs temps réel.",
            "Validation métrologique et convergence du solveur sur cas tests de référence (plaque trouée de Kirsch)."
          ]
        },
        {
          title: "Projet d'Ingénierie Structurale CNAM",
          category: "academic",
          description: "Projet de modélisation numérique IGA et réduction d'ordre de structure pour la validation de précision vis-à-vis des cas tests de contraintesKirsch.",
          tags: ["Le CNAM", "IGA", "Analyse Numérique"],
          image: "images/project-structural.png",
          pdfLink: "pdfs/project-cnam.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Valider la précision des méthodes de simulation mécanique avancées comme l'IGA et la réduction d'ordre. L'évaluation précise de grandes déformations tridimensionnelles non linéaires nécessite des solveurs mathématiques extrêmement rigoureux.",
          solution: "Mise en place d'une suite académique de validation comparant les résultats IGA aux logiciels FEA de référence. Développement de modules de maillage raffiné et d'analyse de contraintes pour valider la robustesse de la modélisation sur cas de référence.",
          achievements: [
            "Validation rigoureuse des concentrations de contraintes Kirsch avec d'excellents taux de convergence.",
            "Élaboration d'algorithmes mathématiques de réduction d'ordre pour accélérer les calculs de flexion non linéaire.",
            "Rédaction de rapports de modélisation mécanique et fiches projets CNAM."
          ]
        },
        {
          title: "Robotique Compétitive VEX V5",
          category: "fullstack",
          description: "Ingénierie de programmes d'asservissement robotique, câblage électronique et régulation Python pour des équipes lauréates de compétitions internationales.",
          tags: ["Robotique", "Régulation Python", "Vex V5", "STEM"],
          image: "images/project-robotics.png",
          link: "https://github.com/WEHBEMUMEN",
          linkText: "Détails",
          challenge: "Concevoir des programmes pédagogiques de robotique STEM de niveau compétitif mondial, câbler l'électronique de contrôle et programmer des scripts de pilotage Python fiables en temps réel pour des robots VEX V5 en compétition internationale.",
          solution: "Intégration de capteurs embarqués (centrales inertielles, codeurs optiques), architecture de câblage et écriture de régulations en boucle fermée (correcteurs PID) en Python pour le positionnement précis. Coaching et accompagnement des équipes d'étudiants.",
          achievements: [
            "Encadrement d'équipes ayant remporté de prestigieux prix d'excellence et de design en compétition VEX V5.",
            "Développement de scripts d'asservissement PID et de trajectoires en Python de haute précision.",
            "Création de supports de cours en mécatronique, électronique et intégration de capteurs."
          ]
        }
      ]
    },
    contact: {
      title: "Me Contacter",
      subtitle: "Collaborons Ensemble",
      emailLabel: "E-mail",
      githubLabel: "GitHub",
      linkedinLabel: "LinkedIn",
      locationLabel: "Localisation",
      cardTitle: "Travaillons ensemble !",
      cardText: "Ma boîte de réception est toujours ouverte. Que ce soit pour un projet de modélisation, une question sur la mécanique des structures ou simplement pour échanger, n'hésitez pas à m'envoyer un e-mail !",
      cardBtnText: "Envoyer un e-mail"
    }
  }
};
