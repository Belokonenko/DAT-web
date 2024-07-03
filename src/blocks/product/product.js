export const productTab = () => {

    const tabsParent = document.querySelector(".product__tabs-btn-block");
    const tabs = document.querySelectorAll(".product__tabs-btn");

    const tabContent = document.querySelectorAll(".product__tabs-content");



    const hideTabContent = () => {
        tabContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach((item) => {
            item.classList.remove("product__tabs-btn_active");
        });
    };

    const showTabContent = (i = 0) => {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add("product__tabs-btn_active");
    };

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener("click", (event) => {
        const target = event.target;

        if (target && target.classList.contains("product__tabs-btn")) {
            tabs.forEach((item, i) => {

                console.log(`target = ${target}`);
                console.log(`item = ${item}`);
                if (target == item) { // <<< 
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
};
