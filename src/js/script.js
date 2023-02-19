$(document).ready(function(){
    $('.carousel__inner ').slick({
        speed: 1200,
        adaptiveHeight: true,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icon/left.svg"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icon/right.svg"></button>',
        responsive: [
            {
              breakpoint: 768,
              settings: {
                dots: true,
                arrows: false
              }
            },
          ]
    });
    
/*     Код активирует/деактвирует три таба (для фитнекса, для бега, для триатлона) */
    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this) /* зис ссылается на тот элемент, на который мы только что нажали */
          .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
          .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
      });
    
/*     $('.catalog__link').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog__m-content').eq(i).toggleClass('catalog__m-content_active');
            $('.catalog__list').eq(i).toggleClass('catalog__list_active');
        })
    })

    $('.catalog__back').each(function(i) {
        $(this).on('click', function(e) {
            e.preventDefault();
            $('.catalog__m-content').eq(i).toggleClass('catalog__m-content_active');
            $('.catalog__list').eq(i).toggleClass('catalog__list_active');
        })
    }) Закомментированные выше функции описаны и вызваны более оптимальным способом внизу. Оставил комментарий, чтобы потом понятнее был код */

/*    Код меняет карту (подробнее/назад) */
    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog__m-content').eq(i).toggleClass('catalog__m-content_active');
                $('.catalog__list').eq(i).toggleClass('catalog__list_active');
            })
        })
    }

    toggleSlide('.catalog__link');
    toggleSlide('.catalog__back');

    //Модальные окна

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn()
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow')
    })

    $('.catalog__btn').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        })
    });

    function validateForms(form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true,
                }
            }
        });
    }

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

    $('form').submit(function (e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }

        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn();
            $('form').trigger('reset');
        })
        return false;
    });
  });
