
jasmine.getFixtures().fixturesPath = 'app';
loadFixtures('index.html');


describe("Проверка наличия элементов страницы", function() {

    var header = $('.sidebar__item-header');
    var div = $('.mainarticle');

    it("Cуществует ли элемент .mainarticle", function() {
        expect(div).toBeDefined();
    });

    it("Cуществует ли элемент sedeber__item-presence", function() {
        var element = $('.sidebar__item-presence');
        expect(element).toBeDefined();
    });

    it("Cуществует ли элемент sidebar__item-header", function() {
        expect(header).toBeDefined();
    });

    it("sidebar__item-header не имеет класс .down", function() {
        expect(header).not.toHaveClass('down');
    });
});

describe("Проверка клика на элемент #sidebar__item-header", function() {
    element = $('#sidebar__item-header');

    //it("Клик на элемент", function() {
    //    var spyEvent = spyOnEvent('#sidebar__item-header', 'click');
    //    $('#sidebar__item-header').click();
    //    expect('click').toHaveBeenTriggeredOn('#sidebar__item-header');
    //    expect(spyEvent).toHaveBeenTriggered()
    //});


    beforeEach( function() {
        spyOnEvent($('#sidebar__item-header'), 'click');
    });

    it("Клик на элемент", function() {
        element.click();
        element.trigger( "click" );
        //expect(element).toHaveBeenTriggered();
        //expect('click').toHaveBeenTriggeredOn($('#sidebar__item-header'));
        expect(header).not.toHaveClass('down');

    });
});



//describe("Проверка клика на элемент", function() {
//    header = $('#sidebar__item-header');
//   // beforeEach(function() {
//   //     $('#sidebar__item-header').trigger( "click" );
//   // });
//   //
//   // it ("Должен добавиться класс .down.", function() {
//   //     expect($('#sidebar__item-header')).toHaveClass('down');
//   // });
//
//    it("Cуществует ли элемент #sidebar__item-header", function() {
//        expect(header).toBeDefined();
//    });
//
//    it ("Выполняется ли нажатие на элемент", function() {
//        spyEvent = spyOnEvent('#sidebar__item-header', 'click');
//        $('#sidebar__item-header').trigger( "click" );
//
//        expect('click').toHaveBeenTriggeredOn('#sidebar__item-header');
//        expect(spyEvent).toHaveBeenTriggered();
//    });

//describe("Проверка клика на элемент", function() {
//    header = $('#sidebar__item-header');
//
//    beforeEach(function() {
//        header.trigger( "click" );
//    });
//
//
//    it("Cуществует ли элемент #sidebar__item-header", function() {
//        expect(header).toBeDefined();
//    });
//
//
//    it ("Имеет ли при нажатии класс .down", function() {
//        expect(header).toHaveClass('down');
//    });
//});






