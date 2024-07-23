export default function delivery() {
     


    document.addEventListener('click', function (event) {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            if (!event.target.matches('.dropdown input')) {
                dropdown.classList.remove('show');
            }
        });
    });

    function filterFunction(inputId, dropdownId) {
        const input = document.getElementById(inputId);
        const filter = input.value.toLowerCase();
        const dropdown = document.getElementById(dropdownId);
        const items = dropdown.getElementsByTagName('div');

        dropdown.classList.add('show');

        for (let i = 0; i < items.length; i++) {
            const txtValue = items[i].textContent || items[i].innerText;
            if (txtValue.toLowerCase().indexOf(filter) > -1) {
                items[i].style.display = '';
            } else {
                items[i].style.display = 'none';
            }
        }
    }

    const dropdowns = document.querySelectorAll('.dropdown-content div');
    dropdowns.forEach(item => {
        item.addEventListener('click', function () {
            const input = this.parentElement.previousElementSibling;
            input.value = this.textContent;
            this.parentElement.classList.remove('show');
        });
    });
};
