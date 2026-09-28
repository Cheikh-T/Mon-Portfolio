/* ══════════════════════════════════════════════════════════════════
   CHEICKNA OMAR DIAKITÉ — MALI NUIT
   Portfolio JS: Cursor · Sidebar Nav · Typed · Canvas · Tabs · Reveal
   ══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initSidebarNav();
  initHamburger();
  initTypedText();
  initCanvas();
  initCounters();
  initExperienceTabs();
  initReveal();
  initSkillBars();
  initBackToTop();
  initProjectProofs();
  initProofsLightbox();
});

/* ══════════════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  // Hide on touch devices
  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  const interactives = document.querySelectorAll(
    'a, button, .tab-btn, .other-card, .skill-card, .contact-item, .feat-link, .btn-gold, .btn-outline, .btn-submit'
  );
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ══════════════════════════════════════════════════════════════════
   2. SIDEBAR ACTIVE NAV
   ══════════════════════════════════════════════════════════════════ */
function initSidebarNav() {
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section[id]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));

  // Smooth scroll on nav click
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(item.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Close mobile nav if open
      closeMobileNav();
    });
  });
}

/* ══════════════════════════════════════════════════════════════════
   3. HAMBURGER MENU (Mobile)
   ══════════════════════════════════════════════════════════════════ */
function initHamburger() {
  const btn     = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const sidebar  = document.getElementById('sidebar');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    if (overlay) overlay.classList.toggle('open', isOpen);
    if (sidebar) sidebar.classList.toggle('mobile-open', isOpen);
  });

  // Close on mobile nav link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
      closeMobileNav();
    });
  });
}

function closeMobileNav() {
  const btn     = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const sidebar  = document.getElementById('sidebar');
  if (btn)     btn.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  if (sidebar) sidebar.classList.remove('mobile-open');
}

/* ══════════════════════════════════════════════════════════════════
   4. TYPED TEXT
   ══════════════════════════════════════════════════════════════════ */
function initTypedText() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Développeur Full Stack',
    'Backend Java / Spring Boot',
    'Frontend Angular Expert',
    'Mobile Flutter Developer',
    'UI/UX & Designer Graphique',
    'Entrepreneur & Formateur',
  ];

  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function type() {
    const current = phrases[phraseIdx];
    if (isDeleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 400);
        return;
      }
      setTimeout(type, 45);
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        setTimeout(type, 2200);
        return;
      }
      setTimeout(type, 85);
    }
  }
  setTimeout(type, 1000);
}

/* ══════════════════════════════════════════════════════════════════
   5. HERO CANVAS — Gold Particle Network (High Performance)
   ══════════════════════════════════════════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById('heroCanvas');
  const hero   = document.querySelector('.hero-section');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let animId = null;
  let isHeroVisible = true;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); }, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.2 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.22;
      this.vy = (Math.random() - 0.5) * 0.22;
      this.alpha = Math.random() * 0.45 + 0.15;
      const r = Math.random();
      if (r < 0.65) {
        this.color = `rgba(201,168,76,${this.alpha})`;
      } else if (r < 0.85) {
        this.color = `rgba(123,63,192,${this.alpha * 0.7})`;
      } else {
        this.color = `rgba(184,92,56,${this.alpha * 0.6})`;
      }
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }

  function initParticles() {
    const count = Math.min(45, Math.floor((W * H) / 25000));
    particles = Array.from({ length: count }, () => new Particle());
  }
  initParticles();

  const maxDist = 110;
  const maxDistSq = maxDist * maxDist;

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < maxDistSq) {
          const alpha = (1 - Math.sqrt(distSq) / maxDist) * 0.08;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    if (!isHeroVisible) return;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    drawConnections();
    animId = requestAnimationFrame(animate);
  }

  // Observer pour mettre en pause le canvas quand l'utilisateur scrolle plus bas
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible) {
        cancelAnimationFrame(animId);
        animId = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animId);
      }
    });
  }, { threshold: 0.05 });

  heroObserver.observe(hero);
  animId = requestAnimationFrame(animate);
}

/* ══════════════════════════════════════════════════════════════════
   6. COUNTER ANIMATION
   ══════════════════════════════════════════════════════════════════ */
function initCounters() {
  const counters = document.querySelectorAll('[data-target]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();
  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

/* ══════════════════════════════════════════════════════════════════
   7. EXPERIENCE TABS
   ══════════════════════════════════════════════════════════════════ */
function initExperienceTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.tab-panel');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const panel = document.getElementById('panel-' + btn.dataset.tab);
      if (panel) panel.classList.add('active');
    });
  });
}

