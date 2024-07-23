export default function delivery() {
    console.log('module - function delivery');

    // Функция для получения данных с сервера

    async function fetchRegions() {
        try {
            const response = await fetch('http://localhost:3002/regions');
            const data = await response.json();
            console.log(Object.keys(data));
            populateDropdown(Object.keys(data));
        } catch (error) {
            console.error('Error fetching regions:', error);
        }
    }

    // Функция для заполнения выпадающего списка регионов
    function populateDropdown(regions) {
        const dropdown = document.getElementById('regionDropdown');
        dropdown.innerHTML = ''; // Очистить предыдущие элементы
        regions.forEach(region => {
            const div = document.createElement('div');
            div.textContent = region;
            div.onclick = () => {
                document.getElementById('regionInput').value = region;
                dropdown.classList.remove('show');
            };
            dropdown.appendChild(div);
        });
        dropdown.classList.add('show');
    }

    // Функция для заполнения выпадающего списка городов
    function populateDropdown(regions) {
        const dropdown = document.getElementById('regionDropdown');
        dropdown.innerHTML = ''; // Очистить предыдущие элементы
        regions.forEach(region => {
            const div = document.createElement('div');
            div.textContent = region;
            div.onclick = () => {
                document.getElementById('regionInput').value = region;
                dropdown.classList.remove('show');
            };
            dropdown.appendChild(div);
        });
        dropdown.classList.add('show');
    }
    
    // Функция фильтрации элементов
    function filterFunction(inputId, dropdownId) {
        const input = document.getElementById(inputId);
        const filter = input.value.toUpperCase();
        const dropdown = document.getElementById(dropdownId);
        const divs = dropdown.getElementsByTagName('div');

        for (let i = 0; i < divs.length; i++) {
            const textValue = divs[i].textContent || divs[i].innerText;
            if (textValue.toUpperCase().indexOf(filter) > -1) {
                divs[i].style.display = '';
            } else {
                divs[i].style.display = 'none';
            }
        }
    }

    //Вызов функции для получения данных при загрузке страницы
    
    fetchRegions();

    //-----------------------------------------------------------------

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
}
