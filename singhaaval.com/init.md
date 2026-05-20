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
- `--space-sm: 1rem`, `--space-md: 1.5rem`, `--space-lg: 2rem`, `--space-xl: 3rem`, `--space-xxl: 4.5rem`
- Applied consistently across sections, cards, buttons

---

## ✨ PHASE 1 Improvements - COMPLETED ✅

### Visual Excellence & Engagement Enhancements
✅ **Hero Section**
- Parallax effect with GPU acceleration (translate3d)
- Responsive 85vh layout with image overlay gradient
- Compelling headline: "Lions bow. Heritage lives."
- Dual CTAs (View Catalog + Bulk Enquiry)

✅ **Social Proof & Stats**
- Social proof bar with 3 key metrics (15+ countries, 120+ families, 100% sustainable)
- Positioned below hero for immediate credibility

✅ **Product Photography & Cards**
- Hover zoom effect (1.06x scale)
- Quick view overlay ("View Details ↗")
- Product tags for category identification
- Lazy loading on all product images

✅ **Micro-interactions & Animations**
- Scroll-triggered reveals (IntersectionObserver) for sections
- Staggered animation delays (0.12s, 0.24s, 0.36s)
- Button hover effects with scaleX animation
- Card elevation on hover (translateY -4px)
- Smooth transitions throughout

✅ **Testimonials Carousel**
- Auto-rotating testimonials (5s interval)
- Manual dot navigation
- Fade-in/fade-out transitions
- 3 global partner reviews from real markets

✅ **Product Detail Panel**
- Inline expandable detail panel (replaces modal)
- Full product specs: HS code, fabric, dimensions, packaging
- Grid layout with 2-column spec grid
- WhatsApp integration in detail panel
- Smooth panel slide-in animation
- Escape key to close

✅ **Call-to-Action Section**
- Dark background CTA with radial pattern
- Dual buttons (primary + secondary)
- Positioned strategically before footer

✅ **Floating WhatsApp Button**
- Fixed action button (FAB) bottom-right
- Green WhatsApp gradient
- Bounce animation
- Tooltip on hover ("Message us on WhatsApp")
- Auto-hides on mobile when menu is open
- Links to pre-filled message

### SEO & Metadata Enhancements
✅ **Schema.org Markup**
- Organization schema on all pages
- Product schema with images on catalog
- LocalBusiness address data
- Structured data for better search visibility

### Mobile & Responsive UX
✅ **Mobile Menu**
- Fullscreen overlay menu
- Touch-friendly tap targets
- Smooth open/close animations
- Close button + click-to-close on links

✅ **Responsive Breakpoints**
- Desktop: 1440px+ (full grid layouts)
- Tablet: 1024px (2-column grids)
- Mobile: 768px (single column, optimized spacing)
- Product detail panel responsive (1 column on mobile)

✅ **Performance Optimizations**
- Lazy loading on images (`loading="lazy"`)
- CSS variables for maintainability
- Optimized CSS selectors
- Passive event listeners for scroll
- RequestAnimationFrame for smooth animations
- GPU acceleration (will-change, transform)

---

## 🚀 Improvement Roadmap - Future Phases

### Phase 2: Advanced User Experience (Planned)
- [ ] Advanced product filters (price, material, artisan)
- [ ] Full-text search functionality
- [ ] Save favorites (localStorage)
- [ ] Multi-step enquiry form with progress indicator
- [ ] Real-time form validation with inline feedback
- [ ] Success page & email confirmation

### Phase 3: Analytics & Optimization (Planned)
- [ ] Google Analytics 4 implementation
- [ ] Conversion tracking setup
- [ ] Heatmap integration (Hotjar)
- [ ] Email marketing integration
- [ ] Newsletter signup with Mailchimp/similar

### Phase 4: Advanced Features (Optional)
- [ ] CMS Integration (Contentful/Strapi)
- [ ] Inventory system with stock levels
- [ ] Multi-language support (English + Hindi)
- [ ] PWA capabilities for offline browsing
- [ ] Video hero section (artisan at work)
- [ ] 360° product view / multiple angles

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

