$(function () {
    $('.btn_menu').click(function () {
        $(this).toggleClass('on');
        console.log("Clicked menu");
        $(".nav_m").toggleClass("show_list");
        $(".nav_m").fadeIn();
    
    });    
}); // document.onready