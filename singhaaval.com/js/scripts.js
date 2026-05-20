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