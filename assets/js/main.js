
// mobile header

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const menuToggle = document.getElementById('mobileMenuToggle');
    const mobileDropdown = document.getElementById('mobileDropdown');
    
    // Toggle mobile menu when hamburger icon is clicked
    if (menuToggle && mobileDropdown) {
        menuToggle.addEventListener('click', function() {
            // Toggle active class for the hamburger icon animation
            this.classList.toggle('active');
            
            // Toggle open class for the dropdown menu
            mobileDropdown.classList.toggle('open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileDropdown.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        // If the menu is open and click is outside menu and toggle
        if (mobileDropdown.classList.contains('open') && !isClickInsideMenu && !isClickOnToggle) {
            menuToggle.classList.remove('active');
            mobileDropdown.classList.remove('open');
        }
    });
    
    // Close mobile menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileDropdown.classList.contains('open')) {
            menuToggle.classList.remove('active');
            mobileDropdown.classList.remove('open');
        }
    });
});



// Initial setup for accordion functionality
const accordionItems = document.querySelectorAll(".accordion-item");
const viewMoreBtn = document.querySelector(".view__more a");
const INITIAL_VISIBLE_ITEMS = 5;

// Hide items beyond the initial visible count
function initializeAccordion() {
    accordionItems.forEach((item, index) => {
        // Show first 5 items, hide the rest
        if (index >= INITIAL_VISIBLE_ITEMS) {
            item.style.display = "none";
        }
    });
}

// Accordion toggle functionality
accordionItems.forEach((el) =>
    el.addEventListener("click", () => {
        if (el.classList.contains("active")) {
            el.classList.remove("active");
        } else {
            accordionItems.forEach((el2) => el2.classList.remove("active"));
            el.classList.add("active");
        }
    })
);

// View more functionality
viewMoreBtn.addEventListener("click", function(e) {
    e.preventDefault();
    
    const hiddenItems = document.querySelectorAll(".accordion-item[style='display: none;']");
    
    if (hiddenItems.length > 0) {
        // Show all hidden items
        hiddenItems.forEach(item => {
            item.style.display = "";
        });
        
        // Change button text to "View less"
        this.textContent = "View less";
    } else {
        // Hide items beyond the initial count
        accordionItems.forEach((item, index) => {
            if (index >= INITIAL_VISIBLE_ITEMS) {
                item.style.display = "none";
            }
        });
        
        // Reset button text to "View more"
        this.textContent = "View more";
        
        // Scroll back to the accordion section
        document.querySelector('.accordion').scrollIntoView({behavior: "smooth"});
    }
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeAccordion);



// Banner text flow script
document.addEventListener('DOMContentLoaded', function() {
    const banner = document.querySelector('.fixed__banner');
    
    if (!banner) return;
    
    const originalText = banner.textContent.trim();
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      banner.style.overflow = 'hidden';
      
      // 원본 텍스트 저장 및 배너 비우기
      banner.innerHTML = '';
      
      // 흐르는 텍스트를 위한 컨테이너 생성
      const marqueeContainer = document.createElement('div');
      marqueeContainer.className = 'marquee-container';
      marqueeContainer.style.cssText = `
        display: flex;
        width: 100%;
        overflow: hidden;
      `;
      
      // 실제 흐르는 텍스트 요소 생성
      const marqueeContent = document.createElement('div');
      marqueeContent.className = 'marquee-content';
      marqueeContent.style.cssText = `
        display: flex;
        white-space: nowrap;
        animation: marquee 60s linear infinite;
      `;
      
      // 충분한 텍스트 추가 (2번 이상 화면을 채울만큼)
      for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.textContent = originalText + ' ';
        span.style.cssText = `
          padding-right: 20px;
        `;
        marqueeContent.appendChild(span);
      }
      
      // 애니메이션 키프레임 추가
      const styleSheet = document.createElement('style');
      styleSheet.innerHTML = `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `;
      document.head.appendChild(styleSheet);
      
      // DOM에 추가
      marqueeContainer.appendChild(marqueeContent);
      banner.appendChild(marqueeContainer);
    }
  });