## 🏃 Running the Frontend Locally

### Option 1: VS Code Live Server (Recommended)
1. Install **Live Server** extension (ritwickdey.LiveServer)
2. Right-click any `.html` file → **"Open with Live Server"**
3. Browser opens at `http://localhost:5500`
4. Changes auto-reload (hot reload enabled)
5. Stop server: Click "Live Server" status bar button

### Option 2: Python HTTP Server
```bash
# Navigate to project folder
cd c:\Code\singhaaval.com

# Python 3
python -m http.server 8000

# Open browser at http://localhost:8000
```

### Option 3: Node.js http-server
```bash
# Install globally (one-time)
npm install -g http-server

# Run from project folder
http-server

# Open browser at http://localhost:8080
```

### Option 4: Docker (Optional)
```bash
# Create a simple Dockerfile in project root
docker run -p 8000:80 -v $(pwd):/usr/share/nginx/html nginx:alpine

# Access at http://localhost:8000
```

### No Build Step Required
This is a **static site** (vanilla HTML, CSS, JS - no compilation needed):
- ✅ No npm install required
- ✅ No build command needed
- ✅ No bundler (Webpack, Vite, etc.)
- ✅ Works directly in browser

---

## 📝 Development Workflow

### Local Development
1. Choose a local server option above (Live Server recommended)
2. Edit HTML/CSS/JS files
3. Changes appear instantly in browser (Live Server auto-reloads)
4. Test on mobile using local IP: `http://YOUR_IP:5500`

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

### Testing During Development

#### 1. Browser DevTools Testing
- **Chrome/Edge**: Press `F12` → Inspect elements
- **Firefox**: Press `F12` → Inspector
- **Safari**: Develop menu → Show Web Inspector
- Use **Responsive Design Mode** (Ctrl+Shift+M) to test mobile sizes

#### 2. Device-Specific Testing
```bash
# Find your local IP address
ipconfig getifaddr en0  # macOS/Linux
ipconfig              # Windows (look for IPv4 Address)

# Access from mobile/tablet on same network
# Replace XXX.XXX.X.X with your IP
http://XXX.XXX.X.X:5500
```

#### 3. Viewport Sizes to Test
- 📱 Mobile: 375px, 425px
- 📱 Tablet: 768px, 1024px
- 🖥️ Desktop: 1440px, 1920px
- Use browser DevTools to simulate

#### 4. Cross-Browser Testing
Test on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (macOS/iOS)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

#### 5. Performance Testing
```
# Use Chrome DevTools > Lighthouse
# Target scores:
- Performance: 85+
- Accessibility: 90+
- Best Practices: 85+
- SEO: 90+

# Or use:
https://pagespeed.web.dev/  (Google PageSpeed Insights)
https://gtmetrix.com/       (GTmetrix)
```

### Debugging Tips

#### Common Issues & Fixes
| Issue | Solution |
|-------|----------|
| Images not loading | Check image path (relative vs absolute) |
| CSS not applying | Clear browser cache (Ctrl+Shift+Delete) |
| JS errors | Open Console (F12 → Console tab) |
| Mobile menu stuck | Ensure overflow hidden on body |
| Links not working | Check HTML file paths |
| Slow page load | Compress images, check file sizes |

#### Browser Console Debugging
```javascript
// View all console errors/warnings
// F12 → Console tab

// Common errors to watch for:
// - 404 on image/CSS/JS files
// - CORS errors
// - JavaScript exceptions
```

---

## 🔧 File Structure & Editing

### Where to Make Changes

| Want to Change | Edit File | Location |
|---|---|---|
| **Page content/text** | `.html` files | Any page |
| **Colors/Fonts/Spacing** | `styles.css` | `:root { }` variables |
| **Button/Card styles** | `styles.css` | Component section |
| **Navigation behavior** | `scripts.js` | Mobile menu functions |
| **Form handling** | `scripts.js` + `.html` | Form sections |
| **Product images** | `products.html` | `<img src="images/...">` |

