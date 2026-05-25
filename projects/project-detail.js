import { cvData } from '../cvData.js';

document.addEventListener('DOMContentLoaded', () => {
  const PROJECT_INDEX = parseInt(document.body.dataset.projectIndex || '0', 10);
  let currentLang = localStorage.getItem('portfolio-lang') || 'en';

  const header = document.querySelector('header');
  const footer = document.querySelector('footer');

  // Inject dynamic header & footer
  if (header) {
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
            <i data-lucide="external-link" style="width: 18px; height: 18px;"></i>
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
