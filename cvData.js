export const cvData = {
  en: {
    meta: {
      title: "Mumen Wehbe | Portfolio",
      description: "Professional Portfolio of Mumen Wehbe - Mechanical & Mechatronics Engineer, M.Sc. in Structural Mechanics",
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
      title: "Mechanical & Mechatronics Engineer",
      subtitle: "M.Sc. in Structural Mechanics (Le CNAM Paris). Bridging mechanical engineering, FEA & physical simulation with interactive 3D digital twins and computational software systems.",
      ctaPrimary: "View Projects",
      ctaSecondary: "Contact Me",
    },
    about: {
      title: "About Me",
      subtitle: "My Journey",
      text1: "Graduated in mechatronics engineering and holding an M.Sc. in Structural Mechanics from Le CNAM in Paris, I bridge both complementary disciplines: core mechanical engineering (structural dynamics, finite element analysis, CAD, robotics, and fluid-structure interaction) and modern computational software development (Python, C++, Three.js, and interactive 3D digital twins).",
      text2: "My background includes developing real-time interactive Digital Twins with Isogeometric Analysis (IGA), authoring research on projection-based Reduced Order Modeling (ROM), designing advanced robotics curricula, and engineering photovoltaic solar systems. I excel at translating complex physical models and mathematical solvers into high-performance, accessible digital platforms.",
      stats: [
        { value: "B.Sc.", label: "Mechatronics Eng." },
        { value: "M.Sc.", label: "Structural Mechanics" },
        { value: "Dual", label: "Mechanical & Software" }
      ]
    },
    skills: {
      title: "Skills & Expertise",
      subtitle: "Engineering & Computational Competencies",
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
          role: "R&D Engineer Intern – Digital Twin & Isogeometric Analysis (IGA)",
          company: "Le CNAM (EPN04 Laboratory) – Paris, France",
          period: "03/2026 – 09/2026",
          bullets: [
            "Engineered an interactive 3D Web Digital Twin platform combining Isogeometric Analysis (IGA) and projection-based Reduced Order Modeling (ROM/POD/hyper-reduction).",
            "Developed a native JavaScript 2D IGA computational core executing in sub-10 ms (< 10 ms online resolution, achieving an 80x–120x computational speedup).",
            "Coupled real-time multiphysics parameters with a Three.js 3D web interface and a physical 3D-printed demonstrator.",
            "Authored M2 Research Thesis and draft journal publication on parameterized ROM and hyper-reduction for CMAME."
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
          period: "2024 – 2026",
          details: "Specialized in Structural Mechanics & Computational Dynamics. Outstanding Grade: A-"
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
          description: "A real-time web-based Digital Twin platform combining Isogeometric Analysis (IGA) with projection-based Reduced Order Modeling (ROM) executing non-linear structural mechanics in sub-10 ms.",
          tags: ["Three.js", "Isogeometric Analysis", "Reduced Order Modeling", "Web 3D", "Nonlinear Dynamics", "Le CNAM"],
          image: "images/project-twin.png",
          appLink: "https://wehbemumen.github.io/internship-cnam/",
          link: "https://github.com/WEHBEMUMEN/internship-cnam",
          linkText: "View GitHub",
          pdfs: [
            { label: "M2 Thesis / Internship Report", path: "projects/digital-twin/cnam-internship-report-thesis.pdf" },
            { label: "Research Paper: IGA & ROM", path: "projects/digital-twin/isogeometric-rom-paper.pdf" },
            { label: "Defense Presentation", path: "projects/digital-twin/defense-presentation.pdf" },
            { label: "Reference Paper: FEM vs. IGA", path: "projects/digital-twin/fem-vs-iga-paper.pdf" }
          ],
          challenge: "Simulating and visualizing highly complex Isogeometric Analysis (IGA) and geometrically nonlinear mechanics in real time within a browser. Traditional FEA software requires significant computational time, lacks interactive web dashboarding, and cannot deliver instantaneous parametric structural feedback during engineering evaluations.",
          solution: "Developed an end-to-end framework integrating NURBS-based IGA with projection-based Reduced Order Modeling (POD/Galerkin and hyper-reduction ECSW/DEIM). Implemented a native JavaScript 2D IGA computational core delivering sub-10 ms solve times (80x–120x speedup), coupled with an interactive Three.js 3D visualization dashboard, parametric live controls, and validated against reference analytical benchmarks (Kirsch hole, beam bending). Authored a full M2 thesis and research paper.",
          achievements: [
            "Authored and successfully defended M2 Research Thesis: 'Geometrical Parameters in Isogeometric Analysis and Reduced Order Modeling for Structural Dynamics' at Le CNAM Paris.",
            "Authored research paper: 'Projection-based Reduced Order Modeling for Structural Dynamics via Isogeometric Analysis and Hyper-Reduction' (prepared for CMAME).",
            "Designed, coded, and deployed a live interactive web application (wehbemumen.github.io/internship-cnam) featuring real-time 3D simulation and parametric exploration.",
            "Achieved sub-10 ms real-time solve times with native JS IGA core and projection-based ROM, yielding an 80x–120x computational speedup."
          ]
        },
        {
          title: "VEX V5 Competitive Robotics",
          category: "fullstack",
          description: "Curriculum engineering, electronics wiring, and Python controls design for award-winning VEX V5 teams in international robotics competitions.",
          tags: ["Robotics", "Python Control", "Vex V5", "STEM"],
          image: "images/project-robotics.png",
          link: "https://github.com/WEHBEMUMEN",
          challenge: "Designing competition-ready robotics systems within strict dimensional rules, power budgets, and complex match game strategies under intense time pressure.",
          solution: "Mentored high-performing teams by establishing structured mechanical design iterations in CAD and writing robust, modular autonomous routines in Python.",
          achievements: [
            "Coached teams to multiple regional championship titles and secured Excellence and Design Awards.",
            "Formulated comprehensive instructional roadmaps adopted across multiple STEM education facilities."
          ]
        },
        {
          title: "Structural Optimization (FEA & Numerical)",
          category: ["fullstack", "academic"],
          description: "Finite element optimization codes written in Python solving multi-bar and continuous truss configurations subjected to static load constraints.",
          tags: ["Python", "Finite Elements", "Numerical Optimization", "Truss Systems", "SciPy"],
          image: "images/project-optimization.png",
          codeLink: "https://github.com/WEHBEMUMEN/portfolio-mumen-wehbe/tree/main/projects/structural-optimization/code",
          pdfs: [
            { label: "Technical Report", path: "projects/structural-optimization/structural-optimization-report.pdf" },
            { label: "Optimization Presentation", path: "projects/structural-optimization/optimization-presentation.pdf" }
          ],
          challenge: "Optimizing truss structures for minimum weight while satisfying complex stress and displacement constraints across multiple load combinations without numerical instability.",
          solution: "Built modular Python FEM solvers with gradient-based optimization algorithms (SLSQP, COBYLA, COBYQA) capable of continuous cross-sectional area sizing.",
          achievements: [
            "Achieved 38% mass reduction on reference benchmarks while rigorously adhering to von Mises yield limits.",
            "Implemented stiffness matrix assembly from scratch with automated post-processing and displacement plotting."
          ]
        },
        {
          title: "Fluid-Structure Interaction Analysis (FSI)",
          category: ["fullstack", "academic"],
          description: "Advanced numerical modeling and MATLAB simulation of coupled fluid-structure interactions under transient and harmonic loading conditions.",
          tags: ["MATLAB", "FSI", "Coupled Solvers", "Structural Dynamics", "Fluid Mechanics"],
          image: "images/project-fsi.png",
          codeLink: "projects/fsi-analysis/fsi-analysis.m",
          pdfs: [
            { label: "FSI Research Report", path: "projects/fsi-analysis/fsi-analysis-report.pdf" },
            { label: "Lab Report (Mumen)", path: "projects/fsi-analysis/lab_mumen.pdf" }
          ],
          challenge: "Capturing dynamic feedback between fluid pressure fields and structural deformation without numerical divergence at fluid-solid interfaces.",
          solution: "Formulated partitioned coupling algorithms in MATLAB with relaxation techniques to ensure stable interface convergence across unsteady flow regimes.",
          achievements: [
            "Simulated flow-induced vibration phenomena and validated frequency response curves against experimental benchmark datasets.",
            "Authored detailed analysis report evaluating added-mass effects on vibrating submerged boundaries."
          ]
        },
        {
          title: "Aeroelastic & Hydroelastic Stability of a Wing",
          category: ["fullstack", "academic"],
          description: "Investigation of aeroelastic and hydroelastic stability of a high-aspect-ratio rectangular wing in air and water, analyzing coupled mode flutter and static divergence.",
          tags: ["Aeroelasticity", "Hydroelasticity", "Flutter", "Divergence", "MATLAB", "State-space"],
          image: "images/project-hydroelasticity.png",
          pdfs: [
            { label: "Research Report", path: "projects/hydroelasticity/project-4-report.pdf" }
          ],
          challenge: "Predicting dynamic instability (flutter) and static instability (divergence) of flexible lifting surfaces, and evaluating the dramatic impact of fluid density and added mass in water.",
          solution: "Developed a 2-DOF state-space eigenvalue solver in MATLAB using Lagrange's equations and the Assumed Shapes Method, incorporating potential flow added mass terms.",
          achievements: [
            "Formulated 2-DOF equations of motion coupling bending (heaving) and torsion (pitching).",
            "Analyzed mode coalescence and identified critical flutter and divergence speeds in both air and water.",
            "Validated solver convergence against analytical closed-form solutions with under 1% error."
          ]
        },
        {
          title: "Advanced Numerical Methods & Beam Solvers",
          category: ["frontend", "academic"],
          description: "Custom MATLAB solvers for higher-order beam kinematics, shear deformation, and torsional-flexural coupling.",
          tags: ["MATLAB", "Numerical Methods", "Higher-Order Beams", "Torsion", "FEM"],
          image: "images/project-numerical.png",
          codeLink: "projects/numerical-methods/numerical-methods.m",
          pdfs: [
            { label: "Numerical Analysis Report", path: "projects/numerical-methods/numerical-methods-report.pdf" }
          ],
          challenge: "Accurately resolving coupled bending-torsion and warping behaviors in thin-walled profiles where classical Euler-Bernoulli assumptions fail.",
          solution: "Developed MATLAB verification suites evaluating grid convergence rates (L2 error norms) against analytical benchmark problems.",
          achievements: [
            "Engineered Timoshenko and Vlasov beam finite element routines and higher-order integration schemes.",
            "Verified solver accuracy by tracking asymptotic convergence rates with theoretical error estimators.",
            "Documented benchmark test suites testing limits of spatial and temporal discretization."
          ]
        },
        {
          title: "Smart Structures & Sensor Metrology",
          category: ["fullstack", "academic"],
          description: "Experimental testing and metrological calibration of piezoelectric transducers and smart material patches in laboratory environments.",
          tags: ["Smart Structures", "Sensors", "Calibration", "Metrology", "Signal Processing", "Lab Testing"],
          image: "images/project-smart.png",
          pdfs: [
            { label: "Research Report", path: "projects/smart-structures/smart-structures-report.pdf" },
            { label: "Lab Report - Day 1", path: "projects/smart-structures/lab-day1.pdf" },
            { label: "Lab Report - Day 2", path: "projects/smart-structures/lab-day2.pdf" }
          ],
          challenge: "Calibrating active smart material structures and filtering sensor drift to extract clean strain and vibration metrics under dynamic loading.",
          solution: "Conducted dynamic strain sweeps in laboratory setups and designed MATLAB digital filtering algorithms to calibrate sensor gains and piezoelectric coefficients.",
          achievements: [
            "Calibrated piezoelectric sensor arrays across varying loading frequencies and acceleration sweeps.",
            "Built signal processing scripts to isolate structural vibration modes from ambient experimental noise.",
            "Compiled metrological calibration logs validating sensor sensitivity linearity boundaries."
          ]
        },
        {
          title: "Comprehensive Structural Integrity Assessment",
          category: ["fullstack", "academic"],
          description: "Multi-regime finite element analysis of a highly flexible cantilever beam, comprising nonlinear static, linear dynamic, and implicit transient analyses.",
          tags: ["FEA", "Nonlinear Static", "Implicit Dynamics", "Newmark-beta", "Cantilever Beam", "Numerical Analysis"],
          image: "images/project-integrity.png",
          pdfs: [
            { label: "Research Report", path: "projects/structural-optimization/project2-report.pdf" }
          ],
          challenge: "Characterizing the nonlinear geometric stiffness evolution and transient damping behavior of highly flexible cantilever structures undergoing large deformations under dynamic and impulsive loading regimes.",
          solution: "Implemented an iterative Newton-Raphson solver nested within an implicit Newmark-beta time-integration scheme in MATLAB to simulate large-displacement behavior and conduct grid-convergence stability studies.",
          achievements: [
            "Formulated a total Lagrangian finite element framework to account for geometric nonlinearity and avoid artificial strain-stiffening.",
            "Simulated transient and harmonic load responses with validated Rayleigh damping incorporation.",
            "Conducted numerical stability convergence studies identifying optimal time-step sizing to minimize computational overhead."
          ]
        },
        {
          title: "Hydroelasticity with Gravity in Fluid Storage Tanks",
          category: ["fullstack", "academic"],
          description: "Numerical investigation into the hydroelastic behavior of fluid storage systems, modeling incompressible fluid coupling and gravity-induced sloshing modes.",
          tags: ["Hydroelasticity", "Sloshing", "Finite Elements", "MATLAB", "Coupled Systems"],
          image: "images/project-tank.png",
          pdfs: [
            { label: "Project Presentation", path: "projects/hydroelasticity/hydroelasticity-presentation.pdf" }
          ],
          challenge: "Predicting the frequency response function (FRF) and coupled interaction of a flexible structural beam sandwiched between two fluid storage domains while mitigating severe numerical instabilities such as shear locking.",
          solution: "Engineered a coupled (u, p) finite element solver in MATLAB implementing selective reduced integration (SRI) to eliminate shear locking and higher-order Gauss quadrature to suppress spurious hourglass modes.",
          achievements: [
            "Formulated coupled fluid-structure motion equations incorporating gravity-driven free-surface waves.",
            "Successfully recovered physical frequency of 7.10 Hz (0.28% error) using SRI shear-locking correction.",
            "Analyzed sandwiching effect and confirmed gravitational coupling reduces fundamental system frequency by 70%."
          ]
        },
        {
          title: "Substructuring Techniques in Structural Dynamics",
          category: ["fullstack", "academic"],
          description: "Comparative study and application of substructuring reduction methods (Craig-Bampton, MacNeal, Transmission Simulator) to aerospace launcher stages.",
          tags: ["Substructuring", "Craig-Bampton", "MacNeal", "Aerospace Structures", "ROM", "Structural Dynamics"],
          image: "images/project-substructuring.png",
          pdfs: [
            { label: "Comparative Presentation", path: "projects/substructuring/substructuring-presentation.pdf" }
          ],
          challenge: "Condensing multi-million DOF finite element models for aerospace structures to evaluate transient load cases like wind gusts without sacrificing interface accuracy.",
          solution: "Implemented component mode synthesis (CMS) reduction methods in MATLAB to construct Craig-Bampton and MacNeal representations, validated against space launcher test cases.",
          achievements: [
            "Compared primal (Craig-Bampton) and dual (MacNeal) assembly coupling techniques for experimental data.",
            "Applied transmission simulator method to subtract fixture compliance and retrieve unconstrained component dynamics.",
            "Performed wind gust simulations on launch vehicle models evaluating peak displacements during transonic flight regimes."
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
      cardText: "My inbox is always open. Whether you have a project in structural mechanics, simulation algorithms, or just want to connect, feel free to reach out!",
      cardBtnText: "Send an Email"
    }
  },
  fr: {
    meta: {
      title: "Mumen Wehbe | Portfolio",
      description: "Portfolio professionnel de Mumen Wehbe - Ingénieur en Mécatronique & Diplômé de Master 2 en Mécanique des Structures",
    },
    nav: {
      home: "Accueil",
      about: "À Propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      contact: "Contact",
      downloadCv: "Voir le CV",
      cvLanguage: "CV Français",
    },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Mumen Wehbe",
      title: "Ingénieur Mécanique & Mécatronique",
      subtitle: "Diplômé de Master 2 en Mécanique des Structures au CNAM Paris. Alliant mécanique des structures, calcul par éléments finis (FEA) et simulation physique avec jumeaux numériques 3D interactifs et développement logiciel.",
      ctaPrimary: "Voir mes projets",
      ctaSecondary: "Me contacter",
    },
    about: {
      title: "À Propos de Moi",
      subtitle: "Mon Parcours",
      text1: "Diplômé en génie mécatronique et titulaire d'un Master 2 en Mécanique des Structures au CNAM Paris, j'unis deux expertises complémentaires : la mécanique des structures (analyse par éléments finis, dynamique des structures, CAO, robotique, interaction fluide-structure) et le développement logiciel scientifique (Python, C++, Three.js et jumeaux numériques web temps réel).",
      text2: "Mon parcours inclut le développement de Jumeaux Numériques interactifs avec Analyse Isogéométrique (IGA), la recherche en modélisation d'ordre réduit (ROM), la conception de programmes robotiques avancés et l'ingénierie de systèmes solaires photovoltaïques. J'excelle dans la transformation de solveurs physiques complexes en plateformes numériques interactives haute performance.",
      stats: [
        { value: "B.Sc.", label: "Ing. Mécatronique" },
        { value: "M.Sc.", label: "Mécanique Structures" },
        { value: "Double", label: "Mécanique & Logiciel" }
      ]
    },
    skills: {
      title: "Compétences",
      subtitle: "Compétences Ingénierie & Numérique",
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
          role: "Stagiaire Ingénieur R&D – Jumeau Numérique & Analyse Isogéométrique (IGA)",
          company: "Le CNAM (Laboratoire EPN04) – Paris, France",
          period: "03/2026 – 09/2026",
          bullets: [
            "Développement d'une plateforme web de Jumeau Numérique 3D combinant Analyse Isogéométrique (IGA) et Modélisation d'Ordre Réduit par projection (ROM/POD/hyper-réduction).",
            "Création d'un noyau de calcul IGA 2D en JS natif atteignant une résolution temps réel < 10 ms (accélération de 80x à 120x).",
            "Couplage des paramètres multiphysiques temps réel avec une interface web 3D Three.js et un démonstrateur physique imprimé en 3D.",
            "Rédaction du mémoire de recherche M2 et d'un article scientifique pour la revue CMAME sur la ROM paramétrique et l'hyper-réduction."
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
          period: "2024 – 2026",
          details: "Spécialisation en Mécanique des Structures & Dynamique des Systèmes. Note : A-"
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
          description: "Plateforme web de Jumeau Numérique en temps réel combinant Analyse Isogéométrique (IGA) et Modélisation d'Ordre Réduit (ROM) pour la mécanique non linéaire résolue en moins de 10 ms.",
          tags: ["Three.js", "Analyse Isogéométrique", "Modélisation d'Ordre Réduit", "Web 3D", "Dynamique Non Linéaire", "Le CNAM"],
          image: "images/project-twin.png",
          appLink: "https://wehbemumen.github.io/internship-cnam/",
          link: "https://github.com/WEHBEMUMEN/internship-cnam",
          linkText: "Voir sur GitHub",
          pdfs: [
            { label: "Rapport de Stage / Mémoire M2", path: "projects/digital-twin/cnam-internship-report-thesis.pdf" },
            { label: "Article Scientifique: IGA & ROM", path: "projects/digital-twin/isogeometric-rom-paper.pdf" },
            { label: "Présentation de Soutenance", path: "projects/digital-twin/defense-presentation.pdf" },
            { label: "Article de Réf: FEM vs. IGA", path: "projects/digital-twin/fem-vs-iga-paper.pdf" }
          ],
          challenge: "Simuler et visualiser en temps réel dans un navigateur web des calculs complexes d'Analyse Isogéométrique (IGA) et de mécanique géométriquement non linéaire. Les logiciels éléments finis classiques sont lents, dépourvus d'interfaces web interactives et inadaptés aux retours immédiats lors d'explorations paramétriques.",
          solution: "Conception d'une chaîne complète combinant l'IGA basée sur les NURBS et la réduction d'ordre par projection (POD/Galerkin et hyper-réduction ECSW/DEIM). Développement d'un noyau de calcul IGA 2D en JavaScript natif atteignant un temps de résolution inférieur à 10 ms (accélération de 80x à 120x), interfacé avec un jumeau numérique 3D en Three.js avec contrôle paramétrique en direct et validation sur benchmarks de référence (plaque trouée de Kirsch, flexion de poutres). Rédaction du mémoire M2 et d'un article de recherche.",
          achievements: [
            "Rédaction et soutenance avec succès du mémoire de recherche M2 : 'Geometrical Parameters in Isogeometric Analysis and Reduced Order Modeling for Structural Dynamics' au CNAM Paris.",
            "Rédaction de l'article de recherche : 'Projection-based Reduced Order Modeling for Structural Dynamics via Isogeometric Analysis and Hyper-Reduction' (destiné à CMAME).",
            "Développement et déploiement d'une application web interactive complète (wehbemumen.github.io/internship-cnam) avec simulation 3D temps réel et exploration paramétrique.",
            "Résolution en ligne sous les 10 ms grâce au solveur IGA natif JS et à la ROM, offrant un gain de performance de 80x à 120x."
          ]
        },
        {
          title: "Robotique Compétitive VEX V5",
          category: "fullstack",
          description: "Ingénierie de programmes d'asservissement robotique, câblage électronique et régulation Python pour des équipes lauréates de compétitions internationales.",
          tags: ["Robotique", "Régulation Python", "Vex V5", "STEM"],
          image: "images/project-robotics.png",
          link: "https://github.com/WEHBEMUMEN",
          challenge: "Concevoir des systèmes robotiques compétitifs respectant des contraintes dimensionnelles strictes et une gestion d'énergie rigoureuse dans des délais courts.",
          solution: "Encadrement d'équipes de haut niveau en instaurant une méthodologie rigoureuse de conception CAO et le développement de routines autonomes fiables en Python.",
          achievements: [
            "Conduite d'équipes à plusieurs titres régionaux avec obtention des prix d'Excellence et de Design.",
            "Création de cursus complets adoptés par plusieurs centres de formation STEM."
          ]
        },
        {
          title: "Optimisation Structurale (Éléments Finis & Numérique)",
          category: ["fullstack", "academic"],
          description: "Codes d'optimisation par éléments finis développés en Python pour des structures en treillis soumises à des contraintes de charge statique.",
          tags: ["Python", "Éléments Finis", "Optimisation Numérique", "Treillis", "SciPy"],
          image: "images/project-optimization.png",
          codeLink: "https://github.com/WEHBEMUMEN/portfolio-mumen-wehbe/tree/main/projects/structural-optimization/code",
          pdfs: [
            { label: "Rapport Technique", path: "projects/structural-optimization/structural-optimization-report.pdf" },
            { label: "Présentation de l'Optimisation", path: "projects/structural-optimization/optimization-presentation.pdf" }
          ],
          challenge: "Optimiser les structures en treillis pour minimiser la masse tout en respectant des contraintes strictes de contrainte et de flèche sous charges multiples.",
          solution: "Développement d'un solveur FEM modulaire en Python interfacé avec des algorithmes d'optimisation sous contraintes (SLSQP, COBYLA, COBYQA).",
          achievements: [
            "Réduction de masse de 38% sur des benchmarks de référence dans le respect des limites d'élasticité de von Mises.",
            "Assemblage complet de matrices de rigidité avec post-traitement et tracé automatique des déformées."
          ]
        },
        {
          title: "Analyse d'Interaction Fluide-Structure (FSI)",
          category: ["fullstack", "academic"],
          description: "Modélisation numérique avancée et simulation MATLAB d'interactions fluide-structure couplées sous charges transitoires et harmoniques.",
          tags: ["MATLAB", "FSI", "Solveurs Couplés", "Dynamique des Structures", "Mécanique des Fluides"],
          image: "images/project-fsi.png",
          codeLink: "projects/fsi-analysis/fsi-analysis.m",
          pdfs: [
            { label: "Rapport de Recherche FSI", path: "projects/fsi-analysis/fsi-analysis-report.pdf" },
            { label: "Compte Rendu TP (Mumen)", path: "projects/fsi-analysis/lab_mumen.pdf" }
          ],
          challenge: "Capturer le couplage dynamique entre les champs de pression fluide et la déformation structurelle sans divergence numérique à l'interface fluide-solide.",
          solution: "Formulation d'algorithmes de couplage partitionné sous MATLAB avec techniques de relaxation assurant la convergence de l'interface sous écoulements instationnaires.",
          achievements: [
            "Simulation des vibrations induites par l'écoulement et validation des FRF par rapport aux données expérimentales.",
            "Rédaction d'un rapport de recherche approfondi évaluant l'effet de masse ajoutée sur les parois immergées."
          ]
        },
        {
          title: "Stabilité Aéroélastique & Hydroélastique d'une Aile",
          category: ["fullstack", "academic"],
          description: "Étude de la stabilité aéroélastique et hydroélastique d'une aile rectangulaire à grand élancement dans l'air et dans l'eau, avec analyse du flottement couplé et de la divergence statique.",
          tags: ["Aéroélasticité", "Hydroélasticité", "Flottement", "Divergence", "MATLAB", "Espace d'états"],
          image: "images/project-hydroelasticity.png",
          pdfs: [
            { label: "Rapport de Recherche", path: "projects/hydroelasticity/project-4-report.pdf" }
          ],
          challenge: "Prédire l'instabilité dynamique (flottement/flutter) et l'instabilité statique (divergence) de surfaces portantes flexibles, et évaluer l'impact dramatique de la densité du fluide et de la masse ajoutée dans l'eau.",
          solution: "Développement sous MATLAB d'un solveur de valeurs propres en espace d'états à 2 degrés de liberté (2DOF) utilisant les équations de Lagrange et la méthode des formes supposées, intégrant les termes de masse ajoutée par écoulement potentiel.",
          achievements: [
            "Formulation d'équations de mouvement à 2DOF couplant la flexion (pompage) et la torsion (tangage).",
            "Analyse de la coalescence des modes et identification des vitesses critiques de flottement et de divergence dans l'air et dans l'eau.",
            "Validation de la convergence du solveur par rapport aux solutions analytiques exactes avec une erreur inférieure à 1%."
          ]
        },
        {
          title: "Méthodes Numériques Avancées & Solveurs de Poutres",
          category: ["frontend", "academic"],
          description: "Solveurs MATLAB personnalisés pour la cinématique des poutres d'ordre élevé, la déformation par cisaillement et le couplage flexion-torsion.",
          tags: ["MATLAB", "Méthodes Numériques", "Poutres d'Ordre Élevé", "Torsion", "FEM"],
          image: "images/project-numerical.png",
          codeLink: "projects/numerical-methods/numerical-methods.m",
          pdfs: [
            { label: "Rapport d'Analyse Numérique", path: "projects/numerical-methods/numerical-methods-report.pdf" }
          ],
          challenge: "Résoudre avec précision les comportements couplés de flexion-torsion et de gauchissement dans les profilés minces où les hypothèses d'Euler-Bernoulli échouent.",
          solution: "Développement sous MATLAB d'une suite de vérification évaluant les taux de convergence de grille (normes d'erreur L2) sur des cas de référence physiques.",
          achievements: [
            "Conception d'un solveur par éléments finis couplé flexion-torsion dans les poutres et programmation de schémas d'ordre élevé.",
            "Vérification de la précision du solveur en suivant les taux de convergence asymptotique théoriques.",
            "Documentation de tableaux de tests de vérification rigoureux évaluant les limites de raffinement de maillage spatial et temporel."
          ]
        },
        {
          title: "Structures Intelligentes & Calibrage Métrologique",
          category: ["fullstack", "academic"],
          description: "Essais expérimentaux et étalonnage métrologique de capteurs piézoélectriques et de matériaux intelligents en laboratoire.",
          tags: ["Structures Intelligentes", "Capteurs", "Étalonnage", "Métrologie", "Traitement du Signal", "Essais Labo"],
          image: "images/project-smart.png",
          pdfs: [
            { label: "Rapport de Recherche", path: "projects/smart-structures/smart-structures-report.pdf" },
            { label: "Compte Rendu TP - Jour 1", path: "projects/smart-structures/lab-day1.pdf" },
            { label: "Compte Rendu TP - Jour 2", path: "projects/smart-structures/lab-day2.pdf" }
          ],
          challenge: "Étalonner des structures de matériaux intelligents actifs et filtrer le bruit physique pour acquérir des mesures propres de déformation et vibration sous charges dynamiques.",
          solution: "Réalisation de balayages de contraintes dynamiques en laboratoire et conception d'algorithmes de filtrage sous MATLAB pour calibrer les gains et coefficients piézoélectriques des capteurs.",
          achievements: [
            "Étalonnage de grilles de capteurs piézoélectriques sous diverses fréquences de charge et balayages d'accélération.",
            "Développement de scripts de traitement du signal pour isoler les modes vibratoires structuraux du bruit expérimental ambiant.",
            "Compilation de journaux d'étalonnage métrologique détaillés validant les limites de linéarité de sensibilité des capteurs."
          ]
        },
        {
          title: "Évaluation Complète de l'Intégrité Structurale",
          category: ["fullstack", "academic"],
          description: "Analyse par éléments finis multi-régimes d'une poutre cantilever hautement flexible, comprenant des analyses statiques non linéaires, dynamiques linéaires et transitoires implicites.",
          tags: ["FEA", "Statique Non-linéaire", "Dynamique Implicite", "Newmark-bêta", "Poutre Cantilever", "Analyse Numérique"],
          image: "images/project-integrity.png",
          pdfs: [
            { label: "Rapport de Recherche", path: "projects/structural-optimization/project2-report.pdf" }
          ],
          challenge: "Caractériser l'évolution de la rigidité géométrique non linéaire et le comportement d'amortissement transitoire de structures cantilever très flexibles subissant de grandes déformations sous des régimes de charge dynamique et impulsionnelle.",
          solution: "Mise en œuvre d'un solveur itératif Newton-Raphson imbriqué dans un schéma d'intégration temporelle implicite Newmark-bêta dans MATLAB pour simuler le comportement en grands déplacements et mener des études de stabilité de convergence de grille.",
          achievements: [
            "Formulation d'un cadre d'éléments finis Lagrangien total pour prendre en compte la non-linéarité géométrique et éviter l'étirement artificiel.",
            "Simulation des réponses aux charges transitoires et harmoniques avec validation de l'amortissement de Rayleigh.",
            "Réalisation d'une étude de convergence de stabilité numérique identifiant la taille optimale du pas de temps pour minimiser le coût de calcul."
          ]
        },
        {
          title: "Hydroélasticité avec Gravité dans les Réservoirs",
          category: ["fullstack", "academic"],
          description: "Étude numérique du comportement hydroélastique des systèmes de stockage de fluides, modélisant le couplage fluide incompressible et les modes de ballottement induits par la gravité.",
          tags: ["Hydroélasticité", "Ballottement", "Éléments Finis", "MATLAB", "Systèmes Couplés"],
          image: "images/project-tank.png",
          pdfs: [
            { label: "Présentation du Projet", path: "projects/hydroelasticity/hydroelasticity-presentation.pdf" }
          ],
          challenge: "Prédire la fonction de réponse en fréquence (FRF) et l'interaction de couplage d'une poutre structurelle flexible prise en sandwich entre deux domaines de stockage de fluide tout en résolvant des instabilités numériques sévères comme le verrouillage en cisaillement.",
          solution: "Développement d'un solveur par éléments finis couplé (u, p) dans MATLAB, mettant en œuvre un schéma d'intégration réduite sélective (SRI) pour éliminer le verrouillage en cisaillement et une quadrature de Gauss d'ordre élevé pour supprimer les modes de sablier parasites.",
          achievements: [
            "Formulation des équations de mouvement couplées fluide-structure intégrant les ondes de surface libre entraînées par la gravité.",
            "Récupération réussie de la fréquence physique de 7,10 Hz (erreur de 0,28%) à l'aide de la correction SRI.",
            "Analyse de l'effet 'sandwich' et confirmation que le couplage gravitationnel réduit la fréquence fondamentale du système de 70%."
          ]
        },
        {
          title: "Techniques de Sous-structuration en Dynamique des Structures",
          category: ["fullstack", "academic"],
          description: "Étude comparative et application de méthodes de réduction par sous-structuration (Craig-Bampton, MacNeal, Simulateur de Transmission) aux lanceurs aérospatiaux.",
          tags: ["Sous-structuration", "Craig-Bampton", "MacNeal", "Structures Aérospatiales", "ROM", "Dynamique des Structures"],
          image: "images/project-substructuring.png",
          pdfs: [
            { label: "Présentation Comparative", path: "projects/substructuring/substructuring-presentation.pdf" }
          ],
          challenge: "Simplifier des modèles éléments finis de plusieurs millions de degrés de liberté pour des structures aérospatiales afin d'évaluer des cas de charges transitoires comme les rafales de vent sans perdre de précision aux interfaces.",
          solution: "Mise en œuvre de méthodes de réduction par synthèse modale (CMS) sous MATLAB pour construire des représentations de Craig-Bampton et MacNeal, avec validation sur des modèles de lanceurs spatiaux.",
          achievements: [
            "Comparaison des techniques de couplage par assemblage primal (Craig-Bampton) et dual (MacNeal) pour les données expérimentales.",
            "Application de la méthode du simulateur de transmission pour soustraire mathématiquement la souplesse du montage et récupérer la dynamique des composants non contraints.",
            "Réalisation de simulations de rafales de vent sur des lanceurs pour évaluer les déplacements maximaux en régimes de vol transsoniques."
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
