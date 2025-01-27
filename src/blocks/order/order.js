export default function order() {
    const orders = document.querySelectorAll('.order');

    if (orders) {
        orders.forEach(order => {
            //order.addEventListener('mouseover', () => {
            //    order.classList.add('order_active');
            //});
            //
            //order.addEventListener('mouseout', () => {
            //    order.classList.remove('order_active');
            //});

            const btn = order.querySelector('.order__btn');

            btn.addEventListener('click', () => {
                console.log('click');
                order.classList.toggle('order_active');
            });
        });
    }
}
