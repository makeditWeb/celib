// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get ALL booking items (using querySelectorAll instead of querySelector)
    const bookingItems = document.querySelectorAll('.booking__items');
    const viewDetailsBtn = document.querySelector('.submit-btn');
    
    // Add click event listener to all booking items
    if (bookingItems && bookingItems.length > 0) {
        bookingItems.forEach(item => {
            item.addEventListener('click', function() {
                showBookingDetailPopup();
            });
        });
    }
    
    // Add click event listener to the View Booking Details button
    if (viewDetailsBtn) {
        viewDetailsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showBookingDetailPopup();
        });
    }
});

// Initialize Swiper for the popup content
function initializeDetailSwiper() {
    if (typeof Swiper === 'undefined') {
        console.error('Swiper is not defined. Make sure swiper-bundle.min.js is loaded properly.');
        return;
    }

    // Initialize detail swiper
    const detailSwiper = new Swiper('.detailSwiper', {
        direction: 'horizontal',
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 500,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
        on: {
            init: function() {
                console.log('Detail Swiper initialized in popup');
            },
        }
    });

    // Optional: Pause autoplay when hovering over the slider
    const swiperContainer = document.querySelector('.detailSwiper');
    if (swiperContainer) {
        swiperContainer.addEventListener('mouseenter', function() {
            detailSwiper.autoplay.stop();
        });
        
        swiperContainer.addEventListener('mouseleave', function() {
            detailSwiper.autoplay.start();
        });
    }

    return detailSwiper;
}

// Show booking detail popup
function showBookingDetailPopup() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay booking-detail-overlay';
    document.body.appendChild(overlay);
    
    // Close popup when clicking overlay
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeBookingDetailPopup();
        }
    });
    
    // Fetch the booking detail popup HTML
    fetch('../pages/booking_detail-pop.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load booking detail popup');
            }
            return response.text();
        })
        .then(html => {
            // Insert HTML directly into overlay
            overlay.innerHTML = html;
            
            // Find the popup element within the inserted HTML
            const popup = overlay.querySelector('.detail-popup');
            
            if (popup) {
                // Add event listeners to close buttons
                const closeButtons = overlay.querySelectorAll('.popup-close, .submit-btn');
                closeButtons.forEach(button => {
                    button.addEventListener('click', closeBookingDetailPopup);
                });
                
                // Prevent background scrolling
                document.body.classList.add('popup-open');
                
                // Add animation class for smooth appearance
                setTimeout(() => {
                    popup.classList.add('popup-visible');
                    
                    // Initialize Swiper after popup is added to the DOM
                    setTimeout(() => {
                        initializeDetailSwiper();
                    }, 100);
                }, 10);
            } else {
                console.error('Booking detail popup content not found');
                overlay.remove();
            }
        })
        .catch(error => {
            console.error('Error loading booking detail popup:', error);
            overlay.remove();
            
            // Show error message
            alert('Failed to load booking details. Please try again later.');
        });
}

// Close booking detail popup
function closeBookingDetailPopup() {
    const overlay = document.querySelector('.booking-detail-overlay');
    if (overlay) {
        // Get popup element
        const popup = overlay.querySelector('.detail-popup');
        
        if (popup) {
            // Add fade-out animation
            popup.classList.remove('popup-visible');
            popup.classList.add('popup-hidden');
            
            // Wait for animation to complete before removing
            setTimeout(() => {
                document.body.removeChild(overlay);
                document.body.classList.remove('popup-open');
            }, 300);
        } else {
            // No animation if popup element not found
            document.body.removeChild(overlay);
            document.body.classList.remove('popup-open');
        }
    }
}