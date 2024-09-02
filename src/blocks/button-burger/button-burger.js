export default function buttonBurger(nameDropPanel) {
  const buttonBurger = document.querySelector('.button-burger');

  if (buttonBurger) {
    buttonBurger.addEventListener('click', () => {
      buttonBurger.classList.toggle('button-burger_active');

      const dropdownPanel = document.querySelector(`.${nameDropPanel}`);
      if (dropdownPanel) {
        dropdownPanel.classList.toggle(`${nameDropPanel}_active`);

        const element = document.querySelector('body');

        if (element.style.overflow == 'hidden') {
          element.style.overflow = 'auto';
        } else {
          element.style.overflow = 'hidden';
        }
      }
    });
  }
}
