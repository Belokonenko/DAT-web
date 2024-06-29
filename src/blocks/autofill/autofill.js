export default function autofill() {
    // Получаем все поля ввода с классом .input-autofill
    const autofillInputs = document.querySelectorAll('.name');

    // Перебираем полученные элементы и применяем стили к автозаполненным полям ввода
    autofillInputs.forEach(function(input) {
        input.addEventListener('input', function() {
            console.log('input');
            if (input.matches(':autofill')) {
                // Применяем стили к автозаполненному полю ввода
                input.classList.add('autofill');
            } else {
                // Убираем стили, если поле ввода больше не заполнено автоматически
                input.classList.remove('autofill');
            }
        });
    });
};

