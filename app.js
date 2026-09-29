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
  initProjectsFilter();
  initDesignExpandBtns();
});

/* ══════════════════════════════════════════════════════════════════
   1. CUSTOM CURSOR
   ══════════════════════════════════════════════════════════════════ */
function initCursor() {
  const dot = document.getElementById('cursorDot');
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
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  // Smooth ring follow
  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
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
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const sidebar = document.getElementById('sidebar');
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
  const btn = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileNavOverlay');
  const sidebar = document.getElementById('sidebar');
  if (btn) btn.classList.remove('open');
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
  const hero = document.querySelector('.hero-section');
  if (!canvas || !hero) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  let animId = null;
  let isHeroVisible = true;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
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
  const panels = document.querySelectorAll('.tab-panel');
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
   11. FORMULAIRE DE CONTACT SIMPLE, DIRECT & 100% FONCTIONNEL
   ══════════════════════════════════════════════════════════════════ */
const CONTACT_EMAIL = 'Cheickodi5@gmail.com';

function handleFormSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  const btn = document.getElementById('btnSubmit');
  if (!form || !btn) return;

  // 1. Réinitialiser les messages d'erreurs éventuels
  ['cfName', 'cfEmail', 'cfMessage'].forEach(id => {
    const group = document.getElementById(`group-${id}`);
    const err = document.getElementById(`err-${id}`);
    if (group) group.classList.remove('has-error');
    if (err) err.textContent = '';
  });
  if (successBox) successBox.style.display = 'none';

  // 2. Récupération des données
  const name = (document.getElementById('cfName')?.value || '').trim();
  const email = (document.getElementById('cfEmail')?.value || '').trim();
  const subject = (document.getElementById('cfSubject')?.value || '').trim();
  const message = (document.getElementById('cfMessage')?.value || '').trim();

  // 3. Validation simple et claire
  let hasError = false;
  if (!name) {
    showFieldError('cfName', 'Veuillez saisir votre nom.');
    hasError = true;
  }
  if (!email) {
    showFieldError('cfEmail', 'Veuillez saisir votre e-mail.');
    hasError = true;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showFieldError('cfEmail', 'Adresse e-mail invalide.');
    hasError = true;
  }
  if (!message) {
    showFieldError('cfMessage', 'Veuillez rédiger votre message.');
    hasError = true;
  }

  if (hasError) return;

  function showFieldError(fieldId, text) {
    const group = document.getElementById(`group-${fieldId}`);
    const err = document.getElementById(`err-${fieldId}`);
    if (group) group.classList.add('has-error');
    if (err) err.textContent = text;
  }

  // 4. Préparation de l'e-mail complet
  const mailSubject = subject ? `[Portfolio] ${subject}` : `[Portfolio] Prise de contact de ${name}`;
  const mailBody = `Bonjour Cheickna,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}`;

  const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

  // 5. Animation et déclenchement immédiat
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-check"></i> E-mail prêt !';

  // Ouvre le client de messagerie par défaut (Gmail mobile, Outlook, Apple Mail...)
  window.location.href = mailtoUrl;

  // 6. Affichage du bandeau de confirmation avec boutons 1-clic directs
  if (successBox) {
    successBox.innerHTML = `
      <i class="fas fa-check-circle" style="font-size:1.35rem;color:#4ADE80;margin-top:2px;"></i>
      <div class="feedback-text">
        <strong>Votre message est prêt pour ${CONTACT_EMAIL} !</strong>
        <span>Votre application de messagerie a été ouverte. Si vous utilisez Gmail sur navigateur, vous pouvez aussi l'ouvrir directement ci-dessous :</span>
        <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap;">
          <a href="${gmailWebUrl}" target="_blank" rel="noopener" class="feedback-fallback-btn" style="background:var(--gold);color:#0A0705;border-color:var(--gold);">
            <i class="fab fa-google"></i> Envoyer via Gmail Web
          </a>
          <a href="${mailtoUrl}" class="feedback-fallback-btn">
            <i class="fas fa-paper-plane"></i> Relancer mon appli Mail
          </a>
        </div>
      </div>
    `;
    successBox.style.display = 'flex';
    successBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  setTimeout(() => {
    btn.disabled = false;
    btn.innerHTML = '<span>Envoyer le Message</span><i class="fas fa-paper-plane"></i>';
  }, 1800);
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
       DÉFILEMENT AUTOMATIQUE FLUIDE (DURÉE : 3 SECONDES)
   ══════════════════════════════════════════════════════════════════ */
function initProjectProofs() {
  const thumbGroups = document.querySelectorAll('.proof-thumbs');
  const SLIDE_DURATION = 3000; // 3 secondes

  thumbGroups.forEach(group => {
    const galleryId = group.dataset.gallery;
    const thumbs = Array.from(group.querySelectorAll('.proof-thumb'));
    const displayImg = document.querySelector(`[data-gallery-screen="${galleryId}"] img`);
    const projectCard = group.closest('.feat-project');
    const deviceMockup = document.querySelector(`[data-gallery-target="${galleryId}"]`);

    if (!thumbs.length || !displayImg) return;

    let currentIndex = 0;
    let autoTimer = null;
    let isPaused = false;

    function goToSlide(idx, restart = true) {
      if (idx < 0) idx = thumbs.length - 1;
      if (idx >= thumbs.length) idx = 0;
      currentIndex = idx;

      // 1. Mise à jour de l'état actif et de l'indicateur de progression
      thumbs.forEach((t, i) => {
        const isActive = (i === currentIndex);
        t.classList.toggle('active', isActive);
        t.classList.remove('is-progressing');
        if (isActive && !isPaused) {
          void t.offsetWidth; // Force reflow pour relancer l'animation CSS 3s
          t.classList.add('is-progressing');
        }
      });

      // 2. Transition douce de l'image du mockup (Smartphone ou Laptop)
      const currentThumb = thumbs[currentIndex];
      const newSrc = currentThumb ? currentThumb.dataset.img : null;
      if (newSrc) {
        displayImg.style.opacity = '0';
        displayImg.style.transform = 'scale(0.97)';
        setTimeout(() => {
          displayImg.src = newSrc;
          displayImg.style.opacity = '1';
          displayImg.style.transform = 'scale(1)';
        }, 160);
      }

      // 3. Mise à jour de l'index de départ pour la lightbox plein écran
      const screenOverlay = document.querySelector(
        `[data-gallery-screen="${galleryId}"] .phone-screen-overlay, [data-gallery-screen="${galleryId}"] .laptop-screen-overlay, [data-gallery-screen="${galleryId}"] .rollup-banner-overlay, [data-gallery-screen="${galleryId}"] .stage-banner-overlay, [data-gallery-screen="${galleryId}"] .poster-screen-overlay, [data-gallery-screen="${galleryId}"] [data-gallery]`
      );
      if (screenOverlay) {
        screenOverlay.dataset.start = currentIndex;
      }

      // 4. Relance du compte à rebours de 3 secondes si demandé
      if (restart) {
        resetTimer();
      }
    }

    function resetTimer() {
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
      if (isPaused) return;

      const activeThumb = thumbs[currentIndex];
      if (activeThumb) {
        activeThumb.classList.remove('is-progressing');
        void activeThumb.offsetWidth;
        activeThumb.classList.add('is-progressing');
      }

      autoTimer = setTimeout(() => {
        goToSlide(currentIndex + 1, true);
      }, SLIDE_DURATION);
    }

    function pause() {
      isPaused = true;
      if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
      }
      const activeThumb = thumbs[currentIndex];
      if (activeThumb) activeThumb.classList.remove('is-progressing');
    }

    function resume() {
      if (!isPaused) return;
      isPaused = false;
      resetTimer();
    }

    // Gestion du clic utilisateur sur les boutons miniatures
    thumbs.forEach((thumb, idx) => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx, true);
      });
    });

    // Pause au survol (sur la carte du projet ou sur l'écran du mockup)
    const hoverElements = [projectCard, deviceMockup, group].filter(Boolean);
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', pause);
      el.addEventListener('mouseleave', resume);
    });

    // Démarrage initial
    goToSlide(0, true);

    // Optimisation : suspendre le défilement si le projet est hors champ
    if ('IntersectionObserver' in window && projectCard) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            resume();
          } else {
            pause();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(projectCard);
    }
  });

  // Défilement automatique pour les autres cartes (Dashboards RH, Stock, etc.)
  initOtherCardsSlideshow();
}

