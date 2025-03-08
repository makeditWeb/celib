document.addEventListener('DOMContentLoaded', function() {
    // Initialize PC Swiper - This will only be visible on desktop
    const roomSwiper = new Swiper(".roomSwiper", {
        slidesPerView: 2.2,
        spaceBetween: 16,
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: ".roomSwiper .swiper-pagination",
            type: "progressbar"
        },
    });

    // Initialize Mobile Swiper - This will only be visible on mobile
    const roomMobileSwiper = new Swiper(".roomMobileSwiper", {
        slidesPerView: 1.2,  // Show slightly more than 1 slide on mobile
        spaceBetween: 10,    // Less space between slides on mobile
        // loop: true,
        // autoplay: {
        //     delay: 3000,
        //     disableOnInteraction: false
        // },
        pagination: {
            el: ".roomMobileSwiper .swiper-pagination",
            type: "progressbar"
        },
    });
    
    // Initialize any other swipers like spaceSwiper if needed
    const spaceSwiper = new Swiper(".spaceSwiper", {
        slidesPerView: 2.2,
        spaceBetween: 16,
        pagination: {
            el: ".spaceSwiper .swiper-pagination",
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