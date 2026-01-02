/**
 * ZT Store - الوظائف الرئيسية
 * ============================
 * الوظائف العامة للموقع
 */

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initSearch();
    updateCartBadge();
    initScrollEffects();
    initSnowEffect();
    preventSelfLinkNavigation();
});

/**
 * تهيئة قائمة الموبايل
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
}

/**
 * تهيئة البحث
 */
function initSearch() {
    const searchForm = document.querySelector('.search-bar');
    const searchInput = searchForm?.querySelector('input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

/**
 * تهيئة تأثيرات التمرير
 */
function initScrollEffects() {
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // تأثير الظهور عند التمرير
    const fadeElements = document.querySelectorAll('.fade-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => observer.observe(el));
}

/**
 * إنشاء بطاقة منتج HTML
 * @param {object} product - بيانات المنتج
 * @returns {string} - HTML البطاقة
 */
function createProductCard(product) {
    const badge = product.badge ?
        `<span class="product-badge">${product.badge}</span>` : '';

    const oldPrice = product.oldPrice ?
        `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : '';

    return `
        <div class="product-card" data-product-id="${product.id}">
            ${badge}
            <div class="product-image">
                <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                <div class="product-actions">
                    <button class="product-action-btn" onclick="addToCart(${product.id})" title="إضافة للسلة">
                        🛒
                    </button>
                    <a href="product.html?id=${product.id}" class="product-action-btn" title="عرض التفاصيل">
                        👁
                    </a>
                </div>
            </div>
            <div class="product-info">
                <span class="product-category">${product.categoryName}</span>
                <a href="product.html?id=${product.id}" class="product-title">${product.name}</a>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${oldPrice}
                </div>
            </div>
        </div>
    `;
}

/**
 * إنشاء بطاقة تصنيف HTML
 * @param {object} category - بيانات التصنيف
 * @returns {string} - HTML البطاقة
 */
function createCategoryCard(category) {
    return `
        <a href="shop.html?category=${category.slug}" class="category-card">
            <div class="category-icon">${category.icon}</div>
            <h3>${category.name}</h3>
            <p>${category.count} منتج</p>
        </a>
    `;
}

/**
 * عرض المنتجات في الشبكة
 * @param {array} productsList - قائمة المنتجات
 * @param {string} containerId - معرف الحاوية
 */
function displayProducts(productsList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (productsList.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-cart-icon">📦</div>
                <h3>لا توجد منتجات متوفرة</h3>
                <p>لم يتم العثور على منتجات مطابقة</p>
            </div>
        `;
        return;
    }

    container.innerHTML = productsList.map(createProductCard).join('');
}

/**
 * عرض التصنيفات في الشبكة
 * @param {string} containerId - معرف الحاوية
 */
function displayCategories(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = categories.map(createCategoryCard).join('');
}

/**
 * الحصول على معلمات URL
 * @param {string} param - اسم المعلمة
 * @returns {string|null} - قيمة المعلمة
 */
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * تحديث URL بدون إعادة تحميل
 * @param {object} params - المعلمات الجديدة
 */
function updateUrlParams(params) {
    const url = new URL(window.location);
    Object.keys(params).forEach(key => {
        if (params[key] === null || params[key] === '') {
            url.searchParams.delete(key);
        } else {
            url.searchParams.set(key, params[key]);
        }
    });
    window.history.pushState({}, '', url);
}

/**
 * تأخير التنفيذ (debounce)
 * @param {function} func - الوظيفة
 * @param {number} wait - وقت الانتظار
 * @returns {function} - الوظيفة المؤجلة
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * تهيئة صفحة المتجر
 */
function initShopPage() {
    const category = getUrlParam('category');
    const subcategory = getUrlParam('subcategory');
    const search = getUrlParam('search');
    const sort = getUrlParam('sort') || 'default';

    let filteredProducts = [...products];
    let pageTitle = 'جميع المنتجات';

    // فلترة حسب التصنيف الفرعي
    if (subcategory) {
        filteredProducts = getProductsBySubcategory(subcategory);
        const subcat = getSubcategoryBySlug(subcategory);
        if (subcat) {
            pageTitle = subcat.name;
        }
        const subcategoryCheckbox = document.querySelector(`input[value="${subcategory}"]`);
        if (subcategoryCheckbox) subcategoryCheckbox.checked = true;
    }
    // فلترة حسب التصنيف الرئيسي
    else if (category) {
        filteredProducts = getProductsByCategory(category);
        const cat = getCategoryBySlug(category);
        if (cat) {
            pageTitle = cat.name;
        }
        const categoryCheckbox = document.querySelector(`input[value="${category}"]`);
        if (categoryCheckbox) categoryCheckbox.checked = true;
    }

    // تحديث شريط التصنيفات السريع (الجديد)
    document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
    if (category) {
        const activeTab = document.querySelector(`.category-tab[data-category="${category}"]`);
        if (activeTab) activeTab.classList.add('active');
        // تمرير الشريط ليظهر التبويب النشط
        if (activeTab) {
            activeTab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    } else {
        // "الكل" هو النشط افتراضياً
        const allTab = document.querySelector('.category-tab[data-category=""]');
        if (allTab) allTab.classList.add('active');
    }

    // فلترة حسب البحث
    if (search) {
        filteredProducts = searchProducts(search);
        pageTitle = `نتائج البحث: ${search}`;
        const searchInput = document.querySelector('.shop-search input');
        if (searchInput) searchInput.value = search;
    }

    // تحديث عنوان الصفحة
    const pageTitleEl = document.querySelector('.page-header h1');
    if (pageTitleEl && (category || subcategory || search)) {
        pageTitleEl.textContent = pageTitle;
    }

    // الترتيب
    const sortSelect = document.querySelector('#sort-select');
    if (sortSelect) {
        sortSelect.value = sort;
        filteredProducts = sortProducts(filteredProducts, sort);

        sortSelect.addEventListener('change', (e) => {
            updateUrlParams({ sort: e.target.value });
            initShopPage();
        });
    }

    // عرض المنتجات
    displayProducts(filteredProducts, 'products-grid');

    // تحديث عدد النتائج
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `${filteredProducts.length} منتج`;
    }

    // تهيئة الفلاتر
    initFilters();
}

/**
 * تهيئة الفلاتر
 */
function initFilters() {
    const categoryInputs = document.querySelectorAll('.filter-category input');
    const priceInputs = document.querySelectorAll('.price-range input');

    categoryInputs.forEach(input => {
        input.addEventListener('change', () => {
            const selectedCategory = document.querySelector('.filter-category input:checked')?.value || '';
            updateUrlParams({ category: selectedCategory });
            initShopPage();
        });
    });

    const applyPriceFilter = debounce(() => {
        const minPrice = parseInt(document.querySelector('#min-price')?.value) || 0;
        const maxPrice = parseInt(document.querySelector('#max-price')?.value) || Infinity;

        // تطبيق الفلتر
        let filteredProducts = [...products];
        const category = getUrlParam('category');
        if (category) {
            filteredProducts = getProductsByCategory(category);
        }

        filteredProducts = filterByPrice(minPrice * 1000, maxPrice * 1000, filteredProducts);
        displayProducts(filteredProducts, 'products-grid');
    }, 500);

    priceInputs.forEach(input => {
        input.addEventListener('input', applyPriceFilter);
    });
}

/**
 * تهيئة صفحة تفاصيل المنتج
 */
function initProductPage() {
    const productId = getUrlParam('id');
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    const product = getProductById(productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // تحديث عنوان الصفحة
    document.title = `${product.name} - ZT Store`;

    // تحديث breadcrumb
    const breadcrumbProduct = document.querySelector('.breadcrumb-product');
    if (breadcrumbProduct) {
        breadcrumbProduct.textContent = product.name;
    }

    // تحديث الصورة الرئيسية
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = product.images[0];
        mainImage.alt = product.name;
    }

    // تحديث الصور المصغرة
    const thumbnailList = document.querySelector('.thumbnail-list');
    if (thumbnailList) {
        thumbnailList.innerHTML = product.images.map((img, index) => `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage('${img}', this)">
                <img src="${img}" alt="${product.name}">
            </div>
        `).join('');
    }

    // تحديث معلومات المنتج
    const productTitle = document.querySelector('.product-info-detail h1');
    if (productTitle) productTitle.textContent = product.name;

    const rating = document.querySelector('.rating');
    if (rating) {
        rating.innerHTML = `
            ${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}
            <span>(${product.reviews} تقييم)</span>
        `;
    }

    const stockStatus = document.querySelector('.stock-status');
    if (stockStatus) {
        if (product.stock > 0) {
            stockStatus.textContent = `متوفر (${product.stock} قطعة)`;
            stockStatus.classList.remove('out-of-stock');
        } else {
            stockStatus.textContent = 'غير متوفر';
            stockStatus.classList.add('out-of-stock');
        }
    }

    const priceDetail = document.querySelector('.product-price-detail');
    if (priceDetail) {
        priceDetail.innerHTML = `
            <span class="current-price">${formatPrice(product.price)}</span>
            ${product.oldPrice ? `<span class="old-price">${formatPrice(product.oldPrice)}</span>` : ''}
        `;
    }

    const description = document.querySelector('.product-description');
    if (description) description.textContent = product.description;

    // تحديث المميزات
    const featuresList = document.querySelector('.product-features');
    if (featuresList && product.features) {
        featuresList.innerHTML = product.features.map(f => `<li>${f}</li>`).join('');
    }

    // تهيئة الكمية
    initQuantityControls(product);

    // زر إضافة للسلة
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const quantity = parseInt(document.querySelector('#quantity-input')?.value) || 1;
            addToCart(product.id, quantity);
        };
    }
}

