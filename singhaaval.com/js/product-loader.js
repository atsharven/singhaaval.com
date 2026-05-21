// Product Loader - Dynamically loads and renders products from JSON
// This works with the products/ folder structure

let productsCache = null;

// Load all products from manifest
async function loadProducts() {
  try {
    if (productsCache) return productsCache;
    
    // Fetch the manifest
    const res = await fetch('/products/products.json');
    if (!res.ok) throw new Error('Failed to load products manifest');
    
    const productList = await res.json();
    
    // Load each product's data and description
    const products = await Promise.all(
      productList.map(async (item) => {
        try {
          const dataRes = await fetch(item.dataFile);
          const data = await dataRes.json();
          
          const descRes = await fetch(data.descriptionFile);
          const description = await descRes.text();
          
          return { ...data, fullDescription: description };
        } catch (err) {
          console.error(`Failed to load product ${item.id}:`, err);
          return null;
        }
      })
    );
    
    // Filter out failed loads
    productsCache = products.filter(p => p !== null);
    return productsCache;
  } catch (err) {
    console.error('Error loading products:', err);
    return [];
  }
}

// Render all products in grid
function renderProductsGrid(products) {
  const grid = document.querySelector('.products-grid');
  if (!grid) return;
  
  const html = products.map(p => `
    <article class="product-card" data-id="${p.id}" data-category="${p.category}" data-title="${p.title.replace(/"/g, '&quot;')}">
      <div class="product-image-container">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="product-tag">${getCategoryLabel(p.category)}</span>
        <span class="product-quick-view">View Details ↗</span>
      </div>
      <div class="product-details">
        <div class="product-meta-header">
          <h3 class="product-title">${p.title}</h3>
          <span class="product-hs">${p.hsCode}</span>
        </div>
        <p class="product-desc">${p.shortDesc}</p>
        <div class="product-actions">
          <a href="enquiry.html?product=${p.id}" class="btn btn-secondary">Request Quote</a>
        </div>
      </div>
    </article>
  `).join('');
  
  // Clear old products and add new ones
  grid.innerHTML = html;
  
  // Re-attach event listeners for detail panels
  initProductDetailPanel();
}

// Get display label for category
function getCategoryLabel(category) {
  const labels = {
    'bags': 'Bags & Pouches',
    'furnishings': 'Furnishings'
  };
  return labels[category] || category;
}

// Simple markdown to HTML converter (basic support)
function markdownToHTML(markdown) {
  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
    .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
    .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Lists
    .replace(/^\* (.*?)$/gm, '<li>$1</li>')
    .replace(/^\- (.*?)$/gm, '<li>$1</li>')
    .replace(/(<li>.*?<\/li>)/s, '<ul>$1</ul>')
    // Line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  
  return html;
}

// Initialize product detail panel (from scripts.js, adapted)
function initProductDetailPanel() {
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    card.addEventListener('click', async (e) => {
      // Ignore clicks on buttons
      if (e.target.closest('a.btn')) return;
      
      const productId = card.dataset.id;
      const products = await loadProducts();
      const product = products.find(p => p.id === productId);
      
      if (product) {
        openDetailPanel(product);
      }
    });
  });
}

// Open detail panel for product
function openDetailPanel(product) {
  // Remove existing panel if open
  const existing = document.querySelector('.product-detail-panel');
  if (existing) {
    existing.remove();
    return;
  }
  
  const descHTML = markdownToHTML(product.fullDescription);
  
  const panel = document.createElement('div');
  panel.className = 'product-detail-panel';
  panel.innerHTML = `
    <div class="detail-panel-inner">
      <button class="detail-panel-close">&times;</button>
      <div class="detail-panel-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="detail-panel-info">
        <span class="text-meta">Specification Sheet</span>
        <h2>${product.title}</h2>
        
        <div class="description-content">
          ${descHTML}
        </div>
        
        <div class="detail-spec-grid">
          <div class="detail-spec-item">
            <div class="detail-spec-label">HS Code</div>
            <div class="detail-spec-value">${product.hsCode}</div>
          </div>
          <div class="detail-spec-item">
            <div class="detail-spec-label">Material</div>
            <div class="detail-spec-value">${product.material}</div>
          </div>
          <div class="detail-spec-item">
            <div class="detail-spec-label">Dimensions</div>
            <div class="detail-spec-value">${product.dimensions}</div>
          </div>
          <div class="detail-spec-item">
            <div class="detail-spec-label">Export Packing</div>
            <div class="detail-spec-value">${product.packaging}</div>
          </div>
        </div>
        
        <div class="detail-panel-actions">
          <a href="enquiry.html?product=${product.id}" class="btn btn-primary">
            <span>Request Bulk Quote</span>
          </a>
          <a href="https://wa.me/918273664082?text=Hi, I'm interested in ${encodeURIComponent(product.title)}" 
             class="btn btn-outline" target="_blank">
            <i class="fa-brands fa-whatsapp"></i> WhatsApp
          </a>
        </div>
      </div>
    </div>
  `;
  
  document.querySelector('.products-grid').appendChild(panel);
  
  // Close button
  panel.querySelector('.detail-panel-close').addEventListener('click', () => {
    panel.remove();
  });
  
  // Slide in animation
  panel.style.animation = 'panelSlideIn 0.3s ease-out';
}

// Initialize on products page
async function initProductLoader() {
  const grid = document.querySelector('.products-grid');
  if (!grid) return; // Not on products page
  
  const products = await loadProducts();
  renderProductsGrid(products);
  
  // Filter functionality
  const filterTabs = document.querySelectorAll('.filter-tab');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      const filter = tab.dataset.filter;
      const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter || (filter === 'furnishings' && p.category === 'furnishings'));
      
      renderProductsGrid(filtered);
    });
  });
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductLoader);
} else {
  initProductLoader();
}
