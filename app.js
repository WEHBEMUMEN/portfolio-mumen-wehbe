import { cvData } from './cvData.js';

// Application State
let currentLang = localStorage.getItem('portfolio-lang') || 'en';
let activeProjectIndex = null;

// DOM Elements Cache
const elements = {
  // Navigation
  logo: document.getElementById('nav-logo-text'),
  navLinks: document.getElementById('nav-links'),
  langBtn: document.getElementById('lang-switch-btn'),
  langText: document.getElementById('lang-switch-text'),
  hamburger: document.getElementById('hamburger-menu'),
  
  // Hero
  heroGreeting: document.getElementById('hero-greeting'),
  heroName: document.getElementById('hero-name'),
  heroTitle: document.getElementById('hero-title'),
  heroSubtitle: document.getElementById('hero-subtitle'),
  heroCtaPrimary: document.getElementById('hero-cta-primary'),
  heroCtaSecondary: document.getElementById('hero-cta-secondary'),
  
  // About
  aboutTitle: document.getElementById('about-title'),
  aboutSubtitle: document.getElementById('about-subtitle'),
  aboutText1: document.getElementById('about-text-1'),
  aboutText2: document.getElementById('about-text-2'),
  aboutStats: document.getElementById('about-stats-container'),
  
  // Skills
  skillsTitle: document.getElementById('skills-title'),
  skillsSubtitle: document.getElementById('skills-subtitle'),
  skillsCategories: document.getElementById('skills-categories-container'),
  
  // Experience
  expTitle: document.getElementById('exp-title'),
  expSubtitle: document.getElementById('exp-subtitle'),
  timeline: document.getElementById('experience-timeline'),
  
  // Projects
  projectsTitle: document.getElementById('projects-title'),
  projectsSubtitle: document.getElementById('projects-subtitle'),
  projectFilters: document.getElementById('project-filters-container'),
  projectsGrid: document.getElementById('projects-grid-container'),
  
  // Contact
  contactTitle: document.getElementById('contact-title'),
  contactSubtitle: document.getElementById('contact-subtitle'),
  contactInfo: document.getElementById('contact-info-container'),
  contactCard: document.getElementById('contact-card-container'),
  
  // Footer
  footerLogo: document.getElementById('footer-logo-text'),
  footerCopy: document.getElementById('footer-copy-text'),

  // Modal Elements
  modal: document.getElementById('project-modal'),
  modalClose: document.getElementById('modal-close-btn'),
  modalContent: document.getElementById('modal-dynamic-content'),
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  renderPage(currentLang);
  setupEventListeners();
  setupScrollEffects();
});

// Setup Event Listeners
function setupEventListeners() {
  // Language Selector
  elements.langBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'fr' : 'en';
    localStorage.setItem('portfolio-lang', currentLang);
    renderPage(currentLang);
  });

  // Mobile Menu Navigation
  elements.hamburger.addEventListener('click', () => {
    elements.hamburger.classList.toggle('open');
    elements.navLinks.classList.toggle('open');
  });

  // Close Mobile Menu on Link Click
  elements.navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      elements.hamburger.classList.remove('open');
      elements.navLinks.classList.remove('remove');
    });
  });

  // Close Modal on Close Button Click
  elements.modalClose.addEventListener('click', () => {
    closeProjectModal();
  });

  // Close Modal on Click Outside the container
  elements.modal.addEventListener('click', (e) => {
    if (e.target === elements.modal) {
      closeProjectModal();
    }
  });

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && elements.modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  // Contact form submission removed in favor of direct email button
}

