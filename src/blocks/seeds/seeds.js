export default function seeds() {
    const blockSeeds = document.querySelector(".seeds");

    if (blockSeeds) {
        const btn = blockSeeds.querySelector(".seeds__btn");
        const textHidden = blockSeeds.querySelector(".seeds__text-hidden");

        btn.addEventListener("click", () => {
            console.log("clic hidden text_faded ");
            textHidden.classList.add("seeds__text_active");
            btn.style.display = "none";
        });
    }
}
