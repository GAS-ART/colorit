function initSliders() {
   // Перечень слайдеров
   if (document.querySelector('.swiper')) {
      new Swiper('.swiper', {
         // Подключаем модули слайдера
         // для конкретного случая
         //modules: [Navigation, Pagination],
         /*
         effect: 'fade',
         autoplay: {
            delay: 3000,
            disableOnInteraction: false,
         },
         */
         observer: true,
         observeParents: true,
         slidesPerView: 6,
         slidesPerGroup: 1,
         slidesPerColumn: 1,
         spaceBetween: 120.5,
         //  autoHeight: true,
         speed: 800,
         //touchRatio: 1,
         simulateTouch: true,
         //loop: true,
         //preloadImages: false,
         //lazy: true,
         // Dotts
         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
         // Arrows
         navigation: {
            nextEl: '.swiper-button-prev',
            prevEl: '.swiper-button-next',
         },

         breakpoints: {
            320: {
               slidesPerView: 4,
               spaceBetween: 20,
               //     autoHeight: true,
            },
            768: {
               slidesPerView: 4,
               spaceBetween: 20,
            },
            992: {
               slidesPerView: 4,
               spaceBetween: 40,
            },
            1300: {
               slidesPerView: 5,
            },
            1700: {
               slidesPerView: 6,
               spaceBetween: 120.5,
            },
         },

      });
   }
}



window.addEventListener("load", function (e) {
   // Запуск инициализации слайдеров
   initSliders();

   /*   const prevBtn = document.querySelector('.swiper-button-prev');
      const nextBtn = document.querySelector('.swiper-button-next');
   
   
      prevBtn.addEventListener('click', () => {
         let slideActive = document.querySelector('.swiper-slide-prev');
         slideActive.classList.add('prev');
      });
      nextBtn.addEventListener('click', () => {
         let slideActive = document.querySelector('.swiper-slide-prev');
         slideActive.classList.remove('prev');
      });*/
   // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
   //initSlidersScroll();
});