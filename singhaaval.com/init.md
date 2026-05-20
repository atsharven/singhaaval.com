# SinghAaval Heritage - Project Initialization & Development Guide

## 📋 Project Overview

**Business:** Artisanal textile exports from Ajmer, Rajasthan  
**Products:** Hand-embroidered bags (Banjara, Jhola), wall hangings, patchwork tapestries  
**Target Audience:** B2B buyers (retailers, exporters, boutiques globally)  
**Core Values:** Fair trade, quality assurance, ethical practices, heritage preservation  

### Product Story
- Origins: Singhawal village near Maa Annapurna temple in Aravalli range
- Craftsmanship: Hand block-printing on unbleached cotton + hand-embroidery
- Supply Chain: Direct from Ajmer artisans, quality checked, export-ready
- Differentiation: Each piece is unique (variations are fingerprints of artistry, not defects)

---

## 🏗️ Code Structure

```
singhaaval.com/
├── index.html              # Homepage (hero, hero text, CTA, featured products)
├── products.html           # Product catalog with filtering
├── about.html              # Brand story, craftsmanship, values
├── enquiry.html            # Contact form for bulk orders
├── contact.html            # Contact info & map (optional)
├── css/
│   └── styles.css          # Global styles, typography, layout, components
├── js/
│   └── scripts.js          # Navigation, mobile menu, interactions, forms
├── images/                 # Product images, hero images, logos
│   ├── product-*.jpg       # Product photography (high quality)
│   ├── hero-*.jpg          # Hero section images
│   ├── artisan-*.jpg       # Behind-the-scenes, process images
│   └── 27948d4a...jpg      # Logo
└── init.md                 # This file - project documentation

```

### File Roles

| File | Purpose |
|------|---------|
| **index.html** | Hero banner with compelling value proposition, featured products, social proof |
| **products.html** | Full catalog with category filters, product cards with images & CTAs |
| **about.html** | Brand narrative (legend, craftsmanship, values, export promise) |
| **enquiry.html** | Lead capture form with product pre-selection via query params |
| **contact.html** | Contact details, location, WhatsApp, map integration |
| **styles.css** | Consistent design system: colors, typography, spacing, animations |
| **scripts.js** | Vanilla JS for interactions (no frameworks yet) |

---

## 🎨 Current Design System

### Design Philosophy
**Warm Gallery Minimalism** - Luxury serif display with refined sans-serif body, warm earthy palette, museum-like sophistication

### Colors
```css
--bg-primary: #FAF8F5        /* Warm off-white */
--accent: #B25329            /* Terracotta clay */
--accent-hover: #98431E      /* Darker clay */
--text-primary: #1F1A17      /* Deep charcoal */
--text-secondary: #6A5D54    /* Warm gray */
--border-light: #E7DFD5      /* Soft sand */
```

### Typography
- **Display:** Cormorant Garamond (serif) - elegant, heritage-appropriate
- **Body:** Plus Jakarta Sans (sans-serif) - readable, modern
- **Weight Hierarchy:** 300 (light) → 400 (regular) → 600 (bold) → 700 (heavy)

### Spacing System
- `--space-sm: 1rem`, `--space-md: 1.5rem`, `--space-lg: 2.5rem`, `--space-xl: 4rem`, `--space-xxl: 7rem`
- Applied consistently across sections, cards, buttons

---

## 🚀 Improvement Roadmap - "Way Way Better"

### Phase 1: Visual Excellence & Engagement
- [ ] **Hero Section Enhancement**
  - Add scroll-triggered animations (fade-in, slide-up)
  - Implement parallax effect on hero background image
  - Add video hero (artisan at work) with autoplay muted
  - Compelling copywriting with USPs (Heritage + Fair Trade + Quality)

- [ ] **Product Photography**
  - Add 360° product view or multiple angles per product
  - Implement lazy loading for images
  - Add hover zoom/spin effects
  - Create lifestyle photography (products in use)

- [ ] **Micro-interactions & Animations**
  - Scroll-triggered reveals for product cards (staggered animation-delay)
  - Hover states: shadow lift, color shifts, scale effects
  - Page transitions (fade/slide between pages)
  - Loading animations for dynamic content