// Setup Page Scroll Animations & Active Classes
function setupScrollEffects() {
  const header = document.querySelector('header');
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-link');

  // Header Scroll Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  });

  // Active Link Observer
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

// Render Page Content Dynamically
function renderPage(lang) {
  const data = cvData[lang];
  
  // 1. Meta & Document Title
  document.title = data.meta.title;
  
  // 2. Navigation
  elements.logo.innerHTML = `Mumen Wehbe<span class="logo-dot"></span>`;
  elements.langText.textContent = lang === 'en' ? 'Français' : 'English';
  
  // Render navbar texts
  document.querySelector('[href="#hero"]').textContent = data.nav.home;
  document.querySelector('[href="#about"]').textContent = data.nav.about;
  document.querySelector('[href="#skills"]').textContent = data.nav.skills;
  document.querySelector('[href="#experience"]').textContent = data.nav.experience;
  document.querySelector('[href="#projects"]').textContent = data.nav.projects;
  document.querySelector('[href="#contact"]').textContent = data.nav.contact;
  
  // 3. Hero Section
  elements.heroGreeting.textContent = data.hero.greeting;
  elements.heroName.textContent = data.hero.name;
  elements.heroTitle.textContent = data.hero.title;
  elements.heroSubtitle.textContent = data.hero.subtitle;
  elements.heroCtaPrimary.textContent = data.hero.ctaPrimary;
  elements.heroCtaSecondary.textContent = data.hero.ctaSecondary;
  
  // Set CV file source (dynamic based on active language)
  const cvLink = document.getElementById('nav-cv-download');
  cvLink.textContent = data.nav.downloadCv;
  cvLink.href = lang === 'en' ? 'cv-mumen-wehbe-en.pdf' : 'cv-mumen-wehbe-fr.pdf';
  cvLink.target = '_blank';
  cvLink.removeAttribute('download');
  
  // 4. About Section
  elements.aboutTitle.textContent = data.about.title;
  elements.aboutSubtitle.textContent = data.about.subtitle;
  elements.aboutText1.textContent = data.about.text1;
  elements.aboutText2.textContent = data.about.text2;
  
  // Render stats
  elements.aboutStats.innerHTML = data.about.stats.map(stat => `
    <div class="stat-card">
      <div class="stat-value">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
  
  // 5. Skills Section
  elements.skillsTitle.textContent = data.skills.title;
  elements.skillsSubtitle.textContent = data.skills.subtitle;
  
  // Group skills by category
  const categorizedSkills = {
    frontend: [],
    backend: [],
    tools: []
  };
  
  data.skills.list.forEach(skill => {
    if (categorizedSkills[skill.category]) {
      categorizedSkills[skill.category].push(skill);
    }
  });
  
  // Render skills HTML
  elements.skillsCategories.innerHTML = Object.entries(categorizedSkills).map(([catKey, skills]) => `
    <div class="card">
      <h3 class="skill-category-title" style="display: flex; align-items: center; gap: 0.75rem;">
        <i data-lucide="${getCategoryIcon(catKey)}" style="width: 22px; height: 22px; stroke-width: 2; color: var(--accent-cyan);"></i>
        ${data.skills.categories[catKey]}
      </h3>
      <div class="skill-list">
        ${skills.map(skill => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${skill.name}</span>
              <span class="skill-percentage">${skill.level}%</span>
            </div>
            <div class="skill-bar-bg">
              <div class="skill-bar-fill" data-level="${skill.level}"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
  
  // Animate skill bars in micro-timeout
  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(fill => {
      const level = fill.getAttribute('data-level');
      fill.style.width = `${level}%`;
    });
  }, 100);
  
  // 6. Experience Section
  elements.expTitle.textContent = data.experience.title;
  elements.expSubtitle.textContent = data.experience.subtitle;
  
  elements.timeline.innerHTML = data.experience.jobs.map(job => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${job.role}</h3>
            <div class="timeline-company">${job.company}</div>
          </div>
          <span class="timeline-period">${job.period}</span>
        </div>
        <ul class="timeline-bullets">
          ${job.bullets.map(bullet => `<li>${bullet}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
  
  // 7. Projects Section
  elements.projectsTitle.textContent = data.projects.title;
  elements.projectsSubtitle.textContent = data.projects.subtitle;
  
  // Setup project filtering tags
  const filters = [
    { key: 'all', label: data.projects.filterAll },
    { key: 'frontend', label: data.projects.filterFrontend },
    { key: 'fullstack', label: data.projects.filterFullstack },
    { key: 'academic', label: data.projects.filterAcademic }
  ];
  
  elements.projectFilters.innerHTML = filters.map(f => `
    <button class="filter-btn ${f.key === 'all' ? 'active' : ''}" data-filter="${f.key}">
      ${f.label}
    </button>
  `).join('');
  
  // Bind dynamic event listeners to project filter buttons
  elements.projectFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      elements.projectFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filterKey = e.target.getAttribute('data-filter');
      filterProjects(filterKey, data);
    });
  });
  
  // Initial render of all projects
  renderProjectCards(data.projects.list, data);
  
  // 8. Contact Section
  elements.contactTitle.textContent = data.contact.title;
  elements.contactSubtitle.textContent = data.contact.subtitle;
  
  elements.contactInfo.innerHTML = `
    <div class="contact-item">
      <div class="contact-icon-wrapper">
        <i data-lucide="mail" style="width: 20px; height: 20px; stroke-width: 2;"></i>
      </div>
      <div>
        <div class="contact-label">${data.contact.emailLabel}</div>
        <div class="contact-value"><a href="mailto:wehbi236@gmail.com">wehbi236@gmail.com</a></div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon-wrapper">
        <i data-lucide="github" style="width: 20px; height: 20px; stroke-width: 2;"></i>
      </div>
      <div>
        <div class="contact-label">${data.contact.githubLabel}</div>
        <div class="contact-value"><a href="https://github.com/WEHBEMUMEN" target="_blank">github.com/WEHBEMUMEN</a></div>
      </div>
    </div>
    <div class="contact-item">
      <div class="contact-icon-wrapper">
        <i data-lucide="map-pin" style="width: 20px; height: 20px; stroke-width: 2;"></i>
      </div>
      <div>
        <div class="contact-label">${data.contact.locationLabel}</div>
        <div class="contact-value">${lang === 'en' ? 'France / Remote' : 'France / Distanciel'}</div>
      </div>
    </div>
  `;
  
  // Render Dynamic Contact Button Card
  elements.contactCard.innerHTML = `
    <i data-lucide="mail" style="width: 48px; height: 48px; stroke-width: 1.5; color: var(--accent-cyan); filter: drop-shadow(0 0 8px rgba(6, 182, 212, 0.3)); margin-bottom: 0.5rem;"></i>
    <h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 0.5rem; font-family: var(--font-heading);">${data.contact.cardTitle}</h3>
    <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 450px; font-size: 0.95rem; line-height: 1.6;">${data.contact.cardText}</p>
    <a href="mailto:wehbi236@gmail.com" class="btn btn-primary" style="width: 100%; text-decoration: none; display: inline-flex; align-items: center; justify-content: center; font-size: 1rem; padding: 1rem 2rem; gap: 0.5rem;">
      ${data.contact.cardBtnText} <i data-lucide="send" style="width: 16px; height: 16px; stroke-width: 2;"></i>
    </a>
  `;
  // Trigger Lucide Icon rendering
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 8.5 Modal update if open
  if (activeProjectIndex !== null) {
    openProjectModal(activeProjectIndex);
  }
  
  // 9. Footer
  elements.footerLogo.innerHTML = `Mumen Wehbe<span class="logo-dot"></span>`;
  elements.footerCopy.innerHTML = `&copy; ${new Date().getFullYear()} Mumen Wehbe. ${lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}`;
}

// Skill Category Icons mapping
function getCategoryIcon(key) {
  const icons = {
    frontend: 'monitor',
    backend: 'database',
    tools: 'cpu'
  };
  return icons[key] || 'terminal';
}

// Maps project titles to their high-fidelity physical detailed subpages
function getProjectDetailLink(title) {
  const normalized = title.toLowerCase();
  if (normalized.includes('twin') || normalized.includes('jumeau')) {
    return 'projects/digital-twin.html';
  }
  if (normalized.includes('structural') || normalized.includes('structurelle') || normalized.includes('structurale')) {
    return 'projects/structural-engineering.html';
  }
  if (normalized.includes('vex') || normalized.includes('robotics') || normalized.includes('robotique')) {
    return 'projects/vex-robotics.html';
  }
  return '#';
}

// Render Project Cards dynamically
function renderProjectCards(projectsList, data) {
  if (projectsList.length === 0) {
    elements.projectsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No projects found in this category.</p>`;
    return;
  }
  
  elements.projectsGrid.innerHTML = projectsList.map(project => {
    // Check if project specifies custom link or PDF attachment
    const href = project.pdfLink || project.link || '#';
    const linkIcon = project.pdfLink 
      ? '<i data-lucide="file-text" style="width: 16px; height: 16px; stroke-width: 2;"></i>' 
      : '<i data-lucide="external-link" style="width: 16px; height: 16px; stroke-width: 2;"></i>';
    const targetAttr = project.pdfLink ? '' : 'target="_blank"';
    
    const imageTag = project.image 
      ? `<div class="project-image-wrapper">
          <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.classList.add('no-image'); this.remove();" class="project-card-img" />
         </div>`
      : '';
    
    return `
      <div class="card project-card fade-in">
        ${imageTag}
        <div class="project-card-body">
          <div class="project-card-header">
            <div class="project-icon">
              <i data-lucide="${getProjectCategoryIcon(project.category)}" style="width: 24px; height: 24px; stroke-width: 2; color: var(--accent-cyan);"></i>
            </div>
            <a href="${href}" ${targetAttr} class="project-link" style="display: flex; align-items: center; gap: 0.35rem;">
              ${project.linkText || data.projects.linkText} ${linkIcon}
            </a>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <div class="project-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.04);">
            <a href="${getProjectDetailLink(project.title)}" class="project-detail-btn" style="text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem;">
              ${currentLang === 'en' ? 'Technical Details' : 'Détails Techniques'}
              <i data-lucide="arrow-right" class="detail-arrow" style="width: 16px; height: 16px;"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Make the entire card body (excluding links) clickable to navigate to the details subpage
  elements.projectsGrid.querySelectorAll('.project-card').forEach((card) => {
    const detailBtn = card.querySelector('.project-detail-btn');
    if (!detailBtn) return;
    const url = detailBtn.getAttribute('href');
    
    card.addEventListener('click', (e) => {
      // If clicked on an actual link inside the card, let the standard navigation happen
      if (e.target.closest('a')) {
        return;
      }
      window.location.href = url;
    });
  });

  // Render newly added Lucide icons inside card footer
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Filter projects by category
function filterProjects(category, data) {
  const allProjects = data.projects.list;
  
  if (category === 'all') {
    renderProjectCards(allProjects, data);
  } else {
    const filtered = allProjects.filter(p => p.category === category);
    renderProjectCards(filtered, data);
  }
}

// Icon helper for project cards
function getProjectCategoryIcon(cat) {
  const icons = {
    frontend: 'monitor',
    fullstack: 'layers',
    academic: 'graduation-cap'
  };
  return icons[cat] || 'package';
}

// Open Project Modal
function openProjectModal(index) {
  activeProjectIndex = index;
  const project = cvData[currentLang].projects.list[index];
  if (!project) return;

  const data = cvData[currentLang];
  const href = project.pdfLink || project.link || '#';
  const targetAttr = project.pdfLink ? '' : 'target="_blank"';

  // Left Column Image/Blueprint Tag
  const imageHtml = project.image
    ? `<div class="modal-image-wrapper">
         <img src="${project.image}" alt="${project.title}" onerror="this.parentElement.classList.add('no-image'); this.remove();" class="modal-project-img" />
         <div class="modal-blueprint-fallback-glow"></div>
       </div>`
    : '';

  // Setup Multilingual Headings
  const challengeTitle = currentLang === 'en' ? 'The Challenge' : 'Le Défi';
  const solutionTitle = currentLang === 'en' ? 'Solution & Achievements' : 'Solution & Réalisations';
  const closeBtnText = currentLang === 'en' ? 'Close Details' : 'Fermer';

  const ctaBtnText = project.pdfLink 
    ? (currentLang === 'en' ? 'Read Project Sheet' : 'Lire la Fiche Projet')
    : (currentLang === 'en' ? 'View Live Project' : 'Voir le Projet');

  const ctaIcon = project.pdfLink ? 'file-text' : 'external-link';

  elements.modalContent.innerHTML = `
    <div class="modal-split">
      <div class="modal-visual-pane">
        ${imageHtml}
        <div class="modal-specs-block">
          <h4 style="font-size: 0.85rem; text-transform: uppercase; color: var(--accent-cyan); letter-spacing: 0.1em; margin-bottom: 0.75rem;">
            ${currentLang === 'en' ? 'System Specs' : 'Spécifications Système'}
          </h4>
          <div class="modal-tags">
            ${project.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
      <div class="modal-details-pane">
        <span class="modal-category-badge">${getProjectCategoryLabel(project.category, data)}</span>
        <h3 class="modal-project-title">${project.title}</h3>
        
        <div class="modal-scroll-area">
          <div class="detail-section">
            <h4 class="detail-section-title">
              <i data-lucide="alert-circle" style="width: 18px; height: 18px; color: var(--accent-cyan); flex-shrink:0;"></i>
              ${challengeTitle}
            </h4>
            <p class="detail-section-text">${project.challenge || project.description}</p>
          </div>
          
          <div class="detail-section">
            <h4 class="detail-section-title">
              <i data-lucide="check-circle" style="width: 18px; height: 18px; color: var(--accent-emerald); flex-shrink:0;"></i>
              ${solutionTitle}
            </h4>
            <p class="detail-section-text">${project.solution || ''}</p>
            <ul class="modal-achievements-list">
              ${(project.achievements || []).map(ach => `
                <li>
                  <i data-lucide="arrow-right" class="achievement-arrow" style="width: 14px; height: 14px; color: var(--accent-emerald); flex-shrink:0; margin-top: 3px;"></i>
                  <span>${ach}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>
        
        <div class="modal-footer-actions">
          <a href="${href}" ${targetAttr} class="btn btn-primary" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
            <i data-lucide="${ctaIcon}" style="width: 16px; height: 16px;"></i>
            ${ctaBtnText}
          </a>
          <button class="btn btn-secondary close-modal-btn-action" style="padding: 0.75rem 1.5rem; font-size: 0.9rem;">
            ${closeBtnText}
          </button>
        </div>
      </div>
    </div>
  `;

  // Bind close action to the footer secondary button
  elements.modalContent.querySelector('.close-modal-btn-action').addEventListener('click', closeProjectModal);

  // Trigger Lucide icons inside the modal
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Display modal
  elements.modal.classList.add('active');
  elements.modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

// Close Project Modal
function closeProjectModal() {
  activeProjectIndex = null;
  elements.modal.classList.remove('active');
  elements.modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

// Category Label Helper
function getProjectCategoryLabel(category, data) {
  if (category === 'frontend') return data.projects.filterFrontend;
  if (category === 'fullstack') return data.projects.filterFullstack;
  if (category === 'academic') return data.projects.filterAcademic;
  return data.projects.filterAll;
}


