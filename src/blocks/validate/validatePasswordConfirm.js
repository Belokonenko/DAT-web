export default function validatePasswordConfirm(passwordId,passwordConfirmId) {
    // Получаем ссылки на поля для ввода пароля и его подтверждения
    const passwordInput = document.getElementById(passwordId);
    const confirmPasswordInput = document.getElementById(passwordConfirmId);
    console.log(confirmPasswordInput)

    // Функция для проверки совпадения паролей и установки класса "error"
    const validatePasswordMatch = () => {
        // Получаем значения введенных паролей
        const passwordValue = passwordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;

        // Если значения паролей не совпадают
        if (passwordValue !== confirmPasswordValue) {
            // Добавляем класс "error" к полю подтверждения пароля
            confirmPasswordInput.classList.add('error');
            // Отображаем сообщение об ошибке
            document.getElementById('confirm-password_message_err').textContent = '! Passwords do not match';
            return false; // Возвращаем false, чтобы предотвратить отправку формы
        } else {
            // Если значения паролей совпадают, убираем класс "error" (если он был)
            confirmPasswordInput.classList.remove('error');
            // Очищаем сообщение об ошибке (если оно было)
            document.getElementById('confirm-password_message_err').textContent = '';
            return true; // Возвращаем true, разрешая отправку формы
        }
    };

    // Добавляем обработчик события input для поля подтверждения пароля
    confirmPasswordInput.addEventListener('input', validatePasswordMatch);
}