- [ ] **Typography & Readability**
  - Improve heading hierarchy with size variations
  - Add decorative elements (custom dividers, borders)
  - Refine line-height and letter-spacing for elegance
  - Add text-shadow/depth effects where appropriate

### Phase 2: User Experience & Conversion
- [ ] **Improved Forms**
  - Multi-step enquiry form (product selection → details → contact)
  - Real-time form validation with helpful error messages
  - Auto-populate product name from URL params
  - Success page / email confirmation

- [ ] **Product Filtering & Search**
  - Advanced filters (by price range, material, artisan)
  - Full-text search across product descriptions
  - Sort by: featured, newest, bestseller, price
  - Save favorites (localStorage)

- [ ] **Social Proof & Trust**
  - Add testimonials section with buyer reviews
  - Display export statistics (countries shipped to, units sold)
  - Certifications/badges (Fair Trade, Ethical, etc.)
  - Latest Instagram feed integration

- [ ] **Call-to-Action Optimization**
  - Add sticky CTA buttons (mobile)
  - Floating WhatsApp button for instant enquiries
  - Email newsletter signup (convert visitors)
  - Referral/ambassador program CTA

### Phase 3: Technical & SEO
- [ ] **Performance Optimization**
  - Image compression & WebP format
  - CSS/JS minification
  - Lazy loading for below-fold content
  - Implement service worker for offline access
  - Target: Lighthouse score 90+

- [ ] **SEO & Metadata**
  - Schema.org markup (Product, LocalBusiness, Organization)
  - Open Graph tags for social sharing
  - Dynamic meta descriptions per page
  - Sitemap.xml & robots.txt
  - Hreflang tags if targeting multiple regions

- [ ] **Analytics & Tracking**
  - Google Analytics 4 integration
  - Conversion tracking (form submissions, product views)
  - Heat mapping (Hotjar/similar)
  - Email analytics

- [ ] **Accessibility**
  - WCAG 2.1 AA compliance
  - Keyboard navigation (Tab, Enter, Escape)
  - Screen reader optimization (ARIA labels)
  - Color contrast improvements
  - Alt text on all images

### Phase 4: Advanced Features
- [ ] **CMS Integration** (Optional - Contentful/Strapi)
  - Easy product management without code
  - Blog for craft stories & updates
  - Dynamic content updates

- [ ] **Inventory System**
  - Product stock levels
  - Availability status per item
  - Bulk pricing tiers

- [ ] **Multi-language Support**
  - English + Hindi
  - Geolocation-based language selection

- [ ] **Mobile App Readiness**
  - Progressive Web App (PWA) capabilities
  - App-like feel on mobile
  - Offline browsing

---

## 🔧 Deployment Instructions

### Understanding Domain vs. Website
- **Domain** = your URL (e.g., `singhaaval.com`) - purchased from Hostinger
- **Website** = the actual code/content deployed somewhere (Vercel)
- **Solution** = Point your Hostinger domain to Vercel via DNS nameservers

### Step 1: Deploy to Vercel
1. Push code to GitHub repository
2. Connect GitHub to Vercel (vercel.com)
3. Import repository and deploy
4. Vercel provides a `.vercel.app` domain automatically

### Step 2: Connect Hostinger Domain to Vercel
1. Go to **Vercel → Project Settings → Domains**
2. Add your custom domain: `singhaaval.com`
3. Vercel will show nameserver records:
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ```
4. Go to **Hostinger Control Panel → Domain Management**
5. Update nameservers to Vercel's nameservers
6. Wait 24-48 hours for DNS propagation
7. Verify domain in Vercel (should show "Valid Configuration")

### Step 3: SSL Certificate (Automatic)
- Vercel automatically provisions free SSL/TLS certificate
- Your site is secure (https://singhaaval.com)

### Environment Variables (if needed)
```
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=GA-XXXXXXX
```

---

## 📝 Development Workflow

### Local Setup
```bash
# No build step needed for vanilla JS + HTML + CSS
# Simply open in browser or use live server
# VS Code Live Server Extension recommended
```

### Git Workflow
```bash
# Create feature branches
git checkout -b feature/hero-animation
git checkout -b feature/product-filter-ui

