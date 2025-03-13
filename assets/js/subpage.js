
// tab

$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})


// 이미지 업로드

// 파일 업로드 관련 요소 선택
const fileInput = document.getElementById('passport-upload');
const fileNameDisplay = document.getElementById('file-name-display');
const clearFileButton = document.getElementById('clear-file');

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
window.addEventListener('load', function() {
    if (!fileInput.files || fileInput.files.length === 0) {
        clearFileButton.style.display = 'none';
    }
});