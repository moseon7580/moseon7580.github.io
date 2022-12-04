$(function () {
    // top 버튼
    $("#btn_top").click(function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        
        return false;
    });


    // 스크롤에 반응하는 헤더
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5; // 이벤트를 발생시킬 스크롤의 이동 범위
    var navbarHeight = $("header").outerHeight();

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
            $("header").slideUp("100"); // header 숨기기
        } else {
            // 스크롤을 올렸을 때
            if(st + $(window).height() < $(document).height()) {
                $("header").slideDown("100"); // header 보이기
            }
        }

        lastScrollTop = st; // 현재 멈춘 위치를 기준점으로 재설정
    }


    // 헤더 메뉴, 푸터 메뉴 클릭 시 해당 요소로 스크롤
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
            // console.log("close menu");
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


    // work 게시물 분류, 제목 통일
    // c.click(function (e) {
    //     let work_type = $(this).attr("data-type");

    //     $(this).addClass(work_type);
    //     // console.log(work_type);
    // });

    
    // if ($("#work .work_wr .work_item").length > 0) {
    //     console.log($(this));
    // };


    // let work_items = $("#work .work_wr .work_item");

    // for (var i = 0; i < work_items.length; i++) {
    //     let work_type = $(this).attr("data-type");
    //     $("#work .work_wr .work_item").addClass(work_type);
    // }

    
    $("#work .work_wr .work_item").each(function (e) {
        let work_type = $(this).attr("data-type");
        
        $(this).addClass(work_type);

        console.log($(this));
    });


    // $("#work .work_wr .work_item").each(work_items, function (i, e) {
    //     console.log('element', i, e);
    //     console.log(work_items);
    // });


    // ie로 접속시 경고창
    var agent = navigator.userAgent.toLowerCase();

    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
        alert('Internet Explorer는 호환되지 않는 브라우저 입니다. \n다른 브라우저를 이용해주세요.')
    }
}); // document.onready