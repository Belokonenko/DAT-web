"use strict";

import order from '../../blocks/order/order';
import buttonBurger from '../../blocks/button-burger/button-burger';
import sliders from '../../blocks/slider/slider';
import seeds from '../../blocks/seeds/seeds';
import navProd from '../../blocks/nav-prod/navProd';
import scrollToTop from '../../blocks/scrollToTop/scrollToTop';
import modal from '../../blocks/modal/modal';
import modalBasket from '../../blocks/modal-basket/modal-basket';
import modalLogin from '../../blocks/modal-login/modalLogin';

import maskPhone from "../../blocks/maskPhone/maskPhone";
// import validateName from "../../blocks/registration-content";
// import validatePassword from "./modules/validatePassword";
// import validateAllFilds from "./modules/validateAllFilds";
// import validateEmail from "./modules/validateMail";
// import validatePasswordConfirm from "./modules/validatePasswordConfirm";

document.addEventListener("DOMContentLoaded", () => {

    order();
    buttonBurger('dropdown-panel');
    sliders();
    seeds();
    navProd();
    scrollToTop();
    modal('.modal-login', '.btn-open-modal', '.modal-login__btn-close');
    modal('.modal-basket', '.btn-modal-basket', '.modal-basket__btn-close');
    modalLogin();
    modalBasket();
    
    //---
    maskPhone();
    validateEmail("email");
    // validateName("name");
    // validateName("surname");
    // validatePassword("password");
    // validatePasswordConfirm("password", "confirm-password");
    // validateAllFilds();
});
