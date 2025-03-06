document.addEventListener('DOMContentLoaded', function() {
    // 모든 드롭다운 요소 선택
    const dropdowns = document.querySelectorAll('.custom__dropdown');
    
    // 각 드롭다운에 이벤트 리스너 추가
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown__header');
        const options = dropdown.querySelector('.dropdown__options');
        const selectedText = dropdown.querySelector('.selected__option');
        const optionItems = dropdown.querySelectorAll('.dropdown__option');
        
        // 헤더 클릭 시 드롭다운 토글
        header.addEventListener('click', function() {
            dropdown.classList.toggle('active');
            
            // 다른 드롭다운 닫기
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
        
        // 옵션 아이템 클릭 시 선택된 텍스트 변경 및 드롭다운 닫기
        optionItems.forEach(option => {
            option.addEventListener('click', function() {
                selectedText.textContent = this.textContent;
                dropdown.classList.remove('active');
            });
        });
    });
    
    // 드롭다운 외부 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', function(event) {
        let isClickInside = false;
        
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(event.target)) {
                isClickInside = true;
            }
        });
        
        if (!isClickInside) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});