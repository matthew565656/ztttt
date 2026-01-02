/**
 * ZT Store - نظام سلة التسوق
 * ============================
 * إدارة السلة مع LocalStorage
 */

// مفتاح التخزين المحلي
const CART_STORAGE_KEY = 'zt_store_cart';

/**
 * الحصول على السلة من التخزين المحلي
 * @returns {array} - عناصر السلة
 */
function getCart() {
    try {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('خطأ في قراءة السلة:', error);
        return [];
    }
}

/**
 * حفظ السلة في التخزين المحلي
 * @param {array} cart - عناصر السلة
 */
function saveCart(cart) {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartBadge();
    } catch (error) {
        console.error('خطأ في حفظ السلة:', error);
    }
}

/**
 * إضافة منتج إلى السلة
 * @param {number} productId - معرف المنتج
 * @param {number} quantity - الكمية (افتراضي 1)
 * @returns {boolean} - نجاح العملية
 */
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showToast('المنتج غير موجود', 'error');
        return false;
    }

    if (quantity < 1) quantity = 1;
    if (quantity > product.stock) {
        showToast(`الكمية المتاحة ${product.stock} فقط`, 'error');
        return false;
    }

    const cart = getCart();
    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
            showToast(`الكمية المتاحة ${product.stock} فقط`, 'error');
            return false;
        }
        existingItem.quantity = newQuantity;
    } else {
        cart.push({
            productId: productId,
            quantity: quantity,
            addedAt: new Date().toISOString()
        });
    }

    saveCart(cart);
    showToast('تمت إضافة المنتج إلى السلة', 'success');
    return true;
}

/**
 * إزالة منتج من السلة
 * @param {number} productId - معرف المنتج
 */
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    showToast('تم حذف المنتج من السلة', 'success');
}

/**
 * تحديث كمية منتج في السلة
 * @param {number} productId - معرف المنتج
 * @param {number} quantity - الكمية الجديدة
 * @returns {boolean} - نجاح العملية
 */
function updateCartQuantity(productId, quantity) {
    const product = getProductById(productId);
    if (!product) return false;

    if (quantity < 1) {
        removeFromCart(productId);
        return true;
    }

    if (quantity > product.stock) {
        showToast(`الكمية المتاحة ${product.stock} فقط`, 'error');
        return false;
    }

    const cart = getCart();
    const item = cart.find(item => item.productId === productId);

    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        return true;
    }

    return false;
}

/**
 * الحصول على عدد العناصر في السلة
 * @returns {number} - عدد العناصر
 */
function getCartCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * الحصول على تفاصيل عناصر السلة
 * @returns {array} - العناصر مع تفاصيل المنتجات
 */
function getCartDetails() {
    const cart = getCart();
    return cart.map(item => {
        const product = getProductById(item.productId);
        if (!product) return null;

        return {
            ...item,
            product: product,
            subtotal: product.price * item.quantity
        };
    }).filter(item => item !== null);
}

/**
 * حساب إجمالي السلة
 * @returns {object} - {subtotal, shipping, total}
 */
function getCartTotal() {
    const items = getCartDetails();
    const subtotal = items.reduce((total, item) => total + item.subtotal, 0);
    const shipping = subtotal > 0 ? 5000 : 0; // رسوم توصيل ثابتة

    return {
        subtotal: subtotal,
        shipping: shipping,
        total: subtotal + shipping,
        itemsCount: items.length
    };
}

/**
 * تفريغ السلة بالكامل
 */
function clearCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    updateCartBadge();
}

/**
 * تحديث شارة عدد السلة في الهيدر
 */
function updateCartBadge() {
    const badges = document.querySelectorAll('.cart-badge');
    const count = getCartCount();

    badges.forEach(badge => {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    });
}

/**
 * عرض إشعار Toast
 * @param {string} message - الرسالة
 * @param {string} type - نوع الإشعار (success/error/info)
 */
function showToast(message, type = 'success') {
    // إزالة التوست السابقة
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(t => t.remove());

    // إنشاء حاوية التوست إذا لم تكن موجودة
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    // إنشاء التوست
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    container.appendChild(toast);

    // إزالة تلقائية بعد 3 ثواني
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * التحقق من صحة نموذج الطلب
 * @param {object} formData - بيانات النموذج
 * @returns {object} - {valid, errors}
 */
function validateOrderForm(formData) {
    const errors = [];

    if (!formData.name || formData.name.trim().length < 3) {
        errors.push('الاسم يجب أن يكون 3 أحرف على الأقل');
    }

    if (!formData.phone || !/^07\d{8,9}$/.test(formData.phone)) {
        errors.push('رقم الهاتف غير صحيح (يجب أن يبدأ بـ 07)');
    }

    if (!formData.province) {
        errors.push('يرجى اختيار المحافظة');
    }

    if (!formData.address || formData.address.trim().length < 10) {
        errors.push('العنوان يجب أن يكون 10 أحرف على الأقل');
    }

    return {
        valid: errors.length === 0,
        errors: errors
    };
}

/**
 * إتمام الطلب
 * @param {object} orderData - بيانات الطلب
 * @returns {object} - {success, orderId, message}
 */
function submitOrder(orderData) {
    const validation = validateOrderForm(orderData);

    if (!validation.valid) {
        return {
            success: false,
            errors: validation.errors
        };
    }

    const cartDetails = getCartDetails();
    if (cartDetails.length === 0) {
        return {
            success: false,
            errors: ['السلة فارغة']
        };
    }

    const cartTotal = getCartTotal();

    // إنشاء رقم طلب عشوائي
    const orderId = 'ZT-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();

    // في بيئة حقيقية، هنا يتم إرسال الطلب للسيرفر
    const order = {
        orderId: orderId,
        customer: orderData,
        items: cartDetails.map(item => ({
            productId: item.productId,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            subtotal: item.subtotal
        })),
        subtotal: cartTotal.subtotal,
        shipping: cartTotal.shipping,
        total: cartTotal.total,
        paymentMethod: 'COD',
        status: 'pending',
        createdAt: new Date().toISOString()
    };

    // حفظ الطلب في التخزين المحلي (للعرض فقط)
    const orders = JSON.parse(localStorage.getItem('zt_store_orders') || '[]');
    orders.push(order);
    localStorage.setItem('zt_store_orders', JSON.stringify(orders));

    // تفريغ السلة
    clearCart();

    return {
        success: true,
        orderId: orderId,
        order: order
    };
}

// تحديث الشارة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', updateCartBadge);
