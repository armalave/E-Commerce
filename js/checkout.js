import { getCart, saveCart } from "./cart.js";

const form = document.querySelector(".checkout-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const isValid = validateForm(form);
        if (!isValid) return;

        placeOrder();
    });
}

function validateForm(form) {
    let valid = true;

    form.querySelectorAll(".form-group").forEach(group => {
        const input = group.querySelector("input, textarea");
        const error = group.querySelector(".error");

        if (!input.value.trim()) {
            error.textContent = "This field is required";
            valid = false;
        }
        else {
            error.textContent = "";
        }

        if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                error.textContent = "Enter a valid email";
                valid = false;
            }
        }

        if (input.type === "tel") {
            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(input.value)) {
                error.textContent = "Enter a valid phone number";
                valid = false;
            }
        }
    });

    return valid;
}

function placeOrder() {
    form.classList.add("loading");

    setTimeout(() => {
        form.classList.remove("loading");
    }, 800);

    alert("🎉 Order placed successfully!");

    saveCart([]);
    localStorage.removeItem("cart");

    document.querySelector(".cart-items").innerHTML = "";
    document.querySelector(".cart-total").textContent = "Total: ₹0";
    document.querySelector(".cart-count").textContent = "0";

    document.querySelector(".checkout-form").reset();
    document.querySelector(".checkout-form").classList.add("hidden");
    document.querySelector(".checkout-btn").classList.remove("hidden");
}