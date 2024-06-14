export const filter = () => {

            console.log('filter');
    const filterBtn = document.querySelector('.catalog__btn-filter');
    const filterBlock = document.querySelector('.filter__form');
    const filterBtnClose = document.querySelector('.filter__btn');

    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            filterBlock.classList.toggle('filter__form_active');
            console.log('.catalog__btn-filter');
        });
    }

    if (filterBtnClose) {
        filterBtnClose.addEventListener('click', () => {
            filterBlock.classList.remove('filter__form_active');
        });
    }
};
