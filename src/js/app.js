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