/**
 * تغيير الصورة الرئيسية
 * @param {string} src - مسار الصورة
 * @param {HTMLElement} thumbnail - عنصر الصورة المصغرة
 */
function changeMainImage(src, thumbnail) {
    const mainImage = document.querySelector('.main-image img');
    if (mainImage) {
        mainImage.src = src;
    }

    // تحديث الـ active
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

/**
 * تهيئة أزرار تحكم الكمية
 * @param {object} product - المنتج
 */
function initQuantityControls(product) {
    const quantityInput = document.querySelector('#quantity-input');
    const decreaseBtn = document.querySelector('.quantity-decrease');
    const increaseBtn = document.querySelector('.quantity-increase');

    if (!quantityInput) return;

    quantityInput.value = 1;
    quantityInput.max = product.stock;

    decreaseBtn?.addEventListener('click', () => {
        let value = parseInt(quantityInput.value) - 1;
        if (value >= 1) quantityInput.value = value;
    });

    increaseBtn?.addEventListener('click', () => {
        let value = parseInt(quantityInput.value) + 1;
        if (value <= product.stock) quantityInput.value = value;
    });

    quantityInput.addEventListener('change', () => {
        let value = parseInt(quantityInput.value);
        if (value < 1) quantityInput.value = 1;
        if (value > product.stock) quantityInput.value = product.stock;
    });
}

/**
 * تهيئة صفحة السلة
 */
function initCartPage() {
    renderCart();
}

/**
 * عرض محتويات السلة
 */
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items-list');
    const cartSummary = document.querySelector('.cart-summary-content');
    const emptyCart = document.querySelector('.empty-cart');
    const cartContent = document.querySelector('.cart-content');

    const items = getCartDetails();
    const total = getCartTotal();

    if (items.length === 0) {
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        return;
    }

    if (emptyCart) emptyCart.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';

    // عرض العناصر
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = items.map(item => `
            <div class="cart-item" data-product-id="${item.productId}">
                <div class="cart-item-image">
                    <img src="${item.product.images[0]}" alt="${item.product.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.product.name}</h4>
                    <p>${item.product.categoryName}</p>
                </div>
                <div class="cart-item-quantity">
                    <div class="quantity-controls">
                        <button onclick="updateCartItem(${item.productId}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="${item.product.stock}" 
                               onchange="updateCartItem(${item.productId}, parseInt(this.value))">
                        <button onclick="updateCartItem(${item.productId}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-price">${formatPrice(item.subtotal)}</div>
                <button class="cart-item-remove" onclick="removeCartItem(${item.productId})">×</button>
            </div>
        `).join('');
    }

    // عرض الملخص
    if (cartSummary) {
        cartSummary.innerHTML = `
            <div class="summary-row">
                <span>المجموع الفرعي (${total.itemsCount} منتج)</span>
                <span>${formatPrice(total.subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>رسوم التوصيل</span>
                <span>${formatPrice(total.shipping)}</span>
            </div>
            <div class="summary-row total">
                <span>الإجمالي</span>
                <span>${formatPrice(total.total)}</span>
            </div>
        `;
    }
}

