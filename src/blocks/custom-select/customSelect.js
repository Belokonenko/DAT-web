export default function customSelect() {
    const customSelects = document.querySelectorAll('.custom-select');

    if (customSelects) {
        customSelects.forEach(item => {
            console.log(item);

            const select = item.querySelector('.custom-select__select');
            const selectStyled = item.querySelector('.custom-select__over');
            const selectOptions = item.querySelector('.custom-select__options');
            const selectArr = item.querySelector('.custom-select__arr-menu');

            const firstOption = selectOptions.children[0];
            selectStyled.textContent = firstOption.textContent;

            selectStyled.addEventListener('click', function () {
                item.classList.toggle('custom-select_active');

                selectOptions.style.display = selectOptions.style.display === 'none' ? 'block' : 'none';

                selectArr.classList.toggle('custom-select__arr-menu_active');
            });

            selectOptions.addEventListener('click', event => {
                if (event.target.tagName === 'LI') {
                    console.log(event.target.tagName);

                    item.classList.toggle('custom-select_active');

                    select.value = event.target.getAttribute('data-value');

                    console.log(event.target.getAttribute('data-value'));

                    selectStyled.textContent = event.target.textContent;

                    selectOptions.style.display = 'none';
                }
            });
        });
    }
}
