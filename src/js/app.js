'use strict';

//import * as gasArt from './modules/functions.js';
// console.log(gasArt.block());

//import { isWebp } from './modules/functions.js';

//isWebp();


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
   languageBtn.addEventListener('click', function () {
      if (window.matchMedia("(pointer: coarse)").matches) { // Устройства со стилусом
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
   }

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

}




