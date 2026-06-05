import { products } from "./data.js";
import { addToCart, getCartCount } from "./cart.js";

const productGrid = document.querySelector('.product-grid');

export function renderProducts(productList) {
    productGrid.innerHTML = '';

    if (productList.length === 0) {
        productGrid.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {
        productGrid.innerHTML += createProductCard(product);
    });
}

function createProductCard(product) {
    // console.log(product)

    return `
        <article class="card">
            <img src= "${product.image}" alt="Product image" />

            <h3 class="product-name">${product.title}</h3>

            <p class="price">₹${product.price}</p>

            <div class="rating">
                <div class="stars" data-rating="${product.rating}"></div>
                <span class="reviews">(${product.reviews})</span>
            </div>

            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </article>
    `;
}


productGrid.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.tagName !== "BUTTON") return;
    
    const productId = Number(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    addToCart(product);
    updateCartCount();
});

export function updateCartCount() {
    const cartCountEl = document.querySelector('.cart-count');
    cartCountEl.textContent = getCartCount();
}

renderProducts(products);
updateCartCount();