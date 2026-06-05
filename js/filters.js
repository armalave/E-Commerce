import { products } from "./data.js";
import { renderProducts } from "./products.js";

const currentFilters = {
    search: "",
    category: "all",
    price: "all"
};

const searchInput = document.getElementById('search-input');
const categorySelect = document.getElementById('filter-category');
const priceSelect = document.getElementById('filter-price');

searchInput.addEventListener('input', (e) => {
    e.preventDefault();
    currentFilters.search = e.target.value;
    applyFilters();
});

categorySelect.addEventListener('change', (e) => {
    e.preventDefault();
    currentFilters.category = e.target.value;
    applyFilters();
});

priceSelect.addEventListener('change', (e) => {
    e.preventDefault();
    currentFilters.price = e.target.value;
    applyFilters();
});

function applyFilters() {
    let filtered = [...products];

    if (currentFilters.search) {
        filtered = filtered.filter(p => p.title.toLowerCase().includes(currentFilters.search));
    }

    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilters.category);
    }

    if (currentFilters.price !== 'all') {
        const [min, max] = currentFilters.price.split("-").map(Number);

        filtered = filtered.filter(p => {
            if (max) return p.price >= min && p.price <= max;
            return p.price >= min;
        })
    }

    renderProducts(filtered);
}