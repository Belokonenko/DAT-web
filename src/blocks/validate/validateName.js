export default function validateName(nameId) {
    const nameInput = document.getElementById(nameId);
    const nameErrorMessage = document.getElementById(`${nameId}_message_err`);

    nameInput.addEventListener("input", () => {
        const name = nameInput.value.trim();
        let errorMessage = "";

        const hasSpecialCharacters =
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(name);
        const hasTags = /<[^>]*>?/.test(name);
        const containsNonLatinCharacters = /[^a-zA-Z]/.test(name);

        switch (true) {
            case name.includes(" "):
                errorMessage = "! Cannot contain spaces";
                break;
            case containsNonLatinCharacters:
                errorMessage = "! Only Latin characters";
                break;
            case !/^[A-Z][a-z]*$/.test(name):
                errorMessage =
                    "! First letter uppercase";
                break;
            case name.length < 2 || name.length > 50:
                errorMessage = "! Must be between 2 and 50 characters";
                break;
            case hasSpecialCharacters:
                errorMessage = "! Cannot contain special characters";
                break;
            case hasTags:
                errorMessage = "! Cannot contain HTML tags";
                break;
            default:
                errorMessage = "";
        }

        nameErrorMessage.textContent = errorMessage;

        if (errorMessage) {
            nameInput.classList.add("error");
        } else {
            nameInput.classList.remove("error");
        }
    });
}
