export default function registration() {
    console.log("registration");

    function test() {
        console.log("test");
    }

    function validateForm() {
        console.log("validateForm");
        var password = document.querySelector('input[type="password"]').value;
        var confirmPassword = document.querySelectorAll(
            'input[type="password"]'
        )[1].value;

        if (password !== confirmPassword) {
            document.getElementById("error-message").textContent =
                "Passwords do not match!";
            return false;
        }

        return true;
    }

    function validateName() {
        console.log("validateName");
        var nameInput = document.getElementById("name");
        var nameErrorMessage = document.getElementById("name_message_err");
        var name = nameInput.value.trim();

        if (name.length < 2 || name.length > 50) {
            nameErrorMessage.textContent =
                "Name must be between 2 and 50 characters";
            nameInput.classList.add("error");
        } else {
            nameErrorMessage.textContent = "";
            nameInput.classList.remove("error");
        }
    }

    function validateNameChar() {
        console.log("validateNameChar");
        var nameInput = document.getElementById("name");
        var nameErrorMessage = document.getElementById("name_message_err");
        var name = nameInput.value.trim();

        // Регулярное выражение для проверки, содержит ли строка только буквы
        var lettersOnlyRegex = /^[a-zA-Z]+$/;

        if (!lettersOnlyRegex.test(name)) {
            nameErrorMessage.textContent = "Name must contain only letters";
            nameInput.classList.add("error");
        } else {
            nameErrorMessage.textContent = "";
            nameInput.classList.remove("error");
        }
    }

    function validateNameUpper() {
        console.log("validateNameUpper");
        var nameInput = document.getElementById("name");
        var nameErrorMessage = document.getElementById("name_message_err");
        var name = nameInput.value.trim();

        if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
            nameErrorMessage.textContent =
                "Name must start with an uppercase letter";
            nameInput.classList.add("error");
        } else {
            nameErrorMessage.textContent = "";
            nameInput.classList.remove("error");
        }
    }
}
