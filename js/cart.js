const CART_KEY = "cart";

export function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

export function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(product) {
    const cart = getCart();

    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity++;
    }
    else {
        cart.push({...product, quantity : 1});
    }

    saveCart(cart);
}

export function getCartCount() {
    const cart = getCart();

    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function renderCartItems() {
    const cartItemsEl = document.querySelector('.cart-items');
    const cartTotalEl = document.querySelector('.cart-total');

    const cart = getCart();
    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalEl.textContent = "Total: ₹0";
        
        return;
    }

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        cartItemsEl.innerHTML += `
            <div class="cart-item" data-id="${item.id}">
                <img src= "${item.image}" alt="${item.title}" />
                <div>
                    <h4>${item.title}</h4>
                    <p>₹${item.price}</p>

                    <div class="quantity-controls">
                        <button class="decrease">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase">+</button>
                    </div>

                    <button class="remove-item">Remove</button>
                </div>
            </div>
        `;
    });

    cartTotalEl.textContent = `Total: ₹${total}`;
}

export function updateQuantity(id, change) {
    const cart = getCart();
    const item = cart.find(item => id === item.id);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeItem(id);
        return;
    }

    saveCart(cart);
}

export function removeItem(id) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== id);
    saveCart(cart);
}