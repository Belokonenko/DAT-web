export default function modalBasket() {
    const modal = document.querySelector('.modal-basket');

    if (modal) {

        window.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('add-to-cart-btn')) {
                console.log(target)
                const btnDate = event.target.getAttribute('data-product-id');
                console.log(btnDate)
                modal.showModal();
                return;
            }

            if (target.classList.contains('modal-basket__btn-close')) {
                console.log(target)
                modal.close();
                return;
            }

            if(target.classList.contains('btn-continue')) {
                console.log('btn-continue')
                modal.close();
                return;
            }
            
            if(target.classList.contains('btn-makeOrder')) {
                console.log('btn-makeOrder')
                modal.close();
                return;
            }
        })

    }

}


//export default function modalBasket() {



// const numberInput = document.getElementById('numberInput');
// const decrementButton = document.getElementById('decrementButton');
// const incrementButton = document.getElementById('incrementButton');

// // Функция для уменьшения номера на 1
// const decrementNumber = () => {
//     let currentValue = parseInt(numberInput.value);
//     if (currentValue > 1) {
//         numberInput.value = currentValue - 1;
//         decrementButton.disabled = false;
//     } else {
//         decrementButton.disabled = true;
//     }
// };

// // Функция для увеличения номера на 1
// const incrementNumber = () => {
//     let currentValue = parseInt(numberInput.value);
//     numberInput.value = currentValue + 1;
//     decrementButton.disabled = false;
// };

// // Обработчик события для ввода
// numberInput.addEventListener('keydown', event => {
//     // Проверяем, был ли нажат символ "e" или "E"
//     if (event.key === 'e' || event.key === 'E') {
//         // Предотвращаем действие по умолчанию (ввод символа)
//         event.preventDefault();
//     }
// });

// // Обработчики событий для кнопок
// decrementButton.addEventListener('click', decrementNumber);
// incrementButton.addEventListener('click', incrementNumber);
//}