/**
 * تحديث عنصر في السلة
 * @param {number} productId - معرف المنتج
 * @param {number} quantity - الكمية الجديدة
 */
function updateCartItem(productId, quantity) {
    if (quantity < 1) {
        removeCartItem(productId);
        return;
    }
    updateCartQuantity(productId, quantity);
    renderCart();
}

/**
 * إزالة عنصر من السلة
 * @param {number} productId - معرف المنتج
 */
function removeCartItem(productId) {
    removeFromCart(productId);
    renderCart();
}

/**
 * تهيئة صفحة الدفع
 */
function initCheckoutPage() {
    const items = getCartDetails();

    if (items.length === 0) {
        window.location.href = 'cart.html';
        return;
    }

    // عرض ملخص الطلب
    renderOrderSummary();

    // تعبئة قائمة المحافظات
    populateProvinces();

    // تهيئة نموذج الدفع
    initCheckoutForm();
}

/**
 * عرض ملخص الطلب
 */
function renderOrderSummary() {
    const orderItems = document.querySelector('.order-items');
    const orderTotals = document.querySelector('.order-totals');

    const items = getCartDetails();
    const total = getCartTotal();

    if (orderItems) {
        orderItems.innerHTML = items.map(item => `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.product.images[0]}" alt="${item.product.name}">
                </div>
                <div class="order-item-details">
                    <h4>${item.product.name}</h4>
                    <p>الكمية: ${item.quantity}</p>
                </div>
                <div class="order-item-price">${formatPrice(item.subtotal)}</div>
            </div>
        `).join('');
    }

    if (orderTotals) {
        orderTotals.innerHTML = `
            <div class="summary-row">
                <span>المجموع الفرعي</span>
                <span>${formatPrice(total.subtotal)}</span>
            </div>
            <div class="summary-row">
                <span>رسوم التوصيل</span>
                <span>${formatPrice(total.shipping)}</span>
            </div>
            <div class="summary-row total">
                <span>الإجمالي</span>
                <span>${formatPrice(total.total)}</span>
            </div>
        `;
    }
}

