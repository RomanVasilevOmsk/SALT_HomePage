$(document).ready(function(){
//------------swiper---------//
    var swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        pagination: {
            autoplay: {
                delay: 4000
            },
            el: '.swiper-pagination',
            clickable: true,
        },
    });
    swiper.autoplay.start();
//------------swiper---------//


    //Mobile menu
    var main = function() {
        var nav = $('.nav'),
        iconClose = $('.header__icon-close'),
        iconMenu = $('.header__icon-menu'),
        body = $('body');
        iconMenu.click(function() {
            nav.animate({left: '0'}, 200);
            iconClose.css({'display' : 'block'}).animate({left: '71%'}, 200);
            iconMenu.css({'display' : 'none'});
            body.css({'overflow-y' : 'hidden'}).animate({left: '100%'}, 200);
        });


        /* Close menu */
        $('.header__icon-close,.nav__itm').click(function() { //выбираем класс icon-close и метод click
            nav.animate({left: '-100%'}, 200);
            body.css({'overflow-y' : 'scroll'}).animate({left: '0px'}, 200);
            iconMenu.css({'display' : 'block'});
            iconClose.css({'display' : 'none'});
        });
    };
    $(document).ready(main);
    //Mobile menu

    //---------counterUp-----------//

    $('.counts__content').counterUp({
        delay: 10,
        time: 3000
    });


    //Modal-video
    $(".js-show-modal").on("click", function(e) {
        e.preventDefault();
        var currentModal = $(this).attr("href");
        $(currentModal + ", #js-overlay").fadeIn(500);
        $("body").addClass("open-modal");
        $(".video__modal").css({"display" : "flex"});
        $(".video__modal").html("<iframe width='100%' height='100%' src='https://www.youtube-nocookie.com/embed/3p4MZJsexEs?autoplay=1&amp;rel=0&amp;controls=0&amp;showinfo=0'  frameborder='0' gesture='media' allow='encrypted-media' allowfullscreen></iframe>");
    });

    $("#js-overlay, .js-modal-close").on("click", function(e) {
        e.preventDefault();
        $(".js-modal, #js-overlay").fadeOut(100);
        $("body").removeClass("open-modal");
        $(".video__modal").html("");
    });


});


