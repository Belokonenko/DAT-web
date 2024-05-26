export default function validatePassword(passId) {
    const passwordInput = document.getElementById(passId);
    const errorMessageElement = document.getElementById(
        `${passId}_message_err`
    );
    const forbiddenChars = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/;
    const hasTags = /<[^>]*>?/.test(passwordInput.value);

    passwordInput.addEventListener("input", function () {
        const password = passwordInput.value.trim(); // Remove leading and trailing whitespace

        let errorMessage = ""; // Clear error messages and remove error classes

        switch (true) {
            case /\s/.test(password):
                errorMessage = "! Password cannot contain whitespace characters";
                break;
            case forbiddenChars.test(password):
                errorMessage = "! Password cannot contain special characters";
                break;
            case password.length < 6:
                errorMessage = "! Password must be at least 6 characters long";
                break;
            case !/\d/.test(password):
                errorMessage = "! Password must contain at least one digit";
                break;
            case hasTags:
                errorMessage = "! Password cannot contain HTML tags";
                break;
            case !/[A-Z]/.test(password):
                errorMessage =
                    "! Password must contain at least one uppercase letter";
                break;
            default:
                errorMessage = "";
        }

        errorMessageElement.textContent = errorMessage;

        if (errorMessage) {
            passwordInput.classList.add("error");
        } else {
            passwordInput.classList.remove("error");
        }
    });
}
