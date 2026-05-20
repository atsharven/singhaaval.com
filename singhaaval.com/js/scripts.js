/**
 * SinghAaval Heritage - Core Interactions
 * DRY-compliant, modular vanilla JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initProductFilter();
  initEnquiryPreFill();
  initSmoothScroll();
  initHeroParallax();
  initTestimonials();
  initProductDetailPanel();
  initWhatsAppFAB();
});

/* ─────────────────────────────────────────────
   1. Sticky & Collapsing Header
   ───────────────────────────────────────────── */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    header.classList.toggle('header-scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ─────────────────────────────────────────────
   2. Mobile Fullscreen Menu Toggle
   ───────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  const setBodyScroll = (lock) => {
    document.body.style.overflow = lock ? 'hidden' : '';
  };

  const openMenu = () => { menu.classList.add('open'); setBodyScroll(true); };
  const closeMenu = () => { menu.classList.remove('open'); setBodyScroll(false); };

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
}

/* ─────────────────────────────────────────────
   3. IntersectionObserver Reveal Animations
   ───────────────────────────────────────────── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────────
   4. Product Category Filters
   ───────────────────────────────────────────── */
function initProductFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.product-card');

  if (!tabs.length || !cards.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Close any open detail panel first
      closeActiveDetailPanel();

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        if (match) {
          card.style.display = '';
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => { card.style.display = 'none'; }, 280);
        }
      });
    });
  });
}

/* ─────────────────────────────────────────────
   5. Enquiry Prefill from URL params
   ───────────────────────────────────────────── */
function initEnquiryPreFill() {
  const select = document.getElementById('enquiry-product');
  if (!select) return;

  const product = new URLSearchParams(window.location.search).get('product');
  if (!product) return;

  for (const opt of select.options) {
    if (opt.value.toLowerCase() === product.toLowerCase()) {
      select.value = opt.value;
      break;
    }
  }
}

/* ─────────────────────────────────────────────
   6. Smooth Scroll for anchor links
   ───────────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ─────────────────────────────────────────────
   7. GPU-Accelerated Hero Parallax
   ───────────────────────────────────────────── */
