'use strict';
import order from '../../blocks/order/order';
import buttonBurger from '../../blocks/button-burger/button-burger';
import slider from '../../blocks/slider/slider';
import seeds from '../../blocks/seeds/seeds';
import navProd from '../../blocks/nav-prod/navProd';
import scrollToTop from '../../blocks/scrollToTop/scrollToTop';
import modal from '../../blocks/modal/modal';
import modalBasket from '../../blocks/modal-basket/modal-basket';
import customSelect from '../../blocks/custom-select/customSelect';
import quantity from '../../blocks/quantity/quantity';
import modalLogin from '../../blocks/modal-login/modalLogin';
import tabs from '../../blocks/tabs/tabs';
import orderCallBackModal from '../../blocks/order-callback-modal/order-callback-modal';
import addProdCart from '../../blocks/card-prod/card-prod';

document.addEventListener('DOMContentLoaded', () => {
  order();
  buttonBurger('dropdown-panel');
  slider({ name: 'novelties', type: 'prod' });
  slider({ name: 'stock', type: 'prod' });
  slider({ name: 'partners', type: 'partners' });
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
  addProdCart();
  orderCallBackModal();
});
