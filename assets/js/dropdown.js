document.addEventListener('DOMContentLoaded', function() {
    console.log("드롭다운 초기화 시작");

    // ===== 생년월일 드롭다운 초기화 (sign up & mypage) =====
    initBirthDropdowns();
    
    function initBirthDropdowns() {
        // 연도 옵션 추가
        const yearDropdown = document.querySelector('.birth-dropdowns .custom-dropdown:nth-child(1) .dropdown-options');
        if (yearDropdown) {
            console.log("연도 드롭다운 발견");
            // 현재 연도부터 100년 전까지
            const currentYear = new Date().getFullYear();
            for (let year = currentYear; year >= currentYear - 100; year--) {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.textContent = year;
                yearDropdown.appendChild(option);
            }
        }
        
        // 월 옵션 추가
        const monthDropdown = document.querySelector('.birth-dropdowns .custom-dropdown:nth-child(2) .dropdown-options');
        if (monthDropdown) {
            console.log("월 드롭다운 발견");
            const months = [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ];
            
            months.forEach(month => {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.textContent = month;
                monthDropdown.appendChild(option);
            });
        }
        
        // 일 옵션 추가
        const dayDropdown = document.querySelector('.birth-dropdowns .custom-dropdown:nth-child(3) .dropdown-options');
        if (dayDropdown) {
            console.log("일 드롭다운 발견");
            for (let day = 1; day <= 31; day++) {
                const option = document.createElement('div');
                option.className = 'dropdown-option';
                option.textContent = day;
                dayDropdown.appendChild(option);
            }
        }
        
        // 각 드롭다운에 클릭 이벤트 추가
        document.querySelectorAll('.birth-dropdowns .custom-dropdown').forEach(dropdown => {
            const selectedOption = dropdown.querySelector('.selected-option');
            const dropdownOptions = dropdown.querySelector('.dropdown-options');
            
            if (!selectedOption || !dropdownOptions) return;
            
            // 드롭다운 토글
            selectedOption.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("드롭다운 클릭됨");
                
                // 이미 열려 있는지 확인
                const isOpen = dropdownOptions.style.display === 'block';
                
                // 모든 드롭다운 닫기
                document.querySelectorAll('.dropdown-options').forEach(options => {
                    options.style.display = 'none';
                });
                
                // 현재 드롭다운 토글
                if (!isOpen) {
                    dropdownOptions.style.display = 'block';
                }
            });
            
            // 옵션 선택 시 이벤트
            dropdownOptions.addEventListener('click', function(e) {
                const target = e.target;
                if (target.classList.contains('dropdown-option')) {
                    // 선택된 텍스트 저장
                    const selectedText = target.textContent;
                    
                    // 드롭다운 헤더 업데이트 (화살표 유지)
                    const arrowIcon = selectedOption.querySelector('.dropdown-arrow');
                    selectedOption.innerHTML = '';
                    selectedOption.textContent = selectedText;
                    if (arrowIcon) {
                        selectedOption.appendChild(arrowIcon);
                    }
                    
                    // 드롭다운 닫기
                    dropdownOptions.style.display = 'none';
                }
            });
        });
        
        console.log("생년월일 드롭다운 초기화 완료");
    }

    // ===== 메인 페이지 드롭다운 초기화 =====
    initMainDropdowns();
    
    function initMainDropdowns() {
        // 각 드롭다운에 클릭 이벤트 추가
        document.querySelectorAll('.custom__dropdown').forEach(dropdown => {
            // 이미 date-dropdown 클래스를 가진 드롭다운은 건너뛰기 (날짜 드롭다운은 따로 처리)
            if (dropdown.classList.contains('date-dropdown')) {
                return;
            }
            
            const header = dropdown.querySelector('.dropdown__header');
            const dropdownOptions = dropdown.querySelector('.dropdown__options');
            
            if (!header || !dropdownOptions) {
                console.log("메인 드롭다운 요소를 찾을 수 없음");
                return;
            }
            
            // 드롭다운 토글
            header.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("메인 드롭다운 클릭됨");
                
                // 이미 열려 있는지 확인
                const isActive = dropdown.classList.contains('active');
                
                // 모든 드롭다운 닫기
                document.querySelectorAll('.custom__dropdown').forEach(d => {
                    d.classList.remove('active');
                });
                
                // 현재 드롭다운 토글
                if (!isActive) {
                    dropdown.classList.add('active');
                }
            });
            
            // 옵션 선택 시 이벤트
            dropdownOptions.addEventListener('click', function(e) {
                const target = e.target;
                if (target.classList.contains('dropdown__option')) {
                    // 선택된 텍스트 저장
                    const selectedText = target.textContent;
                    const dataValue = target.getAttribute('data-value');
                    
                    // 드롭다운 헤더 업데이트
                    const selectedOptionEl = header.querySelector('.selected__option');
                    if (selectedOptionEl) {
                        selectedOptionEl.textContent = selectedText;
                        
                        // 데이터 값 저장 (필요한 경우)
                        if (dataValue) {
                            selectedOptionEl.setAttribute('data-value', dataValue);
                        }
                    }
                    
                    // 드롭다운 닫기
                    dropdown.classList.remove('active');
                }
            });
        });
        
        console.log("메인 페이지 드롭다운 초기화 완료");
    }

    // ===== 파일 업로드 초기화 =====
    initFileUpload();
    
    function initFileUpload() {
        const fileInput = document.getElementById('passport-upload');
        const fileNameDisplay = document.getElementById('file-name-display');
        const clearFileButton = document.getElementById('clear-file');
        
        if (!fileInput || !fileNameDisplay || !clearFileButton) return;
        
        console.log("파일 업로드 기능 초기화");
        
        // 파일 업로드시 파일명 표시
        fileInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                
                // 파일 크기를 MB 단위로 계산 (소수점 한자리까지)
                const fileSizeInMB = (file.size / 1024 / 1024).toFixed(1);
                
                // 파일명과 크기를 표시
                fileNameDisplay.value = `${file.name} (${fileSizeInMB}mb)`;
                
                // 파일이 선택되면 X 버튼 표시
                clearFileButton.style.display = 'block';
            }
        });
        
        // X 버튼 클릭시 파일 선택 초기화
        clearFileButton.addEventListener('click', function() {
            // 파일 인풋 초기화
            fileInput.value = '';
            
            // 파일명 표시 초기화
            fileNameDisplay.value = '';
            
            // X 버튼 숨기기
            this.style.display = 'none';
        });
        
        // 페이지 로드시 기본적으로 X 버튼 숨기기 (파일이 없는 경우)
        if (!fileInput.files || fileInput.files.length === 0) {
            clearFileButton.style.display = 'none';
        }
    }

    // Global storage for date picker instances to sync between them
    const datePickerRegistry = {
        instances: [],
        lastSelectedRange: null,
        // 레지스트리 요소 추가 함수
        register: function(instance, element, dropdownIndex, isSticky, isGadiMain, selectedOption) {
            this.instances.push({
                id: dropdownIndex,
                instance: instance,
                element: element,
                selectedOption: selectedOption,
                input: document.getElementById(`date-picker-input-${dropdownIndex}`),
                isSticky: isSticky,
                isGadiMain: isGadiMain
            });
            console.log(`레지스트리에 추가: dropdownIndex=${dropdownIndex}, isSticky=${isSticky}, isGadiMain=${isGadiMain}`);
        },
        // 레지스트리에서 요소 찾기
        findByContainer: function(container) {
            return this.instances.find(item => 
                item.instance && item.instance.container && 
                item.instance.container.get(0) === container.get(0)
            );
        }
    };

    // ===== 날짜 드롭다운 초기화 =====
    // 모든 date-dropdown 클래스를 가진 요소를 찾아서 각각 초기화
    const dateDropdowns = document.querySelectorAll('.date-dropdown');
    
    if (dateDropdowns.length > 0) {
        console.log(`${dateDropdowns.length}개의 날짜 드롭다운을 찾음`);
        dateDropdowns.forEach((dateDropdown, index) => {
            console.log(`날짜 드롭다운 #${index + 1} 초기화 시작`);
            
            // 스티키 네비게이션과 메인 컨텐츠 영역 구분
            const isSticky = dateDropdown.closest('.sticky-nav') !== null;
            const isGadiMain = dateDropdown.closest('.gadi__main') !== null;
            
            // 드롭다운의 역할 로깅
            if (isSticky) {
                console.log(`드롭다운 #${index + 1}은 sticky-nav에 위치`);
            } else if (isGadiMain) {
                console.log(`드롭다운 #${index + 1}은 gadi__main에 위치`);
            }
            
            initDateDropdown(dateDropdown, index, isSticky, isGadiMain);
        });
    } else {
        console.log("날짜 드롭다운을 찾을 수 없음");
    }
    
    function initDateDropdown(dateDropdown, dropdownIndex, isSticky, isGadiMain) {
        if (!dateDropdown) {
            console.log("날짜 드롭다운을 찾을 수 없음");
            return;
        }
        
        console.log(`날짜 드롭다운 #${dropdownIndex + 1} 초기화 시작`);
        
        // 모든 드롭다운 요소 선택
        const dropdowns = document.querySelectorAll('.custom__dropdown');
        
        // 기본 텍스트 설정
        const selectedOption = dateDropdown.querySelector('.selected__option');
        if (selectedOption) {
            // 페이지 URL을 확인하여 서브페이지인지 확인
            const isSubpage = window.location.pathname.includes('gadi.html') || 
                             window.location.pathname.includes('subpage') || 
                             document.querySelector('.gadi__main');
            
            // 서브페이지와 메인 페이지에 따라 다른 형식 적용
            if (isSubpage) {
                selectedOption.textContent = 'Check in   -   Check out'; // 서브페이지용 포맷 (대시 앞뒤로 더 많은 공백)
                selectedOption.style.letterSpacing = '0.5px'; // 글자 간격 조정
            } else {
                selectedOption.textContent = 'Check in / out'; // 메인 페이지용 포맷
            }
        }
        
        // 날짜 선택 결과를 저장할 input 요소 생성 (고유 ID 부여)
        const datePickerInputId = `date-picker-input-${dropdownIndex}`;
        let datePickerInput = document.getElementById(datePickerInputId);
        
        if (!datePickerInput) {
            datePickerInput = document.createElement('input');
            datePickerInput.type = 'text';
            datePickerInput.id = datePickerInputId;
            datePickerInput.style.position = 'absolute';
            datePickerInput.style.opacity = '0';
            datePickerInput.style.height = '0';
            datePickerInput.style.pointerEvents = 'none';
            dateDropdown.appendChild(datePickerInput);
        }
        
        // jQuery가 있는지 확인
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

        // 범위 선택 모드 강제 적용 함수 (개선)
        function forceRangeSelection(datePickerInstance) {
            if (datePickerInstance) {
                // 강제로 범위 선택 모드 설정
                datePickerInstance.singleDatePicker = false;
                datePickerInstance.autoApply = false;
                datePickerInstance.linkedCalendars = true;
                
                // 강제로 날짜 선택 모드 변경
                if (datePickerInstance.container) {
                    datePickerInstance.container.find('.daterangepicker').removeClass('single picker_1');
                    datePickerInstance.container.find('.daterangepicker').addClass('picker_2');
                    
                    // 명시적으로 날짜 선택 로직 재정의 - 중요!
                    datePickerInstance.clickDate = function(e) {
                        const $clickedElement = $(e.target);
                        const selectedDate = moment($clickedElement.attr('data-date'), 'YYYY-MM-DD');
                        
                        console.log("clickDate 호출됨:", $clickedElement.attr('data-date'));
                        
                        if (!this.endDate || this.startDate.isAfter(selectedDate)) {
                            // 종료일이 없거나 클릭한 날짜가 시작일보다 이전인 경우
                            this.setStartDate(selectedDate);
                            this.setEndDate(null);
                        } else if (this.startDate && !this.endDate) {
                            // 시작일은 있고 종료일이 없는 경우, 종료일 설정
                            this.setEndDate(selectedDate);
                        } else {
                            // 둘 다 있는 경우 새로운 선택 시작
                            this.setStartDate(selectedDate);
                            this.setEndDate(null);
                        }
                        
                        if (this.autoApply) {
                            this.calculateChosenLabel();
                            this.clickApply();
                        }
                        
                        this.updateView();
                        
                        console.log("날짜 선택 재정의 로직 실행:", 
                            this.startDate ? this.startDate.format('YYYY-MM-DD') : '없음', 
                            this.endDate ? this.endDate.format('YYYY-MM-DD') : '없음');
                    };
                }
                
                console.log("범위 선택 모드 강제 적용:", {
                    singleDatePicker: datePickerInstance.singleDatePicker,
                    autoApply: datePickerInstance.autoApply,
                    linkedCalendars: datePickerInstance.linkedCalendars
                });
            }
        }

        // Date Range Picker 초기화 설정 (개선)
        const pickerOptions = {
            opens: 'center',
            autoApply: false,
            minDate: moment(),
            autoUpdateInput: false,
            singleDatePicker: false, // 항상 false로 설정
            linkedCalendars: true,
            locale: {
                format: 'YYYY-MM-DD',
                separator: ' ~ ',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 0
            }
        };
        
        // sticky-nav에 대한 강화된 특별 처리
        if (isSticky) {
            pickerOptions.singleDatePicker = false; // 무조건 범위 선택 모드
            pickerOptions.autoApply = false;
            pickerOptions.linkedCalendars = true;
            
            // 기록을 남겨 디버깅 용이하게
            console.log("스티키 네비게이션 데이트픽커 설정:", {
                singleDatePicker: pickerOptions.singleDatePicker,
                autoApply: pickerOptions.autoApply,
                linkedCalendars: pickerOptions.linkedCalendars
            });
        }
        
        // Check if we already have a selected range in the registry
        if (datePickerRegistry.lastSelectedRange) {
            pickerOptions.startDate = datePickerRegistry.lastSelectedRange.startDate;
            pickerOptions.endDate = datePickerRegistry.lastSelectedRange.endDate;
        }
        
        // 데이트픽커 초기화 (고유한 컨테이너 지정)
        $(datePickerInput).daterangepicker(pickerOptions);
        
        // 데이트픽커 인스턴스 저장
        datePickerInstance = $(datePickerInput).data('daterangepicker');
        
        // 초기화 직후 강제 범위 선택 모드 적용
        forceRangeSelection(datePickerInstance);

        // 날짜 선택이 가능하도록 설정 - 중요!
        if (isSticky) {
            setTimeout(function() {
                if (datePickerInstance && datePickerInstance.container) {
                    datePickerInstance.container.find('.calendar-table').css('pointer-events', 'auto');
                    datePickerInstance.container.find('td.available').css('cursor', 'pointer');
                    
                    console.log("스티키 네비게이션 캘린더 선택 가능하게 설정됨");
                    
                    // 스티키 캘린더에서의 선택을 명시적으로 활성화
                    datePickerInstance.container.on('click', 'td.available', function(e) {
                        console.log("스티키 캘린더 날짜 클릭됨");
                        e.stopPropagation();
                        
                        // 날짜 선택 로직이 실행되도록 함
                        const date = moment($(this).attr('data-date'), 'YYYY-MM-DD');
                        
                        if (!datePickerInstance.endDate || datePickerInstance.startDate.isAfter(date)) {
                            // 종료일이 없거나 클릭한 날짜가 시작일보다 이전인 경우
                            datePickerInstance.setStartDate(date);
                            datePickerInstance.setEndDate(null);
                        } else if (datePickerInstance.startDate && !datePickerInstance.endDate) {
                            // 시작일은 있고 종료일이 없는 경우, 종료일 설정
                            datePickerInstance.setEndDate(date);
                            
                            // 양쪽 날짜가 선택되었으므로 동기화
                            synchronizeDatePickers(datePickerInstance, dropdownIndex);
                            updateHeaderText(datePickerInstance);
                        } else {
                            // 둘 다 있는 경우 새로운 선택 시작
                            datePickerInstance.setStartDate(date);
                            datePickerInstance.setEndDate(null);
                        }
                        
                        datePickerInstance.updateView();
                        applyCircleToSelectedDates();
                    });
                }
            }, 100);
        }

        // 여러 이벤트에서 범위 선택 모드 강제 적용
        $(datePickerInput).on('show.daterangepicker', function(ev, picker) {
            forceRangeSelection(picker);
            
            // 스티키 네비게이션에서는 선택 가능하게 설정
            if (isSticky && picker.container) {
                picker.container.find('.calendar-table').css('pointer-events', 'auto');
                picker.container.find('td.available').css('cursor', 'pointer');
            }
        });

        $(datePickerInput).on('hide.daterangepicker', function(ev, picker) {
            forceRangeSelection(picker);
        });

        // Register this instance globally
        datePickerRegistry.register(datePickerInstance, dateDropdown, dropdownIndex, isSticky, isGadiMain, selectedOption);
        
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
        // CSS 스타일 추가 (ID를 고유하게 설정)
        const dateStyleTagId = `daterange-circle-fix-${dropdownIndex}`;
        if (!document.getElementById(dateStyleTagId)) {
            const dateStyleTag = document.createElement('style');
            dateStyleTag.id = dateStyleTagId;
            dateStyleTag.textContent = roundDateStyle;
            document.head.appendChild(dateStyleTag);
        }
        
        // 기존 CSS 스타일 추가 (이미 존재하면 추가하지 않음)
        if (!document.getElementById('daterangepicker-styles')) {
            const styleEl = document.createElement('style');
            styleEl.id = 'daterangepicker-styles';
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
                        height: calc(100% - 120px) !important; /* 헤더와 버튼 고려 */
                        padding-bottom: 100px !important; /* 하단 버튼 공간 고려 */
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
                padding: 0 !important;
                vertical-align: middle !important;
                position: relative !important;
            }
            
            .daterangepicker td.available:hover {
                background-color: transparent !important;
                position: relative !important;
            }
            
            .daterangepicker td.available:hover::before {
                content: "";
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 36px;
                height: 36px;
                border-radius: 50%;
                background-color: #f0f0f0;
                z-index: -1;
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
                display: none !important; /* 기본적으로 숨김 */
            }
            
            /* 메인 페이지 드롭다운 스타일 */
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
                    width: 100% !important;
                    top: 0 !important;
                    left: 0 !important;
                    padding: 0px !important; /* 닫기 버튼 공간 확보 */
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
                    display: block !important; /* 모바일에서만 표시 */
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
        }

        // 헤더 텍스트 업데이트 함수
        function updateHeaderText(picker) {
            if (picker.startDate && picker.endDate) {
                const startFormat = picker.startDate.format('MMM D');
                const endFormat = picker.endDate.format('MMM D');
                
                if (selectedOption) {
                    // 페이지 URL을 확인하여 서브페이지인지 확인
                    const isSubpage = window.location.pathname.includes('gadi.html') || 
                                    window.location.pathname.includes('subpage') || 
                                    document.querySelector('.gadi__main');
                    
                    // 서브페이지와 메인 페이지에 따라 다른 형식 적용
                    if (isSubpage) {
                        selectedOption.textContent = `${startFormat}   -   ${endFormat}`; // 서브페이지용 포맷 (대시 앞뒤로 더 많은 공백)
                    } else {
                        selectedOption.textContent = `${startFormat} - ${endFormat}`; // 메인 페이지용 포맷
                    }
                    
                    // 모든 selected__option 요소를 찾아서 업데이트 (현재 드롭다운에 국한되지 않게)
                    console.log(`업데이트된 날짜: ${startFormat} - ${endFormat}`);
                }
                
                // 날짜 선택 상태 업데이트
                dateSelected = true;
            }
        }
        
        // Function to synchronize all date pickers (개선된 양방향 동기화)
        function synchronizeDatePickers(sourcePicker, sourceDropdownIndex) {
            // Store the last selected range in the registry
            if (sourcePicker.startDate && sourcePicker.endDate) {
                datePickerRegistry.lastSelectedRange = {
                    startDate: sourcePicker.startDate,
                    endDate: sourcePicker.endDate
                };
                
                console.log('저장된 날짜 범위:', 
                    sourcePicker.startDate.format('YYYY-MM-DD'), 
                    sourcePicker.endDate.format('YYYY-MM-DD'),
                    '소스 드롭다운:', sourceDropdownIndex);
                
                // Update all other date pickers (양방향 동기화)
                datePickerRegistry.instances.forEach(item => {
                    // Skip the source picker to avoid infinite loops
                    if (item.id === sourceDropdownIndex) return;
                    
                    try {
                        const otherPicker = item.instance;
                        const otherSelectedOption = item.selectedOption;
                        const isDropdownInSubpage = item.element.closest('.gadi__main') !== null || 
                                                   window.location.pathname.includes('gadi.html') || 
                                                   window.location.pathname.includes('subpage');
                        
                        // Set dates on other pickers
                        if (otherPicker) {
                            console.log(`드롭다운 #${item.id + 1} 날짜 업데이트 시작 (${item.isSticky ? '스티키' : '일반'})`);
                            
                            // 날짜 범위 설정
                            otherPicker.setStartDate(sourcePicker.startDate);
                            otherPicker.setEndDate(sourcePicker.endDate);
                            
                            // 날짜 형식 지정
                            const startFormat = sourcePicker.startDate.format('MMM D');
                            const endFormat = sourcePicker.endDate.format('MMM D');
                            
                            // 선택된 옵션 텍스트 업데이트
                            if (otherSelectedOption) {
                                // Apply different formatting based on location
                                if (isDropdownInSubpage) {
                                    otherSelectedOption.textContent = `${startFormat}   -   ${endFormat}`;
                                } else {
                                    otherSelectedOption.textContent = `${startFormat} - ${endFormat}`;
                                }
                            }
                            
                            // UI 업데이트
                            otherPicker.updateView();
                            
                            console.log(`드롭다운 #${item.id + 1} 동기화 완료:`, startFormat, '-', endFormat);
                        }
                    } catch (error) {
                        console.error(`드롭다운 #${item.id + 1} 동기화 오류:`, error);
                    }
                });
            }
        }
        
        // 선택된 날짜 셀에 둥근 스타일 적용
        function applyCircleToSelectedDates() {
            $('.daterangepicker td.start-date, .daterangepicker td.end-date').each(function() {
                const cellText = $(this).text().trim();
                
                // 기존 원 제거
                $(this).find('.date-circle').remove();
                
                // 새로운 원 추가
                const $circleDiv = $('<div>')
                    .addClass('date-circle')
                    .text(cellText)
                    .css({
                        'position': 'absolute',
                        'top': '50%',
                        'left': '50%',
                        'transform': 'translate(-50%, -50%)',
                        'width': '36px',
                        'height': '36px', 
                        'background-color': '#000',
                        'color': '#fff',
                        'border-radius': '50%',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'text-align': 'center',
                        'line-height': '36px',
                        'z-index': '1'
                    });
                
                // 셀 포지션 설정
                $(this).css({
                    'position': 'relative',
                    'background-color': 'transparent'
                });
                
                // 셀에 원 추가
                $(this).html($circleDiv);
            });
        }

        function addDaterangepickerCSS() {
            if (!document.getElementById('custom-daterangepicker-styles')) {
                const styleEl = document.createElement('style');
                styleEl.id = 'custom-daterangepicker-styles';
                styleEl.textContent = `
                    .daterangepicker td {
                        padding: 0 !important;
                        text-align: center !important;
                        vertical-align: middle !important;
                        line-height: 40px !important;
                        width: 40px !important;
                        height: 40px !important;
                    }
                    
                    .daterangepicker td.start-date,
                    .daterangepicker td.end-date {
                        background: transparent !important;
                    }
                    
                    .daterangepicker td.available:hover {
                        border-radius: 50% !important;
                        background-color: #f0f0f0 !important;
                        position: relative !important;
                    }
                    
                    .daterangepicker td.available:hover:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        background-color: #f0f0f0;
                        z-index: -1;
                    }
                    
                    .daterangepicker .calendar-table {
                        padding: 0 !important;
                        border-spacing: 0 !important;
                        border-collapse: collapse !important;
                    }
                    
                    .daterangepicker td.active, 
                    .daterangepicker td.active:hover {
                        border-radius: 50% !important;
                        background-color: transparent !important;
                    }
                `;
                document.head.appendChild(styleEl);
            }
        }
        
        // 함수를 호출하여 스타일 추가
        addDaterangepickerCSS();
        
        // 날짜 범위 선택 직접 감시 및 업데이트
        function setupDateRangeMonitoring() {
            // 이벤트를 사용하여 감지
            $(datePickerInput).on('hide.daterangepicker apply.daterangepicker', function(ev, picker) {
                console.log("이벤트 감지: ", ev.type, " 날짜: ", 
                           picker.startDate ? picker.startDate.format('YYYY-MM-DD') : 'none',
                           picker.endDate ? picker.endDate.format('YYYY-MM-DD') : 'none');
                
                updateHeaderText(picker);
                
                // Synchronize with other date pickers
                synchronizeDatePickers(picker, dropdownIndex);
                
                setTimeout(applyCircleToSelectedDates, 10);
                applyCircleToSelectedDates();
            });
            
            $(datePickerInput).on('select', function(ev, picker) {
                if (picker.startDate && picker.endDate) {
                    // 시작일과 종료일 사이의 날짜 범위 강조
                    $('.daterangepicker td.in-range').addClass('selected-range');
                }
            });
            
            // 날짜 셀 클릭 이벤트 처리 (특별 범위 처리 추가)
            $(document).off('click.dateSelect').on('click.dateSelect', '.daterangepicker td.available', function(e) {
                // 현재 클릭된 셀의 daterangepicker 컨테이너 찾기
                const container = $(this).closest('.daterangepicker');
                let targetInstance = null;
                let targetDropdownIndex = -1;
                
                // 현재 컨테이너와 관련된 daterangepicker 인스턴스 찾기
                for (const registryItem of datePickerRegistry.instances) {
                    if (registryItem.instance && registryItem.instance.container && 
                        registryItem.instance.container.get(0) === container.get(0)) {
                        
                        targetInstance = registryItem.instance;
                        targetDropdownIndex = registryItem.id;
                        
                        // 이 인스턴스의 스티키 여부 확인 로깅
                        const isTargetSticky = registryItem.isSticky;
                        console.log(`날짜 클릭 감지: dropdownIndex=${targetDropdownIndex}, isSticky=${isTargetSticky}`);
                        break;
                    }
                }
                
                // 인스턴스를 찾았으면 처리
                if (targetInstance) {
                    forceRangeSelection(targetInstance);
                    
                    // 양방향 동기화를 위한 딜레이 설정
                    setTimeout(function() {
                        // 두 날짜가 모두 선택됐는지 확인
                        if (targetInstance.startDate && targetInstance.endDate) {
                            synchronizeDatePickers(targetInstance, targetDropdownIndex);
                            applyCircleToSelectedDates();
                            console.log("양방향 동기화 완료");
                        }
                    }, 50);
                }
            });
            
            // 캘린더에서 날짜 변경 감지 - 더블클릭 방지
            let lastClickTime = 0;
            $(document).off('mouseup.dateSelect mousedown.dateSelect').on('mouseup.dateSelect', '.calendar-table td', function() {
                const now = new Date().getTime();
                if (now - lastClickTime < 300) return; // 더블클릭 방지
                lastClickTime = now;
                
                setTimeout(function() {
                    console.log("날짜 상태 확인: ", 
                              "dropdownIndex=", dropdownIndex,
                              "isSticky=", isSticky,
                              "isGadiMain=", isGadiMain,
                              "startDate=", datePickerInstance.startDate ? datePickerInstance.startDate.format('YYYY-MM-DD') : 'none',
                              "endDate=", datePickerInstance.endDate ? datePickerInstance.endDate.format('YYYY-MM-DD') : 'none');
                    
                    if (datePickerInstance.startDate && datePickerInstance.endDate) {
                        updateHeaderText(datePickerInstance);
                        
                        // Synchronize with other date pickers
                        synchronizeDatePickers(datePickerInstance, dropdownIndex);
                    }
                    applyCircleToSelectedDates();
                }, 50);
            });
            
            // 첫 번째 날짜 클릭시에도 표시 업데이트
            $(document).off('click.datePreview').on('click.datePreview', '.calendar-table td.available', function() {
                setTimeout(function() {
                    // 시작일만 선택된 경우도 표시
                    if (datePickerInstance.startDate) {
                        const startFormat = datePickerInstance.startDate.format('MMM D');
                        if (selectedOption) {
                            if (datePickerInstance.endDate) {
                                const endFormat = datePickerInstance.endDate.format('MMM D');
                                
                                // 페이지 URL을 확인하여 서브페이지인지 확인
                                const isSubpage = window.location.pathname.includes('gadi.html') || 
                                                window.location.pathname.includes('subpage') || 
                                                document.querySelector('.gadi__main');
                                
                                if (isSubpage) {
                                    selectedOption.textContent = `${startFormat}   -   ${endFormat}`;
                                } else {
                                    selectedOption.textContent = `${startFormat} - ${endFormat}`;
                                }
                                
                                // Only synchronize when both dates are selected
                                synchronizeDatePickers(datePickerInstance, dropdownIndex);
                            } else {
                                selectedOption.textContent = `${startFormat} - ...`;
                            }
                        }
                    }
                    applyCircleToSelectedDates();
                }, 10);
            });
        }
        
        // 날짜 이벤트 모니터링 설정
        setupDateRangeMonitoring();
        
        // 초기에는 선택이 없도록
        function clearDateRangeStyles() {
            $('.daterangepicker td.start-date').removeClass('start-date').removeClass('active');
            $('.daterangepicker td.end-date').removeClass('end-date').removeClass('active');
            $('.daterangepicker td.in-range').removeClass('in-range');
        }
        
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
                    
                    // 지연 후 버튼 다시 추가
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
                }).on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    console.log("모바일 헤더의 닫기 버튼 클릭됨");
                    
                    // 모든 드롭다운 닫기
                    $('.custom__dropdown').removeClass('active');
                    
                    // 데이트픽커 명시적으로 숨기기
                    $('.daterangepicker').hide();
                    
                    // 데이트픽커 인스턴스 숨기기
                    if (datePickerInstance) {
                        datePickerInstance.hide();
                    }
                    
                    // 스크롤 원상복구
                    $('body').removeClass('no-scroll');
                });
                
                // 헤더에 요소 추가
                headerContainer.append(headerTitle);
                headerContainer.append(closeBtn);
                
                // 헤더를 데이트픽커에 추가
                $('.daterangepicker').prepend(headerContainer);
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
                }).on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 날짜가 선택된 경우에만 처리
                    if (datePickerInstance && datePickerInstance.startDate && datePickerInstance.endDate) {
                        // 앱에 선택 저장 - 날짜 선택 이벤트 트리거
                        datePickerInstance.element.trigger('apply.daterangepicker', datePickerInstance);
                        
                        // 헤더 텍스트 업데이트
                        updateHeaderText(datePickerInstance);
                        
                        // Synchronize with other date pickers
                        synchronizeDatePickers(datePickerInstance, dropdownIndex);
                        
                        // 모든 dropdown__header .selected__option 요소에 날짜 범위 표시
                        const isSubpage = window.location.pathname.includes('gadi.html') || 
                                         window.location.pathname.includes('subpage') || 
                                         document.querySelector('.gadi__main');
                        
                        const startFormat = datePickerInstance.startDate.format('MMM D');
                        const endFormat = datePickerInstance.endDate.format('MMM D');
                        
                        document.querySelectorAll('.date-dropdown .dropdown__header .selected__option').forEach(element => {
                            if (isSubpage) {
                                element.textContent = `${startFormat}   -   ${endFormat}`;
                            } else {
                                element.textContent = `${startFormat} - ${endFormat}`;
                            }
                        });
                        
                        // 모든 드롭다운 닫기
                        $('.custom__dropdown').removeClass('active');
                        
                        // 데이트픽커 숨기기
                        datePickerInstance.hide();
                        
                        // 스크롤 원상복구
                        $('body').removeClass('no-scroll');
                    }
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
                }).on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // 날짜가 선택된 경우에만 처리
                    if (datePickerInstance && datePickerInstance.startDate && datePickerInstance.endDate) {
                        // 앱에 선택 저장 - 날짜 선택 이벤트 트리거
                        datePickerInstance.element.trigger('apply.daterangepicker', datePickerInstance);
                        
                        // 헤더 텍스트 업데이트
                        updateHeaderText(datePickerInstance);
                        
                        // Synchronize with other date pickers
                        synchronizeDatePickers(datePickerInstance, dropdownIndex);
                        
                        // 모든 dropdown__header .selected__option 요소에 날짜 범위 표시
                        const isSubpage = window.location.pathname.includes('gadi.html') || 
                                         window.location.pathname.includes('subpage') || 
                                         document.querySelector('.gadi__main');
                        
                        const startFormat = datePickerInstance.startDate.format('MMM D');
                        const endFormat = datePickerInstance.endDate.format('MMM D');
                        
                        document.querySelectorAll('.date-dropdown .dropdown__header .selected__option').forEach(element => {
                            if (isSubpage) {
                                element.textContent = `${startFormat}   -   ${endFormat}`;
                            } else {
                                element.textContent = `${startFormat} - ${endFormat}`;
                            }
                        });
                        
                        // 모든 드롭다운 닫기
                        $('.custom__dropdown').removeClass('active');
                        
                        // 데이트픽커 숨기기
                        datePickerInstance.hide();
                    }
                });
            }
            
            // daterangepicker에 버튼 추가
            $('.daterangepicker').append(confirmBtn);
        }
        
        // 날짜 선택 이벤트 처리
        $(datePickerInput).on('apply.daterangepicker', function(ev, picker) {
            console.log("날짜 적용:", picker.startDate ? picker.startDate.format('YYYY-MM-DD') : 'none', 
                       picker.endDate ? picker.endDate.format('YYYY-MM-DD') : 'none');
            
            if (picker.startDate && picker.endDate) {
                // 날짜가 선택됨
                dateSelected = true;
                
                // 날짜 포맷
                updateHeaderText(picker);
                
                // Synchronize with other date pickers
                synchronizeDatePickers(picker, dropdownIndex);
                
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
                
                // 모든 dropdown__header .selected__option 요소에 날짜 범위 표시
                const isSubpage = window.location.pathname.includes('gadi.html') || 
                                 window.location.pathname.includes('subpage') || 
                                 document.querySelector('.gadi__main');
                
                const startFormat = picker.startDate.format('MMM D');
                const endFormat = picker.endDate.format('MMM D');
                
                document.querySelectorAll('.date-dropdown .dropdown__header .selected__option').forEach(element => {
                    if (isSubpage) {
                        element.textContent = `${startFormat}   -   ${endFormat}`;
                    } else {
                        element.textContent = `${startFormat} - ${endFormat}`;
                    }
                });
                
                // 스타일 재적용 및 SVG 버튼 다시 추가
                setTimeout(function() {
                    applyDatePickerStyles();
                    addSvgNavButtons();
                    addMobileHeader();
                    addConfirmButton();
                    applyCircleToSelectedDates();
                }, 10);
            }
        });
        
        // 데이트픽커 표시 함수 (개선)
        function showDatePicker() {
            try {
                console.log(`데이트픽커 표시: dropdownIndex=${dropdownIndex}, isSticky=${isSticky}, isGadiMain=${isGadiMain}`);
                
                // 스티키 네비게이션인 경우 특별 강화 처리
                if (isSticky) {
                    console.log("스티키 네비게이션 데이트픽커 표시 - 선택 가능하게 설정");
                    
                    // 1) 데이트픽커 설정 강제 변경
                    datePickerInstance.singleDatePicker = false;
                    datePickerInstance.autoApply = false;
                    datePickerInstance.linkedCalendars = true;
                    
                    // 2) 데이트픽커 컨테이너가 생성된 후에 추가 설정
                    setTimeout(function() {
                        // 날짜 선택 가능하게 설정
                        if (datePickerInstance.container) {
                            datePickerInstance.container.find('.calendar-table').css('pointer-events', 'auto');
                            datePickerInstance.container.find('td.available').css('cursor', 'pointer');
                            
                            // 이미 선택된 날짜가 있다면 표시
                            if (datePickerRegistry.lastSelectedRange) {
                                datePickerInstance.setStartDate(datePickerRegistry.lastSelectedRange.startDate);
                                datePickerInstance.setEndDate(datePickerRegistry.lastSelectedRange.endDate);
                                datePickerInstance.updateView();
                                applyCircleToSelectedDates();
                            }
                        }
                    }, 50);
                } else {
                    // 일반 범위 선택 모드 적용
                    forceRangeSelection(datePickerInstance);
                }
                
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
                
                // Load synchronization data if available
                if (datePickerRegistry.lastSelectedRange) {
                    datePickerInstance.setStartDate(datePickerRegistry.lastSelectedRange.startDate);
                    datePickerInstance.setEndDate(datePickerRegistry.lastSelectedRange.endDate);
                    updateHeaderText(datePickerInstance);
                    dateSelected = true;
                }
                
                // 데이트픽커 표시
                datePickerInstance.show();
                
                // 버튼 영역 숨기기
                $('.daterangepicker .drp-buttons').hide();
                
                // 스티키 네비게이션에 대한 특별 처리
                if (isSticky) {
                    // 미니 디버그 패널 추가하여 상태 확인 (개발용, 실 서비스에서는 제거)
                    const $debugPanel = $('<div>').css({
                        'position': 'absolute',
                        'bottom': '5px',
                        'right': '5px',
                        'font-size': '10px',
                        'background': 'rgba(255,255,255,0.8)',
                        'padding': '2px',
                        'z-index': '9999999',
                        'display': 'none' // 실제 사용시에는 숨김
                    }).text(`[디버그] 스티키=${isSticky}, 범위선택=${!datePickerInstance.singleDatePicker}`);
                    $('.daterangepicker').append($debugPanel);
                }
                
                // 기존 화살표 숨기기
                $('.daterangepicker .prev, .daterangepicker .next').hide();
                
                // 날짜가 선택되지 않은 경우 스타일 초기화
                if (!dateSelected) {
                    clearDateRangeStyles();
                }
                
                // SVG 네비게이션 버튼 추가
                addSvgNavButtons();
                
                // 모바일에서는 헤더와 확인 버튼 추가
                if (isMobileView) {
                    addMobileHeader();
                    addConfirmButton();
                } else {
                    // 데스크탑에서는 확인 버튼만 추가
                    addConfirmButton();
                }
                
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
        
        // 날짜 드롭다운 헤더 클릭 이벤트
        const dateDropdownHeader = dateDropdown.querySelector('.dropdown__header');
        if (dateDropdownHeader) {
            dateDropdownHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 범위 선택 다시 한 번 강제 적용
                forceRangeSelection(datePickerInstance);
                
                toggleDropdown(dateDropdown);
            });
        }
        
        // 크기 변경 시 위치 조정
        $(window).on('resize', function() {
            if (isDateDropdownActive && datePickerInstance) {
                // 모바일 여부에 따라 다른 스타일 적용
                if (isMobile()) {
                    $('.daterangepicker').css({
                        'position': 'fixed',
                        'top': '0',
                        'left': '0',
                        'right': '0',
                        'bottom': '0',
                        'width': '100%',
                        'height': '100%',
                        'max-width': '100%',
                        'margin': '0',
                        'transform': 'none'
                    });
                } else {
                    const dropdownRect = dateDropdown.getBoundingClientRect();
                    $('.daterangepicker').css({
                        'position': 'absolute',
                        'top': (dropdownRect.bottom + window.scrollY) + 'px',
                        'left': (dropdownRect.left + window.scrollX) + 'px',
                        'width': 'auto',
                        'height': 'auto'
                    });
                }
                
                // 모바일 레이아웃 조정
                if (isMobile()) {
                    $('.daterangepicker .drp-calendars').css({
                        'flex-direction': 'column',
                        'width': '100%'
                    });
                    
                    $('.daterangepicker .drp-calendar').css({
                        'max-width': '100%',
                        'width': '100%'
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
                    $('.daterangepicker .drp-calendars').css({
                        'flex-direction': 'row'
                    });
                    
                    $('.daterangepicker .drp-calendar').css({
                        'max-width': '50%'
                    });
                    
                    $('.daterangepicker .drp-calendar.left').css({
                        'border-right': '1px solid #ccc',
                        'padding-right': '10px',
                        'margin-bottom': '0'
                    });
                    
                    $('.daterangepicker .drp-calendar.right').css({
                        'padding': '0 20px'
                    });
                }
                
                // 스타일 재적용 및 버튼 추가
                addSvgNavButtons();
                addMobileHeader();
                addConfirmButton();
                applyCircleToSelectedDates();
            }
        });
        
        // 원형 스타일 적용 함수
        function applyDatePickerStyles() {
            addSvgNavButtons();
            addMobileHeader();
            addConfirmButton();
            applyCircleToSelectedDates();
        }

        // If there's already selected date in registry, update header text
        $(datePickerInput).on('show.daterangepicker', function() {
            forceRangeSelection(datePickerInstance);
        });

        console.log(`날짜 드롭다운 #${dropdownIndex + 1} 초기화 완료`);
    }
    
    // ===== 외부 클릭 이벤트 공통 처리 =====
    document.addEventListener('click', function(e) {
        // 생년월일 드롭다운 외부 클릭
        if (!e.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.dropdown-options').forEach(options => {
                options.style.display = 'none';
            });
        }
        
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
    
    console.log("모든 드롭다운 초기화 완료");
});