/* ══════════════════════════════════════════════════════════════════
   8. SCROLL REVEAL
   ══════════════════════════════════════════════════════════════════ */
function initReveal() {
  const targets = document.querySelectorAll(
    '.skill-card, .other-card, .feat-project, .contact-item, .skill-group'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 60 * (entry.target.dataset.revealDelay || 0));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Add stagger delays
  document.querySelectorAll('.other-card').forEach((el, i) => el.dataset.revealDelay = i);
  document.querySelectorAll('.skill-card').forEach((el, i) => el.dataset.revealDelay = i);

  targets.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════════
   9. SKILL BARS
   ══════════════════════════════════════════════════════════════════ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const target = bar.style.getPropertyValue('--w');
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = target; }, 100);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => observer.observe(b));
}

/* ══════════════════════════════════════════════════════════════════
   10. BACK TO TOP
   ══════════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════════════
   11. CONTACT FORM
   ══════════════════════════════════════════════════════════════════ */
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const btn     = document.getElementById('btnSubmit');
  if (!btn) return;

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

  setTimeout(() => {
    form.reset();
    btn.innerHTML = '<span>Envoyer</span><i class="fas fa-paper-plane"></i>';
    btn.disabled = false;
    if (success) {
      success.style.display = 'flex';
      setTimeout(() => { success.style.display = 'none'; }, 6000);
    }
  }, 1500);
}

/* ══════════════════════════════════════════════════════════════════
   12. CURSOR INTERACTION on dynamic elements
   ══════════════════════════════════════════════════════════════════ */
// Ensure all interactive elements have cursor hover effect after init
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* ══════════════════════════════════════════════════════════════════
   13. HERO PARALLAX on mouse move (subtle)
   ══════════════════════════════════════════════════════════════════ */
const heroSection = document.querySelector('.hero-section');
if (heroSection && !window.matchMedia('(pointer: coarse)').matches) {
  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;

    const name = document.getElementById('heroName');
    if (name) {
      name.style.transform = `translate(${dx * 4}px, ${dy * 4}px)`;
    }

    const photoFrame = document.querySelector('.photo-frame');
    if (photoFrame) {
      photoFrame.style.transform = `translate(${dx * -6}px, ${dy * -6}px)`;
    }
  });

    heroSection.addEventListener('mouseleave', () => {
    const name = document.getElementById('heroName');
    const photoFrame = document.querySelector('.photo-frame');
    if (name) name.style.transform = '';
    if (photoFrame) photoFrame.style.transform = '';
  });
}

/* ══════════════════════════════════════════════════════════════════
   14. PROJECT PROOFS & DEVICE MOCKUPS (Mobile & Desktop)
   ══════════════════════════════════════════════════════════════════ */
function initProjectProofs() {
  const thumbGroups = document.querySelectorAll('.proof-thumbs');
  thumbGroups.forEach(group => {
    const galleryId = group.dataset.gallery;
    const thumbs = group.querySelectorAll('.proof-thumb');
    const displayImg = document.querySelector(`[data-gallery-screen="${galleryId}"] img`);

    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', () => {
        // Active status
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        // Change image in device mockup (phone or laptop) with smooth transition
        const newSrc = thumb.dataset.img;
        if (displayImg && newSrc) {
          displayImg.style.opacity = '0';
          setTimeout(() => {
            displayImg.src = newSrc;
            displayImg.style.opacity = '1';
          }, 180);
        }

        // Update zoom overlay trigger index
        const screenOverlay = document.querySelector(`[data-gallery-screen="${galleryId}"] .phone-screen-overlay, [data-gallery-screen="${galleryId}"] .laptop-screen-overlay`);
        if (screenOverlay) {
          screenOverlay.dataset.start = idx;
        }
      });
    });
  });
}

/* ══════════════════════════════════════════════════════════════════
   15. LIGHTBOX MODALE MULTI-APPAREILS — MOBILE & DASHBOARD HD
   ══════════════════════════════════════════════════════════════════ */
