document.addEventListener('DOMContentLoaded', function() {
    // Get references to elements
    const stickyNav = document.querySelector('.sticky-nav');
    const setDateSection = document.querySelector('.gadi__main .set__date');
    const navLinks = document.querySelectorAll('.nav-link');
    const stickyDateDisplay = document.querySelector('.sticky-date-display');
    const mainDateDropdown = document.querySelector('.gadi__main .date-dropdown');
    
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
            
            // Update active section in navigation based on scroll position
            updateActiveSection();
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
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                // Scroll to the target section
                const offsetTop = targetSection.offsetTop;
                
                window.scrollTo({
                    top: offsetTop - 80, // Account for sticky header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active nav link based on scroll position
    function updateActiveSection() {
        // Define sections to track
        const sections = [
            { id: 'perfect__stay', nav: 'rooms' },
            { id: 'amenities', nav: 'amenities' },
            { id: 'neighborhood', nav: 'location' },
            { id: 'faq__gadi', nav: 'faq' }
        ];
        
        // Get current scroll position (slightly ahead to activate earlier)
        const scrollPosition = window.scrollY + 150;
        
        // Find the current section
        let currentSection = null;
        
        sections.forEach(section => {
            const element = document.querySelector(`.${section.id}`);
            if (element) {
                const sectionTop = element.offsetTop;
                const sectionHeight = element.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.nav.toLowerCase();
                }
            }
        });
        
        // Update active class in navigation
        if (currentSection) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                const linkTarget = link.getAttribute('data-target').toLowerCase();
                if (sections.find(section => section.id.toLowerCase() === linkTarget && section.nav.toLowerCase() === currentSection)) {
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
        stickyDateDisplay.addEventListener('click', function() {
            // Trigger click on the main dropdown
            const mainDropdownHeader = mainDateDropdown.querySelector('.dropdown__header');
            if (mainDropdownHeader) {
                mainDropdownHeader.click();
                
                // Scroll to the date section if needed
                setDateSection.scrollIntoView({ behavior: 'smooth' });
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
    
    // Initial check for active section on page load
    setTimeout(updateActiveSection, 100);
});