document.addEventListener('DOMContentLoaded', function() {
    // PC 버전 룸 스와이퍼
    const roomSwiper = new Swiper(".roomSwiper", {
        slidesPerView: "auto",
        spaceBetween: 16,
        pagination: {
            el: ".roomSwiper .swiper-pagination",
            type: "progressbar"
        },
        watchSlidesProgress: true,
        observer: true,
        observeParents: true
    });

    // 모바일 버전 룸 스와이퍼
    const roomMobileSwiper = new Swiper(".roomMobileSwiper", {
        slidesPerView: 1,
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
                spaceBetween: 20
            },
            // 데스크톱
            1024: {
                slidesPerView: 1,
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
        slidesPerView: 1.07,
        spaceBetween: -280,
        centeredSlides: false,
        pagination: {
            el: '.location-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.location-button-next',
            prevEl: '.location-button-prev',
        },
        effect: 'slide',
        speed: 600,
    });
});