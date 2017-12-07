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


});


