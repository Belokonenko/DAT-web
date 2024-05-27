export default function quantity() {
    const quantityBlockList = document.querySelectorAll('.quantity');

    if (quantityBlockList) {
        quantityBlockList.forEach(item => {
            
            const numberInput = item.querySelector('.quantity__number-input');
            const decrementButton = item.querySelector('.quantity__decrement-button');
            const incrementButton = item.querySelector('.quantity__increment-button');



            // Функция для уменьшения номера на 1
            const decrementNumber = () => {
                let currentValue = parseInt(numberInput.value);
                if (currentValue > 1) {
                    numberInput.value = currentValue - 1;
                    decrementButton.disabled = false;
                } else {
                    decrementButton.disabled = true;
                }
            };

            // Функция для увеличения номера на 1
            const incrementNumber = () => {
                let currentValue = parseInt(numberInput.value);
                numberInput.value = currentValue + 1;
                decrementButton.disabled = false;
            };

            // Обработчик события для ввода
            numberInput.addEventListener('keydown', event => {
                // Проверяем, был ли нажат символ "e" или "E"
                if (event.key === 'e' || event.key === 'E') {
                    // Предотвращаем действие по умолчанию (ввод символа)
                    event.preventDefault();
                }
            });

            // Обработчики событий для кнопок
            decrementButton.addEventListener('click', decrementNumber);
            incrementButton.addEventListener('click', incrementNumber);
        });
    }
}
