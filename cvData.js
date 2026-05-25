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
          title: "CNAM Interactive 3D Digital Twin & Structural Mechanics",
          category: ["frontend", "academic"],
          description: "An interactive 3D Digital Twin with Three.js involving real-time multiphysics structural parameters, order reduction (ROM), and a custom real-time 2D IGA computational core written in native JavaScript.",
          tags: ["Three.js", "Isogeometric Analysis", "Web 3D", "Solver Core", "Numerical Analysis", "Le CNAM"],
          image: "images/project-twin.png",
          link: "https://github.com/WEHBEMUMEN",
          pdfLink: "pdfs/project-cnam.pdf",
          linkText: "View GitHub",
          challenge: "Visualizing highly complex Isogeometric Analysis (IGA) simulation data involving high-dimensional physical variables in real-time. Traditional finite element (FEA) software requires massive computation time and lacks interactive web-based dashboarding for immediate structural feedback. Furthermore, validating structural mechanics outcomes under large displacement and nonlinear bending requires extremely precise and mathematical solver cores.",
          solution: "Developed a mathematical order reduction framework (ECSW, DEIM, Gappy POD) and integrated it into a native, high-performance JS 2D computational core executing in under 10 ms. Coupled this core with a fully interactive web 3D Three.js digital twin visualization, rendering stress color heatmaps in real-time. Created an IGA solver validation suite comparing structural mechanics outcomes against traditional FEA results on reference stress benchmarks.",
          achievements: [
            "Designed and coded a native JS 2D IGA numerical solver executing in less than 10 ms (an 80x to 120x solver speedup).",
            "Created a sleek web-based 3D digital twin visualization using Three.js with real-time physical behavior displays.",
            "Successfully validated stress results on standard Kirsch benchmarks with high convergence rates.",
            "Developed order reduction mathematical cores to accelerate large displacement calculations and compiled detailed technical project sheets."
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
        },
        {
          title: "Structural Design Optimization",
          category: ["fullstack", "academic"],
          description: "Finite element analysis (FEA) and structural optimization of truss systems using custom Python solver libraries and numerical solvers.",
          tags: ["FEA", "Optimization", "Python", "Truss Systems", "Numerical Methods"],
          pdfLink: "projects/structural-optimization/structural-optimization-report.pdf",
          linkText: "Read Project Sheet",
          challenge: "Designing lightweight structural truss systems that safely support force loads while minimizing total volume/weight and ensuring stress/displacement bounds are not exceeded.",
          solution: "Developed custom finite element analysis libraries in Python (libTruss) and applied mathematical programming solvers (SLSQP, COBYLA, COBYQA) to perform size and coordinate optimization on structural truss systems.",
          achievements: [
            "Engineered a Python-based finite element solver module (libTruss) for static structural analysis.",
            "Implemented size and layout optimization routines yielding significant mass reduction on multi-bar trusses.",
            "Conducted comparative studies of gradient-based and derivative-free optimizer convergence rates."
          ]
        },
        {
          title: "Fluid-Structure Interaction Analysis",
          category: ["fullstack", "academic"],
          description: "Numerical simulation and MATLAB modeling of fluid-structure interaction to evaluate aerostructural stability under aerodynamic loads.",
          tags: ["FSI", "Aerodynamics", "MATLAB", "Finite Elements", "Dynamic Systems"],
          pdfLink: "projects/fsi-analysis/fsi-analysis-report.pdf",
          linkText: "Read Project Sheet",
          challenge: "Predicting the coupled physical response of structures interacting with dynamic fluid domains where fluid pressure induces structural deformation and deformation alters the fluid flow.",
          solution: "Constructed a coupled FSI solver algorithm in MATLAB, modeling structural bending under pressure profiles and iteratively converging aerodynamic forces and finite element displacement.",
          achievements: [
            "Developed a robust MATLAB computational routine for iteratively resolving fluid-structure equations.",
            "Simulated aeroelastic stability boundaries to identify aerodynamic divergence thresholds.",
            "Successfully validated convergence behavior of nested fluid-mesh deformation loops on test wing/beam profiles."
          ]
        },
        {
          title: "Hydroelasticity & Structural Waves",
          category: ["fullstack", "academic"],
          description: "Investigation of structural responses of floating bodies under wave excitations and hydroelastic load modeling.",
          tags: ["Hydroelasticity", "Wave Mechanics", "Naval Engineering", "Finite Elements", "MATLAB"],
          pdfLink: "projects/hydroelasticity/project-4-report.pdf",
          linkText: "Read Project Sheet",
          challenge: "Calculating structural bending, shear loads, and vibration modes of structures floating in fluid domains under variable wave frequency excitation.",
          solution: "Engineered hydroelastic response models utilizing finite element discretization combined with potential flow theory to evaluate structural wave-induced stress.",
          achievements: [
            "Formulated rigid and elastic mode equations for floating structures subjected to regular wave spectra.",
            "Analyzed peak bending moments and structural shear forces to prevent structural hull failure under hydrodynamic loads.",
            "Presented detailed hydroelastic response curves comparing analytical boundary conditions with finite element models."
          ]
        },
        {
          title: "Advanced Numerical Methods & Solver Verification",
          category: ["frontend", "academic"],
          description: "Implementation and error convergence validation of high-order numerical schemes and custom finite element solver verification.",
          tags: ["MATLAB", "Numerical Schemes", "Finite Elements", "Validation", "Error Convergence"],
          pdfLink: "projects/numerical-methods/numerical-methods-report.pdf",
          linkText: "Read Project Sheet",
          challenge: "Ensuring numerical correctness and high-order error convergence rates in custom finite element solver codes compared to analytical solutions.",
          solution: "Built a MATLAB solver verification suite validating grid convergence rates (L2-error norms) on physical benchmark test cases.",
          achievements: [
            "Programmed custom high-order numerical discretization schemes and linear solvers in MATLAB.",
            "Verified solver accuracy by tracking asymptotic convergence rates matching theoretical rates.",
            "Documented rigorous verification test tables validating spatial and temporal mesh refinement limits."
          ]
        },
        {
          title: "Smart Structures & Metrological Calibration",
          category: ["fullstack", "academic"],
          description: "Experimental testing and metrological calibration of piezoelectric sensors and smart structural materials in laboratory environments.",
          tags: ["Smart Structures", "Sensors", "Calibration", "Metrology", "Signal Processing", "Lab Testing"],
          pdfLink: "projects/smart-structures/smart-structures-report.pdf",
          linkText: "Read Project Sheet",
          challenge: "Calibrating active smart material structures and filtering physical noise to retrieve clean strain/vibration readings under dynamic loads.",
          solution: "Conducted laboratory dynamic stress sweeps and engineered metrological filtering routines in MATLAB to calibrate sensor gains and piezoelectric coefficients.",
          achievements: [
            "Calibrated piezoelectric sensor grids under varying load frequencies and acceleration sweeps.",
            "Developed signal processing scripts to isolate structural vibration modes from experimental ambient noise.",
            "Compiled detailed metrological calibration logs verifying sensor sensitivity linearity bounds."
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
          title: "Jumeau Numérique 3D Interactif CNAM & Mécanique des Structures",
          category: ["frontend", "academic"],
          description: "Développement d'un jumeau numérique 3D complet avec Three.js embarquant des variables multiphysiques interactives, de la réduction d'ordre (ROM) et un noyau de calcul IGA 2D temps réel codé en JS natif.",
          tags: ["Three.js", "Analyse Isogéométrique", "Web 3D", "Noyau de calcul", "Analyse Numérique", "Le CNAM"],
          image: "images/project-twin.png",
          link: "https://github.com/WEHBEMUMEN",
          pdfLink: "pdfs/project-cnam.pdf",
          linkText: "Voir sur GitHub",
          challenge: "Visualiser des données complexes de simulation par Analyse Isogéométrique (IGA) impliquant des variables physiques multidimensionnelles en temps réel. Les outils FEA traditionnels nécessitent des temps de calcul élevés et manquent d'interactivité web. De plus, l'évaluation précise de grandes déformations non linéaires nécessite des solveurs mathématiques extrêmement rigoureux.",
          solution: "Développement d'un cadre d'hyper-réduction mathématique (ECSW, DEIM, Gappy POD) intégré à un noyau de calcul IGA 2D haute performance codé en JS natif (résolution < 10 ms). Interfaçage avec un Jumeau Numérique 3D web interactif en Three.js résolvant les champs de contraintes en temps réel, et validation de la modélisation vis-à-vis des cas tests de contraintes Kirsch.",
          achievements: [
            "Conception et codage d'un noyau de calcul IGA 2D natif s'exécutant en moins de 10 ms (accélération de 80x à 120x).",
            "Création d'une interface 3D Three.js haut de gamme gérant des affichages physiques interactifs temps réel.",
            "Validation rigoureuse des concentrations de contraintes Kirsch avec d'excellents taux de convergence.",
            "Élaboration d'algorithmes mathématiques de réduction d'ordre pour accélérer les calculs de flexion non linéaire et rédaction de fiches projets."
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
        },
        {
          title: "Optimisation de Conception Structurale",
          category: ["fullstack", "academic"],
          description: "Analyse par éléments finis (FEA) et optimisation structurale de systèmes de treillis à l'aide de bibliothèques personnalisées en Python et de solveurs mathématiques.",
          tags: ["FEA", "Optimisation", "Python", "Systèmes Treillis", "Méthodes Numériques"],
          pdfLink: "projects/structural-optimization/structural-optimization-report.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Concevoir des systèmes de treillis structuraux légers supportant des charges élevées tout en minimisant le volume/poids total et en respectant les limites de contrainte et déplacement.",
          solution: "Développement de bibliothèques d'analyse par éléments finis en Python (libTruss) et application de solveurs d'optimisation (SLSQP, COBYLA, COBYQA) pour optimiser les dimensions et la géométrie des treillis.",
          achievements: [
            "Conception d'un solveur par éléments finis en Python (libTruss) pour l'analyse structurale statique.",
            "Implémentation d'algorithmes d'optimisation dimensionnelle et géométrique apportant des réductions de masse significatives.",
            "Étude comparative des taux de convergence d'optimiseurs avec et sans gradient."
          ]
        },
        {
          title: "Analyse d'Interaction Fluide-Structure",
          category: ["fullstack", "academic"],
          description: "Simulation numérique et modélisation MATLAB de l'interaction fluide-structure pour évaluer la stabilité aérostructurale sous charges aérodynamiques.",
          tags: ["IFS", "Aérodynamique", "MATLAB", "Éléments Finis", "Systèmes Dynamiques"],
          pdfLink: "projects/fsi-analysis/fsi-analysis-report.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Prédire la réponse physique couplée de structures interagissant avec des domaines fluides dynamiques, où la pression du fluide induit des déformations qui modifient l'écoulement.",
          solution: "Création d'un algorithme de résolution couplée IFS sous MATLAB, modélisant la flexion structurale sous profils de pression et convergeant itérativement les forces aérodynamiques et les déplacements.",
          achievements: [
            "Développement d'une routine de calcul MATLAB robuste pour résoudre itérativement les équations fluide-structure.",
            "Simulation des limites de stabilité aéroélastique pour identifier les seuils de divergence aérodynamique.",
            "Validation du comportement de convergence des boucles de déformation de maillage sur profils de poutre et d'aile."
          ]
        },
        {
          title: "Hydroélasticité & Ondes Structurales",
          category: ["fullstack", "academic"],
          description: "Étude des réponses structurales de corps flottants soumis à des excitations de vagues et modélisation des charges hydroélastiques.",
          tags: ["Hydroelasticity", "Mécanique des Vagues", "Génie Naval", "Éléments Finis", "MATLAB"],
          pdfLink: "projects/hydroelasticity/project-4-report.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Calculer la flexion, les efforts tranchants et les modes vibratoires de structures flottantes soumises à des excitations de vagues à fréquences variables.",
          solution: "Modélisation de la réponse hydroélastique combinant la discrétisation par éléments finis et la théorie des écoulements potentiels pour évaluer les contraintes induites par la houle.",
          achievements: [
            "Formulation d'équations de modes rigides et élastiques pour des structures flottantes soumises à des spectres de vagues régulières.",
            "Analyse des moments fléchissants et efforts tranchants maximaux pour prévenir les défaillances de coque sous charges hydrodynamiques.",
            "Présentation de courbes de réponse hydroélastique comparant les conditions limites analytiques aux modèles éléments finis."
          ]
        },
        {
          title: "Méthodes Numériques Avancées & Vérification",
          category: ["frontend", "academic"],
          description: "Implémentation et validation rigoureuse de la convergence d'erreur de schémas numériques d'ordre élevé et vérification de solveurs éléments finis.",
          tags: ["MATLAB", "Schémas Numériques", "Éléments Finis", "Validation", "Convergence d'Erreur"],
          pdfLink: "projects/numerical-methods/numerical-methods-report.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Garantir l'exactitude numérique et des taux de convergence d'erreur d'ordre élevé dans les solveurs par éléments finis personnalisés par rapport aux solutions analytiques.",
          solution: "Développement sous MATLAB d'une suite de vérification évaluant les taux de convergence de grille (normes d'erreur L2) sur des cas de référence physiques.",
          achievements: [
            "Programmation de schémas de discrétisation numérique d'ordre élevé et de solveurs de systèmes linéaires sous MATLAB.",
            "Vérification de la précision du solveur en suivant les taux de convergence asymptotique théoriques.",
            "Documentation de tableaux de tests de vérification rigoureux évaluant les limites de raffinement de maillage spatial et temporel."
          ]
        },
        {
          title: "Structures Intelligentes & Calibrage Métrologique",
          category: ["fullstack", "academic"],
          description: "Essais expérimentaux et étalonnage métrologique de capteurs piézoélectriques et de matériaux intelligents en laboratoire.",
          tags: ["Structures Intelligentes", "Capteurs", "Étalonnage", "Métrologie", "Traitement du Signal", "Essais Labo"],
          pdfLink: "projects/smart-structures/smart-structures-report.pdf",
          linkText: "Lire la Fiche Projet",
          challenge: "Étalonner des structures de matériaux intelligents actifs et filtrer le bruit physique pour acquérir des mesures propres de déformation et vibration sous charges dynamiques.",
          solution: "Réalisation de balayages de contraintes dynamiques en laboratoire et conception d'algorithmes de filtrage sous MATLAB pour calibrer les gains et coefficients piézoélectriques des capteurs.",
          achievements: [
            "Étalonnage de grilles de capteurs piézoélectriques sous diverses fréquences de charge et balayages d'accélération.",
            "Développement de scripts de traitement du signal pour isoler les modes vibratoires structuraux du bruit expérimental ambiant.",
            "Compilation de journaux d'étalonnage métrologique détaillés validant les limites de linéarité de sensibilité des capteurs."
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
