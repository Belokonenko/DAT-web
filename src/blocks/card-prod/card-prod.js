export default function addProdCart() {
    window.addEventListener('click', (e) => {
        const target = e.target;

        if (target) {
            console.log(target)
            console.log(target.classList.contains('add-to-cart-btn'));
            
            if (target.classList.contains('add-to-cart-btn')) {
                console.log(e.target)



            }
        }
    })
}
