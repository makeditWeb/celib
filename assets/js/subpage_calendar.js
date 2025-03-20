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
        let datePickerInput = null;
        
        // 스타일 추가
        addDaterangepickerStyles();
        
        // 간소화된 초기화 함수
        initSimpleDatePicker();
        
        function addDaterangepickerStyles() {
            // 날짜 원형 스타일 CSS
            const dateCircleStyle = document.createElement('style');
            dateCircleStyle.textContent = `
                .daterangepicker td.start-date,
                .daterangepicker td.end-date {
                    background-color: #000 !important;
                    color: #fff !important;
                    border-radius: 50% !important;
                    width: 32px!important;
                    height: 32px!important;
                }
                
                .daterangepicker td.in-range {
                    background-color: #f0f0f0 !important;
                    color: #333 !important;
                }

                .daterangepicker .active.end-date.in-range.available{
                    background-color: #000 !important;
                    color: #fff !important;
                    border-radius: 50% !important;
                    width: 32px!important;
                    height: 32px!important;
                }
                
                /* 모바일 스타일 */
                @media (max-width: 767px) {
                    body.no-scroll {
                        overflow: hidden !important;
                        position: fixed !important;
                        width: 100% !important;
                    }
                    
                    .daterangepicker {
                        position: fixed !important;
                        top: 0 !important;
                        left: 0 !important;
                        right: 0 !important;
                        bottom: 0 !important;
                        width: 100% !important;
                        max-width: none !important;
                        margin: 0 !important;
                        padding: 10px !important;
                    }
                }
                
                /* 확인 버튼 스타일 */
                .daterangepicker-confirm-btn {
                    width: 100%;
                    padding: 10px;
                    background-color: #000;
                    color: #fff;
                    border: none;
                    cursor: pointer;
                    margin-top: 15px;
                    font-weight: 500;
                }
            `;
            document.head.appendChild(dateCircleStyle);
        }
        
        function initSimpleDatePicker() {
            // 새 입력 요소 생성
            datePickerInput = document.createElement('input');
            datePickerInput.type = 'text';
            datePickerInput.id = 'date-picker-input-' + new Date().getTime();
            datePickerInput.style.position = 'absolute';
            datePickerInput.style.opacity = '0';
            datePickerInput.style.height = '0';
            datePickerInput.style.width = '0';
            datePickerInput.style.pointerEvents = 'none';
            dateDropdown.appendChild(datePickerInput);
            
            // 간소화된 옵션
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
                }
            };
            
            // daterangepicker 초기화
            $(datePickerInput).daterangepicker(pickerOptions);
            
            // 인스턴스 저장
            datePickerInstance = $(datePickerInput).data('daterangepicker');
            
            // 이벤트 설정
            setupDatePickerEvents();
        }
        
        function setupDatePickerEvents() {
            // 날짜 선택 시 이벤트
            $(datePickerInput).on('apply.daterangepicker', function(ev, picker) {
                if (picker.startDate && picker.endDate) {
                    const startFormat = picker.startDate.format('MMM D');
                    const endFormat = picker.endDate.format('MMM D');
                    selectedOption.textContent = `${startFormat} - ${endFormat}`;
                    dateSelected = true;
                }
            });
            
            // 날짜 선택 후 캘린더 닫히면 드롭다운도 닫기
            $(datePickerInput).on('hide.daterangepicker', function() {
                setTimeout(function() {
                    if (dateSelected) {
                        dateDropdown.classList.remove('active');
                        isDateDropdownActive = false;
                    }
                    $('body').removeClass('no-scroll');
                }, 100);
            });
            
            // 캘린더 표시될 때 확인 버튼 추가
            $(datePickerInput).on('show.daterangepicker', function() {
                setTimeout(addConfirmButton, 50);
                
                // 모바일에서 스크롤 방지
                if (isMobile()) {
                    $('body').addClass('no-scroll');
                }
            });
        }
        
        // 날짜 드롭다운 헤더 클릭 이벤트 - 완전히 새로 구현
        const dateDropdownHeader = dateDropdown.querySelector('.dropdown__header');
        if (dateDropdownHeader) {
            // 기존 이벤트 제거를 위해 복제
            const newHeader = dateDropdownHeader.cloneNode(true);
            dateDropdownHeader.parentNode.replaceChild(newHeader, dateDropdownHeader);
            
            // 새 이벤트 리스너 추가
            newHeader.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("날짜 드롭다운 헤더 클릭됨 - 새 핸들러");
                
                // 단순 토글만 수행
                const isActive = dateDropdown.classList.contains('active');
                
                // 이미 활성화되어 있으면 닫기
                if (isActive) {
                    dateDropdown.classList.remove('active');
                    if (datePickerInstance) {
                        datePickerInstance.hide();
                    }
                    isDateDropdownActive = false;
                } else {
                    // 모든 드롭다운 닫기
                    document.querySelectorAll('.custom__dropdown').forEach(d => {
                        d.classList.remove('active');
                    });
                    
                    // 현재 드롭다운 열기
                    dateDropdown.classList.add('active');
                    isDateDropdownActive = true;
                    
                    // 데이트피커 표시
                    if (datePickerInstance) {
                        try {
                            datePickerInstance.show();
                            setTimeout(addConfirmButton, 50);
                        } catch (e) {
                            console.error("데이트피커 표시 실패, 재초기화 시도:", e);
                            initSimpleDatePicker();
                            setTimeout(function() {
                                datePickerInstance.show();
                                setTimeout(addConfirmButton, 50);
                            }, 100);
                        }
                    }
                }
            });
        }
        
        // 간소화된 확인 버튼 추가 함수
        function addConfirmButton() {
            $('.daterangepicker-confirm-btn').remove();
            const confirmBtn = $('<button type="button" class="daterangepicker-confirm-btn">Confirm</button>');
            $('.daterangepicker').append(confirmBtn);
            
            confirmBtn.on('click', function() {
                if (datePickerInstance.startDate && datePickerInstance.endDate) {
                    const startFormat = datePickerInstance.startDate.format('MMM D');
                    const endFormat = datePickerInstance.endDate.format('MMM D');
                    selectedOption.textContent = `${startFormat} - ${endFormat}`;
                    dateSelected = true;
                    
                    // 닫기
                    dateDropdown.classList.remove('active');
                    datePickerInstance.hide();
                    isDateDropdownActive = false;
                    $('body').removeClass('no-scroll');
                }
            });
        }
        
        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', function(e) {
            if (!dateDropdown.contains(e.target) && !e.target.closest('.daterangepicker')) {
                dateDropdown.classList.remove('active');
                if (datePickerInstance) {
                    datePickerInstance.hide();
                }
                isDateDropdownActive = false;
                $('body').removeClass('no-scroll');
            }
        });
        
        console.log("날짜 드롭다운 초기화 완료");
    }
    
    // ===== 외부 클릭 이벤트 공통 처리 =====
    document.addEventListener('click', function(e) {
        // 생년월일 드롭다운 외부 클릭
        if (!e.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.dropdown-options').forEach(options => {
                options.style.display = 'none';
            });
        }
        
        // 메인 페이지 드롭다운 외부 클릭 (date-dropdown 제외)
        if (!e.target.closest('.custom__dropdown') && 
            !e.target.closest('.daterangepicker') && 
            !e.target.closest('.date-dropdown')) {
            
            document.querySelectorAll('.custom__dropdown:not(.date-dropdown)').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    console.log("모든 드롭다운 초기화 완료");
});