# Commit with clear messages
git commit -m "feat: Add parallax effect to hero section"

# Push to GitHub
git push origin feature/hero-animation
```

### Design Decisions (Frontend-Design Skill)
When implementing improvements, follow these principles:

1. **Bold Aesthetic Direction** - Commit to a clear visual language
   - Currently: Gallery minimalism (elegant, refined)
   - Keep warm earthy palette, serif-driven hierarchy
   - Avoid generic AI aesthetics

2. **Typography is Key**
   - Cormorant Garamond is excellent for luxury heritage brand
   - Vary sizes dramatically (clamp() for responsiveness)
   - Use font-weight strategically (400 vs 600)

3. **Motion with Purpose**
   - Scroll-triggered reveals (staggered animation-delay)
   - Hover states that feel natural
   - Avoid gratuitous animations

4. **Spatial Composition**
   - Generous whitespace (befits luxury brand)
   - Asymmetrical layouts
   - Product images as focal points (not crowded)

5. **Details Matter**
   - Custom cursors
   - Subtle gradients on CTAs
   - Decorative borders/dividers
   - Image filters (sepia, contrast) for cohesion

---

## 📊 Key Metrics to Track

- Page load time (Target: < 2s)
- Conversion rate: Visitor → Form submission
- Bounce rate by page
- Time on product page
- Mobile vs desktop traffic
- Top traffic sources (organic, direct, referral)
- Form submission success rate
- WhatsApp message conversion

---

## 🎯 Content Guidelines

### Product Descriptions
- Lead with benefits (B2B buyer perspective)
- Highlight craftsmanship, materials, origin
- Include HS code for export clarity
- Link to enquiry form with product pre-selected

### About Page
- Tell the heritage story (legend of lions)
- Show artisan faces & hands
- Explain fair trade practices
- Build emotional connection

### Hero Copy
- Lead with value proposition: "Premium Handcrafted Heritage Textiles"
- Sub-headline: "Fair-trade block prints & embroidery direct from Ajmer"
- CTA: "Request Bulk Quote" or "Explore Collection"

---

## 🛠️ Useful Tools & Libraries

- **Image Optimization**: TinyPNG, ImageOptim
- **Animations**: Scroll Reveal, AOS (Animate On Scroll)
- **Icons**: FontAwesome (already used)
- **Forms**: Formspree, Basin (serverless form handling)
- **Analytics**: Google Analytics 4, Hotjar
- **Performance**: Google PageSpeed Insights, GTmetrix
- **Accessibility**: WAVE, Lighthouse, axe DevTools

---

## 📞 Contact & Branding

**WhatsApp:** +918273664082  
**Email:** [inquiries@singhaaval.com]  
**Instagram:** [@singhaaval]  
**Location:** Singhawal Village, Ajmer, Rajasthan, India  

---

## ✅ Checklist Before Production Launch

- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Images optimized & lazy-loaded
- [ ] Forms functional (test submissions)
- [ ] Links working (no 404s)
- [ ] Analytics tracking implemented
- [ ] Social meta tags configured
- [ ] Favicon displays correctly
- [ ] Contact methods verified (WhatsApp, email)
- [ ] Lighthouse score 85+
- [ ] Mobile test on real devices
- [ ] Browser compatibility (Chrome, Firefox, Safari, Edge)
- [ ] SSL certificate active
- [ ] Sitemap.xml created
- [ ] robots.txt configured
- [ ] 404 page created (for broken links)

---

## 🚢 Next Steps

1. **Review** this init.md with team
2. **Choose** Phase 1 improvements based on priority
3. **Create** GitHub repository
4. **Implement** visual enhancements
5. **Test** thoroughly on mobile
6. **Deploy** to Vercel
7. **Configure** Hostinger domain DNS
8. **Monitor** analytics & optimize based on user behavior

---

**Last Updated:** May 2026  
**Project Owner:** SinghAaval Heritage  
**Repository:** singhaaval.com
