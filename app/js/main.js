var application = function () {
    var initApp = function(){
        setEvents();
        setSelectStyle();
        columnizerInit();

    };//initapp

        //событиям назначаем отработчики
    var setEvents = function() {
        $('.sidebar__item-header').on('click', toggleItemShow);//"accordeon"
        $('.sidebar__item-label-checkbox').on({
            'click': toggleElementChecked,//нажатие - ставим или отменяем "выбарно"
            'mouseenter': setElementHover,  // делаем икунку hover
            'mouseleave': unsetElementHover  // отменяем икунку hover
        });
        $('.sidebar__item-bottom').on('click',removeAllFilters);//сброс фильтров
        $('.sidebar__type-item').on('click',switchTypes);//переключение типа смартфона
        $('.sidebar__item-presence-item').on('click',switchPresense);//переключение наличия
        $('.sidebar__item-colors_button').on('click',switchColor);//перключение фильтра цвета

        $('.content-main-item__photo-item').on('click',switchContentImage);//переколючение картинок в каталоге
        $('.content-header__item').on('click',switchContentType);//переключение отображения каталога





    };


    var switchContentType = function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var newClass = '';
        if($(this).hasClass('content-header__item-info')){newClass='itemInfo';}
           else if ($(this).hasClass('content-header__item-thumbs')){newClass='itemThumbs';}
           else {newClass='itemList';}
        console.log(newClass);//новый класс, который присвоим всем элементам
        var contentItems = $('.content-main-list').children('.content-main-item');
        contentItems.removeClass('itemInfo');//вначале удалим все классы, потом добави нужный
        contentItems.removeClass('itemThumbs');
        contentItems.removeClass('itemList');
        contentItems.addClass(newClass);
    };

            //задаём стиль для select
    var setSelectStyle = function () {
        $('#content-header__select').select2({ theme: "classic", allowClear: false });
    };
            //делаем колонки для важной информации
    var columnizerInit = function () {
      //  $('#important__text').columnize();
       // $('.important__text').columnize({ width: 300 });
    //   $('#important__text').columnize({ columns: 2 });
            //        target: '.columnizer-style'});
    };

        //нажатие на заголовок сайдбара - показ-скрытие раздела ("аккордеон")
    var toggleItemShow = function (){
        $(this).toggleClass('down'); //добавление/отмена класса для себя
        $(this).siblings('.sidebar__item-block').toggleClass('hide');// и для соседнего блока
    };

        //при нажатии переключаем класс checked для элемента, для соседнего инпут переключаем атрибут
    var toggleElementChecked = function (){
        $(this).toggleClass('checked'); //добавление/отмена класса для себя
        if($(this).hasClass('checked')) {   //для соседнего инпут ставим или отменяем атрибут
            $(this).siblings('.sidebar__item-input-checkbox').attr('checked', 'checked');
        }else {
            $(this).siblings('.sidebar__item-input-checkbox').removeAttr('checked');
        }
    };

    var setElementHover = function () { //для элемента добавляем класс при проходе мыши
        $(this).addClass('hover');
    };
    var unsetElementHover = function () { //для элемента снимаем класс при выходе мыши
        $(this).removeClass('hover');
    };

    var removeAllFilters = function () { //сброс всех фильтров  - для серии чекбокс отменяем атрибут "checked"
        var list=$(this).siblings('ul');                                //для label отменяем класс .checked
        $(list).find('.sidebar__item-label-checkbox').removeClass('checked');
        $(list).find('.sidebar__item-input-checkbox').removeAttr('checked');
    };

    var switchTypes = function () { //переключение типа смартфона
        $(this).find('.sidebar__type-link').addClass('active');
        $(this).siblings().find('.sidebar__type-link').removeClass('active');
    };

    var switchPresense = function () { //переключение наличия в магазинах
        $(this).find('.sidebar__item-presence_label').addClass('checked');
        $(this).find('.sidebar__item-presence_radio').attr('checked','checked');//attr('checked');
        var sibling = $(this).siblings();
        $(sibling).find('.sidebar__item-presence_label').removeClass('checked');
        $(sibling).find('.sidebar__item-presence_radio').removeAttr('checked');
    };
    var switchColor = function () { //переключение фильтра цвета
        $(this).toggleClass('active');
    };

    var switchContentImage = function() {//переколючение картинок в каталоге
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        var image = $(this).find('img').attr('src');
        $(this).parents('.content-main-item__photo').
              find('.content-main-item__photo-main-photo').attr('src',image);
    };
    var selectHeaderClick = function() {
        $(this).select2({
            theme: "classic"
        });
    };

    return {
        init: initApp
    }

}();

$(document).ready(function (){
    application.init();
});

//$(document).ready((function() {
//        $( "#sidebar__item-price-ui-slider" ).slider({
//            range: true,
//            min: 0,
//            max: 500,
//            values: [ 75, 300 ],
//            slide: function( event, ui ) {
//                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
//            }
//        });
//        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
//            " - $" + $( "#slider-range" ).slider( "values", 1 ) );
//    })
//);


