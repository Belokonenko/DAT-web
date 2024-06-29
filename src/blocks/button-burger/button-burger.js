export default function buttonBurger(nameDropPanel) {
  const buttonBurger = document.querySelector('.button-burger');

  if (buttonBurger) {
    buttonBurger.addEventListener('click', () => {
      buttonBurger.classList.toggle('button-burger_active');

      const dropdownPanel = document.querySelector(`.${nameDropPanel}`);
      if (dropdownPanel) {
        dropdownPanel.classList.toggle(`${nameDropPanel}_active`);
      }
    });
  }
}
