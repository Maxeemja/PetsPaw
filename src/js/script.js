$(document).ready(function(){

    $('.main__items').on('click', 'div:not(.main__items-wrapper_active)', function() {
        $(this).addClass('main__items-wrapper_active').siblings().removeClass('main__items-wrapper_active');
        $('.sub__home').addClass('sub__voting');
        $('.home__img').addClass('hidden');
/*           .closest('div.main__items').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active'); */
      });

});