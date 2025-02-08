export default function modalBasket() {
    const modal = document.querySelector('.modal-basket');

    if (modal) {

        window.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('add-to-cart-btn')) {
                console.log(target)
                const btnDate = target.getAttribute('data-product-id');
                console.log(btnDate)
                modal.showModal();
                return;
            }

            if (target.classList.contains('modal-basket__btn-close')) {
                console.log(target)
                modal.close();
                return;
            }

            if (target.classList.contains('btn-continue')) {
                console.log('btn-continue')
                
                const id = target.getAttribute('data-product-id');
                console.log(target.parent)
                addToProdLocalS(id , 2)
                
                modal.close();
                return;
            }

            if (target.classList.contains('btn-makeOrder')) {
                console.log('btn-makeOrder')
                modal.close();
                return;
            }
        })

    }

    //addToProdLocalS('111', 2);
    //addToProdLocalS('111', 2);

    function addToProdLocalS(productId, quantity) {
        // Получаем текущую корзину из localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('card = ', cart)
        
        //{
        //    productId : 111,
        //    quantity:0
        //}
        // Ищем товар в корзине
        
        let existingProduct = cart.find(item => item.productId === productId);

        if (existingProduct) {
            // Если товар уже есть в корзине, увеличиваем его количество
            existingProduct.quantity += quantity;
            console.log(`Количество товара с ID ${productId} увеличено до ${existingProduct.quantity}`);
        } else {
            // Если товара нет в корзине, добавляем его с количеством 1
            cart.push({ productId: productId, quantity: 1 });
            console.log(`Товар с ID ${productId} добавлен в корзину с количеством 1`);
        }

        // Сохраняем обновленную корзину в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
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
