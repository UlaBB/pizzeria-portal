
/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

// const { active } = require("browser-sync");

// const { utils } = require("stylelint");

{
  'use strict';

  const select = {
    templateOf: {
      menuProduct: '#template-menu-product',
    },
    containerOf: {
      menu: '#product-list',
      cart: '#cart',
    },
    all: {
      menuProducts: '#product-list > .product',
      menuProductsActive: '#product-list > .product.active',
      formInputs: 'input, select',
    },
    menuProduct: {
      clickable: '.product__header',
      form: '.product__order',
      priceElem: '.product__total-price .price',
      imageWrapper: '.product__images',
      amountWidget: '.widget-amount',
      cartButton: '[href="#add-to-cart"]',
    },
    widgets: {
      amount: {
        input: 'input[name="amount"]',
        linkDecrease: 'a[href="#less"]',
        linkIncrease: 'a[href="#more"]',
      },
    },
  };

  const classNames = {
    menuProduct: {
      wrapperActive: 'active',
      imageVisible: 'active',
    },
  };

  const settings = {
    amountWidget: {
      defaultValue: 1,
      defaultMin: 1,
      defaultMax: 9,
    }
  };

  const templates = {
    menuProduct: Handlebars.compile(document.querySelector(select.templateOf.menuProduct).innerHTML),
  };

  class Product {
    constructor(id, data) {
      const thisProduct = this;

      thisProduct.id = id;
      thisProduct.data = data;

      thisProduct.renderInMenu();
      thisProduct.getElements();
      thisProduct.initAccordion();
      thisProduct.initOrderForm();
      thisProduct.processOrder();

      // console.log('new Product', thisProduct);
    }

    renderInMenu() {

      const thisProduct = this;

      /* generate HTML from template*/

      const generateHTML = templates.menuProduct(thisProduct.data);

      /* create elements from utils.*/
      thisProduct.element = utils.createDOMFromHTML(generateHTML);

      /* find meny container*/
      const menuContainer = document.querySelector(select.containerOf.menu);

      /* add element to menu*/
      menuContainer.appendChild(thisProduct.element);
    }

    getElements() {
      const thisProduct = this;

      thisProduct.accordionTrigger = thisProduct.element.querySelector(select.menuProduct.clickable);
      thisProduct.form = thisProduct.element.querySelector(select.menuProduct.form);// formularz dodatków
      thisProduct.formInputs = thisProduct.form.querySelectorAll(select.all.formInputs); // do zaznaczania okienka
      thisProduct.cartButton = thisProduct.element.querySelector(select.menuProduct.cartButton);// buton dodaj do karty
      thisProduct.priceElem = thisProduct.element.querySelector(select.menuProduct.priceElem);// suma kasy
    }

    initAccordion() {
      const thisProduct = this;

      /* find the clickable trigger (the element that should react to clicking) */
      const clickableTrigger = thisProduct.accordionTrigger;
      // console.log('clickableTrigger:', clickableTrigger);

      /* START: click event listener to trigger */

      clickableTrigger.addEventListener('click', function (event) {
        console.log('clicked');

        /* prevent default action for event */
        event.preventDefault();

        /* toggle active class on element of thisProduct */
        thisProduct.element.classList.toggle(classNames.menuProduct.wrapperActive);// dodanie lub oderbanie klasy active

        /* find all active products */

        const activeProducts = document.querySelectorAll(select.all.menuProducts);
        // console.log('activeProduct:', activeProducts);

        /* START LOOP: for each active product */
        for (let activeProduct of activeProducts) {


          /* START: if the active product isn't the element of thisProduct */
          if (activeProduct != thisProduct.element) {

            /* remove class active for the active product */
            activeProduct.classList.remove(classNames.menuProduct.wrapperActive);

            /* END: if the active product isn't the element of thisProduct */
          }
          /* END LOOP: for each active product */
        }

        /* END: click event listener to trigger */
      });
    }


    initOrderForm() {
      const thisProduct = this;

      thisProduct.form.addEventListener('submit', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

      for (let input of thisProduct.formInputs) {
        input.addEventListener('change', function () {
          thisProduct.processOrder();
        });
      }

      thisProduct.cartButton.addEventListener('click', function (event) {
        event.preventDefault();
        thisProduct.processOrder();
      });

    }

    processOrder() {

      const thisProduct = this;

      /* read all data from the form (using utils.serializeFormToObject) and save it to const formData */

      const formData = utils.serializeFormToObject(thisProduct.form);
      console.log('formData:', formData);// zwraca obiekt, klucze: np. sauce, wlasciwości [" tomato",..] i tp

      /* set variable price to equal thisProduct.data.price */
      let price = thisProduct.data.price;
      console.log('price:', price);

      /* START LOOP: for each paramId in thisProduct.data.params */

      for (let paramId in thisProduct.data.params) {
        console.log('paramId:', paramId);

        /* save the element in thisProduct.data.params with key paramId as const param */

        const param = thisProduct.data.params[paramId];
        console.log('param:', param);// uwzględnia wszystkie params z danego dania

        /* START LOOP: for each optionId in param.options */

        for (let optionId in param.options) {

          /* save the element in param.options with key optionId as const option */

          const option = param.options[optionId];
          console.log('option:', option);
          const optionSelected = formData.hasOwnProperty(paramId) && formData[paramId].indexOf(optionId) > -1;
          console.log(optionSelected);

          /* START IF: if option is selected and option is not default */
          if (optionSelected && !option.default) {

            /* add price of option to variable price */

            price += option.price;
            console.log(price);
            /* END IF: if option is selected and option is not default */
          }
          /* START ELSE IF: if option is not selected and option is default */
          else if (!optionSelected && option.default) {

            /* deduct price of option from price */
            price -= option.price;
            console.log(price);
            /* END ELSE IF: if option is not selected and option is default */
          }
          /* END LOOP: for each optionId in param.options */
        }
        /* END LOOP: for each paramId in thisProduct.data.params */
      }

      /* set the contents of thisProduct.priceElem to be the value of variable price */
      thisProduct.priceElem.innerHTML = price;

    }
  }
  const app = {
    //metoda pobierania danych z dataSource

    initData: function () {
      const thisApp = this;

      thisApp.data = dataSource;

    },

    initMenu: function () {

      const thisApp = this;
      console.log('thisApp.data:', thisApp.data);

      for (let productData in thisApp.data.products) {
        new Product(productData, thisApp.data.products[productData]);
      }
    },


    init: function () {
      const thisApp = this;
      console.log('*** App starting ***');
      console.log('thisApp:', thisApp);
      console.log('classNames:', classNames);
      console.log('settings:', settings);
      console.log('templates:', templates);


      thisApp.initData();
      thisApp.initMenu();
    },
  };

  app.init();
}