/**
 * تعبئة قائمة المحافظات
 */
function populateProvinces() {
    const provinceSelect = document.querySelector('#province');
    if (provinceSelect) {
        provinceSelect.innerHTML = `
            <option value="">اختر المحافظة</option>
            ${provinces.map(p => `<option value="${p}">${p}</option>`).join('')}
        `;
    }
}

/**
 * تهيئة نموذج الدفع
 */
function initCheckoutForm() {
    const form = document.querySelector('#checkout-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: form.querySelector('#name')?.value,
                phone: form.querySelector('#phone')?.value,
                province: form.querySelector('#province')?.value,
                address: form.querySelector('#address')?.value,
                notes: form.querySelector('#notes')?.value || ''
            };

            const result = submitOrder(formData);

            if (result.success) {
                // عرض صفحة النجاح
                showOrderSuccess(result.orderId);
            } else {
                // عرض الأخطاء
                result.errors.forEach(error => showToast(error, 'error'));
            }
        });
    }
}

/**
 * عرض صفحة نجاح الطلب
 * @param {string} orderId - رقم الطلب
 */
function showOrderSuccess(orderId) {
    const checkoutContent = document.querySelector('.checkout-layout');

    if (checkoutContent) {
        checkoutContent.innerHTML = `
            <div class="order-success" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 5rem; margin-bottom: 24px;">✓</div>
                <h2 style="font-size: 2rem; margin-bottom: 16px; color: var(--success-color);">تم استلام طلبك بنجاح!</h2>
                <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 24px;">
                    رقم الطلب: <strong style="color: var(--primary-color);">${orderId}</strong>
                </p>
                <p style="color: var(--text-secondary); margin-bottom: 32px;">
                    سيتم التواصل معك قريباً لتأكيد الطلب وترتيب التوصيل
                </p>
                <a href="index.html" class="btn btn-primary">العودة للرئيسية</a>
            </div>
        `;
    }
}