/* ══════════════════════════════════════════════════════════════════
   14b. AUTO-SLIDESHOW POUR LES CARTES DASHBOARDS & LOGICIELS (3S)
   ══════════════════════════════════════════════════════════════════ */
function initOtherCardsSlideshow() {
  const cards = document.querySelectorAll('.other-projects-grid .other-card');
  const SLIDE_DURATION = 3000;

  cards.forEach(card => {
    // Identifier la clé de galerie associée
    const proofBtn = card.querySelector('[data-gallery]');
    const galleryKey = proofBtn ? proofBtn.dataset.gallery : null;
    if (!galleryKey || !PROJECT_CONFIG[galleryKey]) return;

    const items = PROJECT_CONFIG[galleryKey].items;
    if (!items || items.length <= 1) return;

    const thumbContainer = card.querySelector('.other-card-thumb, .vinyl-jacket, .brand-board-preview');
    const thumbImg = thumbContainer ? thumbContainer.querySelector('img') : null;
    if (!thumbImg) return;

    // Ajout d'un badge élégant indiquant le défilement (ex: 1/7)
    let badge = card.querySelector('.other-card-slide-badge');
    if (!badge && !card.classList.contains('vinyl-card')) {
      badge = document.createElement('span');
      badge.className = 'other-card-slide-badge';
      badge.innerHTML = `<i class="fas fa-play"></i> 1/${items.length}`;
      thumbContainer.appendChild(badge);
    }

    let currentIndex = parseInt(proofBtn.dataset.start, 10) || 0;
    let timer = null;
    let isPaused = false;

    function nextSlide() {
      currentIndex = (currentIndex + 1) % items.length;
      const nextItem = items[currentIndex];

      thumbImg.style.opacity = '0';
      thumbImg.style.transform = 'scale(0.98)';

      setTimeout(() => {
        thumbImg.src = nextItem.src;
        thumbImg.style.opacity = '0.95';
        thumbImg.style.transform = 'scale(1)';
        if (badge) badge.innerHTML = `<i class="fas fa-play"></i> ${currentIndex + 1}/${items.length}`;
      }, 160);
    }

    function start() {
      stop();
      if (isPaused) return;
      timer = setInterval(nextSlide, SLIDE_DURATION);
    }

    function stop() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    card.addEventListener('mouseenter', () => {
      isPaused = true;
      stop();
    });

    card.addEventListener('mouseleave', () => {
      isPaused = false;
      start();
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isPaused = false;
            start();
          } else {
            isPaused = true;
            stop();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(card);
    } else {
      start();
    }
  });
}

/* ══════════════════════════════════════════════════════════════════
   15. LIGHTBOX MODALE MULTI-APPAREILS — MOBILE & DASHBOARD HD
   ══════════════════════════════════════════════════════════════════ */
// Dictionnaire complet des galeries avec type d'appareil (mobile vs desktop)
const PROJECT_CONFIG = {
  /* ── Applications Mobile ── */
  mywa: {
    device: 'mobile',
    url: 'https://mywa.market.app',
    items: [
      { src: 'images/Application/Mywa/home 1.jpg', title: 'Mywa — 01. Accueil marketplace & Boutiques en vedette' },
      { src: 'images/Application/Mywa/boutique.jpg', title: 'Mywa — 02. Vitrine boutique & Catégories' },
      { src: 'images/Application/Mywa/boutik.jpg', title: 'Mywa — 03. Fiche produit détaillée & Panier' },
      { src: 'images/Application/Mywa/Login.jpg', title: 'Mywa — 04. Authentification & Sécurité Firebase' },
      { src: 'images/Application/Mywa/menu.jpg', title: 'Mywa — 05. Navigation & Menu principal' },
      { src: 'images/Application/Mywa/Screenshot_20260916_165135.jpg', title: 'Mywa — 06. Notifications & Commandes live' },
      { src: 'images/Application/Mywa/Screenshot_20260916_165143.jpg', title: 'Mywa — 07. Suivi commande en cours' },
      { src: 'images/Application/Mywa/Screenshot_20260916_165148.jpg', title: 'Mywa — 08. Détail produit & Avis' }
    ]
  },
  cid: {
    device: 'mobile',
    url: 'https://cid-banking.secure.ml',
    items: [
      { src: 'images/Application/Client Bank/home 1.png', title: 'CID Banking — 01. Tableau de bord compte & Solde client' },
      { src: 'images/Application/Client Bank/1 (1).PNG', title: 'CID Banking — 02. Liste & Historique des opérations bancaires' },
      { src: 'images/Application/Client Bank/1 (2).PNG', title: 'CID Banking — 03. Validation et reçu de transfert bancaire' },
      { src: 'images/Application/Client Bank/1 (3).PNG', title: 'CID Banking — 04. Relevé mensuel filtrable' },
      { src: 'images/Application/Client Bank/1 (4).PNG', title: 'CID Banking — 05. Virement externe & Confirmation' },
      { src: 'images/Application/Client Bank/detail.png', title: 'CID Banking — 06. Détails d\'opération & Relevé sécurisé' },
      { src: 'images/Application/Client Bank/home.jpg.jpeg', title: 'CID Banking — 07. Accueil compact & Accès rapide' },
      { src: 'images/Application/Client Bank/Login.jpg.jpeg', title: 'CID Banking — 08. Login sécurisé JWT & RSA' }
    ]
  },
  hewo: {
    device: 'mobile',
    url: 'https://hewo-vtc.app',
    items: [
      { src: 'images/Application/Hewo/Mobile/home.jpg', title: 'Hewo VTC — 01. Accueil & Carte interactive passager' },
      { src: 'images/Application/Hewo/Mobile/login.jpg', title: 'Hewo VTC — 02. Connexion & Authentification' },
      { src: 'images/Application/Hewo/Mobile/parcours.jpg', title: 'Hewo VTC — 03. Sélection du parcours & Destination' },
      { src: 'images/Application/Hewo/Mobile/trajet.jpg', title: 'Hewo VTC — 04. Trajet en cours & Tracking GPS live' },
      { src: 'images/Application/Hewo/Mobile/menu.jpg', title: 'Hewo VTC — 05. Menu principal & Navigation' },
      { src: 'images/Application/Hewo/Mobile/profil.jpg', title: 'Hewo VTC — 06. Profil utilisateur & Paramètres' },
      { src: 'images/Application/Hewo/Mobile/course.jpg', title: 'Hewo VTC — 07. Détail d\'une course active' },
      { src: 'images/Application/Hewo/Mobile/list.jpg', title: 'Hewo VTC — 08. Liste des courses disponibles' },
      { src: 'images/Application/Hewo/Mobile/list course.jpg', title: 'Hewo VTC — 09. Liste de courses filtrée & Historique' },
      { src: 'images/Application/Hewo/Mobile/notif.jpg', title: 'Hewo VTC — 10. Notifications & Alertes en temps réel' },
      { src: 'images/Application/Hewo/Mobile/requette.jpg', title: 'Hewo VTC — 11. Requête de course & Validation' },
      { src: 'images/Application/Hewo/Mobile/welcome (1).jpg', title: 'Hewo VTC — 12. Onboarding — Bienvenue (1/5)' },
      { src: 'images/Application/Hewo/Mobile/welcome (2).jpg', title: 'Hewo VTC — 13. Onboarding — Présentation app (2/5)' },
      { src: 'images/Application/Hewo/Mobile/welcome (3).jpg', title: 'Hewo VTC — 14. Onboarding — Fonctionnalités (3/5)' },
      { src: 'images/Application/Hewo/Mobile/welcome (4).jpg', title: 'Hewo VTC — 15. Onboarding — Sécurité & Confiance (4/5)' },
      { src: 'images/Application/Hewo/Mobile/welcome (5).jpg', title: 'Hewo VTC — 16. Onboarding — Démarrer maintenant (5/5)' }
    ]
  },
  malishi: {
    device: 'mobile',
    url: 'https://malishi.com',
    items: [
      { src: 'images/Application/Mywa/boutique.jpg', title: 'MaliShi — 01. Vitrine mobile des produits Karité' },
      { src: 'images/Application/Mywa/boutik.jpg', title: 'MaliShi — 02. Grille catalogue & Filtres par gamme' },
      { src: 'images/Application/Mywa/menu.jpg', title: 'MaliShi — 03. Navigation catalogue & Catégories' },
      { src: 'images/Application/Mywa/home 1.jpg', title: 'MaliShi — 04. Accueil promotions & Valorisation locale' }
    ]
  },
  /* ── Dashboards Web ── */
  'mywa-dash': {
    device: 'desktop',
    url: 'https://admin.mywa.market/dashboard',
    items: [
      { src: 'images/Application/Mywa/Dashboard/Dashboard (1).png', title: 'Mywa Dashboard — 01. Vue d\'ensemble des ventes & Métriques clés' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (2).png', title: 'Mywa Dashboard — 02. Graphiques analytiques de performance' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (3).png', title: 'Mywa Dashboard — 03. Administration boutiques partenaires' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (4).png', title: 'Mywa Dashboard — 04. Gestion commandes, livraisons & stocks' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (5).png', title: 'Mywa Dashboard — 05. Rapports financiers & Export' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (6).png', title: 'Mywa Dashboard — 06. Gestion utilisateurs & Rôles' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (7).png', title: 'Mywa Dashboard — 07. Tableau de bord multi-boutiques' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (8).png', title: 'Mywa Dashboard — 08. Analytique avancée & Tendances' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (9).png', title: 'Mywa Dashboard — 09. Configuration & Paramètres admin' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (10).png', title: 'Mywa Dashboard — 10. Statistiques temps réel' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (11).png', title: 'Mywa Dashboard — 11. Gestion des livreurs & Zones' },
      { src: 'images/Application/Mywa/Dashboard/Login.png', title: 'Mywa Dashboard — 12. Login administrateur sécurisé' }
    ]
  },
  paie: {
    device: 'desktop',
    url: 'https://rh-paie.enterprise.ml/admin/payroll',
    items: [
      { src: 'images/Application/Gestion de paie/PC/Capture d\'écran 2026-09-29 083616.png', title: 'Gestion de Paie — 01. Vue globale RH & Employés' },
      { src: 'images/Application/Gestion de paie/PC/Capture d\'écran 2026-09-29 083646.png', title: 'Gestion de Paie — 02. Organigramme dynamique d\'entreprise' },
      { src: 'images/Application/Gestion de paie/PC/Capture d\'écran 2026-09-29 083808.png', title: 'Gestion de Paie — 03. Moteur de calcul des salaires' },
      { src: 'images/Application/Gestion de paie/PC/Capture d\'écran 2026-09-29 083856.png', title: 'Gestion de Paie — 04. Planning des congés payés & Absences' },
      { src: 'images/Application/Gestion de paie/PC/Capture d\'écran 2026-09-29 084557.png', title: 'Gestion de Paie — 05. Bulletins de paie & Export comptable' },
      { src: 'images/Application/Gestion de paie/PC/home.png', title: 'Gestion de Paie — 06. Dashboard RH principal' },
      { src: 'images/Application/Gestion de paie/PC/login.png', title: 'Gestion de Paie — 07. Authentification & Sécurité' }
    ]
  },
  quantix: {
    device: 'desktop',
    url: 'https://quantix.thl.ml/admin/dashboard/stocks',
    items: [
      { src: 'images/Application/Mywa/Dashboard/Dashboard (5).png', title: 'Quantix ERP — 01. Vue d\'ensemble des stocks' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (6).png', title: 'Quantix ERP — 02. Alertes de rupture & Commandes' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (7).png', title: 'Quantix ERP — 03. Fiche article & Traçabilité' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (8).png', title: 'Quantix ERP — 04. Inventaire mensuel & Valorisation' }
    ]
  },
  sport: {
    device: 'mobile',
    url: 'https://sport.federation.ml',
    items: [
      { src: 'images/Application/logo/Mindigitalsport.png', title: 'Min Digital Sport — Plateforme numérique sportive' }
    ]
  },
  appgest: {
    device: 'mobile',
    url: 'https://appgest.logistics.ml',
    items: [
      { src: 'images/Application/Mywa/Dashboard/Dashboard (4).png', title: 'AppGest — 01. Gestion logistique des tournées' },
      { src: 'images/Application/Mywa/Dashboard/Dashboard (5).png', title: 'AppGest — 02. Dispatching & Flotte chauffeurs' }
    ]
  },
  /* ── Design Graphique ── */
  zabban: {
    device: 'desktop',
    url: 'https://zabban-holding.com/catalogue',
    items: [
      { src: 'images/Programme vusiel/Zabban/Produit/1 (1).PNG', title: 'Zabban — 01. Visuel produit premium collection' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (2).PNG', title: 'Zabban — 02. Présentation catalogue page 2' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (3).PNG', title: 'Zabban — 03. Déclinaison colorimétrique' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (4).PNG', title: 'Zabban — 04. Mise en page éditoriale premium' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (1).JPEG', title: 'Zabban — 05. Visuel lifestyle produit' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (1).JPG', title: 'Zabban — 06. Packaging & Étiquette officielle' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (2).JPG', title: 'Zabban — 07. Vue d\'ensemble gamme produits' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (3).JPG', title: 'Zabban — 08. Mise en scène & Présentation soignée' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (4).JPG', title: 'Zabban — 09. Fiche produit détaillée' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (5).JPG', title: 'Zabban — 10. Variation couleur & Finition' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (6).JPG', title: 'Zabban — 11. Packshot fond neutre' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (7).JPG', title: 'Zabban — 12. Composition & Mise en scène' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (9).JPG', title: 'Zabban — 13. Colorimétrie & Harmonie visuelle' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (10).JPG', title: 'Zabban — 14. Catalogue pleine page' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (11).JPG', title: 'Zabban — 15. Focus produit hero shot' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (12).JPG', title: 'Zabban — 16. Fiche technique & Spécifications' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (13).JPG', title: 'Zabban — 17. Collection complète & Récapitulatif' },
      { src: 'images/Programme vusiel/Zabban/Produit/1 (8).JPG', title: 'Zabban — 18. Dernière page catalogue' }
    ]
  },
  kakemono: {
    device: 'mobile',
    url: 'https://kaizenmali.ml/portfolio/kakemonos',
    items: [
      { src: 'images/Programme vusiel/Affiche & etiquette/KAKEMONO.jpg', title: 'Kaizen Studios — 01. Kakémono officiel prestige (85×200cm)' },
      { src: 'images/Programme vusiel/Affiche & etiquette/kake 1.jpg', title: 'Kaizen Studios — 02. Totem roll-up salon & conférence' },
      { src: 'images/Programme vusiel/Affiche & etiquette/Kakemono Reine et roi .jpg', title: 'Kaizen Studios — 03. Kakémono Royal Reine & Roi' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_23_04_38_IMG_0263.JPG', title: 'Kaizen Studios — 04. Installation réelle en salle de conférence' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_23_04_38_IMG_0266.JPG', title: 'Kaizen Studios — 05. Kakémono déployé à l\'accueil officiel' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_23_04_38_IMG_0268.JPG', title: 'Kaizen Studios — 06. Rendu matière & Précision d\'impression' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_23_04_38_IMG_0276.JPG', title: 'Kaizen Studios — 07. Ambiance événementielle & Signalétique' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_23_04_38_IMG_0280.JPG', title: 'Kaizen Studios — 08. Déploiement scénique & Vue d\'ensemble' }
    ]
  },
  bache: {
    device: 'desktop',
    url: 'https://kaizenmali.ml/portfolio/baches',
    items: [
      { src: 'images/Programme vusiel/Affiche & etiquette/Bâche ROSE.jpg', title: 'Kaizen Studios — 01. Bâche scénique panoramique géante (5000×2700px — ROSE Event)' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_01_30_13_35_IMG_0207.JPEG', title: 'Kaizen Studios — 02. Bâche montée sur structure de scène live' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_01_15_59_IMG_0831.JPG', title: 'Kaizen Studios — 03. Structure métallique tubulaire & Pose de la bâche' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_01_15_59_IMG_0832.JPG', title: 'Kaizen Studios — 04. Détail de fixation & Œillets de tension' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_01_15_59_IMG_0833.JPG', title: 'Kaizen Studios — 05. Vue d\'ensemble scène illuminée & Public' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_02_10_00_IMG_0825.JPG', title: 'Kaizen Studios — 06. Rendu réel impression grand format HD' }
    ]
  },
  affiche: {
    device: 'desktop',
    url: 'https://kaizenmali.ml/portfolio/affiches',
    items: [
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_11_23_43_IMG_1295.PNG', title: 'Kaizen Studios — 01. Mockup Affiche Événementielle HD (Édition Festival)' },
      { src: 'images/Programme vusiel/Affiche & etiquette/2026_02_11_23_51_IMG_1308.PNG', title: 'Kaizen Studios — 02. Affiche Événementielle HD (Éclairage Nocturne)' },
      { src: 'images/Programme vusiel/Affiche & etiquette/cover officiel 1 by Kaizen  made it-Récupéré 11.png', title: 'Kaizen Studios — 03. Cover officielle Kaizen Made It (Album Art)' },
      { src: 'images/Programme vusiel/Affiche & etiquette/cover 2.jpg', title: 'Kaizen Studios — 04. Pochette musicale & Direction artistique' },
      { src: 'images/Programme vusiel/Affiche & etiquette/cover tracklist.png', title: 'Kaizen Studios — 05. Tracklist & Composition typographique' },
      { src: 'images/Programme vusiel/Affiche & etiquette/Soumbala Assaisonné copie.jpg', title: 'Kaizen Studios — 06. Étiquette & Packaging agroalimentaire traditionnel' }
    ]
  },
  logos: {
    device: 'mobile',
    url: 'https://kaizenmali.ml/portfolio/logos',
    items: [
      { src: 'images/Programme vusiel/Logo/GAME XP LOGO 1-01.png', title: 'Logo Game XP — Identité gaming & e-sport' },
      { src: 'images/Programme vusiel/Logo/kaizen logo officiel-01.png', title: 'Logo Kaizen — Identité officielle de marque' },
      { src: 'images/Programme vusiel/Logo/Tunka invest-01.png', title: 'Logo Tunka Invest — Finance & Investissement' },
      { src: 'images/Programme vusiel/Logo/2.png', title: 'Identité visuelle — Concept typographique' },
      { src: 'images/Programme vusiel/Logo/2026_01_09_22_18_IMG_0526.JPG', title: 'Photo impression logo officiel' },
      { src: 'images/Programme vusiel/Logo/2026_01_09_22_18_IMG_0597.PNG', title: 'Logo version haute résolution print' },
      { src: 'images/Programme vusiel/Logo/2026_02_11_18_00_IMG_1263.PNG', title: 'Logo en situation réelle & Application' }
    ]
  },
  barra: {
    device: 'mobile',
    url: 'https://kaizenmali.ml/portfolio/barra',
    items: [
      { src: 'images/Programme vusiel/Barra challenge/logoBG.PNG', title: 'Barra Challenge — Logo fond transparent (version officielle)' },
      { src: 'images/Programme vusiel/Barra challenge/logo (1).JPG', title: 'Barra Challenge — Logo imprimé & Rendu final' }
    ]
  }
};

function initProofsLightbox() {
  const modal = document.getElementById('proofsLightbox');
  const backdrop = document.getElementById('lightboxBackdrop');
  const closeBtn = document.getElementById('lightboxCloseBtn');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const phoneImg = document.getElementById('lightboxMainImg');
  const desktopImg = document.getElementById('lightboxDesktopImg');
  const desktopUrl = document.getElementById('lightboxLaptopUrl');
  const captionEl = document.getElementById('lightboxCaption');
  const counterEl = document.getElementById('lightboxCounter');
  const thumbsEl = document.getElementById('lightboxThumbs');
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


/* ══════════════════════════════════════════════════════════════════
   16. PROJECTS FILTER — Catégories (Mobile / Dashboard / Design)
   ══════════════════════════════════════════════════════════════════ */
function initProjectsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (filter === 'all') {
        // Show everything
        document.querySelectorAll('[data-category], .projects-category-divider').forEach(el => {
          el.style.display = '';
          el.style.opacity = '1';
        });
        return;
      }

      // Show/hide featured project articles
      document.querySelectorAll('[data-category]').forEach(el => {
        const cat = el.dataset.category;
        const show = (cat === filter);
        el.style.display = show ? '' : 'none';
        if (show) {
          el.style.opacity = '0';
          setTimeout(() => { el.style.opacity = '1'; el.style.transition = 'opacity 0.4s ease'; }, 50);
        }
      });

      // Show/hide category dividers
      document.querySelectorAll('.projects-category-divider').forEach(divider => {
        const cat = divider.dataset.category;
        divider.style.display = (cat === filter) ? '' : 'none';
      });

      // Notifier les observers d'intersection
      window.dispatchEvent(new Event('scroll'));
    });
  });
}

/* ══════════════════════════════════════════════════════════════════
   17. DESIGN EXPAND BUTTONS (Délégué à initProofsLightbox)
   ══════════════════════════════════════════════════════════════════ */
function initDesignExpandBtns() {
  // Pris en charge de manière universelle par l'écouteur d'événements [data-gallery]
  // dans initProofsLightbox(), pour un comportement uniforme sur tous les projets.
}
