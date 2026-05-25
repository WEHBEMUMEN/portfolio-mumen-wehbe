import { cvData } from '../cvData.js';

document.addEventListener('DOMContentLoaded', () => {
  const PROJECT_INDEX = parseInt(document.body.dataset.projectIndex || '0', 10);
  
  const getBrowserLang = () => {
    const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    return lang.startsWith('fr') ? 'fr' : 'en';
  };
  let currentLang = localStorage.getItem('portfolio-lang') || getBrowserLang();

  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  // Inject dynamic header & footer
  if (header) {
    header.classList.add('subpage-header');
    header.innerHTML = `
      <div class="nav-container">
        <a href="../../index.html" class="logo">
          Mumen Wehbe<span class="logo-dot"></span>
        </a>
        
        <nav class="nav-links">
          <a href="../../index.html" class="nav-link" id="nav-home-link">Home</a>
        </nav>
        
        <div class="actions-container">
          <!-- Theme Toggle Switch -->
          <button class="theme-toggle-btn" id="theme-toggle-btn" aria-label="Toggle dark/light mode" style="margin-right: 0.25rem;">
            <i data-lucide="sun" class="sun-icon" style="width: 16px; height: 16px; stroke-width: 2;"></i>
            <i data-lucide="moon" class="moon-icon" style="width: 16px; height: 16px; stroke-width: 2; display: none;"></i>
          </button>

          <button class="lang-btn" id="lang-switch-btn" aria-label="Toggle language">
            <i data-lucide="languages" style="width: 16px; height: 16px; stroke-width: 2;"></i>
            <span id="lang-switch-text">Français</span>
          </button>
        </div>
      </div>
    `;
  }

  if (footer) {
    footer.innerHTML = `
      <div class="footer-logo">Mumen Wehbe<span class="logo-dot"></span></div>
      <div id="footer-copy-text">&copy; 2026 Mumen Wehbe. All rights reserved.</div>
    `;
  }

  function renderPage(lang) {
    const data = cvData[lang];
    const project = data.projects.list[PROJECT_INDEX];

    document.title = `${project.title} | Mumen Wehbe`;
    
    // Update Header Links
    const homeLink = document.getElementById('nav-home-link');
    if (homeLink) {
      homeLink.textContent = lang === 'en' ? 'Home' : 'Accueil';
    }

    // Update UI Text elements
    const backBtn = document.getElementById('back-link-text');
    if (backBtn) backBtn.textContent = lang === 'en' ? 'Back to Projects' : 'Retour aux Projets';
    
    const langBtnText = document.getElementById('lang-switch-text');
    if (langBtnText) langBtnText.textContent = lang === 'en' ? 'Français' : 'English';
    
    const specsTitle = document.getElementById('specs-title-text');
    if (specsTitle) specsTitle.textContent = lang === 'en' ? 'System Specs' : 'Spécifications';
    
    const challengeTitle = document.getElementById('challenge-title');
    if (challengeTitle) {
      challengeTitle.innerHTML = `<i data-lucide="alert-circle" style="width: 20px; height: 20px; color: var(--accent-cyan); flex-shrink: 0;"></i> ${lang === 'en' ? 'The Challenge' : 'Le Défi'}`;
    }
    
    const solutionTitle = document.getElementById('solution-title');
    if (solutionTitle) {
      solutionTitle.innerHTML = `<i data-lucide="check-circle" style="width: 20px; height: 20px; color: var(--accent-emerald); flex-shrink: 0;"></i> ${lang === 'en' ? 'Solution & Achievements' : 'Solution & Réalisations'}`;
    }
    
    const footerCopy = document.getElementById('footer-copy-text');
    if (footerCopy) {
      footerCopy.innerHTML = `&copy; ${new Date().getFullYear()} Mumen Wehbe. ${lang === 'en' ? 'All rights reserved.' : 'Tous droits réservés.'}`;
    }

    // Update Project elements
    const projCat = document.getElementById('project-cat');
    if (projCat) projCat.textContent = getCategoryLabel(project.category, data);
    
    const projTitle = document.getElementById('project-title-text');
    if (projTitle) projTitle.textContent = project.title;
    
    const challengeText = document.getElementById('challenge-text');
    if (challengeText) challengeText.textContent = project.challenge || project.description;
    
    const solutionText = document.getElementById('solution-text');
    if (solutionText) solutionText.textContent = project.solution || '';

    // Render Achievements
    const achievementsContainer = document.getElementById('achievements-container');
    if (achievementsContainer) {
      achievementsContainer.innerHTML = (project.achievements || []).map(ach => `
        <li>
          <i data-lucide="arrow-right" class="arrow-icon" style="width: 16px; height: 16px; color: var(--accent-emerald); flex-shrink: 0; margin-top: 4px;"></i>
          <span>${ach}</span>
        </li>
      `).join('');
    }

    // Render System tags
    const tagsContainer = document.getElementById('specs-tags-container');
    if (tagsContainer) {
      tagsContainer.innerHTML = (project.tags || []).map(t => `<span class="specs-tag">${t}</span>`).join('');
    }

    // Render image card settings
    const img = document.getElementById('project-img');
    const imgCard = document.getElementById('project-img-card');
    if (img && imgCard) {
      if (project.image) {
        img.src = `../../${project.image}`;
        img.alt = project.title;
        imgCard.classList.remove('no-image');
        if (!imgCard.contains(img)) {
          imgCard.appendChild(img);
        }
        img.onerror = () => {
          imgCard.classList.add('no-image');
          img.remove();
        };
      } else {
        imgCard.classList.add('no-image');
        img.remove();
      }
    }

    // Render CTA Link(s)
    const actionRow = document.querySelector('.action-row');
    if (actionRow) {
      actionRow.innerHTML = '';
      if (project.link) {
        actionRow.innerHTML += `
          <a href="${project.link}" target="_blank" class="btn btn-primary" id="project-cta-link" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            ${lang === 'en' ? 'View GitHub' : 'Voir sur GitHub'}
          </a>
        `;
      }
      if (project.pdfLink) {
        const btnClass = project.link ? 'btn-secondary' : 'btn-primary';
        actionRow.innerHTML += `
          <a href="../../${project.pdfLink}" target="_blank" class="btn ${btnClass}" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none;">
            <i data-lucide="file-text" style="width: 18px; height: 18px;"></i>
            ${lang === 'en' ? 'Read Project Sheet' : 'Lire la Fiche Projet'}
          </a>
        `;
      }
    }

    // Render Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function getCategoryLabel(category, data) {
    const primaryCat = Array.isArray(category) ? category[0] : category;
    if (primaryCat === 'frontend') return data.projects.filterFrontend;
    if (primaryCat === 'fullstack') return data.projects.filterFullstack;
    if (primaryCat === 'academic') return data.projects.filterAcademic;
    return data.projects.filterAll;
  }

  // Setup Theme Toggler Events
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-mode');
      const isLight = document.documentElement.classList.contains('light-mode');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      updateThemeIcons();
    });
  }

  function updateThemeIcons() {
    const sunIcon = document.querySelector('#theme-toggle-btn .sun-icon');
    const moonIcon = document.querySelector('#theme-toggle-btn .moon-icon');
    if (!sunIcon || !moonIcon) return;

    if (document.documentElement.classList.contains('light-mode')) {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  // Setup Language Selector Events
  const langBtn = document.getElementById('lang-switch-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'fr' : 'en';
      localStorage.setItem('portfolio-lang', currentLang);
      renderPage(currentLang);
    });
  }

  // Initial render calls
  renderPage(currentLang);
  updateThemeIcons();
});
