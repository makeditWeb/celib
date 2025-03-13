
document.addEventListener('DOMContentLoaded', function() {
    console.log("생년월일 드롭다운 초기화 시작");
    
    // 생년월일 드롭다운 초기화
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
        
        // 외부 클릭 시 드롭다운 닫기
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.custom-dropdown')) {
                document.querySelectorAll('.dropdown-options').forEach(options => {
                    options.style.display = 'none';
                });
            }
        });
        
        console.log("드롭다운 초기화 완료");
    }

    // 파일 업로드 초기화
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
});
