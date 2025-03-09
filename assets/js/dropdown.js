document.addEventListener('DOMContentLoaded', function() {
    // 모든 드롭다운 요소 선택
    const dropdowns = document.querySelectorAll('.custom__dropdown');
    const dateDropdown = document.querySelector('.date-dropdown');
    
    if (!dateDropdown) {
        console.error('Date dropdown element not found');
        return;
    }
    
    // 기본 텍스트 설정
    const selectedOption = dateDropdown.querySelector('.selected__option');
    if (selectedOption) {
        selectedOption.textContent = 'Check in / out';
    }
    
    // 날짜 선택 결과를 저장할 input 요소 생성
    const datePickerInput = document.createElement('input');
    datePickerInput.type = 'text';
    datePickerInput.style.position = 'absolute';
    datePickerInput.style.opacity = '0';
    datePickerInput.style.height = '0';
    datePickerInput.style.pointerEvents = 'none';
    dateDropdown.appendChild(datePickerInput);
    
    // 모바일 디바이스 감지 함수
    function isMobile() {
        return window.innerWidth < 768;
    }
    
    // 상태 변수
    let dateSelected = false;
    let isDateDropdownActive = false;
    let datePickerInstance = null;
    
    // Date Range Picker 초기화 설정
    const pickerOptions = {
        opens: 'center',
        autoApply: false, // false로 설정하여 자동으로 닫히지 않게 함
        minDate: moment(),
        autoUpdateInput: false,
        locale: {
            format: 'YYYY-MM-DD',
            separator: ' ~ ',
            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            firstDay: 0
        },
        showCustomRangeLabel: false,
        alwaysShowCalendars: true
    };
    
    // 데이트픽커 초기화
    $(datePickerInput).daterangepicker(pickerOptions);
    
    // 데이트픽커 인스턴스 저장
    datePickerInstance = $(datePickerInput).data('daterangepicker');
    
    // 헤더 텍스트 업데이트 함수
    function updateHeaderText(picker) {
        if (picker.startDate && picker.endDate) {
            const startFormat = picker.startDate.format('MMM D');
            const endFormat = picker.endDate.format('MMM D');
            
            if (selectedOption) {
                selectedOption.textContent = `${startFormat} - ${endFormat}`;
            }
            
            // 날짜 선택 상태 업데이트
            dateSelected = true;
        }
    }
    
    // 날짜 범위 선택 직접 감시 및 업데이트
    function setupDateRangeMonitoring() {
        // 이벤트를 사용하여 감지
        $(datePickerInput).on('hide.daterangepicker apply.daterangepicker', function(ev, picker) {
            updateHeaderText(picker);
        });
        
        // 캘린더에서 날짜 변경 감지 (mouseup 이벤트)
        $(document).on('mouseup.dateSelect', '.calendar-table td', function() {
            setTimeout(function() {
                if (datePickerInstance.startDate && datePickerInstance.endDate) {
                    updateHeaderText(datePickerInstance);
                }
            }, 10);
        });
        
        // 첫 번째 날짜 클릭시에도 표시 업데이트
        $(document).on('click.datePreview', '.calendar-table td', function() {
            setTimeout(function() {
                // 시작일만 선택된 경우도 표시
                if (datePickerInstance.startDate) {
                    const startFormat = datePickerInstance.startDate.format('MMM D');
                    if (selectedOption) {
                        if (datePickerInstance.endDate) {
                            const endFormat = datePickerInstance.endDate.format('MMM D');
                            selectedOption.textContent = `${startFormat} - ${endFormat}`;
                        } else {
                            selectedOption.textContent = `${startFormat} - ...`;
                        }
                    }
                }
            }, 10);
        });
    }
    
    // 날짜 이벤트 모니터링 설정
    setupDateRangeMonitoring();
    
    // SVG 아이콘 정의
    const prevSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.25 18L8.25 12L14.25 6" stroke="#212322" stroke-width="1.5"></path></svg>`;
    
    // 다음 버튼은 이전 버튼과 동일한 SVG를 사용하되 회전시킴
    const nextSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="transform: rotate(180deg);"><path d="M14.25 18L8.25 12L14.25 6" stroke="#212322" stroke-width="1.5"></path></svg>`;
    
    // X 버튼 SVG 아이콘
    const closeSvgIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`;
    
    // 모바일용 닫기 버튼 추가 함수
    function addMobileCloseButton() {
        // 이미 있는 닫기 버튼 제거
        $('.mobile-close-btn').remove();
        
        // 모바일에서만 추가
        if (isMobile()) {
            // 닫기 버튼 생성
            const closeBtn = $(`<button type="button" class="mobile-close-btn" style="position: absolute; right: 10px; top: 10px; background: none; border: none; cursor: pointer; z-index: 999999; padding: 5px;">${closeSvgIcon}</button>`);
            
            // daterangepicker에 버튼 추가
            $('.daterangepicker').prepend(closeBtn);
            
            // 닫기 버튼 클릭 이벤트
            closeBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 모든 드롭다운 닫기
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                // 데이트픽커 숨기기
                if (datePickerInstance) {
                    datePickerInstance.hide();
                    isDateDropdownActive = false;
                }
            });
        }
    }
    
    // 네비게이션 버튼 추가 함수
    function addSvgNavButtons() {
        // 기존 .svg-nav-btn 제거 (중복 방지)
        $('.svg-nav-btn').remove();
        
        // 모든 캘린더에 대해
        $('.daterangepicker .drp-calendar').each(function() {
            const calendar = $(this);
            
            // 왼쪽 화살표 버튼 생성
            const leftBtn = $(`<button type="button" class="svg-nav-btn prev-month" style="position: absolute; left: 10px; top: 10px; background: none; border: none; cursor: pointer; z-index: 99999; padding: 0;">${prevSvgIcon}</button>`);
            
            // 오른쪽 화살표 버튼 생성
            const rightBtn = $(`<button type="button" class="svg-nav-btn next-month" style="position: absolute; right: 10px; top: 10px; background: none; border: none; cursor: pointer; z-index: 99999; padding: 0;">${nextSvgIcon}</button>`);
            
            // 캘린더에 버튼 삽입
            calendar.css('position', 'relative');
            calendar.prepend(leftBtn);
            calendar.prepend(rightBtn);
            
            // 왼쪽 버튼 클릭 이벤트
            leftBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 월 정보
                const monthHeader = calendar.find('.month');
                const monthText = monthHeader.text();
                const [monthName, yearStr] = monthText.split(' ');
                const year = parseInt(yearStr);
                
                // 월 인덱스 계산
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let monthIndex = months.indexOf(monthName);
                
                // 이전 달
                monthIndex--;
                if (monthIndex < 0) {
                    monthIndex = 11;
                    year--;
                }
                
                // 새 날짜 생성
                const newDate = moment([year, monthIndex, 1]);
                
                // 캘린더 업데이트
                if (calendar.hasClass('left')) {
                    datePickerInstance.leftCalendar.month = newDate;
                } else {
                    datePickerInstance.rightCalendar.month = newDate;
                }
                
                datePickerInstance.updateCalendars();
                
                // 지연 후 버튼 다시 추가
                setTimeout(function() {
                    addSvgNavButtons();
                    addMobileCloseButton(); // 모바일 닫기 버튼도 다시 추가
                }, 0);
            });
            
            // 오른쪽 버튼 클릭 이벤트
            rightBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 월 정보
                const monthHeader = calendar.find('.month');
                const monthText = monthHeader.text();
                const [monthName, yearStr] = monthText.split(' ');
                const year = parseInt(yearStr);
                
                // 월 인덱스 계산
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                let monthIndex = months.indexOf(monthName);
                
                // 다음 달
                monthIndex++;
                if (monthIndex > 11) {
                    monthIndex = 0;
                    year++;
                }
                
                // 새 날짜 생성
                const newDate = moment([year, monthIndex, 1]);
                
                // 캘린더 업데이트
                if (calendar.hasClass('left')) {
                    datePickerInstance.leftCalendar.month = newDate;
                } else {
                    datePickerInstance.rightCalendar.month = newDate;
                }
                
                datePickerInstance.updateCalendars();
                
                // 지연 후 버튼 다시 추가
                setTimeout(function() {
                    addSvgNavButtons();
                    addMobileCloseButton(); // 모바일 닫기 버튼도 다시 추가
                }, 0);
            });
        });
    }
    
    // 날짜 선택 이벤트 처리
    $(datePickerInput).on('apply.daterangepicker', function(ev, picker) {
        if (picker.startDate && picker.endDate) {
            // 날짜가 선택됨
            dateSelected = true;
            
            // 날짜 포맷
            const startFormat = picker.startDate.format('MMM D');
            const endFormat = picker.endDate.format('MMM D');
            
            if (selectedOption) {
                selectedOption.textContent = `${startFormat} - ${endFormat}`;
            }
            
            // 야간 수 계산
            const nights = picker.endDate.diff(picker.startDate, 'days');
            
            // 야간 수 표시
            let nightsInfo = $('.daterangepicker').find('.nights-info');
            if (nightsInfo.length === 0) {
                nightsInfo = $('<div class="nights-info"></div>');
                nightsInfo.css({
                    'padding': '10px 0 0',
                    'text-align': 'left',
                    'font-size': '16px',
                    'font-weight': 'bold',
                    'margin-top': '10px',
                    'border-top': '1px solid #eee'
                });
                $('.daterangepicker').append(nightsInfo);
            }
            
            nightsInfo.text(`${nights} nights`);
            
            // 데이트픽커를 닫지 않고 표시 상태 유지
            isDateDropdownActive = true;
            dateDropdown.classList.add('active');
            
            // 스타일 재적용 및 SVG 버튼 다시 추가
            setTimeout(function() {
                applyDatePickerStyles();
                addSvgNavButtons();
                addMobileCloseButton(); // 모바일 닫기 버튼도 다시 추가
            }, 10);
        }
    });
    
    // 초기에는 선택이 없도록
    function clearDateRangeStyles() {
        $('.daterangepicker td.start-date').removeClass('start-date').removeClass('active');
        $('.daterangepicker td.end-date').removeClass('end-date').removeClass('active');
        $('.daterangepicker td.in-range').removeClass('in-range');
    }
    clearDateRangeStyles();
    
    // 드롭다운 토글 함수
    function toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // 모든 드롭다운 닫기
        dropdowns.forEach(d => {
            d.classList.remove('active');
        });
        
        // Date picker 숨기기
        if (datePickerInstance) {
            datePickerInstance.hide();
            isDateDropdownActive = false;
        }
        
        // 현재 드롭다운만 활성화 (토글)
        if (!isActive) {
            dropdown.classList.add('active');
            
            // 날짜 드롭다운인 경우 추가 처리
            if (dropdown.classList.contains('date-dropdown')) {
                isDateDropdownActive = true;
                showDatePicker();
            }
        }
    }
    
    // 데이트픽커 표시 함수
    function showDatePicker() {
        try {
            const dropdownRect = dateDropdown.getBoundingClientRect();
            
            // 위치 설정
            if (isMobile()) {
                $('.daterangepicker').css({
                    'position': 'fixed',
                    'top': '10%',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'width': '90%',
                    'max-width': '400px',
                    'margin': '0 auto',
                    'max-height': '80vh',
                    'overflow-y': 'auto',
                    'z-index': '9999999'
                });
            } else {
                $('.daterangepicker').css({
                    'position': 'absolute',
                    'top': (dropdownRect.bottom + window.scrollY) + 'px',
                    'left': (dropdownRect.left + window.scrollX) + 'px',
                    'max-height': (window.innerHeight - dropdownRect.bottom - 20) + 'px',
                    'overflow-y': 'auto',
                    'z-index': '9999999'
                });
            }
            
            // DateRangePicker 표시
            datePickerInstance.show();
            
            // 추가 스타일링
            applyDatePickerStyles();
            
            // SVG 네비게이션 버튼 추가
            addSvgNavButtons();
            
            // 모바일 닫기 버튼 추가
            addMobileCloseButton();
            
            // 선택되지 않았으면 선택 스타일 제거
            if (!dateSelected) {
                clearDateRangeStyles();
            }
        } catch (error) {
            console.error('Error showing daterangepicker:', error);
        }
    }
    
    // daterangepicker에 스타일 적용
    function applyDatePickerStyles() {
        $('.daterangepicker').css({
            'border': '1px solid #eee',
            'border-radius': '5px',
            'background-color': '#fff',
            'box-shadow': '0 4px 15px rgba(0,0,0,0.15)',
            'font-family': "'Outfit', sans-serif",
            'padding': '20px',
            'z-index': '9999999',
            'display': 'block',
            'visibility': 'visible',
            'opacity': '1',
            'position': isMobile() ? 'fixed' : 'absolute'
        });
        
        // 버튼 영역 숨기기
        $('.daterangepicker .drp-buttons').hide();
        
        // 날짜 셀 스타일
        $('.daterangepicker td.available').css({
            'width': '40px',
            'height': '40px',
            'line-height': '40px',
            'text-align': 'center',
            'font-size': '14px'
        });
        
        // 시작일과 종료일 스타일
        $('.daterangepicker td.start-date, .daterangepicker td.end-date').css({
            'background-color': '#000',
            'color': '#fff',
            'border-radius': '50%'
        });
        
        // 범위 내 날짜 스타일
        $('.daterangepicker td.in-range').css({
            'background-color': '#f0f0f0',
            'color': '#333'
        });
        
        // 모바일에서는 캘린더 세로 배치
        if (isMobile()) {
            $('.daterangepicker .drp-calendars').css({
                'flex-direction': 'column'
            });
            
            $('.daterangepicker .drp-calendar').css({
                'max-width': '100%',
                'width': '100%'
            });
            
            // 첫 번째 캘린더 아래 여백 추가
            $('.daterangepicker .drp-calendar:first-child').css({
                'margin-bottom': '20px',
                'border-bottom': '1px solid #eee',
                'padding-bottom': '20px'
            });
        } else {
            // 데스크탑에서는 가로 배치
            $('.daterangepicker .drp-calendar').css({
                'max-width': '50%',
                'padding': '0',
                'margin': '0'
            });
        }
        
        // 더 나은 가시성을 위한 추가 스타일
        $('.daterangepicker .month').css({
            'font-weight': 'bold',
            'font-size': '16px'
        });
        
        $('.daterangepicker th').css({
            'font-weight': 'normal',
            'color': '#666',
            'font-size': '14px'
        });
        
        // 기존 화살표 숨기기
        $('.daterangepicker .prev, .daterangepicker .next').hide();
    }
    
    // 각 드롭다운에 이벤트 리스너 추가
    dropdowns.forEach(dropdown => {
        const header = dropdown.querySelector('.dropdown__header');
        const selectedText = dropdown.querySelector('.selected__option');
        const optionItems = dropdown.querySelectorAll('.dropdown__option');
        
        // 헤더 클릭 시 드롭다운 토글
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown(dropdown);
        });
        
        // 옵션 아이템 클릭 이벤트 (Location 드롭다운 등)
        optionItems.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                if (selectedText) {
                    selectedText.textContent = this.textContent;
                }
                
                dropdown.classList.remove('active');
            });
        });
    });
    
    // 문서 클릭 시 모든 드롭다운 닫기
    document.addEventListener('click', function(e) {
        // daterangepicker 내부 클릭인지 확인
        if (!e.target.closest('.daterangepicker') && 
            !e.target.closest('.custom__dropdown')) {
            // 모든 드롭다운 닫기
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // daterangepicker 숨기기
            if (datePickerInstance) {
                datePickerInstance.hide();
                isDateDropdownActive = false;
            }
        }
    });
    
    // 날짜 셀 클릭 이벤트 처리
    $(document).on('click', '.daterangepicker td.available', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // 날짜 클릭 후 인스턴스 유지
        setTimeout(function() {
            // 달력이 계속 표시되도록 상태 유지
            isDateDropdownActive = true;
            dateDropdown.classList.add('active');
            datePickerInstance.show();
            
            // 스타일 재적용
            applyDatePickerStyles();
            addSvgNavButtons(); // SVG 네비게이션 버튼 다시 추가
            addMobileCloseButton(); // 모바일 닫기 버튼도 다시 추가
        }, 100);
        
        return false;
    });
    
    // 크기 변경 시 위치 조정
    $(window).on('resize', function() {
        if (isDateDropdownActive && datePickerInstance) {
            const dropdownRect = dateDropdown.getBoundingClientRect();
            
            if (isMobile()) {
                $('.daterangepicker').css({
                    'position': 'fixed',
                    'top': '10%',
                    'left': '50%',
                    'transform': 'translateX(-50%)',
                    'width': '90%',
                    'max-width': '400px'
                });
            } else {
                $('.daterangepicker').css({
                    'position': 'absolute',
                    'top': (dropdownRect.bottom + window.scrollY) + 'px',
                    'left': (dropdownRect.left + window.scrollX) + 'px'
                });
            }
            
            applyDatePickerStyles();
            addSvgNavButtons(); // SVG 네비게이션 버튼 다시 추가
            addMobileCloseButton(); // 모바일 닫기 버튼도 다시 추가
        }
    });
    
    // SCSS 스타일을 대체하는 인라인 스타일 적용
    const styleEl = document.createElement('style');
    styleEl.textContent = `
        .daterangepicker {
            border: 1px solid #eee !important;
            border-radius: 5px !important;
            background: #fff !important;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
            font-family: 'Outfit', sans-serif !important;
            padding: 20px !important;
            z-index: 9999999 !important;
            transition: none !important;
        }
        
        .daterangepicker .drp-calendar {
            max-width: 50% !important;
            padding: 0 !important;
            margin: 0 !important;
            position: relative !important;
        }
        
        .daterangepicker .calendar-table {
            padding: 0 !important;
        }
        
        .daterangepicker td {
            width: 40px !important;
            height: 40px !important;
            font-size: 14px !important;
            text-align: center !important;
            line-height: 40px !important;
        }
        
        .daterangepicker td.available:hover {
            background-color: #f0f0f0 !important;
            border-radius: 50% !important;
        }
        
        .daterangepicker td.start-date,
        .daterangepicker td.end-date.in-range {
            background-color: #000 !important;
            color: #fff !important;
            border-radius: 50% !important;
        }
        
        .daterangepicker td.in-range {
            background-color: #f0f0f0 !important;
            color: #333 !important;
        }
        
        .daterangepicker .drp-buttons {
            display: none !important;
        }
        
        .daterangepicker .drp-calendar.left {
            clear: none !important;
            border-right: 1px solid #ccc;
            padding-right: 10px !important;
        }
        
        .daterangepicker .drp-calendar.right {
            padding-left: 10px !important;
        }
        
        /* 기존 화살표 숨기기 */
        .daterangepicker .prev, 
        .daterangepicker .next {
            display: none !important;
        }
        
        /* SVG 네비게이션 버튼 스타일 */
        .svg-nav-btn {
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            position: absolute !important;
            z-index: 99999 !important;
            display: block !important;
            width: 24px !important;
            height: 24px !important;
            padding: 0 !important;
        }
        
        .svg-nav-btn.prev-month {
            left: 10px !important;
            top: 0px !important;
        }
        
        .svg-nav-btn.next-month {
            right: 10px !important;
            top: 0px !important;
        }
        
        /* 모바일 닫기 버튼 스타일 */
        .mobile-close-btn {
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            position: absolute !important;
            right: 10px !important;
            top: 10px !important;
            z-index: 999999 !important;
            color: #333 !important;
            padding: 5px !important;
            display: none !important; /* 기본적으로 숨김 */
        }
        
        /* 드롭다운 옵션 스타일 */
        .custom__dropdown {
            position: relative;
        }
        
        .custom__dropdown .dropdown__header {
            cursor: pointer;
        }
        
        .custom__dropdown .dropdown__options {
            display: none;
            position: absolute;
            background: white;
            border: 1px solid #eee;
            border-radius: 5px;
            width: 100%;
            z-index: 999;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
        }
        
        .custom__dropdown.active .dropdown__options {
            display: block;
        }
        
        .custom__dropdown .dropdown__option {
            padding: 10px;
            cursor: pointer;
        }
        
        .custom__dropdown .dropdown__option:hover {
            background-color: #f0f0f0;
            
        }
        
        .daterangepicker td.disabled, .daterangepicker option.disabled{
            text-decoration: unset;
            color: #e7e7e7;
        }
        @media (max-width: 767px) {
            .daterangepicker {
                width: 80% !important;
                max-width: 400px !important;
                transform: translate(-50%, 0)!important;
                top: 100px !important;
                left: 50% !important;
                padding-top: 40px !important; /* 닫기 버튼 공간 확보 */
            }
            
            .mobile-close-btn {
                display: block !important; /* 모바일에서만 표시 */
            }
            
            .daterangepicker .drp-calendars {
                display: flex !important;
                flex-direction: column !important;
                width: 100% !important;
            }
            
            .daterangepicker .drp-calendar {
                max-width: 100% !important;
                width: 100% !important;
            }
        }
    `;
    document.head.appendChild(styleEl);
});