// Dictionnaire complet des galeries avec type d'appareil (mobile vs desktop)
const PROJECT_CONFIG = {
  mywa: {
    device: 'mobile',
    url: 'https://mywa.market.app',
    items: [
      { src: 'images/home.jpg', title: 'Mywa — 01. Accueil marketplace & Boutiques en vedette' },
      { src: 'images/boutique.jpg', title: 'Mywa — 02. Vitrine boutique & Catégories' },
      { src: 'images/Produit.jpg', title: 'Mywa — 03. Fiche produit détaillée & Panier' },
      { src: 'images/Login.jpg', title: 'Mywa — 04. Authentification & Sécurité Firebase' }
    ]
  },
  cid: {
    device: 'mobile',
    url: 'https://cid-banking.secure.ml',
    items: [
      { src: 'images/transct.jpg', title: 'CID Banking — 01. Historique des transactions sur 3 mois' },
      { src: 'images/Screenshot_20260916_165001.jpg', title: 'CID Banking — 02. Tableau de bord compte & Solde' },
      { src: 'images/Screenshot_20260916_165006.jpg', title: 'CID Banking — 03. Validation virement & Reçu numérique' },
      { src: 'images/Screenshot_20260916_165009.jpg', title: 'CID Banking — 04. Détails d\'opération & Relevé bancaire' }
    ]
  },
  malishi: {
    device: 'mobile',
    url: 'https://malishi.com',
    items: [
      { src: 'images/boutique.jpg', title: 'MaliShi — 01. Vitrine mobile des produits Karité' },
      { src: 'images/bouti.jpg', title: 'MaliShi — 02. Grille catalogue & Filtres par gamme' },
      { src: 'images/boutik.jpg', title: 'MaliShi — 03. Panier d\'achat & Validation de commande' },
      { src: 'images/home 1.jpg', title: 'MaliShi — 04. Accueil promotions & Valorisation locale' }
    ]
  },
  quantix: {
    device: 'desktop',
    url: 'https://quantix.thl.ml/admin/dashboard/stocks',
    items: [
      { src: 'images/Screenshot_20260916_165238.jpg', title: 'Quantix ERP — 01. Tableau de bord des stocks & Vue d\'ensemble' },
      { src: 'images/Screenshot_20260916_165249.jpg', title: 'Quantix ERP — 02. Alertes automatiques de rupture & Commandes' },
      { src: 'images/Produit.jpg', title: 'Quantix ERP — 03. Fiche article, codes-barres & Traçabilité' },
      { src: 'images/menu.jpg', title: 'Quantix ERP — 04. Statistiques mensuelles, valorisation & Inventaire' }
    ]
  },
  paie: {
    device: 'desktop',
    url: 'https://rh-paie.enterprise.ml/admin/payroll',
    items: [
      { src: 'images/Screenshot_20260916_165152.jpg', title: 'Gestion de Paie — 01. Organigramme dynamique d\'entreprise' },
      { src: 'images/Screenshot_20260916_165211.jpg', title: 'Gestion de Paie — 02. Moteur de calcul des salaires & Cotisations' },
      { src: 'images/Screenshot_20260916_165222.jpg', title: 'Gestion de Paie — 03. Planning des congés payés & Absences' },
      { src: 'images/Screenshot_20260916_165229.jpg', title: 'Gestion de Paie — 04. Bulletins de paie & Export comptable' }
    ]
  },
  sport: {
    device: 'desktop',
    url: 'https://sport.federation.ml/athletes/monitor',
    items: [
      { src: 'images/Screenshot_20260916_165019.jpg', title: 'Min Digital Sport — 01. Suivi des performances athlètes' },
      { src: 'images/Screenshot_20260916_165022.jpg', title: 'Min Digital Sport — 02. Calendrier des compétitions sportives' },
      { src: 'images/Screenshot_20260916_165056.jpg', title: 'Min Digital Sport — 03. Fiche joueur détaillée & Statistiques' },
      { src: 'images/Screenshot_20260916_165101.jpg', title: 'Min Digital Sport — 04. Médias & Rapports de match' }
    ]
  },
  hewo: {
    device: 'mobile',
    url: 'https://hewo-vtc.app',
    items: [
      { src: 'images/Screenshot_20260916_165115.jpg', title: 'Hewo VTC — 01. Réservation de course passager' },
      { src: 'images/Screenshot_20260916_165135.jpg', title: 'Hewo VTC — 02. Suivi GPS temps réel du chauffeur' },
      { src: 'images/Screenshot_20260916_165143.jpg', title: 'Hewo VTC — 03. Historique des trajets & Facturation' },
      { src: 'images/Screenshot_20260916_165148.jpg', title: 'Hewo VTC — 04. Dashboard dispatching centralisé' }
    ]
  },
  appgest: {
    device: 'desktop',
    url: 'https://appgest.logistics.ml/dispatching',
    items: [
      { src: 'images/Screenshot_20260916_165001.jpg', title: 'AppGest — 01. Gestion logistique des tournées' },
      { src: 'images/Screenshot_20260916_165006.jpg', title: 'AppGest — 02. Validation de livraison mobile' },
      { src: 'images/transct.jpg', title: 'AppGest — 03. Suivi des commandes & Bons de livraison' },
      { src: 'images/home.jpg', title: 'AppGest — 04. Dashboard dispatching & Flotte' }
    ]
  }
};

