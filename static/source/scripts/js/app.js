(function () {
    "use strict"

    /* Animation Effects
   ===================*/
    new WOW().init({
        mobile: true
    });

    /* Handle Form Resubmission
   ===================*/
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

     /* BACK TO TOP
    =================*/
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
          $('.scroll-up').fadeIn('slow');
        } else {
          $('.scroll-up').fadeOut('slow');
        }
    });
    $('.scroll-up').click(function(){
        $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
        return false;
    });


    /* NAVIGATION ROUTING
    ======================*/
    $('.nav').on('click', function() {
        let item = $(this).attr('data-class');

        $('.nav').removeClass('active-link');
        $('.body-section').addClass('d-none');

        $(this).addClass('active-link');
        $(`.${item}`).removeClass('d-none');
    })


    /*  SKILL SET
    ===============*/
    $('#skills').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, { offset: '65%'} );

    /*  TYPED JS
    ===============*/
    let typed = new Typed('#typed', {
        strings: ['SOFTWARE DEVELOPER', 'GRAPHICS DESIGNER'],
        backspeed: 100,
        typeSpeed: 100,
        loop: true,
        showCursor: true
    })

    /* PORTFOLIO SECTION
    ========================*/
    let portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    
    $('.portfolio-filters .filter').on( 'click', function() {
        $(".portfolio-filters .filter").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

     /* PORTFOLIO MAGNIFIC POPUP
    =============================*/
    $('.portfolio-item').magnificPopup({
        delegate: '.lightbox',
        type: 'image',
        gallery: {
            enabled: true
        },
        image: {
            titleSrc: 'title'
        }
    });


      /* HANDLE CLICK OF SEND MESSAGE
    ==================================*/
    $('.contact-form-box').on('submit', function(e) {

        e.preventDefault();

        let fullname = $('#fullName').val();
        let subject = $('#subject').val();
        let message = $('#message').val();

        console.log(fullname);
        console.log(subject);
        console.log(message);

        alert('submitted');
    })


})();