### CSS Architecture (3-Layer System)
```css
/* 1. VARIABLES (top of styles.css) */
:root {
  --color-primary: #value;
  --spacing: 1rem;
}

/* 2. BASE STYLES */
* { box-sizing: border-box; }
body { font-family: ...; }

/* 3. COMPONENTS & LAYOUTS */
.header { }
.product-card { }
.section { }
```

### Adding New Components

Example: Adding a new product card style
```html
<!-- 1. Add in HTML -->
<article class="product-card">
  <img src="image.jpg">
  <h3>Product Name</h3>
</article>
```

```css
/* 2. Add styling in styles.css */
.product-card {
  border: 1px solid var(--border-light);
  padding: var(--space-md);
  transition: all var(--duration-normal);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
}
```

```javascript
// 3. Add interactivity in scripts.js (if needed)
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    console.log('Product clicked');
  });
});
```

---

## 🎨 Editing Content Safely

### Safe Changes (Low Risk)
- ✅ Update text content
- ✅ Change hex color values
- ✅ Modify spacing variables
- ✅ Update image sources

### Careful Changes (Test Before Deploy)
- ⚠️ Modifying HTML structure
- ⚠️ Changing CSS grid/flex layouts
- ⚠️ Adding new JavaScript functions
- ⚠️ Form validation logic

### Testing After Changes
1. Save file
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check desktop view (1440px+)
4. Check tablet view (768px)
5. Check mobile view (375px)
6. Check other browsers if CSS-heavy changes
7. Test form submissions
8. Check links

---

## 📦 File Sizes & Performance

### Current Optimization Status
```
index.html        ~15 KB (with metadata)
styles.css        ~25 KB (compressed: ~8 KB)
scripts.js        ~8 KB (compressed: ~3 KB)
images/          ~2-5 MB (needs optimization)
```

### Optimization Tasks
- [ ] Compress product images (use TinyPNG)
- [ ] Convert JPG → WebP format (50% smaller)
- [ ] Minify CSS/JS for production
- [ ] Enable GZIP compression on server
- [ ] Lazy load below-fold images

---

## 🌐 Testing on Production (Vercel)

### Preview Deployments
1. Every GitHub push to a branch creates a **preview URL**
2. Vercel sends comment on PR with preview link
3. Test before merging to `main`
4. Share preview with team for feedback

### Staging vs Production
```
Staging (Preview)    → https://singhaaval-git-feature.vercel.app
Production          → https://singhaaval.com
```

### Deployment Checklist
- [ ] All tests pass locally
- [ ] Mobile view looks good
- [ ] Forms submit correctly
- [ ] Images load (check Chrome > Network tab)
- [ ] No console errors (F12 > Console)
- [ ] Lighthouse score 85+
- [ ] Test in multiple browsers
- [ ] Test WhatsApp links
- [ ] Test all navigation links

### Quick Production Debugging
1. Go to **Vercel Dashboard → Project → Deployments**
2. Click deployment → View logs
3. Check **Network** tab (browser DevTools) for failed requests
4. Check **Console** tab for JS errors

---

## 📚 Quick Reference Guide

### Essential Keyboard Shortcuts
```
F12                 Open Browser DevTools
Ctrl+Shift+M        Open Responsive Design Mode
Ctrl+Shift+Delete   Clear Browser Cache
Ctrl+Shift+R        Hard Refresh (bypass cache)
Ctrl+/              Comment/Uncomment Code
```

### Common Terminal Commands

```bash
# Check git status
git status

# View branches
git branch -a

# Switch branches
git checkout branch-name

# Pull latest changes
git pull origin main

# View commit history
git log --oneline

# Undo last commit (careful!)
git reset --soft HEAD~1
```

### File Naming Conventions
```
✅ Good:    about.html, product-card.css, init-menu.js
❌ Bad:     About.html, productCard.css, initMenu.js

✅ Images:  product-01.jpg, hero-banner.jpg, artisan-hands.jpg
❌ Images:  productImage1.JPG, bg.png, temp.jpg
```

---

## 🚀 Workflow: From Idea to Live

### 1. Plan the Change
- What are you changing?
- Why (better UX, performance, SEO)?
- Which files are affected?

