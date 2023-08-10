$(function () {
    $("#toTop").scrollToTop(1000);
});


$(document).ready(function () {
    $("#offer").owlCarousel({
        margin: 27,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 2,
            },
        }
    });
})


$(document).ready(function () {
    $("#latest_product_slider").owlCarousel({
        margin: 0,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        nav: true,
        loop: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 2
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 5,
            },
        }
    });
})


$(window).on('scroll', function () {
    let h = $(window).scrollTop();
    if (h > 80) {
        $('.two_in_one').addClass('fixed-header');
    } else {
        $('.two_in_one').removeClass('fixed-header');
    }
});
if ($(window).scrollTop() > 38) {
    $('.two_in_one').addClass('fixed-header');
} else {
    $('.two_in_one').removeClass('fixed-header');
}


offCanvasNav({
    target_nav: '.dropdown',
    nav_next_btn: '<i class="icon-right"></i>'
});