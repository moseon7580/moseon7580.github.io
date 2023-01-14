$(function () {
    // top 버튼
    $("#btn_top").click(function() {
        $("html, body").animate({
            scrollTop : 0
        }, 500);
        
        return false;
    });


    // 스크롤에 반응하는 애니메이션
    // var 함수명 = function(){}: 변수 함수 선언 (함수가 들어있지만 함수는 아니고 변수임.)
    var animateHTML = function() {
        var elems,
            windowHeight,
            animateDelay;
        
        // init = initialize(초기화). 보통 초기화의 의미를 지닌 함수와 객체를 작성할 때 사용하는 이름.
        var init = function() {
            elems = document.getElementsByClassName("animate");
            // console.log(animateDelay);
            windowHeight = window.innerHeight;
            _addEventHandlers();
        }
        
        var _addEventHandlers = function() {
            window.addEventListener("scroll", _checkPosition);
            window.addEventListener("resize", init)
        }

        var _checkPosition = function() {
          for (var i = 0; i < elems.length; i++) {
            var posFromTop = elems[i].getBoundingClientRect().top;
            if (posFromTop - windowHeight <= 0) { 
                elems[i].className = elems[i].className.replace("animate zoom-in", "end-zoom-in");
                elems[i].className = elems[i].className.replace("animate fade-up", "end-fade-up");
                elems[i].className = elems[i].className.replace("animate semi-fade-up", "end-semi-fade-up");
                elems[i].className = elems[i].className.replace("animate fade-right", "end-fade-right");
                elems[i].className = elems[i].className.replace("animate fade-in", "end-fade-in");

                // 애니메이션 딜레이 추가
                // animateDelay = elems[i].dataset.delay;
                // elems[i].style.animationDelay = animateDelay + "s";
                // elems[i].style.transitionDelay = animateDelay + "s";
                // console.log(animateDelay);
            }
          }    
        }
        
        return {
          init: init
        }
    }

    animateHTML().init();


    // 스크롤에 반응하는 헤더
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5; // 이벤트를 발생시킬 스크롤의 이동 범위
    var navbarHeight = $("header.scroll_on").outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250); // 스크롤이 멈춘 후 동작이 실행되기 까지의 딜레이

    function hasScrolled() {
        var st = $(this).scrollTop(); // 현재 window의 scrollTop 값

        // delta로 설정한 값보다 많이 스크롤 되어야 실행된다.
        // Math.abs() 함수: 파라미터로 입력된 x의 절대값을 리턴.
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > navbarHeight){
            // 스크롤을 내렸을 때
            $("header.scroll_on").slideUp("100"); // header 숨기기
        } else {
            // 스크롤을 올렸을 때
            if(st + $(window).height() < $(document).height()) {
                $("header.scroll_on").slideDown("100"); // header 보이기
            }
        }

        lastScrollTop = st; // 현재 멈춘 위치를 기준점으로 재설정
    }
                
                
    // // 헤더 메뉴, 푸터 메뉴 클릭 시 해당 요소로 스크롤
    $(".gnb .gnb_item a").click(function (e) {
        e.preventDefault();
        
        if ($(this).parent().filter(".gnb_item_m")) {
            $("html, body").animate({
                // window location.hash 속성
                scrollTop: $(this.hash).offset().top
            }, 500);
            // console.log("mobile menu");
            
            $("header .hd_m .btn_menu").removeClass("on");
            $("header .hd_m .nav_m").removeClass("show_list");
            $("html, body").removeClass("scroll_disable");
        } else {
            $("html, body").animate({
                // window location.hash 속성
                scrollTop: $(this.hash).offset().top
            }, 500);
        }
    });
    
    // 모바일 헤더 메뉴 표출
    $(".btn_menu").click(function () {
        $(this).toggleClass("on");
        $("html, body").toggleClass("scroll_disable");
        $(".nav_m").toggleClass("show_list");
    });


    // main 스크롤 버튼 누를 시 about 영역으로 부드럽게 스크롤
    $(".scroll_down").click(function(e) {         
        e.preventDefault();

        $("html, body").animate({
            scrollTop:$(this.hash).offset().top
        }, 500);
    });


    // work 게시물 분류
    $("#work .cate .cate_menu a").click(function (e) {
        e.preventDefault();
        $("#work .cate .cate_menu").removeClass("on");
        $(this).parent().addClass("on");

        // 변수 중복 선언을 막기위해 let 사용 (재할당은 가능.)
        let cate = $(this).attr("title");
        $(".work_wr .work_item").hide();

        if (cate == "all") {
            $(".work_wr .work_item").show();
        } else {
            // 속성 선택자 사용
            // [속성이름*="속성값"] 선택자는 특정 속성의 속성값에 특정 문자열를 포함하는 요소를 모두 선택.
            $(".work_wr .work_item[class*="+cate+"]").show();
        }
    });


    // work 게시물 분류, 제목 통일, 썸네일 alt 속성 통일
    $("#work .work_wr .work_item").each(function () {
        let work_type = $(this).attr("data-type");
        let work_tit = $(this).find(".txt_box").find(".tit").text();
        
        $(this).addClass(work_type).find(".work_type").text(work_type).next(".tit").text(work_tit).end().end().find(".thumbnail").attr("alt", work_tit);
    });


    // ie로 접속시 경고창
    var agent = navigator.userAgent.toLowerCase();

    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
        alert('Internet Explorer는 호환되지 않는 브라우저 입니다. \n다른 브라우저를 이용해주세요.')
    }
}); // document.onready