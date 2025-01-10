export default function sliders(nameSlider) {

    const slider = document.querySelector(`[data-name_slider="${nameSlider}"]`);

    if (!slider) return;

    const API_URL = `http://localhost:4000/${nameSlider}`;
    const sliderLine = slider.querySelector('.slider__line');

    let counnt = 0; //current card number

    main();

    ///////////////////////////////////////////////////////////////////////

    async function main() {
        const dataCards = await getData(API_URL);

        setWidthCard();

        window.addEventListener('resize', debouncedResizeHandler);

        await renderCards(dataCards, sliderLine);

        createDots(slider);

        const bntLeft = slider.querySelector('.slider__btn-left');
        const bntRight = slider.querySelector('.slider__btn-right');

        bntLeft.addEventListener('click', () => {
            left();
        });

        bntRight.addEventListener('click', () => {
            right();
        });
        moveItemBeginn()
        moveItemBeginn()
        console.log(counnt)
        console.log('exit main');
    }

    ///////////////////////////////////////////////////////////////////////

    // --- Infinity---

    function checkCounnt() {
        console.log('checkCounnt()', 'counnt = ', counnt)

        if (counnt == sliderLine.children.length) {
            console.log(sliderLine.children.length)
        }

        if (counnt == 0) {
            console.log(0)
        }
    }

    function moveItemBeginn() {
        console.log('moveItemBeginn()')

        const sliderLine = slider.querySelector('.slider__line');
        const slides = Array.from(sliderLine.children);
        const firstSlide = slides[0];
        const lastSlide = slides[slides.length - 1];

        sliderLine.insertBefore(lastSlide.cloneNode(true), firstSlide);
        lastSlide.remove();
        counnt = ++counnt;

    }

    function moveItemEnd() {

        console.log('moveItemEnd()')

        const sliderLine = slider.querySelector('.slider__line');
        const slides = Array.from(sliderLine.children);
        const firstSlide = slides[0];
        const lastSlide = slides[slides.length - 1];

        sliderLine.appendChild(firstSlide.cloneNode(true));
        firstSlide.remove();
    }

    // ---/Infinity---

    function getCounntItems() {
        return slider.querySelectorAll('.slider__item').length;
    }

    function getMaxCounnt() {
        return getCounntItems() - getCounntVisebleItem();
    }

    // ---  swipe ---

    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posFinal = 0;

    let trfRegExp = /[-0-9.]+(?=px)/;

    slider.addEventListener('mousedown', swipeStart);
    slider.addEventListener('touchstart', swipeStart);

    function getEvent(event) {
        // return evetn for touch or mouse to .clientX
        return event.type.search('touch') !== -1 ? event.touches[0] : event;
    }

    function swipeStart(event) {
        const sliderLine = slider.querySelector('.slider__line');

        let e = getEvent(event);

        posInit = posX1 = e.clientX; // first coordinate X axis

        sliderLine.style.transition = ''; // remove the smooth transition

        // отслеживать другие события на документе
        slider.addEventListener('touchmove', swipeAction);
        slider.addEventListener('touchend', swipeEnd);
        slider.addEventListener('mousemove', swipeAction);
        slider.addEventListener('mouseup', swipeEnd);
        slider.addEventListener('mouseout', swipeEnd);
        slider.addEventListener('pointerout', swipeEnd);
    }

    function swipeAction(event) {
        const sliderLine = slider.querySelector('.slider__line');
        let e = getEvent(event);
        let style = sliderLine.style.transform || 'translateX(0px)';

        console.log(style)

        let transform = +style.match(trfRegExp)[0]; // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число

        posX2 = posX1 - e.clientX; // получаем разницу start и mouve

        posX1 = e.clientX; // текущее положение в x1

        sliderLine.style.transform = `translateX(${transform - posX2}px)`; // двигаем sliderLine
    }

    function swipeEnd() {
        // финальная позиция курсора
        posFinal = posInit - posX1;

        slider.removeEventListener('touchmove', swipeAction);
        slider.removeEventListener('mousemove', swipeAction);
        slider.removeEventListener('touchend', swipeEnd);
        slider.removeEventListener('mouseup', swipeEnd);
        slider.removeEventListener('mouseout', swipeEnd);

        slider.removeEventListener('pointerout', swipeEnd);

        if (Math.abs(posFinal) > getMaxCounnt()) {
            // убираем знак минус и сравниваем с порогом сдвига слайда
            if (posInit < posX1) {
                // если мы тянули вправо, то уменьшаем номер текущего слайда
                --counnt; // если мы тянули влево, то увеличиваем номер текущего слайда
            } else if (posInit > posX1) {
                ++counnt;
            }
        }

        // если курсор двигался, то запускаем функцию переключения слайдов
        if (posInit !== posX1) {
        }

        mouveLine(counnt);
    }
    // --- /swipe ---

    function getWidthItem() {
        const cell = slider.querySelector('.silder__cell');
        return cell.getBoundingClientRect().width;
    }

    function getGap() {
        const styleSlider = getComputedStyle(slider);
        return styleSlider.getPropertyValue('--slider-gap').trim();
    }

    // --- move ---


    function getCounntVisebleItem() {
        const styleSlider = getComputedStyle(slider);
        return styleSlider.getPropertyValue('--slider-count-card').trim();
    }


    function getWidthShift() {
        return (getWidthItem() + parseInt(getGap()));
    }

    function mouveLine(num) {
        console.log(`mouveLine(${num})`)
        checkCounnt();
        if (num < 0) {
            num = getCounntItems();
        }

        if (num > getCounntItems()) {
            num = 0;
        }

        const sliderLine = slider.querySelector('.slider__line');

        sliderLine.style.transform = `translateX(-${getWidthShift() * num}px)`;
        activeDot(num);
        counnt = num;
    }

    function left() {
        console.log('fun left() counnt = ', counnt)
        mouveLine(--counnt);
    }

    function right() {
        console.log('fun right() counnt = ', counnt)
        mouveLine(++counnt);
    }

    // --- /move ---

    // --- resize

    function resetSize() {
        console.log('resetSize()')
        setWidthCard();
    }

    function debounce(func, delay) {
        let timeoutId;

        return function(...arg) {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func(...arg)
            }, delay)
        }
    }

    const debouncedResizeHandler = debounce(resetSize, 300);

    // --- /resize

    function setWidthCard() {
        slider.style.setProperty('--width-card', `${getWidthItem()}px`);
    }

    async function getData(url) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error(`Error : ${res.status}`);
            }

        } catch (error) {
            console.error(error);
        }
    }

    async function renderCards(arrDataCards, parentBlock) {
        parentBlock.innerHTML = "";

        arrDataCards.forEach(data => {

            const element = document.createElement('li');

            element.classList.add('slider__item');

            element.innerHTML = `
                <article class="card" draggable="false">
                    <hr />
                    <a href="product-page.html">
                        <div class="card__img-wrap">
                            <picture>
                                <source
                                    type="image/webp"
                                    srcset="
                                        ${data.src}.webp    1x,
                                        ${data.src}@2x.webp 2x,
                                        ${data.src}@3x.webp 3x,
                                        ${data.src}@4x.webp 4x
                                    "
                                />
                                <img
                                    class="@@class-name"
                                    width="@@width"
                                    height="@@height"
                                    src="${data.src}.png"
                                    srcset="
                                        ${data.src}@2x.png 2x,
                                        ${data.src}@3x.png 3x,
                                        ${data.src}@4x.png 4x
                                    "
                                    alt=${data.alt};
                                />
                            </picture>
                        </div>

                        <div class="card__block-text">
                            <h3 class="card__prod-name">${data.nameProduct}</h3>
                            <p class="card__prod-state">${data.state}</p>
                            <div class="">
                                <p class="card__prod-parce">${data.price} $</p>
                                <p class="card__prod-quantity">${data.unit} unit</p>
                            </div>
                        </div>
                    </a>
                    
                    <button class="card__btn-compare button button-round button_round button_theme_dark">
                        <svg class="button-round__img" width="16" height="16">
                            <use xlink:href="#comparison"></use>
                        </svg>
                    </button>

                    <button class="button button-round button_round button_theme_dark card__btn" type="button">
                        <svg class="button-round__img phone" width="16" height="16">
                            <use xlink:href="#basket"></use>
                        </svg>
                    </button>
                
                </article>
            `;

            parentBlock.appendChild(element);
        });
    }

    // --- dots ---

    function createDots(slider) {
        const sliderItems = slider.querySelectorAll('.slider__item');
        const dotsList = slider.querySelector('.slider__dot-list');

        for (let index = 0; index < sliderItems.length; index++) {
            const dotWrap = document.createElement('li');
            const dot = document.createElement('div');

            dotWrap.classList.add('slider__dot-wrap');
            dot.classList.add('slider__dot');

            dotWrap.setAttribute('data-cunt', index);

            dotWrap.addEventListener('click', () => {
                counnt = index;

                activeDot(counnt);

                if (counnt <= getCounntItems() - getCounntVisebleItem()) {
                    mouveLine(counnt);
                } else {
                }
            });

            dotsList.append(dotWrap);
            dotWrap.append(dot);
        }

        activeDot(counnt);
    }

    function activeDot(num) {
        const dots = slider.querySelectorAll('.slider__dot');

        dots.forEach(item => {
            item.classList.remove('slider__dot--active');
        });

        dots[+num].classList.add('slider__dot--active');
    }

    // --- /dots ---
}





