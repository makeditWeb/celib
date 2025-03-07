document.addEventListener('DOMContentLoaded', function() {
    // 모든 드롭다운 요소 선택
    const dropdowns = document.querySelectorAll('.custom__dropdown');
    const dateDropdown = document.querySelector('.date-dropdown');
    
    // 날짜 선택 결과를 저장할 input 요소 생성 (화면에는 안 보이지만 flatpickr와 연결)
    const datePickerInput = document.createElement('input');
    datePickerInput.style.position = 'absolute';
    datePickerInput.style.opacity = '0';
    datePickerInput.style.height = '0';
    datePickerInput.style.pointerEvents = 'none';
    datePickerInput.className = 'date-picker-input';
    dateDropdown.appendChild(datePickerInput); // body 대신 dateDropdown에 추가
    
    // Flatpickr 인스턴스 생성
    const fp = flatpickr(datePickerInput, {
        mode: "range",
        dateFormat: "M j, Y",
        minDate: "today",
        showMonths: 2,
        static: true,
        // 다음 두 옵션 수정 - dateDropdown.appendChild 사용으로 자동으로 올바른 위치에 생성됨
        // appendTo: dateDropdown, 
        // positionElement: dateDropdown.querySelector('.dropdown__header'),
        onClose: function(selectedDates, dateStr, instance) {
            if (selectedDates.length === 2) {
                const startDate = new Date(selectedDates[0]);
                const endDate = new Date(selectedDates[1]);
                
                // MMM D 형식으로 날짜 포맷
                const options = { month: 'short', day: 'numeric' };
                const formattedStartDate = startDate.toLocaleDateString('en-US', options);
                const formattedEndDate = endDate.toLocaleDateString('en-US', options);
                
                dateDropdown.querySelector('.selected__option').textContent = 
                    `${formattedStartDate} - ${formattedEndDate}`;
            }
            
            // 드롭다운 닫기
            setTimeout(() => {
                dateDropdown.classList.remove('active');
            }, 100);
        }
    });
    
    // 각 드롭다운에 이벤트 리스너 추가
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown__header');
        const selectedText = dropdown.querySelector('.selected__option');
        const optionItems = dropdown.querySelectorAll('.dropdown__option');
        
        // 헤더 클릭 시 드롭다운 토글
        header.addEventListener('click', function() {
            dropdown.classList.toggle('active');
            
            // 날짜 드롭다운이 열릴 때 Flatpickr 열기
            if (dropdown.classList.contains('date-dropdown') && dropdown.classList.contains('active')) {
                setTimeout(() => {
                    fp.open();
                    
                    // 캘린더가 생성된 후 위치 조정
                    const calendar = document.querySelector('.flatpickr-calendar');
                    if (calendar) {
                        calendar.style.left = '0';
                        calendar.style.top = 'calc(100% + 8px)';
                        calendar.style.position = 'absolute';
                        calendar.style.zIndex = '100';
                    }
                }, 0);
            }
            
            // 다른 드롭다운 닫기
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        });
        
        // Location 드롭다운의 옵션 아이템 클릭 시 선택된 텍스트 변경 및 드롭다운 닫기
        if (!dropdown.classList.contains('date-dropdown')) {
            optionItems.forEach(option => {
                option.addEventListener('click', function() {
                    selectedText.textContent = this.textContent;
                    dropdown.classList.remove('active');
                });
            });
        }
    });
    
    // Flatpickr 캘린더 내부 클릭 이벤트 처리
    document.addEventListener('click', function(e) {
        const calendar = document.querySelector('.flatpickr-calendar');
        if (calendar && calendar.contains(e.target)) {
            e.stopPropagation();
        }
    });
    
    // 드롭다운 외부 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', function(event) {
        let isClickInside = false;
        let isDatePickerClick = false;
        
        dropdowns.forEach(dropdown => {
            if (dropdown.contains(event.target)) {
                isClickInside = true;
            }
        });
        
        // Flatpickr 클릭 확인
        const calendar = document.querySelector('.flatpickr-calendar');
        if (calendar && calendar.contains(event.target)) {
            isDatePickerClick = true;
        }
        
        if (!isClickInside && !isDatePickerClick) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            fp.close();
        }
    });
});