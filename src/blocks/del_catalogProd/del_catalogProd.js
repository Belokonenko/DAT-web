export default function selsct() {
    document.addEventListener('DOMContentLoaded', function () {
        var selectedCategory = document.getElementById('selectedCategory');
        var dropdownList = document.getElementById('dropdownList');

        selectedCategory.addEventListener('click', function () {
            dropdownList.style.display =
                dropdownList.style.display === 'block' ? 'none' : 'block';
        });

        dropdownList.addEventListener('click', function (event) {
            var clickedElement = event.target;
            if (clickedElement.classList.contains('categories__item')) {
                selectedCategory.innerHTML = clickedElement.innerHTML;
                dropdownList.style.display = 'none';
            }
        });
    });
}