/**
 * تهيئة صفحة التصنيفات
 */
function initCategoriesPage() {
    displayCategories('categories-grid');
}

/**
 * تهيئة نموذج الاتصال
 */
function initContactForm() {
    const form = document.querySelector('#contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // في بيئة حقيقية يتم إرسال البيانات للسيرفر
            showToast('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            form.reset();
        });
    }
}

/**
 * تهيئة تأثير الثلج
 */
function initSnowEffect() {
    // إنشاء حاوية الثلج
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snow-container';
    document.body.appendChild(snowContainer);

    // رموز الثلج المختلفة
    const snowflakes = ['❄', '❅', '❆', '•'];

    // إعدادات الثلج
    const snowflakeCount = 30; // عدد الرقاقات لعدم التأثير على الأداء

    // إنشاء الرقاقات
    for (let i = 0; i < snowflakeCount; i++) {
        createSnowflake();
    }

    function createSnowflake() {
        const flake = document.createElement('div');
        flake.classList.add('snowflake');
        flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

        // خصائص عشوائية
        const startLeft = Math.random() * 100; // موقع أفقي عشوائي
        const duration = Math.random() * 5 + 5; // مدة السقوط بين 5 و 10 ثواني
        const delay = Math.random() * 5; // تأخير عشوائي
        const size = Math.random() * 1 + 0.8; // حجم عشوائي

        flake.style.left = startLeft + 'vw';
        flake.style.animationDuration = duration + 's';
        flake.style.animationDelay = delay + 's';
        flake.style.fontSize = size + 'rem';
        flake.style.opacity = Math.random() * 0.7 + 0.3;

        snowContainer.appendChild(flake);

        // إعادة استخدام العنصر بعد انتهاء الحركة للحفاظ على الأداء
        flake.addEventListener('animationiteration', () => {
            flake.style.left = Math.random() * 100 + 'vw';
        });
    }
}

/**
 * منع إعادة تحميل الصفحة عند النقر على رابط لنفس الصفحة
 */
function preventSelfLinkNavigation() {
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');

        if (link) {
            const href = link.getAttribute('href');

            // تجاهل الروابط الفارغة أو التي تبدأ بـ #
            if (!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

            // الحصول على اسم الملف الحالي (بدون المسار الكامل)
            let currentFile = window.location.pathname.split('/').pop() || 'index.html';

            // تنظيف الرابط الهدف والحصول على اسم الملف منه
            // 1. إزالة المتغيرات (query string) والهاش (hash)
            let targetFile = href.split('?')[0].split('#')[0];

            // 2. إذا كان الرابط كاملاً، نأخذ الجزء الأخير منه
            if (targetFile.includes('/')) {
                targetFile = targetFile.split('/').pop() || 'index.html';
            }

            // 3. إذا كان الرابط فارغاً بعد التنظيف (مثل رابط "/")
            if (!targetFile) targetFile = 'index.html';

            console.log(`Checking Navigation: Current=${currentFile}, Target=${targetFile}`);

            // إذا كان اسم الملف هو نفسه
            if (currentFile === targetFile) {
                // نتحقق من الـ query params، إذا كان الرابط يحتوي على معلمات جديدة، نسمح بالتنقل
                // إلا إذا كنا نريد منع التحديث حتى مع المعلمات (حسب طلب المستخدم "نفس الصفحة")
                // لكن غالباً المستخدم يقصد التنقل للقائمة الرئيسية وهو فيها بالفعل

                // في Shop.html، نحتاج السماح بتغيير الفلاتر (query params)
                if (currentFile === 'shop.html' && href.includes('?')) {
                    return; // اسمح بالتنقل إذا كان هناك تغيير في الفلتر
                }

                e.preventDefault();
                console.log('Navigation Prevented: Clicked on same page link.');
            }
        }
    });
}
