document.addEventListener('DOMContentLoaded', function() {
    console.log("드롭다운 초기화 시작");

    // ===== 날짜 드롭다운 초기화 =====
    initDateDropdown();
    
    function initDateDropdown() {
        const dateDropdown = document.querySelector('.date-dropdown');
        
        if (!dateDropdown) {
            console.log("날짜 드롭다운을 찾을 수 없음");
            return;
        }
        
        console.log("날짜 드롭다운 초기화 시작");
        
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
        
        // jQuery 확인
        if (typeof jQuery === 'undefined' || typeof jQuery.fn.daterangepicker === 'undefined') {
            console.error('날짜 드롭다운 초기화 실패: jQuery 또는 daterangepicker가 로드되지 않았습니다.');
            return;
        }
        
        // 모바일 디바이스 감지 함수
        function isMobile() {
            return window.innerWidth < 768;
        }
        
        // 상태 변수
        let dateSelected = false;
        let isDateDropdownActive = false;
        let datePickerInstance = null;
        
        // SVG 아이콘 정의
        const prevSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M14.25 18L8.25 12L14.25 6" stroke="#212322" stroke-width="1.5"></path></svg>`;
        const nextSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" style="transform: rotate(180deg);"><path d="M14.25 18L8.25 12L14.25 6" stroke="#212322" stroke-width="1.5"></path></svg>`;
        const closeSvgIcon = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>`;

        // Date Range Picker 초기화 설정
        const pickerOptions = {
            opens: 'center',
            autoApply: false,
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
        
        // 원형 날짜 스타일 CSS
        const roundDateStyle = `
            .daterangepicker td.start-date,
            .daterangepicker td.end-date {
                position: relative !important;
                width: 40px !important;
                height: 40px !important;
                padding: 0 !important;
                text-align: center !important;
            }

            .daterangepicker td.start-date .date-circle,
            .daterangepicker td.end-date .date-circle {
                width: 36px !important;
                height: 36px !important;
                background-color: #000 !important;
                color: #fff !important;
                border-radius: 50% !important;
                display: inline-block !important;
                text-align: center !important;
                line-height: 36px !important;
                margin: auto !important;
            }
        `;
        // CSS 스타일 추가
        const dateStyleTag = document.createElement('style');
        dateStyleTag.id = 'daterange-circle-fix';
        dateStyleTag.textContent = roundDateStyle;
        document.head.appendChild(dateStyleTag);
        
        // 기본 스타일 추가
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            body.no-scroll {
                overflow: hidden !important;
                position: fixed !important;
                width: 100% !important;
                height: 100% !important;
            }
            
            /* 모바일에서 캘린더 내부만 스크롤 */
            @media (max-width: 767px) {
                .daterangepicker {
                    overflow: auto !important;
                    padding-bottom:60px!important;
                }
                
                .daterangepicker .drp-calendars {
                    overflow-y: auto !important;
                    -webkit-overflow-scrolling: touch !important;
                    height: calc(100% - 120px) !important;
                    padding-bottom: 100px !important;
                }
            }

            .daterangepicker {
                border: 1px solid #eee !important;
                border-radius: 5px !important;
                background: #fff !important;
                box-shadow: 0 4px 15px rgba(0,0,0,0.15) !important;
                font-family: 'Outfit', sans-serif !important;
                padding: 20px !important;
                z-index: 9999999 !important;
                transition: none !important;
                max-width: 660px!important;
                box-sizing: border-box;
                max-height:500px!important
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
                background: transparent !important;
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
                padding:0 20px!important;
                box-sizing: border-box;
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
                top: 50% !important;
                z-index: 999999 !important;
                color: #333 !important;
                padding: 5px !important;
                display: none !important;
            }
            
            .daterangepicker td.disabled, .daterangepicker option.disabled{
                text-decoration: unset;
                color: #e7e7e7;
            }
            
            @media (max-width: 767px) {
                .daterangepicker {
                    width: 100% !important;
                    top: 0 !important;
                    left: 0 !important;
                    padding: 0px !important;
                    box-sizing: border-box;
                    max-height: 100vh !important;
                }
                
                .daterangepicker .drp-calendar.left {
                    clear: none !important;
                    border-right: none;
                    padding:0 20px !important;
                    margin-bottom: 20px !important;
                    box-sizing: border-box;
                    margin-top: 60px !important;
                }

                .mobile-close-btn {
                    display: block !important;
                }

                .daterangepicker .drp-calendar.right {
                    padding: 0 20px 100px !important; 
                    box-sizing: border-box;
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
            
            .mobile-daterangepicker-header {
                display: flex !important;
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                z-index: 1000000 !important;
                background-color: #fff !important;
                border-bottom: 1px solid #eee !important;
                padding: 15px 16px 15px !important;
                margin-bottom: 15px !important;
                width: 100% !important;
                box-sizing: border-box !important;
                justify-content: center !important;
                align-items: center !important;
            }
            
            .daterangepicker-confirm-btn {
                background-color: #000 !important;
                color: #fff !important;
                border: none !important;
                cursor: pointer !important;
                font-weight: 500 !important;
                font-family: 'Outfit', sans-serif !important;
            }
            
            @media (max-width: 767px) {
                .daterangepicker-confirm-btn {
                    position: fixed !important;
                    bottom: 0 !important;
                    left: 0 !important;
                    right: 0 !important;
                    width: 100% !important;
                    padding: 15px !important;
                    font-size: 18px !important;
                    z-index: 999999 !important;
                    border-radius: 0 !important;
                    margin: 0 !important;
                }
            }
        `;
        document.head.appendChild(styleEl);

        // 개선된 applyCircleToSelectedDates 함수
        function applyCircleToSelectedDates() {
            // DOM에서 직접 선택된 날짜 요소 찾기
            const startDateCells = document.querySelectorAll('.daterangepicker td.start-date');
            const endDateCells = document.querySelectorAll('.daterangepicker td.end-date');
            
            // 시작일과 종료일에 원형 스타일 적용
            function applyCircle(cell) {
                const cellText = cell.textContent.trim();
                
                // 이미 date-circle이 있으면 제거
                const existingCircle = cell.querySelector('.date-circle');
                if (existingCircle) {
                    existingCircle.remove();
                }
                
                // 새 date-circle 요소 생성
                const circleDiv = document.createElement('div');
                circleDiv.className = 'date-circle';
                circleDiv.textContent = cellText;
                
                // 인라인 스타일 적용
                circleDiv.style.width = '36px';
                circleDiv.style.height = '36px';
                circleDiv.style.backgroundColor = '#000';
                circleDiv.style.color = '#fff';
                circleDiv.style.borderRadius = '50%';
                circleDiv.style.display = 'inline-block';
                circleDiv.style.textAlign = 'center';
                circleDiv.style.lineHeight = '36px';
                circleDiv.style.margin = 'auto';
                
                // 셀의 내용을 원으로 교체
                cell.innerHTML = '';
                cell.appendChild(circleDiv);
            }
            
            // 각 셀에 원형 스타일 적용
            startDateCells.forEach(applyCircle);
            endDateCells.forEach(applyCircle);
            
            console.log(`날짜 원형 스타일 적용 완료: ${startDateCells.length} 시작일, ${endDateCells.length} 종료일`);
        }

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
        
        // 함수를 호출하여 스타일 추가
        function addDaterangepickerCSS() {
            if (!document.getElementById('custom-daterangepicker-styles')) {
                const styleEl = document.createElement('style');
                styleEl.id = 'custom-daterangepicker-styles';
                styleEl.textContent = `
                    .daterangepicker td {
                        padding: 0 !important;
                    }
                    
                    .daterangepicker td.start-date,
                    .daterangepicker td.end-date {
                        background: transparent !important;
                    }
                    
                    .daterangepicker td.available:hover {
                        border-radius: 50% !important;
                    }
                `;
                document.head.appendChild(styleEl);
            }
        }
        
        addDaterangepickerCSS();
        
        // 날짜 이벤트 모니터링 설정 - 개선된 버전
        function setupDateRangeMonitoring() {
            // 이벤트를 사용하여 감지
            $(datePickerInput).on('hide.daterangepicker apply.daterangepicker show.daterangepicker', function(ev, picker) {
                updateHeaderText(picker);
                
                // 여러 시점에서 원형 스타일 적용
                applyCircleToSelectedDates();
                requestAnimationFrame(applyCircleToSelectedDates);
                setTimeout(applyCircleToSelectedDates, 50);
            });
            
            // 날짜 셀 클릭 이벤트
            $(document).on('click', '.calendar-table td.available', function() {
                setTimeout(function() {
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
                    
                    // 여러 시점에서 원형 스타일 적용
                    applyCircleToSelectedDates();
                    setTimeout(applyCircleToSelectedDates, 100);
                }, 10);
            });
            
            // MutationObserver로 DOM 변경 감지
            const daterangeObserver = new MutationObserver(function(mutations) {
                for (const mutation of mutations) {
                    if (mutation.type === 'attributes' || mutation.type === 'childList') {
                        applyCircleToSelectedDates();
                        break;
                    }
                }
            });
            
            // 데이트픽커가 표시될 때 옵저버 시작
            $(datePickerInput).on('show.daterangepicker', function() {
                const daterangepicker = document.querySelector('.daterangepicker');
                if (daterangepicker) {
                    daterangeObserver.observe(daterangepicker, { 
                        attributes: true, 
                        childList: true, 
                        subtree: true,
                        attributeFilter: ['class'] 
                    });
                }
            });
            
            // 데이트픽커가 숨겨질 때 옵저버 중지
            $(datePickerInput).on('hide.daterangepicker', function() {
                daterangeObserver.disconnect();
            });
        }
        
        setupDateRangeMonitoring();
        
        // 네비게이션 버튼 추가 함수
        function addSvgNavButtons() {
            // 기존 버튼 제거
            $('.svg-nav-btn').remove();
            
            // 모든 캘린더에 대해
            $('.daterangepicker .drp-calendar').each(function() {
                const calendar = $(this);
                
                // 왼쪽 화살표 버튼 생성
                const leftBtn = $(`<button type="button" class="svg-nav-btn prev-month">${prevSvgIcon}</button>`);
                
                // 오른쪽 화살표 버튼 생성
                const rightBtn = $(`<button type="button" class="svg-nav-btn next-month">${nextSvgIcon}</button>`);
                
                // 캘린더에 버튼 삽입
                calendar.css('position', 'relative');
                calendar.prepend(leftBtn);
                calendar.prepend(rightBtn);
                
                // 버튼 클릭 이벤트 (좌우 공통 로직)
                function handleNavButtonClick(e, direction) {
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
                    
                    // 방향에 따라 월 변경
                    if (direction === 'prev') {
                        monthIndex--;
                        if (monthIndex < 0) {
                            monthIndex = 11;
                            year--;
                        }
                    } else {
                        monthIndex++;
                        if (monthIndex > 11) {
                            monthIndex = 0;
                            year++;
                        }
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
                    
                    // 지연 후 버튼 다시 추가 및 원형 스타일 적용
                    setTimeout(function() {
                        addSvgNavButtons();
                        addMobileHeader();
                        addConfirmButton();
                        applyCircleToSelectedDates();
                    }, 0);
                }
                
                // 왼쪽 버튼 클릭 이벤트
                leftBtn.on('click', function(e) {
                    handleNavButtonClick(e, 'prev');
                });
                
                // 오른쪽 버튼 클릭 이벤트
                rightBtn.on('click', function(e) {
                    handleNavButtonClick(e, 'next');
                });
            });
        }
        
        // 모바일 헤더 추가 함수
        function addMobileHeader() {
            // 기존 헤더 제거
            $('.mobile-daterangepicker-header').remove();
            
            // 모바일 환경에서만 추가
            if (isMobile()) {
                console.log("모바일 헤더 추가");
                
                // 헤더 컨테이너 생성
                const headerContainer = $(`<div class="mobile-daterangepicker-header"></div>`);
                
                // 타이틀
                const headerTitle = $(`<div>Check In - Check Out</div>`);
                
                // 닫기 버튼
                const closeBtn = $(`<button type="button" class="mobile-close-btn">${closeSvgIcon}</button>`);
                closeBtn.css({
                    'position': 'absolute',
                    'right': '15px',
                    'top': '50%',
                    'transform': 'translateY(-50%)',
                    'background': 'none',
                    'border': 'none',
                    'cursor': 'pointer',
                    'padding': '8px',
                    'z-index': '1000001',
                    'color': '#000',
                    'display': 'block'
                });
                
                // 헤더에 요소 추가
                headerContainer.append(headerTitle);
                headerContainer.append(closeBtn);
                
                // 헤더를 데이트픽커에 추가
                $('.daterangepicker').prepend(headerContainer);
                
                // 닫기 버튼 클릭 이벤트
                closeBtn.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log("모바일 헤더의 닫기 버튼 클릭됨");
                    
                    // 모든 드롭다운 닫기
                    $('.custom__dropdown').removeClass('active');
                    
                    // 데이트픽커 명시적으로 숨기기
                    $('.daterangepicker').hide();
                    
                    // 데이트픽커 인스턴스를 찾아 닫기 시도
                    try {
                        const picker = $('.daterangepicker').data('daterangepicker');
                        if (picker) {
                            picker.hide();
                        }
                    } catch(e) {
                        console.log("데이트픽커 인스턴스 접근 실패");
                    }
                    
                    // 스크롤 원상복구
                    $('body').removeClass('no-scroll');
                    
                    // 추가로 모든 관련 요소 숨기기
                    setTimeout(function() {
                        $('.daterangepicker').hide();
                        $('.daterangepicker-mobile-header').hide();
                    }, 100);
                });
            }
        }
        
        // 확인 버튼 추가 함수
        function addConfirmButton() {
            // 이미 있는 확인 버튼 제거
            $('.daterangepicker-confirm-btn').remove();
            
            // 확인 버튼 생성
            const confirmBtn = $(`<button type="button" class="daterangepicker-confirm-btn">Confirm</button>`);
            
            if (isMobile()) {
                // 모바일 스타일
                confirmBtn.css({
                    'position': 'fixed',
                    'bottom': '0',
                    'left': '0',
                    'right': '0',
                    'width': '100%',
                    'padding': '15px',
                    'background-color': '#000',
                    'color': '#fff',
                    'border': 'none',
                    'cursor': 'pointer',
                    'font-size': '18px',
                    'font-weight': '500',
                    'font-family': "'Outfit', sans-serif",
                    'z-index': '999999',
                    'border-radius': '0',
                    'margin': '0',
                    'text-transform': 'none'
                });
            } else {
                // 데스크탑 스타일
                confirmBtn.css({
                    'width': '100%',
                    'padding': '12px',
                    'background-color': '#000',
                    'color': '#fff',
                    'border': 'none',
                    'cursor': 'pointer',
                    'margin-top': '15px',
                    'font-size': '16px',
                    'font-weight': '500',
                    'font-family': "'Outfit', sans-serif",
                    'text-transform': 'none'
                });
            }
            
            // daterangepicker에 버튼 추가
            $('.daterangepicker').append(confirmBtn);
            
            // 확인 버튼 클릭 이벤트
            confirmBtn.on('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 날짜가 선택된 경우에만 처리
                if (datePickerInstance.startDate && datePickerInstance.endDate) {
                    // 헤더 텍스트 업데이트
                    updateHeaderText(datePickerInstance);
                    
                    // 원형 스타일 적용
                    applyCircleToSelectedDates();
                    
                    // 드롭다운과 데이트픽커 닫기
                    $('.custom__dropdown').removeClass('active');
                    
                    datePickerInstance.hide();
                    isDateDropdownActive = false;
                    
                    // 스크롤 원상복구
                    $('body').removeClass('no-scroll');
                }
            });
        }
        
        // 데이트픽커 표시 함수
        function showDatePicker() {
            try {
                const dateDropdown = document.querySelector('.date-dropdown');
                const dropdownRect = dateDropdown.getBoundingClientRect();
                
                // 모바일 여부 확인
                const isMobileView = window.innerWidth < 768;
                
                // 모바일에서는 전체 화면으로 표시
                if (isMobileView) {
                    $('body').addClass('no-scroll');
                    
                    $('.daterangepicker').css({
                        'position': 'fixed',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'width': '100%',
                        'height': '100%',
                        'max-width': '100%',
                        'max-height': '100%',
                        'margin': '0',
                        'transform': 'none',
                        'overflow-y': 'auto',
                        'z-index': '9999999',
                        'border-radius': '0',
                        'padding': '0',
                        'box-shadow': 'none',
                        'border': 'none'
                    });
                    
                    $('.daterangepicker .drp-calendars').css({
                        'padding': '60px 20px 80px',
                        'box-sizing': 'border-box',
                        'flex-direction': 'column',
                        'width': '100%',
                        'overflow-y': 'auto',
                        'height': 'calc(100% - 60px)',
                        '-webkit-overflow-scrolling': 'touch',
                        'display': 'flex'
                    });
                    
                    $('.daterangepicker .drp-calendar').css({
                        'max-width': '100%',
                        'width': '100%',
                        'margin': '0',
                        'padding': '0',
                        'display': 'block'
                    });
                    
                    $('.daterangepicker .drp-calendar.left').css({
                        'border-right': 'none',
                        'margin-bottom': '20px',
                        'padding': '0 20px'
                    });
                    
                    $('.daterangepicker .drp-calendar.right').css({
                        'padding': '0 20px 100px'
                    });
                } else {
                    // 데스크탑에서는 드롭다운 아래에 표시
                    $('.daterangepicker').css({
                        'position': 'absolute',
                        'top': (dropdownRect.bottom + window.scrollY) + 'px',
                        'left': (dropdownRect.left + window.scrollX) + 'px',
                        'max-height': (window.innerHeight - dropdownRect.bottom - 20) + 'px',
                        'overflow-y': 'auto',
                        'z-index': '9999999'
                    });
                    
                    $('.daterangepicker .drp-calendars').css({
                        'display': 'flex',
                        'flex-direction': 'row'
                    });
                    
                    $('.daterangepicker .drp-calendar').css({
                        'max-width': '50%',
                        'padding': '0',
                        'margin': '0'
                    });
                    
                    $('.daterangepicker .drp-calendar.left').css({
                        'border-right': '1px solid #ccc',
                        'padding-right': '10px'
                    });
                    
                    $('.daterangepicker .drp-calendar.right').css({
                        'padding': '0 20px'
                    });
                }
                
                // 데이트픽커 표시
                datePickerInstance.show();
                
                // 버튼 영역 숨기기
                $('.daterangepicker .drp-buttons').hide();
                
                // 기존 화살표 숨기기
                $('.daterangepicker .prev, .daterangepicker .next').hide();
                
                // SVG 네비게이션 버튼 추가
                addSvgNavButtons();
                
                // 모바일에서는 헤더와 확인 버튼 추가
                if (isMobileView) {
                    addMobileHeader();
                }
                
                // 확인 버튼 추가
                addConfirmButton();
                
                // 원형 스타일 적용
                applyCircleToSelectedDates();
            } catch (error) {
                console.error('Error showing daterangepicker:', error);
            }
        }
        
        // 데이트픽커 닫힐 때 스크롤 원복
        $(document).on('hide.daterangepicker', function() {
            $('body').removeClass('no-scroll');
        });
        
        // 날짜 셀 클릭 이벤트 처리
        $(document).on('click', '.daterangepicker td.available', function(e) {
            setTimeout(function() {
                // 원형 스타일 재적용
                applyCircleToSelectedDates();
            }, 10);
        });
        
        // 드롭다운 토글 함수
        function toggleDropdown(dropdown) {
            const isActive = dropdown.classList.contains('active');
            
            // 모든 드롭다운 닫기
            document.querySelectorAll('.custom__dropdown').forEach(d => {
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
        
        // 날짜 드롭다운 헤더 클릭 이벤트
        const dateDropdownHeader = dateDropdown.querySelector('.dropdown__header');
        if (dateDropdownHeader) {
            dateDropdownHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleDropdown(dateDropdown);
            });
        }
        
        // 크기 변경 시 위치 조정
        $(window).on('resize', function() {
            if (isDateDropdownActive && datePickerInstance) {
                // 위치 조정 로직
                showDatePicker();
            }
        });
        
        // 외부 클릭 이벤트 처리
        $(document).on('click', function(e) {
            // 데이트픽커나 날짜 드롭다운 영역 외부 클릭 시
            if (!$(e.target).closest('.daterangepicker').length && 
                !$(e.target).closest('.date-dropdown').length) {
                
                // 데이트픽커가 활성화된 상태인 경우
                if (isDateDropdownActive && datePickerInstance) {
                    // 모든 드롭다운 닫기
                    $('.custom__dropdown').removeClass('active');
                    
                    // 데이트픽커 명시적으로 숨기기
                    datePickerInstance.hide();
                    isDateDropdownActive = false;
                    
                    // 스크롤 원상복구
                    $('body').removeClass('no-scroll');
                }
            }
        });
        
        console.log("날짜 드롭다운 초기화 완료");
    }
    
    // ===== 외부 클릭 이벤트 공통 처리 =====
    document.addEventListener('click', function(e) {
        // 메인 페이지 드롭다운 외부 클릭
        if (!e.target.closest('.custom__dropdown') && !e.target.closest('.daterangepicker')) {
            // 메인 페이지 모든 드롭다운 닫기
            document.querySelectorAll('.custom__dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            // 데이트픽커 있는 경우 처리
            if (typeof jQuery !== 'undefined') {
                const datePickerInstance = $(document).find('.daterangepicker').data('daterangepicker');
                if (datePickerInstance) {
                    datePickerInstance.hide();
                    $('body').removeClass('no-scroll');
                }
            }
        }
    });
    
    console.log("날짜 드롭다운 초기화 완료");
});