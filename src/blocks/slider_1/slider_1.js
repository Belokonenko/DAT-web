// Экспортируем по умолчанию функцию slider_1
export default function slider_1() {
    console.log(`slider_1 ===> done`);

    // Находим элементы обёртки и линии карусели
    const wrapper = document.querySelector(".carousel__wrapper");
    const carousel = document.querySelector(".carousel__line");

    // Находим ширину первой карточки карусели
    const firstCardWidth = carousel.querySelector(".carousel__card").offsetWidth;

    // Находим кнопки для прокрутки карусели (влево и вправо)
    const arrowBtns = document.querySelectorAll(".carousel__btn");
    // Превращаем дочерние элементы карусели в массив (все карточки)
    const carouselChildrens = [...carousel.children];

    // Переменные для управления процессом прокрутки и автоматического воспроизведения
    let isDragging = false, // Флаг для отслеживания, происходит ли перетаскивание
        isAutoPlay = true, // Флаг для автоматического воспроизведения
        startX, // Начальная позиция курсора
        startScrollLeft, // Начальная позиция прокрутки карусели
        timeoutId; // Идентификатор таймера для автопрокрутки

    // Вычисляем количество карточек, которые могут поместиться в карусели одновременно
    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    // Вставляем копии последних карточек в начало карусели для создания эффекта бесконечной прокрутки
    carouselChildrens
        .slice(-cardPerView) // Берем последние несколько карточек, основываясь на количестве видимых карточек
        .reverse() // Переворачиваем их порядок, чтобы вставлять с конца
        .forEach((card) => {
            // Вставляем каждую карточку в начало карусели
            carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

    // Вставляем копии первых карточек в конец карусели для создания эффекта бесконечной прокрутки
    carouselChildrens.slice(0, cardPerView).forEach((card) => {
        // Вставляем каждую карточку в конец карусели
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Прокручиваем карусель в нужную позицию для скрытия первых дубликатов карточек (особенно для Firefox)
    carousel.classList.add("no-transition"); // Убираем анимацию, чтобы прокрутка не была заметна
    carousel.scrollLeft = carousel.offsetWidth; // Прокручиваем карусель на ширину её контейнера
    carousel.classList.remove("no-transition"); // Восстанавливаем анимацию

    // Добавляем обработчики событий для кнопок прокрутки (влево и вправо)
    arrowBtns.forEach((btn) => {
        console.log(btn)
        btn.addEventListener("click", () => {
            // Прокручиваем карусель на ширину одной карточки в зависимости от направления (влево или вправо)
            carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });

    // Функция, которая вызывается при начале перетаскивания мышкой
    const dragStart = (e) => {
        isDragging = true; // Устанавливаем флаг, что начинается перетаскивание
        carousel.classList.add("dragging"); // Добавляем класс, чтобы показать, что происходит перетаскивание
        startX = e.pageX; // Запоминаем начальную позицию курсора
        startScrollLeft = carousel.scrollLeft; // Запоминаем начальное положение прокрутки карусели
    };

    // Функция, которая вызывается при перетаскивании (движении мышкой)
    const dragging = (e) => {
        if (!isDragging) return; // Если перетаскивание не началось, выходим из функции
        // Обновляем позицию прокрутки карусели в зависимости от движения курсора
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    };

    // Функция, которая вызывается при завершении перетаскивания
    const dragStop = () => {
        isDragging = false; // Устанавливаем флаг, что перетаскивание завершено
        carousel.classList.remove("dragging"); // Убираем класс перетаскивания
    };

    // Функция для бесконечной прокрутки (обеспечивает зацикливание карусели)
    const infiniteScroll = () => {
        // Если карусель прокручена в самое начало, перемещаем её в конец
        if (carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition"); // Убираем анимацию
            carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth; // Прокручиваем в конец
            carousel.classList.remove("no-transition"); // Восстанавливаем анимацию
        }
        // Если карусель прокручена в самый конец, перемещаем её в начало
        else if (
            Math.ceil(carousel.scrollLeft) ===
            carousel.scrollWidth - carousel.offsetWidth
        ) {
            carousel.classList.add("no-transition"); // Убираем анимацию
            carousel.scrollLeft = carousel.offsetWidth; // Прокручиваем в начало
            carousel.classList.remove("no-transition"); // Восстанавливаем анимацию
        }

        // Очищаем текущий таймер и запускаем автопрокрутку, если мышь не находится над каруселью
        clearTimeout(timeoutId);
        if (!wrapper.matches(":hover")) autoPlay(); // Если мышь не над каруселью, запускаем автоплей
    };

    // Функция для автоматической прокрутки карусели
    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return; // Останавливаем автоплей, если ширина окна меньше 800px или флаг отключен
        // Автоматическая прокрутка каждые 2500 мс
        timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
    };
    autoPlay(); // Запускаем автоплей

    // Добавляем обработчики событий для перетаскивания карусели
    carousel.addEventListener("mousedown", dragStart); // Начало перетаскивания при нажатии мыши
    carousel.addEventListener("mousemove", dragging); // Обработка движения мыши
    document.addEventListener("mouseup", dragStop); // Завершение перетаскивания при отпускании мыши
    carousel.addEventListener("scroll", infiniteScroll); // Обработка бесконечной прокрутки
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId)); // Остановка автоплей при наведении на карусель
    wrapper.addEventListener("mouseleave", autoPlay); // Запуск автоплей при уходе курсора с карусели
}

