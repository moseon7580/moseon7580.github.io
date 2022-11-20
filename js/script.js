$(function () {
    // 헤더
    $(".btn_menu").click(function () {
        $(this).toggleClass("on");
        $(".nav_m").toggleClass("show_list");
    });


    // works 게시물 분류
    $(".work .cate .cate_menu a").click(function (e) {
        e.preventDefault();

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
}); // document.onready