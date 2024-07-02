'use strict';
import order from '../../blocks/order/order';
import buttonBurger from '../../blocks/button-burger/button-burger';
import sliders from '../../blocks/slider/slider';
import seeds from '../../blocks/seeds/seeds';
import navProd from '../../blocks/nav-prod/navProd';
import scrollToTop from '../../blocks/scrollToTop/scrollToTop';
import modal from '../../blocks/modal/modal';
import modalBasket from '../../blocks/modal-basket/modal-basket';
import customSelect from '../../blocks/custom-select/customSelect';
import quantity from '../../blocks/quantity/quantity';
import modalLogin from '../../blocks/modal-login/modalLogin';
import tabs from '../../blocks/tabs/tabs';
import { tab3w } from '../../blocks/tab-3w/tab-3w';

document.addEventListener('DOMContentLoaded', () => {
    order();
    buttonBurger('dropdown-panel');
    sliders();
    seeds();
    navProd();
    scrollToTop();
    modal('.modal-login', '.btn-open-modal', '.modal-login__btn-close');
    modal('.modal-basket', '.btn-modal-basket', '.modal-basket__btn-close');
    modalBasket();
    quantity();
    modalLogin();
    //---
    customSelect();
    tabs();
    //--
    tab3w();
});
