export const tab3w = () => {
    const slides = document.querySelectorAll('.main-slide .slide');
    const thumbnails = document.querySelectorAll('.thumbnail-container .thumbnail');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentIndex = 0;

    const updateSlider = index => {
        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });
        thumbnails.forEach((thumbnail, idx) => {
            thumbnail.classList.toggle('active', idx === index);
        });
    };

    thumbnails.forEach((thumbnail, idx) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = idx;
            updateSlider(currentIndex);
        });
    });

    prevButton.addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateSlider(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
        updateSlider(currentIndex);
    });

    window.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });

    // let startX;

    // document.querySelector(".main-slide").addEventListener("touchstart", (e) => {
    //     startX = e.touches[0].clientX;
    // });

    // document.querySelector(".main-slide").addEventListener("touchend", (e) => {
    //     const endX = e.changedTouches[0].clientX;
    //     if (startX > endX + 50) {
    //         nextButton.click();
    //     } else if (startX < endX - 50) {
    //         prevButton.click();
    //     }
    // });
    //
    //
};