function initHeroParallax() {
  const img = document.querySelector('.hero-image-wrap img');
  if (!img) return;

  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    if (y <= window.innerHeight) {
      img.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(${1 + y * 0.0003})`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   8. Testimonials Carousel
   ───────────────────────────────────────────── */
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  if (!slides.length) return;

  let active = 0;
  let timer;

  const show = (i) => {
    slides.forEach((s, idx) => {
      s.classList.toggle('active', idx === i);
      if (dots[idx]) dots[idx].classList.toggle('active', idx === i);
    });
    active = i;
  };

  const next = () => show((active + 1) % slides.length);
  const start = () => { timer = setInterval(next, 5000); };
  const stop = () => clearInterval(timer);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { stop(); show(i); start(); });
  });

  show(0);
  start();
}

/* ─────────────────────────────────────────────
   9. Inline Product Detail Panel
   Replaces the old modal. Clicking a product card
   expands a full-width spec panel directly below
   it inside the grid. The user stays on the page
   with focus on that single product.
   ───────────────────────────────────────────── */

/** Currently open panel reference */
let currentPanel = null;
let currentActiveCard = null;

function closeActiveDetailPanel(callback) {
  if (!currentPanel) { if (callback) callback(); return; }

  currentPanel.classList.add('closing');
  if (currentActiveCard) currentActiveCard.style.outline = '';
  const panel = currentPanel;

  panel.addEventListener('animationend', () => {
    panel.remove();
    if (callback) callback();
  }, { once: true });

  currentPanel = null;
  currentActiveCard = null;
}

function initProductDetailPanel() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;

  // Delegate click on entire grid
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.product-card');
    if (!card) return;

    // Don't intercept clicks on "Request Quote" links
    if (e.target.closest('.product-actions a')) return;

    // If clicking the already open card, just close
    if (card === currentActiveCard) {
      closeActiveDetailPanel();
      return;
    }

    // Close any existing panel first, then open new
    closeActiveDetailPanel(() => openDetailPanel(card, grid));
  });

  // Escape key closes panel
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeActiveDetailPanel();
  });
}

function openDetailPanel(card, grid) {
  // Read data from card attributes
  const d = {
    title:     card.dataset.title     || card.querySelector('.product-title')?.textContent || 'Product',
    hs:        card.dataset.hs        || '',
    image:     card.dataset.image     || card.querySelector('.product-image-container img')?.src || '',
    material:  card.dataset.material  || 'Cotton Canvas',
    sizes:     card.dataset.sizes     || 'Various',
    packaging: card.dataset.packaging || 'Standard Carton',
    desc:      card.dataset.desc      || card.querySelector('.product-desc')?.textContent || '',
    query:     card.dataset.query     || '',
  };

  // Build panel HTML
  const panel = document.createElement('div');
  panel.className = 'product-detail-panel';
  panel.innerHTML = `
    <div class="detail-panel-inner" style="position:relative;">
      <button class="detail-panel-close" aria-label="Close">&times;</button>
      <div class="detail-panel-image">
        <img src="${d.image}" alt="${d.title}" loading="lazy">
      </div>
      <div class="detail-panel-info">
        <div>
          <span class="text-meta">Specification Sheet</span>
          <h2 style="margin-top: var(--space-xxs); margin-bottom: var(--space-xs);">${d.title}</h2>
          <p style="font-size: 0.9rem; line-height: 1.6;">${d.desc}</p>

          <div class="detail-spec-grid">
            <div class="detail-spec-item">
              <div class="detail-spec-label">HS Code</div>
              <div class="detail-spec-value">${d.hs}</div>
            </div>
            <div class="detail-spec-item">
              <div class="detail-spec-label">Fabric</div>
              <div class="detail-spec-value">${d.material}</div>
            </div>
            <div class="detail-spec-item">
              <div class="detail-spec-label">Dimensions</div>
              <div class="detail-spec-value">${d.sizes}</div>
            </div>
            <div class="detail-spec-item">
              <div class="detail-spec-label">Export Packing</div>
              <div class="detail-spec-value">${d.packaging}</div>
            </div>
          </div>
        </div>

        <div class="detail-panel-actions">
          <a href="enquiry.html?product=${d.query}" class="btn btn-primary"><span>Request Bulk Quote</span></a>
          <a href="https://wa.me/918273664082?text=Hi, I'm interested in ${encodeURIComponent(d.title)}" class="btn btn-outline" target="_blank" rel="noopener">
            <i class="fa-brands fa-whatsapp" style="margin-right:6px"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;

  // Insert panel right after the clicked card
  card.insertAdjacentElement('afterend', panel);

  // Highlight active card
  card.style.outline = '2px solid var(--accent)';
  card.style.outlineOffset = '-2px';

  currentPanel = panel;
  currentActiveCard = card;

  // Smooth scroll panel into view
  requestAnimationFrame(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // Close button
  panel.querySelector('.detail-panel-close').addEventListener('click', (e) => {
    e.stopPropagation();
    closeActiveDetailPanel();
  });
}

/* ─────────────────────────────────────────────
   10. Floating WhatsApp Button (Fixed Action Button)
   Injected dynamically to all pages
   ───────────────────────────────────────────── */
function initWhatsAppFAB() {
  // Check if FAB already exists (prevent duplicates)
  if (document.querySelector('.whatsapp-fab')) return;

  const fab = document.createElement('a');
  fab.href = 'https://wa.me/918273664082?text=Hi, I\'m interested in learning more about your products and bulk export options.';
  fab.target = '_blank';
  fab.rel = 'noopener noreferrer';
  fab.className = 'whatsapp-fab';
  fab.setAttribute('data-tooltip', 'Message us on WhatsApp');
  fab.setAttribute('aria-label', 'Contact via WhatsApp');
  fab.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
  
  document.body.appendChild(fab);

  // Hide FAB on mobile to avoid overlap with mobile menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  if (mobileToggle) {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
      const observer = new MutationObserver(() => {
        fab.style.display = mobileMenu.classList.contains('open') ? 'none' : 'flex';
      });
      observer.observe(mobileMenu, { attributes: true });
    }
  }
}