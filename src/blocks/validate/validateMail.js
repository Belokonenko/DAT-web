export default function validateEmail(mailId) {
    const emailInput = document.getElementById(mailId);
    const errorMessage = document.getElementById(`${mailId}_message_err`);
    // Регулярное выражение для проверки адреса электронной почты
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailInput.addEventListener("input", () => {
        const email = emailInput.value.trim();

        if (!emailPattern.test(email)) {
            errorMessage.textContent = "! Enter a valid email example@mail.com";
            emailInput.classList.add("error");
        } else {
            errorMessage.textContent = "";
            emailInput.classList.remove("error");
        }
    });
}
