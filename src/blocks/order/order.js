export default function order() {
    const orders = document.querySelectorAll('.order');

    if (orders) {
        orders.forEach(order => {
            const btn = order.querySelector('.order__btn');

            btn.addEventListener('click', () => {
                console.log('click');
                order.classList.toggle('order_active');
            });
        });
    }
}
