export default function novelties() {
    const sliderBlocs = document.querySelectorAll(".slider__block");

    if (sliderBlocs) {
        for (let index = 0; index < sliderBlocs.length; index++) {
            const element = sliderBlocs[index];
            initSlider(element);
        }
    }

    function initSlider(sliderblock) {
        const slider = sliderblock.querySelector(".slider");
        const sliderLine = sliderblock.querySelector(".slider__line");
        const sliderItems = sliderblock.querySelectorAll(".slider__item");
        //------------------------------------------------------------
        const bntLeft = sliderblock.querySelector(".slider__btn-left");
        const bntRight = sliderblock.querySelector(".slider__btn-right");
        //------------------------------------------------------------
        const dotsList = sliderblock.querySelector(".slider__dot-list");
        //------------------------------------------------------------
        let counnt = Math.round(getCounntItems() / 2);

        // --- main ---

        createDots();

        resetSize();

        window.addEventListener("resize", resetSize);

        bntLeft.addEventListener("click", () => {
            left();
        });

        bntRight.addEventListener("click", () => {
            right();
        });

        sliderItems.forEach((item) => {
            item.addEventListener("click", () => {});
        });

        // --- main ---

        // --- functions ---

        function getWidthSlider() {
            return slider.clientWidth;
        }

        function getWidthItem() {
            return getWidthSlider() / getCounntVisebleItem();
        }

        function getCounntItems() {
            return sliderItems.length;
        }

        function getMaxCounnt() {
            return getCounntItems() - getCounntVisebleItem();
        }

        function resetSize() {
            setWidthItems();
            mouveLine(counnt);
        }

        function setWidthItems() {
            const slideWidth = `${
                getWidthSlider() / getCounntVisebleItem() - calcGap()
            }px`;

            sliderItems.forEach((item) => {
                // mouve all slids and set size
                item.style.width = slideWidth;
            });
        }

        function getGap() {
            return parseInt(window.getComputedStyle(sliderLine).gap);
        }

        function calcGap() {
            let gap = parseInt(window.getComputedStyle(sliderLine).gap);
            return (
                (gap * (getCounntVisebleItem() - 1)) / getCounntVisebleItem()
            );
        }

        function getCounntVisebleItem() {
            let counntVisebleItem = 1;
            let width = getWidthSlider();

            switch (true) {
                case width >= 1440:
                    counntVisebleItem = 4;
                    break;
                case width >= 1024:
                    counntVisebleItem = 4;
                    break;
                case width >= 992:
                    counntVisebleItem = 3;
                    break;
                case width >= 768:
                    counntVisebleItem = 3;
                    break;
                case width >= 425:
                    counntVisebleItem = 2;
                    break;
                case width >= 375:
                    counntVisebleItem = 1;
                    break;
                case width >= 325:
                    counntVisebleItem = 1;
                    break;
            }

            return counntVisebleItem;
        }

        // --- mouve ---

        function mouveLine( num ) {
            //------- no break point mouve -----------
            if (num < 0) {
                num = getMaxCounnt();
            }

            if (num > getMaxCounnt()) {
                num = 0;
            }

            //------- /no break point mouve -----------

            sliderLine.style.transform = `translateX(-${
                (getWidthItem() + getGap() / getCounntVisebleItem()) * num
            }px)`;

            activeDot(num);
            counnt = num;
        }

        function left() {
            mouveLine(--counnt);
        }

        function right() {
            mouveLine(++counnt);
        }

        // --- /mouve ---

        // ---  swipe ---

        let posInit = 0;
        let posX1 = 0;
        let posX2 = 0;
        let posFinal = 0;

        let trfRegExp = /[-0-9.]+(?=px)/;

        slider.addEventListener("mousedown", swipeStart);
        slider.addEventListener("touchstart", swipeStart);

        function getEvent(event) {
            // return evetn for touch or mouse to .clientX
            return event.type.search("touch") !== -1 ? event.touches[0] : event;
        }

        function swipeStart(event) {
            let e = getEvent(event);
            posInit = posX1 = e.clientX; // first coordinate X axis

            sliderLine.style.transition = ""; // remove the smooth transition

            // отслеживать другие события на документе
            slider.addEventListener("touchmove", swipeAction);
            slider.addEventListener("touchend", swipeEnd);
            slider.addEventListener("mousemove", swipeAction);
            slider.addEventListener("mouseup", swipeEnd);
            slider.addEventListener("mouseout", swipeEnd);
            slider.addEventListener("pointerout", swipeEnd);
        }

        function swipeAction(event) {
            let e = getEvent(event);
            let style = sliderLine.style.transform; // получаем занчение transform в формате 'translateX(0px)'
            let transform = +style.match(trfRegExp)[0]; // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число

            posX2 = posX1 - e.clientX; // получаем разницу start и mouve

            posX1 = e.clientX; // текущее положение в x1

            sliderLine.style.transform = `translateX(${transform - posX2}px)`; // двигаем sliderLine
        }

        function swipeEnd() {
            // финальная позиция курсора
            posFinal = posInit - posX1;

            slider.removeEventListener("touchmove", swipeAction);
            slider.removeEventListener("mousemove", swipeAction);
            slider.removeEventListener("touchend", swipeEnd);
            slider.removeEventListener("mouseup", swipeEnd);
            slider.removeEventListener("mouseout", swipeEnd);

            slider.removeEventListener("pointerout", swipeEnd);

            if (Math.abs(posFinal) > getMaxCounnt()) {  // убираем знак минус и сравниваем с порогом сдвига слайда
                if (posInit < posX1) {                  // если мы тянули вправо, то уменьшаем номер текущего слайда
                    --counnt;                           // если мы тянули влево, то увеличиваем номер текущего слайда
                
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

        // --- dots ---

        function createDots() {
            for (let index = 0; index < sliderItems.length; index++) {
                const dotWrap = document.createElement("li");
                const dot = document.createElement("div");

                dotWrap.classList.add("slider__dot-wrap");
                dot.classList.add("slider__dot");

                dotWrap.setAttribute("data-cunt", index);

                dotWrap.addEventListener("click", () => {
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
            const dots = getDots();

            dots.forEach((item) => {
                item.classList.remove("slider__dot--active");
            });

            dots[num].classList.add("slider__dot--active");
        }

        function getDots() {
            return sliderblock.querySelectorAll(".slider__dot");
        }

        // --- /dots ---

        // --- /functions ---
    }
}
