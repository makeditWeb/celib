
// main room slide
document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".roomSwiper", {
        slidesPerView: 2.2,
        spaceBetween: 16,
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".spaceSwiper", {
        slidesPerView: 2.2,
        spaceBetween: 16,
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const swiper = new Swiper(".staySwiper", {
        slidesPerView: 3.2,
        spaceBetween: 30,
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
    });
});