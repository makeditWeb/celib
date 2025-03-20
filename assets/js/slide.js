document.addEventListener('DOMContentLoaded', function() {
    // PC 버전 룸 스와이퍼
    const roomSwiper = new Swiper(".roomSwiper", {
        slidesPerView: 1.1,
        spaceBetween: 16,
        pagination: {
            el: ".roomSwiper .swiper-pagination",
            type: "progressbar"
        },
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        breakpoints: {
            768: {
                slidesPerView: 1.1,
                spaceBetween: 16
            },
            // 데스크톱
            1024: {
                slidesPerView: 1.1,
                spaceBetween: 16
            }
        },
    });

    // 모바일 버전 룸 스와이퍼
    const roomMobileSwiper = new Swiper(".roomMobileSwiper", {
        slidesPerView: 1.2,
        spaceBetween: 10,
        pagination: {
            el: ".roomMobileSwiper .swiper-pagination",
            type: "progressbar"
        },
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        width: null,
        touchReleaseOnEdges: true,
        touchMoveStopPropagation: true
    });
    
    // 공간 스와이퍼 - 수정됨
    const spaceSwiper = new Swiper(".spaceSwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        pagination: {
            el: ".spaceSwiper .swiper-pagination",
            type: "progressbar"
        },
        watchSlidesProgress: true,
        observer: true,
        observeParents: true,
        touchReleaseOnEdges: true,
        // 화면 크기별 설정
        breakpoints: {
            // 모바일
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // 태블릿
            768: {
                slidesPerView: 1,
                spaceBetween: 16
            },
            // 데스크톱
            1024: {
                slidesPerView: 1.1,
                spaceBetween: 16
            }
        },
        // 슬라이드 전환 후 높이 재계산
        on: {
            slideChangeTransitionEnd: function() {
                this.update();
            }
        }
    });

    // 기타 스와이퍼 설정
    const swiper = new Swiper(".staySwiper", {
        slidesPerView: 1.6,
        spaceBetween: 10,
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        breakpoints: {
            768: {
                slidesPerView: 1.6,
                spaceBetween: 10
            },
            1024:{
                slidesPerView: 3.2,
                spaceBetween: 15
            }
        }
    });

    const locationSwiper = new Swiper('.location-swiper', {
        slidesPerView: 1,          // 한 번에 하나의 슬라이드만 표시
        spaceBetween: 0,           // 슬라이드 간 간격 없음
        centeredSlides: true,       // 활성 슬라이드 중앙 정렬
        initialSlide: 0,            // 첫 번째 슬라이드로 시작
        loop: false,                // 루프 비활성화
        pagination: {
            el: '.location-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.location-button-next',
            prevEl: '.location-button-prev',
        },
        effect: 'cards',            // 카드 효과 사용
        cardsEffect: {
            slideShadows: false,    // 그림자 없음
            rotate: false,          // 회전 없음
            perSlideOffset: 8,      // 다음 카드의 간격
        },
        speed: 600,
        on: {
            init: function() {
                // 페이지네이션 수정 - 슬라이드가 2개만 있으면 페이지네이션도 2개만 표시
                setTimeout(() => {
                    const paginationBullets = document.querySelectorAll('.location-pagination .swiper-pagination-bullet');
                    const slidesCount = document.querySelectorAll('.location-swiper .swiper-slide').length;
                    
                    // 필요한 경우 과도한 페이지네이션 제거
                    if (paginationBullets.length > slidesCount) {
                        for (let i = slidesCount; i < paginationBullets.length; i++) {
                            if (paginationBullets[i]) {
                                paginationBullets[i].style.display = 'none';
                            }
                        }
                    }
                }, 100);
            }
        }
    });

    // gadi slide
    const unitASwiper = new Swiper('.unitASwiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        
        // Navigation arrows
        navigation: {
          nextEl: '.unitASwiper .swiper-button-next',
          prevEl: '.unitASwiper .swiper-button-prev',
        },
        
        // Custom pagination format to show "current/total"
        pagination: {
          el: '.unitASwiper .swiper-pagination',
          type: 'fraction',
          formatFractionCurrent: function(number) {
            return number;
          },
          formatFractionTotal: function(number) {
            return number;
          },
          renderFraction: function(currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                   '/' +
                   '<span class="' + totalClass + '"></span>';
          }
        },
        
        // Enable keyboard control
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });
      
      // Initialize Swiper for Unit B
      const unitBSwiper = new Swiper('.unitBSwiper', {
        // Optional parameters
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        
        // Navigation arrows
        navigation: {
          nextEl: '.unitBSwiper .swiper-button-next',
          prevEl: '.unitBSwiper .swiper-button-prev',
        },
        
        // Custom pagination format to show "current/total"
        pagination: {
          el: '.unitBSwiper .swiper-pagination',
          type: 'fraction',
          formatFractionCurrent: function(number) {
            return number;
          },
          formatFractionTotal: function(number) {
            return number;
          },
          renderFraction: function(currentClass, totalClass) {
            return '<span class="' + currentClass + '"></span>' +
                   '/' +
                   '<span class="' + totalClass + '"></span>';
          }
        },
        
        // Enable keyboard control
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },
      });
      
      // Additional event listeners can be added here if needed
      
      // Example: pause autoplay when hovering over slides
      const swiperContainers = document.querySelectorAll('.swiper');
      swiperContainers.forEach(container => {
        container.addEventListener('mouseenter', function() {
          const swiperId = this.classList.contains('unitASwiper') ? unitASwiper : unitBSwiper;
          if (swiperId.autoplay && swiperId.autoplay.running) {
            swiperId.autoplay.stop();
          }
        });
        
        container.addEventListener('mouseleave', function() {
          const swiperId = this.classList.contains('unitASwiper') ? unitASwiper : unitBSwiper;
          if (swiperId.autoplay && !swiperId.autoplay.running) {
            swiperId.autoplay.start();
          }
        });
      });
    
});