//function getSizeCard() {
//    const cell = document.querySelector('.silder__cell');
//    const width = cell.getBoundingClientRect().width;
//    return width
//
//}

///////////////////////////////////////////////////////////////////////








//const slider = sliderblock.querySelector('.slider__viewport');
//const sliderLine = sliderblock.querySelector('.slider__line');
//const sliderItems = sliderblock.querySelectorAll('.slider__item');
//------------------------------------------------------------
//const bntLeft = sliderblock.querySelector('.slider__btn-left');
//const bntRight = sliderblock.querySelector('.slider__btn-right');
//------------------------------------------------------------
//const dotsList = sliderblock.querySelector('.slider__dot-list');
//------------------------------------------------------------

//const debouncedResizeHandler = debounce(resetSize, 300);
//
//let counnt = Math.round(getCounntItems() / 2);
//
//// --- main ---
//
////createDots();
//
////resetSize();
//
//window.addEventListener('resize', debouncedResizeHandler);
//
//bntLeft.addEventListener('click', () => {
//    left();
//});
//
//bntRight.addEventListener('click', () => {
//    right();
//});
//
//// --- main ---
//
//// --- functions ---
//
//
//function getWidthSlider() {
//    return slider.clientWidth;
//}
//
//function getWidthItem() {
//    return getWidthSlider() / getCounntVisebleItem();
//}
//
//function getCounntItems() {
//    return sliderItems.length;
//}
//
//function getMaxCounnt() {
//    return getCounntItems() - getCounntVisebleItem();
//}
//
//function resetSize() {
//    setWidthItems();
//    mouveLine(counnt);
//}
//
//function setWidthItems() {
//    const slideWidth = `${getWidthSlider() / getCounntVisebleItem() - calcGap()}px`;
//
//    sliderItems.forEach(item => {
//        // mouve all slids and set size
//        item.style.width = slideWidth;
//    });
//}
//
//function getGap() {
//    return parseInt(window.getComputedStyle(sliderLine).gap);
//}
//
//function calcGap() {
//    let gap = parseInt(window.getComputedStyle(sliderLine).gap);
//    return (gap * (getCounntVisebleItem() - 1)) / getCounntVisebleItem();
//}
//
//function getCounntVisebleItem() {
//    let counntVisebleItem = 1;
//    let width = getWidthSlider();
//
//    switch (true) {
//        case width >= 1440:
//            counntVisebleItem = 4;
//            break;
//        case width >= 1024:
//            counntVisebleItem = 4;
//            break;
//        case width >= 992:
//            counntVisebleItem = 4;
//            break;
//        case width >= 768:
//            counntVisebleItem = 3;
//            break;
//        case width >= 425:
//            counntVisebleItem = 2;
//            break;
//        case width >= 375:
//            counntVisebleItem = 1;
//            break;
//        case width >= 325:
//            counntVisebleItem = 1;
//            break;
//    }
//
//    return counntVisebleItem;
//}
//
//// --- mouve ---
//
//function mouveLine(num) {
//    //------- no break point mouve -----------
//    if (num < 0) {
//        num = getMaxCounnt();
//    }
//
//    if (num > getMaxCounnt()) {
//        num = 0;
//    }
//
//    //------- /no break point mouve -----------
//
//    sliderLine.style.transform = `translateX(-${(getWidthItem() + getGap() / getCounntVisebleItem()) * num}px)`;
//
//    activeDot(num);
//    counnt = num;
//}
//
//function left() {
//    mouveLine(--counnt);
//}
//
//function right() {
//    mouveLine(++counnt);
//}
//
//// --- /mouve ---
//
//// ---  swipe ---
//
//let posInit = 0;
//let posX1 = 0;
//let posX2 = 0;
//let posFinal = 0;
//
//let trfRegExp = /[-0-9.]+(?=px)/;
//
//slider.addEventListener('mousedown', swipeStart);
//slider.addEventListener('touchstart', swipeStart);
//
//function getEvent(event) {
//    // return evetn for touch or mouse to .clientX
//    return event.type.search('touch') !== -1 ? event.touches[0] : event;
//}
//
//function swipeStart(event) {
//    let e = getEvent(event);
//    posInit = posX1 = e.clientX; // first coordinate X axis
//
//    sliderLine.style.transition = ''; // remove the smooth transition
//
//    // отслеживать другие события на документе
//    slider.addEventListener('touchmove', swipeAction);
//    slider.addEventListener('touchend', swipeEnd);
//    slider.addEventListener('mousemove', swipeAction);
//    slider.addEventListener('mouseup', swipeEnd);
//    slider.addEventListener('mouseout', swipeEnd);
//    slider.addEventListener('pointerout', swipeEnd);
//}
//
//function swipeAction(event) {
//    let e = getEvent(event);
//    let style = sliderLine.style.transform; // получаем занчение transform в формате 'translateX(0px)'
//    let transform = +style.match(trfRegExp)[0]; // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
//
//    posX2 = posX1 - e.clientX; // получаем разницу start и mouve
//
//    posX1 = e.clientX; // текущее положение в x1
//
//    sliderLine.style.transform = `translateX(${transform - posX2}px)`; // двигаем sliderLine
//}
//
//function swipeEnd() {
//    // финальная позиция курсора
//    posFinal = posInit - posX1;
//
//    slider.removeEventListener('touchmove', swipeAction);
//    slider.removeEventListener('mousemove', swipeAction);
//    slider.removeEventListener('touchend', swipeEnd);
//    slider.removeEventListener('mouseup', swipeEnd);
//    slider.removeEventListener('mouseout', swipeEnd);
//
//    slider.removeEventListener('pointerout', swipeEnd);
//
//    if (Math.abs(posFinal) > getMaxCounnt()) {
//        // убираем знак минус и сравниваем с порогом сдвига слайда
//        if (posInit < posX1) {
//            // если мы тянули вправо, то уменьшаем номер текущего слайда
//            --counnt; // если мы тянули влево, то увеличиваем номер текущего слайда
//        } else if (posInit > posX1) {
//            ++counnt;
//        }
//    }
//
//    // если курсор двигался, то запускаем функцию переключения слайдов
//    if (posInit !== posX1) {
//    }
//
//    mouveLine(counnt);
//}
//
//// --- /swipe ---
//
//
//// --- /functions ---
//
//
//
//
//function initSlider(sliderblock) {
//
//
//}
