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
  initProductModal();
});

/**
 * 1. Sticky & Collapsing Header
 * Modifies header height and blur on scroll to maintain premium aesthetic
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial state
}

/**
 * 2. Mobile Fullscreen Menu Toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu-close');

  if (!toggle || !menu) return;

  const openMenu = () => {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden'; // Stop page scrolling
  };

  const closeMenu = () => {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close menu when clicking navigation links
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

/**
 * 3. IntersectionObserver for Reveal Animations
 * Activates staggered animations when scrolling into view
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Run only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));
}

/**
 * 4. Product Category Filters (Product Catalog Page)
 * Leverages data attributes to cleanly show/hide products
 */
function initProductFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');

  if (filterTabs.length === 0 || products.length === 0) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Toggle active tab class
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterVal = tab.getAttribute('data-filter');

      products.forEach(product => {
        const productCat = product.getAttribute('data-category');
        
        if (filterVal === 'all' || productCat === filterVal) {
          product.style.display = '';
          // Re-trigger animation style
          setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
          }, 50);
        } else {
          product.style.opacity = '0';
          product.style.transform = 'translateY(15px)';
          // Delay display change to match fade transition
          setTimeout(() => {
            product.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/**
 * 5. Enquiry Prefill & Navigation Parameters
 * Auto-selects products on the Enquiry page if user clicked from a specific card
 */
function initEnquiryPreFill() {
  const productSelect = document.getElementById('enquiry-product');
  if (!productSelect) return;

  const urlParams = new URLSearchParams(window.location.search);
  const selectedProduct = urlParams.get('product');

  if (selectedProduct) {
    // Attempt to match and set value
    for (let option of productSelect.options) {
      if (option.value.toLowerCase() === selectedProduct.toLowerCase()) {
        productSelect.value = option.value;
        break;
      }
    }
  }
}

/**
 * 6. Smooth Scroll for internal links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
}

/**
 * 7. GPU-Accelerated Parallax Scroll Effect on Hero Background
 */
function initHeroParallax() {
  const heroImage = document.querySelector('.hero-image-wrap img');
  if (!heroImage) return;

  let ticking = false;

  const updateParallax = () => {
    const scrollY = window.scrollY;
    // Limit calculations to visible hero area
    if (scrollY <= window.innerHeight) {
      const scale = 1 + scrollY * 0.0004;
      const translateY = scrollY * 0.28;
      heroImage.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * 8. Editorial Testimonials Carousel Selector
 */
function initTestimonials() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  
  if (slides.length === 0) return;

  let activeIndex = 0;
  let intervalId;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
        if (dots[i]) dots[i].classList.add('active');
      } else {
        slide.classList.remove('active');
        if (dots[i]) dots[i].classList.remove('active');
      }
    });
    activeIndex = index;
  };

  const nextSlide = () => {
    const next = (activeIndex + 1) % slides.length;
    showSlide(next);
  };

  // Start rotation
  const startAutoplay = () => {
    intervalId = setInterval(nextSlide, 6000);
  };

  const stopAutoplay = () => {
    clearInterval(intervalId);
  };

  // Manual dot selectors
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      stopAutoplay();
      showSlide(index);
      startAutoplay();
    });
  });

  // Init
  showSlide(0);
  startAutoplay();
}

/**
 * 9. Product Quick View Modal Controller
 * Reads specifications from product data-attributes, injects into modal body, opens overlay.
 */
function initProductModal() {
  const overlay = document.getElementById('product-modal');
  const quickViews = document.querySelectorAll('.product-quick-view');
  
  if (!overlay || quickViews.length === 0) return;

  // Open Modal Handler
  quickViews.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.product-card');
      if (!card) return;

      // Extract specification details from card attributes
      const title = card.getAttribute('data-title') || 'Product Details';
      const hs = card.getAttribute('data-hs') || '';
      const imageSrc = card.getAttribute('data-image') || '';
      const material = card.getAttribute('data-material') || 'Cotton Canvas';
      const sizes = card.getAttribute('data-sizes') || 'Various Sizes';
      const packing = card.getAttribute('data-packaging') || 'Standard Carton';
      const desc = card.getAttribute('data-desc') || '';
      const queryParam = card.getAttribute('data-query') || '';

      // Construct Modal HTML Markup
      overlay.innerHTML = `
        <div class="modal-card">
          <div class="modal-close-btn" aria-label="Close Preview">&times;</div>
          <div class="modal-content-grid">
            <div class="modal-image-pane">
              <img src="${imageSrc}" alt="${title}">
            </div>
            <div class="modal-info-pane">
              <div>
                <span class="text-meta">Specification Sheet</span>
                <h2 style="font-size: 2rem; margin-top: var(--space-xxs); margin-bottom: var(--space-xs);">${title}</h2>
                <p style="font-size: 0.9rem; line-height: 1.5; margin-bottom: var(--space-sm);">${desc}</p>
                
                <ul class="modal-spec-list">
                  <li><span>HS Code Classification</span> <span>${hs}</span></li>
                  <li><span>Core Fabric Composition</span> <span>${material}</span></li>
                  <li><span>Standard Dimensions</span> <span>${sizes}</span></li>
                  <li><span>Export Packing Details</span> <span>${packing}</span></li>
                </ul>
              </div>
              <div style="margin-top: var(--space-md);">
                <a href="enquiry.html?product=${queryParam}" class="btn btn-primary" style="width: 100%;">Inquire About Product</a>
              </div>
            </div>
          </div>
        </div>
      `;

      // Show overlay
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Stop background scrolling

      // Setup close actions
      const closeBtn = overlay.querySelector('.modal-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', closeModal);
    });
  });

  const closeModal = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Close when clicking outside on backdrop overlay
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
    }
  });

  // Keyboard accessibility
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeModal();
    }
  });
}