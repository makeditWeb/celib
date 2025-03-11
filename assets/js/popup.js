document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const privacyLink = document.querySelector('a[href="./privacy_policy.html"]');
    const termsLink = document.querySelector('a[href="./terms_use.html"]');
    const body = document.body;
    
    // Add click event listeners to the links
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            createPopup('privacy_policy', 'Privacy Policy');
        });
    }
    
    if (termsLink) {
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            createPopup('terms_use', 'Terms of Use');
        });
    }
    
    // 팝업 직접 생성 함수
    function createPopup(type, title) {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        
        // Create popup container
        const popup = document.createElement('div');
        popup.className = 'popup-container';
        popup.style.backgroundColor = '#fff';  // 기본 배경색 추가
        
        // iframe 사용하여 페이지 로드 (CSS 포함)
        const popupContent = `
            <div class="popup-header">
                <div class="popup-header__inner">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" class="popup-close">
                        <path d="M17 1L8.99968 9.03705M8.99968 9.03705L1.07377 16.9994M8.99968 9.03705L16.9262 17M8.99968 9.03705L1 1.00065" stroke="#797979"/>
                    </svg>
                </div>
            </div>
            <iframe src="./${type}.html" style="width:100%; height:80vh; border:none;"></iframe>
        `;
        
        // Set popup content
        popup.innerHTML = popupContent;
        
        // Add popup to overlay
        overlay.appendChild(popup);
        
        // Add to body
        body.appendChild(overlay);
        
        // Prevent scrolling on the background
        body.classList.add('popup-open');
        
        // Add close event to overlay and close button
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
        
        const closeBtn = popup.querySelector('.popup-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closePopup);
        }
        
        function closePopup() {
            body.removeChild(overlay);
            body.classList.remove('popup-open');
        }
    }
});