function initProofsLightbox() {
  const modal        = document.getElementById('proofsLightbox');
  const backdrop     = document.getElementById('lightboxBackdrop');
  const closeBtn     = document.getElementById('lightboxCloseBtn');
  const prevBtn      = document.getElementById('lightboxPrev');
  const nextBtn      = document.getElementById('lightboxNext');
  const phoneImg     = document.getElementById('lightboxMainImg');
  const desktopImg   = document.getElementById('lightboxDesktopImg');
  const desktopUrl   = document.getElementById('lightboxLaptopUrl');
  const captionEl    = document.getElementById('lightboxCaption');
  const counterEl    = document.getElementById('lightboxCounter');
  const thumbsEl     = document.getElementById('lightboxThumbs');
  const downloadLink = document.getElementById('lightboxDownloadBtn');

  if (!modal) return;

  let currentGallery = 'mywa';
  let currentIndex = 0;

  function renderSlide() {
    const config = PROJECT_CONFIG[currentGallery];
    if (!config || !config.items || !config.items.length) return;
    const list = config.items;
    const isDesktop = config.device === 'desktop';

    if (currentIndex < 0) currentIndex = list.length - 1;
    if (currentIndex >= list.length) currentIndex = 0;

    const item = list[currentIndex];

    // Toggle desktop vs mobile mode
    modal.classList.toggle('desktop-mode', isDesktop);

    const activeImg = isDesktop ? desktopImg : phoneImg;
    if (activeImg) {
      activeImg.style.opacity = '0';
      activeImg.style.transform = 'scale(0.97)';

      setTimeout(() => {
        activeImg.src = item.src;
        activeImg.alt = item.title;
        if (downloadLink) downloadLink.href = item.src;
        if (captionEl) captionEl.textContent = item.title;
        if (counterEl) counterEl.textContent = `${currentIndex + 1} / ${list.length}`;
        if (desktopUrl && isDesktop) desktopUrl.textContent = config.url || 'https://dashboard.local';

        activeImg.style.opacity = '1';
        activeImg.style.transform = 'scale(1)';
      }, 140);
    }

    // Update active mini thumb
    if (thumbsEl) {
      const allThumbs = thumbsEl.querySelectorAll('.lightbox-mini-thumb');
      allThumbs.forEach((th, idx) => {
        th.classList.toggle('active', idx === currentIndex);
      });
    }
  }

  function openLightbox(galleryKey, startIndex = 0) {
    currentGallery = galleryKey;
    currentIndex = parseInt(startIndex, 10) || 0;
    const config = PROJECT_CONFIG[currentGallery];
    if (!config || !config.items) return;
    const list = config.items;

    // Render mini thumbs
    if (thumbsEl) {
      thumbsEl.innerHTML = '';
      list.forEach((item, idx) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = `lightbox-mini-thumb ${idx === currentIndex ? 'active' : ''}`;
        thumbDiv.innerHTML = `<img src="${item.src}" alt="${item.title}" />`;
        thumbDiv.addEventListener('click', () => {
          currentIndex = idx;
          renderSlide();
        });
        thumbsEl.appendChild(thumbDiv);
      });
    }

    renderSlide();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Open triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-gallery]');
    if (trigger && !trigger.classList.contains('proof-thumb')) {
      const galleryKey = trigger.dataset.gallery;
      const startIdx = trigger.dataset.start || 0;
      if (PROJECT_CONFIG[galleryKey]) {
        e.preventDefault();
        openLightbox(galleryKey, startIdx);
      }
    }
  });

  // Nav buttons
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex--;
      renderSlide();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex++;
      renderSlide();
    });
  }

  // Close handlers
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  // Keyboard navigation (Esc, ArrowLeft, ArrowRight)
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') {
      currentIndex--;
      renderSlide();
    }
    if (e.key === 'ArrowRight') {
      currentIndex++;
      renderSlide();
    }
  });
}


