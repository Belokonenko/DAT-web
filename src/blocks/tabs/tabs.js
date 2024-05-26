export default function tabs() {
    const tabsParent = document.querySelector('.tab__list');

    if (tabsParent) {
        const tabs = document.querySelectorAll('.tab__item');
        const tabContent = document.querySelectorAll('.tab__content');

        const accountTitle = document.querySelector('.account__title');

        const accountTabContent = document.querySelector('.account__tab-content');
        const contentTabs = document.querySelectorAll('.tab__item-cont');

        const hideTabContent = () => {
            tabContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });

            tabs.forEach(item => {
                item.classList.remove('account__tab-btn_active');
            });
        };

        const showTabContent = (i = 0) => {
            tabContent[i].classList.add('show', 'fade');
            tabContent[i].classList.remove('hide');
            tabs[i].classList.add('account__tab-btn_active');
        };

        const changeTitle = target => {
            accountTitle.textContent = '';
            accountTitle.textContent = target.innerText.trim();
        };

        // ---
        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', event => {
            const target = event.target;

            if (target && target.classList.contains('tab__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        changeTitle(target);
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

        accountTabContent.addEventListener('click', event => {
            const target = event.target;

            if (target && target.classList.contains('tab__item-cont')) {
                contentTabs.forEach((item, i) => {
                    if (target == item) {
                        changeTitle(target);
                        hideTabContent();
                        showTabContent(i + 1);
                    }
                });
            }
        });
    }
}
