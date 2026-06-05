import { renderCartItems, updateQuantity, removeItem } from "./cart.js";
import { updateCartCount } from "./products.js";

const cartIcon = document.querySelector(".navbar .navbar-right");
const overlay = document.querySelector(".cart-overlay");
const closeBtn = document.querySelector(".close-cart");
const cartItemsEl = document.querySelector(".cart-items");
const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutForm = document.querySelector(".checkout-form");

cartIcon.addEventListener("click", () => {
    overlay.classList.remove("hidden");

    renderCartItems();
});

closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
});

cartItemsEl.addEventListener("click", (e) => {
    e.preventDefault();

    const itemEl = e.target.closest(".cart-item");
    if (!itemEl) return;

    const id = Number(itemEl.dataset.id);

    if (e.target.classList.contains("increase")) {
        updateQuantity(id, 1);
    }

    if (e.target.classList.contains("decrease")) {
        updateQuantity(id, -1);
    }

    if (e.target.classList.contains("remove-item")) {
        removeItem(id);
    }

    renderCartItems();
    updateCartCount();
});

checkoutBtn.addEventListener("click", () => {
    checkoutForm.classList.remove("hidden");
    checkoutBtn.classList.add("hidden");
});