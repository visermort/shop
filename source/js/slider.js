$(document).ready((function() {
        var textStart = $('#price-text-start'),
            textFinish = $('#price-text-finish'),
            startRange = parseInt($(textStart).attr('data-range'),10),
            finishRange = parseInt($(textFinish).attr('data-range'),10),
            startUser = parseInt($(textStart).attr('data-user'),10),
            finishUser = parseInt($(textFinish).attr('data-user'),10);
//        console.log(startRange,finishRange,startUser,finishUser);
        $( "#slider" ).slider({
            range: true,
            min: startRange,
            max: finishRange,
            values: [ startUser,
                finishUser ],
            slide: function( event, ui ) {
                // console.log(ui.values[ 0 ] + " - " + ui.values[ 1 ]);
                $(textStart).val(ui.values[ 0 ]);
                $(textFinish).val(ui.values[ 1 ]);
            }
        });
    })
);

function textStartChange(e) {
   var that = $(this),
       finish = $('#price-text-finish'),
       strValue = that.val(),
       intValue = parseInt(strValue)|| 0,//если неправильно, то 0
       startRange = parseInt(that.attr('data-range')),
       finishRange = parseInt(finish.val()),
       slider =  $('#slider');

    if (intValue < startRange) { //если меньше диапазона, то по нижнему пределу
        intValue = startRange;
    }
    if (intValue > finishRange) { //если выше диапазона, то  верхниму пределу
        intValue = finishRange;
    }
    slider.slider('values',0,intValue); //новое значение слайдера
    that.val(intValue);  //повтрояем его для самого поля
}

function textFinishChange(e) {
    var that = $(this),
        start = $('#price-text-start'),
        startRange = parseInt(start.val()),
        strValue = that.val(),
        finishRange = parseInt(that.attr('data-range')),
        intValue = parseInt(strValue)|| finishRange,//если неправильно, то максимум
        slider =  $('#slider');

    if (intValue < startRange) { //если меньше диапазона, то по нижнему пределу
        intValue = startRange;
    }
    if (intValue > finishRange) { //если выше диапазона, то  верхниму пределу
        intValue = finishRange;
    }
    slider.slider('values',1,intValue); //новое значение слайдера
    that.val(intValue);  //повтрояем его для самого поля

}

$('#price-text-start').on('change',textStartChange);//при изменениии полей ввода цены
$('#price-text-finish').on('change',textFinishChange);//при изменениии полей ввода цены
