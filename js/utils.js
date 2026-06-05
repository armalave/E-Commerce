const backToTopBtn = document.querySelector(".back-to-top");

backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth" // Smooth scrolling behavior
    });
})