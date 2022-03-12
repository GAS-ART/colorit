'use strict';

//import * as gasArt from './modules/functions.js';
// console.log(gasArt.block());

//import { isWebp } from './modules/functions.js';

//isWebp();
import './modules/sliders.js';


window.onload = function () {



   document.addEventListener('click', documentActions);

   //меню бургер
   const menuBody = document.querySelector('.header__burger');
   const burger = document.querySelector('.header__icon-menu');
   burger.addEventListener('click', (e) => {
      burger.classList.toggle('open');
      menuBody.classList.toggle('active');
      e.preventDefault;
   });


   // переключения языков для устройств без мыши

   const languageBtn = document.querySelector('.language-btn');
   // const languageLink = document.querySelectorAll('.language-btn__select > a');
   languageBtn.addEventListener('click', function (e) {
      if (window.matchMedia("(pointer: coarse)").matches) { // Устройства со стилусом
         if (!languageBtn.classList.contains('active')) {
            e.preventDefault()
         }
         languageBtn.classList.toggle('active');
      }
   });

   //Смена картинок при наведени на пункты меню
   const imgLinkBtn = document.querySelector(".service-menu__img-link");
   const menuLink = document.querySelectorAll(".menu-service__item-link");
   const serviceImage = document.querySelectorAll(".service-menu__img");
   const shadowText = document.querySelector('.service-menu__shadow-text');
   const shadowTextMobile = document.querySelector('.service-menu__shadow-text-mobile');
   if (menuLink) {
      menuLink.forEach((link) => {
         if (window.matchMedia("(pointer: fine)").matches) {
            link.addEventListener('mouseover', function (e) {
               let targetImg = e.target.dataset.img;
               let targetText = e.target.innerText;
               serviceImage.forEach((img) => {
                  img.classList.remove("active");
                  if (img.dataset.img == targetImg) {
                     img.classList.add("active");
                     shadowText.textContent = targetText;
                  }
               })
            });
         } else if (window.matchMedia("(pointer: coarse)").matches) {
            link.addEventListener("click", function (e) {
               let targetImg = e.target.dataset.img;
               let targetLink = e.target.dataset.link;
               let targetText = e.target.innerText;
               serviceImage.forEach((img) => {
                  img.classList.remove("active");
                  if (img.dataset.img == targetImg) {
                     img.classList.add("active");
                     imgLinkBtn.setAttribute('href', targetLink);
                     shadowTextMobile.textContent = targetText;
                  }
               })
               e.preventDefault();
            });
         }
      });
   }

   //бегущая строка
   function animationBanerText() {
      let screenWidth = 0;
      let textWidth = 0;
      let spanQuantity = 0;
      let banerWidth = 0;
      const baner = document.querySelector('.baner');
      const banerStart = document.querySelector('.baner__start');
      const banerSpanStart = '<span class="baner__start">агентство эффективной рекламы</span>';
      screenWidth = document.documentElement.clientWidth
      textWidth = baner.clientWidth;
      spanQuantity = Math.ceil(screenWidth / textWidth);
      if (spanQuantity > 1) {
         banerWidth = spanQuantity * textWidth + textWidth + 10;
      } else {
         banerWidth = (spanQuantity + 1) * textWidth + textWidth;
      }
      baner.style.width = banerWidth + "px";
      for (let i = 0; i < spanQuantity; i++) {
         banerStart.insertAdjacentHTML('afterEnd', banerSpanStart);
      }

      document.querySelectorAll('.baner__start').forEach((item) => {
         item.animate([
            { transform: 'translate(0, 0)' },
            { transform: 'translate(-' + `${(textWidth)}` + 'px, 0)' }
         ], {
            duration: 10000,
            iterations: Infinity
         })
      });
   }
   animationBanerText();

   //Цвет логотипов компаний при наведении
   const logosBlack = document.querySelectorAll('.black-image > img');

   logosBlack.forEach((logo) => {
      logo.addEventListener('mouseover', function (e) {
         e.target.closest('.black-image').nextElementSibling.firstElementChild.classList.add('active');
      });
   });

   logosBlack.forEach((logo) => {
      logo.addEventListener('mouseout', function (e) {
         e.target.closest('.black-image').nextElementSibling.firstElementChild.classList.remove('active');
      });
   });

   //popup
   const body = document.querySelector('#body');
   const popupBtn = document.querySelectorAll('.popup-btn');
   const popup = document.querySelector('.popup');
   const popupClose = document.querySelectorAll('.popup__close');
   const confitmBtn = document.querySelector('.confirm-button');

   popupBtn.forEach((item) => {
      item.addEventListener('click', function (e) {
         e.preventDefault();
         popup.classList.add('open');
         body.classList.add('lock');
      });
   });
   popupClose.forEach((item) => {
      item.addEventListener('click', function (e) {
         e.preventDefault();
         closePopup(e.target.closest('.popup'));
      });
   });
   confitmBtn.addEventListener('click', function () {
      closePopup(popup);
   })
   function closePopup(popup) {
      popup.classList.remove('open');
      popup.classList.remove('send');
      body.classList.remove('lock');
      $(".email-error").html('');
      $(".name-error").html('');
      $(".phone-error").html('');
      $(".file-error").html('');
      $(".service-error").html('');
   }

   function documentActions(e) {
      //убираем меню бургер
      if (!e.target.closest('.header__burger') && !e.target.classList.contains('header__icon-menu')) {
         menuBody.classList.remove('active');
         burger.classList.remove('open');
      }

      //Убираем отображение языков
      if (!e.target.closest('.language-btn')) {
         languageBtn.classList.remove('active');
      }
      //Убираем popup
      if (!e.target.closest('.popup__content') && !e.target.classList.contains('popup-btn')) {
         closePopup(popup);
      }
   }

   //Фиксация header
   const headerElement = document.querySelector('.header');

   const headerObserver = new IntersectionObserver(watchHeader);
   headerObserver.observe(headerElement);

   function watchHeader(entries) {
      if (entries[0].isIntersecting) {
         entries[0].target.classList.remove('_scroll')
      } else {
         entries[0].target.classList.add('_scroll')
      }
   }

   //Стилизация Select
   $('.select-form').select2({
      placeholder: 'Выберету услугу',
      minimumResultsForSearch: -1,
   });

   // Отпарвка данных из формы
   $("#bookingform").submit(function (event) {
      event.preventDefault();
      $.ajax({
         type: 'POST',
         url: 'http://127.0.0.1:8000/feedback',
         data: new FormData(this),
         contentType: false,
         cache: false,
         processData: false,
         success: function () {
            $(".email-error").html('');
            $(".name-error").html('');
            $(".phone-error").html('');
            $(".file-error").html('');
            $(".service-error").html('');
            $(".popup").addClass("send");
            const formBooking = document.querySelector('#bookingform');
            formBooking.reset();
            $(".select-form").select2("destroy");
            $('.select-form').select2({
               placeholder: 'Выберету услугу',
               minimumResultsForSearch: -1,
            });
         },
         error: function (err) {
            if (err.responseJSON.errors?.email) {
               $(".email-error").html(err.responseJSON.errors.email[0]);
            } else {
               $(".email-error").html('');
            }
            if (err.responseJSON.errors?.name) {
               $(".name-error").html(err.responseJSON.errors.name[0]);
            } else {
               $(".name-error").html('');
            }
            if (err.responseJSON.errors?.phone) {
               $(".phone-error").html(err.responseJSON.errors.phone[0]);
            } else {
               $(".phone-error").html('');;
            }
            if (err.responseJSON.errors?.filename) {
               $(".file-error").html(err.responseJSON.errors.filename[0]);
            } else {
               $(".file-error").html('');
            }
            if (err.responseJSON.errors?.service) {
               $(".service-error").html(err.responseJSON.errors.service[0]);
            } else {
               $(".service-error").html('');
            }
         }
      });
   });

}