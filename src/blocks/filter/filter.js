export const filter = () =>  {
    const filterBtn = document.querySelector('.catalog-prod__btn-filter');
    const filterBlock = document.querySelector('.filter');
    const filterBtnClose = document.querySelector('.filter__btn');

    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            filterBlock.classList.toggle('filter_active');
        });
    }

    if (filterBtnClose) {
        filterBtnClose.addEventListener('click', () => {
            filterBlock.classList.remove('filter_active');
        });
    }
}
