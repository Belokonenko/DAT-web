// Экспортируем функцию maskPhone по умолчанию
export default function maskPhone() {
    // Получаем все элементы input с идентификатором 'phone-input'
    const phoneInputs = document.querySelectorAll('#phone-input');

    // Функция для получения числового значения ввода
    const getInputNumbersValue = (input) => {
        // Возвращает значение ввода без нечисловых символов
        return input.value.replace(/\D/g, '');
    };

    // Обработчик вставки номера телефона
    const onPhonePaste = (e) => {
        // Получаем ссылку на элемент input
        const input = e.target;
        // Получаем числовое значение ввода
        const inputNumbersValue = getInputNumbersValue(input);
        // Получаем данные из буфера обмена
        const pasted = e.clipboardData || window.clipboardData;
        if (pasted) {
            // Получаем вставленный текст
            const pastedText = pasted.getData('Text');
            if (/\D/g.test(pastedText)) {
                // Если вставлены нечисловые символы, удаляем их
                input.value = inputNumbersValue;
                return;
            }
        }
    };

    // Обработчик ввода номера телефона
    const onPhoneInput = (e) => {
        // Получаем ссылку на элемент input
        const input = e.target;
        // Получаем числовое значение ввода
        const inputNumbersValue = getInputNumbersValue(input);
        // Получаем позицию курсора в поле ввода
        const selectionStart = input.selectionStart;
        // Переменная для хранения отформатированного значения ввода
        let formattedInputValue = '';

        if (!inputNumbersValue) {
            // Если нет числового значения, очищаем ввод
            return input.value = '';
        }

        if (input.value.length != selectionStart) {
            // Если ввод в середине, а не в конце, удаляем нечисловые символы
            if (e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        // Проверяем, начинается ли номер с 7, 8 или 9
        if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
            // Если начинается с 7, 8 или 9
            if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
            const firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
            formattedInputValue = input.value = firstSymbols + " ";
            if (inputNumbersValue.length > 1) {
                formattedInputValue += `(${inputNumbersValue.substring(1, 4)}`;
            }
            if (inputNumbersValue.length >= 5) {
                formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}`;
            }
            if (inputNumbersValue.length >= 8) {
                formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`;
            }
            if (inputNumbersValue.length >= 10) {
                formattedInputValue += `-${inputNumbersValue.substring(9, 11)}`;
            }
        } else {
            // Если не начинается с 7, 8 или 9, просто добавляем его
            formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`;
        }
        // Устанавливаем отформатированное значение в поле ввода
        input.value = formattedInputValue;
    };

    // Обработчик нажатия клавиш для удаления последнего символа
    const onPhoneKeyDown = (e) => {
        // Получаем числовое значение ввода
        const inputValue = e.target.value.replace(/\D/g, '');
        // Если была нажата клавиша Backspace и ввод состоит из одного символа, очищаем поле ввода
        if (e.keyCode == 8 && inputValue.length == 1) {
            e.target.value = '';
        }
    };

    // Добавляем обработчики для всех полей ввода телефонных номеров
    for (const phoneInput of phoneInputs) {
        phoneInput.addEventListener('keydown', onPhoneKeyDown);
        phoneInput.addEventListener('input', onPhoneInput, false);
        phoneInput.addEventListener('paste', onPhonePaste, false);
    }
}
