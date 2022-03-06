on: {
   init: function () {
      setTimeout(() => {
         const allSlides = document.querySelectorAll('.swiper-slide');
         let ActiveSlideIndex = Infinity;
         allSlides.forEach((slide, index) => {
            if (slide.classList.contains("swiper-slide-active")) {
               ActiveSlideIndex = index;
            }
            ActiveSlideIndex + 6 <= index ? slide.classList.add('shift') : slide.classList.remove('shift');
         })
      }, 10);
   },
   slideChangeTransitionEnd: function () {
      const allSlides = document.querySelectorAll('.swiper-slide');
      let prevSlide = true;
      let ActiveSlideIndex = Infinity;
      let lastPrev;
      let coordinatePrev;
      let coordinatePrevLeft;
      let halfSlide;
      allSlides.forEach((slide, index, arraySlides) => {
         if (slide.classList.contains("swiper-slide-active")) {
            lastPrev = arraySlides[index - 1]
            prevSlide = false;
            ActiveSlideIndex = index;
         }
         prevSlide ? slide.classList.add('prev') : slide.classList.remove('prev');
         if (slide.classList.contains("prev")) {
            coordinatePrev = arraySlides[index].getBoundingClientRect();
            coordinatePrevLeft = coordinatePrev.left;
            halfSlide = coordinatePrev.width / 2;

            if (coordinatePrevLeft <= 0) {
               console.log(halfSlide + (coordinatePrevLeft - coordinatePrevLeft));
               //console.log(halfSlide);
               slide.style.transform = 'translate(-' + `${(halfSlide + coordinatePrevLeft)}` + 'px, 0)';
            } else {
               slide.style.transform = 'translate(-' + `${(coordinatePrevLeft + halfSlide)}` + 'px, 0)';
            }
         } else {
            //    console.log(slide);
            //   slide.style.transform = 'translate(0, 0)';
         }
         ActiveSlideIndex + 6 <= index ? slide.classList.add('shift') : slide.classList.remove('shift');
      })
   },
}