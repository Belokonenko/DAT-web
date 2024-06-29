export default function navProd() {
    const navProd = document.querySelector(".nav-prod");

    if (navProd) {
        const btnMenu = navProd.querySelector(".nav-prod__btn-menu");
        const btns = navProd.querySelectorAll(".nav-prod__btn");

        if (btnMenu) {
            btnMenu.addEventListener("click", () => {
                navProd.classList.toggle("nav-prod_active");
            });
        }

        if (btns) {
            btns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    navProd.classList.remove("nav-prod_active");
                });
            });
        }
    }
}