### 2. Create Branch
```bash
git checkout -b feature/your-feature-name
```

### 3. Make Changes
- Edit file locally
- Test in browser with Live Server
- Check desktop + mobile
- Verify across browsers

### 4. Commit Changes
```bash
git add .
git commit -m "feat: Description of change"
```

### 5. Push to GitHub
```bash
git push origin feature/your-feature-name
```

### 6. Create Pull Request
- Go to GitHub repository
- Click "Compare & pull request"
- Add description
- Request review (if team)

### 7. Test Preview (Vercel)
- Vercel auto-deploys preview URL
- Test thoroughly
- Share with team if needed

### 8. Merge & Deploy
- Approve PR
- Merge to `main`
- Vercel auto-deploys to production
- Monitor logs

---

## 🆘 Troubleshooting

### Website Won't Load Locally
```bash
# 1. Check if port is in use
# 2. Try different port:
# Live Server: Click status bar > "Change Live Server Port"

# 3. Check firewall isn't blocking
# 4. Try different server option (Python, Node, etc.)
```

### Images Not Showing
```
Possible causes:
- Wrong file path (use relative paths: images/photo.jpg)
- Missing images folder
- Browser cache issue (Ctrl+Shift+Delete)
- CORS error (shouldn't happen locally)
- Typo in filename (case-sensitive on Linux/Mac)
```

### CSS Not Updating
```
Solutions:
1. Hard refresh browser: Ctrl+Shift+R (not just Ctrl+R)
2. Close and reopen live server
3. Check CSS file is linked in HTML: <link rel="stylesheet" href="css/styles.css">
4. Verify CSS selector matches element
5. Check for conflicting styles (browser DevTools > Inspect)
```

### JavaScript Errors
```
Debug using:
1. F12 → Console tab (red errors show here)
2. F12 → Sources tab (add breakpoints, step through code)
3. Check Network tab for failed API calls
4. Verify script is linked: <script src="js/scripts.js"></script>
```

### Form Not Submitting
```
Check:
- Form has action attribute (or JS handler)
- Input names are defined
- No JavaScript errors (F12 > Console)
- Server endpoint is accessible
- Network tab shows request being sent
```

---

## 📋 Before You Deploy to Vercel

### Pre-Deployment Checklist
```
FUNCTIONALITY
☐ All links working (test every link)
☐ Forms submit without errors
☐ Mobile menu opens/closes smoothly
☐ Images load on all pages
☐ No 404 errors in Network tab

CONTENT
☐ Spelling & grammar checked
☐ Contact info up-to-date
☐ Product descriptions accurate
☐ Social media links valid

PERFORMANCE
☐ Images compressed (< 100KB each)
☐ Page load < 2 seconds
☐ Lighthouse Performance > 85
☐ No console errors (F12 > Console)

RESPONSIVE DESIGN
☐ Mobile (375px) - readable, tap-friendly buttons
☐ Tablet (768px) - proper grid layout
☐ Desktop (1440px) - optimal spacing
☐ No horizontal scroll

CROSS-BROWSER
☐ Chrome - tested
☐ Firefox - tested
☐ Safari - tested (if macOS available)
☐ Mobile browsers - tested
```

---

## 🎓 Learning Resources

### When Stuck, Reference These

**CSS Help**
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/CSS
- CSS-Tricks: https://css-tricks.com

**JavaScript Help**
- MDN JavaScript Guide: https://developer.mozilla.org/en-US/docs/Web/JavaScript
- JavaScript.info: https://javascript.info

**Design Principles**
- Frontend Design Skill (in project): See [init.md](init.md#design-decisions-frontend-design-skill)

**Vercel Docs**
- https://vercel.com/docs

**Git Help**
- GitHub Guides: https://guides.github.com
- Git Documentation: https://git-scm.com/doc

---

## 📞 Support & Questions

If something breaks:
1. Check browser console (F12 > Console)
2. Review recent changes (git log)
3. Revert to previous version if needed: `git revert HEAD`
4. Compare with GitHub main branch
5. Post on GitHub Issues or ask for help

---

## ✅ Design Decisions (Frontend-Design Skill)
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
