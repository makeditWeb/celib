document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const stickyNav = document.querySelector('.sticky-nav');
    const setDateSection = document.querySelector('.gadi__main .set__date');
    const navLinks = document.querySelectorAll('.nav-link');
    const stickyDateDisplay = document.querySelector('.sticky-date-display');
    const mainDateDropdown = document.querySelector('.gadi__main .date-dropdown');
    
    // Define explicit section boundaries
    const sectionMapping = [
        { id: 'perfect__stay', label: 'Rooms', target: 'perfect__stay' },
        { id: 'amenities', label: 'Amenities', target: 'amenities' },
        { id: 'neighborhood', label: 'Location', target: 'neighborhood' },
        { id: 'faq__gadi', label: 'FAQ', target: 'faq__gadi' }
    ];
    
    // Track last clicked section to maintain activation
    let lastClickedSection = null;
    let isManualScroll = false;
    let scrollTimeout = null;
    
    // Handle sticky navigation on scroll
    window.addEventListener('scroll', function() {
        if (setDateSection) {
            const dateRect = setDateSection.getBoundingClientRect();
            
            // Show sticky nav when scrolled past the date section
            if (dateRect.bottom <= 0) {
                stickyNav.classList.add('visible');
            } else {
                stickyNav.classList.remove('visible');
            }
            
            // Only update active section if not manually scrolling
            if (!isManualScroll) {
                // Debounce scroll events for better performance
                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(updateActiveSection, 50);
            }
        }
    });
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section ID from data attribute
            const targetId = this.getAttribute('data-target');
            const targetSection = document.querySelector(`.${targetId}`);
            
            if (targetSection) {
                // Mark as manually scrolling
                isManualScroll = true;
                lastClickedSection = targetId;
                window._lastClickTime = new Date().getTime();
                
                // Update active link immediately
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Calculate offset for scrolling
                const stickyNavHeight = stickyNav ? stickyNav.offsetHeight : 0;
                const scrollOffset = stickyNavHeight;
                
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - scrollOffset,
                    behavior: 'smooth'
                });
                
                // Reset scroll tracking after animation completes
                setTimeout(() => {
                    isManualScroll = false;
                }, 1000);
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveSection() {
        // Maintain clicked section for a period to prevent flicker
        if (lastClickedSection) {
            const timeSinceClick = new Date().getTime() - (window._lastClickTime || 0);
            if (timeSinceClick < 2000) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-target') === lastClickedSection) {
                        link.classList.add('active');
                    }
                });
                return;
            }
        }
        
        // Get exact positions of each section
        const sectionPositions = sectionMapping.map(section => {
            const element = document.querySelector(`.${section.id}`);
            return {
                id: section.id,
                target: section.target,
                top: element ? element.offsetTop : Infinity,
                bottom: element ? element.offsetTop + element.offsetHeight : Infinity
            };
        }).filter(section => section.top !== Infinity);
        
        // Get current scroll position plus offset for header
        const scrollPosition = window.scrollY;
        
        // Find the current section
        let currentSection = null;
        
        // First, try to find exact section match
        for (let i = 0; i < sectionPositions.length; i++) {
            const section = sectionPositions[i];
            if (scrollPosition >= section.top && scrollPosition < section.bottom) {
                currentSection = section.target;
                break;
            }
        }
        
        // If no exact match, use the section we're approaching
        if (!currentSection && sectionPositions.length > 0) {
            // Find the first section that's below our current position
            for (let i = 0; i < sectionPositions.length; i++) {
                if (scrollPosition < sectionPositions[i].top) {
                    // We're approaching this section, use the previous one if available
                    currentSection = i > 0 ? sectionPositions[i-1].target : sectionPositions[0].target;
                    break;
                }
            }
            
            // If we're past all sections, use the last one
            if (!currentSection) {
                currentSection = sectionPositions[sectionPositions.length - 1].target;
            }
        }
        
        // Update active class in navigation
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-target') === currentSection) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Sync sticky date display with main date dropdown
    if (stickyDateDisplay && mainDateDropdown) {
        // Update date display based on main dropdown
        function updateDateDisplay() {
            const selectedOption = mainDateDropdown.querySelector('.selected__option');
            if (selectedOption && selectedOption.textContent) {
                stickyDateDisplay.textContent = selectedOption.textContent;
            } else {
                stickyDateDisplay.textContent = 'Set Your Stay Dates';
            }
        }
        
        // Initialize date display
        updateDateDisplay();
        
        // Make the sticky date display open the main calendar
        stickyDateDisplay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Trigger click on the main dropdown
            const mainDropdownHeader = mainDateDropdown.querySelector('.dropdown__header');
            if (mainDropdownHeader) {
                // 현재 스크롤 위치 저장
                const scrollY = window.scrollY;
                document.body.style.top = `-${scrollY}px`;
                document.body.style.width = '100%';
                document.body.style.position = 'fixed';
                
                mainDropdownHeader.click();
            }
        });
        
        // Listen for changes to the main dropdown
        const observer = new MutationObserver(function(mutations) {
            updateDateDisplay();
        });
        
        // Start observing the main dropdown for changes
        const selectedOption = mainDateDropdown.querySelector('.selected__option');
        if (selectedOption) {
            observer.observe(selectedOption, { childList: true, characterData: true, subtree: true });
        } else {
            observer.observe(mainDateDropdown, { childList: true, subtree: true });
        }
    }
    
    // 캘린더 닫힐 때 스크롤 복원
    document.addEventListener('click', function(e) {
        const dateDropdown = e.target.closest('.date-dropdown');
        const daterangepicker = e.target.closest('.daterangepicker');
        const closeBtn = e.target.closest('.mobile-close-btn');
        const confirmBtn = e.target.closest('.daterangepicker-confirm-btn');
        
        // 캘린더 닫기 버튼이나 컨펌 버튼 클릭 시
        if (closeBtn || confirmBtn) {
            // 스크롤 위치 복원
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        }
        
        // 드롭다운 외부 클릭 시 스크롤 복원
        if (!dateDropdown && !daterangepicker) {
            const scrollY = parseInt(document.body.style.top || '0') * -1;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) window.scrollTo(0, scrollY);
        }
    });
    
    // 모든 nights-info 요소 제거하는 함수 추가
    function removeNightsInfo() {
        if (typeof jQuery !== 'undefined') {
            $('.nights-info').remove();
        }
    }

    // 페이지 로드시 nights-info 제거
    removeNightsInfo();
    setTimeout(removeNightsInfo, 500);
    
    // Initial check for active section on page load
    setTimeout(updateActiveSection, 100);
});