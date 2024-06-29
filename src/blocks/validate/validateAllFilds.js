export default function validateAllFilds() {

    
    const nameInput = document.getElementById("name");
    const surnameInput = document.getElementById("surname");
    const phoneInput = document.getElementById("phone-input");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const agreeCheckbox = document.getElementById("agree");
    const signUpButton = document.querySelector(".registration__button");


    // Обработчик события клика по кнопке "Sign up"
    signUpButton.addEventListener("click", function(event) {

        // Предотвращаем отправку формы, если есть ошибки валидации
        if (document.querySelector(".error")) {
            event.preventDefault();
        }
    });

    // Обработчик события изменения состояния флажка согласия
    agreeCheckbox.addEventListener("change", validateAgreement);
};
