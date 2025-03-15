// 공통 유틸리티 함수
function elementExists(selector) {
    return document.querySelector(selector) !== null;
  }
  
  // 현재 페이지 URL 확인
  function getCurrentPageName() {
    // URL에서 파일명 추출
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    return filename;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // 현재 페이지 확인
    const currentPage = getCurrentPageName();
    
    // ===== 모든 페이지에서 공통으로 실행되는 기능 =====
    
    // 모바일 메뉴 토글 기능
    initializeMobileMenu();
    
    // ===== 페이지별 특정 기능 =====
    
    // 메인 페이지 기능
    if (currentPage === 'index.html' || currentPage === '') {
      // 아코디언 기능 (메인 페이지에만 존재)
      initializeAccordion();
      
      // 배너 텍스트 플로우 (메인 페이지에만 존재할 수 있음)
      initializeBannerTextFlow();
    }
    
    // 마이페이지 기능
    if (currentPage === 'mypage.html' || elementExists('.mypage')) {
      // 탭 기능 (마이페이지에 존재)
      initializeTabs();
    }
    
    // ===== 기능별 초기화 함수 =====
    
    // 모바일 메뉴 초기화 (모든 페이지 공통)
    function initializeMobileMenu() {
      const menuToggle = document.getElementById('mobileMenuToggle');
      const mobileDropdown = document.getElementById('mobileDropdown');
      
      if (!menuToggle || !mobileDropdown) return;
      
      menuToggle.addEventListener('click', function() {
        // 햄버거 아이콘 애니메이션을 위한 active 클래스 토글
        this.classList.toggle('active');
        
        // 드롭다운 메뉴에 대한 open 클래스 토글
        mobileDropdown.classList.toggle('open');
      });
      
      // 메뉴 외부 클릭 시 닫기
      document.addEventListener('click', function(event) {
        if (!menuToggle || !mobileDropdown) return;
        
        const isClickInsideMenu = mobileDropdown.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (mobileDropdown.classList.contains('open') && !isClickInsideMenu && !isClickOnToggle) {
          menuToggle.classList.remove('active');
          mobileDropdown.classList.remove('open');
        }
      });
      
      // 창 크기 조절 시 모바일 메뉴 닫기
      window.addEventListener('resize', function() {
        if (!menuToggle || !mobileDropdown) return;
        
        if (window.innerWidth > 768 && mobileDropdown.classList.contains('open')) {
          menuToggle.classList.remove('active');
          mobileDropdown.classList.remove('open');
        }
      });
    }
    
    // 아코디언 초기화 (메인 페이지 전용)
    function initializeAccordion() {
      const accordionItems = document.querySelectorAll(".accordion-item");
      const viewMoreBtn = document.querySelector(".view__more a");
      const INITIAL_VISIBLE_ITEMS = 5;
      
      if (accordionItems.length === 0) return;
      
      // 초기 아이템 숨기기
      accordionItems.forEach((item, index) => {
        if (index >= INITIAL_VISIBLE_ITEMS) {
          item.style.display = "none";
        }
      });
      
      // 아코디언 토글 기능
      accordionItems.forEach((el) => {
        el.addEventListener("click", () => {
          if (el.classList.contains("active")) {
            el.classList.remove("active");
          } else {
            accordionItems.forEach((el2) => el2.classList.remove("active"));
            el.classList.add("active");
          }
        });
      });
      
      // View more 버튼 기능
      if (viewMoreBtn) {
        viewMoreBtn.addEventListener("click", function(e) {
          e.preventDefault();
          
          const hiddenItems = document.querySelectorAll(".accordion-item[style='display: none;']");
          
          if (hiddenItems.length > 0) {
            // 숨겨진 항목 모두 표시
            hiddenItems.forEach(item => {
              item.style.display = "";
            });
            
            // 버튼 텍스트 변경
            this.textContent = "View less";
          } else {
            // 초기 개수 이상 항목 다시 숨기기
            accordionItems.forEach((item, index) => {
              if (index >= INITIAL_VISIBLE_ITEMS) {
                item.style.display = "none";
              }
            });
            
            // 버튼 텍스트 초기화
            this.textContent = "View more";
            
            // 아코디언 섹션으로 스크롤
            const accordionSection = document.querySelector('.accordion');
            if (accordionSection) {
              accordionSection.scrollIntoView({behavior: "smooth"});
            }
          }
        });
      }
    }
    
    // 배너 텍스트 플로우 초기화
    function initializeBannerTextFlow() {
      const banner = document.querySelector('.fixed__banner');
      
      if (!banner) return;
      
      const originalText = banner.textContent.trim();
      
      // PC와 모바일 모두 같은 흐르는 텍스트 적용
      banner.style.overflow = 'hidden';
      
      // 원본 텍스트 저장 및 배너 비우기
      banner.innerHTML = '';
      
      // 흐르는 텍스트를 위한 컨테이너 생성
      const marqueeContainer = document.createElement('div');
      marqueeContainer.className = 'marquee-container';
      marqueeContainer.style.cssText = `
        display: flex;
        width: 100%;
        overflow: hidden;
      `;
      
      // 실제 흐르는 텍스트 요소 생성
      const marqueeContent = document.createElement('div');
      marqueeContent.className = 'marquee-content';
      marqueeContent.style.cssText = `
        display: flex;
        white-space: nowrap;
        animation: marquee 60s linear infinite;
      `;
      
      // 충분한 텍스트 추가 (2번 이상 화면을 채울만큼)
      for (let i = 0; i < 20; i++) {
        const span = document.createElement('span');
        span.textContent = originalText + ' ';
        span.style.cssText = `
          padding-right: 20px;
        `;
        marqueeContent.appendChild(span);
      }
      
      // 애니메이션 속도 조정 (PC는 좀 더 느리게, 모바일은 빠르게)
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const animationDuration = isMobile ? '60s' : '80s'; // PC는 80초, 모바일은 60초
      
      marqueeContent.style.animation = `marquee ${animationDuration} linear infinite`;
      
      // 애니메이션 키프레임 추가
      const styleSheetId = 'marquee-animation-style';
      if (!document.getElementById(styleSheetId)) {
        const styleSheet = document.createElement('style');
        styleSheet.id = styleSheetId;
        styleSheet.innerHTML = `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `;
        document.head.appendChild(styleSheet);
      }
      
      // DOM에 추가
      marqueeContainer.appendChild(marqueeContent);
      banner.appendChild(marqueeContainer);
    }
    
    // 페이지 로드 시 실행
    document.addEventListener('DOMContentLoaded', initializeBannerTextFlow);
    
    // 화면 크기 변경 시 재실행 (반응형 대응)
    window.addEventListener('resize', function() {
      // 기존 요소 제거 후 다시 생성
      const banner = document.querySelector('.fixed__banner');
      if (banner) {
        const originalText = banner.querySelector('.marquee-content span')?.textContent.trim() || '20% promotion now';
        banner.innerHTML = originalText;
        initializeBannerTextFlow();
      }
    });
    
    // 탭 초기화 (마이페이지 전용)
    function initializeTabs() {
      const tabLinks = document.querySelectorAll(".tab-link");
      
      if (tabLinks.length === 0) return;
      
      tabLinks.forEach(tab => {
        tab.addEventListener('click', function() {
          // 기존 active 탭 제거
          document.querySelectorAll(".tab-link").forEach(t => t.classList.remove('current'));
          document.querySelectorAll(".tab-content").forEach(c => c.classList.remove('current'));
          
          // 새 탭 활성화
          this.classList.add('current');
          const tabId = this.getAttribute('data-tab');
          document.getElementById(tabId).classList.add('current');
        });
      });
    }
  });


  